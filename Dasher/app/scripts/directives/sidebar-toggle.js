angular
	.module('btApp')
	.directive('uniSidebarToggle', function ($window) {
		return {
			restrict: 'A',
			link: function (scope, $el, attrs) {
				var body = $('body');
				var win = $($window);

				$el.on('click', sidebarElToggle)
				body.on('click', sidebarBodyToggle)
				win.on('resize', sidebarResizeToggle)

				function sidebarElToggle (e) {
					e.stopPropagation();
					body.toggleClass('show-sidebar');
				}

				function sidebarBodyToggle (e) {
					body.hasClass('show-sidebar') && body.removeClass('show-sidebar');
				}

				function sidebarResizeToggle () {
					win.width() > 768 && body.removeClass('show-sidebar');
				}
			}
		}
	});