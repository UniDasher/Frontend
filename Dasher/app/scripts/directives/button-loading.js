angular
	.module('btApp')
	.directive('uniButtonLoading', function () {
		var timeline = new TimelineMax();
		function show(elBody, elText, elLoading) {
			TweenMax.fromTo(elBody,.5,{alpha:1},{backgroundColor:'#99d799',borderColor:'#99d799'});
			timeline.fromTo(elText,.5,{opacity:1},{opacity:0,display:'none'})
				.fromTo(elLoading,.1,{scaleX:0},{scaleX:1,alpha:1,display:'block'});
		}

		function hide(elBody, elText, elLoading) {
			//var timeline=new TimelineMax();
			TweenMax.fromTo(elBody,.5,{backgroundColor:'#99d799',borderColor:'#99d799'},{backgroundColor:'#5cb85c',borderColor:'#5cb85c'});
			timeline.fromTo(elLoading,.1,{scaleX:0},{scaleX:1,alpha:1,display:'none'})
				.fromTo(elText,.5,{opacity:0},{opacity:1,display:'block'});
			//TweenMax.killTweensOf(elLoading);
		}

		return {
			restrict: 'AE',
			transclude: true,
			scope: {
				onBind: '&'
			},
			templateUrl:'views/directives/button-loading.html',
			controller: function($scope, $element) {
				var elBody = $element;
				var elText = $element.find('.btn-submit');
				var elLoading = $element.find('.l-wrapper');

				$scope.onBind().show = show.bind(null, elBody, elText, elLoading);
				$scope.onBind().hide = hide.bind(null, elBody, elText, elLoading);
			}
		}
	});
