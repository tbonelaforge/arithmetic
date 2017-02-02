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
  value: "*",
  editing: true
});

var node5 = new Node({
  type: "number",
  value: 55
});

node4.left = node3;
node4.right = node5;
node2.left = node1;
node2.right = node4;

console.log("The model is:\n");
console.log(node2);

var viewNodes = node2.toViewNodes();
console.log("The View Nodes are:\n", viewNodes);

var view = renderView(viewNodes);
console.log("The rendered HTML is:\n", view);

var container = document.getElementById('test-container');
container.innerHTML = view;
