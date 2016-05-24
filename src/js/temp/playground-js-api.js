var Promise = require("promise");

var qlik_playground = (function(){

function qlik_playground(){

}

qlik_playground.prototype = Object.create(Object.prototype, {
  Authenticate:{
    value: function(authType, apiKey){
      return new Promise(function(resolve, reject){
        get("http://localhost:3000/auth/apikey?apikey="+apiKey, function(err, res){
          if(err){
            reject(err);
          }
          else{
            resolve(res);
          }
        });
      })
    }
  }
});

function get(url, callbackFn){
  var getReq = new XMLHttpRequest();
  getReq.onreadystatechange = function() {
   if (getReq.readyState == 4 && getReq.status == 200) {
     callbackFn(null, getReq.responseText);
   }
   else if(getReq.readyState == 4 && getReq.status != 200){
     callbackFn(getReq.responseText);
   }
 };
 getReq.open("GET", url, true);
 getReq.send();
}

function post(){

}

return qlik_playground;

}());

window.Playground = new qlik_playground();

