import React, { useState, useEffect } from 'react';
import './grid.css';
import Node from './node';
const GRID_ROWS = 20;
const GRID_COLS = 50;

const Grid = () => {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    const initialGrid = [];
    for (let row = 0; row < GRID_ROWS; row++) {
      const currentRow = [];
      for (let col = 0; col < GRID_COLS; col++) {
        const node = {
          row,
          col,
          isStart: row === 10 && col === 5,
          isEnd: row === 10 && col === 45,   
          isWall: false,
          distance: Infinity,
          isVisited: false,
          previousNode: null,
        };
        currentRow.push(node);
      }
      initialGrid.push(currentRow);
    }
    setGrid(initialGrid);
  }, []);

  return (
    <div className="grid">
      {grid.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="grid-row">
            {row.map((node, nodeIndex) => {
              const { row, col, isStart, isEnd, isWall } = node;
              return (
                <Node
                  key={nodeIndex}
                  row={row}
                  col={col}
                  isStart={isStart}
                  isEnd={isEnd}
                  isWall={isWall}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;