This is an example of how I set up dojo 1.8 with meteor 0.6.0 .

I added a meteor package called dojo which injects a dojo script tag with custom URLs set for the various dojo packages.

The clientside application is then bootstrapped via a "bootstrap.js" script which loads the "application/Core" module and starts that up.

To be able to use Meteor code which influences pre-startup behaviour within my AMD modules i had to modify the "startup_client.js" file which is part of meteor's core distribution.

The new file now looks like this:


(function(){ var queue = [];
var loaded = document.readyState === "loaded" ||
  document.readyState == "complete";

var ready = function() {
  loaded = true;
  while (queue.length)
    (queue.shift())();
};
/*
if (document.addEventListener) {
  document.addEventListener('DOMContentLoaded', ready, false);
  window.addEventListener('load', ready, false);
} else {
  document.attachEvent('onreadystatechange', function () {
    if (document.readyState === "complete")
      ready();
  });
  window.attachEvent('load', ready);
}
*/


//MY CUSTOM MODIFICATION TO SUPPORT AMD MODULES CONTAINING METEOR SPECIFIC CODE. This method is invoked when the application believes it is ready.
document.requireReady = function(){
  ready();
}


Meteor.startup = function (cb) {
  var doScroll = !document.addEventListener &&
    document.documentElement.doScroll;

  if (!doScroll || window !== top) {
    if (loaded)
      cb();
    else
      queue.push(cb);
  } else {
    try { doScroll('left'); }
    catch (e) {
      setTimeout(function() { Meteor.startup(cb); }, 50);
      return;
    };
    cb();
  }
};

})();



