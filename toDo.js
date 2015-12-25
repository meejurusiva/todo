var  app = angular
    .module('myapp', [])
    .directive('myDraggable', ['$document', function($document) {
        return {
          link: function(scope, element, attr) {
           var startX = 0, startY = 0, x = 0, y = 0;

      element.css({
       position: 'relative',
       border: '1px solid red',
       backgroundColor: 'lightgrey',
       cursor: 'pointer'
      });

      element.on('mousedown', function(event) {
        // Prevent default dragging of selected content
        event.preventDefault();
        startX = event.pageX - x;
        startY = event.pageY - y;
        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);
      });

      function mousemove(event) {
        y = event.pageY - startY;
        x = event.pageX - startX;
        element.css({
          top: y + 'px',
          left:  x + 'px'
        });
      }

      function mouseup() {
        $document.off('mousemove', mousemove);
        $document.off('mouseup', mouseup);
      }
    }
  };
}])
    .controller('myCtrl', function myCtrl($scope) {
      $scope.saved=localStorage.getItem('list');
      $scope.list = (localStorage.getItem('list')!== null) ? JSON.parse($scope.saved) : [ {text:'sample',description:'sample_description', done: false}];
      localStorage.setItem('list',JSON.stringify($scope.list));
      
    
      $scope.submit = function() {
        //if ($scope.toDoText && $scope.toDoDesc) 
        
            $scope.list.push({text:$scope.toDoText,description:$scope.toDoDesc,done:false});
        
            $scope.toDoText = '';
            $scope.toDoDesc='';
            localStorage.setItem('list',JSON.stringify($scope.list));
      };

      
  });
