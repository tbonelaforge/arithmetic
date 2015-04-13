var ArithmeticNode = require('./arithmeticnode');

var node0 = new ArithmeticNode({
  type: 'NUM',
  data: '3',
  id: 0
});

var node1 = new ArithmeticNode({
  type: 'NUM',
  data: '5',
  id: 1
});

var node2 = new ArithmeticNode({
  type: 'NUM',
  data: '2',
  id: 2
});

var node3 = new ArithmeticNode({
  type: 'BOP',
  data: '*',
  size: 3,
  id: 3,
  left: node0,
  right: node1,
  working: true
});

var node4 = new ArithmeticNode({
  type: 'NUM',
  data: '7',
  id: 4
});

var node5 = new ArithmeticNode({
  type: 'BOP',
  data: '+',
  size: 5,
  id: 5,
  left: node2,
  right: node3
});

var node6 = new ArithmeticNode({
  type: 'BOP',
  data: '-',
  size: 7,
  id: 6,
  left: node5,
  right: node4
});

console.log("The structure looks like:\n", JSON.stringify(node6, null, 2));

console.log("About to get cells:\n");
var cells = node6.getCells();
console.log("The cells are:\n", JSON.stringify(cells, null, 2));

console.log("About to getHTML:\n");
var info = {};
var html = node6.getHTML(info);
console.log("The HTML is:\n", html);
console.log("The info is:\n", info);
