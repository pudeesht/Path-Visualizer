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



export function dijkstra(grid, startNode, endNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  
  const priorityQueue = new PriorityQueue();
  priorityQueue.insert(startNode);
  
  while (!priorityQueue.isEmpty()) {
    const closestNode = priorityQueue.extractMin();
    

    if (closestNode.isVisited) continue;
    
    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    
    if (closestNode === endNode) return visitedNodesInOrder;
    
    updateUnvisitedNeighbors(closestNode, grid, priorityQueue);
  }
  return visitedNodesInOrder;
}

function updateUnvisitedNeighbors(node, grid, priorityQueue) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    const newDistance = node.distance + 1;
    if (newDistance < neighbor.distance) {
      neighbor.distance = newDistance;
      neighbor.previousNode = node;
      priorityQueue.insert(neighbor);
    }
  }
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