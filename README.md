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
####authenticate()
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

######Authentication for the <a href="http://help.qlik.com/en-US/sense-developer/3.0/Subsystems/APIs/Content/MashupAPI/qlik-interface-interface.htm" target="_blank">Qlik Sense Capability APIs</a>
In order to consume content from the <a href="http://help.qlik.com/en-US/sense-developer/3.0/Subsystems/APIs/Content/MashupAPI/qlik-interface-interface.htm" target="_blank">Qlik Sense Capability APIs</a> you first need to establish a valid Qlik Sense session. Calling Playground.authenticate() will automatically redirect the page in order to establish the session. If successful you will be redirected back to localhost:8000/main. This means that your project should have a separate page to initialize the authentication flow.

Authentication Page
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"/>
    <title></title>
    <link rel="stylesheet" href="/node_modules/playground-js-api/dist/playground-ui.css" media="screen" title="no title" charset="utf-8">
  </head>
  <body>
    <script type="text/javascript" src="/node_modules/playground-js-api/dist/playground-js-api.js"></script>
    <script type="text/javascript" src="/node_modules/playground-js-api/dist/playground-ui.js"></script>
    <script type="text/javascript" src="/resources/script.js"></script>
    <script type="text/javascript">
      authenticate();
    </script>
  </body>
</html>
```

Main Page
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"/>
    <title></title>
    <link rel="stylesheet" href="/node_modules/playground-js-api/dist/playground-ui.css" media="screen" title="no title" charset="utf-8">
  </head>
  <body>
    <script type="text/javascript" src="/node_modules/playground-js-api/dist/playground-js-api.js"></script>
    <script type="text/javascript" src="/node_modules/playground-js-api/dist/playground-ui.js"></script>
    <script type="text/javascript" src="/resources/script.js"></script>
    <script type="text/javascript">
      main();
    </script>
  </body>
</html>
```

```javascript
var config = {...};
function authenticate(){
  Playground.authenticate(config);
}
```

Connecting
```javascript

```
##UI Components
