import React, { useState, useEffect } from 'react';
import './Desk.css';

export default function Desk() {

  const [blockList, setBlockList] = useState([]);
  const [matrix, setMatrix] = useState([]);

  useEffect(() => {
    const newBlockList = [];
    setBlockList(newBlockList);
  }, [])

  // map block list to matrix
  useEffect(() => {
    const newMatrix = initMatrix();
    // console.log('NEW MATRIX', newMatrix);
    if (blockList.length > 0) {
      blockList.forEach(block => {
        let isBlockAdded = false;
        while (!isBlockAdded) {  //?
          isBlockAdded = addColumnToMatrix(block, newMatrix);
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
    const newMatrix = [[], []];
    return newMatrix;
  }

  const addNewBlockToList = () => {
    const newBlock = { id: blockList.length + 1, color: getDifferentColor() };
    setBlockList(prev => [...prev, newBlock]);

  }
  const addColumnToMatrix = (block, matrix) => {
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
    matrix.push([]);
  }

  const colors = ["#FC5858", "#FCAD58", "#58FC61", "#948597", "#B058FC"];

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };
  const getDifferentColor = () => {
    // Get the last block's color
    const lastBlockColor = blockList.length > 0 ? blockList[blockList.length - 1].color : null;
    console.log(lastBlockColor + ' last')
    let newColor = getRandomColor();
    console.log(newColor + ' new')
    while (newColor === lastBlockColor) {
      newColor = getRandomColor();
      console.log('reget ' + newColor)
    }
    return newColor;
  };

  return (<>
    <div className="matrix">
      <div id="matrix-columns">{matrix.length > 0 ? matrix.map(column => {
        return (
          <div id="matrix-column-elements"> {
            column.map((element, index) => (
              <div key={index} style={{
                width: "50px",
                height: "50px",
                backgroundColor: element.color,
                border: "1px solid #333",
              }}>
                {element.id}
              </div>
            ))
          }</div>
        )
      }) : <></>}</div>

    </div>
    <button
      className='button'
      onClick={addNewBlockToList} // Call method to add new block
    >
      Lägg till ruta
    </button>
  </>
  )
}
