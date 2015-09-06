localStorage.setItem("pings",0);
Pebble.addEventListener('ready',
 setInterval(
      function(e)
      {
      
      var ws = new WebSocket('ws://192.168.129.247:9000/'); //console.log("Sending hello ping...");
      localStorage.setItem("pings", localStorage.getItem("pings") + 1);
     
        if(localStorage.getItem("pings") > 3)
        {
          localStorage.setItem("pings",4);
          Pebble.sendAppMessage({"5":"Disconnected"});
          console.log("disconnected");
        }
        
      ws.onopen = function() 
            {
              ws.send("ping");
//               console.log("Sent ping");
            };
     
      ws.onmessage = function (e) { localStorage.setItem("pings", 0); Pebble.sendAppMessage({"5":"Connected"}); };
      ws.onclose = function() { };
      
      }
      , 2000)
                        
);


function sendMessage(mes)
{
    var ws = new WebSocket('ws://192.168.129.247:9000/');
        console.log("Made Socket");
        ws.onopen = function() {
          console.log("Sending Message")
          ws.send(mes);
        };
  
    ws.onmessage = function (e) { console.log(e.data); };
    ws.onclose = function() { };
  
}


Pebble.addEventListener('appmessage',
  function(e) {
    console.log('Received message: ' + JSON.stringify(e.payload));
    sendMessage(JSON.stringify(e.payload));
  }
);