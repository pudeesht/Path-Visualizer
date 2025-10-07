// This is the main function that the React component will call.
// export function recursiveDivisionMaze(grid) {
//   // Create a deep copy of the grid to avoid mutating the original state.
//   const newGrid = grid.map(row => row.map(node => ({ ...node })));
  
//   // Clear any existing walls but keep start/end nodes.
//   for (const row of newGrid) {
//     for (const node of row) {
//       if (!node.isStart && !node.isEnd) {
//         node.isWall = false;
//       }
//     }
//   }

//   // Define the initial chamber which is the entire grid.
//   const rowStart = 0;
//   const rowEnd = newGrid.length - 1;
//   const colStart = 0;
//   const colEnd = newGrid[0].length - 1;

//   // Start the recursive process.
//   addWalls(newGrid, rowStart, rowEnd, colStart, colEnd);

//   return newGrid;
// }




// function shouldBeAgap(r,c, grid, isHorizontal){

//     const rows=grid.length;
//     const cols=grid[0].length;

//     //agar horizontal hai toh we look at col+1 x-1 x+1  || col-1 x+1 x-1
            
//         //up=row-1
//         //down=r+1
        
//         //right=col+1
//         //left=col-1
        

//         let upright = false;
//         let downright = false;
//         let upleft = false;
//         let downleft = false;

//         if (r - 1 >= 0 && c + 1 < cols && grid[r - 1][c + 1].isWall === true) {
//             upright = true;
//         }
//         if (r + 1 < rows && c + 1 < cols && grid[r + 1][c + 1].isWall === true) {
//             downright = true;
//         }
//         if (r - 1 >= 0 && c - 1 >= 0 && grid[r - 1][c - 1].isWall === true) {
//             upleft = true;
//         }
//         if (r + 1 < rows && c - 1 >= 0 && grid[r + 1][c - 1].isWall === true) {
//             downleft = true;
//         }

        
//         //horizontal hai toh matlab upright downright || upleft downleft
//         if(isHorizontal)
//         {
//             if ((upright && downright) || (upleft && downleft)) {
//                 return true;
//             }
//             return false;
//         }
        

//         //row hai matlab upright upleft || downright downleft
//         else
//         {
//             if ((upright && upleft) || (downright && downleft)) {
//                 return true;
//             }

//             return false;
//         }




    

// }




// // This is the recursive helper function.
// function addWalls(grid, rowStart, rowEnd, colStart, colEnd) {
//   const height = rowEnd - rowStart + 1;
//   const width = colEnd - colStart + 1;

//   // Base Case: If the chamber is too small, stop dividing.
//   if (height <= 3 || width <= 3) {
//     return;
//   }

//   // Determine the orientation of the wall to build.
//   // We'll divide the longer dimension to create more balanced mazes.
//   const isHorizontal = height > width;


//   if (isHorizontal) {
//     // 1. Find a random EVEN row to draw the wall on.
//     const wallRow = rowStart + 1 + Math.floor(Math.random() * (height / 2 - 1)) * 2;
//     // 2. Find a random ODD column to create the passage in.
//     const passageCol = colStart + Math.floor(Math.random() * (width / 2)) * 2 + 1;

//     // 3. Draw the wall with the passage.
//     for (let col = colStart; col <= colEnd; col++) {
//         const specialCell=shouldBeAgap(wallRow,col,grid,isHorizontal);
        
        
        
//       if (col !== passageCol && specialCell==false ) {
     
//             grid[wallRow][col].isWall = true;
//           }
//     }

//     // 4. Recursively call the function on the two new sub-chambers.
//     addWalls(grid, rowStart, wallRow - 1, colStart, colEnd); // Top chamber
//     addWalls(grid, wallRow + 1, rowEnd, colStart, colEnd);   // Bottom chamber

//   } else { // isVertical
//     // 1. Find a random EVEN column for the wall.
//     const wallCol = colStart + 1 + Math.floor(Math.random() * (width / 2 - 1)) * 2;
//     // 2. Find a random ODD row for the passage.
//     const passageRow = rowStart + Math.floor(Math.random() * (height / 2)) * 2 + 1;

