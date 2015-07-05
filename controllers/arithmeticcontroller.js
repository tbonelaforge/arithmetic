arithmeticApp.controller(
  'arithmeticController', 
  [
    '$scope',
    'ArithmeticNode',
    '$timeout',
    function($scope, ArithmeticNode, $timeout) {
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

      $scope.updateViewData = function() {
        $scope.cells = $scope.root.getCells();
        $scope.nodesByCellId = {};
        $scope.workingId = null;
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
        if ($scope.workingId) {
          $scope.nodesByCellId[$scope.workingId].working = false;
        }
        $scope.nodesByCellId[cell.id].working = true;
        $scope.updateViewData();
      };
      
      $scope.checkWork = function(e) {
        var response = null;

        if (e.keyCode === 13) {
          response = e.target.textContent;
          if ($scope.isValidResponse(response)) {
            $scope.replaceNode($scope.workingId, response);
          } else {
            $scope.stopWorking($scope.workingId);
          }
        }
      };

      $scope.isValidResponse = function(response) {
        var numericalResponse = Number(response);
        var expected = null;
        var targetNode = null;

        if (!angular.isNumber(numericalResponse)) {
          return false;
        }
        targetNode = $scope.nodesByCellId[$scope.workingId];
        expected = targetNode.evaluate();
        if (numericalResponse !== expected) {
          return false;
        }
        return true;
      };

      $scope.replaceNode = function(workingId, response) {
        var targetNode = $scope.nodesByCellId[workingId];

        targetNode.type = 'NUM';
        targetNode.data = response;
        targetNode.working = false;
        targetNode.left = null;
        targetNode.right = null;
        $scope.root.recalculateSize();
        $scope.updateViewData();
      }

      $scope.stopWorking = function(workingId) {
        var node = $scope.nodesByCellId[workingId];

        node.working = false;
        $scope.updateViewData();
      }

      $scope.updateViewData();
    }
  ]
);
