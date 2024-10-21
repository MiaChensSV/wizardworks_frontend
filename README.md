# Matrix

This project is a React app that displays and manages blocks in a dynamic matrix, interacting with a .NET backend.

## Features
Add colored blocks to a dynamic matrix.
Clear all blocks (re-start).
Communicates with a backend API for data persistence.

## Prerequisites
Node.js v20 and npm or yarn
Backend API (running and accessible)

## Running the app locally

### Installation
#### Clone the repo:
`$ git clone https://github.com/your-username/frontend-dynamic-grid.git`
`$ cd wizardworks_frontend`

#### Install dependencies:
`$ npm install`

#### Create a .env file:
`$ REACT_APP_BASE_URL=http://localhost:7017/api`
`$ REACT_APP_GET_BOARD_DATA=/Block/GetBoardData`
`$ REACT_APP_ADD_BLOCK=/Block/AddBlock`
`$ REACT_APP_CLEAR_BLOCK_LIST=/Block/ClearBlocksState`

### Start server
In the project directory, you can run:
`$ npm start`

### API Endpoints
GET /Block/GetBoardData: Fetches current blocks.
POST /Block/AddBlock: Adds a new block.
DELETE /Block/ClearBlocksState: Clears all blocks.

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
