// Copied from : http://www.cn-wbst.cn/, used only for learning

jQuery.fn.extend({
    imageLoad: function () {
        this.each(function () {
            this.complete,
                $(this).bind("load", function () {
                    $(this).fadeIn(800),
                        $(this).trigger("imageLoadComplete")
                }),
            "undefined" != $(this).data("isLoaded") && void 0 != $(this).data("isLoaded") || ($(this).data("isLoaded", "t"),
                $(this).attr("src", $(this).attr("final-src")))
        })
    }
});