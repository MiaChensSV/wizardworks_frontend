import axios from 'axios';

const BASE_URL = 'https://localhost:7017/api';
const ENDPOINT_GET_BOARD_DATA = '/Block/GetBoardData';
const ENDPOINT_ADD_BLOCK = '/Block/AddBlock';
const ENDPOINT_CLEAR_BLOCK_LIST = '/Block/ClearBlocksState';

const getBoardData = async () => {
  return new Promise((resolve, reject) => {
    axios.get(`${BASE_URL}${ENDPOINT_GET_BOARD_DATA}`).then(response => {
      if(response) {
        resolve(response.data);
      } else {
        resolve(undefined);
      }
    }).catch(error => {
      reject(error);
    })
  });
};

const addBlock = async (block) => {
  return new Promise((resolve, reject) => {
    axios.post(`${BASE_URL}${ENDPOINT_ADD_BLOCK}`, block).then(response => {
      if(response){
        resolve(response.data);
      } else {
        resolve(undefined);
      }
    }).catch(error => {
      reject(error);
    });
  });
};

const clearBlockList = async () => {
  return new Promise((resolve, reject) => {
    axios.delete(`${BASE_URL}${ENDPOINT_CLEAR_BLOCK_LIST}`).then(response => {
      if(response){
        resolve(response.data);
      } else {
        resolve(undefined);
      }
    }).catch(error => {
      reject(error);
    })
  })
}

export {getBoardData, addBlock, clearBlockList};
