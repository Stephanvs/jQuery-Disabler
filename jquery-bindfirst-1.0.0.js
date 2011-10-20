/**
 * Bind a event handler as the first handler to be called.
 * All credits go to Anurag (http://stackoverflow.com/users/165737/anurag)
 * http://stackoverflow.com/questions/2360655/jquery-event-handlers-always-execute-in-order-they-were-bound-any-way-around-t/2641047#2641047
 **/
(function ($) {
    $.handler.bindFirst = function (eventName, handler) {
        $(this).each(function (index, element) {
            // Bind the event with it's handler
            $(element).bind(eventName, handler);

            if ($(element).data('events')) {
                // Grab all curent events
                var eventHandlers = $(element).data('events')[eventName];
                
                // The last one is our handler we just added
                var eventHandler = eventHandlers.pop();

                if (eventHandler) {
                    // Move it at the beginning
                    eventHandlers.splice(0, 0, handler);
                }
            }
        });
    };
})(jQuery);