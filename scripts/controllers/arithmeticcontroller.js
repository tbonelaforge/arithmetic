arithmeticApp.controller(
  'arithmeticController', 
  [
    '$scope',
    'ArithmeticNode',
    '$timeout',
    function($scope, ArithmeticNode, $timeout) {
    console.log("Inside the arithmetic controller, got called, and ArithmeticNode is:\n", ArithmeticNode);
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

  $scope.root = node6;

  $scope.workingId = null;

  $scope.nodesByCellId = null;

  $scope.updateView = function() {
console.log("Inside updateViewData, got called\n");
    $scope.cells = $scope.root.getCells();
console.log("Inside updateViewData, the cells are:\n", $scope.cells);
    $scope.nodesByCellId = {};
    angular.forEach($scope.cells, function(cell) {
      $scope.nodesByCellId[cell.id] = cell.node;
      if (!$scope.workingId && cell.working) {
        $scope.workingId = cell.id;
      }
    });
  };

  $scope.startWorking = function(cell) {
    if (cell.working) {
      return;
    }
    console.log("Inside startWorking, got called with cell:\n", cell);
    if ($scope.workingId) {
      $scope.nodesByCellId[$scope.workingId].working = false;
    }
    $scope.nodesByCellId[cell.id].working = true;
    $scope.updateView();
  }

//  $scope.updateViewData();
  $scope.updateView();
}]);
