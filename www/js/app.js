angular.module('chandler', ['ionic','ngCordova', 'starter.controllers', 'ngCordova.plugins'])

.run(function($ionicPlatform, $ionicHistory) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
      StatusBar.overlaysWebView(false)
    }
  });
  /* $ionicPlatform.registerBackButtonAction(function (event) {
      $ionicHistory.goBack();
    });*/
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.tabs.position('bottom');
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'TabCtrl'
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('tab.help', {
      url: '/help',
      views: {
        'tab-help': {
          templateUrl: 'templates/help.html',
          controller: 'HelpCtrl'
        }
      }
    })
    .state('tab.contact', {
      url: '/contact',
      views: {
        'tab-contact': {
          templateUrl: 'templates/contact.html',
          controller: 'ContactCtrl'
        }
      }
    })

  .state('tab.services', {
    url: '/services',
    views: {
      'tab-services': {
        templateUrl: 'templates/services.html',
        controller: 'ServicesCtrl'
      }
    }
  })

  .state('tab.guard', {
    url: '/guard',
    views: {
      'tab-guard': {
        templateUrl: 'templates/guard.html',
        controller: 'GuardCtrl'
      }
    }
  })

  .state('tab.inspect', {
    url: '/inspect',
    views: {
      'tab-inspect': {
        templateUrl: 'templates/inspect.html',
        controller: 'InspectCtrl'
      }
    }
  })

  .state('tab.reportLoss', {
    url: '/reportLoss',
    views: {
      'tab-help': {
        templateUrl: 'templates/reportLoss.html',
        controller: 'ReportLossCtrl'
      }
    }
  })

  .state('tab.guardForm', {
    url: '/guardForm',
    views: {
      'tab-guard': {
        templateUrl: 'templates/guardForm.html',
        controller: 'GuardFormCtrl'
      }
    }
  })

  .state('tab.inspectForm', {
    url: '/inspectForm',
    views: {
      'tab-inspect': {
        templateUrl: 'templates/inspectForm.html',
        controller: 'InspectFormCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

})


.directive('nextOnEnter', function () {
    return {
        restrict: 'A',
        link: function ($scope, selem, attrs) {
            selem.bind('keydown', function (e) {
                var code = e.keyCode || e.which;
                if (code === 13) {
                    e.preventDefault();
                    var pageElems = document.querySelectorAll('input, select, textarea'),
                        elem = e.srcElement
                        focusNext = false,
                        len = pageElems.length;
                    for (var i = 0; i < len; i++) {
                        var pe = pageElems[i];
                        if (focusNext) {
                            if (pe.style.display !== 'none') {
                                pe.focus();
                                break;
                            }
                        } else if (pe === e.srcElement) {
                            focusNext = true;
                        }
                    }
                }
            });
        }
    }
})

;
