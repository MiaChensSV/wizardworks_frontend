import React, { useState, useEffect } from 'react';
import './Desk.css';
import https from '../../util/https'

const http = https();

export default function Desk() {
  const [colors, setColors] = useState([])
  const [blockList, setBlockList] = useState([]);
  const [matrix, setMatrix] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await http.get('/getBoardData');
        setBlockList(data.blocksState);
        setColors(data.avaiableColors)
      } catch (error) {
        console.error('Error fetching blocks from backend:', error);
      }
    };
    fetchData();
  }, [])

  // map block list to matrix
  useEffect(() => {
    const newMatrix = initMatrix();
    // console.log('NEW MATRIX', newMatrix);
    if (blockList.length > 0) {
      blockList.forEach(block => {
        let isBlockAdded = false;
        while (!isBlockAdded) {  //?
          isBlockAdded = addBlockToMatrix(block, newMatrix);
          // console.log(isBlockAdded);
          if (!isBlockAdded) { //?
            expandMatrix(newMatrix);
          }
        }
      });
      setMatrix(newMatrix)
    }
  }, [blockList])

  // Methods
  const initMatrix = () => {
    const newMatrix = [[],];
    return newMatrix;
  }

  const addNewBlockToList = async () => {
    const newBlock = { id: blockList.length + 1, color: getDifferentColor() };
    setBlockList(prev => [...prev, newBlock]);
    try {
      await sendBlockListToBackend(newBlock);
    } catch (error) {
      console.error('Error sending block to backend:', error);
    }
  }
  const addBlockToMatrix = (block, matrix) => {
    const columnsLength = matrix.map(column => column.length); //[1, 0]
    const minLength = Math.min.apply(null, columnsLength); // ?
    // console.log('column length array', columnsLength);
    // console.log('min length ', minLength);
    // console.log('matrix', columnsLength);
    const minLengthIndex = columnsLength.indexOf(minLength);
    // console.log(minLengthIndex)
    if (minLengthIndex === 0 && matrix.length <= matrix[minLengthIndex].length) {
      return false;
    } else {
      matrix[minLengthIndex].push(block);
      return true;
    }
  }

  const expandMatrix = (matrix) => {
    // matrix.push([]);
    matrix.unshift([]);
  }


  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };
  const getDifferentColor = () => {
    // Get the last block's color
    const lastBlockColor = blockList.length > 0 ? blockList[blockList.length - 1].color : null;
    // console.log(lastBlockColor + ' last')
    let newColor = getRandomColor();
    // console.log(newColor + ' new')
    while (newColor === lastBlockColor) {
      newColor = getRandomColor();
      // console.log('reget ' + newColor)
    }
    return newColor;
  };

  const sendBlockListToBackend = async (block) => {
    try {
      const data = await http.post('/addBlock', {
        position: block.id,
        color: block.color,
      });
      console.log('Success:', data);
    } catch (error) {
      console.error('Error sending block to backend:', error);
    }
  };

  const clearBlockList = async () => {
    try {
      const status = await http.remove('/clearBlocksState');
      if (status === 200 || status.ok) {
        setBlockList([]);
        setMatrix([]);
        console.log("BlocksState has been cleared");
      }
    } catch (error) {
      console.error('Error when deleting blocks:', error);
    }
  }
  return (<>
    <div className="matrix">
      <div id="matrix-columns">{matrix.length > 0 ? matrix.map((column, columnIndex) => {
        return (
          <div key={columnIndex} id="matrix-column-elements"> {
            column.map((element, index) => (
              <div key={index} style={{
                width: "50px",
                height: "50px",
                backgroundColor: element.color,
                border: "1px solid #333",
              }}>
              </div>
            ))
          }</div>
        )
      }) : <></>}</div>

    </div>
    <div className='button-group'>
      <button
        className='button'
        onClick={addNewBlockToList}
      >
        Lägg till ruta
      </button>
      <button
        className='button'
        onClick={clearBlockList}
      >
        Re-Start
      </button>
    </div>
  </>
  )
}
