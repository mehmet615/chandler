angular.module('starter.controllers', [])

.controller('bodyCtrl', function($scope, $ionicHistory, $state) {
	
  $scope.openinbrowser=function()
  {
    console.log('openinbrowser');
    window.open("http://www.chandlercompaniesinc.com/", "_system");
  }
})

.controller('TabCtrl', function($scope, $ionicHistory, $state) {
	$scope.$on("$ionicView.loaded", function () {
    
    if($state.current.name!='tab.reportLoss' && $state.current.name!='tab.guardForm' && $state.current.name!='tab.inspectForm') {
	    $ionicHistory.clearCache();
	    $ionicHistory.clearHistory();
	  }
  })

  $scope.opentab6=function()
  {
    console.log('opentab6 click');
    $state.go('tab.inspect');
  }
})

.controller('HomeCtrl', function($scope, $window,$ionicPlatform) {



  /*document.getElementById("content").style.overflow = "hidden";
  screen.orientation.onchange = function(){
    if (screen.orientation.type=="landscape-primary") {
      document.getElementById("content").style.overflow = "scroll";

    }else{
      document.getElementById("content").style.overflow = "hidden";
    }
  }*/
  var element = angular.element(document.querySelector('.description-wrapper')); 
  

  angular.element($window).bind('resize', function(){
    $scope.$apply(function() {
        //var totalHeight = $window.innerHeight;
        var descHeight = element[0].offsetHeight;
        $scope.bottom = descHeight + 60;
    })       
  });

  $scope.isLandScape = false;
  function doOnOrientationChange()
  {
      console.log(window.innerWidth);
      console.log(window.innerHeight);
      if (window.innerWidth > window.innerHeight) {
        setTimeout(function() {
          $scope.$apply(function() {
            $scope.isLandScape = true;
          });
          
        }, 200);
        
      } else {
        setTimeout(function() {
          $scope.$apply(function() {
            $scope.isLandScape = false;
          });
          
        }, 200);
        
      }   
  }

  window.addEventListener('orientationchange', doOnOrientationChange);

})

.controller('HelpCtrl', function($scope) {
    $scope.openCallDialer=function(no)
    { 
      window.plugins.CallNumber.callNumber(onSuccess, onError, no, false);
    }
    function onSuccess(result){
      console.log("Success:"+result);
    }

    function onError(result) {
      console.log("Error:"+result);
    }
})

.controller('ContactCtrl', function($scope, $stateParams) {
  $scope.openCallDialer=function(no)
  { 
    window.plugins.CallNumber.callNumber(onSuccess, onError, no, false);
  }
  function onSuccess(result){
    console.log("Success:"+result);
  }

  function onError(result) {
    console.log("Error:"+result);
  }

  $scope.sendMail=function(email)
  {
    cordova.plugins.email.open({
        to:      email,
        cc:      '',
        bcc:     [''],
        subject: '',
        body:    ''
    });
  }
})

.controller('ServicesCtrl', function($scope) {
	$scope.sendMail=function(email)
	{
		cordova.plugins.email.open({
			to:      email,
			cc:      '',
			bcc:     [''],
			subject: '',
			body:    ''
		});
	}
})

.controller('GuardCtrl', function($scope) {
  
})

.controller('InspectCtrl', function($scope) {
  
})

