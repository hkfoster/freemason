/**
 * FreeMason v1.0.1
 * A dynamic layout plugin (inspired by jQuery Masonry)
 * Animate all the things!
 * https://github.com/hkfoster/freemason/
 * 
 * Licensed under the MIT license.
 * Copyright 2012 Kyle Foster
 */
;(function ( $, window, document, undefined ) {

  $.fn.freeMason = function ( options ) {

    options = $.extend( {}, $.fn.freeMason.options, options );

    return this.each(function () {

      var elem = $(this);
      
      // Debulked onresize handler
      function on_resize(c, t) { onresize = function() { clearTimeout(t); t = setTimeout(c, 100) }; return c };

      on_resize(function() {
      
        // Define variables           
        var windowWidth = $(window).width(),
            thumb       = elem.find('.thumb'),
            thumbWidth  = thumb.width(),
            thumbHeight = thumb.height(),
            maxCols     = options.maxCols, // Maximum # of columns desired
            padding     = options.padding * 2, // Container padding
            maxWidth    = thumbWidth * maxCols + padding,
            prefix      = ($.browser.webkit)  ? '-webkit-transition' :
                          ($.browser.mozilla) ? '-moz-transition' : 
                          ($.browser.msie)    ? '-ms-transition' :
                          ($.browser.opera)   ? '-o-transition' : 'transition';
          
        // Set container width
        elem.css({ width : maxWidth });

        // Define some more variables
        var contWidth = elem.width(),
            offset    = windowWidth - contWidth,
            maxThumbs = Math.floor(offset / thumbWidth);
          
        // Reset container width on resize
        if (windowWidth < maxWidth) {
          elem.css({ width : contWidth + (thumbWidth * maxThumbs) });
        }
          
        // Define after container width is set
        var widthCheck = Math.floor(elem.width() / thumbWidth);

        // CSS3 transitions
        thumb.css(prefix, 'left ' + options.speed + ', top ' + options.speed);
          
        // Position Elements
        thumb.each(function(){
          var element   = $(this),
              elemIndex = element.index(),
              leftCheck = elemIndex % widthCheck,
              topCheck  = Math.floor(elemIndex / widthCheck); 
          
          element.css({ 
            left : leftCheck * thumbWidth + (padding / 2),  // Left padding
            top : topCheck * thumbHeight          
          });
        });
      })(); // end & fire resize function   
    });
  };

  // Overridable default options
  $.fn.freeMason.options = {
    speed: '0.5s',
    maxCols: 4,
    padding: 40 // Overall horizontal padding on container
  };

})( jQuery, window, document );