//     // 3. Draw the wall.
//     for (let row = rowStart; row <= rowEnd; row++) {
//         const specialCell=shouldBeAgap(row,wallCol,grid,isHorizontal)
//         if (row !== passageRow && specialCell==false) {
    
//             grid[row][wallCol].isWall = true;
//           }
                
//     }
    
//     // 4. Recurse on the two new chambers.
//     addWalls(grid, rowStart, rowEnd, colStart, wallCol - 1); // Left chamber
//     addWalls(grid, rowStart, rowEnd, wallCol + 1, colEnd);   // Right chamber
//   }
// }




// // This is the main function that the React component will call.
// export function recursiveDivisionMaze(grid) {
//   // Create a deep copy of the grid to avoid mutating the original state.
//   const newGrid = grid.map(row => row.map(node => ({ ...node })));
  
//   // Clear any existing walls but keep start/end nodes.
//   for (const row of newGrid) {
//     for (const node of row) {
//       if (!node.isStart && !node.isEnd) {
//         node.isWall = false;
//       }
//     }
//   }

//   // Define the initial chamber which is the entire grid.
//   const rowStart = 0;
//   const rowEnd = newGrid.length - 1;
//   const colStart = 0;
//   const colEnd = newGrid[0].length - 1;

//   // Start the recursive process.
//   addWalls(newGrid, rowStart, rowEnd, colStart, colEnd);

//   return newGrid;
// }

// // This is the recursive helper function.
// function addWalls(grid, rowStart, rowEnd, colStart, colEnd) {
//   const height = rowEnd - rowStart + 1;
//   const width = colEnd - colStart + 1;

//   // Base Case: If the chamber is too small, stop dividing.
//   if (height <= 3 || width <= 3) {
//     return;
//   }

//   // Determine the orientation of the wall to build.
//   // We'll divide the longer dimension to create more balanced mazes.
//   const isHorizontal = height > width;

//   if (isHorizontal) {
//     // 1. Find a random EVEN row to draw the wall on.
//     const wallRow = rowStart + 1 + Math.floor(Math.random() * (height / 2 - 1)) * 2;
//     // 2. Find a random ODD column to create the passage in.
//     const passageCol = colStart + Math.floor(Math.random() * (width / 2)) * 2 + 1;

//     // 3. Draw the wall with the passage.
//     for (let col = colStart; col <= colEnd; col++) {
//       if (col !== passageCol) {
//         grid[wallRow][col].isWall = true;
//       }
//     }

//     // 4. Recursively call the function on the two new sub-chambers.
//     addWalls(grid, rowStart, wallRow - 1, colStart, colEnd); // Top chamber
//     addWalls(grid, wallRow + 1, rowEnd, colStart, colEnd);   // Bottom chamber

//   } else { // isVertical
//     // 1. Find a random EVEN column for the wall.
//     const wallCol = colStart + 1 + Math.floor(Math.random() * (width / 2 - 1)) * 2;
//     // 2. Find a random ODD row for the passage.
//     const passageRow = rowStart + Math.floor(Math.random() * (height / 2)) * 2 + 1;

//     // 3. Draw the wall.
//     for (let row = rowStart; row <= rowEnd; row++) {
//       if (row !== passageRow) {
//         grid[row][wallCol].isWall = true;
//       }
//     }
    
//     // 4. Recurse on the two new chambers.
//     addWalls(grid, rowStart, rowEnd, colStart, wallCol - 1); // Left chamber
//     addWalls(grid, rowStart, rowEnd, wallCol + 1, colEnd);   // Right chamber
//   }
// }





// This is the main function that the React component will call.
export function recursiveDivisionMaze(grid) {
  const newGrid = grid.map(row => row.map(node => ({ ...node })));

  // 1. Find the start and end nodes BEFORE clearing walls.
  let startNode = null;
  let endNode = null;
  for (const row of newGrid) {
    for (const node of row) {
      if (node.isStart) startNode = node;
      if (node.isEnd) endNode = node;
      // Clear existing walls at the same time
      if (!node.isStart && !node.isEnd) {
        node.isWall = false;
      }
    }
  }

  const rowStart = 0;
  const rowEnd = newGrid.length - 1;
  const colStart = 0;
  const colEnd = newGrid[0].length - 1;

  // 2. Pass the start/end nodes to the recursive helper.
  addWalls(newGrid, rowStart, rowEnd, colStart, colEnd, startNode, endNode);

  return newGrid;
}

