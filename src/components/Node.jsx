import React from 'react';
import './Node.css';

const Node = ({ isStart, isEnd, isWall }) => {
  let extraClass = '';

  if (isWall) {
    extraClass = 'node-wall';
  } else if (isEnd) {
    extraClass = 'node-end';
  } else if (isStart) {
    extraClass = 'node-start';
  }


  return <div className={`node ${extraClass}`}></div>;
};

export default Node;