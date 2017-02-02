var viewNode1 = {
  type: "staticNumber",
  value: 22,
  render: function() {
    var html = "";
    var digits = this.getDigitArray();
    for (var i = 0; i < digits.length; i++) {
      var digit = digits[i];
      html += '<span>' + digit + '</span>';
    }
    return html;
  },
  getDigitArray: function() {
    var digitString = "" + this.value;
    var digitArray = digitString.split("");

    return digitArray;
  }
};

var viewNode2 = {
  type: "staticOperator",
  value: '+',
  render: function() {
    var html = "";
    var entity = this.getEntity();

    html += '<span class="mq-binary-operator">' + entity + '</span>';
    return html;
  },

  getEntity: function() {
    if (this.value == '+') {
      return '+';
    } else if (this.value == '*') {
      return '&times;';
    }
  }
}

var viewNode3 = {
  type: 'numberEditor',
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
  render: function() {
    html = '<span class="mq-editable-field" id="editing"><span class="mq-root-block mq-has-cursor">';
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
    html += '</span></span>';
    return html;
  }
};
