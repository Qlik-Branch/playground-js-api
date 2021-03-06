var Promise = require("promise");
var envConfig = require('../../../config');

var qlik_playground = (function(){

class PSubscription{
  constructor(){
    this.callbackList = [];
  }
  subscribe(fn){
    this.callbackList.push(fn);
  }
  deliver(args){
    this.callbackList.forEach(function(item, index){
      item(args);
    });
  }
}


function qlik_playground(){
  this.notification = new PSubscription();
}

qlik_playground.prototype = Object.create(Object.prototype, {
  notification:{
    writable: true,
    value: null
  },
  authenticate:{
    value: function(config, connectionMethod){
      return new Promise((resolve, reject)=>{
        var connMethod = "";
        if(connectionMethod){
          connMethod = connectionMethod.toLowerCase();
        }
        this.notification.deliver({
          title: "Please wait...",
          message: "Authenticating"
        });
        var authUrl = envConfig.host+"/api/ticket?apikey="+config.apiKey;
        get(authUrl).then((ticketResponse)=>{
          var ticket = JSON.parse(ticketResponse);
          if(ticket.err){
            this.notification.deliver({
              sentiment: "negative",
              title: "Error",
              message: ticket.err
            });
            reject(ticket.err);
          }
          else{

            switch (connMethod) {
              case "qsocks":
                this.notification.deliver({
                  title: "Ready",
                  duration: 300
                });
                resolve(ticket.ticket);
                break;
              default:
                window.location = ( config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port: "") + "/playground/content/Default/authStub.html?qlikTicket=" + ticket.ticket;
            }
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
