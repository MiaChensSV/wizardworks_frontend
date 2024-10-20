import React, { useState, useEffect } from 'react';
import './Board.css';
import { getBoardData, addBlock, clearBlockList } from '../../util/board-data';
import Block from '../Block/Block';

export default function Desk() {

  // State for rendering
  const [colors, setColors] = useState([])
  const [blockList, setBlockList] = useState([]);
  const [matrix, setMatrix] = useState([]);
  // State for data fetching
  const [hasOngoingHttpPromise, setHasOngoingHttpPromise] = useState(false);
  const [isTimerFinished, setIsTimerFinished] = useState(true);

  // Fetching Board data when page mount
  useEffect(() => {
    if (hasOngoingHttpPromise) return;
    setHasOngoingHttpPromise(true);
    getBoardData().then(result => {
      setHasOngoingHttpPromise(false);
      if (!result) return;
      setColors(result.availableColors);
      setBlockList(result.blocksState);
    }).catch(error => {
      console.log(error);
      setHasOngoingHttpPromise(false);
    });
  }, [])

  //Map block list to matrix
  useEffect(() => {
    const newMatrix = initMatrix();
    if (blockList.length > 0) {
      blockList.forEach(block => {
        let isBlockAdded = false;
        while (!isBlockAdded) {
          isBlockAdded = addBlockToMatrix(block, newMatrix);
          if (!isBlockAdded) {
            expandMatrix(newMatrix);
          }
        }
      });
    }
    setMatrix(newMatrix);
  }, [blockList])

  // Event handlers
  const addNewBlockBtnClick = async () => {
    if (hasOngoingHttpPromise) return;
    startBtnDisableTimer();
    setHasOngoingHttpPromise(true);
    const newBlock = { position: blockList.length + 1, color: getRandomDifferentColor() };
    addBlock(newBlock).then(result => {
      setHasOngoingHttpPromise(false);
      if (!result) return;
      setBlockList(result);
    }).catch(error => {
      console.log(error);
      setHasOngoingHttpPromise(false);
    })
  };

  const clearBlockListBtnClick = async () => {
    if (hasOngoingHttpPromise) return;
    startBtnDisableTimer();
    setHasOngoingHttpPromise(true);
    clearBlockList().then(result => {
      setHasOngoingHttpPromise(false);
      console.log('result: ', !result);
      if (!result) return;
      setBlockList(result);
    })
  };

  // Methods
  const startBtnDisableTimer = () => {
    setIsTimerFinished(false);
    setTimeout(() => {
      setIsTimerFinished(true);
    }, 100);
  }

  const initMatrix = () => {
    const newMatrix = [[],];
    return newMatrix;
  }

  const addBlockToMatrix = (block, matrix) => {
    const columnsLength = matrix.map(column => column.length);
    const minLength = Math.min.apply(null, columnsLength);
    const minLengthIndex = columnsLength.indexOf(minLength);
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
  const getRandomDifferentColor = () => {
    // Get the last block's color
    const lastBlockColor = blockList.length > 0 ? blockList[blockList.length - 1].color : null;
    let newColor = getRandomColor();
    while (newColor === lastBlockColor) {
      newColor = getRandomColor();
    }
    return newColor;
  };

  return (
    <>
      <div className="matrix">
        <div id="matrix-columns">{matrix.length > 0 ? matrix.map((column, columnIndex) => {
          return (
            <div key={'row-' + columnIndex} id="matrix-column-elements"> {
              column.map((element, index) => {
                return (<Block key={'column-' + index} color={element.color} />)
              })
            }</div>
          )
        }) : <></>}</div>

      </div>
      <div className='button-group'>
        <button
          className='button'
          disabled={hasOngoingHttpPromise || !isTimerFinished}
          onClick={addNewBlockBtnClick}
        >
          Lägg till ruta
        </button>
        <button
          className='button'
          disabled={hasOngoingHttpPromise || !isTimerFinished}
          onClick={clearBlockListBtnClick}
        >
          Re-Start
        </button>
      </div>
    </>
  )
}
