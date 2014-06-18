/*
* Redactor Character Count
* Provides a character counter for redactor fields
*
* @link    https://github.com/staycassiopeia/redactor-character-count/blob/master/redactor-character-count.js
* @license MIT
* @updates Jurre Antonisse: use container for multi-redactor mode
* @updates Jurian Sluiman: add this header
*/

(function($){

  $.fn.redactorCharCount = function(maxChar){

    return $(this).each(function(){

      // Set existing character count

      $('.current-characters', $(this)).text($('.redactor_editor', $(this)).text().length);

      // TODO: Write code to detect if only character in text box is a space

      function limitText(text_field) {
          if ($(text_field).text().length > maxChar) {
              $('span.current-characters').addClass('invalid');
          } else {
              if ($('span.current-characters').hasClass('invalid')) {
                  $('span.current-characters').removeClass('invalid');
              }
          }
      }

      function updateCharCount(text_field) {
          // Update by Soflomo: use a container so multiple redactor fields with
          // multiple counters are supported. Container is required to find nearest
          // counter block for redactor.
          var container =  $(text_field).closest('.redactor_character_container');
          $('.current-characters', container).text($(text_field).text().length);
      }

      $('.redactor_editor', $(this)).each(function() {
        var elem = $(this);

         // Save current value of element

         elem.data('oldVal', elem.text());

         // Bind behaviors to most methods of change
         elem.bind("propertychange keyup input paste", function(event){

            // If value has changes

            if (elem.data('oldVal') != elem.text()) {

             // Updated stored value

             elem.data('oldVal', elem.text());

             // Do action

             updateCharCount($(this));
             limitText($(this));
           }
         });
       });

    });

  };

})(jQuery);
