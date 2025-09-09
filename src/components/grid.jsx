import React, { useState, useEffect, useRef } from 'react'; 
import Node from './Node';
import './Grid.css';

const GRID_ROWS = 20;
const GRID_COLS = 50;

const createInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < GRID_ROWS; row++) {
    const currentRow = [];
    for (let col = 0; col < GRID_COLS; col++) {
      currentRow.push({
        row,
        col,
        isStart: row === 10 && col === 5,
        isEnd: row === 10 && col === 45,
        isWall: false,
        distance: Infinity,
        isVisited: false,
        previousNode: null,
      });
    }
    grid.push(currentRow);
  }
  return grid;
};

const Grid = () => {
  const [grid, setGrid] = useState([]);
  const [isMousePressed, setIsMousePressed] = useState(false);
  const lastHoveredNodeRef = useRef(null);

  useEffect(() => {
    setGrid(createInitialGrid());
  }, []);

  const toggleWall = (row, col) => {
    setGrid(prevGrid => {
      const newGrid = prevGrid.map(gridRow => gridRow.slice());
      const node = newGrid[row][col];
      if (node.isStart || node.isEnd) return prevGrid;
      const newNode = { ...node, isWall: !node.isWall };
      newGrid[row][col] = newNode;
      return newGrid;
    });
  };

  const handleMouseDown = (event) => {
    const { row, col } = event.target.dataset;
    if (row && col) {
      toggleWall(parseInt(row), parseInt(col));
      setIsMousePressed(true);
    }
  };

  const handleMouseMove = (event) => {
    if (!isMousePressed) return;
    const { row, col } = event.target.dataset;
    const lastNode = lastHoveredNodeRef.current;

    if (row && col && (!lastNode || lastNode.row !== row || lastNode.col !== col)) {
      lastHoveredNodeRef.current = { row, col }; 
      toggleWall(parseInt(row), parseInt(col));
    }
  };

  const handleMouseUp = () => {
    setIsMousePressed(false);
    lastHoveredNodeRef.current = null; 
  };

  return (
    <div
      className="grid"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove} 
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {grid.map((row, rowIndex) => {
        return row.map((node, nodeIndex) => {
          const { row, col, isStart, isEnd, isWall } = node;
          return (
            <Node
              key={`${rowIndex}-${nodeIndex}`}
              row={row}
              col={col}
              isStart={isStart}
              isEnd={isEnd}
              isWall={isWall}
            />
          );
        });
      })}
    </div>
  );
};

export default Grid;