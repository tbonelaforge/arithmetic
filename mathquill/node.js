function Node(options) {
  this.type = options.type; // Can be 'digit' or 'operator'
  this.value = options.value;
}

Node.prototype.printAsHTML = function() {
  if (this.type == 'digit') {
    return '<span>' + this.value + '</span>';
  } else if (this.type == 'operator') {
    return '<span class="mq-binary-operator">' + this.getOperatorCode() + '</span>';
  }
}

Node.prototype.getOperatorCode = function() {
  if (this.value == '*') {
    return '&times;'
  } else if (this.value == '+') {
    return '+';
  }
}
