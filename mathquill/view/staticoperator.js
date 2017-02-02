var StaticOperator = function(options) {
  this.value = options.value;
};

StaticOperator.prototype.render = function() {
  var entity = this.getEntity();
  var html = '<span class="mq-binary-operator">' + entity + '</span>';

  return html;
};

StaticOperator.prototype.getEntity = function() {
  if (this.value == '+') {
    return '+';
  } else if (this.value == '*') {
    return '&times;';
  }
};
