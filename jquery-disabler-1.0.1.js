// Disable or enable controls
(function ($) {
    // Visual state
    // 
    // Usage:
    // - Disable the element and all childres
    // $(selector).disable();
    jQuery.fn.disable = function (disable) {

        if (jQuery(this).length == 0) return;

        var controls = jQuery(this).filter('input,select,a').add(jQuery(this).find('input,select,a'));
        if (controls.length == 0) {
            return this;
        }

        if (disable === undefined || disable) {
            controls.filter('a').addClass('disabled');
            controls.attr('disabled', 'true');
            controls.bindFirst('click', DisableClick);
        }
        else {
            controls.filter('a').removeClass('disabled');
            controls.removeAttr('disabled');
            controls.unbind('click', DisableClick);
        }

        return this;
    };

    jQuery.fn.enable = function (disable) {
        return jQuery(this).disable(false);
    };

    // Click handler for <a> tags
    function DisableClick(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
    };
})(jQuery);