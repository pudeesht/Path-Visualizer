# Flow of functions control

- As of now there are 3 main components :
    - **App.jsx** _(Main parent component)
    - **Grid.jsx**    _(rendering & func of grid)_
    - **ControlPanel.jsx** _(Seperate file for buttons)_
    
- App.jsx mei 2 components hai grid.jsx and controlpanel.jsx

- ControlPanel.jsx is there just for seperate and cleaner code, it just has buttons and invokes functions

- those functions logic is actually in grid.jsx

- so when app.jsx ka child controlpanel invokes a function, the parent (app.jsx) recognises and then run the corresponding function of its child (grid.jsx)

### HOW DO WE DO THIS?? **(USING USEREF)**

- **AIM:** To click buttons in ControlPanel, and have them run corresponding logic (like visualizeDijkstra, clearBoard, clearPath) that lives inside Grid.jsx.


- **Grid.jsx :** I am using forwardRef + useImperativeHandle to expose internal methods to the parent (App):
```javascript
const Grid = forwardRef((props,ref ) => {
    
    //some code
    
    useImperativeHandle(ref, () => ({
      visualize: () => {
        visualizeDijkstra();
      },
      clearBoard: () => {
        clearBoard();
      },
      clearPath: () => {
        clearPath();
      },
    }));

    //some code again
});

```
This allows parent(app.jsx ) to call:
```javascript
gridRef.current.visualize();
gridRef.current.clearBoard();
gridRef.current.clearPath();
```

- **App.jsx (The parent) :** I use useRef() to store a reference to the Grid component.

```jsx
const gridRef = useRef();

const handleVisualize = () => {
  gridRef.current.visualize(); // Triggers method in Grid
};

const handleClearBoard = () => {
  gridRef.current.clearBoard(); // Triggers method in Grid
};

const handleClearPath = () => {
  gridRef.current.clearPath(); // Triggers method in Grid
};

```
_These handlers are passed to ControlPanel as props_


- **OVERALL SUMMARY**

```pgsql
[ControlPanel Button Clicked]
           ↓
[Calls handler from App (handleVisualize, etc)]
           ↓
[App uses ref to call method in Grid]
           ↓
[Grid runs the logic (visualizeDijkstra, clearBoard, etc.)]

```


<br>
<br>
<br>
<br>
<br>
<br>





















































# QnA

### Q. Whats the use of USEREF?(grid.jsx) :


**Short ans** :
Doesnt cause rerender, can be used across many rerenders to check ki last time kya value this by doing useref.current


**Gemini**:
Our handleMouseMove function is extremely sensitive. It fires many times per second. We needed a way to answer the question: "What was the very last node I colored?"
We create the sticky note: const lastHoveredNodeRef = useRef(null);
This gives us a special object: { current: null }. This object itself never changes. Only the value inside the .current property changes.
When the mouse is moving (handleMouseMove)-
We read the sticky note: const lastNode = lastHoveredNodeRef.current;
We check if the current mouse position (row, col) is different from what's on the note.
If it is different, it means we've moved to a new node. So, we color the wall, and then we update the sticky note: lastHoveredNodeRef.current = { row, col };.
When the user lets go of the mouse (handleMouseUp)-
We erase the sticky note: lastHoveredNodeRef.current = null;. This ensures that the next time the user starts dragging, we don't have old information confusing us.



<br>


### Q. In togglewall why do we do grid.row.slic and not grid.slice()?(grid.jsx) :

**Ans:**
this line makes shallow copy of each row of original grid ,
AGAR SEEDHA GRID.SLICE KARTE TOH BAHAR KE ARRAY KI SHALLOW COPY BANTI,
ANDAR KA CONTENT SAME HOTA TOH ANY CHANGES ON NEW WOULD HAVE CAUSED CHANGES ON OLD ONE TOO

---

<br>
 


## !!Gemini BS on animating Djikstera!!


- The Core Problem: JavaScript is Too Fast
JavaScript
Imagine you have a list of 500 visited nodes. If you were to write a simple loop like this
code
// THIS IS THE WRONG WAY - THE "INSTANT" WAY

- What would happen? The for loop would execute in a few milliseconds. Your computer would perform all 500 setGrid calls almost instantly. React is smart and would batch them together, and you would see all 500 nodes turn blue at the exact same time. There would be no step-by-step animation at all.
Our challenge is: how do we tell JavaScript, "Hey, I want you to do this one small thing, then wait a little bit, then do the next small thing, then wait a little bit more..."?
- The Solution: setTimeout - The Time-Delayed Messenger
The setTimeout function is the key. It's like hiring a messenger and telling them: "Here's a task. Don't do it now. I want you to wait for a specific amount of time (e.g., 50 milliseconds), and then do the task."
Let's look at our animateDijkstra function again, but simplified and with comments.
code
Jsx
```javascript
const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
  // We loop through every single node that our algorithm visited.
  for (let i = 0; i < visitedNodesInOrder.length; i++) {
    
    // This is the most important line.
    // We are NOT changing the color right now.
    // Instead, for each node, we are hiring a separate messenger (`setTimeout`).
    setTimeout(() => {
      // This is the "task" the messenger will perform AFTER the delay.
      const nodeToAnimate = visitedNodesInOrder[i];
      
      // The task is to update our grid state to mark this one node as 'isVisited'.
      // This causes React to re-render just that one node with the new blue color.
      setGrid(prevGrid => {
        const newGrid = prevGrid.map(row => row.slice());
        const gridNode = newGrid[nodeToAnimate.row][nodeToAnimate.col];
        if (!gridNode.isStart && !gridNode.isEnd) {
          const newGridNode = { ...gridNode, isVisited: true };
          newGrid[nodeToAnimate.row][nodeToAnimate.col] = newGridNode;
        }
        return newGrid;
      });
      
    }, 10 * i); // This is the delay we give the messenger.
  }

  // ... (logic for path animation) ...
};
```
The Magic of the Loop: Scheduling, Not Executing
Here’s the mental model you should have. When the for loop runs, it is not animating anything. It is running incredibly fast, just like our "instant" loop before. But instead of changing colors, its only job is to schedule all the animations for the future.
Let's trace the first few iterations of the loop
- When i = 0: The loop says, "OK, hire a messenger. Tell them to color the 0th node in the list blue, but wait 10 * 0 = 0 milliseconds before doing it." (This one happens almost instantly).
When i = 1: The loop says, "Hire another messenger. Tell them to color the 1st node blue, but wait 10 * 1 = 10 milliseconds before doing it."
When i = 2: The loop says, "Hire another messenger. Tell them to color the 2nd node blue, but wait 10 * 2 = 20 milliseconds before doing it."
... and so on.
When i = 499: The loop says, "Hire the last messenger. Tell them to color the 499th node blue, but wait 10 * 499 = 4990 milliseconds (about 5 seconds) before doing it."
The entire for loop finishes in a flash. But it has left behind 500 "time bombs" or scheduled tasks. The browser's event loop will now start picking them up as their timers expire, one every 10 milliseconds.
---
---




