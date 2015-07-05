arithmeticApp.factory('ArithmeticNode', function() {
  var CHARSIZE = 15;
  
  function ArithmeticNode(options) {
    var instance = Object.create(ArithmeticNode.prototype);

    angular.extend(instance, {
      type: options.type || null,
      data: options.data || null,
      size: options.size || 1,
      id: options.id || 0,
      left: options.left || null,
      right: options.right || null,
      working: options.working || null
    });

    if (!instance.type) {
      throw new Error('Cannot construct a new arithmetic node without a type:\n' + JSON.stringify(options, null, 2));
    }
    if (!instance.data) {
      throw new Error('Cannot construct a new arithmetic node without data:\n');
    }
    if (instance.id === undefined || instance.id === null || instance.id.toString().length === 0) {
      throw new Error('Cannot construct a new arithmetic node without an id:\n' + JSON.stringify(options, null, 2));
    }
    return instance;
  }

  angular.extend(ArithmeticNode.prototype, {

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
          placeholder: placeholderText,
          'class': 'work',
          tabindex: 1,
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
        placeholder: '',
        'class': ( self.type === 'BOP' ) ? 'clickable' : '',
        data: self.data,
        tabindex: ''
      };
      theseCells = leftCells.concat([thisCell]).concat(rightCells);
      return theseCells;
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
  });

  return ArithmeticNode;
});
