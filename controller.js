(function () {
    'use strict';

    angular.module('Controller', ['Constant'])
    .controller('NarrowItDownController', NarrowItDownController);

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService, DefaultPendingTimeout) {
        var ctrl = this;
        ctrl.searchTerm = '';
        ctrl.pendingTimeout = DefaultPendingTimeout;
        ctrl.isPending = false;
        ctrl.showMessage = false;
        ctrl.found = [];

        ctrl.searchItems = function () {
            ctrl.showMessage = false;
            ctrl.isPending = true;
            ctrl.found = [];

            MenuSearchService.getMatchedMenuItems(ctrl.searchTerm, ctrl.pendingTimeout)
                .then(function (response) {
                    ctrl.found = response;
                    console.info('searchkey is found:', ctrl.found);
                })
                .catch(function (response) {
                    ctrl.found = response;
                    console.info('inside catch:', ctrl.found);
                })
                .finally(function () {
                    ctrl.isPending = false;
                    ctrl.showMessage = ctrl.isEmpty();
                });
        }

        ctrl.isEmpty = function () {
            return ctrl.found.length == 0;
        }

        ctrl.removeItem = function (itemIndex) {
            var removedItem = ctrl.found.splice(itemIndex, 1);
            console.log('searchkey is removed:', removedItem);

            return removedItem;
        };

        ctrl.setPendingTimeout = function (timeout) {
            ctrl.pendingTimeout = timeout;
        }
    }
})()
