
/* Editable */
var node1 = new Node({
  type: "number",
  value: 22
});

var node2 = new Node({
  type: "operator",
  value: '+'
});

var node3 = new Node({
  type: "number", 
  value: 3
});

var node4 = new Node({
  type: "operator",
  value: "*"
});

var node5 = new Node({
  type: "number",
  value: 55
});

node4.left = node3;
node4.right = node5;
node2.left = node1; // node2 is root
node2.right = node4;
NodeScanner.setStates(node2);
// Simulate clicking to start editing
node4.state = 'editing'

console.log("The editable model looks like:\n", node2);

/* Static */

var node6 = new Node({
  type: "number",
  value: 22
});

var node7 = new Node({
  type: "operator",
  value: '+'
});

var node8 = new Node({
  type: "number",
  value: 3
});

var node9 = new Node({
  type: "operator",
  value: '*'
});

var node10 = new Node({
  type: "number",
  value: 55
});

node9.left = node8;
node9.right = node10;
node7.left = node6; // node7 is root
node7.right = node9;
NodeScanner.setStates(node7);

console.log("The static model is:\n");
console.log(node7);

var staticViewNodes = node7.toViewNodes();
console.log("The Static View Nodes are:\n", staticViewNodes);

var staticView = renderView(staticViewNodes);
console.log("The rendered static HTML is:\n", staticView);

var staticContainer = document.getElementById('test-container-static');
staticContainer.innerHTML = staticView;


console.log("The editable model is:\n");
console.log(node2);

var editableViewNodes = node2.toViewNodes();
console.log("The Editable View Nodes are:\n", editableViewNodes);

var editableView = renderView(editableViewNodes);
console.log("The rendered editable HTML is:\n", editableView);

var editableContainer = document.getElementById('test-container-editable');
editableContainer.innerHTML = editableView;

