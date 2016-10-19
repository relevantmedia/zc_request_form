function doGet(e) {
  var template = HtmlService.createTemplateFromFile('Index');

  // Build and return HTML in IFRAME sandbox mode.
  return template.evaluate()
      .setTitle('ZeroCanvas Request Form')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

function User() {
  var email = Session.getActiveUser().getEmail(),
      dot = email.indexOf('.',0),
      at = email.indexOf('@',dot),
      user = {};
  var fn = email.substring(0,1).toUpperCase() + email.substring(1,dot);
  var ln = email.substring(dot+1,dot+2).toUpperCase() + email.substring(dot+2,at);
  var name = fn + ' ' + ln;
  user.name = name;
  user.email = email;
  return user;
}

/* include function for including other files */
function include(filename) {
  var output = HtmlService.createHtmlOutputFromFile(filename).getContent();
  return output;
}
