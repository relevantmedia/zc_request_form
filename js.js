<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.2/angular.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.2/angular-animate.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.2/angular-aria.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.2/angular-messages.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angular_material/0.10.0/angular-material.min.js"></script>

<script>
var app = angular.module('zcRequest', ['ngMaterial','ngMessages','ngAnimate']);

app.controller('zcRequestFormCtrl', ['$scope','$mdDialog', function zcRequestFormCtrl($scope, $mdDialog) {
  $scope.request = {};
  $scope.requestSubmitted = false;
  $scope.getUser = function() {
    google.script.run.withSuccessHandler(User).User(); 
  }
  function User(user) {
    if(Object.keys(user).length > 0){
      $scope.request.staff = {
        name: user.name,
        email: user.email
      };
      $scope.$apply();
    }
  }

  $scope.tabs = {
    selectedIndex: 0,
    details:true,
    delivery:true
  }
  //$scope.hello = 'Zero Canvas Request Form';

  $scope.fields = {
    requestTypes: [
      {title:'Print', content:'Print (document is already created)'},
      {title:'Design', content:'Design (document needs to be created)'},
      {title:'Tech', content:'Tech (computer-related requests)'},
      {title:'Web', content:'Web (website-related requests)'}
    ],
    formats:{
      designFormats:[
        {title:'Marketing', content:'Marketing Campaign'},
        {title:'tShirt', content:'T-Shirt'},
        {title:'dont-know', content:'Don\'t Know - Help me decide'}
      ],
      printFormats:[
        {title:'Brochure', content:'Brochure'},
        {title:'Booklet', content:'Booklet'},
        {title:'Poster', content:'Poster'},
        {title:'Postcard', content:'Postcard'},
        {title:'Leaving Piece', content:'Leaving Piece'}
      ]
    },
    layouts:[
      {title:'letter', content:'8.5 x 11'},
      {title:'half-sheet', content:'8.5 x 5.5 (8.5 x 11 halved)'},
      {title:'quarter-sheet', content:'4.25 x 5.5 (8.5 x 11 quartered)'},
      {title:'tabloid', content:'11 x 17'}
    ],
    address:[
      {title:'street'},
      {title:'city'},
      {title:'state'},
      {title:'zip'}
    ],
    chartfield:[
      {title:'businessUnit'},
      {title:'operatingUnit'},
      {title:'deptId'},
      {title:'projectId'}
    ],
    techSpecs:{
      makes:[
        {
          manufacturer:'Apple',
          models:[
            {model:'iMac'},
            {model:'Macbook Air'},
            {model:'Macbook Pro'},
            {model:'Other'}
          ],
          system:[
            {os:'10.11 - El Capitan'},
            {os:'10.10 - Yosemite'},
            {os:'10.9 - Mavericks'},
            {os:'10.8 - Mountain Lion'}
          ]
        },
        {
          manufacturer:'Dell',
          models:[
            {model:'Inspiron'},
            {model:'Latitude'},
            {model:'Vostro'}
          ],
          system:[
            {os:'Windows 10'},
            {os:'Windows 8'},
            {os:'Windows 7'}
          ]
        },
        {manufacturer:'Other PC'}
      ]
    },
    webServices:[
      {title:'Domains'},
      {title:'Web Hosting'},
      {title:'Wordpress Theme'}
    ]
  }
  
  $scope.request.web = { services:[] };
  $scope.webServices = $scope.request.web.services;
  $scope.toggle = function (item, list) {
    var idx = list.indexOf(item);
    if (idx > -1) list.splice(idx, 1);
    else list.push(item);
  };
  $scope.exists = function (item, list) {
    return list.indexOf(item) > -1;
  };

  $scope.saveRequest = function(newRequest, tab, index) {
    if(newRequest) { $scope.request = newRequest; }
    if(tab) { $scope.tabs[tab] = false; }
    if(index) { $scope.tabs.selectedIndex = index; }
  }

  //build submit function to open loading dialog
  $scope.submitRequest = function submit(request) {
    // Appending dialog to document.body to cover window
    var loading = {
      template: '<md-dialog> \
                  <md-dialog-content> \
                  <p>We are submitting your request.</p> \
                   <div class="serverLoading row" layout="row" layout-sm="column" layout-align="center center"> \
                     <md-progress-circular class="md-warn" md-mode="indeterminate"></md-progress-circular> \
                   </div> \
                  </md-dialog-content> \
                  </md-dialog>',
      parent: angular.element(document.body),
      onComplete: afterShowAnimation
    };
    
    function afterShowAnimation() {
      if(request) { 
        var zcRequest = {};
        angular.copy(request, zcRequest);
        var jsonDate = JSON.stringify(zcRequest.completionDate);
        zcRequest.completionDate = jsonDate;
      }
      google.script.run.withSuccessHandler(requestCreated).createTrelloCard(zcRequest);
    }

    $mdDialog.show(loading);
  }

  function requestCreated() {
    $scope.request = {};
    $mdDialog.hide();
    $scope.requestSubmitted = true;
    $scope.$apply();
  }

}]);

</script>