
import React from 'react';
import './Node.css';

const Node = ({
  row,
  col,
  isStart,
  isEnd,
  isWall,
}) => {
  const extraClassName = isEnd
    ? 'node-end'
    : isStart
    ? 'node-start'
    : isWall
    ? 'node-wall'
    : '';
  console.log(`rendered-${row}-${col}`);
  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}

      data-row={row}
      data-col={col}
    ></div>
  );
};

export default React.memo(Node);