(function($) {
    $.fn.spasticNav = function(options) {
        options = $.extend({
            overlap: 20,
            speed  : 500,
            reset  : 1500,
            color  : "#0b2b61",
            easing : "easeOutExpo"
        }, options);

        return this.each(function() {
            var nav = $(this),
                currentPageItem = $(".selected", nav),
                blob,
                reset;

            blob = $("<li></li>").attr("id", "blob").css({
                width          : currentPageItem.outerWidth(),
                height         : currentPageItem.outerHeight() + options.overlap,
                left           : currentPageItem.position().left,
                top            : currentPageItem.position().top - options.overlap / 2,
                backgroundColor: options.color
            }).appendTo(this);

            $(window).resize(function() {
                blob.css({
                    width : currentPageItem.outerWidth(),
                    height: currentPageItem.outerHeight() + options.overlap,
                    left  : currentPageItem.position().left,
                    top   : currentPageItem.position().top - options.overlap / 2
                })
            });

            $("li:not(#blob)", nav).click(
                function() {
                    currentPageItem.removeClass("selected");
                    currentPageItem = $(this);
                }).hover(function() {
                    // mouse over
                    clearTimeout(reset);
                    blob.animate(
                        {
                            left : $(this).position().left,
                            width: $(this).width()
                        },
                        {
                            duration: options.speed,
                            easing  : options.easing,
                            queue   : false
                        }
                    );
                }, function() {
                    // mouse out
                    if (this !== currentPageItem[0]) {
                        reset = setTimeout(function() {
                            blob.animate({
                                width: currentPageItem.outerWidth(),
                                left : currentPageItem.position().left
                            }, options.speed);
                        }, options.reset);
                    }
                });

        }); // end each

    };

})(jQuery);
