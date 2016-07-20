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
      return new Promise((resolve, reject)=>{
        this.notification.deliver({
          title: "Please wait...",
          message: "Authenticating"
        });
        get(envConfig.host+"/api/ticket?apikey="+apiKey).then((ticketResponse)=>{
          var ticket = JSON.parse(ticketResponse);
          if(ticket.err){
            this.notification.deliver({
              sentiment: "negative",
              title: "Please wait...",
              message: "Authenticating"
            });
            reject(ticket.err);
          }
          else{
            this.notification.deliver({
              title: "Ready",
              duration: 300
            });
            resolve(ticket.ticket);
          }
        });
      })
    }
  }
});

function get(url, callbackFn){
  return new Promise((resolve, reject)=>{
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
