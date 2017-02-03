function NodeScanner() {
  this.easy = null;
  this.hard = null;
  this.clickableDepth = 0;
}

NodeScanner.prototype.computeClickableNodes = function() {
  var args = Array.from(arguments);
  var node = args.shift();
  var depth = args.length ? args.shift() : 1;

  if (node.type == "operator") {
    if (depth > this.clickableDepth) {
      this.hard = this.easy;
      this.easy = node;
      this.clickableDepth = depth;
    }
  }
  if (node.left) {
    this.computeClickableNodes(node.left, depth + 1);
  }
  if (node.right) {
    this.computeClickableNodes(node.right, depth + 1);
  }
}

NodeScanner.setStates = function(node) {
  var nodeScanner = new NodeScanner();
  nodeScanner.computeClickableNodes(node);
  console.log("Inside NodeScanner.setStates, the nodeScanner object looks like:\n", nodeScanner);
  if (nodeScanner.easy) {
    nodeScanner.easy.state = 'easy';
  }
  if (nodeScanner.hard) {
    nodeScanner.hard.state = 'hard';
  }
}

NodeScanner.findNodeById = function(node, target) {
  if (node.id == target) {
    return node;
  }
  var result = null;
  if (node.left) {
    result = NodeScanner.findNodeById(node.left, target);
  }
  if (result) {
    return result;
  }
  if (node.right) {
    result = NodeScanner.findNodeById(node.right, target);
  }
  return result;
}
