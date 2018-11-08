# ngrok-simple
A very simple library which runs ngrok as a user would and allows inspecting tunnels, backwards compatible with older versions of node (e.g. no async, no promises and others).
If you require just bare bones to run quickly without all the complications of ngrok npm package and no dependencies on later versions of node, then this could be a good choice for you, that was the reason why I created this
It requires ngrok to be installed and up and running (see [https://ngrok.com])   

````
(Note this is still work in progress for future versions!):
let ns = require('ngrok-simple');
ns.start(); 	//Starts http tunnel on port 80
ns.start(8080);	//Starts http tunnel on port 8080
ns.kill();		//Kills any ngrok instance running (via actual kill command)
ns.tunnels()	//Returns the tunnels
ns.tunnels(0)	//Returns the first tunnel (0-index based)
ns.tunnels(0).public_url	//Returns the first tunnel public url

//Subscribe to events triggered whenever ngrok starts / ends - old school events

ns.on('start', (tunnels) => {
  //Your function here
})

ns.on('kill', (pid) => {
  //Your function here
})
````

## Testing
run:
````
mocha
````

v 0.2: Implemented start, kill and get pid from api;  
v 0.1: Initial tests for checking that ngrok is installed and to get the tunnels information (WIP);  
