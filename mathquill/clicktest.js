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

function findNumberEditor(viewNodes) {
  for (var i = 0; i < viewNodes.length; i++) {
    if (viewNodes[i] instanceof NumberEditor) {
      return viewNodes[i];
    }
  }
  return null;
}

function updateDisplay() {
  var viewNodes = root.toViewNodes();
  var numberEditor = findNumberEditor(viewNodes);
  var view = renderView(viewNodes);
  var container = document.getElementById('clicktest');
  container.innerHTML = view;  
  $('.clickable').click(handleOperatorClick);
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
    // Need Shift, left Arrow, Right Arrow, Delete

    if (event.code == "ArrowRight") {
      numberEditor.handleRightArrow();
    } else if (event.code == "ArrowLeft") {
      numberEditor.handleLeftArrow();
    } else if (event.key == "Shift") {
      numberEditor.handleShiftKeyDown();
    } else if (event.key == "Backspace") {
      numberEditor.handleDelete();
    } else {
      return;
    }
    editorElement.innerHTML = numberEditor.render();
  };
}

function onKeyPress(numberEditor) {
  return function(event) {
    // Need digits 0-9, Enter

    if (event.key.match(/^\d$/)) {
      var digit = parseInt(event.key);
      numberEditor.handleDigitInsert(digit);
    } else if (event.key == "Enter") {
      handleSubmission(numberEditor);
    } else {
      return;
    }
    editorElement.innerHTML = numberEditor.render();
  };
}

// Controller State.
var root = node7;
var editorElement = null;
var cursorFlasher = null;
var targetNode = null;


function flashCursor() {
  if (cursorFlasher != null) {
    clearInterval(cursorFlasher);
    cursorFlasher = null;
  }
  cursorFlasher = setInterval(function() {
    var cursorElement = $('#cursor');
    $('#cursor').toggleClass('mq-blink');
  }, 500);
}

function startEditing(targetNode) {
  targetNode.state = "editing";
  var numberEditor = updateDisplay();
  flashCursor();
  editorElement = document.getElementById("editor");
  editorElement.addEventListener("keypress", onKeyPress(numberEditor), false);
  editorElement.addEventListener("keydown", onKeyDown(numberEditor), false);
  editorElement.addEventListener("keyup", onKeyUp(numberEditor), false);
  editorElement.focus();
}

function handleOperatorClick(e) {
  e.stopPropagation();
  var id = parseInt(e.target.getAttribute('id'));
  targetNode = NodeScanner.findNodeById(root, id);
  startEditing(targetNode);
}

function resetDisplay() {
  NodeScanner.setStates(root);
  if (cursorFlasher != null) {
    clearInterval(cursorFlasher);
    cursorFlasher = null;
  }
  updateDisplay();
}

function handleClickOutside(e) {
  resetDisplay();
}

function handleSubmission(numberEditor) {
  var submission = numberEditor.parseBuffer();
  if (submission != null) {
    var expected = targetNode.evaluate();
    if (submission == expected) {
      var replacementNode = new Node({
        type: 'number',
        value: submission
      });
      root = NodeScanner.replace(root, targetNode, replacementNode);
    }
  } else {
    console.log("The submission was not parseable...");
  }
  resetDisplay();
}

updateDisplay();

// allow clicking out of editable area to go back to static display
document.addEventListener('click', handleClickOutside, false);
