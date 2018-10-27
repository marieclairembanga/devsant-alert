// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers' , 'starter.services'])

.run(function($ionicPlatform , $rootScope, $timeout) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

     $rootScope.authStatus = false;
	 //stateChange event
	  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
		  $rootScope.authStatus = toState.authStatus;
		  if($rootScope.authStatus){


		  }
    });

	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		console.log("URL : "+toState.url);
		if(toState.url=='/dashboard'){
			console.log("match : "+toState.url);
			$timeout(function(){
				angular.element(document.querySelector('#leftMenu' )).removeClass("hide");
			},1000);
		}
	});

})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
      controller: 'Ctrl'
  })

//--------------------------------------

 .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/tab-signin.html',
        controller: 'AppCtrl'
      }
    },

	authStatus: false
  })
 .state('app.signup', {
    url: '/signup',
    views: {
      'menuContent': {
        templateUrl: 'templates/tab-signup.html',
        controller: 'AppCtrl1'
      }
   },
	authStatus: false
  })

    .state('app.soins', {
      url: '/Soins',
      views: {
        'menuContent': {
          templateUrl: 'templates/Soins.html',
          controller: 'AppCtrl1'
        }
      },
      authStatus: false
    })
    .state('app.bilan', {
      url: '/Bilan',
      views: {
        'menuContent': {
          templateUrl: 'templates/Bilan.html',
          controller: 'AppCtrl1'
        }
      },
      authStatus: false
    })
//--------------------------------------


  .state('app.dashboard', {
    url: '/dashboard',
    views: {
      'menuContent': {
        templateUrl: 'templates/dashboard.html'
    /*function(){

      if(sessionStorage.getItem('loggedin_status')){
        return 'templates/dashboard.html';
      }else{
        return 'templates/tab-signin.html';
      }

    }*/,
		controller: 'DashCtrl'
      }
     },
	 authStatus: true
  })


    .state('app.profiles', {
      url: '/profiles',
      views: {
        'menuContent': {
          templateUrl: function(){

      if(sessionStorage.getItem('loggedin_status')){
        return 'templates/profiles.html';
      }else{
        return 'templates/tab-signin.html';
      }

    },
          controller: 'ProfilesCtrl'
        }
      }
    })
    .state('app.video', {
      url: '/video',
      views: {
        'menuContent': {
          templateUrl: 'templates/video.html',
          controller: 'videoCtrl'
        }
      }
    })

  .state('app.profile', {
    url: '/profile/:identify',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile-detail.html',
        controller: 'ProfileCtrl'
      }
    }
  })
    .state('app.profile2', {
      url: '/profile2/:identify2',
      views: {
        'menuContent': {
          templateUrl: 'templates/profile2.html',
          controller: 'Profile2'
        }
      }
    })
    .state('app.gestion1', {
      url: '/gestion1',
      views: {
        'menuContent': {
          templateUrl: function(){

            if(sessionStorage.getItem('loggedin_status')){
              return 'templates/gestion1.html';
            }else{
              return 'templates/tab-signin.html';
            }

          },
          controller: 'Ctrlgestion1'
        }
      }
    })
    .state('app.gestions2', {
      url: '/gestions2',
      views: {
        'menuContent': {
          templateUrl: function(){

            if(sessionStorage.getItem('loggedin_status')){
              return 'templates/gestion2.html';
            }else{
              return 'templates/tab-signin.html';
            }

          },
          controller: 'Ctrlgestion2'

        }
      }
    })
    .state('app.gestion3', {
      url: '/gestion3',
      views: {
        'menuContent': {
          templateUrl: function(){

            if(sessionStorage.getItem('loggedin_status')){
              return 'templates/gestion3.html';
            }else{
              return 'templates/tab-signin.html';
            }

          },
          controller: 'Ctrlgestion3'
        }
      }
    })
    .state('app.modify', {
      url: '/modify/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/modify.html',
          controller: 'CtrlModify'
        }
      }
    })
    .state('app.modify1', {
      url: '/modify1/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/modify1.html',
          controller: 'CtrlModify1'
        }
      }
    })
    .state('app.modify2', {
      url: '/modify2/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/modify2.html',
          controller: 'CtrlModify2'
        }
      }
    })

    .state('app.modify3', {
      url: '/modify3/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/modify3.html',
          controller: 'CtrlModify3'
        }
      }
    })
    .state('app.locataire', {
      url: '/locataire',
      views: {
        'menuContent': {
          templateUrl: 'templates/locataire.html',
          controller: 'Ctrllocataire'
        }
      }
    })
    .state('app.profile3', {
      url: '/profile3/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/profile3.html',
          controller: 'Ctrlpro'
        }
      }
    })
    .state('app.profile4', {
      url: '/profile4/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/profile4.html',
          controller: 'Ctrlpro1'
        }
      }
    })
    .state('app.locaux', {
      url: '/locaux',
      views: {
        'menuContent': {
          templateUrl: 'templates/locaux.html',
          controller: 'Ctrllocaux'
        }
      }
    })
    .state('app.appart', {
      url: '/appart/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/appart.html',
          controller: 'Ctrlappart'
        }
      }
    })
    .state('app.achat', {
      url: '/achat/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/achat.html',
          controller: 'Ctrlachat'
        }
      }
    })
    .state('app.achat1', {
      url: '/achat1/:id/:id1',
      views: {
        'menuContent': {
          templateUrl: 'templates/achat1.html',
          controller: 'Ctrlachat1'
        }
      }
    })
    .state('app.paiement', {
      url: '/paiement/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/paiement.html',
          controller: 'Ctrlpaiement'
        }
      }
    })
    .state('app.paiement1', {
      url: '/paiement1/:id/:id2',
      views: {
        'menuContent': {
          templateUrl: 'templates/paiement1.html',
          controller: 'Ctrlpaiement1'
        }
      }
    })
    .state('app.paiement3', {
      url: '/paiement3/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/paiement3.html',
          controller: 'Ctrlpaiement3'
        }
      }
    })
    .state('app.versement', {
      url: '/versement/:id/:id2',
      views: {
        'menuContent': {
          templateUrl: 'templates/versement.html',
          controller: 'Ctrlversement'
        }
      }
    })
    .state('app.versement1', {
      url: '/versement1/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/versement1.html',
          controller: 'Ctrlversement1'
        }
      }
    })
    .state('app.ordre', {
      url: '/ordre/:id/:id2',
      views: {
        'menuContent': {
          templateUrl: 'templates/ordre.html',
          controller: 'Ctrlordre'
        }
      }
    })
    .state('app.parametre', {
      url: '/parametre',
      views: {
        'menuContent': {
          templateUrl: function(){

            if(sessionStorage.getItem('loggedin_status')){
              return 'templates/parametre.html';
            }else{
              return 'templates/tab-signin.html';
            }

          },
          controller: 'Ctrlpara'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
