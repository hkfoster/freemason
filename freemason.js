/**
 * Freemason v1.0.2
 * @author Kyle Foster
 * MIT license
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
            thumbList   = elem.find('.thumb-list'),
            thumb       = thumbList.find('.thumb'),
            thumbCount  = thumb.length,
            thumbWidth  = thumb.width(),
            thumbHeight = thumb.height(),
            maxCols     = options.maxCols,         // Maximum # of columns
            contPadding = options.contPadding * 2, // Horizontal padding on container
            thumbGutter = options.thumbGutter,     // Padding on thumbnails
            totalWidth  = thumbWidth + thumbGutter,
            widthCheck  = Math.floor((windowWidth - contPadding) / totalWidth),
            prefix      = ($.browser.webkit)  ? '-webkit-transition' :
                          ($.browser.mozilla) ? '-moz-transition' : 
                          ($.browser.msie)    ? '-ms-transition' :
                          ($.browser.opera)   ? '-o-transition' : 'transition';

        // Set container width parameters
        elem.css({ 
          minWidth : thumbWidth,
          maxWidth : totalWidth * maxCols - thumbGutter,
          width    : totalWidth * widthCheck - thumbGutter 
        });
        
        // Add container padding when screen accomodates
        if (windowWidth > (thumbWidth + contPadding)) {
          elem.css({ padding : '0 ' + (contPadding / 2) + 'px' });
        } else {
          elem.css({ padding : 0 });
        }

        // CSS3 transitions
        thumb.css(prefix, 'left ' + options.speed + ', top ' + options.speed);
        
        // Define after container width is set  
        var maxThumbs = Math.ceil(elem.width() / totalWidth);  
        
        // Position Elements
        thumb.each(function() {
          var thumbnail  = $(this),
              thumbIndex = thumbnail.index(),
              leftCheck  = thumbIndex % maxThumbs,
              topCheck   = Math.floor(thumbIndex / maxThumbs); 
          
          thumbnail.css({ 
            top  : topCheck * thumbHeight + (thumbGutter * topCheck),
            left : leftCheck * thumbWidth + (thumbGutter * leftCheck)
          });
        });

        // Once everything is positioned set thumb list height
        thumbList.css({ height : Math.ceil(thumbCount / maxThumbs) * (thumbHeight + thumbGutter) - thumbGutter });

      })(); // end & fire resize function   
    });
  };

  // Overridable default options
  $.fn.freeMason.options = {
    contPadding : 20,     // Horizontal padding on container
    thumbGutter : 20,     // Padding on thumbnails
    speed       : '0.5s', // Animation speed
    maxCols     : 4       // Maximum # of columns
  };

})( jQuery, window, document );