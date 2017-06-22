// Copied from : http://www.cn-wbst.cn/, used only for learning

this.ws = this.ws || {};
(function () {
    var Frame = function (str) {
        this.state = str;
        this.init();
    };
    var p = Frame.prototype;
    p.maxH = 900;
    p.state = "";
    p.targetX = 0;
    p.init = function () {
        this.$navContainer = $("#navContainer");
        this.$logo = $("#navContainer>.content>.logo");
        this.$nav = $("#navContainer>.content>.nav");
        this.$navBg = $("#navContainer>.nav_bg");

        this.$container = $(".container");
        this.$part = $(".container>.part");
        if (this.state == "main")
            this.$mainPart = this.$part.not("#container_home");
        this.$logoIcon = $("#navContainer>.logoIcon");

        this.initResize();
        this.initMouseWheel();
        this.updateW();
        this.initScroll();
        this.initHash();
        this.initNavContainer();
    };
    p.initResize = function () {
        $(window).triggerHandler("resize");
    };
    p.initMouseWheel = function () {
        var cur = this;
        this.isMac = Browser.Platform.mac;
        if (this.isMac) return;
        $(document).mousewheel(function (event, delta, deltaX, deltaY) {
            var startX = $(document).scrollLeft();
            var tempX = delta * (-300);
            if (tempX > 600) tempX = 800;
            if (tempX < -600) tempX = -800;
            var endX = $(document).scrollLeft() + tempX;

            cur.targetX = startX;
            TweenLite.to(cur, 0.5, {
                targetX: endX, onUpdateScope: cur, onUpdate: function () {
                    $(document).scrollLeft(this.targetX);
                }
            });
        });
    };
    p.updateW = function () {
        var cur = this;
        this.timer = setInterval(function () {
            var w = 0;
            cur.$part.each(function (i) {
                w += $(this).width()
            });
            cur.$container.width(w + 100);
        }, 50);
    };
    p.initScroll = function () {
        var cur = this;
        $(window).scroll(function () {
            if (cur.state == "main") { // 主页
                cur.$mainPart.each(function (i) {
                    var startX = parseInt($(this).position().left);
                    var endX = parseInt(startX + $(this).width());
                    if (i == 0)
                        endX = parseInt(startX + $("#container_home").position().left + $("#container_home").width());
                    if ($(document).scrollLeft() + $(this).width() / 2 >= startX && $(document).scrollLeft() < endX) {
                        cur.setCurNav(i);
                    }
                });
            }
            if (cur.state == "cases") { // 案例
                cur.$part.each(function (i) {
                    var startX = $(this).position().left;
                    var endX = $(this).position().left + $(this).width();
                    if ($(document).scrollLeft() + $(this).width() / 2 >= startX && $(document).scrollLeft() < endX) {
                        if (i == 0) {
                            cur.setCurNav(6); // 设置左侧导览栏选中状态
                        }
                        if (i == 1) {
                            cur.setCurNav(4);
                        }
                        if (i == 2) {
                            cur.setCurNav(5);
                        }
                    }
                });
            }
            if (cur.state == "datavisual") { // 主题平台
                cur.$part.each(function (i) {
                    var startX = $("#container_contactus").position().left;
                    var endX = $("#container_contactus").position().left + $("#container_contactus").width();
                    if ($(document).scrollLeft() >= startX && $(document).scrollLeft() < endX) {
                        cur.setCurNav(5);
                    }
                    else {
                        cur.setCurNav(7);
                    }
                });
            }
            if (cur.state == "knowledge") {
                cur.$part.each(function (i) {
                    var contact_startX = $("#container_contactus").position().left;
                    var contact_endX = $("#container_contactus").position().left + $("#container_contactus").width();

                    var job_startX = $("#container_jobs").position().left;
                    var job_endX = $("#container_jobs").position().left + $("#container_jobs").width();
                    if ($(document).scrollLeft() + $("#container_jobs").width() / 2 >= job_startX
                        && $(document).scrollLeft()+ $("#container_jobs").width() / 2 < job_endX) {
                        cur.setCurNav(4);
                    }
                    else if ($(document).scrollLeft() + $("#container_contactus").width() / 2 >= contact_startX
                        && $(document).scrollLeft()+ $("#container_contactus").width() / 2 < contact_endX) {
                        cur.setCurNav(5);
                    }
                    else {
                        cur.setCurNav(8);
                    }
                });

            }
            ;
        });
    };
    p.initHash = function () {
        var cur = this;
        $(window).bind("hashchange", function (event) {
            if (cur.state == "main") {
                var target;
                if (location.hash == "#_home") {
                    target = $("#container_guide");
                    cur.setCurNav(0);
                }
                if (location.hash == "#_about") {
                    target = $("#container_about");
                    cur.setCurNav(1);
                }
                if (location.hash == "#_service") {
                    target = $("#container_service");
                    cur.setCurNav(2);
                }
                if (location.hash == "#_customers") {
                    target = $("#container_customers");
                    cur.setCurNav(3);
                }
                if (location.hash == "#_job") {
                    target = $("#container_jobs");
                    cur.setCurNav(4);
                }
                if (location.hash == "#_contact") {
                    target = $("#container_contactus");
                    cur.setCurNav(5);
                }
                if (target) {
                    TweenLite.to($("html,body"), 0.8, {scrollLeft: target.position().left});
                }
            }
            if (cur.state == "cases") {
                cur.setCurNav(6);
                var target;
                if (location.hash == "#_job") {
                    target = $("#container_jobs");
                    cur.setCurNav(4);
                }
                if (location.hash == "#_contact") {
                    target = $("#container_contactus");
                    cur.setCurNav(5);
                }
                if (target) {
                    TweenLite.to($("html,body"), 0.8, {scrollLeft: target.position().left});
                }
            }
            if (cur.state == "datavisual") {
                cur.setCurNav(7);
                var target;
                if (location.hash == "#_contact") {
                    target = $("#contactContainer");
                    cur.setCurNav(5);
                }
                if (target) {
                    TweenLite.to($("html,body"), 0.8, {scrollLeft: target.position().left});
                }
            }
            if (cur.state == "knowledge") {
                cur.setCurNav(8);
                var target;
                if (location.hash == "#_job") {
                    target = $("#container_jobs");
                    cur.setCurNav(4);
                }
                if (location.hash == "#_contact") {
                    target = $("#container_contactus");
                    cur.setCurNav(5);
                }
                if (target) {
                    TweenLite.to($("html,body"), 0.8, {scrollLeft: target.position().left});
                }
            }
        });
        $(window).triggerHandler("hashchange");
    };
    p.setCurNav = function (id) {
        var cur = this;
        this.$nav.each(function (i) {
            if (i == id) {
                if (i == 6 || i == 7 || i == 8) {
                    cur.$nav.eq(i).removeClass("navOut1").addClass("nav_over");
                }
                else {
                    cur.$nav.eq(i).removeClass("navOut1").addClass("nav_over");
                }

            }
            else {
                if (i == 6 || i == 7 || i == 8) {
                    cur.$nav.eq(i).removeClass("nav_over").addClass("navOut1");
                }
                else {
                    cur.$nav.eq(i).removeClass("nav_over").addClass("navOut1");
                }

            }
        });
    };
    p.hideNavContainer = function () {
        var cur = this;
        TweenLite.to(cur.$logoIcon, 0.5, {left: "-100px"});
        TweenLite.to(cur.$navBg, 0.5, {height: "101%"});
        if (Browser.ie6 || Browser.ie7 || Browser.ie8) {
            TweenLite.to(cur.$navBg, 0.5, {width: "180px", delay: 0.1});
        }
        else {
            TweenLite.to(cur.$navBg, 0.5, {width: "180px", skewX: "-2.7deg", delay: 0.1});
        }
        TweenLite.to(cur.$logo, 0.5, {left: "20px", delay: 0.5});
        cur.$nav.each(function (i) {
            TweenLite.to($(this), 0.5, {left: "0px", delay: 0.5 + 0.1 * i});
        });
        TweenLite.to(cur.$container, 0.5, {left: "145px", delay: 0.5});
    };
    p.showNavContainer = function () {
        var cur = this;
        TweenLite.to(cur.$logo, 0.5, {left: "-170px", delay: 0});
        cur.$nav.each(function (i) {
            TweenLite.to($(this), 0.3, {left: "-200px", delay: 0.1 * i});
        })
        if (Browser.ie6 || Browser.ie7 || Browser.ie8) {
            TweenLite.to(cur.$navBg, 0.5, {width: "80px", delay: 0.5});
        }
        else {
            TweenLite.to(cur.$navBg, 0.5, {width: "80px", skewX: "0deg", delay: 0.5});
        }

        TweenLite.to(cur.$navBg, 0.5, {height: "60px", delay: 1});
        TweenLite.to(cur.$logoIcon, 0.5, {left: "0", delay: 1.5});
        TweenLite.to(cur.$container, 0.5, {left: "0", delay: 0.5});
    }
    p.initNavContainer = function () {
        var cur = this;
        this.$logoIcon.click(function () {
            cur.hideNavContainer();
        });
        this.$logoIcon.delay(2000).triggerHandler("click");
        this.$navBg.click(function () {
            cur.showNavContainer();
        });
    };
    ws.Frame = Frame;
})();