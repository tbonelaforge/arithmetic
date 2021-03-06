
var numberEditor = {
  buffer: [
    new Node({type: 'number', value: 3}),
    new Node({type: 'operator', value: '*'}),
    new Node({type: 'number', value: 5})
  ],
  startPoint: 0,
  endPoint: 3,
  selectionActive: true,
  shiftKeyDown: false,
  handleRightArrow: function() {
    if (this.endPoint < this.buffer.length) {
      this.endPoint += 1;
    }
    this.handleMovingEndpoint();
  },
  handleLeftArrow: function() {
    if (this.endPoint > 0) {
      this.endPoint -= 1;
    }
    this.handleMovingEndpoint();
  },
  handleShiftKeyDown: function() {
    if (!this.selectionActive && !this.shiftKeyDown) {
      this.shiftKeyDown = true;
      this.startPoint = this.endPoint;
      this.selectionActive = true;
    } else if (!this.selectionActive && this.shiftKeyDown) {
      // Shouldn't get here!
    } else if (this.selectionActive && !this.shiftKeyDown) {
      this.shiftKeyDown = true;
    } else if (this.selectionActive && this.shiftKeyDown) {
      // Shouldn't get here!
    } else {
      console.log("Unrecognized state!", this);
    }
  },
  handleShiftKeyUp: function() {
    this.shiftKeyDown = false;
    if (!this.selectionActive && !this.shiftKeyDown) {
      // Shouldn't get here!
    } else if (!this.selectionActive && this.shiftKeyDown) {
      // recording !shiftKeyDown is enough
    } else if (this.selectionActive && !this.shiftKeyDown) {
      // Shouldn't get here!
    } else if (this.selectionActive && this.shiftKeyDown) {
      
    }
  },
  handleMovingEndpoint: function() {
    if (!this.selectionActive && !this.shiftKeyDown) {
      // moving the point is enough.
    } else if (!this.selectionActive && this.shiftKeyDown) {
      // Should never get here!
    } else if (this.selectionActive && !this.shiftKeyDown) {
      this.selectionActive = false;
    } else if (this.selectionActive && this.shiftKeyDown) {
      // moving point is enough.
    } else {
      console.log("Unrecognized state!", this);
    }
  },
  getSelectionLeft: function() {
    if (this.startPoint <= this.endPoint) {
      return this.startPoint;
    } else {
      return this.endPoint;
    }
  },
  getSelectionRight: function() {
    if (this.startPoint <= this.endPoint) {
      return this.endPoint;
    } else {
      return this.startPoint;
    }
  },
  printAsHTML: function() {
    html = '<span class="mq-root-block">';
    for (var p = 0; p <= this.buffer.length; p++) {
      if (p == this.endPoint) {
        html += '<span class="mq-cursor" id="cursor">&#8203;</span>';
      }
      if (this.selectionActive && this.getSelectionLeft() == p) {
        html += '<span class="mq-selection">';
      }
      if (this.selectionActive && this.getSelectionRight() == p) {
        html += '</span>';
      }
      if (p < this.buffer.length) {
        html += this.buffer[p].printAsHTML();
      }
    }
    html += '</span>';
    return html;
  }
};

function onKeyPress(event) {
  // NEED digits 0-9
  console.log("Inside onKeyPress, got called with event:\n");
  console.log(event);
  //numberEditor.processKeyEvent(event);
}

function onKeyDown(event) {
  // Need Shift, left Arrow, Right Arrow
  console.log("Inside onKeyDown, got called with event:\n");
  if (event.code == "ArrowRight") {
    numberEditor.handleRightArrow();
  } else if (event.code == "ArrowLeft") {
    numberEditor.handleLeftArrow();
  } else if (event.key == "Shift") {
    numberEditor.handleShiftKeyDown();
  }
  console.log("The new state is:\n", numberEditor);
  console.log("The new HTML is:\n", numberEditor.render());
  edit1Element.innerHTML = numberEditor.render();
}

function onKeyUp(event) {
  // Need Shift
  console.log("Inside onKeyUp, got called with event:\n");
  if (event.key == "Shift") {
    numberEditor.handleShiftKeyUp();
  }
  console.log("The new state is:\n", numberEditor);
  console.log("The new HTML is:\n", numberEditor.printAsHTML());
  edit1Element.innerHTML = numberEditor.printAsHTML();
}

var edit1Element = document.getElementById('edit1');
edit1Element.focus();

edit1Element.addEventListener("keypress", onKeyPress, false);
edit1Element.addEventListener("keydown", onKeyDown, false);
edit1Element.addEventListener("keyup", onKeyUp, false);

setInterval(function() {
  //console.log("Inside the setInterval function, toggling blink...\n");
  var cursorElement = $('#cursor');
  //console.log("Got cursor:\n", cursorElement);
  $('#cursor').toggleClass('mq-blink');
}, 500);

function handleOperatorClick() {
  console.log("Inside handleOperatorClick, got called...\n");
}

var clickableElement = document.getElementById('node4');
console.log("The clickableElement is:\n", clickableElement);
clickableElement.addEventListener("click", handleOperatorClick);



function renderViewNodes(viewNodes) {
  var html = "";
  html += '<span class="mq-math-mode"><span class="mq-root-block">';
  for (var i = 0; i < viewNodes.length; i++) {
    var viewNode = viewNodes[i];
    var viewNodeHtml = viewNode.render();
    html += viewNodeHtml;
  }
  html += '</span></span';
  return html;
}

console.log('The result of rendering the viewnodes is:\n');
var view = renderViewNodes([viewNode1, viewNode2, viewNode3]);
console.log(view);
var generatedHtmlElement = document.getElementById('generated-html');
generatedHtmlElement.innerHTML = view;

var node1
