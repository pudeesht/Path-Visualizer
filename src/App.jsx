import React,{useState,useRef} from 'react';
import Grid from './components/grid';
import './App.css';
import ControlPanel from './components/controlPanel';
import { dijkstra, getNodesInShortestPathOrder } from './algorithms/dijkstra';
import { recursiveDivisionMaze } from './algorithms/mazeAlgorithms';
import { astar } from './algorithms/astar';

const GRID_ROWS =40;
const GRID_COLS = 40;


function App() {

  const gridRef=useRef();
  const [isAnimating, setisAnimating] = useState(false);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [pathNodes, setPathNodes] = useState([]);
  // const [changeStyle, setchangeStyle] = useState(false)
  const [styleNumber, setstyleNumber] = useState(2);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('dijkstra'); 


   const handleAlgorithmChange = (e) => {
    setSelectedAlgorithm(e.target.value);
  };


  // const handleVisualize = () => {
  //   if (isAnimating) return;
    
  //   // 3. Clear any previous path visuals before starting a new one.
  //   handleClearPath();
    
  //   // 4. Get the current grid data from the Grid component
  //   const currentGrid = gridRef.current.getGrid();
    
  //   // Create a clean copy for the algorithm to mutate
  //   const gridCopy = currentGrid.map(row => row.map(node => ({...node})));

  //   // Find start and end nodes from the copy
  //   let startNode = null;
  //   let endNode = null;
  //   for (const row of gridCopy) {
  //     for (const node of row) {
  //       if (node.isStart) startNode = node;
  //       if (node.isEnd) endNode = node;
  //     }
  //   }

  //   // 5. Run the algorithm here, in the parent.
  //   const visitedNodesInOrder = dijkstra(gridCopy, startNode, endNode);
  //   const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);

  //   // 6. Start the process
  //   setisAnimating(true);
  //   // Set the data that will be passed as props, triggering the animation `useEffect` in Grid
  //   setVisitedNodes(visitedNodesInOrder);
  //   setPathNodes(nodesInShortestPathOrder);

  //   // 7. Schedule the end of the animation
  //   const totalDuration = (visitedNodesInOrder.length * 10) + (nodesInShortestPathOrder.length * 50);
  //   setTimeout(() => {
  //     setisAnimating(false);
  //   }, totalDuration);
  // };
  
  const handleClearBoard=()=>{
    if(isAnimating)return;
    setVisitedNodes([]); // Clear animation data
    setPathNodes([]);  
    gridRef.current.clearBoard();
  
  }


  const handleVisualize = () => {
    if (isAnimating) return;
    
    handleClearPath();
    
    const currentGrid = gridRef.current.getGrid();
    const gridCopy = currentGrid.map(row => row.map(node => ({...node})));

    let startNode = null;
    let endNode = null;
    for (const row of gridCopy) {
      for (const node of row) {
        if (node.isStart) startNode = node;
        if (node.isEnd) endNode = node;
      }
    }
    
    // 4. Choose which algorithm to run based on the state
    let visitedNodesInOrder;
    if (selectedAlgorithm === 'dijkstra') {
      visitedNodesInOrder = dijkstra(gridCopy, startNode, endNode);
    } else { // 'astar'
      visitedNodesInOrder = astar(gridCopy, startNode, endNode);
    }

    const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);

    // ... (the rest of the visualization logic remains the same)
    setisAnimating(true);
    setVisitedNodes(visitedNodesInOrder);
    setPathNodes(nodesInShortestPathOrder);

    const totalDuration = (visitedNodesInOrder.length * 10) + (nodesInShortestPathOrder.length * 50);
    setTimeout(() => {
      setisAnimating(false);
    }, totalDuration);
  };

  const handleClearPath=()=>{
    if(isAnimating)return;
    setVisitedNodes([]); // Clear animation data
    setPathNodes([]);  
    gridRef.current.clearPath();
    
  }
  
  const handleStyleChange=()=>{
    if(styleNumber==2)
    {
      setstyleNumber(0);
    }
    else{
      setstyleNumber(styleNumber+1);
    }
  }

  const handleGenerateMaze = () => {
    if (isAnimating) return;
    
    // First, clear any existing path/visited nodes
    handleClearPath();
    // handleClearBoard();
    const currentGrid = gridRef.current.getGrid();
    const newGridWithMaze = recursiveDivisionMaze(currentGrid);
    
    // We need a way to set this new grid in the Grid component's state.
    // We'll add a 'setGrid' function to its imperative handle.
    gridRef.current.setGrid(newGridWithMaze);
  };

  return (
    <div className="App">
      
      
    
    
      <h1>Pathfinding Algorithm Visualizer</h1>



       <ControlPanel
       isAnimating={isAnimating}
       onClearBoard={handleClearBoard}
       onVisualize={handleVisualize}
       onClearPath={handleClearPath}
       onCssChange={handleStyleChange}
       onGenerateMaze={handleGenerateMaze}
      onAlgorithmChange={handleAlgorithmChange} 

       />   
      
      <Grid
      isAnimating={isAnimating}
      ref={gridRef}
      rows={GRID_ROWS}
      cols={GRID_COLS}
      visitedNodes={visitedNodes}
      pathNodes={pathNodes}
      styleNumber={styleNumber}
      />
    
    
    
    
    </div>
  );
}

export default App;