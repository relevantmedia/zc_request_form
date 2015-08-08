var app = angular.module('zcRequest', ['ngMaterial','ngMessages','ngAnimate']);

app.controller('zcRequestFormCtrl', ['$scope','$mdDialog', function zcRequestFormCtrl($scope, $mdDialog) {
  var form = this;

  this.tabs = {
    selectedIndex: 0,
    details:true,
    delivery:true
  }
  this.hello = 'Hello World!';
  this.request = {};
  this.request.staff = {
  name:'Ryan Strandt',
  email:'ryan.strandt@cru.org'
  };

  this.fields = {
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
    }
  }

  this.checkType = function checkType() {
    if(this.request.type == null) {
      return true;
    } else return false;
  }

  this.saveRequest = function(newRequest, tab, index) {
    if(newRequest) { this.request = newRequest; }
    if(tab) { this.tabs[tab] = false; }
    if(index) { this.tabs.selectedIndex = index; }
  }

  //build submit function to open loading dialog
  this.submitRequest = function submit(request) {
    // Appending dialog to document.body to cover window
    var loading = $mdDialog.confirm({
      template: '<md-dialog> \
                  <md-dialog-content> \
                  <p>We are submitting your request.</p> \
                   <div class="serverLoading row" layout="row" layout-sm="column" layout-align="center center"> \
                     <md-progress-circular class="md-warn" md-mode="indeterminate"></md-progress-circular> \
                   </div> \
                  </md-dialog-content> \
                  </md-dialog>',
      parent: angular.element(document.body)
    });

    $mdDialog.show(loading).then(function() { this.createTrelloCard(request) }, '');
  }

  function requestCreated() {
    $mdDialog.hide();
  }


  this.createTrelloCard = function submit(newRequest) {
    if(newRequest) { this.request = newRequest; }
    google.script.run.withSuccessHandler(requestCreated).createTrelloCard(this.request);
  }

}]);