class PriorityQueue {
  
  constructor() { this.heap = []; }
  getParentIndex(i) { return Math.floor((i - 1) / 2); }
  getLeftChildIndex(i) { return 2 * i + 1; }
  getRightChildIndex(i) { return 2 * i + 2; }
  swap(i1, i2) { [this.heap[i1], this.heap[i2]] = [this.heap[i2], this.heap[i1]]; }
  insert(node) {
    this.heap.push(node);
    let currentIndex = this.heap.length - 1;
    while (currentIndex > 0 && this.heap[currentIndex].distance < this.heap[this.getParentIndex(currentIndex)].distance) {
      this.swap(currentIndex, this.getParentIndex(currentIndex));
      currentIndex = this.getParentIndex(currentIndex);
    }
  }
  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    let currentIndex = 0;
    while (this.getLeftChildIndex(currentIndex) < this.heap.length) {
      let smallestChildIndex = this.getLeftChildIndex(currentIndex);
      const rightChildIndex = this.getRightChildIndex(currentIndex);
      if (rightChildIndex < this.heap.length && this.heap[rightChildIndex].distance < this.heap[smallestChildIndex].distance) {
        smallestChildIndex = rightChildIndex;
      }
      if (this.heap[currentIndex].distance <= this.heap[smallestChildIndex].distance) break;
      this.swap(currentIndex, smallestChildIndex);
      currentIndex = smallestChildIndex;
    }
    return min;
  }
  isEmpty() { return this.heap.length === 0; }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

export function getNodesInShortestPathOrder(endNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = endNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
export function astar(grid, startNode, endNode) {
  const visitedNodesInOrder = [];
  
  // Initialize nodes with gCost and fCost (distance)
  for (const row of grid) {
    for (const node of row) {
      node.gCost = Infinity;
      node.distance = Infinity; // 'distance' will now represent the 'f' cost
    }
  }

  startNode.gCost = 0;
  startNode.distance = manhattanDistance(startNode, endNode); // fCost = gCost(0) + hCost
  
  const priorityQueue = new PriorityQueue();
  priorityQueue.insert(startNode);
  
  while (!priorityQueue.isEmpty()) {
    const closestNode = priorityQueue.extractMin();
    
    if (closestNode.isVisited) continue;
    if (closestNode.isWall) continue;
    
    // NOTE: Unlike Dijkstra, we can't stop if distance is Infinity
    // because the 'f' cost can be large even if the node is reachable.
    
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    
    if (closestNode === endNode) return visitedNodesInOrder;
    
    // Pass the endNode to the update function
    updateUnvisitedNeighbors(closestNode, grid, priorityQueue, endNode);
  }
  return visitedNodesInOrder;
}


// ... (after the main astar function)

// NEW HELPER FUNCTION
function manhattanDistance(nodeA, nodeB) {
  const dx = Math.abs(nodeA.col - nodeB.col);
  const dy = Math.abs(nodeA.row - nodeB.row);
  return dx + dy;
}

// MODIFIED UPDATE FUNCTION
function updateUnvisitedNeighbors(node, grid, priorityQueue, endNode) { // Now accepts endNode
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    // 'g' cost is the actual distance from the start
    const gCost = node.gCost + 1; // Assuming weight of 1

    if (gCost < neighbor.gCost) {
      neighbor.gCost = gCost;
      // 'h' cost is the estimated distance to the end (the heuristic)
      const hCost = manhattanDistance(neighbor, endNode);
      // 'f' cost is the total priority for the queue
      const fCost = gCost + hCost;

      // We will store the final 'f' cost in the 'distance' property,
      // as that's what our Priority Queue uses to sort.
      neighbor.distance = fCost;
      neighbor.previousNode = node;
      priorityQueue.insert(neighbor);
    }
  }
}

// ... (getUnvisitedNeighbors and getNodesInShortestPathOrder remain the same)