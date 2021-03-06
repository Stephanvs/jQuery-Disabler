// Disable or enable controls
// Requires jquery-bindfirst-1.0.0.js
(function ($) {
    // Visual state
    // 
    // Usage:
    // - Disable the element and all childres
    // $(selector).disable();
    jQuery.fn.disable = function (disable) {

        if (jQuery(this).length == 0) return;

        var controlNames = ['input',
                            'textarea',
                            'select',
                            'a', 
                            'button'].join(',');

        var controls = jQuery(this).filter(controlNames).add(jQuery(this).find(controlNames));
        var otherDomElements = jQuery(this).find('*').andSelf().filter(':not(' + controlNames + ')');

        if (controls.length == 0 && otherDomElements.length == 0) {
            // No controls or DOM elements found
            return this;
        }

        // Add HTML elements with binded events
        otherDomElements.each(function (index) {
            var domElement = $(this);

            if (domElement.data('events')) {
                controls = controls.add(domElement);
            }
        });

        if (disable === undefined || disable) {
            // First find all controls that are currently disabled, 
            // we give them a special attribute to determine later on whether they were disabled
        	controls.filter(':disabled').data('initiallyDisabled', true);
            
            controls.addClass('disabled');
            controls.attr('disabled', (jQuery.browser.msie) ? 'true' : 'disabled');
            controls.bindFirst('click', DisableClick);
        }
        else {
            controls.each(function(i, e) {
                var el = $(this);
            	if (!(el.data('initiallyDisabled'))) {
        			el.removeClass('disabled');
        			el.removeAttr('disabled');
        			el.unbind('click', DisableClick);
        		}
        	});
        }

        return this;
    };

    jQuery.fn.enable = function (disable) {
        return jQuery(this).disable(false);
    };

    // Disable click events
    function DisableClick(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
    };
})(jQuery);