import React,{useRef} from 'react';
import Grid from './components/grid';
import './App.css';
import ControlPanel from './components/controlPanel';


const GRID_ROWS =30;
const GRID_COLS = 30;


function App() {

  const gridRef=useRef();

  const handleVisualize=()=>{
    if(gridRef.current)
    {
      gridRef.current.visualize();
    }
  }

  
  const handleClearBoard=()=>{
    if(gridRef.current)
    {
      gridRef.current.clearBoard();
    }
  }

  const handleClearPath=()=>{
    if(gridRef.current)
    {
      gridRef.current.clearPath();
    }
  }
    
  return (
    <div className="App">
      
      
    
    
      <h1>Pathfinding Algorithm Visualizer</h1>



       <ControlPanel
       onClearBoard={handleClearBoard}
       onVisualize={handleVisualize}
       onClearPath={handleClearPath}
       />   
      
      <Grid
      ref={gridRef}
      rows={GRID_ROWS}
      cols={GRID_COLS}
      />
    
    
    
    
    </div>
  );
}

export default App;