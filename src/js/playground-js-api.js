var Promise = require("promise");
var envConfig = require('../../../config');

var qlik_playground = (function(){

include "./subscription.js"

function qlik_playground(){
  this.notification = new PSubscription();
}

qlik_playground.prototype = Object.create(Object.prototype, {
  notification:{
    writable: true,
    value: null
  },
  authenticate:{
    value: function(apiKey){
      return new Promise(function(resolve, reject){
        get(envConfig.host+"/api/ticket?apikey="+apiKey).then(function(ticketResponse){
          var ticket = JSON.parse(ticketResponse);
          if(ticket.err){
            reject(ticket.err);
          }
          else{
            resolve(ticket.ticket);
          }
        });
      })
    }
  }
});

function get(url, callbackFn){
  return new Promise(function(resolve, reject){
    var getReq = new XMLHttpRequest();
    getReq.onreadystatechange = function() {
      if (getReq.readyState == 4 && getReq.status == 200) {
        // callbackFn(null, getReq.responseText);
        resolve(getReq.responseText);
      }
      else if(getReq.readyState == 4 && getReq.status != 200){
        // callbackFn(getReq.responseText);
        reject(getReq.responseText);
      }
    };
    getReq.open("GET", url, true);
    getReq.send();
  });
}


function post(){

}

return qlik_playground;

}());

window.Playground = new qlik_playground();
