class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }

  getLeftChildIndex(i) {
    return 2 * i + 1;
  }

  getRightChildIndex(i) {
    return 2 * i + 2;
  }

  swap(i1, i2) {
    [this.heap[i1], this.heap[i2]] = [this.heap[i2], this.heap[i1]];
  }

  insert(node) {
    this.heap.push(node);
    let currentIndex = this.heap.length - 1;
    
    while (
      currentIndex > 0 &&
      this.heap[currentIndex].distance < this.heap[this.getParentIndex(currentIndex)].distance
    ) {
      this.swap(currentIndex, this.getParentIndex(currentIndex));
      currentIndex = this.getParentIndex(currentIndex);
    }
  }

  extractMin() {
    if (this.heap.length === 0) {
      return null;
    }
    if (this.heap.length === 1) {
      return this.heap.pop();
    }
    
    const min = this.heap[0];
    this.heap[0] = this.heap.pop(); 
    let currentIndex = 0;
    
    while (this.getLeftChildIndex(currentIndex) < this.heap.length) {
      let smallestChildIndex = this.getLeftChildIndex(currentIndex);
      const rightChildIndex = this.getRightChildIndex(currentIndex);

      if (
        rightChildIndex < this.heap.length &&
        this.heap[rightChildIndex].distance < this.heap[smallestChildIndex].distance
      ) {
        smallestChildIndex = rightChildIndex;
      }

      if (this.heap[currentIndex].distance <= this.heap[smallestChildIndex].distance) {
        break; 
      }
      
      this.swap(currentIndex, smallestChildIndex);
      currentIndex = smallestChildIndex;
    }
    
    return min;
  }
  
  isEmpty() {
    return this.heap.length === 0;
  }
}






export function dijkstra(grid, startNode, endNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  
  const pq = new PriorityQueue();
  pq.insert(startNode);
  
  while (!pq.isEmpty()) {
    const closestNode = pq.extractMin();
    
    // If we encounter a wall, we skip it.
    if (closestNode.isWall) continue;
    
    // If the closest node's distance is Infinity, we are trapped and should stop.
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    
    // If we have reached the end node, we are done.
    if (closestNode === endNode) return visitedNodesInOrder;
    
    updateUnvisitedNeighbors(closestNode, grid, pq);
  }
}

function updateUnvisitedNeighbors(node, grid, pq) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1; // All edge weights are 1
    neighbor.previousNode = node;
    pq.insert(neighbor);
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  
  // Get neighbors in the order: Up, Down, Left, Right
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  
  // Filter out neighbors that have already been visited
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

// Backtracks from the endNode to find the shortest path.
// Only works after the dijkstra function has been run.
export function getNodesInShortestPathOrder(endNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = endNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}