.controller('GuardFormCtrl', function($scope, $ionicPlatform, $cordovaDialogs,API,services,$ionicHistory,$ionicLoading,$ionicPopup,$http,$state) {
        $ionicPlatform.ready(function(){

          $scope.showTab=function()
          {
            console.log('showTab');
            $('.tab-nav').show();
          }

          $scope.hideTab=function()
          {
            console.log('hideTab');
            $('.tab-nav').hide();
          }

        try{ 
         /* $ionicHistory.nextViewOptions({
          disableBack: true
          });
          $ionicHistory.clearHistory();*/


          $scope.GuardFormObj={};
          $scope.GuardFormObj.fname=""
          $scope.GuardFormObj.lname="";
          $scope.GuardFormObj.phone="";
          $scope.GuardFormObj.email="";
          $scope.GuardFormObj.company="";
          $scope.GuardFormObj.position_in_company="";
          $scope.GuardFormObj.is_property_owner=""
          $scope.GuardFormObj.property_owner_name="";
          $scope.GuardFormObj.is_insurance_professional="";
          $scope.GuardFormObj.property_address1="";
          $scope.GuardFormObj.property_address2=""
          $scope.GuardFormObj.property_state="";
          $scope.GuardFormObj.property_city="";
          $scope.GuardFormObj.property_zip="";
          $scope.GuardFormObj.property_type=""
          $scope.GuardFormObj.comments="";
          
           $scope.GuardForm = function(){
                if($scope.GuardFormObj.fname==''){
                      $ionicPopup.alert({'title':'Error', 'template':'First Name should not be blank'});
                      return false;
                }
                if($scope.GuardFormObj.lname==''){
                      $ionicPopup.alert({'title':'Error', 'template':'Last Name should not be blank'});
                      return false;
                }
                if($scope.GuardFormObj.phone==''){
                      $ionicPopup.alert({'title':'Error', 'template':'Phone No should not be blank'});
                      return false;
                }
                if($scope.GuardFormObj.email=='' || $scope.GuardFormObj.email==undefined || $scope.GuardFormObj.email=='undefined'){
                      $ionicPopup.alert({'title':'Error', 'template':'Email Address should not be blank'});
                      return false;
                }
                if($scope.GuardFormObj.is_property_owner=='No'){

                      if($scope.GuardFormObj.property_owner_name==''){
                    
                      $ionicPopup.alert({'title':'Error', 'template':'Owner Name should not be blank'});
                      return false;
                }
                }
                if($scope.GuardFormObj.is_insurance_professional==''){
                      $ionicPopup.alert({'title':'Error', 'template':'Please choose Insurance Professional field'});
                      return false;
                }
                if($scope.GuardFormObj.property_address1==''){
                      $ionicPopup.alert({'title':'Error', 'template':'Address1 should not be blank'});
                      return false;
                }
                
                if($scope.GuardFormObj.property_state==''){
                      $ionicPopup.alert({'title':'Error', 'template':'State should not be blank'});
                      return false;
                }
                if($scope.GuardFormObj.property_city==''){
                      $ionicPopup.alert({'title':'Error', 'template':'City should not be blank'});
                      return false;
                }
                if($scope.GuardFormObj.property_zip==''){
                      $ionicPopup.alert({'title':'Error', 'template':'ZIP should not be blank'});
                      return false;
                }
                if($scope.GuardFormObj.property_type==''){
                      $ionicPopup.alert({'title':'Error', 'template':'Property type should not be blank'});
                      return false;
                }else{
                    $ionicLoading.show();
                    // var url = API.StormgaurdForm($scope.GuardFormObj.fname,$scope.GuardFormObj.lname,$scope.GuardFormObj.phone,$scope.GuardFormObj.email,$scope.GuardFormObj.company,$scope.GuardFormObj.position_in_company,$scope.GuardFormObj.is_property_owner,$scope.GuardFormObj.property_owner_name,$scope.GuardFormObj.is_insurance_professional,$scope.GuardFormObj.property_address1,$scope.GuardFormObj.property_address2,$scope.GuardFormObj.property_state,$scope.GuardFormObj.property_city,$scope.GuardFormObj.property_zip,$scope.GuardFormObj.property_type,$scope.GuardFormObj.comments);
                    var url =API.StormgaurdForm();


                    var data = new FormData(); 
                     
                     
                     data.append("fname",$scope.GuardFormObj.fname);
                     data.append("lname",$scope.GuardFormObj.lname);
                     data.append("phone",$scope.GuardFormObj.phone);
                     data.append("email",$scope.GuardFormObj.email);
                     data.append("company",$scope.GuardFormObj.company);
                     data.append("position_in_company",$scope.GuardFormObj.position_in_company);
                     //data.append("is_emergency",$scope.reportLossObj.is_emergency);
                     data.append("is_property_owner",$scope.GuardFormObj.is_property_owner);
                     data.append("property_owner_name",$scope.GuardFormObj.property_owner_name);
                     data.append("is_insurance_professional",$scope.GuardFormObj.is_insurance_professional);
                     data.append("property_address1",$scope.GuardFormObj.property_address1);
                     data.append("property_address2",$scope.GuardFormObj.property_address2);
                     data.append("property_state",$scope.GuardFormObj.property_state);
                     data.append("property_city",$scope.GuardFormObj.property_city);
                     data.append("property_zip",$scope.GuardFormObj.property_zip);
                     data.append("property_type",$scope.GuardFormObj.property_type);
                     data.append("comments",$scope.GuardFormObj.comments);
                    
                    
                  /*  data.append("name","mitesh123"); 
                    data.append("anotherName","shah123");*/
                    

                        $.ajax({
                            url: url,
                            type: 'POST',           
                            data: data , 
                            processData: false,
                            contentType:false,
                            success: function (data) {
                             
                             if (JSON.parse(data).result==true || JSON.parse(data).result=="true") {
                                $scope.alldata = data;
                                var alertPopup = $ionicPopup.alert({
                                  title :'Thank you' ,
                                  template: ' Your form has been sent successfuly ! Thank you for contacting us.'          
                                });          
                                alertPopup.then(function(res) {           
                                  $state.go("tab.guard");                     
                                });

                                $ionicLoading.hide();
                              }else{
                                console.log("credential");
                                $ionicLoading.hide();
                              }       
                            }
                            
                          });

                   /* services.postService(url,$scope.GuardFormObj).then(function(response){
                      console.log(response);
                      if (response.result==true || response.result=="true") {
                        $scope.alldata = response;
                        // $localstorage.set("user_id",$scope.userlogin.id);
                        var alertPopup = $ionicPopup.alert({
                          title :'Thank you' ,
                          template: ' Your form has been sent successfuly ! Thank you for contacting us.'          
                        });          
                        alertPopup.then(function(res) {           
                          $state.go("tab.guard");                     
                         });

                        $ionicLoading.hide();
                      }else{
                        console.log("credential");
                        // var alertPopup = $ionicPopup.alert({
                        //   title :'Thank you' ,
                        //   template: 'This User Allready exist'          
                        // });
                        $ionicLoading.hide();
                      }       
                    }) */
                } 
            }
        }catch(err){
          console.log(err.message);
        }
      });
})

