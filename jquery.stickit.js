// stickit: jQuery plugin, v1.1.0 / 2013.11.19
// Top-fixed element on scroll
//
// Neil Monroe (neil.monroe@gmail.com)
//
// Usage:
//     $(selector).stickit();
//     $(selector).stickit(
//         fixed: function () {
//             console.log('Stay put!');
//         },
//         unfixed: function () {
//             console.log('I'm free!');
//         },
//     );

if ($.fn.stickit) _stickit = $.fn.stickit;

$.fn.stickit = function (options) {
    return $(this).each(function () {
        var el = this, $el = $(el), fixed = false;

        var defaults = {
            fixed: null,    // function to execute when element is fixed to the viewport edge
            unfixed: null   // function to execute when element's fixed state is restored
        };
        var opts = $.extend({}, defaults, options);

        // Save the original settings
        var original = {
            position: $el.css('position'),
            top: $el.position().top,
            height: $el.outerHeight()
        };

        // Set up any handlers
        if (opts.fixed && $.isFunction(opts.fixed)) {
            $el.on('stickit.fixed', opts.fixed);
        }
        if (opts.unfixed && $.isFunction(opts.unfixed)) {
            $el.on('stickit.unfixed', opts.unfixed);
        }

        // Create a spacer to take the elements place when fixed
        if (!$el.prev('.stickit-spacer').length) {
            var $spacer = $('<div class="stickit-spacer"/>').hide().height(original.height);
            $el.before($spacer);
        }

        // Attach fixed position check to scroll event
        $(window).on('scroll', function (event) {
            if ($(this).scrollTop() > original.top) {
                if (!fixed) {
                    fixed = true;
                    $el.addClass('stickit-fixed');
                    $el.css({ position: 'fixed', top: 0 });
                    $el.prev('.stickit-spacer').show();

                    // Execute any handlers
                    $el.triggerHandler('stickit.fixed');
                }
            } else {
                if (fixed) {
                    fixed = false;
                    $el.removeClass('stickit-fixed');
                    $el.css({ position: original.position, top: original.top });
                    $el.prev('.stickit-spacer').hide();

                    // Execute any handlers
                    $el.triggerHandler('stickit.unfixed');
                }
            }
        });
    });
};
