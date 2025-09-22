import React,{useState,useRef} from 'react';
import Grid from './components/grid';
import './App.css';
import ControlPanel from './components/controlPanel';


const GRID_ROWS =10;
const GRID_COLS = 30;


function App() {

  const gridRef=useRef();
  const [isAnimating, setisAnimating] = useState(false);


  const handleVisualize = () => {
    // 1. Prevent multiple clicks while an animation is in progress.
    if (isAnimating) return;

    // 2. First, get the information we need from the child component.
    if (gridRef.current) {
      // This call will kick off the animation inside the Grid.
      const  totalDuration  = gridRef.current.visualize();
      
      // 3. NOW, we tell React to update the state and schedule the reversal.
      setisAnimating(true);
      
      setTimeout(() => {
        setisAnimating(false);
      }, totalDuration);
    }
  };

  
  const handleClearBoard=()=>{
    if(isAnimating)return;
    if(gridRef.current)
    {
      gridRef.current.clearBoard();
    }
  }

  const handleClearPath=()=>{
    if(isAnimating)return;
    if(gridRef.current)
    {
      gridRef.current.clearPath();
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
       />   
      
      <Grid
      isAnimating={isAnimating}
      ref={gridRef}
      rows={GRID_ROWS}
      cols={GRID_COLS}
      />
    
    
    
    
    </div>
  );
}

export default App;