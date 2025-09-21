import React, { useState, useEffect, useRef } from 'react'; 
import Node from './Node';
import './Grid.css';
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';


const GRID_ROWS =30;
const GRID_COLS = 30;

const createInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < GRID_ROWS; row++) {
    const currentRow = [];
    for (let col = 0; col < GRID_COLS; col++) {
      currentRow.push({
        row,
        col,
        isStart: row === 2 && col === 5,
        isEnd: row === 1 && col === 1,
        isWall: false,
        distance: Infinity,
        isVisited: false,
        isPath:false,
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

  const [nodeBeingDragged, setnodeBeingDragged] = useState(null);

  
const resetGridKeepWalls = () => {
  setGrid(prevGrid => {
    const newGrid = prevGrid.map(row => {
      return row.map(node => {
        // Create a new node object, preserving walls
        // but resetting everything else.
        const newNode = {
          ...node,
          isVisited: false,
          isPath: false,
          distance: Infinity,
          previousNode: null,
        };
        // Reset the visual state, but don't remove the wall class instantly
        // This is more about resetting the algorithm properties
        if (node.isStart) {
            document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-start';
        } else if (node.isEnd) {
            document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-end';
        } else if (!node.isWall) {
            document.getElementById(`node-${node.row}-${node.col}`).className = 'node';
        }
        return newNode;
      });
    });
    return newGrid;
  });
};
///////////////


const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        // Use the functional update form for safety
        setGrid(prevGrid => {
          const newGrid = prevGrid.map(row => row.slice());
          const gridNode = newGrid[node.row][node.col];

          // Make sure not to overwrite start/end node visuals
          if (!gridNode.isStart && !gridNode.isEnd) {
             const newGridNode = { ...gridNode, isVisited: true };
             newGrid[node.row][node.col] = newGridNode;
          }
          return newGrid;
        });
      }, 10 * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        setGrid(prevGrid => {
          const newGrid = prevGrid.map(row => row.slice());
          const gridNode = newGrid[node.row][node.col];

          // Make sure not to overwrite start/end node visuals
          if (!gridNode.isStart && !gridNode.isEnd) {
            const newGridNode = { ...gridNode, isPath: true };
            newGrid[node.row][node.col] = newGridNode;
          }
          return newGrid;
        });
      }, 50 * i);
    }
  };

  //  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
  //   for (let i = 0; i <= visitedNodesInOrder.length; i++) {
  //     // When we have animated all the visited nodes, animate the shortest path
  //     if (i === visitedNodesInOrder.length) {
  //       setTimeout(() => {
  //         animateShortestPath(nodesInShortestPathOrder);
  //       }, 10 * i); // 10ms delay per node
  //       return;
  //     }
      
  //     // For each visited node, schedule a state update
  //     setTimeout(() => {
  //       const node = visitedNodesInOrder[i];
  //       setGrid(prevGrid => {
  //         const newGrid = prevGrid.map(row => row.slice());
  //         const gridNode = newGrid[node.row][node.col];
  //         const newGridNode = {
  //           ...gridNode,
  //           isVisited: true,
  //         };
  //         newGrid[node.row][node.col] = newGridNode;
  //         return newGrid;
  //       });
  //     }, 10 * i);
  //   }
  // };
  
  // const animateShortestPath = (nodesInShortestPathOrder) => {
  //   for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
  //     setTimeout(() => {
  //       const node = nodesInShortestPathOrder[i];
  //       setGrid(prevGrid => {
  //         const newGrid = prevGrid.map(row => row.slice());
  //         const gridNode = newGrid[node.row][node.col];
  //         const newGridNode = {
  //           ...gridNode,
  //           isPath: true,
  //         };
  //         newGrid[node.row][node.col] = newGridNode;
  //         return newGrid;
  //       });
  //     }, 50 * i); // 50ms delay for a slower, more dramatic path animation
  //   }
  // };



