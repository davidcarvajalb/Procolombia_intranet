jQuery(document).ready(function(){

		var img = document.getElementById('ruleta');
	    img.removeAttribute('style');
	    
	    var deg = Math.floor((Math.random()*5001)+5001);
 		if(!supports('transition')) {

		    $("#ruleta").rotate({
		    easing: $.easing.easeInOutSine,
		    angle: 0, 
		    duration: 10000,
		    animateTo:deg
		  });
 		} 	    
	    else
	    {
		    var css = '-webkit-transform: rotate(' + deg + 'deg); -ms-transform: rotate(' + deg + 'deg); -o-transform: rotate(' + deg + 'deg); -moz-transform: rotate(' + deg + 'deg);';
		    
		    img.setAttribute(
		        'style', css
		    );

	 	}
 		setTimeout(function () { 
 			jQuery('.info-premio').fadeIn();
 		}, 8000);		
 		jQuery('.close').click(function (evt) {
 			evt.preventDefault();
 			jQuery('.alerta').fadeOut();
 		});

});

var supports = (function() {  
   var div = document.createElement('div'),  
      vendors = 'Khtml Ms O Moz Webkit'.split(' '),  
      len = vendors.length;  
  
   return function(prop) {  
      if ( prop in div.style ) return true;  
  
      prop = prop.replace(/^[a-z]/, function(val) {  
         return val.toUpperCase();  
      });  
  
      while(len--) {  
         if ( vendors[len] + prop in div.style ) {  
            // browser supports box-shadow. Do what you need.  
            // Or use a bang (!) to test if the browser doesn't.  
            return true;  
         }   
      }  
      return false;  
   };  
})();  