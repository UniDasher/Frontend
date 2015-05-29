(function () {
    var app, deps;
    deps = ['treeGrid'];
    app = angular.module('treeApp', deps);
    app.controller('treeGridController', function ($scope, $timeout) {
        var tree;
        var rawTreeData = [
            {
                "DemographicId": 1,
                "ParentId": null,
                "Name": "United States of America"
            },
            {
                "DemographicId": 2,
                "ParentId": 1,
                "Name": "California"
            },
            {
                "DemographicId": 3,
                "ParentId": 2,
                "Name": "San Francisco"
            },
            {
                "DemographicId": 4,
                "ParentId": 2,
                "Name": "Los Angeles"
            },
            {
                "DemographicId": 5,
                "ParentId": 1,
                "Name": "Illinois"
            },
            {
                "DemographicId": 6,
                "ParentId": 5,
                "Name": "Chicago"
            },
            {
                "DemographicId": 7,
                "ParentId": 1,
                "Name": "Texas"
            },
            {
                "DemographicId": 8,
                "ParentId": 1,
                "Name": "New York"
            },
            {
                "DemographicId": 14,
                "ParentId": 8,
                "Name": "Manhattan"
            },
            {
                "DemographicId": 15,
                "ParentId": 14,
                "Name": "Manhattan City"
            },
            {
                "DemographicId": 16,
                "ParentId": 14,
                "Name": "Time Square"
            },
            {
                "DemographicId": 17,
                "ParentId": 8,
                "Name": "Niagra water fall"
            },
            {
                "DemographicId": 18,
                "ParentId": 8,
                "Name": "Long Island"
            },
            {
                "DemographicId": 51,
                "ParentId": 1,
                "Name": "All_Other"
            },
            {
                "DemographicId": 201,
                "ParentId": null,
                "Name": "India"
            },
            {
                "DemographicId": 301,
                "ParentId": null,
                "Name": "Bangladesh"
            }
            ];

        var myTreeData = getTree(rawTreeData, 'DemographicId', 'ParentId');

        $scope.tree_data = myTreeData;
        $scope.my_tree = tree = {};
        $scope.expanding_property = {
            field: "Name",
            displayName: "Demographic Name"
        };
        $scope.my_tree_handler = function (branch) {
            console.log('you clicked on', branch)
        };
        function getTree(data, primaryIdName, parentIdName) {
            if (!data || data.length == 0 || !primaryIdName || !parentIdName)
                return [];

            var tree = [],
                rootIds = [],
                item = data[0],
                primaryKey = item[primaryIdName],
                treeObjs = {},
                parentId,
                parent,
                len = data.length,
                i = 0;

            while (i < len) {
                item = data[i++];
                primaryKey = item[primaryIdName];
                treeObjs[primaryKey] = item;
                parentId = item[parentIdName];
                if (parentId) {
                    parent = treeObjs[parentId];
                    if (parent.children) {
                        parent.children.push(item);
                    } else {
                        parent.children = [item];
                    }
                } else {
                    rootIds.push(primaryKey);
                }
            }
            for (var i = 0; i < rootIds.length; i++) {
                tree.push(treeObjs[rootIds[i]]);
            };
            return tree;
        }

    });
}).call(this);
