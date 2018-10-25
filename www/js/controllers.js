var url="http://localhost/devsantalert/ionic/";

angular.module('starter.controllers', [])


  .controller('AppCtrl',function($scope,sharedUtils,$ionicModal,$timeout,$ionicPopup,$http,$state,$ionicHistory){

    $scope.loginData={};
    $scope.url = url;
    $scope.doLogin=function(){
      var patient_email=$scope.loginData.email;
      var patient_password=$scope.loginData.password;

      if(patient_email && patient_password){
        str=url+"loginPatients.php?email="+patient_email+"&password="+patient_password;
        sharedUtils.showLoading();
        $http.get(str)
          .success(function(response){
            sharedUtils.hideLoading();
            $scope.patient=response.records;
            sessionStorage.setItem('loggedin_status',true);
            sessionStorage.setItem('loggedin_nom', $scope.patient.p_nom);
            sessionStorage.setItem('loggedin_prenom', $scope.patient.p_prenom);
            sessionStorage.setItem('loggedin_telephone', $scope.patient.p_telephone);
            sessionStorage.setItem('loggedin_email', $scope.patient.p_email);

            $ionicHistory.nextViewOptions({
              disableAnimate:true,
              disableBack:true
            });

            $state.go('app.dashboard',{},{location:"replace",reload:true});
          })
          .error(function(){
            sharedUtils.hideLoading();
            $ionicPopup.alert({
              title:'information',
              template:'mot de passe ou nom incorrect'
            })
          });

      }else{
        $ionicPopup.alert({
          title:'error',
          template:'saisir les champs'
        })

      }

    };

    $scope.Logout=function(){

      sessionStorage.removeItem('loggedin_status');
      sessionStorage.removeItem('loggedin_id');
      sessionStorage.removeItem('loggedin_status');

      $ionicHistory.nextViewOptions({
        disableAnimate:true,
        disableBack:true
      });

      $ionicPopup.alert({
        title:'ล็อกอิน',
        template:'ออกจากระบบ'
      });

      $state.go('tab.login',{},{location:"replace",reload:true});


    }
  })


  .controller('AppCtrl1',function($scope,sharedUtils,$ionicModal,$timeout,$ionicPopup,$http,$state,$ionicHistory) {
    $scope.loginData={};
    $scope.url = url;


    $scope.Logout = function () {

      var patient_nom = $scope.loginData.nom;
      var patient_password = $scope.loginData.password;
      var patient_email = $scope.loginData.email;
      var patient_telephone = $scope.loginData.telephone;
      var patient_prenom = $scope.loginData.prenom;

      if (patient_email && patient_password) {
        sharedUtils.showLoading();
        str = url + "patients.php?nom=" + patient_nom + "&password=" + patient_password + "&telephone=" + patient_telephone + "&email=" + patient_email+ "&prenom=" + patient_prenom;
        $http.get(str)
          .success(function (response) {
            sharedUtils.hideLoading();
            $scope.patient = response.records;
            sessionStorage.setItem('loggedin_status', true);
            sessionStorage.setItem('loggedin_nom', $scope.patient.p_nom);
            sessionStorage.setItem('loggedin_prenom', $scope.patient.p_prenom);
            sessionStorage.setItem('loggedin_telephone', $scope.patient.p_telephone);
            sessionStorage.setItem('loggedin_email', $scope.patient.p_email);

            $ionicHistory.nextViewOptions({
              disableAnimate: true,
              disableBack: true
            });

            $state.go('app.dashboard', {}, {location: "replace", reload: true});
          })
          .error(function () {
            sharedUtils.hideLoading();
            $ionicPopup.alert({
              title: 'error',
              template: 'inscription failed'
            })
          });

      } else {
        $ionicPopup.alert({
          title: 'error',
          template: 'saisir les champs'
        })

      }

    }

  })


  .controller('ProfilesCtrl', function($http, $scope, sharedUtils, $state) {
    $scope.url = url;
    $scope.acces = sessionStorage.getItem('loggedin_filere');
    $scope.user = sessionStorage.getItem("loggedin_pseudo");
    $scope.pass = sessionStorage.getItem("loggedin_prenom");
    $scope.profil=[];
    sharedUtils.showLoading();
    $http.get(url+"liste4.php?nom="+sessionStorage.getItem("loggedin_pseudo")+"&prenom="+sessionStorage.getItem("loggedin_prenom"))
      .success(function (data) {
        $scope.profil=data;
        sharedUtils.hideLoading();
      })
      .error(function(err){
        console.log(err);
        sharedUtils.hideLoading();

      });

    $scope.supp = function (id) {
      sharedUtils.showLoading();
      str=url+"supprimer2.php?id="+id;
      $http.get(str)
        .success(function (data) {
          sharedUtils.hideLoading();
          $state.go('app.login', {}, {location: "replace", reload: true});

        })
        .error(function(err){
          console.log(err);
          sharedUtils.hideLoading();
        })

    }

  })
  .controller('Ctrl', function($http, $scope, $ionicLoading,$state,$ionicHistory) {
    $scope.url = url;
    $scope.acces = sessionStorage.getItem('loggedin_filere');
    $scope.user = sessionStorage.getItem("loggedin_pseudo");
    $scope.pass = sessionStorage.getItem("loggedin_prenom");
    $scope.out=function(){

      sessionStorage.removeItem('loggedin_status');
      sessionStorage.removeItem('loggedin_pseudo');
      sessionStorage.removeItem('loggedin_prenom');
      sessionStorage.removeItem('loggedin_phone');
      sessionStorage.removeItem('loggedin_address');
      sessionStorage.removeItem('loggedin_photo');
      sessionStorage.removeItem('loggedin_filere');
      $ionicHistory.nextViewOptions({
        disableAnimate:true,
        disableBack:true
      })

      $state.go('app.login',{},{location:"replace",reload:true});


    }

  })

  .controller('ProfileCtrl', function($http, $scope, sharedUtils, $stateParams, $state) {
    $scope.idu=$stateParams.identify;
    $scope.acces = sessionStorage.getItem('loggedin_filere');
    $scope.profile=[];
    $scope.detail=[];
    $scope.url = url;
    sharedUtils.showLoading();
    str=url+"select1.php?id="+$stateParams.identify;
    $http.get(str)
      .success(function (data) {
        $scope.profile=data;
        sharedUtils.hideLoading();
      })
      .error(function(err){
        console.log(err);
        sharedUtils.hideLoading();

      })
    str=url+"liste19.php?id="+$stateParams.identify;
    $http.get(str)
      .success(function (data) {
        $scope.detail=data;
        sharedUtils.hideLoading();
      })
      .error(function(err){
        console.log(err);
        sharedUtils.hideLoading();

      })

    $scope.supprime = function (id) {
      sharedUtils.showLoading();
      str=url+"supprimer.php?idlocal="+id;
      $http.get(str)
        .success(function (data) {
          sharedUtils.hideLoading();
          $state.go('app.dashboard', {}, {location: "replace", reload: true});

        })
        .error(function(err){
          sharedUtils.hideLoading();
          console.log(err);

        })

    }
  })
  .controller('videoCtrl', function($http, $scope, $ionicLoading) {
    $scope.url = url;
    $scope.acces = sessionStorage.getItem('loggedin_filere');
  })

  .controller('Ctrlgestion1', function($scope,sharedUtils, $ionicModal,$timeout,$ionicPopup,$http,$state,$ionicHistory, $stateParams) {
    $scope.loginData={};
    $scope.acces = sessionStorage.getItem('loggedin_filere');
    $scope.profile=[];
    $scope.detail=[];
    $scope.url = url;
    $scope.Locataire = function () {

      var name = $scope.loginData.name;
      var tel = $scope.loginData.tel;
      var matricule = $scope.loginData.nummat;
      var email = $scope.loginData.email1;
      var postal = $scope.loginData.post1;
      var marque = $scope.loginData.mark;
      var numero = $scope.loginData.num;

      if (name && tel) {
        str = url + "gestion1.php?name=" + name + "&tel=" + tel + "&matricule=" + matricule + "&email=" + email+ "&postal=" + postal+ "&marque=" + marque + "&numero=" + numero;
        sharedUtils.showLoading();
        $http.get(str)
          .success(function (response) {

            $scope.admin = response.records;
            $ionicPopup.alert({
              title: 'information',
              template: 'inscription reussit'
            })
            $ionicHistory.nextViewOptions({
              disableAnimate: true,
              disableBack: true
            })
            sharedUtils.hideLoading();
            $state.go("app.locataire",{
            }, {location: "replace", reload: true});
          })
          .error(function () {
            sharedUtils.hideLoading();
            $ionicPopup.alert({
              title: 'error',
              template: 'inscription failed'
            })
          });

      } else {
        $ionicPopup.alert({
          title: 'error',
          template: 'saisir les champs'
        })

      }

    }

    $scope.ins=function(){
      $state.go("app.locataire",{location:"replace",reload:true});

    }

  })

  .controller('Ctrlgestion2', function($http, $scope, $ionicLoading) {
    $scope.url = url;

  })

  .controller('Ctrlgestion3', function($scope, sharedUtils, $stateParams, $ionicPopup,$http,$state,$ionicHistory) {
    $scope.profil=[];
    $scope.acces = sessionStorage.getItem('loggedin_filere');
    $scope.profile=[];
    $scope.etat=[];
    $scope.select=[];
    $scope.detail=[];
    $scope.url = url;
    $scope.loginData={};
    sharedUtils.showLoading();

    $http.get(url+"liste.php")
      .success(function (data) {
        $scope.select=data;
        sharedUtils.hideLoading();
      })
      .error(function(err){
        console.log(err);
        sharedUtils.hideLoading();

      })

    $http.get(url+"etat.php")
      .success(function (data) {
        $scope.etat=data;
        sharedUtils.hideLoading();
      })
      .error(function(err){
        console.log(err);
        sharedUtils.hideLoading();

      })


    $http.get(url+"liste17.php")
      .success(function (data) {

        $scope.profile=data;
        sharedUtils.hideLoading();
      })
      .error(function(err){
        console.log(err);
        sharedUtils.hideLoading();

      })
    $scope.rech=function(name){
      sharedUtils.showLoading();
      $http.get(url+"liste18.php?name="+name)
        .success(function (data) {
          $scope.profile=data;
          sharedUtils.hideLoading();
        })
        .error(function(err){
          console.log(err);
          sharedUtils.hideLoading();

        })

    }

    $scope.recherche=function(select1){
      sharedUtils.showLoading();
      $http.get(url+"etat1.php?idlocal="+select1)
        .success(function (data) {
          $scope.etat=data;

          sharedUtils.hideLoading();
        })
        .error(function(err){
          console.log(err);
          sharedUtils.hideLoading();

        })

    }



  })

  .controller('CtrlModify', function($scope, sharedUtils , $stateParams, $ionicPopup,$http,$state,$ionicHistory) {
    $scope.idu=$stateParams.id;
    $scope.acces = sessionStorage.getItem('loggedin_filere');
    $scope.loginData={};
    $scope.profile=[];
    $scope.detail=[];
    $scope.url = url;
    sharedUtils.showLoading();
    str=url+"select.php?id="+$stateParams.id;
    $http.get(str)
      .success(function (data) {
        $scope.profile=data;
        sharedUtils.hideLoading();
      })
      .error(function(err){
        console.log(err);
        sharedUtils.hideLoading();

      })

    $scope.Modify = function () {

      var name = $scope.loginData.name;
      var mat = $scope.loginData.mat;
      var telephone = $scope.loginData.tel;
      var email = $scope.loginData.email;
      var post = $scope.loginData.post;
      var marque = $scope.loginData.marque;
      var nummat = $scope.loginData.nummat;
      sharedUtils.showLoading();
      if (true) {
        str = url + "modify.php?name=" + name + "&mat=" + mat + "&telephone=" + telephone + "&email=" + email+ "&post=" + post+ "&marque=" + marque+ "&nummat=" + nummat+ "&idlocataire=" + $stateParams.id;
        $http.get(str)
          .success(function (response) {

            $scope.admin = response.records;

            $ionicHistory.nextViewOptions({
              disableAnimate: true,
              disableBack: true
            })
            sharedUtils.hideLoading();
            $state.go("app.profile3",{
              id:$stateParams.id
            }, {location: "replace", reload: true});
          })
          .error(function () {

            $ionicPopup.alert({
              title: 'error',
              template: 'inscription failed'
            })
            sharedUtils.hideLoading();
          });

      } else {
        $ionicPopup.alert({
          title: 'error',
          template: 'saisir les champs'
        })

      }

    }


  })

  .controller('CtrlModify2', function($scope, sharedUtils , $stateParams ,$ionicModal,$timeout,$ionicPopup,$http,$state,$ionicHistory) {
    $scope.idu=$stateParams.id;
    $scope.acces = sessionStorage.getItem('loggedin_filere');
    $scope.loginData={};
    $scope.profile=[];
    $scope.detail=[];
    $scope.url = url;
    sharedUtils.showLoading();
    str=url+"liste21.php?id="+$stateParams.id;
    $http.get(str)
      .success(function (data) {
        $scope.profile=data;
        sharedUtils.hideLoading();
      })
      .error(function(err){
        console.log(err);
        sharedUtils.hideLoading();

      })

    $scope.Modify2 = function () {

      var name = $scope.loginData.name;
      var ville = $scope.loginData.ville;
      var quartier = $scope.loginData.quartier;
      var niveau = $scope.loginData.niveau;
      var appart = $scope.loginData.appart;
      sharedUtils.showLoading();
      if (true) {
        str = url + "modify2.php?name=" + name + "&ville=" + ville + "&quartier=" + quartier + "&niveau=" + niveau+ "&appart=" + appart +"&idlocal=" + $stateParams.id;
        $http.get(str)
          .success(function (response) {

            $scope.admin = response.records;

            $ionicHistory.nextViewOptions({
              disableAnimate: true,
              disableBack: true
            })
            sharedUtils.hideLoading();
            $state.go("app.dashboard",{
              id:$stateParams.id
            }, {location: "replace", reload: true});
          })
          .error(function () {

            $ionicPopup.alert({
              title: 'error',
              template: 'inscription failed'
            })
            sharedUtils.hideLoading();
          });

      } else {
        $ionicPopup.alert({
          title: 'error',
          template: 'saisir les champs'
        })

      }

    }

  })

  .controller('CtrlModify3', function($scope, sharedUtils , $stateParams ,$ionicModal,$timeout,$ionicPopup,$http,$state,$ionicHistory) {
    $scope.idu=$stateParams.id;
    $scope.acces = sessionStorage.getItem('loggedin_filere');
    $scope.loginData={};
    $scope.profile=[];
    $scope.detail=[];
    $scope.url = url;
    sharedUtils.showLoading();
    str=url+"liste22.php?id="+$stateParams.id;
    $http.get(str)
      .success(function (data) {
        $scope.profile=data;
        sharedUtils.hideLoading();
      })
      .error(function(err){
        console.log(err);
        sharedUtils.hideLoading();

      })

    $scope.Modify3 = function () {

      var name = $scope.loginData.name;
      var niveau = $scope.loginData.niveau;
      var occupe = $scope.loginData.occupe;
      var meuble = $scope.loginData.meuble;
      var type = $scope.loginData.type;
      var declare = $scope.loginData.declare;
      var montant = $scope.loginData.montant;
      sharedUtils.showLoading();
      if (true) {
        str = url + "modify3.php?name=" + name + "&niveau=" + niveau + "&occupe=" + occupe + "&meuble=" + meuble+ "&type=" + type + "&declare=" + declare+ "&montant=" + montant +"&idappart=" + $stateParams.id;
        console.log(name+"  "+ niveau+"  "+occupe+"  "+meuble+"  "+ type);
        $http.get(str)
          .success(function (response) {
            console.log(name+"  "+ niveau+"  "+occupe+"  "+meuble+"  "+ type);
            $scope.admin = response.records;

            $ionicHistory.nextViewOptions({
              disableAnimate: true,
              disableBack: true
            })
            sharedUtils.hideLoading();
            $state.go("app.profile",{
              id:$stateParams.id
            }, {location: "replace", reload: true});
          })
          .error(function () {

            $ionicPopup.alert({
              title: 'error',
              template: 'inscription failed'
            })
            sharedUtils.hideLoading();
          });

      } else {
        $ionicPopup.alert({
          title: 'error',
          template: 'saisir les champs'
        })

      }

    }
  })

  .controller('CtrlModify1', function($scope, sharedUtils , $stateParams ,$ionicModal,$timeout,$ionicPopup,$http,$state,$ionicHistory) {
    $scope.idu=$stateParams.id;
    $scope.acces = sessionStorage.getItem('loggedin_filere');
    $scope.loginData={};
    $scope.profile=[];
    $scope.detail=[];
    $scope.url = url;
    sharedUtils.showLoading();
    str=url+"select4.php?id="+$stateParams.id;
    $http.get(str)
      .success(function (data) {
        $scope.profile=data;
        sharedUtils.hideLoading();
      })
      .error(function(err){
        console.log(err);
        sharedUtils.hideLoading();

      })

    $scope.Modify = function () {

      var name = $scope.loginData.name;
      var prenom = $scope.loginData.prenom;
      var telephone = $scope.loginData.tel;
      var email = $scope.loginData.email;
      var cat = $scope.loginData.cat;
      var acces = $scope.loginData.acces;
      sharedUtils.showLoading();
      if (true) {
        str = url + "modify1.php?name=" + name + "&prenom=" + prenom + "&telephone=" + telephone + "&email=" + email+ "&cat=" + cat+ "&acces=" + acces+ "&idutil=" + $stateParams.id;
        $http.get(str)
          .success(function (response) {
            sharedUtils.hideLoading();
            $scope.admin = response.records;

            $ionicHistory.nextViewOptions({
              disableAnimate: true,
              disableBack: true
            })


            $state.go("app.profile4",{
              id:$stateParams.id
            }, {location: "replace", reload: true});
          })
          .error(function () {
            sharedUtils.hideLoading();
            $ionicPopup.alert({
              title: 'error',
              template: 'inscription failed'
            })
          });

      } else {
        $ionicPopup.alert({
          title: 'error',
          template: 'saisir les champs'
        })

      }

    }



  })
  .controller('Ctrlpro1', function($scope, sharedUtils , $stateParams ,$ionicModal,$timeout,$ionicPopup,$http,$state,$ionicHistory) {
    $scope.profil=[];
    $scope.acces = sessionStorage.getItem('loggedin_filere');
    $scope.url = url;
    sharedUtils.showLoading();
    $http.get(url+"liste16.php?id="+$stateParams.id)
      .success(function (data) {
        $scope.profil=data;
        sharedUtils.hideLoading();
      })
      .error(function(err){
        console.log(err);
        sharedUtils.hideLoading();

      })
    $scope.profils=function(){
      $state.go("app.profiles",{

      });

    }

  })
  .controller('Ctrlpara', function($scope,  sharedUtils , $stateParams ,$ionicModal,$timeout,$ionicPopup,$http,$state,$ionicHistory) {
    $scope.profil=[];
    $scope.acces = sessionStorage.getItem('loggedin_filere');
    $scope.url = url;
    sharedUtils.showLoading();
    $http.get(url+"parametre.php")
      .success(function (data) {
        $scope.profil=data;
        sharedUtils.hideLoading();
      })
      .error(function(err){
        console.log(err);
        sharedUtils.hideLoading();

      })
    $scope.profils=function(){
      $state.go("app.profiles",{

      });

    }
    $scope.titre=function(idu){
      $state.go("app.profile",{
        id:idu
      });

    }
    $scope.rech=function(name){
      sharedUtils.showLoading();
      $http.get(url+"recherche2.php?name="+name)
        .success(function (data) {
          $scope.profil=data;
          sharedUtils.hideLoading();
        })
        .error(function(err){
          console.log(err);
          sharedUtils.hideLoading();

        })

    }


  })

  .controller('Ctrlordre', function($scope, $ionicLoading , $stateParams ,$ionicModal,$timeout,$ionicPopup,$http,$state,$ionicHistory) {
    $scope.id2 = $stateParams.id2;
    $scope.id= $stateParams.id;
    $scope.url = url;
    $scope.acces = sessionStorage.getItem('loggedin_filere');
  })

  .controller('Ctrlversement1', function($scope, sharedUtils , $stateParams ,$ionicModal,$timeout,$ionicPopup,$http,$state,$ionicHistory) {
    $scope.id = $stateParams.id;
    $scope.acces = sessionStorage.getItem('loggedin_filere');
    $scope.profil=[];
    $scope.profile=[];
    $scope.detail=[];
    $scope.url = url;
    $scope.loginData={};
    sharedUtils.showLoading();
    $http.get(url+"liste15.php?id="+$stateParams.id)
      .success(function (data) {

        $scope.profil=data;
        sharedUtils.hideLoading();
      })
      .error(function(err){
        console.log(err);
        sharedUtils.hideLoading();

      })


  })

  .controller('Ctrlversement', function($scope, sharedUtils , $stateParams ,$ionicModal,$timeout,$ionicPopup,$http,$state,$ionicHistory) {
    $scope.id = $stateParams.id;
    $scope.acces = sessionStorage.getItem('loggedin_filere');
    $scope.idlo = $stateParams.id2;
    $scope.loginData={};
    $scope.url = url;
    $scope.verse = function () {

      var montant = $scope.loginData.mtloyer;
      var periode = $scope.loginData.prloyer;
      var mode = $scope.loginData.mode;
      sharedUtils.showLoading();
      if (true) {
        str = url + "insert.php?montant=" + montant + "&periode=" + periode + "&mode=" + mode+ "&idlocataire=" + $stateParams.id2+ "&idappart=" + $stateParams.id;
        $http.get(str)
          .success(function (response) {

            $scope.admin = response.records;
            sharedUtils.hideLoading();
            $ionicHistory.nextViewOptions({
              disableAnimate: true,
              disableBack: true
            })

            $state.go("app.paiement1",{
              id:$stateParams.id,
              id2:$stateParams.id2
            }, {location: "replace", reload: true});
          })
          .error(function () {
            sharedUtils.hideLoading();
            $ionicPopup.alert({
              title: 'error',
              template: 'inscription failed'
            })
          });

      } else {
        $ionicPopup.alert({
          title: 'error',
          template: 'saisir les champs'
        })

      }

    }

  })

  .controller('Ctrlachat', function($scope, sharedUtils , $stateParams,$timeout,$ionicPopup,$http,$state,$ionicHistory) {
    $scope.idlo = $stateParams.id;
    $scope.acces = sessionStorage.getItem('loggedin_filere');
    $scope.profil=[];
    $scope.url = url;
    $scope.profile=[];
    $scope.detail=[];
    $scope.mont=[];
    var montant1;
    $scope.loginData={};
    sharedUtils.showLoading();
    $http.get(url+"liste.php")
      .success(function (data) {

        $scope.profil=data;
        sharedUtils.hideLoading();
      })
      .error(function(err){
        console.log(err);
        sharedUtils.hideLoading();

      })
    $scope.achat=function(){
      $state.go("app.achat1",{
        id :$stateParams.id,
        id1 :  $scope.select
      });

    }
    $scope.showSelectValue = function(select) {
      str=url+"liste2.php?id="+select;
      sharedUtils.showLoading();
      $http.get(str)
        .success(function (data) {
          $scope.detail=data;
          sharedUtils.hideLoading();
        })
        .error(function(err){
          console.log(err);
          sharedUtils.hideLoading();

        })
    }
    $scope.showSelectValu = function(select1) {
      $scope.idAppart = select1;
      str=url+"liste20.php?id="+select1;
      sharedUtils.showLoading();
      $http.get(str)
        .success(function (data) {
          $scope.mont=data;
          sharedUtils.hideLoading();
        })
        .error(function(err){
          console.log(err);
          sharedUtils.hideLoading();

        })
    }


    $scope.achatl = function () {

      var montant = $scope.loginData.mtloyer;
      var charge = $scope.loginData.charge;
      var periode = $scope.loginData.prloyer;
      var debut = $scope.loginData.ddloyer;
      var fin = $scope.loginData.dfloyer;
      var preavis = $scope.loginData.dpreavis;
      var revision = $scope.loginData.drcontrat;
      var categori = $scope.loginData.cat;
      var compteur = $scope.loginData.cpteur;
      var numero = $scope.loginData.numero;
      var caution = $scope.loginData.caution;
      var condition = $scope.loginData.condition;


      if (charge && periode  && categori && compteur && numero && condition ) {
        str = url + "achat.php?idappart=" + $scope.idAppart + "&idlocataire=" + $stateParams.id  + "&charge=" + charge+
          "&periode=" +periode + "&debut=" + debut + "&fin=" + fin+ "&preavis=" + preavis + "&revision=" + revision + "&categori=" + categori +
          "&compteur=" + compteur + "&numero=" + numero+ "&caution=" + caution+ "&condition=" + condition;
        sharedUtils.showLoading();
        $http.get(str)
          .success(function (data) {
            sharedUtils.hideLoading();
            $ionicPopup.alert({
              title: 'information',
              template: 'enregistrement reussit'
            })
            $ionicHistory.nextViewOptions({
              disableAnimate: true,
              disableBack: true
            })

            $state.go("app.profile3",{
              id : $stateParams.id
            }, {location: "replace", reload: true});
          })
          .error(function () {
            sharedUtils.hideLoading();
            $ionicPopup.alert({
              title: 'error',
              template: 'inscription failed'
            })
          });

      } else {
        $ionicPopup.alert({
          title: 'error',
          template: 'saisir les champs'
        })

      }

    }



  })

  .controller('Ctrlachat1', function($scope,sharedUtils , $stateParams,$http,$state) {
    $scope.idlo = $stateParams.id;
    $scope.acces = sessionStorage.getItem('loggedin_filere');
    $scope.id = $stateParams.id1;
    $scope.profil=[];
    $scope.url = url;
    $scope.profile=[];
    $scope.detail=[];
    sharedUtils.showLoading();
    str=url+"liste2.php?id="+$stateParams.identify;
    $http.get(str)
      .success(function (data) {
        $scope.detail=data;
        sharedUtils.hideLoading();
      })
      .error(function(err){
        console.log(err);
        sharedUtils.hideLoading();

      })
  })

  .controller('Ctrlpaiement', function($scope, sharedUtils , $stateParams ,$timeout,$ionicPopup,$http,$state,$ionicHistory) {
    $scope.acces = sessionStorage.getItem('loggedin_filere');
    $scope.idlo = $stateParams.id;
    $scope.profil=[];
    $scope.url = url;
    sharedUtils.showLoading();
    $http.get(url+"liste9.php?id="+$stateParams.id)
      .success(function (data) {
        $scope.profil=data;
        sharedUtils.hideLoading();
      })
      .error(function(err){
        console.log(err);
        sharedUtils.hideLoading();

      })


  })
  .controller('Ctrlpaiement1', function($scope, sharedUtils , $stateParams ,$timeout,$ionicPopup,$http,$state,$ionicHistory) {
    $scope.url = url;
    $scope.acces = sessionStorage.getItem('loggedin_filere');
    $scope.ida = $stateParams.id;
    $scope.idlo = $stateParams.id2;
    $scope.profil=[];
    $scope.detail=[];
    $scope.control=[];

    sharedUtils.showLoading();
    $http.get(url+"select2.php?id="+$stateParams.id+"&id2="+$stateParams.id2)
      .success(function (data) {
        $scope.control=data;
        sharedUtils.hideLoading();
      })
      .error(function(err){
        console.log(err);
        sharedUtils.hideLoading();
      })
    $http.get(url+"liste11.php?id="+$stateParams.id+"&id2="+$stateParams.id2)
      .success(function (data) {
        $scope.profil=data;
        sharedUtils.hideLoading();
      })
      .error(function(err){
        console.log(err);
        sharedUtils.hideLoading();

      })

    $http.get(url+"liste12.php?id="+$stateParams.id)
      .success(function (data) {
        $scope.detail=data;

      })
      .error(function(err){
        console.log(err);


      })

    $scope.supp4 = function (id, id2) {
      sharedUtils.showLoading();
      str = url+"supprimer5.php?idappart=" + id+"&idlocataire="+id2;
      $http.get(str)
        .success(function (data) {
          sharedUtils.hideLoading();
          $state.go('app.locataire', {}, {location: "replace", reload: true});

        })
        .error(function (err) {
          console.log(err);
          sharedUtils.hideLoading();
        })
    }

  })

  .controller('Ctrlpaiement3', function($scope, sharedUtils , $stateParams ,$timeout,$ionicPopup,$http,$state,$ionicHistory) {
    $scope.url = url;
    $scope.acces = sessionStorage.getItem('loggedin_filere');
    $scope.idlo = $stateParams.id;
    $scope.profil=[];
    sharedUtils.showLoading();
    $http.get(url+"liste10.php?id="+$stateParams.id)
      .success(function (data) {
        $scope.profil=data;
        sharedUtils.hideLoading();
      })
      .error(function(err){
        console.log(err);
        sharedUtils.hideLoading();

      })


  })
  .controller('Ctrllocaux', function($scope, sharedUtils , $stateParams ,$ionicModal,$timeout,$ionicPopup,$http,$state,$ionicHistory) {
    $scope.loginData={};
    $scope.acces = sessionStorage.getItem('loggedin_filere');
    $scope.profile=[];
    $scope.detail=[];
    $scope.url = url;
    $scope.Local = function () {

      var name = $scope.loginData.name;
      var ville = $scope.loginData.ville;
      var quartier = $scope.loginData.quartier;
      var niveau = $scope.loginData.niveau;
      var appart = $scope.loginData.appart;


      if (name && ville && quartier && niveau && appart) {
        str = url + "locaux.php?name=" + name + "&ville=" + ville + "&quartier=" + quartier + "&niveau=" + niveau+ "&appart=" +appart;
        sharedUtils.showLoading();
        $http.get(str)
          .success(function (response) {

            $scope.admin = response.records;
            $ionicPopup.alert({
              title: 'information',
              template: 'enregistrement reussit'
            })
            $ionicHistory.nextViewOptions({
              disableAnimate: true,
              disableBack: true
            })
            sharedUtils.hideLoading();
            $state.go("app.dashboard",{
            }, {location: "replace", reload: true});
          })
          .error(function () {
            sharedUtils.hideLoading();
            $ionicPopup.alert({
              title: 'error',
              template: 'inscription failed'
            })
          });

      } else {
        $ionicPopup.alert({
          title: 'error',
          template: 'saisir les champs'
        })

      }

    }

  })
  .controller('Ctrlappart', function($scope,  sharedUtils , $stateParams ,$ionicModal,$timeout,$ionicPopup,$http,$state,$ionicHistory) {
    $scope.loginData={};
    $scope.acces = sessionStorage.getItem('loggedin_filere');
    $scope.profile=[];
    $scope.detail=[];
    $scope.url = url;
    $scope.Appart = function () {

      var name = $scope.loginData.name;
      var meuble = $scope.loginData.meuble;
      var niveau = $scope.loginData.niveau;
      var type = $scope.loginData.type;
      var declare = $scope.loginData.declare;
      var mt = $scope.loginData.mt;

      if (name &&  meuble && niveau && type && declare && mt) {
        str = url + "appart.php?name=" + name + "&meuble=" + meuble + "&mt=" + mt + "&niveau=" + niveau+ "&type=" +type+ "&declare=" + declare+ "&idlocal=" +$stateParams.id;
        sharedUtils.showLoading();
        $http.get(str)
          .success(function (response) {

            $scope.admin = response.records;
            $ionicPopup.alert({
              title: 'information',
              template: 'enregistrement reussit'
            })
            $ionicHistory.nextViewOptions({
              disableAnimate: true,
              disableBack: true
            })
            sharedUtils.hideLoading();
            $state.go("app.profile",{
              identify:$stateParams.id
            }, {location: "replace", reload: true});
          })
          .error(function () {
            sharedUtils.hideLoading();
            $ionicPopup.alert({
              title: 'error',
              template: 'inscription failed'
            })
          });

      } else {
        $ionicPopup.alert({
          title: 'error',
          template: 'saisir les champs'
        })

      }

    }



  })
  .controller('Ctrllocataire', function($scope, sharedUtils ,$ionicModal,$timeout,$ionicPopup,$http,$state,$ionicHistory) {
    $scope.profil=[];
    $scope.acces = sessionStorage.getItem('loggedin_filere');
    $scope.url = url;

    sharedUtils.showLoading();
    $http.get(url+"liste5.php")
      .success(function (data) {
        $scope.profil=data;
        sharedUtils.hideLoading();
      })
      .error(function(err){
        console.log(err);
        sharedUtils.hideLoading();

      })
    $scope.profils=function(){
      $state.go("app.profiles",{

      });

    }
    $scope.titre=function(idu){
      $state.go("app.profile",{
        id:idu
      });

    }
    $scope.rech=function(name){
      sharedUtils.showLoading();
      $http.get(url+"recherche.php?name="+name)
        .success(function (data) {
          $scope.profil=data;
          sharedUtils.hideLoading();
        })
        .error(function(err){
          console.log(err);
          sharedUtils.hideLoading();

        })

    }


  })
  .controller('Ctrlpro', function($scope, sharedUtils , $stateParams, $ionicModal,$timeout,$ionicPopup,$http,$state,$ionicHistory) {
    $scope.url = url;
    $scope.acces = sessionStorage.getItem('loggedin_filere');
    $scope.idl=$stateParams.id;
    $scope.profile=[];
    $scope.detail=[];

    sharedUtils.showLoading();
    str=url+"liste6.php?id="+$stateParams.id;
    $http.get(str)
      .success(function (data) {
        $scope.detail=data;
        sharedUtils.hideLoading();
      })
      .error(function(err){
        console.locg(err);
        sharedUtils.hideLoading();

      })
    str=url+"liste8.php?id="+$stateParams.id;
    $http.get(str)
      .success(function (data) {
        $scope.profile=data;

      })
      .error(function(err){
        console.log(err);

      })

    $scope.supp2 = function (id) {
      sharedUtils.showLoading();
      str = url+"supprimer4.php?id=" + id;
      $http.get(str)
        .success(function (data) {
          sharedUtils.hideLoading();
          $state.go('app.locataire', {}, {location: "replace", reload: true});

        })
        .error(function (err) {
          sharedUtils.hideLoading();
          console.log(err);

        })
    }

  })

  .controller('Profile2', function($http, $scope, sharedUtils , $stateParams) {
    $scope.idu1=$stateParams.identify2;
    $scope.acces = sessionStorage.getItem('loggedin_filere');
    $scope.profile=[];
    $scope.detail=[];
    $scope.liste=[];
    $scope.url = url;
    $scope.nom=[];
    sharedUtils.showLoading();
    str=url+"liste3.php?id="+$stateParams.identify2;
    $http.get(str)
      .success(function (data) {
        $scope.detail=data;

        sharedUtils.hideLoading();
      })
      .error(function(err){
        console.log(err);
        sharedUtils.hideLoading();

      })
    str=url+"liste13.php?id="+$stateParams.identify2;
    $http.get(str)
      .success(function (data) {
        $scope.liste=data;

      })
      .error(function(err){
        console.log(err);


      })

    $scope.supprime = function (id) {
      sharedUtils.showLoading();
      str=url+"supprimer1.php?idappart="+id;
      $http.get(str)
        .success(function (data) {
          sharedUtils.hideLoading();
          $state.go('app.dashboard', {}, {location: "replace", reload: true});

        })
        .error(function(err){
          console.log(err);
          sharedUtils.hideLoading();
        })

    }

  })
  .controller('DahCtrl', function($scope, $stateParams , Profiles) {
    $scope.profiles = Profiles.all();
    $scope.url = url;
    $scope.acces = sessionStorage.getItem('loggedin_filere');
  })
  .controller("DashCtrl", function($http, $scope, sharedUtils, $state){
    $scope.profil=[];
    $scope.url = url;
    $scope.acces = sessionStorage.getItem('loggedin_filere');
    sharedUtils.showLoading();
    $http.get(url+"liste.php")
      .success(function (data) {
        $scope.profil=data;
        sharedUtils.hideLoading();
      })
      .error(function(err){
        console.log(err);
        sharedUtils.hideLoading();

      });
    $scope.profils=function(){
      $state.go("app.profiles",{

      });

    };
    $scope.titre=function(idu){
      $state.go("app.profile",{
        identify:idu
      });

    }

  });

