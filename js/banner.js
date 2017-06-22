// Copied from : http://www.cn-wbst.cn/, used only for learning

this.ws = this.ws || {};
(function () {
    var Banner = function (t) {
        this.init(t)
    };
    banner = Banner.prototype;
    banner.guideMain = function (index) {
        var cur = this;
        cur.$controller.css({backgroundPosition: "0% -13px"});
        cur.$controller.eq(index).css({backgroundPosition: "0% 0px"});

        var distance = cur.Width * index;
        cur.$acter.animate({left: -distance}, 500);
        if (index == 3)
            cur.$arrow.css({backgroundPosition: "50px 50%"});
        else
            cur.$arrow.css({backgroundPosition: "0px 50%"});
        cur.mark = index;
    };

    banner.Move = function () {
        var cur = this;
        var waitCount = cur.move % 150;
        if (waitCount === 149)
            cur.guideMain((cur.mark + 1) % 5);
        cur.move++;
    };
    banner.init = function (t) {
        var cur = this;
        //this.$guideController = t.find("#guideControllers");
        this.$controller = t.find("#guideControllers").find("li");
        this.$acter = t.find("#guideActor");
        this.$arrow = t.find("#arrow");
        this.Width = this.$acter.find("li").width();
        this.move = 0;
        this.mark = 0;

        setInterval(function () {
            cur.Move();
        }, 20);

        cur.$controller.eq(0).css({backgroundPosition: "0% 0px"});
        cur.$controller.each(function (index) {
            $(this).click(function () {
                cur.move = 0;
                if (index != cur.mark)
                    cur.guideMain(index);
            })
        });
        cur.$arrow.click(function () {
            if(cur.mark == 4)
                TweenLite.to($("html,body"), .8, {scrollLeft: $("#container_jobs").position().left})
            else {
                cur.move = 0;
                cur.guideMain(cur.mark + 1);
            }
        })
    };
    ws.Banner = Banner;
})();