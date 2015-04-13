(function() {
var CHARSIZE = 15;

var ArithmeticNode = function(options) {
  this.type = options.type || null;
  this.data = options.data || null;
  this.size = options.size || 1;
  this.id = options.id || 0;
  this.left = options.left || null;
  this.right = options.right || null;
  this.working = options.working || false;

  if (!this.type) {
    throw new Error('Cannot construct a new arithemetic node without a type:\n' + JSON.stringify(options, null, 2));
  }
  if (!this.data) {
    throw new Error('Cannot construct a new arithemetic node without data:\n' + JSON.stringify(options, null, 2));
  }
  if (this.id === undefined || this.id === null || this.id.toString().length === 0) {
    throw new Error('Cannot construct a new arithmetic node without an id:\n' + JSON.stringify(options, null, 2));
  }
};

ArithmeticNode.prototype = {
  getHTML: function(info) {
    var self = this;
    var cells = self.getCells();
    var tableRow = '<tr id="arithmetic-row">'
    var columnSpec = '<colgroup id="arithmetic-column-group">';
    var cell = null;
    var html = null;
    var i;
    
    if (!info) {
      info = {}
    }
    info.nodesByCellId = {};
    info.workingId = null;
    for (i = 0; i < cells.length; i++) {
      cell = cells[i];
      info.nodesByCellId[cell.id] = cell.node;
      columnSpec += ('<col id="arithmetic-column' + i + '" width="' + cell.width + 'px">');
      tableRow += self.getTableCell(cell);
      if (!info.workingId && cell.working) {
        info.workingId = cell.id;
      }
    }
    tableRow += '</tr>';
    html = '<table id="arithmetic-table" class="fixed">' + columnSpec + tableRow + '</table>';
    return html;
  },

  getCells: function() {
    var self = this;
    var thisCell = null;
    var placeholderText = null;
    var leftCells = null;
    var rightCells = null;
    var theseCells = null;

    if (self.working) {
      placeholderText = self.getPlaceholderText();
      thisCell = {
        node: self,
        width: self.size * CHARSIZE,
        working: true,
        id: 'arithmetic-working-node' + self.id,
        placeholder: placeholderText
      };
      return [thisCell];
    }
    leftCells = ( self.left ) ? self.left.getCells() : [];
    rightCells = ( self.right ) ? self.right.getCells() : [];
    thisCell = {
      node: self,
      width: CHARSIZE,
      working: false,
      id: 'arithmetic-node' + self.id,
      data: self.data
    };
    theseCells = leftCells.concat([thisCell]).concat(rightCells);
    return theseCells;
  },

  getTableCell: function(cell) {
    var self = this;
    var extraClass = '';

    if (cell.working) {
      return '<td contenteditable="true" class="work" id="' + cell.id + '" placeholder="' + cell.placeholder + '" tabindex="1"></td>';
    }
    if (cell.node.type === 'BOP') {
      extraClass = 'class="clickable"';
    }
    return '<td id="' + cell.id + '" onclick="startWorking(\'' + cell.id + '\')"' + extraClass + '>' + cell.data + '</td>';
  },
  
  getPlaceholderText: function() {
    var self = this;
    var leftText = ( self.left ) ? self.left.getPlaceholderText() : '';
    var rightText = ( self.right ) ? self.right.getPlaceholderText() : '';
    if (leftText.length) {
      leftText += ' ';
    }
    if (rightText.length) {
      rightText = ' ' + rightText;
    }
    var placeholderText = leftText + self.data + rightText;

    return placeholderText;
  },
  
  recalculateSize: function() {
    var self = this;
    var leftSize = ( self.left ) ? self.left.recalculateSize() : 0;
    var rightSize = ( self.right ) ? self.right.recalculateSize() : 0;
    self.size = leftSize + 1 + rightSize;
    return self.size;
  },

  evaluate: function() {
    var self = this;
    var leftValue = null;
    var rightValue = null;

    if (self.type === 'NUM') {
      return Number(self.data);
    }
    leftValue = self.left.evaluate();
    rightValue = self.right.evaluate();
    if (self.type === 'BOP') {
      if (self.data === '+') {
        return leftValue + rightValue;
      } else if (self.data === '-') {
        return leftValue - rightValue;
      } else if (self.data === '*') {
        return leftValue * rightValue;
      } else {
        throw new Error('Unrecognized binary operator: ' + self.data);
      }
    } else {
      throw new Error('Unrecognized node type: ' + self.type);
    }
  }
};

if (typeof module !== 'undefined') {
  module.exports = ArithmeticNode;  
}
if (typeof window !== 'undefined') {
  window.ArithmeticNode = ArithmeticNode;
}


})();
