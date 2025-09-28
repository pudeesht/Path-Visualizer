import React,{useState,useRef} from 'react';
import Grid from './components/grid';
import './App.css';
import ControlPanel from './components/controlPanel';
import { dijkstra, getNodesInShortestPathOrder } from './algorithms/dijkstra';



const GRID_ROWS =10;
const GRID_COLS = 30;


function App() {

  const gridRef=useRef();
  const [isAnimating, setisAnimating] = useState(false);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [pathNodes, setPathNodes] = useState([]);
  // const [changeStyle, setchangeStyle] = useState(false)
  const [styleNumber, setstyleNumber] = useState(0);

  const handleVisualize = () => {
    if (isAnimating) return;
    
    // 3. Clear any previous path visuals before starting a new one.
    handleClearPath();
    
    // 4. Get the current grid data from the Grid component
    const currentGrid = gridRef.current.getGrid();
    
    // Create a clean copy for the algorithm to mutate
    const gridCopy = currentGrid.map(row => row.map(node => ({...node})));

    // Find start and end nodes from the copy
    let startNode = null;
    let endNode = null;
    for (const row of gridCopy) {
      for (const node of row) {
        if (node.isStart) startNode = node;
        if (node.isEnd) endNode = node;
      }
    }

    // 5. Run the algorithm here, in the parent.
    const visitedNodesInOrder = dijkstra(gridCopy, startNode, endNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);

    // 6. Start the process
    setisAnimating(true);
    // Set the data that will be passed as props, triggering the animation `useEffect` in Grid
    setVisitedNodes(visitedNodesInOrder);
    setPathNodes(nodesInShortestPathOrder);

    // 7. Schedule the end of the animation
    const totalDuration = (visitedNodesInOrder.length * 10) + (nodesInShortestPathOrder.length * 50);
    setTimeout(() => {
      setisAnimating(false);
    }, totalDuration);
  };
  
  const handleClearBoard=()=>{
    if(isAnimating)return;
    setVisitedNodes([]); // Clear animation data
    setPathNodes([]);  
    gridRef.current.clearBoard();
  
  }

  const handleClearPath=()=>{
    if(isAnimating)return;
    setVisitedNodes([]); // Clear animation data
    setPathNodes([]);  
    gridRef.current.clearPath();
    
  }
  
  const handleStyleChange=()=>{
    if(styleNumber==3)
    {
      setstyleNumber(1);
    }
    else{
      setstyleNumber(styleNumber+1);
    }
  }


  return (
    <div className="App">
      
      
    
    
      <h1>Pathfinding Algorithm Visualizer</h1>



       <ControlPanel
       isAnimating={isAnimating}
       onClearBoard={handleClearBoard}
       onVisualize={handleVisualize}
       onClearPath={handleClearPath}
       onCssChange={handleStyleChange}
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