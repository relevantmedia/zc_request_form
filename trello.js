function scriptProperties() {
  var properties = PropertiesService.getScriptProperties().getProperties();
  return properties;
}

// This sample sends POST payload data in the style of an HTML form, including a file.
function createTrelloCard(card) {
  var prop = scriptProperties(),
      url = prop.trelloApiUrl,
      key = prop.trelloApiKey,
      secret = prop.trelloApiSecret,
      token = prop.trelloApiToken,
      webServices = card.web.services,
      dateStr,
      completionDate,
      type,
      size,
      desc = '';
       
  var labels = function() {
    var colors = '55140bfc664ce8ff30b63702';
    if(card.type == 'Print') { colors = colors.concat(',','55140bfc664ce8ff30b636ff') }
    if(card.type == 'Design') { colors = colors.concat(',','55c7b8f93ec975a478a2f883') }
    if(card.type == 'Tech') { colors = colors.concat(',','55140d09664ce8ff30b64162') }
    if(card.type == 'Web') { colors = colors.concat(',','55140cfc664ce8ff30b640db') }
    return colors;
  };

  desc = desc.concat(
    card.staff.name,'\n',
    card.staff.email,'\n',
    card.staff.phone,'\n');
  
  if(card.description) { desc = desc.concat('Description: ',card.description,'\n') }
  if(card.specs) {desc = desc.concat('Specs: ',card.specs.make,', ',card.specs.model,', ',card.specs.operating_system,'\n') }
  if(card.format) { 
    card.format.other ? (
      type = card.format.other.type,
      card.format.other.size ? size = card.format.other.size : size = card.format.size
    ) : (type = card.format.type, size = card.format.size),
    desc = desc.concat(
      'Format: ',
      type,', ',
      size,', ',
      card.format.paper,', ',
      card.format.color,'\n'
    ); 
  }
  if(card.web.info) {
    desc = desc.concat('Web Info: ',card.web.info,'\n');
  }
  if(webServices.length > 1) {
    desc = desc.concat('Web Services: ',card.web.services,'\n');
  }
  if(card.delivery) { desc = desc.concat('Delivery: ',card.delivery,'\n') }
  if(card.address) {
    desc = desc.concat(
      'Address: ',
      card.address.street,', ',
      card.address.city,', ',
      card.address.zip,'\n'
    );
  }
  if(card.quantity) { desc = desc.concat('Quantity: ',card.quantity,'\n') }
  if(card.chartfield) {
    desc = desc.concat(
      'Chartfield: ',
      card.chartfield.businessUnit,'/',
      card.chartfield.operatingUnit,'/',
      card.chartfield.deptId,'/',
      card.chartfield.projectId,'\n'
    );
  }
  if(card.completionDate) {
    dateStr = JSON.parse(card.completionDate);
    completionDate = new Date(dateStr);
  }
  var newCard = {
    "idList":"55140cba7e4e076abd560816",
    "pos":"top",
    "name":card.title,
    "desc": desc,
    "due":completionDate,
    "idLabels":labels(),
    "idMembers":"54390b92cdfe96103fdc4728",
    "urlSource":null
  };
  
  var trelloCard = url+'cards?key='+key+'&token='+token;
  var options = {"method" : "post", "payload" : newCard};
  
  var res = UrlFetchApp.fetch(trelloCard, options);
  Logger.log(res);
}

function trelloGet() {
  var prop = scriptProperties(),
     url = prop.trelloApiUrl,
     key = prop.trelloApiKey,
     secret = prop.trelloApiSecret,
     token = prop.trelloApiToken;
  
  var trelloBoards = url+'boards/2RZdDJX6/cards?key='+key+'&token='+token;
  var options = {"method" : "get"};
  var res = UrlFetchApp.fetch(trelloBoards, options);
  Logger.log(res);

}