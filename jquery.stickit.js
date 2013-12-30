// stickit: jQuery plugin, v1.1.1 / 2013.12.30
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
//         fullWidth: true
//     );
//
// Change log:
// 2013.12.30 - Add option to fix to left/right so content can be centered
// 2013.11.19 - Initial release

if ($.fn.stickit) _stickit = $.fn.stickit;

$.fn.stickit = function (options) {
    return $(this).each(function () {
        var el = this, $el = $(el), fixed = false;

        var defaults = {
            fixed: null,      // function to execute when element is fixed to the viewport edge
            unfixed: null,    // function to execute when element's fixed state is restored
            fullWidth: false  // full-width element; useful for centering content within the element
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

        var checkPosition = function (event) {
            if ($(this).scrollTop() >= original.top) {
                if (!fixed) {
                    fixed = true;
                    $el.addClass('stickit-fixed');
                    $el.css({ position: 'fixed', top: 0 });
                    if (opts.fullWidth) {
                        $el.css({ left: 0, right: 0 });
                    }
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
        };

        // Attach fixed position check to scroll event
        $(window).on('scroll', $.debounce(checkPosition, 10));

        // Check it initially
        checkPosition.call(window);
    });
};
