core = null;
require(["dojo/ready", "application/Core"], function(ready, Core){
	
	ready(function(){
		
		core = new Core();
		core.startup();

		//this should be deferred until all core stuff is loaded. its a patch go get the dojo loader to work. patched in startup_client.js at line 11 instead of the above block as follows:
		//
		//	document.requireReady = function(){
  		//		ready();
		//	}

		document.requireReady();

	});


});