///////////////
   const visualizeDijkstra = () => {
    // 1. Reset the board's visual state from any previous run.
    resetGridKeepWalls();

    // 2. Create a deep copy of the grid to be used by the algorithm.
    // THIS IS THE CRITICAL FIX. The algorithm will mutate this copy, not the state.
    const gridCopy = grid.map(row => 
        row.map(node => ({...node}))
    );

    // 3. Find the start and end nodes from the copied grid.
    let startNode = null;
    let endNode = null;
    for (const row of gridCopy) {
      for (const node of row) {
        if (node.isStart) startNode = node;
        if (node.isEnd) endNode = node;
      }
    }

    if (!startNode || !endNode) return;

    // 4. Run the Dijkstra algorithm on the COPY.
    const visitedNodesInOrder = dijkstra(gridCopy, startNode, endNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);

    // 5. Kick off the animation.
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    console.log("Visualize button clicked!");
  };


  // const visualizeDijkstra = () => {
  //   // 1. Find the start and end nodes from the current grid state.
  //   let startNode = null;
  //   let endNode = null;
  //   for (const row of grid) {
  //     for (const node of row) {
  //       if (node.isStart) startNode = node;
  //       if (node.isEnd) endNode = node;
  //     }
  //   }

  //   if (!startNode || !endNode) return;

  //   // 2. Run the Dijkstra algorithm.
  //   const visitedNodesInOrder = dijkstra(grid, startNode, endNode);
  //   const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);

  //   // 3. Kick off the animation.
  //   animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  // };

  useEffect(() => {
    setGrid(createInitialGrid());
  }, []);

  const toggleWall = (row, col) => {
    setGrid(prevGrid => {
      const newGrid = prevGrid.map(gridRow => gridRow.slice());
      const node = newGrid[row][col];
      if (node.isStart || node.isEnd) return prevGrid;
      // const newNode = { ...node, isWall: !node.isWall };
      const newNode = { ...node, isWall: true };
      newGrid[row][col] = newNode;
      return newGrid;
    });
  };

  const handleMouseDown = (event) => {
    const { row, col } = event.target.dataset;
    if(!row || !col)
        return ;
    const node= grid[parseInt(row)][parseInt(col)];
    if(node.isStart){
      setnodeBeingDragged("start");
    }
    if(node.isEnd){
      setnodeBeingDragged("end");
    }
    else {
      toggleWall(parseInt(row), parseInt(col));
    }
    
    setIsMousePressed(true);
    

  };

  const handleMouseMove = (event) => {
    const { row, col } = event.target.dataset;
    if (!isMousePressed || !row || !col) return;
    
    const rowNum=parseInt(row);
    const colNum=parseInt(col);


    if( nodeBeingDragged)
    {

      let oldStartNode=null;
      let oldEndNode=null;


      for(const gridRow of grid)
      {
        for(const node of gridRow)
        {
          if(nodeBeingDragged=="start" && node.isStart)
          {
            oldStartNode=node;
            break;
          }
          if(nodeBeingDragged=="end" && node.isEnd)
          {

            oldEndNode=node;
            break;
          }
        }
        if(oldStartNode||oldEndNode)break;
      }

      if(nodeBeingDragged==="start")
      {
        oldStartNode.isStart=false;
        grid[rowNum][colNum].isStart=true;
      }
      if(nodeBeingDragged==="end")
      {
        oldEndNode.isEnd=false;
        grid[rowNum][colNum].isEnd=true;
      }



    }
    
    
    else{
        const lastNode = lastHoveredNodeRef.current;
    
        if (!lastNode || lastNode.row !== row || lastNode.col !== col) {
          lastHoveredNodeRef.current = { row, col }; 
          toggleWall(rowNum, colNum);
        }

    }
    
  };

  const handleMouseUp = () => {
    setIsMousePressed(false);
    lastHoveredNodeRef.current = null; 
    setnodeBeingDragged(null);
  };

  return (
    <>
      <button onClick={visualizeDijkstra}>Visualize</button>
      <div
        className="grid"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove} 
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${GRID_COLS}, 25px)`, 
      }}
      >
        {grid.map((row, rowIndex) => {
          return row.map((node, nodeIndex) => {
            const { row, col, isStart, isEnd, isWall, isPath, isVisited } = node;
            return (
              <Node
                key={`${rowIndex}-${nodeIndex}`}
                row={row}
                col={col}
                isStart={isStart}
                isEnd={isEnd}
                isWall={isWall}
                isPath={isPath}
                isVisited={isVisited}
              />
            );
          });
        })}
      </div>
    </>


  );
};

export default Grid;