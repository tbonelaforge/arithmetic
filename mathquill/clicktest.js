var node6 = new Node({
  id: 6,
  type: "number",
  value: 22
});

var node7 = new Node({
  id: 7,
  type: "operator",
  value: '+'
});

var node8 = new Node({
  id: 8,
  type: "number",
  value: 3
});

var node9 = new Node({
  id: 9,
  type: "operator",
  value: '*'
});

var node10 = new Node({
  id: 10,
  type: "number",
  value: 55
});

node9.left = node8;
node9.right = node10;
node7.left = node6; // node7 is root
node7.right = node9;
NodeScanner.setStates(node7);

function findNumberEditor(viewNodes) {
  for (var i = 0; i < viewNodes.length; i++) {
    if (viewNodes[i] instanceof NumberEditor) {
      return viewNodes[i];
    }
  }
  return null;
}

function updateDisplay() {
  var viewNodes = node7.toViewNodes();
  var numberEditor = findNumberEditor(viewNodes);
  var view = renderView(viewNodes);
  var container = document.getElementById('clicktest');
  container.innerHTML = view;  
  $('.clickable').click(handleClick);
  return numberEditor;
}



function onKeyUp(numberEditor) {
  return function(event) {
    // Need Shift key

    if (event.key == "Shift") {
      numberEditor.handleShiftKeyUp();
    } else {
      return;
    }
  };
}

function onKeyDown(numberEditor) {
  return function(event) {
    // Need Shift, left Arrow, Right Arrow

    if (event.code == "ArrowRight") {
      numberEditor.handleRightArrow();
    } else if (event.code == "ArrowLeft") {
      numberEditor.handleLeftArrow();
    } else if (event.key == "Shift") {
      numberEditor.handleShiftKeyDown();
    } else {
      return;
    }
    editorElement.innerHTML = numberEditor.render();
  };
}

function onKeyPress(numberEditor) {
  // Need digits 0-9

  return function(event) {
    console.log("Inside onKeyPress, got called with event:\n");
    console.log(event);
  };
}

var editorElement;

function startEditing(targetNode) {
  targetNode.state = "editing";
  var numberEditor = updateDisplay();
  setInterval(function() {
    var cursorElement = $('#cursor');
    $('#cursor').toggleClass('mq-blink');
  }, 500);
  editorElement = document.getElementById("editor");
  editorElement.addEventListener("keypress", onKeyPress(numberEditor), false);
  editorElement.addEventListener("keydown", onKeyDown(numberEditor), false);
  editorElement.addEventListener("keyup", onKeyUp(numberEditor), false);
  editorElement.focus();
}

function handleClick(e) {
  var id = parseInt(e.target.getAttribute('id'));
  var targetNode = NodeScanner.findNodeById(node7, id);

  startEditing(targetNode)
}

updateDisplay();