.controller('InspectFormCtrl', function($scope, $ionicPlatform, $cordovaDialogs,API,services,$ionicHistory,$ionicLoading,$ionicPopup,$http,$state) {
  



        $ionicPlatform.ready(function(){
        try{ 

           
        /*  $ionicHistory.nextViewOptions({
            disableBack: true
          });
*/
          $scope.showTab=function()
          {
            console.log('showTab');
            $('.tab-nav').show();
          }

          $scope.hideTab=function()
          {
            console.log('hideTab');
            $('.tab-nav').hide();
          }

          //$ionicHistory.clearHistory();

          $scope.InspectionObj={};
          $scope.InspectionObj.fname=""
          $scope.InspectionObj.lname="";
          $scope.InspectionObj.phone="";
          $scope.InspectionObj.email="";
          $scope.InspectionObj.company="";
          $scope.InspectionObj.position_in_company="";
          $scope.InspectionObj.is_property_owner=""
          $scope.InspectionObj.property_owner_name="";
          $scope.InspectionObj.is_insurance_professional="";
          $scope.InspectionObj.property_address1="";
          $scope.InspectionObj.property_address2=""
          $scope.InspectionObj.property_state="";
          $scope.InspectionObj.property_city="";
          $scope.InspectionObj.property_zip="";
          $scope.InspectionObj.property_type=""
          $scope.InspectionObj.department="";
          $scope.InspectionObj.purpose="";
          $scope.InspectionObj.comments="";
          
          $scope.InspectionForm = function(){
            console.log("hi");
                if($scope.InspectionObj.fname==''){
                      $ionicPopup.alert({'title':'Error', 'template':'First Name should not be blank'});
                      return false;
                }
                if($scope.InspectionObj.lname==''){
                      $ionicPopup.alert({'title':'Error', 'template':'Last Name should not be blank'});
                      return false;
                }
                if($scope.InspectionObj.phone==''){
                      $ionicPopup.alert({'title':'Error', 'template':'Phone No should not be blank'});
                      return false;
                }
                if($scope.InspectionObj.email=='' || $scope.InspectionObj.email==undefined || $scope.InspectionObj.email=='undefined'){
                      $ionicPopup.alert({'title':'Error', 'template':'Email Address should not be blank'});
                      return false;
                }
                if($scope.InspectionObj.is_property_owner=='No'){

                      if($scope.InspectionObj.property_owner_name==''){
                    
                      $ionicPopup.alert({'title':'Error', 'template':'Owner Name should not be blank'});
                      return false;
                }
                }
                if($scope.InspectionObj.is_insurance_professional==''){
                      $ionicPopup.alert({'title':'Error', 'template':'Please choose Insurance Professional field'});
                      return false;
                }
                if($scope.InspectionObj.property_address1==''){
                      $ionicPopup.alert({'title':'Error', 'template':'Address1 should not be blank'});
                      return false;
                }
                
                if($scope.InspectionObj.property_state==''){
                      $ionicPopup.alert({'title':'Error', 'template':'State should not be blank'});
                      return false;
                }
                if($scope.InspectionObj.property_city==''){
                      $ionicPopup.alert({'title':'Error', 'template':'City should not be blank'});
                      return false;
                }
                if($scope.InspectionObj.property_zip==''){
                      $ionicPopup.alert({'title':'Error', 'template':'ZIP should not be blank'});
                      return false;
                }
                if($scope.InspectionObj.property_type==''){
                      $ionicPopup.alert({'title':'Error', 'template':'Property type should not be blank'});
                      return false;
                }
                if($scope.InspectionObj.department==''){
                      $ionicPopup.alert({'title':'Error', 'template':'Department should not be blank'});
                      return false;
                }
                else{
                  console.log("hi2");
                  console.log(JSON.stringify($scope.InspectionObj));
                    // $scope.choosedate=$filter('date')($scope.reg.dob,'yyyy-MM-dd');
                    // fname, lname, phone, email, company, position_in_company, is_property_owner, property_owner_name, is_insurance_professional, property_address1, property_address2, property_state, property_city, property_zip, property_type, department, purpose
                    $ionicLoading.show();
                    // $scope.InspectionObj.fname,$scope.InspectionObj.lname,$scope.InspectionObj.phone,$scope.InspectionObj.email,$scope.InspectionObj.company,$scope.InspectionObj.position_in_company,$scope.InspectionObj.is_property_owner,$scope.InspectionObj.property_owner_name,$scope.InspectionObj.is_insurance_professional,$scope.InspectionObj.property_address1,$scope.InspectionObj.property_address2,$scope.InspectionObj.property_state,$scope.InspectionObj.property_city,$scope.InspectionObj.property_zip,$scope.InspectionObj.property_type,$scope.InspectionObj.department,$scope.InspectionObj.purpose
                    var url = API.InspectionForm();
                    console.log(url);
                    
                    /*services.postService(url,$scope.InspectionObj).then(function(response){
                      console.log(response);
                      if (response.result==true || response.result=="true") {
                        $scope.alldata = response;
                        var alertPopup = $ionicPopup.alert({
                          title :'Thank you' ,
                          template: ' Your form has been sent successfuly ! Thank you for contacting us.'          
                        });          
                        alertPopup.then(function(res) {           
                          $state.go("tab.inspect");                     
                         });

                        $ionicLoading.hide();
                      }else{
                        console.log("credential");
                        $ionicLoading.hide();
                      }       
                    }) 
                    JSON.stringify($scope.InspectionObj),
                    */

                    var data = new FormData(); 
                    
                     
                     data.append("fname",$scope.InspectionObj.fname);
                     data.append("lname",$scope.InspectionObj.lname);
                     data.append("phone",$scope.InspectionObj.phone);
                     data.append("email",$scope.InspectionObj.email);
                     data.append("company",$scope.InspectionObj.company);
                     data.append("position_in_company",$scope.InspectionObj.position_in_company);
                     data.append("is_property_owner",$scope.InspectionObj.is_property_owner);
                     data.append("property_owner_name",$scope.InspectionObj.property_owner_name);
                     data.append("is_insurance_professional",$scope.InspectionObj.is_insurance_professional); 
                     data.append("property_address1",$scope.InspectionObj.property_address1);
                     data.append("property_address2",$scope.InspectionObj.property_address2);
                     data.append("property_state",$scope.InspectionObj.property_state);
                     data.append("property_city",$scope.InspectionObj.property_city);
                     data.append("property_zip",$scope.InspectionObj.property_zip);
                     data.append("property_type",$scope.InspectionObj.property_type);
                     data.append("department",$scope.InspectionObj.department);
                     data.append("comments",$scope.InspectionObj.comments);
                    

                        $.ajax({
                            url: url,
                            type: 'POST',           
                            data: data , 
                            processData: false,
                            contentType:false,
                            success: function (data) {
                             console.log(data);
                             console.log(JSON.parse(data).result);

                             if (JSON.parse(data).result==true || JSON.parse(data).result=="true") {
                                $scope.alldata = data;
                                var alertPopup = $ionicPopup.alert({
                                  title :'Thank you' ,
                                  template: 'Your form has been sent successfuly!  Thank you for contacting us.'          
                                });          
                                alertPopup.then(function(res) {           
                                  $state.go("tab.inspect");                     
                                });

                                $ionicLoading.hide();
                              }else{
                                console.log("credential");
                                $ionicLoading.hide();
                              }       
                            }
                            
                          });
                   /* $.ajax({
                        url: "http://howsit.co.za/mail.php",
                        type: 'POST',          
                        data:  {fname:"mitesh"}, 
                        success: function (data) {
                          console.log(data);
                            $scope.alldata = data;
                            var alertPopup = $ionicPopup.alert({
                              title :'Thank you' ,
                              template: ' Your form has been sent successfuly ! Thank you for contacting us.'          
                            });          
                            alertPopup.then(function(res) {           
                              $state.go("tab.inspect");                     
                            });

                            $ionicLoading.hide();
                        }
                        
                      });**/
                } 
            }
        }catch(err){
          console.log(err.message);
        }
      });

})

