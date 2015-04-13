(function() {
  var node0 = new ArithmeticNode({
    type: 'NUM',
    data: '3',
    id: 0
  });

  var node1 = new ArithmeticNode({
    type: 'NUM',
    data: '5',
    id: 1
  });

  var node2 = new ArithmeticNode({
    type: 'NUM',
    data: '2',
    id: 2
  });

  var node3 = new ArithmeticNode({
    type: 'BOP',
    data: '*',
    size: 3,
    id: 3,
    left: node0,
    right: node1
  });

  var node4 = new ArithmeticNode({
    type: 'NUM',
    data: '7',
    id: 4
  });

  var node5 = new ArithmeticNode({
    type: 'BOP',
    data: '+',
    size: 5,
    id: 5,
    left: node2,
    right: node3
  });
  
  var node6 = new ArithmeticNode({
    type: 'BOP',
    data: '-',
    size: 7,
    id: 6,
    left: node5,
    right: node4
  });

  var nodeInfo = {};

  var startWorking = function(cellId) {
    var node = nodeInfo.nodesByCellId[cellId];
    var previouslyWorking = nodeInfo.workingId;

    if (previouslyWorking) {
      nodeInfo.nodesByCellId[previouslyWorking].working = false;
    }
    node.working = true;
    renderArithmetic();
  };
  
  var stopWorking = function(cellId) {
    var node = nodeInfo.nodesByCellId[cellId];
    node.working = false;
    renderArithmetic();
  };
  
  var root = node6;

  var isNumber = function(response) {
    if (response.match(/^\s*[-+]?\d+\s*$/)) {
      return true;
    }
  };

  var isValidResponse = function(response, workingId) {
    var expected = null;
    var targetNode = null;

    if (!isNumber(response)) {
      return false;
    }
    targetNode = nodeInfo.nodesByCellId[workingId];
    expected = targetNode.evaluate();
    if (Number(response) !== expected) {
      return false;
    }
    return true;
  };
  
  var replaceNode = function(workingId, response) {
    var targetNode = nodeInfo.nodesByCellId[workingId];

    targetNode.type = 'NUM';
    targetNode.data = response;
    targetNode.working = false;
    targetNode.left = null;
    targetNode.right = null;
    root.recalculateSize();
    renderArithmetic();
  };

  var listenForCorrectWork = function(workingId) {
    var response = null;
    
    $('#' + workingId).on('keypress', function(e) {
      if (e.keyCode === 13) {
        $(e.currentTarget).blur();
        response = $(e.currentTarget).text();
        if (isValidResponse(response, workingId)) {
          replaceNode(workingId, response);
        } else {
          stopWorking(workingId);
        }
      }
    });
  };

  var renderArithmetic = function() {
    var html = root.getHTML(nodeInfo);
    $('#arithmetic-node-display td').attr('onclick', '').unbind('click');
    $('#arithmetic-node-display td').off('keypress');
    $('#arithmetic-node-display').html(html);
    if (nodeInfo.workingId) {
      $('#' + nodeInfo.workingId).focus();
      listenForCorrectWork(nodeInfo.workingId);

    }
    if (root.size === 1) {
      $('#success-message').show();
    }
  }
  
  var html = node6.getHTML(nodeInfo);
  
  
  if (typeof $ !== 'undefined') {
    $('document').ready(function() {
      renderArithmetic();
      
      document.addEventListener("click", function (e) {
        var id = e.target.id;
        if (id && id.match(/^arithmetic/)) {
          return; // This was not an outside click.
        }
        if (nodeInfo.workingId) {
          stopWorking(nodeInfo.workingId);
        }
      });
    });
  }
  
  window.startWorking = startWorking;
  
})();
