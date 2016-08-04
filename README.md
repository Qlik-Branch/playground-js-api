# Qlik Playground JavaScript API
A JavaScript API for use when connecting to the <a href='http://playground.qlik.com' target="_blank">Qlik Sense Playground</a>

##Installation
```
npm install playground-js-api
```

##Usage
```html
<link rel="stylesheet" href="/node_modules/playground-js-api/dist/playground-ui.min.css" media="screen" title="no title" charset="utf-8">
<script type="text/javascript" src="/node_modules/playground-js-api/dist/playground-js-api.min.js"></script>
<script type="text/javascript" src="/node_modules/playground-js-api/dist/playground-ui.min.js"></script>
```
Loading the JavaScript files will create a new global object called Playground.

##API
The main API consists of the following methods -
####Authenticate
The Authenticate method is a promise that accepts the following parameters -
* Config - contains all of the information require to authenticate and create a connection
* ConnectionMethod (optional) - determines the behaviour of the authentication workflow

######Authentication for <a href="http://branch.qlik.com/#!/project/56728f52d1e497241ae697ca" target="blank">qSocks</a>
```javascript
var config = {...};
Playground.authenticate(config, "qsocks").then(function(ticket){

});
```
When using <a href="http://branch.qlik.com/#!/project/56728f52d1e497241ae697ca" target="blank">qSocks</a> the promise returns a ticket which can then be added to your config object and used to create an authenticate connection to the Qlik Sense Engine.
```javascript
var config = {...};
Playground.authenticate(config, "qsocks").then(function(ticket){
  config.ticket = ticket
  qsocks.ConnectOpenApp(config).then(function(result){
  
  });
});
```

######Authentication for the Qlik Sense Capability APIs
##UI Components
