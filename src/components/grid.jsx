  import React, { useState, useEffect, useRef,forwardRef, useImperativeHandle } from 'react'; 
  import Node from './Node';
  import './Grid.css';
  // import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';




  const Grid = forwardRef((props,ref ) => {
    
    
    const [grid, setGrid] = useState([]);
    const [isMousePressed, setIsMousePressed] = useState(false);
    const lastHoveredNodeRef = useRef(null);
    const {rows:GRID_ROWS,cols:GRID_COLS,isAnimating,visitedNodes,pathNodes ,styleNumber}=props;
    //this indicates if start or end node is being dragged
    const [nodeBeingDragged, setnodeBeingDragged] = useState(null);

    const [startx, setstartx] = useState(0)
    const [starty, setstarty] = useState(0)
    const [endx, setendx] = useState(GRID_ROWS-1)
    const [endy, setendy] = useState(GRID_COLS-1)
  const createInitialGrid = (sx,sy,ex,ey) => {
    const grid = [];
    console.log("init vals are -",sx,sy,ex,ey);
    for (let row = 0; row < GRID_ROWS; row++) {
      const currentRow = [];
      for (let col = 0; col < GRID_COLS; col++) {

        // if(sx!=null && sy!=null && ex!=null && ey!=null)
        // {
        //   console.log("c row c col are",row,col);

        //   currentRow.push({
        //     row,
        //     col,
        //     isStart: row == sx && col ==sy,
        //     isEnd: row == ex && col ==ey,
        //     isWall: false,
        //     distance: Infinity,
        //     isVisited: false,
        //     isPath:false,
        //     previousNode: null,
        //   });

        // }
        
            currentRow.push({
            row,
            col,
            // isStart: row === Math.floor(GRID_ROWS / 2) && col === Math.floor(GRID_COLS / 5),
            // isEnd: row === Math.floor(GRID_ROWS / 2) && col === GRID_COLS - 1 - Math.floor(GRID_COLS / 5),
            isStart: row ===startx && col === starty,
            isEnd: row === endx && col ===endy,
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


  const clearBoard = () => {
      // setIsAnimating(false);
      
      // Clear any lingering animation classes from the DOM
      // const nodes = document.getElementsByClassName('node');
      // for (const node of nodes) {
      //     if (!node.className.includes('node-start') && !node.className.includes('node-end')) {
      //         node.className = 'node';
      //     }
      // }
      let sx;
      let sy;

      let ex;
      let ey;
      // const grid = document.getElementsByClassName('grid');

      // Generate a brand new grid and set it as the state.
      // for(const row of grid)
      // {
      //   for(const col of row)
      //   {
      //     if(grid[row][col].isStart==true)
      //     {
      //       sx=row;
      //       sy=col;
      //     }
      //     if(grid[row][col].isEnd==true)
      //     {
      //       ex=row;
      //       ey=col;
      //     }
      //   }
      // }
      const newGrid = createInitialGrid(sx,sy,ex,ey);
      setGrid(newGrid);
    };

  // const clearBoard = () => {
  //     // 1. Find the current start and end node coordinates from the existing state.
  //     let sx = null;
  //     let sy = null;
  //     let ex = null;
  //     let ey = null;

  //     // We use a functional update to guarantee we have the latest grid state.
  //     setGrid(prevGrid => {
  //       for (const row of prevGrid) {
  //         for (const node of row) {
  //           if (node.isStart) {
  //             sx=node.row;
  //             sy=node.col
  //             // startCoords = { row: node.row, col: node.col };
  //           }
  //           if (node.isEnd) {
  //             ex=node.row;
  //             ey=node.col
              
  //             // endCoords = { row: node.row, col: node.col };
  //           }
  //         }
  //       }

  //       // 2. Create a brand new, completely empty grid.
  //       const newGrid = createInitialGrid(sx, sy,ex,ey);

  //       // 3. Place the start and end nodes at their previous locations.
  //       // if (startCoords) {
  //       //   newGrid[startCoords.row][startCoords.col].isStart = true;
  //       // }
  //       // if (endCoords) {
  //       //   newGrid[endCoords.row][endCoords.col].isEnd = true;
  //       // }

  //       // 4. Return the new grid to update the state.
  //       return newGrid;
  //     });

  //     // We should also clear any lingering animation classes from the DOM
  //     const nodeElements = document.getElementsByClassName('node');
  //     for (const element of nodeElements) {
  //         // A simpler way to reset classes without checking for start/end
  //         element.className = 'node';
  //     }
  //   };



  const clearPath = () => {
      // We disable mouse events during animation, so let's reset that state.
      // We'll add this state in the next big step. For now, it's good practice.
      // setIsAnimating(false); 
      setGrid(prevGrid => {
        const newGrid = prevGrid.map(row => 
          row.map(node => {
            // Check if the node is the start or end node to avoid clearing its class
            // const isSpecialNode = node.isStart || node.isEnd;
            
            // Reset the DOM element's class, but preserve walls, start, and end nodes.
            const nodeElement = document.getElementById(`node-${node.row}-${node.col}`);
            if (nodeElement) {
                if (node.isStart) {
                    nodeElement.className = 'node node-start';
                } else if (node.isEnd) {
                    nodeElement.className = 'node node-end';
                } else if (node.isWall) {
                    nodeElement.className = 'node node-wall';
                } else {
                    nodeElement.className = 'node';
                }
            }

            // Return a new node object, keeping wall status, but resetting others.
            return {
              ...node,
              distance: Infinity,
              isVisited: false,
              isPath: false,
              previousNode: null,
            };
          })
        );
        return newGrid;
      });
  };


  // const resetGridKeepWalls = () => {
  //   setGrid(prevGrid => {
  //     const newGrid = prevGrid.map(row => {
  //       return row.map(node => {
  //         const newNode = {
  //           ...node,
  //           isVisited: false,
  //           isPath: false,
  //           distance: Infinity,
  //           previousNode: null,
  //         };
  //         if (node.isStart) {
  //             document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-start';
  //         } else if (node.isEnd) {
  //             document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-end';
  //         } else if (!node.isWall) {
  //             document.getElementById(`node-${node.row}-${node.col}`).className = 'node';
  //         }
  //         return newNode;
  //       });
  //     });
  //     return newGrid;
  //   });
  // };

  //thru this hamara jo parent hai (app.jsx) woh uske child(grid.jsx)ke functions ko call kar sakta hai
  useImperativeHandle(ref, () => ({
      
      clearBoard: () => {
        clearBoard();
      },
      clearPath: () => {
        clearPath();
      },
      getGrid: () => grid,

      setGrid: (newgrid)=>{
          setGrid(newgrid);
      }

    }));

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

  // const visualizeDijkstra = () => {

  //     console.log("from in button, isanimating is ",isAnimating);

  //     // 1. Reset the board's visual state from any previous run.
  //     resetGridKeepWalls();

  //     // 2. Create a deep copy of the grid to be used by the algorithm.
  //     // THIS IS THE CRITICAL FIX. The algorithm will mutate this copy, not the state.
  //     const gridCopy = grid.map(row => 
  //         row.map(node => ({...node}))
  //     );

  //     // 3. Find the start and end nodes from the copied grid.
  //     let startNode = null;
  //     let endNode = null;
  //     for (const row of gridCopy) {
  //       for (const node of row) {
  //         if (node.isStart) startNode = node;
  //         if (node.isEnd) endNode = node;
  //       }
  //     }

  //     if (!startNode || !endNode) return;

  //     // 4. Run the Dijkstra algorithm on the COPY.
  //     const visitedNodesInOrder = dijkstra(gridCopy, startNode, endNode);
  //     const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
      
      
  //     const visitedAnimationDuration = visitedNodesInOrder.length * 10; // 10ms per node
  //     const pathAnimationDuration = nodesInShortestPathOrder.length * 50; // 50ms per node
  //     const totalDuration = visitedAnimationDuration + pathAnimationDuration;
      
    
    
  //    // 5. Kick off the animation.
  //     animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  //     console.log("Visualize button clicked!");

  //     return totalDuration ;
  // };

    useEffect(() => {
      setGrid(createInitialGrid());
    }, []);

    useEffect(() => {
      // Only animate if we have received valid data
      if (visitedNodes.length > 0 && pathNodes.length > 0) {
        animateDijkstra(visitedNodes, pathNodes);
      }
    }, [visitedNodes, pathNodes]);


    const toggleWall = (row, col) => {
      setGrid(prevGrid => {

        //this line makes shallow copy of each row of original grid , AGAR SEEDHA GRID.SLICE KARTE TOH BAHAR KE ARRAY KI SHALLOW COPY BANTI, ANDAR KA CONTENT SAME HOTA TOH ANY CHANGES ON NEW WOULD HAVE CAUSED CHANGES ON OLD ONE TOO
        const newGrid = prevGrid.map(gridRow => gridRow.slice());
        const node = newGrid[row][col];

        if (node.isStart || node.isEnd) return prevGrid;
        
        //yaha pe i made a change ki a click will make a wall, not toggle the wall status
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
          setstartx(rowNum);
          setstarty(colNum);
        }
        if(nodeBeingDragged==="end")
        {
          oldEndNode.isEnd=false;
          grid[rowNum][colNum].isEnd=true;
          setendx(rowNum);
          setendy(colNum);
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
        {/* <button onClick={visualizeDijkstra}>Visualize</button> */}
        <div
          className="grid"
          onMouseDown={!isAnimating ? handleMouseDown : undefined}
          onMouseMove={!isAnimating ? handleMouseMove : undefined}
          onMouseUp={!isAnimating ? handleMouseUp : undefined}
          onMouseLeave={!isAnimating ? handleMouseUp : undefined}
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
                  styleNumber={styleNumber}
                />
              );
            });
          })}
        </div>
      </>


    );
  });

  export default Grid;





  