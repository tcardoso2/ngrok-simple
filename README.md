# ngrok-simple
A very simple library which runs ngrok as a user would and allows inspecting tunnels, backwards compatible with older versions of node (e.g. no async, no promises and others). Only depends on npm package request;  
If you require just bare bones to run quickly without all the complications of ngrok npm package and no dependencies on later versions of node, then this could be a good choice for you, that was the reason why I created this
It requires ngrok to be installed and up and running (see [https://ngrok.com])   

````
(Note this is still work in progress for future versions!):
let ns = require('ngrok-simple');
ns.start(); 	                    //Starts http tunnel on port 80
ns.start(callback, 'http', 8080);	//Starts http tunnel on port 8080
ns.kill();		                    //Kills any ngrok instance running (via actual kill command)
ns.tunnels(0, callback)	            //Returns the first tunnel (0-index based), via callback function
ns.tunnels(0, (err, tunnel) => {
	console.log(tunnel.public_url);
}).	                                //Returns the first tunnel public url via callback
````

## Testing
run:
````
mocha
````

v 0.6: Added some error handling on the request start function (if port 4040 is not up);  
v 0.5: Updated to allow overriding type (http, tcp) and port (defaults to 8088);  
v 0.4: Correction of README;  
v 0.3: Implemented getting public url and tunnels from api;  
v 0.2: Implemented start, kill and get pid from api;  
v 0.1: Initial tests for checking that ngrok is installed and to get the tunnels information (WIP);  
