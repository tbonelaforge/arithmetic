function Node(options) {
  this.type = options.type; // Can be 'number' or 'operator'
  this.value = options.value;
  this.editing = options.editing || false;
  this.left = options.left || null;
  this.right = options.right || null;
}



Node.prototype.getOperatorCode = function() {
  if (this.value == '*') {
    return '&times;'
  } else if (this.value == '+') {
    return '+';
  }
}

Node.prototype.toBufferContent = function() {
  var bufferContent = [];

  if (this.type == 'operator') {
    console.log("Inside toBufferContent, got called on node: this:\n", this);
//    bufferContent.push(this.copy());
//    bufferContent.push(new BufferNode({type: 'operator', value: this.value}));
    bufferContent.push(new StaticOperator({value: this.value}));
  } else if (this.type == 'number') {
    var digitArray = this.splitDigits();
    for (var i = 0; i < digitArray.length; i++) {
      var digit = digitArray[i];
//      bufferContent.push(new Node({type: 'number', value: parseInt(digit)}));
//      bufferContent.push(new BufferNode({type: 'number', value: parseInt(digit)}));
      bufferContent.push(new StaticDigit({digit: parseInt(digit)}));
    }
  }
  return bufferContent;
};

Node.prototype.toBufferContents = function() {
  var left = [];
  var right = [];

  if (this.left) {
    left = this.left.toBufferContents();
  }
  if (this.right) {
    right = this.right.toBufferContents();
  }
  var thisBufferContent = this.toBufferContent();
  var bufferContents = left.concat(thisBufferContent, right);
  return bufferContents;
}

Node.prototype.toNumberEditor = function() {
  var bufferContents = this.toBufferContents();
  var numberEditor = new NumberEditor({
    buffer: bufferContents,
    startPoint: 0,
    endPoint: bufferContents.length,
    selectionActive: true,
    shiftKeyDown: false
  });

  return numberEditor;
}


Node.prototype.toViewNodes = function() {
  if (this.editing) {
    return [this.toNumberEditor()];
  }
  var left = [];
  var right = [];

  if (this.left) {
    left = this.left.toViewNodes();
  }
  if (this.right) {
    right = this.right.toViewNodes();
  }
  var theseViewNodes = this.toTheseViewNodes();
  var viewNodes = left.concat(theseViewNodes, right);
  return viewNodes;
};

Node.prototype.toTheseViewNodes = function() {
  if (this.type == "number") {
    var digitArray = this.splitDigits();
    var theseViewNodes = [];
    for (var i = 0; i < digitArray.length; i++) {
      var digit = digitArray[i];
      theseViewNodes.push(new StaticDigit({digit: digit}));
    }
    return theseViewNodes;    
  }
  else if (this.type == "operator") {
    return [new StaticOperator({value: this.value})];
  } else {
    console.log("Unrecognized node type: %s", this.type);
  }
};

Node.prototype.splitDigits = function() {
  var digitArray = ("" + this.value).split("");
  
  return digitArray;
};

Node.prototype.copyToBuffer = function() {
  var copy = new Node(this);

  return copy;
};
