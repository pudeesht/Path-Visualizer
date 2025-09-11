
import React from 'react';
import './Node.css';

const Node = ({
  row,
  col,
  isStart,
  isEnd,
  isWall,
  isVisited,
  isPath,
}) => {
   const extraClassName = isEnd
    ? 'node-end'
    : isStart
    ? 'node-start'
    : isPath 
    ? 'node-path'
    : isVisited
    ? 'node-visited'
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
    >
            {/* {row},{col} */}
</div>
  );
};

export default React.memo(Node);