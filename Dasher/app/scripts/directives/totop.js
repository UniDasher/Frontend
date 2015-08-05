angular
	.module('btApp')
	.directive('uniTotop', function () {
		return {
			restrict: 'E',
			template:'<a id="totop" href="#"><i class="fa fa-angle-up"></i></a>',
			link: function(scope, el) {
				$(window).scroll(function() {
					if ($(this).scrollTop() < 200) {
						$('#totop').fadeOut();
					} else {
						$('#totop').fadeIn();
					}
				});
				$('#totop').on('click',function() {
					$('html,body').animate({scrollTop: 0}, 'fast')
				});
			}
		}
	})