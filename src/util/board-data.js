import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;
console.log('test' +process.env.REACT_APP_BASE_URL )
const ENDPOINT_GET_BOARD_DATA = process.env.REACT_APP_GET_BOARD_DATA;
const ENDPOINT_ADD_BLOCK = process.env.REACT_APP_ADD_BLOCK;
const ENDPOINT_CLEAR_BLOCK_LIST = process.env.REACT_APP_CLEAR_BLOCK_LIST;

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