function shouldBeAgap(r,c, grid, isHorizontal){

    const rows=grid.length;
    const cols=grid[0].length;

    //agar horizontal hai toh we look at col+1 x-1 x+1  || col-1 x+1 x-1
            
        //up=row-1
        //down=r+1
        
        //right=col+1
        //left=col-1
        

        let upright = false;
        let downright = false;
        let upleft = false;
        let downleft = false;

        if (r - 1 >= 0 && c + 1 < cols && grid[r - 1][c + 1].isWall === true) {
            upright = true;
        }
        if (r + 1 < rows && c + 1 < cols && grid[r + 1][c + 1].isWall === true) {
            downright = true;
        }
        if (r - 1 >= 0 && c - 1 >= 0 && grid[r - 1][c - 1].isWall === true) {
            upleft = true;
        }
        if (r + 1 < rows && c - 1 >= 0 && grid[r + 1][c - 1].isWall === true) {
            downleft = true;
        }

        
        //horizontal hai toh matlab upright downright || upleft downleft
        if(isHorizontal)
        {
            if ((upright && downright) || (upleft && downleft)) {
                return true;
            }
            return false;
        }
        

        //row hai matlab upright upleft || downright downleft
        else
        {
            if ((upright && upleft) || (downright && downleft)) {
                return true;
            }

            return false;
        }
  }



// 3. Update the helper function to accept and check against start/end nodes.
function addWalls(grid, rowStart, rowEnd, colStart, colEnd, startNode, endNode) {
  const height = rowEnd - rowStart + 1;
  const width = colEnd - colStart + 1;

  if (height <= 3 || width <= 3) {
    return;
  }

  const isHorizontal = height > width;

  if (isHorizontal) {
    let wallRow = rowStart + 1 + Math.floor(Math.random() * (height / 2 - 1)) * 2;
    let passageCol = colStart + Math.floor(Math.random() * (width / 2)) * 2 + 1;
    
    // while (wallRow==lastgap)
    // {
    //   wallRow = rowStart + 1 + Math.floor(Math.random() * (height / 2 - 1)) * 2;
    // }


    // if(passageCol==colStart-1)

    for (let col = colStart; col <= colEnd; col++) {
      // 4. THE CRITICAL FIX: Do not draw a wall if it's the start/end node OR the passage.
      if (
        (wallRow === startNode.row && col === startNode.col) ||
        (wallRow === endNode.row && col === endNode.col) ||
        (shouldBeAgap(wallRow,col,grid,isHorizontal)) ||
        col === passageCol 
      ) {
        continue;
      }
      grid[wallRow][col].isWall = true;
    }

    addWalls(grid, rowStart, wallRow - 1, colStart, colEnd, startNode, endNode);
    addWalls(grid, wallRow + 1, rowEnd, colStart, colEnd, startNode, endNode);

  } else { // isVertical
    const wallCol = colStart + 1 + Math.floor(Math.random() * (width / 2 - 1)) * 2;
    const passageRow = rowStart + Math.floor(Math.random() * (height / 2)) * 2 + 1;

    for (let row = rowStart; row <= rowEnd; row++) {
      // 4. THE CRITICAL FIX: Same check for vertical walls.
      if (
        (row === startNode.row && wallCol === startNode.col) ||
        (row === endNode.row && wallCol === endNode.col) ||
        (shouldBeAgap(row,wallCol,grid,isHorizontal)) ||
        row === passageRow
      ) {
        continue;
      }
      grid[row][wallCol].isWall = true;
    }
    
    addWalls(grid, rowStart, rowEnd, colStart, wallCol - 1, startNode, endNode);
    addWalls(grid, rowStart, rowEnd, wallCol + 1, colEnd, startNode, endNode);
  }
}