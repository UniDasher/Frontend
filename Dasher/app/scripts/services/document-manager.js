angular
  .module('btApp')
  .factory('DocumentManager', function DocumentManager($injector) {
    var $rootScope = $injector.get('$rootScope')
    var $state = $injector.get('$state')
    var $stateParams = $injector.get('$stateParams')
    var $timeout = $injector.get('$timeout')
    var $modal = $injector.get('$modal')

    $rootScope.$on('$stateChangeStart', function(e) {
      if ($state.current.dirty) {
        var text = [
          'You have unsaved changes, are you sure you',
          'want to leave this page without saving?'
        ].join(' ')

        !confirm(text) && e.preventDefault()
      }

      $state.current.dirty = undefined
    })

    var documentManager = {}

    documentManager.init = function ($scope, targetName, Resource, defaults, params) {
      $scope[targetName] = defaults || {}
      $scope[targetName]._id = $stateParams.id

      if ( 'new'!== $stateParams.id) {
        Resource.get(params || { id: $stateParams.id }, function (res) {
          $scope[targetName] = res
          documentManager.watch($scope, targetName)
        })
      } else {
        this.watch($scope, targetName)
      }

      $scope.save = angular.bind(this, this.save, $scope, targetName, Resource)
      $scope.delete = angular.bind(this, this.delete, $scope, targetName, Resource)
    }

    documentManager.watch = function ($scope, targetName) {
      $scope.$watch(targetName, function (current, old) {
        if (undefined === $state.current.dirty) {
          $state.current.dirty = false
        } else {
          $state.current.dirty = true
        }
      }, true)
    }

    documentManager.save = function ($scope, targetName, Resource) {
      $scope.isSaving = true
      $scope.saveResponse = 'Saving...'

      if ('new' === $scope[targetName]._id) {
        $scope[targetName] = Resource.save($scope[targetName], saveSuccess, saveError)
      } else {
        $scope[targetName].$update().then(saveSuccess, saveError)
      }

      function saveSuccess(err) {
        $scope.saveResponse = 'Saved!'
        $scope.isSaving = false

        $timeout(function () {
          $scope.saveResponse = false
          $state.current.dirty = false

          //if ('new' === $stateParams.id) {
            $state.go('^.edit', { id: $scope[targetName]._id },{reload: true})
          //}
        }, 2000)
      }

      function saveError(rejection) {
        $scope.saveResponse = 'Error: ' + rejection.data.error
        $scope.isSaving = false
        $scope.apiError = rejection.data

        $scope.errorModal = $modal.open({
          templateUrl: 'views/document-manager-modal.html',
          scope: $scope
        })

        $timeout(function () {
          $scope.saveResponse = false
        }, 2000)
      }
    }

    documentManager.upsert = function ( $scope, targetName, Resource )
    {
      $scope.isSaving = true;
      $scope.saveResponse = 'Saving...';

      if ( $stateParams.id === 'new' )
      {
        $scope[ targetName ] = Resource.save( $scope[ targetName ], saveSuccess, saveError );
      }
      else
      {
        $scope[ targetName ].$update().then( saveSuccess, saveError );
      }

      function saveSuccess( err )
      {
        $scope.saveResponse = 'Saved!';
        $scope.isSaving = false;

        $timeout( function () {
          $scope.saveResponse = false;
          $state.current.dirty = false;

          if ( $stateParams.id === 'new' )
          {
            $state.go( '^.edit', { id: $scope[ targetName ]._id } );
          }
        }, 2000)
      }

      function saveError( rejection ) {
        $scope.saveResponse = 'Error: ' + rejection.data.error;
        $scope.isSaving = false;
        $scope.apiError = rejection.data;

        $scope.errorModal = $modal.open({
          templateUrl: 'views/document-manager-modal.html',
          scope: $scope
        })

        $timeout( function () {
          $scope.saveResponse = false;
        }, 2000)
      }
    }

    documentManager.delete = function ($scope, targetName, Resource) {
      $scope.isDeleting = true
      $scope.deleteResponse = 'Deleting...'

      Resource.delete({ id: $scope[targetName]._id }).$promise.then(function () {
        $scope.deleteResponse = 'Deleted!'
        $scope.isDeleting = false

        $timeout(function () {
          $state.current.dirty = undefined
          $state.go('^')
        }, 1500)
      }, function (rejection) {
        $scope.deleteResponse = rejection.data.error
      })
    }

    return documentManager
  })