.controller('ReportLossCtrl', function($timeout,$scope, $ionicPlatform, $ionicActionSheet, $cordovaEmailComposer, $cordovaDialogs, $cordovaCamera,$filter,API,services,$ionicHistory,$ionicLoading,$ionicPopup,$http,$state) {
    $ionicPlatform.ready(function(){

       $scope.showTab=function()
        {
          console.log('showTab');
          $('.tab-nav').show();
        }

        $scope.hideTab=function()
        {
          console.log('hideTab');
          $('.tab-nav').hide();
        }

    try{

        $scope.day= {
          date:'',
          month:'',
          year:''
        }

        $scope.today = new Date();
        $scope.reportLossObj={};
        $scope.reportLossObj.fname=""
        $scope.reportLossObj.lname="";
        $scope.reportLossObj.phone="";
        $scope.reportLossObj.email="";
        $scope.reportLossObj.company="";
        $scope.reportLossObj.position_in_company="";
        $scope.reportLossObj.is_emergency="";
        $scope.reportLossObj.is_property_owner=""
        $scope.reportLossObj.property_owner_name="";
        $scope.reportLossObj.is_insurance_professional="";
        $scope.reportLossObj.damaged_property_address1="";
        $scope.reportLossObj.damaged_property_address2=""
        $scope.reportLossObj.damaged_property_state="";
        $scope.reportLossObj.damaged_property_city="";
        $scope.reportLossObj.damaged_property_zip="";
        $scope.reportLossObj.loss_location_type=""
        $scope.reportLossObj.type_of_loss="";
        $scope.reportLossObj.detail_of_damage="";
        $scope.reportLossObj.pic1="";
        $scope.reportLossObj.pic2=""
        $scope.reportLossObj.pic3="";
        $scope.reportLossObj.day_of_loss="";
        $scope.reportLossObj.month_of_loss="";
        $scope.reportLossObj.year_of_loss="";
        $scope.day.date=$filter('date')($scope.today,'dd');
        $scope.day.month=$filter('date')($scope.today,'MM');
        $scope.day.year=$filter('date')($scope.today,'yyyy');
        $scope.reportLossObj.insurance_carrier_name="";
        $scope.reportLossObj.is_claim_called="";
        $scope.reportLossObj.claim_number="";
        $scope.reportLossObj.name_insurance_adjuster="";
        $scope.reportLossObj.phone_insurance_adjuster="";
        $scope.reportLossObj.agent_phone_number="";
        $scope.reportLossObj.agent_name="";
        $scope.reportLossObj.comments="";
        $scope.reportLossObj.date_time="";

          $scope.datevalidation = function(){
            if($scope.reportLossObj.month_of_loss!='' && $scope.reportLossObj.year_of_loss!=''){
                  $scope.datecheck();
            }

          }

          $scope.monthvalidation = function(){
                if($scope.reportLossObj.day_of_loss!='' && $scope.reportLossObj.year_of_loss!=''){
                      $scope.datecheck();
            }  
          }

          $scope.datecheck = function(){
              if($scope.day.year<$scope.reportLossObj.year_of_loss){
                $ionicPopup.alert({'title':'Error', 'template':'You can not select future year of loss'});
                
                $scope.reportLossObj.year_of_loss="";
                return false;
              }
              else if($scope.day.year==$scope.reportLossObj.year_of_loss && $scope.day.month<$scope.reportLossObj.month_of_loss){
                      $ionicPopup.alert({'title':'Error', 'template':'You can not select future month of loss'});
                      $scope.reportLossObj.month_of_loss="";
                      return false;
                     }

              else if($scope.day.year==$scope.reportLossObj.year_of_loss && $scope.day.month==$scope.reportLossObj.month_of_loss && $scope.day.date<$scope.reportLossObj.day_of_loss)
                     {
                        $ionicPopup.alert({'title':'Error', 'template':'You can not select future date of loss'});
                        $scope.reportLossObj.day_of_loss="";
                        return false;
                     } 
          }
            $scope.Reportloss = function(){
                if($scope.reportLossObj.fname==''){
                      $ionicPopup.alert({'title':'Error', 'template':'First Name should not be blank'});
                      return false;
                }
                if($scope.reportLossObj.lname==''){
                      $ionicPopup.alert({'title':'Error', 'template':'Last Name should not be blank'});
                      return false;
                }
                if($scope.reportLossObj.phone==''){
                      $ionicPopup.alert({'title':'Error', 'template':'Phone No should not be blank'});
                      return false;
                }
                if($scope.reportLossObj.email=='' || $scope.reportLossObj.email==undefined){
                      $ionicPopup.alert({'title':'Error', 'template':'Email Address should not be blank'});
                      return false;
                }
                if($scope.reportLossObj.is_property_owner=='No'){

                      if($scope.reportLossObj.property_owner_name==''){
                    
                      $ionicPopup.alert({'title':'Error', 'template':'Owner Name should not be blank'});
                      return false;
                }
                }
                if($scope.reportLossObj.is_insurance_professional==''){
                      $ionicPopup.alert({'title':'Error', 'template':'Please choose Insurance Professional field'});
                      return false;
                }
                if($scope.reportLossObj.is_emergency==''){
                      $ionicPopup.alert({'title':'Error', 'template':'Choose Any Option'});
                      return false;
                }
                if($scope.reportLossObj.damaged_property_address1==''){
                      $ionicPopup.alert({'title':'Error', 'template':'Address1 should not be blank'});
                      return false;
                }
                
                if($scope.reportLossObj.damaged_property_state==''){
                      $ionicPopup.alert({'title':'Error', 'template':'State should not be blank'});
                      return false;
                }
                if($scope.reportLossObj.damaged_property_city==''){
                      $ionicPopup.alert({'title':'Error', 'template':'City should not be blank'});
                      return false;
                }
                if($scope.reportLossObj.damaged_property_zip==''){
                      $ionicPopup.alert({'title':'Error', 'template':'ZIP should not be blank'});
                      return false;
                }
                if($scope.reportLossObj.loss_location_type==''){
                      $ionicPopup.alert({'title':'Error', 'template':'Location type should not be blank'});
                      return false;
                }
                else{
                    $ionicLoading.show();

                    var url = API.ReportALoss();
                   
                    var dataset=$scope.reportLossObj;

                     var data = new FormData(); 
                     
                     
                     data.append("fname",$scope.reportLossObj.fname);
                     data.append("lname",$scope.reportLossObj.lname);
                     data.append("phone",$scope.reportLossObj.phone);
                     data.append("email",$scope.reportLossObj.email);
                     data.append("company",$scope.reportLossObj.company);
                     data.append("position_in_company",$scope.reportLossObj.position_in_company);
                     data.append("is_emergency",$scope.reportLossObj.is_emergency);
                     data.append("is_property_owner",$scope.reportLossObj.is_property_owner);
                     data.append("property_owner_name",$scope.reportLossObj.property_owner_name);
                     data.append("is_insurance_professional",$scope.reportLossObj.is_insurance_professional);
                     data.append("damaged_property_address1",$scope.reportLossObj.damaged_property_address1);
                     data.append("damaged_property_address2",$scope.reportLossObj.damaged_property_address2);
                     data.append("damaged_property_state",$scope.reportLossObj.damaged_property_state);
                     data.append("damaged_property_city",$scope.reportLossObj.damaged_property_city);
                     data.append("damaged_property_zip",$scope.reportLossObj.damaged_property_zip);
                     data.append("loss_location_type",$scope.reportLossObj.loss_location_type);
                     data.append("type_of_loss",$scope.reportLossObj.type_of_loss);
                     data.append("detail_of_damage",$scope.reportLossObj.detail_of_damage);
                     data.append("day_of_loss",$scope.reportLossObj.day_of_loss);
                     data.append("month_of_loss",$scope.reportLossObj.month_of_loss);
                     data.append("year_of_loss",$scope.reportLossObj.year_of_loss);
                     data.append("insurance_carrier_name",$scope.reportLossObj.insurance_carrier_name);
                     data.append("is_claim_called",$scope.reportLossObj.is_claim_called);
                     data.append("claim_number",$scope.reportLossObj.claim_number);
                     data.append("name_insurance_adjuster",$scope.reportLossObj.name_insurance_adjuster);
                     data.append("phone_insurance_adjuster",$scope.reportLossObj.phone_insurance_adjuster);
                     data.append("agent_name",$scope.reportLossObj.agent_name);
                     data.append("agent_phone_number",$scope.reportLossObj.agent_phone_number);
                     data.append("comments",$scope.reportLossObj.comments);

                     data.append("pic1",$scope.reportLossObj.pic1.toString());
                     data.append("pic2",$scope.reportLossObj.pic2.toString());
                     data.append("pic3",$scope.reportLossObj.pic3.toString());

                  /*  data.append("name","mitesh123"); 
                    data.append("anotherName","shah123");*/
                    

                        $.ajax({
                            url: url,
                            type: 'POST',           
                            data: data , 
                            processData: false,
                            contentType:false,
                            success: function (data) {
                              
                                if (JSON.parse(data).result==true || JSON.parse(data).result=="true") {
                                    $scope.alldata = data;
                                    var alertPopup = $ionicPopup.alert({
                                      title :'Thank you' ,
                                      template: ' Your form has been sent successfuly ! Thank you for contacting us.'          
                                    });          
                                    alertPopup.then(function(res) {           
                                      $state.go("tab.help");                     
                                    });

                                    $ionicLoading.hide();
                                  }else{
                                    console.log("credential");
                                    $ionicLoading.hide();
                                  }       
                              }
                            
                          });
                  /*  services.postService(url,dataset).then(function(response){
                      console.log(response);
                      if (response.result==true || response.result=="true") {
                        $scope.alldata = response;
                        var alertPopup = $ionicPopup.alert({
                          title :'Thank you' ,
                          template: ' Your form has been sent successfuly ! Thank you for contacting us.'          
                        });          
                        alertPopup.then(function(res) {           
                          $state.go("tab.help");                     
                         });

                        $ionicLoading.hide();
                      }else{
                        console.log("credential");
                        $ionicLoading.hide();
                      }       
                    }) */
                } 
            }

          
    			// $scope.attachments = [];
    			$scope.getPicture = function(name) {
            $scope.images = name;
            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
             buttons: [
               { text: 'Camera' },
               { text: 'Photo Gallery' }
             ],
             cancel: function() {
                  // add cancel code..
                },
             buttonClicked: function(index) {
                var options = {};

                if (index == 0) { // camera
                  options = {
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 1000,
                    targetHeight: 1000,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false,
                    correctOrientation:true
                  };
                } else { // gallery
                  options = {
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 1000,
                    targetHeight: 1000,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false,
                    correctOrientation:true
                  };
                }

                $cordovaCamera.getPicture(options).then(function(imageURI) {
                  var newImage = "data:image/jpeg;base64," + imageURI;
                  //console.log(newImage);
                  if ($scope.images == "pic1") {
                    $scope.reportLossObj.pic1=newImage;
                  }else if($scope.images == "pic2"){
                    $scope.reportLossObj.pic2=newImage;
                  }else if($scope.images == "pic3"){
                    $scope.reportLossObj.pic3=newImage;
                  }
                }, function(err) {
                  // error
                });
               return true;
             }
            });

            // For example's sake, hide the sheet after two seconds
            $timeout(function() {
             hideSheet();
            }, 2000);


         //    $scope.images = name;
    					// var options = {
					    //   destinationType: Camera.DestinationType.DATA_URL,
					    //   sourceType: Camera.PictureSourceType.CAMERA,
         //        encodingType: Camera.EncodingType.JPEG,
         //        targetWidth: 1000,
         //        targetHeight: 1000,
         //        popoverOptions: CameraPopoverOptions,
         //        saveToPhotoAlbum: false,
         //        correctOrientation:true
					    // };
					    // $cordovaCamera.getPicture(options).then(function(imageURI) {
         //        var newImage = "data:image/jpeg;base64," + imageURI;
         //        if ($scope.images == "pic1") {
         //          $scope.reportLossObj.pic1=newImage;
         //        }else if($scope.images == "pic2"){
         //          $scope.reportLossObj.pic2=newImage;
         //        }else if($scope.images == "pic3"){
         //          $scope.reportLossObj.pic3=newImage;
         //        }
					    // }, function(err) {
					    //   // error
					    // });
    			};
    			
     }catch(err){
      console.log(err.message);
    }
  });
});
