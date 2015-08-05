/**
 * Created by 毅 on 2015/3/17.
 */
angular
    .module('btApp')
    .directive('professionTree', function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                treedata: '='
            },
            template: '<div class="family-tree-vertical">'+
                        '<ul>'+
                            '<li name="{{ treedata.level }}">'+
                                '<a href="#">{{ treedata.name }}</a>'+
                                '<parent-tree parentdata="treedata"></parent-tree>'+
                            '</li>'+
                        '</ul>'+
                      '</div>'
        }
    })
    .directive('parentTree', function () {
        return {
            restrict: 'EA',
            replace: true,
            //transclude: true,
            scope: {
                parentdata: '='
            },
            template:'<ul class="parentnode">'+
                        '<li ng-repeat="pnode in parentdata.child" name="{{ pnode.level }}">'+
                            '<a  href="">{{ pnode.name }}</a>'+
                            '<child-tree childdata="pnode"></child-tree>'+
                        '</li>'+
                     '</ul>',
            controller:function($scope,$element){
                //同节点都响应事件
                //$element.on('click',function(e){
                //    var child = $element.find('ul');
                //    if(child.is(":visible")) child.hide('fast');
                //    else child.show('fast');
                //    e.stopPropagation();
                //});
            }
        }
    })
    .directive('childTree', function($compile){
        return {
            restrict: 'EA',
            replace: false,
            //transclude: true,
            scope: {
                childdata: '='
            },
            template:'<ul class="childnode">'+
                        '<li ng-repeat="cnode in childdata.child" name="{{ cnode.level }}">'+
                            '<a href="">{{ cnode.name }}</a>'+
                        '</li>'+
                     '</ul>',
            link: function($scope, $element,$attrs) {
                if (angular.isArray($scope.childdata.child) && $scope.childdata.child.length > 0) {
                    var data = $scope.childdata.child;
                    //var pelement = $element[0].querySelector('ul li').find('a');
                    console.log($element.find('a'));
                    //pelement.append('<parent-tree parentdata="data"></parent-tree>');
                    //$element.append('<parent-tree parentdata="data"></parent-tree>');
                    $compile($element.contents())($scope);
                }
            },

        }
    });