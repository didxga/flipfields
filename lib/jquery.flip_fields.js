(function($) {
  //key code for Carriage Return
  var ENTER_KEY = 13;
  //key code for Escape
  var ESC_KEY = 27;
  /**
   * flipFields definition
   * @param options Configuration for customizing this plugin
   */
  $.fn.flipFields = function(options) {
    options = options || {};
    //alias of THIS context
    var flipFields = this;
    flipFields.data('currentlyFlipped', false);
    flipFields.each(function() {
      //alias of jQuery representation for current DOM element
      var flipField = $(this);
      /*Not eligible if the element is not an <input> element of type text or associated data named isflipField is evaluated to be True
       *the second evaluation can prevent one would-be 'isflipField' field from processing multiple times 
       */
      if (flipField.attr('type') != "text" || flipField.data('isflipField')) return;
      //variable to hold the original value
      var originalValue = flipField.val();
      //hide the element to give space for a <span> that acts as render of the <input> element
      flipField.hide();
      //create the <span> with the value of the input element, and add css style to it
      var span = $("<span></span>").text(flipField.val()).addClass(options.spanClass);
      //hook 'click' event handler to the <span> element
      span.click(function(e) {
    	//////////////////////////////////////////////////////////////////////////////////////////////
    	//if there is another Flip Field in edit state currently, blur it at first
    	//set currentlyFlipped to the current iterated <input> element (Closure Is Used Here) 
        //save the current value to variable originalValue
    	//hide the <span>, show the <input> element, and focus on it
    	///////////////////////////////////////////////////////////////////////////////////////////////
        if (flipFields.data('currentlyFlipped')) {
          flipFields.data('currentlyFlipped').blur();
        }
        flipFields.data('currentlyFlipped', flipField);
        originalValue = flipField.val();
        span.hide();
        flipField.show();
        flipField.focus();
      });

      var onBlur = function(e) {
        span.text(flipField.val());
        flipField.hide();
        span.show();
        flipFields.data('currentlyFlipped', false);
      };
      
      var onKeyPress = function(e) {
        var key = e.keyCode || e.which;
        if (key == ENTER_KEY) {
          flipField.blur();
          e.preventDefault();
        }
        if (key == ESC_KEY) {
          flipField.val(originalValue);
          flipField.blur();
          e.preventDefault();
        }
      };
      /*hook 'onblur' and 'onkeypress' handler to the current iterated <input> element*/
      flipField.blur(onBlur);
      flipField.keypress(onKeyPress);
      
      flipField.before(span);
      //mark current iterated <input> element as a 'flipField'
      flipField.data('isflipField', true);

    });
  };
})(jQuery);