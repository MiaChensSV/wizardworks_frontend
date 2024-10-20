import React from 'react';
import './Block.css';

export default function Desk(props) {
  
  return (
    <div className='block' style={{
      backgroundColor: props.color
    }}>
    </div>
  );
}
