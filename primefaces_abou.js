(function(d) {
    if (d.PrimeFaces) {
        d.PrimeFaces.debug("PrimeFaces merged 202110181054 already loaded, ignoring duplicate execution.");
        return
    }
    var c = {
        escapeClientId: function(a) {
            return "#" + a.replace(/:/g, "\\:")
        },
        cleanWatermarks: function() {
            $.watermark.hideAll()
        },
        showWatermarks: function() {
            $.watermark.showAll()
        },
        getWidgetById: function(a) {
            for (var b in c.widgets) {
                var f = c.widgets[b];
                if (f && f.id === a) {
                    return f
                }
            }
            return null
        },
        addSubmitParam: function(g, a) {
            var b = $(this.escapeClientId(g));
            for (var h in a) {
                b.append('<input type="hidden" name="' + h + '" value="' + a[h] + '" class="ui-submit-param"/>')
            }
            return this
        },
        submit: function(a, b) {
            var f = $(this.escapeClientId(a));
            if (b) {
                f.attr("target", b)
            }
            f.submit().children("input.ui-submit-param").remove()
        },
        attachBehaviors: function(a, b) {
            $.each(b, function(g, h) {
                a.bind(g, function(e) {
                    h.call(a, e)
                })
            })
        },
        getCookie: function(a) {
            return $.cookie(a)
        },
        setCookie: function(b, a, f) {
            $.cookie(b, a, f)
        },
        deleteCookie: function(a, b) {
            $.removeCookie(a, b)
        },
        cookiesEnabled: function() {
            var a = (navigator.cookieEnabled) ? true : false;
            if (typeof navigator.cookieEnabled === "undefined" && !a) {
                document.cookie = "testcookie";
                a = (document.cookie.indexOf("testcookie") !== -1) ? true : false
            }
            return (a)
        },
        skinInput: function(a) {
            a.hover(function() {
                $(this).addClass("ui-state-hover")
            }, function() {
                $(this).removeClass("ui-state-hover")
            }).focus(function() {
                $(this).addClass("ui-state-focus")
            }).blur(function() {
                $(this).removeClass("ui-state-focus")
            });
            a.attr("role", "textbox").attr("aria-disabled", a.is(":disabled")).attr("aria-readonly", a.prop("readonly"));
            if (a.is("textarea")) {
                a.attr("aria-multiline", true)
            }
            return this
        },
        skinButton: function(b) {
            b.mouseover(function() {
                var f = $(this);
                if (!b.prop("disabled")) {
                    f.addClass("ui-state-hover")
                }
            }).mouseout(function() {
                $(this).removeClass("ui-state-active ui-state-hover")
            }).mousedown(function() {
                var f = $(this);
                if (!b.prop("disabled")) {
                    f.addClass("ui-state-active").removeClass("ui-state-hover")
                }
            }).mouseup(function() {
                $(this).removeClass("ui-state-active").addClass("ui-state-hover")
            }).focus(function() {
                $(this).addClass("ui-state-focus")
            }).blur(function() {
                $(this).removeClass("ui-state-focus ui-state-active")
            }).keydown(function(e) {
                if (e.keyCode === $.ui.keyCode.SPACE || e.keyCode === $.ui.keyCode.ENTER || e.keyCode === $.ui.keyCode.NUMPAD_ENTER) {
                    $(this).addClass("ui-state-active")
                }
            }).keyup(function() {
                $(this).removeClass("ui-state-active")
            });
            var a = b.attr("role");
            if (!a) {
                b.attr("role", "button")
            }
            b.attr("aria-disabled", b.prop("disabled"));
            return this
        },
        skinSelect: function(a) {
            a.mouseover(function() {
                var b = $(this);
                if (!b.hasClass("ui-state-focus")) {
                    b.addClass("ui-state-hover")
                }
            }).mouseout(function() {
                $(this).removeClass("ui-state-hover")
            }).focus(function() {
                $(this).addClass("ui-state-focus").removeClass("ui-state-hover")
            }).blur(function() {
                $(this).removeClass("ui-state-focus ui-state-hover")
            });
            return this
        },
        isIE: function(a) {
            return c.env.isIE(a)
        },
        info: function(a) {
            if (this.logger) {
                this.logger.info(a)
            }
        },
        debug: function(a) {
            if (this.logger) {
                this.logger.debug(a)
            }
        },
        warn: function(a) {
            if (this.logger) {
                this.logger.warn(a)
            }
            if (c.isDevelopmentProjectStage() && d.console) {
                console.log(a)
            }
        },
        error: function(a) {
            if (this.logger) {
                this.logger.error(a)
            }
            if (c.isDevelopmentProjectStage() && d.console) {
                console.log(a)
            }
        },
        isDevelopmentProjectStage: function() {
            return c.settings.projectStage === "Development"
        },
        setCaretToEnd: function(b) {
            if (b) {
                b.focus();
                var a = b.value.length;
                if (a > 0) {
                    if (b.setSelectionRange) {
                        b.setSelectionRange(0, a)
                    } else {
                        if (b.createTextRange) {
                            var f = b.createTextRange();
                            f.collapse(true);
                            f.moveEnd("character", 1);
                            f.moveStart("character", 1);
                            f.select()
                        }
                    }
                }
            }
        },
        changeTheme: function(b) {
            if (b && b !== "") {
                var a = $('link[href*="javax.faces.resource/theme.css"]');
                if (a.length === 0) {
                    a = $('link[href*="javax.faces.resource=theme.css"]')
                }
                var i = a.attr("href")
                  , j = i.split("&")[0]
                  , k = j.split("ln=")[1]
                  , l = i.replace(k, "primefaces-" + b);
                a.attr("href", l)
            }
        },
        escapeRegExp: function(a) {
            return this.escapeHTML(a.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"))
        },
        escapeHTML: function(a) {
            return a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        },
        clearSelection: function() {
            if (d.getSelection) {
                if (d.getSelection().empty) {
                    d.getSelection().empty()
                } else {
                    if (d.getSelection().removeAllRanges) {
                        d.getSelection().removeAllRanges()
                    }
                }
            } else {
                if (document.selection && document.selection.empty) {
                    try {
                        document.selection.empty()
                    } catch (a) {}
                }
            }
        },
        getSelection: function() {
            var a = "";
            if (d.getSelection) {
                a = d.getSelection()
            } else {
                if (document.getSelection) {
                    a = document.getSelection()
                } else {
                    if (document.selection) {
                        a = document.selection.createRange().text
                    }
                }
            }
            return a
        },
        hasSelection: function() {
            return this.getSelection().length > 0
        },
        cw: function(h, a, g, b) {
            this.createWidget(h, a, g, b)
        },
        createWidget: function(p, a, n, k) {
            n.widgetVar = a;
            if (this.widget[p]) {
                var l = this.widgets[a];
                if (l && (l.constructor === this.widget[p])) {
                    l.refresh(n)
                } else {
                    this.widgets[a] = new this.widget[p](n);
                    if (this.settings.legacyWidgetNamespace) {
                        d[a] = this.widgets[a]
                    }
                }
            } else {
                var m = this.getFacesResource(k + "/" + k + ".js", "primefaces");
                var b = this.getFacesResource(k + "/" + k + ".css", "primefaces");
                var o = '<link type="text/css" rel="stylesheet" href="' + b + '" />';
                $("head").append(o);
                this.getScript(m, function() {
                    setTimeout(function() {
                        c.widgets[a] = new c.widget[p](n)
                    }, 100)
                })
            }
        },
        getFacesResource: function(i, j, l) {
            var k = $('script[src*="/javax.faces.resource/' + c.getCoreScriptName() + '"]').attr("src");
            if (!k) {
                k = $('script[src*="javax.faces.resource=' + c.getCoreScriptName() + '"]').attr("src")
            }
            k = k.replace(c.getCoreScriptName(), i);
            k = k.replace("ln=primefaces", "ln=" + j);
            if (l) {
                var a = new RegExp("[?&]v=([^&]*)").exec(k)[1];
                k = k.replace("v=" + a, "v=" + l)
            }
            var b = d.location.protocol + "//" + d.location.host;
            return k.indexOf(b) >= 0 ? k : b + k
        },
        getCoreScriptName: function() {
            return "primefaces.js"
        },
        inArray: function(f, a) {
            for (var b = 0; b < f.length; b++) {
                if (f[b] === a) {
                    return true
                }
            }
            return false
        },
        isNumber: function(a) {
            return typeof a === "number" && isFinite(a)
        },
        getScript: function(b, a) {
            $.ajax({
                type: "GET",
                url: b,
                success: a,
                dataType: "script",
                cache: true
            })
        },
        focus: function(a, b) {
            var f = ":not(:submit):not(:button):input:visible:enabled[name]";
            setTimeout(function() {
                if (a) {
                    var e = $(c.escapeClientId(a));
                    if (e.is(f)) {
                        e.focus()
                    } else {
                        e.find(f).eq(0).focus()
                    }
                } else {
                    if (b) {
                        $(c.escapeClientId(b)).find(f).eq(0).focus()
                    } else {
                        var j = $(f)
                          , k = j.eq(0);
                        if (k.is(":radio")) {
                            var l = $(':radio[name="' + k.attr("name") + '"]').filter(":checked");
                            if (l.length) {
                                l.focus()
                            } else {
                                k.focus()
                            }
                        } else {
                            k.focus()
                        }
                    }
                }
            }, 50);
            c.customFocus = true
        },
        monitorDownload: function(a, b) {
            if (this.cookiesEnabled()) {
                if (a) {
                    a()
                }
                d.downloadMonitor = setInterval(function() {
                    var f = c.getCookie("primefaces.download");
                    if (f === "true") {
                        if (b) {
                            b()
                        }
                        clearInterval(d.downloadMonitor);
                        c.setCookie("primefaces.download", null)
                    }
                }, 250)
            }
        },
        scrollTo: function(a) {
            var b = $(c.escapeClientId(a)).offset();
            $("html,body").animate({
                scrollTop: b.top,
                scrollLeft: b.left
            }, {
                easing: "easeInCirc"
            }, 1000)
        },
        scrollInView: function(o, l) {
            if (l.length === 0) {
                return
            }
            var a = parseFloat(o.css("borderTopWidth")) || 0
              , m = parseFloat(o.css("paddingTop")) || 0
              , k = l.offset().top - o.offset().top - a - m
              , p = o.scrollTop()
              , n = o.height()
              , b = l.outerHeight(true);
            if (k < 0) {
                o.scrollTop(p + k)
            } else {
                if ((k + b) > n) {
                    o.scrollTop(p + k - n + b)
                }
            }
        },
        calculateScrollbarWidth: function() {
            if (!this.scrollbarWidth) {
                if (c.env.browser.msie) {
                    var a = $('<textarea cols="10" rows="2"></textarea>').css({
                        position: "absolute",
                        top: -1000,
                        left: -1000
                    }).appendTo("body")
                      , b = $('<textarea cols="10" rows="2" style="overflow: hidden;"></textarea>').css({
                        position: "absolute",
                        top: -1000,
                        left: -1000
                    }).appendTo("body");
                    this.scrollbarWidth = a.width() - b.width();
                    a.add(b).remove()
                } else {
                    var f = $("<div />").css({
                        width: 100,
                        height: 100,
                        overflow: "auto",
                        position: "absolute",
                        top: -1000,
                        left: -1000
                    }).prependTo("body").append("<div />").find("div").css({
                        width: "100%",
                        height: 200
                    });
                    this.scrollbarWidth = 100 - f.width();
                    f.parent().remove()
                }
            }
            return this.scrollbarWidth
        },
        resolveUserAgent: function(b) {
            if ($.browser) {
                this.browser = $.browser
            } else {
                b = b.toLowerCase();
                var g = /(chrome)[ \/]([\w.]+)/.exec(b) || /(webkit)[ \/]([\w.]+)/.exec(b) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(b) || /(msie) ([\w.]+)/.exec(b) || b.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(b) || []
                  , a = {
                    browser: g[1] || "",
                    version: g[2] || "0"
                }
                  , h = {};
                if (a.browser) {
                    h[a.browser] = true;
                    h.version = a.version
                }
                if (h.chrome) {
                    h.webkit = true
                } else {
                    if (h.webkit) {
                        h.safari = true
                    }
                }
                this.browser = h
            }
        },
        bcn: function(i, h, a) {
            if (a) {
                for (var j = 0; j < a.length; j++) {
                    var b = a[j].call(i, h);
                    if (b === false) {
                        if (h.preventDefault) {
                            h.preventDefault()
                        } else {
                            h.returnValue = false
                        }
                        break
                    }
                }
            }
        },
        bcnu: function(h, b, i) {
            if (i) {
                for (var j = 0; j < i.length; j++) {
                    var a = i[j].call(h, b);
                    if (a === false) {
                        break
                    }
                }
            }
        },
        openDialog: function(a) {
            c.dialog.DialogHandler.openDialog(a)
        },
        closeDialog: function(a) {
            c.dialog.DialogHandler.closeDialog(a)
        },
        showMessageInDialog: function(a) {
            c.dialog.DialogHandler.showMessageInDialog(a)
        },
        confirm: function(a) {
            c.dialog.DialogHandler.confirm(a)
        },
        deferredRenders: [],
        addDeferredRender: function(a, f, b) {
            this.deferredRenders.push({
                widget: a,
                container: f,
                callback: b
            })
        },
        removeDeferredRenders: function(a) {
            for (var b = (this.deferredRenders.length - 1); b >= 0; b--) {
                var f = this.deferredRenders[b];
                if (f.widget === a) {
                    this.deferredRenders.splice(b, 1)
                }
            }
        },
        invokeDeferredRenders: function(l) {
            var b = [];
            for (var i = 0; i < this.deferredRenders.length; i++) {
                var k = this.deferredRenders[i];
                if (k.container === l) {
                    var a = k.callback.call();
                    if (a) {
                        b.push(k.widget)
                    }
                }
            }
            for (var j = 0; j < b.length; j++) {
                this.removeDeferredRenders(b[j])
            }
        },
        getLocaleSettings: function() {
            if (!this.localeSettings) {
                var a = (c.settings.locale != undefined) ? c.settings.locale : "en_US";
                this.localeSettings = c.locales[a];
                if (!this.localeSettings && (a != undefined)) {
                    this.localeSettings = c.locales[a.split("_")[0]];
                    if (!this.localeSettings) {
                        this.localeSettings = c.locales.en_US
                    }
                }
            }
            return this.localeSettings
        },
        getAriaLabel: function(e) {
            try {
                var f = this.getLocaleSettings()["aria"];
                if (f === undefined) {
                    return this.faultBackAria(e)
                } else {
                    var a = (f && f[e]) ? f[e] : c.locales.en_US.aria[e];
                    if (a === undefined) {
                        return this.faultBackAria(e)
                    } else {
                        return a
                    }
                }
            } catch (b) {
                return this.faultBackAria(e)
            }
        },
        faultBackAria: function(a) {
            var b = {
                "paginator.PAGE": "Page {0}",
                "calendar.BUTTON": "Show Calendar",
                "datatable.sort.ASC": "activate to sort column ascending",
                "datatable.sort.DESC": "activate to sort column descending",
                "columntoggler.CLOSE": "Close"
            };
            return b[a]
        },
        zindex: 1000,
        customFocus: false,
        detachedWidgets: [],
        PARTIAL_REQUEST_PARAM: "javax.faces.partial.ajax",
        PARTIAL_UPDATE_PARAM: "javax.faces.partial.render",
        PARTIAL_PROCESS_PARAM: "javax.faces.partial.execute",
        PARTIAL_SOURCE_PARAM: "javax.faces.source",
        BEHAVIOR_EVENT_PARAM: "javax.faces.behavior.event",
        PARTIAL_EVENT_PARAM: "javax.faces.partial.event",
        RESET_VALUES_PARAM: "primefaces.resetvalues",
        IGNORE_AUTO_UPDATE_PARAM: "primefaces.ignoreautoupdate",
        SKIP_CHILDREN_PARAM: "primefaces.skipchildren",
        VIEW_STATE: "javax.faces.ViewState",
        CLIENT_WINDOW: "javax.faces.ClientWindow",
        VIEW_ROOT: "javax.faces.ViewRoot",
        CLIENT_ID_DATA: "primefaces.clientid"
    };
    c.settings = {};
    c.util = {};
    c.widgets = {};
    c.locales = {
        en_US: {
            closeText: "Close",
            prevText: "Previous",
            nextText: "Next",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["S", "M", "T", "W ", "T", "F ", "S"],
            weekHeader: "Week",
            firstDay: 0,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: "",
            timeOnlyTitle: "Only Time",
            timeText: "Time",
            hourText: "Hour",
            minuteText: "Minute",
            secondText: "Second",
            currentText: "Current Date",
            ampm: false,
            month: "Month",
            week: "Week",
            day: "Day",
            allDayText: "All Day",
            aria: {
                "paginator.PAGE": "Page {0}",
                "calendar.BUTTON": "Show Calendar",
                "datatable.sort.ASC": "activate to sort column ascending",
                "datatable.sort.DESC": "activate to sort column descending",
                "columntoggler.CLOSE": "Close"
            }
        }
    };
    c.locales.en = c.locales.en_US;
    PF = function(a) {
        var b = c.widgets[a];
        if (!b) {
            if (d.console && console.log) {
                console.log("Widget for var '" + a + "' not available!")
            }
            c.error("Widget for var '" + a + "' not available!")
        }
        return b
    }
    ;
    c.resolveUserAgent(navigator.userAgent);
    d.PrimeFaces = c
}
)(window);
PrimeFaces.env = {
    mobile: false,
    touch: false,
    ios: false,
    browser: null,
    init: function() {
        this.mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);
        this.touch = "ontouchstart"in window || window.navigator.msMaxTouchPoints || PrimeFaces.env.mobile;
        this.ios = /iPhone|iPad|iPod/i.test(window.navigator.userAgent);
        this.resolveUserAgent()
    },
    resolveUserAgent: function() {
        if ($.browser) {
            this.browser = $.browser
        } else {
            var g, i;
            jQuery.uaMatch = function(a) {
                a = a.toLowerCase();
                var b = /(opr)[\/]([\w.]+)/.exec(a) || /(chrome)[ \/]([\w.]+)/.exec(a) || /(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || a.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(a) || a.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || [];
                var c = /(ipad)/.exec(a) || /(iphone)/.exec(a) || /(android)/.exec(a) || /(windows phone)/.exec(a) || /(win)/.exec(a) || /(mac)/.exec(a) || /(linux)/.exec(a) || /(cros)/i.exec(a) || [];
                return {
                    browser: b[3] || b[1] || "",
                    version: b[2] || "0",
                    platform: c[0] || ""
                }
            }
            ;
            g = jQuery.uaMatch(window.navigator.userAgent);
            i = {};
            if (g.browser) {
                i[g.browser] = true;
                i.version = g.version;
                i.versionNumber = parseInt(g.version)
            }
            if (g.platform) {
                i[g.platform] = true
            }
            if (i.android || i.ipad || i.iphone || i["windows phone"]) {
                i.mobile = true
            }
            if (i.cros || i.mac || i.linux || i.win) {
                i.desktop = true
            }
            if (i.chrome || i.opr || i.safari) {
                i.webkit = true
            }
            if (i.rv) {
                var h = "msie";
                g.browser = h;
                i[h] = true
            }
            if (i.opr) {
                var j = "opera";
                g.browser = j;
                i[j] = true
            }
            if (i.safari && i.android) {
                var f = "android";
                g.browser = f;
                i[f] = true
            }
            i.name = g.browser;
            i.platform = g.platform;
            this.browser = i;
            $.browser = i
        }
    },
    isIE: function(b) {
        return (b === undefined) ? this.browser.msie : (this.browser.msie && parseInt(this.browser.version, 10) === b)
    },
    isLtIE: function(b) {
        return (this.browser.msie) ? parseInt(this.browser.version, 10) < b : false
    },
    isCanvasSupported: function() {
        var b = document.createElement("canvas");
        return !!(b.getContext && b.getContext("2d"))
    }
};
PrimeFaces.env.init();
PrimeFaces.AB_MAPPING = {
    s: "source",
    f: "formId",
    p: "process",
    u: "update",
    e: "event",
    a: "async",
    g: "global",
    d: "delay",
    t: "timeout",
    sc: "skipChildren",
    iau: "ignoreAutoUpdate",
    ps: "partialSubmit",
    psf: "partialSubmitFilter",
    rv: "resetValues",
    fi: "fragmentId",
    fu: "fragmentUpdate",
    pa: "params",
    onst: "onstart",
    oner: "onerror",
    onsu: "onsuccess",
    onco: "oncomplete"
};
PrimeFaces.ab = function(e, f) {
    for (var d in e) {
        if (!e.hasOwnProperty(d)) {
            continue
        }
        if (this.AB_MAPPING[d]) {
            e[this.AB_MAPPING[d]] = e[d];
            delete e[d]
        }
    }
    PrimeFaces.ajax.Request.handle(e, f)
}
;
PrimeFaces.ajax = {
    VIEW_HEAD: "javax.faces.ViewHead",
    VIEW_BODY: "javax.faces.ViewBody",
    Utils: {
        getContent: function(f) {
            var d = "";
            for (var e = 0; e < f.childNodes.length; e++) {
                d += f.childNodes[e].nodeValue
            }
            return d
        },
        updateFormStateInput: function(r, l, k) {
            var n = $.trim(l);
            var s = null;
            if (k && k.pfSettings && k.pfSettings.portletForms) {
                s = $(k.pfSettings.portletForms)
            } else {
                s = $("form")
            }
            var i = "";
            if (k && k.pfArgs && k.pfArgs.parameterNamespace) {
                i = k.pfArgs.parameterNamespace
            }
            for (var o = 0; o < s.length; o++) {
                var q = s.eq(o);
                if (q.attr("method") === "post") {
                    var m = q.children("input[name='" + i + r + "']");
                    if (m.length > 0) {
                        m.val(n)
                    } else {
                        q.append('<input type="hidden" name="' + i + r + '" value="' + n + '" autocomplete="off" />')
                    }
                    var p = q.children("input[id='" + r + "']");
                    if (p.length > 0) {
                        p.val(n)
                    }
                }
            }
        },
        updateElement: function(i, l, j) {
            if (i.indexOf(PrimeFaces.VIEW_STATE) !== -1) {
                PrimeFaces.ajax.Utils.updateFormStateInput(PrimeFaces.VIEW_STATE, l, j)
            } else {
                if (i.indexOf(PrimeFaces.CLIENT_WINDOW) !== -1) {
                    PrimeFaces.ajax.Utils.updateFormStateInput(PrimeFaces.CLIENT_WINDOW, l, j)
                } else {
                    if (i === PrimeFaces.VIEW_ROOT) {
                        window.PrimeFaces = null;
                        var g = $.ajaxSetup()["cache"];
                        $.ajaxSetup()["cache"] = true;
                        $("head").html(l.substring(l.indexOf("<head>") + 6, l.lastIndexOf("</head>")));
                        $.ajaxSetup()["cache"] = g;
                        var k = new RegExp("<body[^>]*>","gi").exec(l)[0];
                        var h = l.indexOf(k) + k.length;
                        $("body").html(l.substring(h, l.lastIndexOf("</body>")))
                    } else {
                        if (i === PrimeFaces.ajax.VIEW_HEAD) {
                            window.PrimeFaces = null;
                            var g = $.ajaxSetup()["cache"];
                            $.ajaxSetup()["cache"] = true;
                            $("head").html(l.substring(l.indexOf("<head>") + 6, l.lastIndexOf("</head>")));
                            $.ajaxSetup()["cache"] = g
                        } else {
                            if (i === PrimeFaces.ajax.VIEW_BODY) {
                                var k = new RegExp("<body[^>]*>","gi").exec(l)[0];
                                var h = l.indexOf(k) + k.length;
                                $("body").html(l.substring(h, l.lastIndexOf("</body>")))
                            } else {
                                $(PrimeFaces.escapeClientId(i)).replaceWith(l)
                            }
                        }
                    }
                }
            }
        }
    },
    Queue: {
        delays: {},
        requests: new Array(),
        xhrs: new Array(),
        offer: function(f) {
            if (f.delay) {
                var e = null
                  , g = this
                  , e = (typeof (f.source) === "string") ? f.source : $(f.source).attr("id")
                  , h = function() {
                    return setTimeout(function() {
                        g.requests.push(f);
                        if (g.requests.length === 1) {
                            PrimeFaces.ajax.Request.send(f)
                        }
                    }, f.delay)
                };
                if (this.delays[e]) {
                    clearTimeout(this.delays[e].timeout);
                    this.delays[e].timeout = h()
                } else {
                    this.delays[e] = {
                        timeout: h()
                    }
                }
            } else {
                this.requests.push(f);
                if (this.requests.length === 1) {
                    PrimeFaces.ajax.Request.send(f)
                }
            }
        },
        poll: function() {
            if (this.isEmpty()) {
                return null
            }
            var c = this.requests.shift()
              , d = this.peek();
            if (d) {
                PrimeFaces.ajax.Request.send(d)
            }
            return c
        },
        peek: function() {
            if (this.isEmpty()) {
                return null
            }
            return this.requests[0]
        },
        isEmpty: function() {
            return this.requests.length === 0
        },
        addXHR: function(b) {
            this.xhrs.push(b)
        },
        removeXHR: function(c) {
            var d = $.inArray(c, this.xhrs);
            if (d > -1) {
                this.xhrs.splice(d, 1)
            }
        },
        abortAll: function() {
            for (var b = 0; b < this.xhrs.length; b++) {
                this.xhrs[b].abort()
            }
            this.xhrs = new Array();
            this.requests = new Array()
        }
    },
    Request: {
        handle: function(d, c) {
            d.ext = c;
            if (d.async) {
                PrimeFaces.ajax.Request.send(d)
            } else {
                PrimeFaces.ajax.Queue.offer(d)
            }
        },
        send: function(P) {
            PrimeFaces.debug("Initiating ajax request.");
            PrimeFaces.customFocus = false;
            var G = (P.global === true || P.global === undefined) ? true : false
              , T = null
              , O = null;
            if (P.onstart) {
                var y = P.onstart.call(this, P);
                if (y === false) {
                    PrimeFaces.debug("Ajax request cancelled by onstart callback.");
                    if (!P.async) {
                        PrimeFaces.ajax.Queue.poll()
                    }
                    return false
                }
            }
            if (P.ext && P.ext.onstart) {
                P.ext.onstart.call(this, P)
            }
            if (G) {
                $(document).trigger("pfAjaxStart")
            }
            if (typeof (P.source) === "string") {
                O = P.source
            } else {
                O = $(P.source).attr("id")
            }
            if (P.formId) {
                T = PrimeFaces.expressions.SearchExpressionFacade.resolveComponentsAsSelector(P.formId)
            } else {
                T = $(PrimeFaces.escapeClientId(O)).closest("form");
                if (T.length === 0) {
                    T = $("form").eq(0)
                }
            }
            try {
                var S = $(T[0]).attr("id").split(":")[0].replaceAll(":", "\\:") + "javax.faces.ViewState";
                if (S != undefined) {
                    var M = $(T[0]).children('input[name="' + S + '"]');
                    if (M != undefined && M.val() != undefined) {
                        var F = $(T[0]).children('input[name="javax.faces.ViewState"]').val();
                        var D = M.val();
                        if (F != D) {
                            M.val(F)
                        }
                    }
                }
            } catch (i) {}
            PrimeFaces.debug("Form to post " + T.attr("id") + ".");
            var x = T.attr("action")
              , z = T.children("input[name*='javax.faces.encodedURL']")
              , N = [];
            var H = null;
            if (z.length > 0) {
                H = 'form[action="' + x + '"]';
                x = z.val()
            }
            PrimeFaces.debug("URL to post " + x + ".");
            var I = PrimeFaces.ajax.Request.extractParameterNamespace(T);
            PrimeFaces.ajax.Request.addParam(N, PrimeFaces.PARTIAL_REQUEST_PARAM, true, I);
            PrimeFaces.ajax.Request.addParam(N, PrimeFaces.PARTIAL_SOURCE_PARAM, O, I);
            if (P.resetValues) {
                PrimeFaces.ajax.Request.addParam(N, PrimeFaces.RESET_VALUES_PARAM, true, I)
            }
            if (P.ignoreAutoUpdate) {
                PrimeFaces.ajax.Request.addParam(N, PrimeFaces.IGNORE_AUTO_UPDATE_PARAM, true, I)
            }
            if (P.skipChildren === false) {
                PrimeFaces.ajax.Request.addParam(N, PrimeFaces.SKIP_CHILDREN_PARAM, false, I)
            }
            var A = PrimeFaces.ajax.Request.resolveComponentsForAjaxCall(P, "process");
            if (P.fragmentId) {
                A.push(P.fragmentId)
            }
            var U = A.length > 0 ? A.join(" ") : "@all";
            if (U !== "@none") {
                PrimeFaces.ajax.Request.addParam(N, PrimeFaces.PARTIAL_PROCESS_PARAM, U, I)
            }
            var Q = PrimeFaces.ajax.Request.resolveComponentsForAjaxCall(P, "update");
            if (P.fragmentId && P.fragmentUpdate) {
                Q.push(P.fragmentId)
            }
            if (Q.length > 0) {
                PrimeFaces.ajax.Request.addParam(N, PrimeFaces.PARTIAL_UPDATE_PARAM, Q.join(" "), I)
            }
            if (P.event) {
                PrimeFaces.ajax.Request.addParam(N, PrimeFaces.BEHAVIOR_EVENT_PARAM, P.event, I);
                var J = P.event;
                if (P.event === "valueChange") {
                    J = "change"
                } else {
                    if (P.event === "action") {
                        J = "click"
                    }
                }
                PrimeFaces.ajax.Request.addParam(N, PrimeFaces.PARTIAL_EVENT_PARAM, J, I)
            } else {
                PrimeFaces.ajax.Request.addParam(N, O, O, I)
            }
            if (P.params) {
                PrimeFaces.ajax.Request.addParams(N, P.params, I)
            }
            if (P.ext && P.ext.params) {
                PrimeFaces.ajax.Request.addParams(N, P.ext.params, I)
            }
            if (P.partialSubmit && U.indexOf("@all") === -1) {
                var E = false
                  , L = P.partialSubmitFilter || ":input";
                if (U.indexOf("@none") === -1) {
                    for (var C = 0; C < A.length; C++) {
                        var K = $(PrimeFaces.escapeClientId(A[C]));
                        var w = null;
                        if (K.is("form")) {
                            w = K.serializeArray();
                            E = true
                        } else {
                            if (K.is(":input")) {
                                w = K.serializeArray()
                            } else {
                                w = K.find(L).serializeArray()
                            }
                        }
                        $.merge(N, w)
                    }
                }
                if (!E) {
                    PrimeFaces.ajax.Request.addParamFromInput(N, PrimeFaces.VIEW_STATE, T, I);
                    PrimeFaces.ajax.Request.addParamFromInput(N, PrimeFaces.CLIENT_WINDOW, T, I);
                    PrimeFaces.ajax.Request.addParamFromInput(N, "dsPostWindowId", T, I);
                    PrimeFaces.ajax.Request.addParamFromInput(N, "dspwid", T, I)
                }
            } else {
                $.merge(N, T.serializeArray())
            }
            var R = $.param(N);
            PrimeFaces.debug("Post Data:" + R);
            var B = {
                url: x,
                type: "POST",
                cache: false,
                dataType: "xml",
                data: R,
                portletForms: H,
                source: P.source,
                global: false,
                beforeSend: function(a, b) {
                    a.setRequestHeader("Faces-Request", "partial/ajax");
                    a.pfSettings = b;
                    a.pfArgs = {};
                    if (G) {
                        $(document).trigger("pfAjaxSend", [a, this])
                    }
                },
                error: function(a, c, b) {
                    if (P.onerror) {
                        P.onerror.call(this, a, c, b)
                    }
                    if (P.ext && P.ext.onerror) {
                        P.ext.onerror.call(this, a, c, b)
                    }
                    if (G) {
                        $(document).trigger("pfAjaxError", [a, this, b])
                    }
                    PrimeFaces.error("Request return with error:" + c + ".")
                },
                success: function(a, c, d) {
                    PrimeFaces.debug("Response received succesfully.");
                    var b;
                    if (P.onsuccess) {
                        b = P.onsuccess.call(this, a, c, d)
                    }
                    if (P.ext && P.ext.onsuccess && !b) {
                        b = P.ext.onsuccess.call(this, a, c, d)
                    }
                    if (G) {
                        $(document).trigger("pfAjaxSuccess", [d, this])
                    }
                    if (b) {
                        return
                    } else {
                        PrimeFaces.ajax.Response.handle(a, c, d)
                    }
                    PrimeFaces.debug("DOM is updated.")
                },
                complete: function(a, b) {
                    if (P.oncomplete) {
                        P.oncomplete.call(this, a, b, a.pfArgs)
                    }
                    if (P.ext && P.ext.oncomplete) {
                        P.ext.oncomplete.call(this, a, b, a.pfArgs)
                    }
                    if (G) {
                        $(document).trigger("pfAjaxComplete", [a, this])
                    }
                    PrimeFaces.debug("Response completed.");
                    PrimeFaces.ajax.Queue.removeXHR(a);
                    if (!P.async) {
                        PrimeFaces.ajax.Queue.poll()
                    }
                }
            };
            if (P.timeout) {
                B.timeout = P.timeout
            }
            PrimeFaces.ajax.Queue.addXHR($.ajax(B))
        },
        resolveComponentsForAjaxCall: function(e, d) {
            var f = "";
            if (e[d]) {
                f += e[d]
            }
            if (e.ext && e.ext[d]) {
                f += " " + e.ext[d]
            }
            return PrimeFaces.expressions.SearchExpressionFacade.resolveComponents(f)
        },
        addParam: function(g, f, h, e) {
            if (e || !f.indexOf(e) === 0) {
                g.push({
                    name: e + f,
                    value: h
                })
            } else {
                g.push({
                    name: f,
                    value: h
                })
            }
        },
        addParams: function(h, g, j) {
            for (var f = 0; f < g.length; f++) {
                var i = g[f];
                if (j && !i.name.indexOf(j) === 0) {
                    i.name = j + i.name
                }
                h.push(i)
            }
        },
        addParamFromInput: function(i, g, l, j) {
            var h = null;
            if (j) {
                h = l.children("input[name*='" + g + "']")
            } else {
                h = l.children("input[name='" + g + "']")
            }
            if (h && h.length > 0) {
                var k = h.val();
                PrimeFaces.ajax.Request.addParam(i, g, k, j)
            }
        },
        extractParameterNamespace: function(f) {
            var e = f.children("input[name*='" + PrimeFaces.VIEW_STATE + "']");
            if (e && e.length > 0) {
                var d = e[0].name;
                if (d.length > PrimeFaces.VIEW_STATE.length) {
                    return d.substring(0, d.indexOf(PrimeFaces.VIEW_STATE))
                }
            }
            return null
        }
    },
    Response: {
        handle: function(r, u, j, x) {
            try {
                var i = r.getElementsByTagName("partial-response")[0]
            } catch (q) {
                console.log("Pf null entity, skipped");
                return
            }
            for (var s = 0; s < i.childNodes.length; s++) {
                var y = i.childNodes[s];
                switch (y.nodeName) {
                case "redirect":
                    PrimeFaces.ajax.ResponseProcessor.doRedirect(y);
                    break;
                case "changes":
                    var w = $(document.activeElement);
                    var p = w.attr("id");
                    var t;
                    if (w.length > 0 && w.is("input") && $.isFunction($.fn.getSelection)) {
                        t = w.getSelection()
                    }
                    for (var v = 0; v < y.childNodes.length; v++) {
                        var o = y.childNodes[v];
                        switch (o.nodeName) {
                        case "update":
                            PrimeFaces.ajax.ResponseProcessor.doUpdate(o, j, x);
                            break;
                        case "delete":
                            PrimeFaces.ajax.ResponseProcessor.doDelete(o);
                            break;
                        case "insert":
                            PrimeFaces.ajax.ResponseProcessor.doInsert(o);
                            break;
                        case "attributes":
                            PrimeFaces.ajax.ResponseProcessor.doAttributes(o);
                            break;
                        case "eval":
                            PrimeFaces.ajax.ResponseProcessor.doEval(o);
                            break;
                        case "extension":
                            PrimeFaces.ajax.ResponseProcessor.doExtension(o, j);
                            break;
                        case "redirect":
                            PrimeFaces.ajax.ResponseProcessor.doRedirect(o);
                            break
                        }
                    }
                    PrimeFaces.ajax.Response.handleReFocus(p, t);
                    PrimeFaces.ajax.Response.destroyDetachedWidgets();
                    break;
                case "eval":
                    PrimeFaces.ajax.ResponseProcessor.doEval(y);
                    break;
                case "extension":
                    PrimeFaces.ajax.ResponseProcessor.doExtension(y, j);
                    break;
                case "error":
                    PrimeFaces.ajax.ResponseProcessor.doError(y, j);
                    break
                }
            }
        },
        handleReFocus: function(g, e) {
            if (PrimeFaces.customFocus === false && g && g !== $(document.activeElement).attr("id")) {
                var h = $(PrimeFaces.escapeClientId(g));
                var f = function() {
                    h.focus();
                    if (e && e.start) {
                        h.setSelection(e.start, e.end)
                    }
                };
                if (h.length) {
                    f();
                    setTimeout(function() {
                        if (!h.is(":focus")) {
                            f()
                        }
                    }, 50)
                }
            }
            PrimeFaces.customFocus = false
        },
        destroyDetachedWidgets: function() {
            for (var f = 0; f < PrimeFaces.detachedWidgets.length; f++) {
                var g = PrimeFaces.detachedWidgets[f];
                var e = PF(g);
                if (e) {
                    if (e.isDetached()) {
                        PrimeFaces.widgets[g] = null;
                        e.destroy();
                        try {
                            delete e
                        } catch (h) {}
                    }
                }
            }
            PrimeFaces.detachedWidgets = []
        }
    },
    ResponseProcessor: {
        doRedirect: function(b) {
            window.location = b.getAttribute("url")
        },
        doUpdate: function(j, i, g) {
            var h = j.getAttribute("id")
              , f = PrimeFaces.ajax.Utils.getContent(j);
            if (g && g.widget && g.widget.id === h) {
                g.handle.call(g.widget, f)
            } else {
                PrimeFaces.ajax.Utils.updateElement(h, f, i)
            }
        },
        doEval: function(c) {
            var d = c.textContent || c.innerText || c.text;
            $.globalEval(d)
        },
        doExtension: function(i, h) {
            if (h) {
                if (i.getAttribute("ln") === "primefaces" && i.getAttribute("type") === "args") {
                    var j = i.textContent || i.innerText || i.text;
                    if (h.pfArgs) {
                        var f = $.parseJSON(j);
                        for (var g in f) {
                            h.pfArgs[g] = f[g]
                        }
                    } else {
                        h.pfArgs = $.parseJSON(j)
                    }
                }
            }
        },
        doError: function(d, c) {},
        doDelete: function(d) {
            var c = d.getAttribute("id");
            $(PrimeFaces.escapeClientId(c)).remove()
        },
        doInsert: function(k) {
            if (!k.childNodes) {
                return false
            }
            for (var g = 0; g < k.childNodes.length; g++) {
                var h = k.childNodes[g];
                var i = h.getAttribute("id");
                var j = $(PrimeFaces.escapeClientId(i));
                var l = PrimeFaces.ajax.Utils.getContent(h);
                if (h.nodeName === "after") {
                    $(l).insertAfter(j)
                } else {
                    if (h.nodeName === "before") {
                        $(l).insertBefore(j)
                    }
                }
            }
        },
        doAttributes: function(n) {
            if (!n.childNodes) {
                return false
            }
            var j = n.getAttribute("id");
            var k = $(PrimeFaces.escapeClientId(j));
            for (var h = 0; h < n.childNodes.length; h++) {
                var m = n.childNodes[h];
                var i = m.getAttribute("name");
                var l = m.getAttribute("value");
                if (!i) {
                    return
                }
                if (!l || l === null) {
                    l = ""
                }
                k.attr(i, l)
            }
        }
    },
    AjaxRequest: function(d, c) {
        return PrimeFaces.ajax.Request.handle(d, c)
    }
};
PrimeFaces.expressions = {};
PrimeFaces.expressions.SearchExpressionFacade = {
    resolveComponentsAsSelector: function(n) {
        var i = PrimeFaces.expressions.SearchExpressionFacade.splitExpressions(n);
        var l = $();
        if (i) {
            for (var h = 0; h < i.length; ++h) {
                var j = $.trim(i[h]);
                if (j.length > 0) {
                    if (j == "@none" || j == "@all") {
                        continue
                    }
                    if (j.indexOf("@") == -1) {
                        l = l.add($(document.getElementById(j)))
                    } else {
                        if (j.indexOf("@widgetVar(") == 0) {
                            var k = j.substring(11, j.length - 1);
                            var m = PrimeFaces.widgets[k];
                            if (m) {
                                l = l.add($(document.getElementById(m.id)))
                            } else {
                                PrimeFaces.error('Widget for widgetVar "' + k + '" not avaiable')
                            }
                        } else {
                            if (j.indexOf("@(") == 0) {
                                l = l.add($(j.substring(2, j.length - 1)))
                            }
                        }
                    }
                }
            }
        }
        return l
    },
    resolveComponents: function(j) {
        var n = PrimeFaces.expressions.SearchExpressionFacade.splitExpressions(j)
          , t = [];
        if (n) {
            for (var p = 0; p < n.length; ++p) {
                var i = $.trim(n[p]);
                if (i.length > 0) {
                    if (i.indexOf("@") == -1 || i == "@none" || i == "@all") {
                        if (!PrimeFaces.inArray(t, i)) {
                            t.push(i)
                        }
                    } else {
                        if (i.indexOf("@widgetVar(") == 0) {
                            var s = i.substring(11, i.length - 1)
                              , o = PrimeFaces.widgets[s];
                            if (o) {
                                if (!PrimeFaces.inArray(t, o.id)) {
                                    t.push(o.id)
                                }
                            } else {
                                PrimeFaces.error('Widget for widgetVar "' + s + '" not avaiable')
                            }
                        } else {
                            if (i.indexOf("@(") == 0) {
                                var u = $(i.substring(2, i.length - 1));
                                for (var r = 0; r < u.length; r++) {
                                    var q = $(u[r])
                                      , v = q.data(PrimeFaces.CLIENT_ID_DATA) || q.attr("id");
                                    if (!PrimeFaces.inArray(t, v)) {
                                        t.push(v)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return t
    },
    splitExpressions: function(j) {
        if (PrimeFaces.isIE(7)) {
            j = j.split("")
        }
        var k = [];
        var c = "";
        var h = 0;
        for (var l = 0; l < j.length; l++) {
            var i = j[l];
            if (i === "(") {
                h++
            }
            if (i === ")") {
                h--
            }
            if ((i === " " || i === ",") && h === 0) {
                k.push(c);
                c = ""
            } else {
                c += i
            }
        }
        k.push(c);
        return k
    }
};
(function() {
    var d = false
      , c = /xyz/.test(function() {
        xyz
    }) ? /\b_super\b/ : /.*/;
    this.Class = function() {}
    ;
    Class.extend = function(a) {
        var b = this.prototype;
        d = true;
        var h = new this();
        d = false;
        for (var i in a) {
            h[i] = typeof a[i] == "function" && typeof b[i] == "function" && c.test(a[i]) ? (function(f, e) {
                return function() {
                    var g = this._super;
                    this._super = b[f];
                    var l = e.apply(this, arguments);
                    this._super = g;
                    return l
                }
            }
            )(i, a[i]) : a[i]
        }
        function j() {
            if (!d && this.init) {
                this.init.apply(this, arguments)
            }
        }
        j.prototype = h;
        j.prototype.constructor = j;
        j.extend = arguments.callee;
        return j
    }
}
)();
PrimeFaces.widget = {};
PrimeFaces.widget.BaseWidget = Class.extend({
    init: function(d) {
        this.cfg = d;
        this.id = d.id;
        this.jqId = PrimeFaces.escapeClientId(this.id);
        this.jq = $(this.jqId);
        this.widgetVar = d.widgetVar;
        $(this.jqId + "_s").remove();
        if (this.widgetVar) {
            var c = this;
            this.jq.on("remove", function() {
                PrimeFaces.detachedWidgets.push(c.widgetVar)
            })
        }
    },
    refresh: function(b) {
        return this.init(b)
    },
    destroy: function() {
        PrimeFaces.debug("Destroyed detached widget: " + this.widgetVar)
    },
    isDetached: function() {
        return document.getElementById(this.id) === null
    },
    getJQ: function() {
        return this.jq
    },
    removeScriptElement: function(b) {
        $(PrimeFaces.escapeClientId(b) + "_s").remove()
    }
});
PrimeFaces.widget.DeferredWidget = PrimeFaces.widget.BaseWidget.extend({
    renderDeferred: function() {
        if (this.jq.is(":visible")) {
            this._render();
            this.postRender()
        } else {
            var d = this.jq.closest(".ui-hidden-container")
              , c = this;
            if (d.length) {
                this.addDeferredRender(this.id, d, function() {
                    return c.render()
                })
            }
        }
    },
    render: function() {
        if (this.jq.is(":visible")) {
            this._render();
            this.postRender();
            return true
        } else {
            return false
        }
    },
    _render: function() {
        throw "Unsupported Operation"
    },
    postRender: function() {},
    destroy: function() {
        this._super();
        PrimeFaces.removeDeferredRenders(this.id)
    },
    addDeferredRender: function(e, f, g) {
        PrimeFaces.addDeferredRender(e, f.attr("id"), g);
        if (f.is(":hidden")) {
            var h = this.jq.closest(".ui-hidden-container");
            if (h.length) {
                this.addDeferredRender(e, f.parent().closest(".ui-hidden-container"), g)
            }
        }
    }
});
PrimeFaces.dialog = {};
PrimeFaces.dialog.DialogHandler = {
    openDialog: function(p) {
        var n = this.findRootWindow()
          , k = p.sourceComponentId + "_dlg";
        if (n.document.getElementById(k)) {
            return
        }
        var l = p.sourceComponentId.replace(/:/g, "_") + "_dlgwidget"
          , q = $('<div id="' + k + '" class="ui-dialog ui-widget ui-widget-content ui-corner-all ui-shadow ui-hidden-container ui-overlay-hidden" data-pfdlgcid="' + p.pfdlgcid + '" data-widgetvar="' + l + '"></div>').append('<div class="ui-dialog-titlebar ui-widget-header ui-helper-clearfix ui-corner-top"><span id="' + k + '_title" class="ui-dialog-title"></span></div>');
        var o = q.children(".ui-dialog-titlebar");
        if (p.options.closable !== false) {
            o.append('<a class="ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all" href="#" role="button"><span class="ui-icon ui-icon-closethick"></span></a>')
        }
        if (p.options.minimizable) {
            o.append('<a class="ui-dialog-titlebar-icon ui-dialog-titlebar-minimize ui-corner-all" href="#" role="button"><span class="ui-icon ui-icon-minus"></span></a>')
        }
        if (p.options.maximizable) {
            o.append('<a class="ui-dialog-titlebar-icon ui-dialog-titlebar-maximize ui-corner-all" href="#" role="button"><span class="ui-icon ui-icon-extlink"></span></a>')
        }
        q.append('<div class="ui-dialog-content ui-widget-content ui-df-content" style="height: auto;"><iframe style="border:0 none" frameborder="0"/></div>');
        q.appendTo(n.document.body);
        var r = q.find("iframe")
          , s = p.url.indexOf("?") === -1 ? "?" : "&"
          , t = p.url.indexOf("pfdlgcid") === -1 ? p.url + s + "pfdlgcid=" + p.pfdlgcid : p.url
          , m = p.options.contentWidth || 640;
        r.width(m);
        r.on("load", function() {
            var e = $(this)
              , b = e.contents().find("title")
              , f = false;
            if (p.options.headerElement) {
                var g = PrimeFaces.escapeClientId(p.options.headerElement)
                  , c = r.contents().find(g);
                if (c.length) {
                    b = c;
                    f = true
                }
            }
            if (!e.data("initialized")) {
                PrimeFaces.cw.call(n.PrimeFaces, "DynamicDialog", l, {
                    id: k,
                    position: "center",
                    sourceComponentId: p.sourceComponentId,
                    sourceWidgetVar: p.sourceWidgetVar,
                    onHide: function() {
                        var h = this
                          , i = this.content.children("iframe");
                        if (i.get(0).contentWindow.PrimeFaces) {
                            this.destroyIntervalId = setInterval(function() {
                                if (i.get(0).contentWindow.PrimeFaces.ajax.Queue.isEmpty()) {
                                    clearInterval(h.destroyIntervalId);
                                    i.attr("src", "about:blank");
                                    h.jq.remove()
                                }
                            }, 10)
                        } else {
                            i.attr("src", "about:blank");
                            h.jq.remove()
                        }
                        n.PF[l] = undefined
                    },
                    modal: p.options.modal,
                    resizable: p.options.resizable,
                    hasIframe: true,
                    draggable: p.options.draggable,
                    width: p.options.width,
                    height: p.options.height,
                    minimizable: p.options.minimizable,
                    maximizable: p.options.maximizable,
                    headerElement: p.options.headerElement
                })
            }
            var d = n.PF(l).titlebar.children("span.ui-dialog-title");
            if (b.length > 0) {
                if (f) {
                    d.append(b);
                    b.show()
                } else {
                    d.text(b.text())
                }
                r.attr("title", d.text())
            }
            r.data("initialized", true);
            n.PF(l).show();
            var a = null;
            if (p.options.contentHeight) {
                a = p.options.contentHeight
            } else {
                a = e.get(0).contentWindow.document.body.scrollHeight + (PrimeFaces.env.browser.webkit ? 5 : 25)
            }
            e.css("height", a)
        }).attr("src", t)
    },
    closeDialog: function(cfg) {
        var rootWindow = this.findRootWindow()
          , dlgs = $(rootWindow.document.body).children('div.ui-dialog[data-pfdlgcid="' + cfg.pfdlgcid + '"]').not("[data-queuedforremoval]")
          , dlgsLength = dlgs.length
          , dlg = dlgs.eq(dlgsLength - 1)
          , parentDlg = dlgsLength > 1 ? dlgs.eq(dlgsLength - 2) : null
          , dlgWidget = rootWindow.PF(dlg.data("widgetvar"))
          , sourceWidgetVar = dlgWidget.cfg.sourceWidgetVar
          , sourceComponentId = dlgWidget.cfg.sourceComponentId
          , dialogReturnBehavior = null
          , windowContext = null;
        dlg.attr("data-queuedforremoval", true);
        if (parentDlg) {
            var parentDlgFrame = parentDlg.find("> .ui-dialog-content > iframe").get(0)
              , windowContext = parentDlgFrame.contentWindow || parentDlgFrame;
            sourceWidget = windowContext.PF(sourceWidgetVar)
        } else {
            windowContext = rootWindow
        }
        if (sourceWidgetVar) {
            var sourceWidget = windowContext.PF(sourceWidgetVar);
            dialogReturnBehavior = sourceWidget.cfg.behaviors ? sourceWidget.cfg.behaviors.dialogReturn : null
        } else {
            if (sourceComponentId) {
                var dialogReturnBehaviorStr = $(windowContext.document.getElementById(sourceComponentId)).data("dialogreturn");
                if (dialogReturnBehaviorStr) {
                    dialogReturnBehavior = windowContext.eval("(function(ext){this." + dialogReturnBehaviorStr + "})")
                }
            }
        }
        if (dialogReturnBehavior) {
            var ext = {
                params: [{
                    name: sourceComponentId + "_pfdlgcid",
                    value: cfg.pfdlgcid
                }]
            };
            dialogReturnBehavior.call(windowContext, ext)
        }
        dlgWidget.hide()
    },
    showMessageInDialog: function(c) {
        if (!this.messageDialog) {
            var d = $('<div id="primefacesmessagedlg" class="ui-message-dialog ui-dialog ui-widget ui-widget-content ui-corner-all ui-shadow ui-hidden-container"/>').append('<div class="ui-dialog-titlebar ui-widget-header ui-helper-clearfix ui-corner-top"><span class="ui-dialog-title"></span><a class="ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all" href="#" role="button"><span class="ui-icon ui-icon-closethick"></span></a></div><div class="ui-dialog-content ui-widget-content" style="height: auto;"></div>').appendTo(document.body);
            PrimeFaces.cw("Dialog", "primefacesmessagedialog", {
                id: "primefacesmessagedlg",
                modal: true,
                draggable: false,
                resizable: false,
                showEffect: "fade",
                hideEffect: "fade"
            });
            this.messageDialog = PF("primefacesmessagedialog");
            this.messageDialog.titleContainer = this.messageDialog.titlebar.children("span.ui-dialog-title")
        }
        this.messageDialog.titleContainer.text(c.summary);
        this.messageDialog.content.html("").append('<span class="ui-dialog-message ui-messages-' + c.severity.split(" ")[0].toLowerCase() + '-icon" />').append(c.detail);
        this.messageDialog.show()
    },
    confirm: function(b) {
        if (PrimeFaces.confirmDialog) {
            PrimeFaces.confirmSource = (typeof (b.source) === "string") ? $(PrimeFaces.escapeClientId(b.source)) : $(b.source);
            PrimeFaces.confirmDialog.showMessage(b)
        } else {
            PrimeFaces.warn("No global confirmation dialog available.")
        }
    },
    findRootWindow: function() {
        var b = window;
        while (b.frameElement) {
            b = window.parent
        }
        return b
    }
};
PrimeFaces.widget.AccordionPanel = PrimeFaces.widget.BaseWidget.extend({
    init: function(b) {
        this._super(b);
        this.stateHolder = $(this.jqId + "_active");
        this.headers = this.jq.children(".ui-accordion-header");
        this.panels = this.jq.children(".ui-accordion-content");
        this.onshowHandlers = this.onshowHandlers || {};
        this.cfg.rtl = this.jq.hasClass("ui-accordion-rtl");
        this.cfg.expandedIcon = "ui-icon-triangle-1-s";
        this.cfg.collapsedIcon = this.cfg.rtl ? "ui-icon-triangle-1-w" : "ui-icon-triangle-1-e";
        this.initActive();
        this.bindEvents();
        if (this.cfg.dynamic && this.cfg.cache) {
            this.markLoadedPanels()
        }
    },
    initActive: function() {
        if (this.cfg.multiple) {
            var d = this.stateHolder.val().split(",");
            for (var c = 0; c < d.length; c++) {
                d[c] = parseInt(d[c])
            }
            this.cfg.active = d
        } else {
            this.cfg.active = parseInt(this.stateHolder.val())
        }
    },
    bindEvents: function() {
        var b = this;
        this.headers.mouseover(function() {
            var a = $(this);
            if (!a.hasClass("ui-state-active") && !a.hasClass("ui-state-disabled")) {
                a.addClass("ui-state-hover")
            }
        }).mouseout(function() {
            var a = $(this);
            if (!a.hasClass("ui-state-active") && !a.hasClass("ui-state-disabled")) {
                a.removeClass("ui-state-hover")
            }
        }).click(function(e) {
            var f = $(this);
            if (!f.hasClass("ui-state-disabled")) {
                var a = f.index() / 2;
                if (f.hasClass("ui-state-active")) {
                    b.unselect(a)
                } else {
                    b.select(a);
                    $(this).trigger("focus.accordion")
                }
            }
            e.preventDefault()
        });
        this.bindKeyEvents()
    },
    bindKeyEvents: function() {
        this.headers.on("focus.accordion", function() {
            $(this).addClass("ui-tabs-outline")
        }).on("blur.accordion", function() {
            $(this).removeClass("ui-tabs-outline")
        }).on("keydown.accordion", function(f) {
            var d = $.ui.keyCode
              , e = f.which;
            if (e === d.SPACE || e === d.ENTER || e === d.NUMPAD_ENTER) {
                $(this).trigger("click");
                f.preventDefault()
            }
        })
    },
    markLoadedPanels: function() {
        if (this.cfg.multiple) {
            for (var b = 0; b < this.cfg.active.length; b++) {
                if (this.cfg.active[b] >= 0) {
                    this.markAsLoaded(this.panels.eq(this.cfg.active[b]))
                }
            }
        } else {
            if (this.cfg.active >= 0) {
                this.markAsLoaded(this.panels.eq(this.cfg.active))
            }
        }
    },
    select: function(h) {
        var e = this.panels.eq(h);
        if (this.cfg.onTabChange) {
            var f = this.cfg.onTabChange.call(this, e);
            if (f === false) {
                return false
            }
        }
        var g = this.cfg.dynamic && !this.isLoaded(e);
        if (this.cfg.multiple) {
            this.addToSelection(h)
        } else {
            this.cfg.active = h
        }
        this.saveState();
        if (g) {
            this.loadDynamicTab(e)
        } else {
            if (this.cfg.controlled) {
                if (this.hasBehavior("tabChange")) {
                    this.fireTabChangeEvent(e)
                }
            } else {
                this.show(e);
                if (this.hasBehavior("tabChange")) {
                    this.fireTabChangeEvent(e)
                }
            }
        }
        return true
    },
    unselect: function(b) {
        if (this.cfg.controlled) {
            if (this.hasBehavior("tabClose")) {
                this.fireTabCloseEvent(b)
            }
        } else {
            this.hide(b);
            if (this.hasBehavior("tabClose")) {
                this.fireTabCloseEvent(b)
            }
        }
    },
    show: function(h) {
        var e = this;
        if (!this.cfg.multiple) {
            var g = this.headers.filter(".ui-state-active");
            g.children(".ui-icon").removeClass(this.cfg.expandedIcon).addClass(this.cfg.collapsedIcon);
            g.attr("aria-selected", false);
            g.attr("aria-expanded", false).removeClass("ui-state-active ui-corner-top").addClass("ui-corner-all").next().attr("aria-hidden", true).slideUp()
        }
        var f = h.prev();
        f.attr("aria-selected", true);
        f.attr("aria-expanded", true).addClass("ui-state-active ui-corner-top").removeClass("ui-state-hover ui-corner-all").children(".ui-icon").removeClass(this.cfg.collapsedIcon).addClass(this.cfg.expandedIcon);
        h.attr("aria-hidden", false).slideDown("normal", function() {
            e.postTabShow(h)
        })
    },
    hide: function(d) {
        var e = this.panels.eq(d)
          , f = e.prev();
        f.attr("aria-selected", false);
        f.attr("aria-expanded", false).children(".ui-icon").removeClass(this.cfg.expandedIcon).addClass(this.cfg.collapsedIcon);
        f.removeClass("ui-state-active ui-corner-top").addClass("ui-corner-all");
        e.attr("aria-hidden", true).slideUp();
        this.removeFromSelection(d);
        this.saveState()
    },
    loadDynamicTab: function(f) {
        var h = this
          , e = {
            source: this.id,
            process: this.id,
            update: this.id,
            params: [{
                name: this.id + "_contentLoad",
                value: true
            }, {
                name: this.id + "_newTab",
                value: f.attr("id")
            }, {
                name: this.id + "_tabindex",
                value: parseInt(f.index() / 2)
            }],
            onsuccess: function(a, c, b) {
                PrimeFaces.ajax.Response.handle(a, c, b, {
                    widget: h,
                    handle: function(d) {
                        f.html(d);
                        if (this.cfg.cache) {
                            this.markAsLoaded(f)
                        }
                    }
                });
                return true
            },
            oncomplete: function() {
                h.show(f)
            }
        };
        if (this.hasBehavior("tabChange")) {
            var g = this.cfg.behaviors.tabChange;
            g.call(this, e)
        } else {
            PrimeFaces.ajax.AjaxRequest(e)
        }
    },
    fireTabChangeEvent: function(f) {
        var g = this.cfg.behaviors.tabChange
          , e = {
            params: [{
                name: this.id + "_newTab",
                value: f.attr("id")
            }, {
                name: this.id + "_tabindex",
                value: parseInt(f.index() / 2)
            }]
        };
        if (this.cfg.controlled) {
            var h = this;
            e.oncomplete = function(a, c, b) {
                if (b.access && !b.validationFailed) {
                    h.show(f)
                }
            }
        }
        g.call(this, e)
    },
    fireTabCloseEvent: function(f) {
        var g = this.panels.eq(f)
          , i = this.cfg.behaviors.tabClose
          , j = {
            params: [{
                name: this.id + "_tabId",
                value: g.attr("id")
            }, {
                name: this.id + "_tabindex",
                value: parseInt(f / 2)
            }]
        };
        if (this.cfg.controlled) {
            var h = this;
            j.oncomplete = function(a, c, b) {
                if (b.access && !b.validationFailed) {
                    h.hide(f)
                }
            }
        }
        i.call(this, j)
    },
    markAsLoaded: function(b) {
        b.data("loaded", true)
    },
    isLoaded: function(b) {
        return b.data("loaded") == true
    },
    hasBehavior: function(b) {
        if (this.cfg.behaviors) {
            return this.cfg.behaviors[b] != undefined
        }
        return false
    },
    addToSelection: function(b) {
        this.cfg.active.push(b)
    },
    removeFromSelection: function(b) {
        this.cfg.active = $.grep(this.cfg.active, function(a) {
            return a != b
        })
    },
    saveState: function() {
        if (this.cfg.multiple) {
            this.stateHolder.val(this.cfg.active.join(","))
        } else {
            this.stateHolder.val(this.cfg.active)
        }
    },
    addOnshowHandler: function(c, d) {
        this.onshowHandlers[c] = d
    },
    postTabShow: function(e) {
        if (this.cfg.onTabShow) {
            this.cfg.onTabShow.call(this, e)
        }
        PrimeFaces.invokeDeferredRenders(this.id);
        try {
            for (var g in this.onshowHandlers) {
                if (this.onshowHandlers.hasOwnProperty(g)) {
                    var d = this.onshowHandlers[g];
                    if (d.call()) {
                        delete this.onshowHandlers[g]
                    }
                }
            }
        } catch (f) {}
    }
});
PrimeFaces.widget.AjaxStatus = PrimeFaces.widget.BaseWidget.extend({
    init: function(b) {
        this._super(b);
        this.bind()
    },
    bind: function() {
        var c = $(document)
          , d = this;
        c.on("pfAjaxStart", function() {
            d.trigger("start", arguments)
        }).on("pfAjaxError", function() {
            d.trigger("error", arguments)
        }).on("pfAjaxSuccess", function() {
            d.trigger("success", arguments)
        }).on("pfAjaxComplete", function() {
            d.trigger("complete", arguments)
        });
        this.bindToStandard()
    },
    trigger: function(d, e) {
        var f = this.cfg[d];
        if (f) {
            f.apply(document, e)
        }
        this.jq.children().hide().filter(this.jqId + "_" + d).show()
    },
    bindToStandard: function() {
        if (window.jsf && window.jsf.ajax) {
            var b = $(document);
            jsf.ajax.addOnEvent(function(a) {
                if (a.status === "begin") {
                    b.trigger("pfAjaxStart", arguments)
                } else {
                    if (a.status === "complete") {
                        b.trigger("pfAjaxSuccess", arguments)
                    } else {
                        if (a.status === "success") {
                            b.trigger("pfAjaxComplete", arguments)
                        }
                    }
                }
            });
            jsf.ajax.addOnError(function(a) {
                b.trigger("pfAjaxError", arguments)
            })
        }
    }
});
PrimeFaces.widget.AutoComplete = PrimeFaces.widget.BaseWidget.extend({
    init: function(b) {
        this._super(b);
        this.panelId = this.jqId + "_panel";
        this.input = $(this.jqId + "_input");
        this.hinput = $(this.jqId + "_hinput");
        this.panel = this.jq.children(this.panelId);
        this.dropdown = this.jq.children(".ui-button");
        this.disabled = this.input.is(":disabled");
        this.active = true;
        this.cfg.pojo = this.hinput.length == 1;
        this.cfg.minLength = this.cfg.minLength != undefined ? this.cfg.minLength : 1;
        this.cfg.cache = this.cfg.cache || false;
        this.cfg.resultsMessage = this.cfg.resultsMessage || " results are available, use up and down arrow keys to navigate";
        this.cfg.ariaEmptyMessage = this.cfg.emptyMessage || "No search results are available.";
        this.cfg.dropdownMode = this.cfg.dropdownMode || "blank";
        this.cfg.autoHighlight = (this.cfg.autoHighlight === undefined) ? true : this.cfg.autoHighlight;
        this.cfg.myPos = this.cfg.myPos || "left top";
        this.cfg.atPos = this.cfg.atPos || "left bottom";
        this.cfg.active = (this.cfg.active === false) ? false : true;
        this.suppressInput = true;
        this.touchToDropdownButton = false;
        if (this.cfg.cache) {
            this.initCache()
        }
        this.input.data(PrimeFaces.CLIENT_ID_DATA, this.id);
        this.hinput.data(PrimeFaces.CLIENT_ID_DATA, this.id);
        if (this.cfg.multiple) {
            this.setupMultipleMode();
            this.multiItemContainer.data("primefaces-overlay-target", true).find("*").data("primefaces-overlay-target", true);
            if (this.cfg.selectLimit >= 0 && this.multiItemContainer.children("li.ui-autocomplete-token").length === this.cfg.selectLimit) {
                this.input.hide();
                this.disableDropdown()
            }
        } else {
            PrimeFaces.skinInput(this.input);
            this.input.data("primefaces-overlay-target", true).find("*").data("primefaces-overlay-target", true);
            this.dropdown.data("primefaces-overlay-target", true).find("*").data("primefaces-overlay-target", true)
        }
        this.bindStaticEvents();
        if (this.cfg.behaviors) {
            PrimeFaces.attachBehaviors(this.input, this.cfg.behaviors)
        }
        if (this.cfg.forceSelection) {
            this.setupForceSelection()
        }
        this.appendPanel();
        if (this.cfg.itemtip) {
            this.itemtip = $('<div id="' + this.id + '_itemtip" class="ui-autocomplete-itemtip ui-state-highlight ui-widget ui-corner-all ui-shadow"></div>').appendTo(document.body);
            this.cfg.itemtipMyPosition = this.cfg.itemtipMyPosition || "left top";
            this.cfg.itemtipAtPosition = this.cfg.itemtipAtPosition || "right bottom";
            this.cfg.checkForScrollbar = (this.cfg.itemtipAtPosition.indexOf("right") !== -1)
        }
        this.input.attr("aria-autocomplete", "list");
        this.jq.attr("role", "application");
        this.jq.append('<span role="status" aria-live="polite" class="ui-autocomplete-status ui-helper-hidden-accessible"></span>');
        this.status = this.jq.children(".ui-autocomplete-status")
    },
    appendPanel: function() {
        var b = this.cfg.appendTo ? PrimeFaces.expressions.SearchExpressionFacade.resolveComponentsAsSelector(this.cfg.appendTo) : $(document.body);
        if (!b.is(this.jq)) {
            b.children(this.panelId).remove();
            this.panel.appendTo(b)
        }
    },
    initCache: function() {
        this.cache = {};
        var b = this;
        this.cacheTimeout = setInterval(function() {
            b.clearCache()
        }, this.cfg.cacheTimeout)
    },
    clearCache: function() {
        this.cache = {}
    },
    setupMultipleMode: function() {
        var c = this;
        this.multiItemContainer = this.jq.children("ul");
        this.inputContainer = this.multiItemContainer.children(".ui-autocomplete-input-token");
        this.multiItemContainer.hover(function() {
            $(this).addClass("ui-state-hover")
        }, function() {
            $(this).removeClass("ui-state-hover")
        }).click(function() {
            c.input.focus()
        });
        this.input.focus(function() {
            c.multiItemContainer.addClass("ui-state-focus")
        }).blur(function(a) {
            c.multiItemContainer.removeClass("ui-state-focus")
        });
        var d = "> li.ui-autocomplete-token > .ui-autocomplete-token-icon";
        this.multiItemContainer.off("click", d).on("click", d, null, function(a) {
            if (c.multiItemContainer.children("li.ui-autocomplete-token").length === c.cfg.selectLimit) {
                if (PrimeFaces.isIE(8)) {
                    c.input.val("")
                }
                c.input.css("display", "inline");
                c.enableDropdown()
            }
            c.removeItem(a, $(this).parent())
        })
    },
    bindStaticEvents: function() {
        var b = this;
        this.bindKeyEvents();
        this.bindDropdownEvents();
        if (PrimeFaces.env.browser.mobile) {
            this.dropdown.bind("touchstart", function() {
                b.touchToDropdownButton = true
            })
        }
        this.hideNS = "mousedown." + this.id;
        $(document.body).off(this.hideNS).on(this.hideNS, function(a) {
            if (b.panel.is(":hidden")) {
                return
            }
            var d = b.panel.offset();
            if (a.target === b.input.get(0)) {
                return
            }
            if (a.pageX < d.left || a.pageX > d.left + b.panel.width() || a.pageY < d.top || a.pageY > d.top + b.panel.height()) {
                b.hide()
            }
        });
        this.resizeNS = "resize." + this.id;
        $(window).off(this.resizeNS).on(this.resizeNS, function(a) {
            if (b.panel.is(":visible")) {
                b.alignPanel()
            }
        })
    },
    bindDropdownEvents: function() {
        var b = this;
        this.dropdown.mouseover(function() {
            $(this).addClass("ui-state-hover")
        }).mouseout(function() {
            $(this).removeClass("ui-state-hover")
        }).mousedown(function() {
            if (b.active) {
                $(this).addClass("ui-state-active")
            }
        }).mouseup(function() {
            if (b.active) {
                $(this).removeClass("ui-state-active");
                b.searchWithDropdown();
                b.input.focus()
            }
        }).focus(function() {
            $(this).addClass("ui-state-focus")
        }).blur(function() {
            $(this).removeClass("ui-state-focus")
        }).keydown(function(e) {
            var f = $.ui.keyCode
              , a = e.which;
            if (a === f.SPACE || a === f.ENTER || a === f.NUMPAD_ENTER) {
                $(this).addClass("ui-state-active")
            }
        }).keyup(function(e) {
            var f = $.ui.keyCode
              , a = e.which;
            if (a === f.SPACE || a === f.ENTER || a === f.NUMPAD_ENTER) {
                $(this).removeClass("ui-state-active");
                b.searchWithDropdown();
                b.input.focus();
                e.preventDefault();
                e.stopPropagation()
            }
        })
    },
    disableDropdown: function() {
        if (this.dropdown.length) {
            this.dropdown.off().prop("disabled", true).addClass("ui-state-disabled")
        }
    },
    enableDropdown: function() {
        if (this.dropdown.length && this.dropdown.prop("disabled")) {
            this.bindDropdownEvents();
            this.dropdown.prop("disabled", false).removeClass("ui-state-disabled")
        }
    },
    bindKeyEvents: function() {
        var b = this;
        if (this.cfg.queryEvent !== "enter") {
            this.input.on("input propertychange", function(a) {
                b.processKeyEvent(a)
            })
        }
        this.input.on("keyup.autoComplete", function(e) {
            var g = $.ui.keyCode
              , a = e.which;
            if (PrimeFaces.isIE(9) && a === g.BACKSPACE) {
                b.processKeyEvent(e)
            }
            if (b.cfg.queryEvent === "enter" && (a === g.ENTER || a === g.NUMPAD_ENTER)) {
                if (b.itemSelectedWithEnter) {
                    b.itemSelectedWithEnter = false
                } else {
                    b.search(b.input.val())
                }
            }
            if (b.panel.is(":visible")) {
                if (a === g.ESCAPE) {
                    b.hide()
                } else {
                    if (a === g.UP || a === g.DOWN) {
                        var h = b.items.filter(".ui-state-highlight");
                        if (h.length) {
                            b.displayAriaStatus(h.data("item-label"))
                        }
                    }
                }
            }
        }).on("keydown.autoComplete", function(e) {
            var h = $.ui.keyCode;
            b.suppressInput = false;
            if (b.panel.is(":visible")) {
                var i = b.items.filter(".ui-state-highlight");
                switch (e.which) {
                case h.UP:
                    var j = i.length == 0 ? b.items.eq(0) : i.prevAll(".ui-autocomplete-item:first");
                    if (j.length == 1) {
                        i.removeClass("ui-state-highlight");
                        j.addClass("ui-state-highlight");
                        if (b.cfg.scrollHeight) {
                            PrimeFaces.scrollInView(b.panel, j)
                        }
                        if (b.cfg.itemtip) {
                            b.showItemtip(j)
                        }
                    }
                    e.preventDefault();
                    break;
                case h.DOWN:
                    var a = i.length == 0 ? b.items.eq(0) : i.nextAll(".ui-autocomplete-item:first");
                    if (a.length == 1) {
                        i.removeClass("ui-state-highlight");
                        a.addClass("ui-state-highlight");
                        if (b.cfg.scrollHeight) {
                            PrimeFaces.scrollInView(b.panel, a)
                        }
                        if (b.cfg.itemtip) {
                            b.showItemtip(a)
                        }
                    }
                    e.preventDefault();
                    break;
                case h.ENTER:
                case h.NUMPAD_ENTER:
                    if (b.timeout) {
                        b.deleteTimeout()
                    }
                    i.click();
                    e.preventDefault();
                    e.stopPropagation();
                    b.itemSelectedWithEnter = true;
                    break;
                case 18:
                case 224:
                    break;
                case h.TAB:
                    if (i.length) {
                        i.trigger("click")
                    }
                    b.hide();
                    break
                }
            } else {
                switch (e.which) {
                case h.TAB:
                    if (b.timeout) {
                        b.deleteTimeout()
                    }
                    break;
                case h.ENTER:
                case h.NUMPAD_ENTER:
                    if (b.cfg.queryEvent === "enter" || (b.timeout > 0) || b.querying) {
                        e.preventDefault()
                    }
                    break
                }
            }
        })
    },
    bindDynamicEvents: function() {
        var b = this;
        this.items.bind("mouseover", function() {
            var a = $(this);
            if (!a.hasClass("ui-state-highlight")) {
                b.items.filter(".ui-state-highlight").removeClass("ui-state-highlight");
                a.addClass("ui-state-highlight");
                if (b.cfg.itemtip) {
                    b.showItemtip(a)
                }
            }
        }).bind("click", function(i) {
            var j = $(this)
              , h = j.attr("data-item-value")
              , a = j.hasClass("ui-autocomplete-moretext");
            if (PrimeFaces.isIE(8)) {
                b.itemClick = true
            }
            if (a) {
                b.input.focus();
                b.invokeMoreTextBehavior()
            } else {
                if (b.cfg.multiple) {
                    var l = '<li data-token-value="' + j.attr("data-item-value") + '"class="ui-autocomplete-token ui-state-active ui-corner-all ui-helper-hidden">';
                    l += '<span class="ui-autocomplete-token-icon ui-icon ui-icon-close" />';
                    l += '<span class="ui-autocomplete-token-label">' + j.attr("data-item-label") + "</span></li>";
                    b.inputContainer.before(l);
                    b.multiItemContainer.children(".ui-helper-hidden").fadeIn();
                    b.input.val("").focus();
                    b.hinput.append('<option value="' + h + '" selected="selected"></option>');
                    if (b.multiItemContainer.children("li.ui-autocomplete-token").length >= b.cfg.selectLimit) {
                        b.input.css("display", "none").blur();
                        b.disableDropdown()
                    }
                } else {
                    b.input.val(j.attr("data-item-label")).focus();
                    this.currentText = b.input.val();
                    this.previousText = b.input.val();
                    if (b.cfg.pojo) {
                        b.hinput.val(h)
                    }
                    if (PrimeFaces.env.isLtIE(10)) {
                        var k = b.input.val().length;
                        b.input.setSelection(k, k)
                    }
                }
                b.invokeItemSelectBehavior(i, h)
            }
            b.hide()
        });
        if (PrimeFaces.env.browser.mobile) {
            this.items.bind("touchstart", function() {
                if (!b.touchToDropdownButton) {
                    b.itemClick = true
                }
            })
        }
    },
    processKeyEvent: function(g) {
        var h = this;
        if (h.suppressInput) {
            g.preventDefault();
            return
        }
        if (PrimeFaces.env.browser.mobile) {
            h.touchToDropdownButton = false;
            if (h.itemClick) {
                h.itemClick = false;
                return
            }
        }
        if (PrimeFaces.isIE(8) && (h.itemClick || g.originalEvent.propertyName !== "value")) {
            h.itemClick = false;
            return
        }
        var e = h.input.val();
        if (h.cfg.pojo && !h.cfg.multiple) {
            h.hinput.val(e)
        }
        if (!e.length) {
            h.hide()
        }
        if (e.length >= h.cfg.minLength) {
            if (h.timeout) {
                h.deleteTimeout()
            }
            var f = h.cfg.delay;
            h.timeout = setTimeout(function() {
                h.timeout = null;
                h.search(e)
            }, f)
        }
    },
    showItemtip: function(f) {
        if (f.hasClass("ui-autocomplete-moretext")) {
            this.itemtip.hide()
        } else {
            var d = f.is("li") ? f.next(".ui-autocomplete-itemtip-content") : f.children("td:last");
            this.itemtip.html(d.html()).css({
                left: "",
                top: "",
                "z-index": ++PrimeFaces.zindex,
                width: d.outerWidth()
            }).position({
                my: this.cfg.itemtipMyPosition,
                at: this.cfg.itemtipAtPosition,
                of: f
            });
            if (this.cfg.checkForScrollbar) {
                if (this.panel.innerHeight() < this.panel.children(".ui-autocomplete-items").outerHeight(true)) {
                    var e = this.panel.offset();
                    this.itemtip.css("left", e.left + this.panel.outerWidth())
                }
            }
            this.itemtip.show()
        }
    },
    showSuggestions: function(j) {
        this.items = this.panel.find(".ui-autocomplete-item");
        this.items.attr("role", "option");
        if (this.cfg.grouping) {
            this.groupItems()
        }
        this.bindDynamicEvents();
        var h = this
          , f = this.panel.is(":hidden");
        if (f) {
            this.show()
        } else {
            this.alignPanel()
        }
        if (this.items.length > 0) {
            var i = this.items.eq(0);
            if (this.cfg.autoHighlight && i.length) {
                i.addClass("ui-state-highlight")
            }
            if (this.panel.children().is("ul") && j.length > 0) {
                this.items.filter(":not(.ui-autocomplete-moretext)").each(function() {
                    var c = $(this)
                      , a = c.html()
                      , d = new RegExp(PrimeFaces.escapeRegExp(j),"gi")
                      , b = a.replace(d, '<span class="ui-autocomplete-query">$&</span>');
                    c.html(b)
                })
            }
            if (this.cfg.forceSelection) {
                this.currentItems = [];
                this.items.each(function(b, a) {
                    h.currentItems.push($(a).attr("data-item-label"))
                })
            }
            if (this.cfg.itemtip && i.length === 1) {
                this.showItemtip(i)
            }
            this.displayAriaStatus(this.items.length + this.cfg.resultsMessage)
        } else {
            if (this.cfg.emptyMessage) {
                var g = '<div class="ui-autocomplete-emptyMessage ui-widget">' + this.cfg.emptyMessage + "</div>";
                this.panel.html(g)
            } else {
                this.panel.hide()
            }
            this.displayAriaStatus(this.cfg.ariaEmptyMessage)
        }
    },
    searchWithDropdown: function() {
        if (this.cfg.dropdownMode === "current") {
            this.search(this.input.val())
        } else {
            this.search("")
        }
    },
    search: function(h) {
        if (!this.cfg.active || h === undefined || h === null) {
            return
        }
        if (this.cfg.cache && this.cache[h]) {
            this.panel.html(this.cache[h]);
            this.showSuggestions(h);
            return
        }
        if (!this.active) {
            return
        }
        this.querying = true;
        var g = this;
        if (this.cfg.itemtip) {
            this.itemtip.hide()
        }
        var e = {
            source: this.id,
            process: this.id,
            update: this.id,
            formId: this.cfg.formId,
            onsuccess: function(a, c, b) {
                PrimeFaces.ajax.Response.handle(a, c, b, {
                    widget: g,
                    handle: function(d) {
                        this.panel.html(d);
                        if (this.cfg.cache) {
                            this.cache[h] = d
                        }
                        this.showSuggestions(h)
                    }
                });
                return true
            },
            oncomplete: function() {
                g.querying = false
            }
        };
        e.params = [{
            name: this.id + "_query",
            value: h
        }];
        if (this.hasBehavior("query")) {
            var f = this.cfg.behaviors.query;
            f.call(this, e)
        } else {
            PrimeFaces.ajax.AjaxRequest(e)
        }
    },
    show: function() {
        this.alignPanel();
        if (this.cfg.effect) {
            this.panel.show(this.cfg.effect, {}, this.cfg.effectDuration)
        } else {
            this.panel.show()
        }
    },
    hide: function() {
        this.panel.hide();
        this.panel.css("height", "auto");
        if (this.cfg.itemtip) {
            this.itemtip.hide()
        }
    },
    invokeItemSelectBehavior: function(e, g) {
        if (this.cfg.behaviors) {
            var h = this.cfg.behaviors.itemSelect;
            if (h) {
                var f = {
                    params: [{
                        name: this.id + "_itemSelect",
                        value: g
                    }]
                };
                h.call(this, f)
            }
        }
    },
    invokeItemUnselectBehavior: function(h, g) {
        if (this.cfg.behaviors) {
            var f = this.cfg.behaviors.itemUnselect;
            if (f) {
                var e = {
                    params: [{
                        name: this.id + "_itemUnselect",
                        value: g
                    }]
                };
                f.call(this, e)
            }
        }
    },
    invokeMoreTextBehavior: function() {
        if (this.cfg.behaviors) {
            var c = this.cfg.behaviors.moreText;
            if (c) {
                var d = {
                    params: [{
                        name: this.id + "_moreText",
                        value: true
                    }]
                };
                c.call(this, d)
            }
        }
    },
    removeItem: function(j, f) {
        var h = f.attr("data-token-value")
          , g = this.multiItemContainer.children("li.ui-autocomplete-token").index(f)
          , i = this;
        this.hinput.children("option").eq(g).remove();
        f.fadeOut("fast", function() {
            var a = $(this);
            a.remove();
            i.invokeItemUnselectBehavior(j, h)
        })
    },
    setupForceSelection: function() {
        this.currentItems = [this.input.val()];
        var b = this;
        this.input.blur(function() {
            var e = $(this).val()
              , f = false;
            if (PrimeFaces.isIE(8)) {
                b.itemClick = true
            }
            for (var a = 0; a < b.currentItems.length; a++) {
                if (b.currentItems[a] === e) {
                    f = true;
                    break
                }
            }
            if (!f) {
                if (b.cfg.multiple) {
                    b.input.val("")
                } else {
                    b.input.val("");
                    b.hinput.val("")
                }
            }
        })
    },
    disable: function() {
        this.input.addClass("ui-state-disabled").prop("disabled", true);
        if (this.dropdown.length) {
            this.dropdown.addClass("ui-state-disabled").prop("disabled", true)
        }
    },
    enable: function() {
        this.input.removeClass("ui-state-disabled").prop("disabled", false);
        if (this.dropdown.length) {
            this.dropdown.removeClass("ui-state-disabled").prop("disabled", false)
        }
    },
    close: function() {
        this.hide()
    },
    deactivate: function() {
        this.active = false
    },
    activate: function() {
        this.active = true
    },
    hasBehavior: function(b) {
        if (this.cfg.behaviors) {
            return this.cfg.behaviors[b] != undefined
        }
        return false
    },
    alignPanel: function() {
        var f = null;
        if (this.cfg.multiple) {
            f = this.multiItemContainer.innerWidth() - (this.input.position().left - this.multiItemContainer.position().left)
        } else {
            if (this.panel.is(":visible")) {
                f = this.panel.children(".ui-autocomplete-items").outerWidth()
            } else {
                this.panel.css({
                    visibility: "hidden",
                    display: "block"
                });
                f = this.panel.children(".ui-autocomplete-items").outerWidth();
                this.panel.css({
                    visibility: "visible",
                    display: "none"
                })
            }
            var d = this.input.outerWidth();
            if (f < d) {
                f = d
            }
        }
        if (this.cfg.scrollHeight) {
            var e = this.panel.is(":hidden") ? this.panel.height() : this.panel.children().height();
            if (e > this.cfg.scrollHeight) {
                this.panel.height(this.cfg.scrollHeight)
            } else {
                this.panel.css("height", "auto")
            }
        }
        this.panel.css({
            left: "",
            top: "",
            width: f,
            "z-index": ++PrimeFaces.zindex
        });
        if (this.panel.parent().is(this.jq)) {
            this.panel.css({
                left: 0,
                top: this.jq.innerHeight()
            })
        } else {
            this.panel.position({
                my: this.cfg.myPos,
                at: this.cfg.atPos,
                of: this.cfg.multiple ? this.jq : this.input,
                collision: "flipfit"
            })
        }
    },
    displayAriaStatus: function(b) {
        this.status.html("<div>" + b + "</div>")
    },
    groupItems: function() {
        var d = this;
        if (this.items.length) {
            this.itemContainer = this.panel.children(".ui-autocomplete-items");
            var e = this.items.eq(0);
            if (!e.hasClass("ui-autocomplete-moretext")) {
                this.currentGroup = e.data("item-group");
                var f = e.data("item-group-tooltip");
                e.before(this.getGroupItem(d.currentGroup, d.itemContainer, f))
            }
            this.items.filter(":not(.ui-autocomplete-moretext)").each(function(c) {
                var b = d.items.eq(c)
                  , a = b.data("item-group")
                  , h = b.data("item-group-tooltip");
                if (d.currentGroup !== a) {
                    d.currentGroup = a;
                    b.before(d.getGroupItem(a, d.itemContainer, h))
                }
            })
        }
    },
    getGroupItem: function(g, f, h) {
        var e = null;
        if (f.is(".ui-autocomplete-table")) {
            if (!this.colspan) {
                this.colspan = this.items.eq(0).children("td").length
            }
            e = $('<tr class="ui-autocomplete-group ui-widget-header"><td colspan="' + this.colspan + '">' + g + "</td></tr>")
        } else {
            e = $('<li class="ui-autocomplete-group ui-autocomplete-list-item ui-widget-header">' + g + "</li>")
        }
        if (e) {
            e.attr("title", h)
        }
        return e
    },
    deleteTimeout: function() {
        clearTimeout(this.timeout);
        this.timeout = null
    }
});
PrimeFaces.widget.BlockUI = PrimeFaces.widget.BaseWidget.extend({
    init: function(b) {
        this.cfg = b;
        this.id = this.cfg.id;
        this.jqId = PrimeFaces.escapeClientId(this.id);
        this.block = PrimeFaces.expressions.SearchExpressionFacade.resolveComponentsAsSelector(this.cfg.block);
        this.content = $(this.jqId);
        this.cfg.animate = (this.cfg.animate === false) ? false : true;
        this.cfg.blocked = (this.cfg.blocked === true) ? true : false;
        this.render();
        if (this.cfg.triggers) {
            this.bindTriggers()
        }
        if (this.cfg.blocked) {
            this.show()
        }
        this.removeScriptElement(this.id)
    },
    refresh: function(b) {
        this.blocker.remove();
        this.block.children(".ui-blockui-content").remove();
        $(document).off("pfAjaxSend." + this.id + " pfAjaxComplete." + this.id);
        this._super(b)
    },
    bindTriggers: function() {
        var c = this
          , d = PrimeFaces.expressions.SearchExpressionFacade.resolveComponents(this.cfg.triggers);
        $(document).on("pfAjaxSend." + this.id, function(b, a, h) {
            var e = $.type(h.source) === "string" ? h.source : h.source.name;
            if ($.inArray(e, d) !== -1 && !c.cfg.blocked) {
                c.show()
            }
        });
        $(document).on("pfAjaxComplete." + this.id, function(b, a, h) {
            var e = $.type(h.source) === "string" ? h.source : h.source.name;
            if ($.inArray(e, d) !== -1 && !c.cfg.blocked) {
                c.hide()
            }
        })
    },
    show: function() {
        this.blocker.css("z-index", ++PrimeFaces.zindex);
        for (var d = 0; d < this.block.length; d++) {
            var e = $(this.blocker[d])
              , f = $(this.content[d]);
            f.css({
                left: (e.width() - f.outerWidth()) / 2,
                top: (e.height() - f.outerHeight()) / 2,
                "z-index": ++PrimeFaces.zindex
            })
        }
        if (this.cfg.animate) {
            this.blocker.fadeIn()
        } else {
            this.blocker.show()
        }
        if (this.hasContent()) {
            this.content.fadeIn()
        }
        this.block.attr("aria-busy", true)
    },
    hide: function() {
        if (this.cfg.animate) {
            this.blocker.fadeOut()
        } else {
            this.blocker.hide()
        }
        if (this.hasContent()) {
            this.content.fadeOut()
        }
        this.block.attr("aria-busy", false)
    },
    render: function() {
        this.blocker = $('<div id="' + this.id + '_blocker" class="ui-blockui ui-widget-overlay ui-helper-hidden"></div>');
        if (this.cfg.styleClass) {
            this.blocker.addClass(this.cfg.styleClass)
        }
        if (this.block.hasClass("ui-corner-all")) {
            this.blocker.addClass("ui-corner-all")
        }
        if (this.block.length > 1) {
            this.content = this.content.clone()
        }
        this.block.css("position", "relative").attr("aria-busy", this.cfg.blocked).append(this.blocker).append(this.content);
        if (this.block.length > 1) {
            this.blocker = $(PrimeFaces.escapeClientId(this.id + "_blocker"));
            this.content = this.block.children(".ui-blockui-content")
        }
    },
    hasContent: function() {
        return this.content.contents().length > 0
    }
});
PrimeFaces.widget.Calendar = PrimeFaces.widget.BaseWidget.extend({
    init: function(h) {
        this._super(h);
        this.input = $(this.jqId + "_input");
        this.jqEl = this.cfg.popup ? this.input : $(this.jqId + "_inline");
        var i = this;
        this.configureLocale();
        this.bindDateSelectListener();
        this.bindViewChangeListener();
        this.cfg.beforeShowDay = function(a) {
            if (i.cfg.preShowDay) {
                return i.cfg.preShowDay(a)
            } else {
                if (i.cfg.disabledWeekends) {
                    return $.datepicker.noWeekends(a)
                } else {
                    return [true, ""]
                }
            }
        }
        ;
        var k = this.hasTimePicker();
        if (k) {
            this.configureTimePicker()
        }
        if (this.cfg.popup) {
            PrimeFaces.skinInput(this.jqEl);
            if (this.cfg.behaviors) {
                PrimeFaces.attachBehaviors(this.jqEl, this.cfg.behaviors)
            }
            this.cfg.beforeShow = function(c, a) {
                setTimeout(function() {
                    $("#ui-datepicker-div").css("z-index", ++PrimeFaces.zindex)
                }, 1);
                if (PrimeFaces.env.touch && !i.input.attr("readonly") && i.cfg.showOn && i.cfg.showOn === "button") {
                    $(this).prop("readonly", true)
                }
                var b = i.cfg.preShow;
                if (b) {
                    return i.cfg.preShow.call(i, c, a)
                }
            }
        }
        if (PrimeFaces.env.touch && !this.input.attr("readonly") && this.cfg.showOn && this.cfg.showOn === "button") {
            this.cfg.onClose = function(a, b) {
                $(this).attr("readonly", false)
            }
        }
        if (!this.cfg.disabled) {
            if (k) {
                if (this.cfg.timeOnly) {
                    this.jqEl.timepicker(this.cfg)
                } else {
                    this.jqEl.datetimepicker(this.cfg)
                }
            } else {
                this.jqEl.datepicker(this.cfg)
            }
        }
        if (this.cfg.popup && this.cfg.showOn) {
            var l = this.jqEl.siblings(".ui-datepicker-trigger:button");
            l.attr("aria-label", PrimeFaces.getAriaLabel("calendar.BUTTON")).attr("aria-haspopup", true).html("").addClass("ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only").append('<span class="ui-button-icon-left ui-icon ui-icon-calendar"></span><span class="ui-button-text">ui-button</span>');
            var j = this.jqEl.attr("title");
            if (j) {
                l.attr("title", j)
            }
            var m = this.cfg.buttonTabindex || this.jqEl.attr("tabindex");
            if (m) {
                l.attr("tabindex", m)
            }
            PrimeFaces.skinButton(l);
            $("#ui-datepicker-div").addClass("ui-shadow");
            this.jq.addClass("ui-trigger-calendar")
        }
        if (this.cfg.popup) {
            this.jq.data("primefaces-overlay-target", this.id).find("*").data("primefaces-overlay-target", this.id)
        }
        this.input.data(PrimeFaces.CLIENT_ID_DATA, this.id);
        if (this.cfg.mask) {
            var n = {
                placeholder: this.cfg.maskSlotChar || "_",
                autoclear: this.cfg.maskAutoClear
            };
            this.input.mask(this.cfg.mask, n)
        }
    },
    refresh: function(b) {
        if (b.popup && $.datepicker._lastInput && (b.id + "_input") === $.datepicker._lastInput.id) {
            $.datepicker._hideDatepicker()
        }
        this.init(b)
    },
    configureLocale: function() {
        var d = PrimeFaces.locales[this.cfg.locale];
        if (d) {
            for (var c in d) {
                this.cfg[c] = d[c]
            }
        }
    },
    bindDateSelectListener: function() {
        var b = this;
        this.cfg.onSelect = function() {
            if (b.cfg.popup) {
                b.fireDateSelectEvent()
            } else {
                var a = $.datepicker.formatDate(b.cfg.dateFormat, b.getDate());
                b.input.val(a);
                b.fireDateSelectEvent()
            }
        }
    },
    fireDateSelectEvent: function() {
        if (this.cfg.behaviors) {
            var b = this.cfg.behaviors.dateSelect;
            if (b) {
                b.call(this)
            }
        }
    },
    bindViewChangeListener: function() {
        if (this.hasBehavior("viewChange")) {
            var b = this;
            this.cfg.onChangeMonthYear = function(a, d) {
                b.fireViewChangeEvent(a, d)
            }
        }
    },
    fireViewChangeEvent: function(e, h) {
        if (this.cfg.behaviors) {
            var g = this.cfg.behaviors.viewChange;
            if (g) {
                var f = {
                    params: [{
                        name: this.id + "_month",
                        value: h
                    }, {
                        name: this.id + "_year",
                        value: e
                    }]
                };
                g.call(this, f)
            }
        }
    },
    configureTimePicker: function() {
        var c = this.cfg.dateFormat
          , d = c.toLowerCase().indexOf("h");
        this.cfg.dateFormat = c.substring(0, d - 1);
        this.cfg.timeFormat = c.substring(d, c.length);
        if (this.cfg.timeFormat.indexOf("TT") != -1) {
            this.cfg.ampm = true
        }
        if (this.cfg.minDate) {
            this.cfg.minDate = $.datepicker.parseDateTime(this.cfg.dateFormat, this.cfg.timeFormat, this.cfg.minDate, {}, {})
        }
        if (this.cfg.maxDate) {
            this.cfg.maxDate = $.datepicker.parseDateTime(this.cfg.dateFormat, this.cfg.timeFormat, this.cfg.maxDate, {}, {})
        }
        if (!this.cfg.showButtonPanel) {
            this.cfg.showButtonPanel = false
        }
        if (this.cfg.controlType == "custom" && this.cfg.timeControlObject) {
            this.cfg.controlType = this.cfg.timeControlObject
        }
        if (this.cfg.showHour) {
            this.cfg.showHour = (this.cfg.showHour == "true") ? true : false
        }
        if (this.cfg.showMinute) {
            this.cfg.showMinute = (this.cfg.showMinute == "true") ? true : false
        }
        if (this.cfg.showSecond) {
            this.cfg.showSecond = (this.cfg.showSecond == "true") ? true : false
        }
        if (this.cfg.showMillisec) {
            this.cfg.showMillisec = (this.cfg.showMillisec == "true") ? true : false
        }
    },
    hasTimePicker: function() {
        return this.cfg.dateFormat.toLowerCase().indexOf("h") != -1
    },
    setDate: function(b) {
        this.jqEl.datetimepicker("setDate", b)
    },
    getDate: function() {
        return this.jqEl.datetimepicker("getDate")
    },
    enable: function() {
        this.jqEl.datetimepicker("enable")
    },
    disable: function() {
        this.jqEl.datetimepicker("disable")
    },
    hasBehavior: function(b) {
        if (this.cfg.behaviors) {
            return this.cfg.behaviors[b] !== undefined
        }
        return false
    }
});
PrimeFaces.widget.Carousel = PrimeFaces.widget.DeferredWidget.extend({
    init: function(b) {
        this._super(b);
        this.viewport = this.jq.children(".ui-carousel-viewport");
        this.itemsContainer = this.viewport.children(".ui-carousel-items");
        this.items = this.itemsContainer.children("li");
        this.itemsCount = this.items.length;
        this.header = this.jq.children(".ui-carousel-header");
        this.prevNav = this.header.children(".ui-carousel-prev-button");
        this.nextNav = this.header.children(".ui-carousel-next-button");
        this.pageLinks = this.header.find("> .ui-carousel-page-links > .ui-carousel-page-link");
        this.dropdown = this.header.children(".ui-carousel-dropdown");
        this.mobileDropdown = this.header.children(".ui-carousel-mobiledropdown");
        this.stateholder = $(this.jqId + "_page");
        this.cfg.numVisible = this.cfg.numVisible || 3;
        this.cfg.firstVisible = this.cfg.firstVisible || 0;
        this.columns = this.cfg.numVisible;
        this.first = this.cfg.firstVisible;
        this.cfg.effectDuration = this.cfg.effectDuration || 500;
        this.cfg.circular = this.cfg.circular || false;
        this.cfg.breakpoint = this.cfg.breakpoint || 640;
        this.page = parseInt(this.first / this.columns);
        this.totalPages = Math.ceil(this.itemsCount / this.cfg.numVisible);
        this.renderDeferred()
    },
    _render: function() {
        this.updateNavigators();
        this.bindEvents();
        if (this.cfg.responsive) {
            this.refreshDimensions()
        } else {
            this.calculateItemWidths(this.columns);
            this.jq.width(this.jq.width());
            this.updateNavigators()
        }
    },
    calculateItemWidths: function() {
        var c = this.items.eq(0);
        if (c.length) {
            var d = c.outerWidth(true) - c.width();
            this.items.width((this.viewport.innerWidth() - d * this.columns) / this.columns)
        }
    },
    refreshDimensions: function() {
        var b = $(window);
        if (b.width() <= this.cfg.breakpoint) {
            this.columns = 1;
            this.calculateItemWidths(this.columns);
            this.totalPages = this.itemsCount;
            this.mobileDropdown.show();
            this.pageLinks.hide()
        } else {
            this.columns = this.cfg.numVisible;
            this.calculateItemWidths();
            this.totalPages = Math.ceil(this.itemsCount / this.cfg.numVisible);
            this.mobileDropdown.hide();
            this.pageLinks.show()
        }
        this.page = parseInt(this.first / this.columns);
        this.updateNavigators();
        this.itemsContainer.css("left", (-1 * (this.viewport.innerWidth() * this.page)))
    },
    bindEvents: function() {
        var c = this;
        this.prevNav.on("click", function() {
            if (c.page !== 0) {
                c.setPage(c.page - 1)
            } else {
                if (c.cfg.circular) {
                    c.setPage(c.totalPages - 1)
                }
            }
        });
        this.nextNav.on("click", function() {
            var a = (c.page === (c.totalPages - 1));
            if (!a) {
                c.setPage(c.page + 1)
            } else {
                if (c.cfg.circular) {
                    c.setPage(0)
                }
            }
        });
        this.itemsContainer.swipe({
            swipe: function(b, a) {
                if (a === "left") {
                    if (c.page === (c.totalPages - 1)) {
                        if (c.cfg.circular) {
                            c.setPage(0)
                        }
                    } else {
                        c.setPage(c.page + 1)
                    }
                } else {
                    if (a === "right") {
                        if (c.page === 0) {
                            if (c.cfg.circular) {
                                c.setPage(c.totalPages - 1)
                            }
                        } else {
                            c.setPage(c.page - 1)
                        }
                    }
                }
            }
        });
        if (this.pageLinks.length) {
            this.pageLinks.on("click", function(a) {
                c.setPage($(this).index());
                a.preventDefault()
            })
        }
        this.header.children("select").on("change", function() {
            c.setPage(parseInt($(this).val()) - 1)
        });
        if (this.cfg.autoplayInterval) {
            this.cfg.circular = true;
            this.startAutoplay()
        }
        if (this.cfg.responsive) {
            var d = "resize." + this.id;
            $(window).off(d).on(d, function() {
                c.refreshDimensions()
            })
        }
    },
    updateNavigators: function() {
        if (!this.cfg.circular) {
            if (this.page === 0) {
                this.prevNav.addClass("ui-state-disabled");
                this.nextNav.removeClass("ui-state-disabled")
            } else {
                if (this.page === (this.totalPages - 1)) {
                    this.prevNav.removeClass("ui-state-disabled");
                    this.nextNav.addClass("ui-state-disabled")
                } else {
                    this.prevNav.removeClass("ui-state-disabled");
                    this.nextNav.removeClass("ui-state-disabled")
                }
            }
        }
        if (this.pageLinks.length) {
            this.pageLinks.filter(".ui-icon-radio-on").removeClass("ui-icon-radio-on");
            this.pageLinks.eq(this.page).addClass("ui-icon-radio-on")
        }
        if (this.dropdown.length) {
            this.dropdown.val(this.page + 1)
        }
        if (this.mobileDropdown.length) {
            this.mobileDropdown.val(this.page + 1)
        }
    },
    setPage: function(c) {
        if (c !== this.page && !this.itemsContainer.is(":animated")) {
            var d = this;
            this.itemsContainer.animate({
                left: -1 * (this.viewport.innerWidth() * c),
                easing: this.cfg.easing
            }, {
                duration: this.cfg.effectDuration,
                easing: this.cfg.easing,
                complete: function() {
                    d.page = c;
                    d.first = d.page * d.columns;
                    d.updateNavigators();
                    d.stateholder.val(d.page)
                }
            })
        }
    },
    startAutoplay: function() {
        var b = this;
        this.interval = setInterval(function() {
            if (b.page === (b.totalPages - 1)) {
                b.setPage(0)
            } else {
                b.setPage(b.page + 1)
            }
        }, this.cfg.autoplayInterval)
    },
    stopAutoplay: function() {
        clearInterval(this.interval)
    }
});
PrimeFaces.widget.ColumnToggler = PrimeFaces.widget.DeferredWidget.extend({
    init: function(b) {
        this._super(b);
        this.table = PrimeFaces.expressions.SearchExpressionFacade.resolveComponentsAsSelector(this.cfg.datasource);
        this.trigger = PrimeFaces.expressions.SearchExpressionFacade.resolveComponentsAsSelector(this.cfg.trigger);
        this.tableId = this.table.attr("id");
        this.thead = $(PrimeFaces.escapeClientId(this.tableId) + "_head");
        this.tbody = $(PrimeFaces.escapeClientId(this.tableId) + "_data");
        this.tfoot = $(PrimeFaces.escapeClientId(this.tableId) + "_foot");
        this.visible = false;
        this.render();
        this.bindEvents()
    },
    render: function() {
        this.columns = this.thead.find("> tr > th:not(.ui-static-column)");
        this.panel = $("<div></div>").attr("id", this.cfg.id).attr("role", "dialog").addClass("ui-columntoggler ui-widget ui-widget-content ui-shadow ui-corner-all").append('<ul class="ui-columntoggler-items" role="group"></ul>').appendTo(document.body);
        this.itemContainer = this.panel.children("ul");
        for (var r = 0; r < this.columns.length; r++) {
            var u = this.columns.eq(r)
              , q = u.hasClass("ui-helper-hidden")
              , p = q ? "ui-chkbox-box ui-widget ui-corner-all ui-state-default" : "ui-chkbox-box ui-widget ui-corner-all ui-state-default ui-state-active"
              , o = (q) ? "ui-chkbox-icon ui-icon ui-icon-blank" : "ui-chkbox-icon ui-icon ui-icon-check"
              , n = u.children(".ui-column-title").text();
            this.hasPriorityColumns = u.is('[class*="ui-column-p-"]');
            var i = $('<li class="ui-columntoggler-item"><div class="ui-chkbox ui-widget"><div class="ui-helper-hidden-accessible"><input type="checkbox" role="checkbox"></div><div class="' + p + '"><span class="' + o + '"></span></div></div><label>' + n + "</label></li>").data("column", u.attr("id"));
            if (this.hasPriorityColumns) {
                var v = u.attr("class").split(" ");
                for (var s = 0; s < v.length; s++) {
                    var t = v[s]
                      , j = t.indexOf("ui-column-p-");
                    if (j !== -1) {
                        i.addClass(t.substring(j, j + 13))
                    }
                }
            }
            if (!q) {
                i.find("> .ui-chkbox > .ui-helper-hidden-accessible > input").prop("checked", true).attr("aria-checked", true)
            }
            i.appendTo(this.itemContainer)
        }
        this.closer = $('<a href="#" class="ui-columntoggler-close"><span class="ui-icon ui-icon-close"></span></a>').attr("aria-label", PrimeFaces.getAriaLabel("columntoggler.CLOSE")).prependTo(this.panel);
        if (this.panel.outerHeight() > 200) {
            this.panel.height(200)
        }
        this.hide()
    },
    bindEvents: function() {
        var f = this
          , d = "mousedown." + this.id
          , e = "resize." + this.id;
        this.trigger.off("click.ui-columntoggler").on("click.ui-columntoggler", function(a) {
            if (f.visible) {
                f.hide()
            } else {
                f.show()
            }
        });
        this.itemContainer.find("> .ui-columntoggler-item > .ui-chkbox > .ui-chkbox-box").on("mouseover.columnToggler", function() {
            var a = $(this);
            if (!a.hasClass("ui-state-active")) {
                a.addClass("ui-state-hover")
            }
        }).on("mouseout.columnToggler", function() {
            $(this).removeClass("ui-state-hover")
        }).on("click.columnToggler", function(a) {
            f.toggle($(this));
            a.preventDefault()
        });
        this.itemContainer.find("> .ui-columntoggler-item > label").on("click.selectCheckboxMenu", function(a) {
            f.toggle($(this).prev().children(".ui-chkbox-box"));
            PrimeFaces.clearSelection();
            a.preventDefault()
        });
        this.closer.on("click", function(a) {
            f.hide();
            f.trigger.focus();
            a.preventDefault()
        });
        this.bindKeyEvents();
        $(document.body).off(d).on(d, function(b) {
            if (!f.visible) {
                return
            }
            var c = $(b.target);
            if (f.trigger.is(c) || f.trigger.has(c).length) {
                return
            }
            var a = f.panel.offset();
            if (b.pageX < a.left || b.pageX > a.left + f.panel.width() || b.pageY < a.top || b.pageY > a.top + f.panel.height()) {
                f.hide()
            }
        });
        $(window).off(e).on(e, function() {
            if (f.visible) {
                f.alignPanel()
            }
        })
    },
    bindKeyEvents: function() {
        var c = this
          , d = this.itemContainer.find("> li > div.ui-chkbox > div.ui-helper-hidden-accessible > input");
        this.trigger.on("focus.columnToggler", function() {
            $(this).addClass("ui-state-focus")
        }).on("blur.columnToggler", function() {
            $(this).removeClass("ui-state-focus")
        }).on("keydown.columnToggler", function(a) {
            var b = $.ui.keyCode
              , e = a.which;
            switch (e) {
            case b.ENTER:
            case b.NUMPAD_ENTER:
                if (c.visible) {
                    c.hide()
                } else {
                    c.show()
                }
                a.preventDefault();
                break;
            case b.TAB:
                if (c.visible) {
                    c.itemContainer.children("li:not(.ui-state-disabled):first").find("div.ui-helper-hidden-accessible > input").trigger("focus");
                    a.preventDefault()
                }
                break
            }
        });
        d.on("focus.columnToggler", function() {
            var b = $(this)
              , a = b.parent().next();
            if (b.prop("checked")) {
                a.removeClass("ui-state-active")
            }
            a.addClass("ui-state-focus")
        }).on("blur.columnToggler", function(a) {
            var e = $(this)
              , b = e.parent().next();
            if (e.prop("checked")) {
                b.addClass("ui-state-active")
            }
            b.removeClass("ui-state-focus")
        }).on("keydown.columnToggler", function(a) {
            if (a.which === $.ui.keyCode.TAB) {
                var b = $(this).closest("li").index();
                if (a.shiftKey) {
                    if (b === 0) {
                        c.closer.focus()
                    } else {
                        d.eq(b - 1).focus()
                    }
                } else {
                    if (b === (c.columns.length - 1) && !a.shiftKey) {
                        c.closer.focus()
                    } else {
                        d.eq(b + 1).focus()
                    }
                }
                a.preventDefault()
            }
        }).on("change.columnToggler", function(a) {
            var e = $(this)
              , b = e.parent().next();
            if (e.prop("checked")) {
                c.check(b);
                b.removeClass("ui-state-active")
            } else {
                c.uncheck(b)
            }
        });
        this.closer.on("keydown.columnToggler", function(a) {
            var e = a.which
              , b = $.ui.keyCode;
            if ((e === b.ENTER || e === b.NUMPAD_ENTER)) {
                c.hide();
                c.trigger.focus();
                a.preventDefault()
            } else {
                if (e === b.TAB) {
                    if (a.shiftKey) {
                        d.eq(c.columns.length - 1).focus()
                    } else {
                        d.eq(0).focus()
                    }
                    a.preventDefault()
                }
            }
        })
    },
    toggle: function(b) {
        if (b.hasClass("ui-state-active")) {
            this.uncheck(b)
        } else {
            this.check(b)
        }
    },
    check: function(h) {
        h.addClass("ui-state-active").removeClass("ui-state-hover").children(".ui-chkbox-icon").addClass("ui-icon-check").removeClass("ui-icon-blank");
        var e = $(document.getElementById(h.closest("li.ui-columntoggler-item").data("column"))).index() + 1
          , g = this.thead.children("tr").find("th:nth-child(" + e + ")")
          , f = h.prev().children("input");
        f.prop("checked", true).attr("aria-checked", true);
        g.removeClass("ui-helper-hidden");
        $(PrimeFaces.escapeClientId(g.attr("id") + "_clone")).removeClass("ui-helper-hidden");
        this.tbody.children("tr").find("td:nth-child(" + e + ")").removeClass("ui-helper-hidden");
        this.tfoot.children("tr").find("td:nth-child(" + e + ")").removeClass("ui-helper-hidden");
        this.fireToggleEvent(true, (e - 1));
        this.updateColspan()
    },
    uncheck: function(h) {
        h.removeClass("ui-state-active").children(".ui-chkbox-icon").addClass("ui-icon-blank").removeClass("ui-icon-check");
        var e = $(document.getElementById(h.closest("li.ui-columntoggler-item").data("column"))).index() + 1
          , g = this.thead.children("tr").find("th:nth-child(" + e + ")")
          , f = h.prev().children("input");
        f.prop("checked", false).attr("aria-checked", false);
        g.addClass("ui-helper-hidden");
        $(PrimeFaces.escapeClientId(g.attr("id") + "_clone")).addClass("ui-helper-hidden");
        this.tbody.children("tr").find("td:nth-child(" + e + ")").addClass("ui-helper-hidden");
        this.tfoot.children("tr").find("td:nth-child(" + e + ")").addClass("ui-helper-hidden");
        this.fireToggleEvent(false, (e - 1));
        this.updateColspan()
    },
    alignPanel: function() {
        this.panel.css({
            left: "",
            top: "",
            "z-index": ++PrimeFaces.zindex
        }).position({
            my: "left top",
            at: "left bottom",
            of: this.trigger
        });
        if (this.hasPriorityColumns) {
            if (this.panel.outerWidth() <= this.trigger.outerWidth()) {
                this.panel.css("width", "auto")
            }
            this.widthAligned = false
        }
        if (!this.widthAligned && (this.panel.outerWidth() < this.trigger.outerWidth())) {
            this.panel.width(this.trigger.width());
            this.widthAligned = true
        }
    },
    show: function() {
        this.alignPanel();
        this.panel.show();
        this.visible = true;
        this.trigger.attr("aria-expanded", true);
        this.closer.trigger("focus")
    },
    hide: function() {
        this.panel.fadeOut("fast");
        this.visible = false;
        this.trigger.attr("aria-expanded", false)
    },
    fireToggleEvent: function(h, j) {
        if (this.cfg.behaviors) {
            var f = this.cfg.behaviors.toggle;
            if (f) {
                var g = h ? "VISIBLE" : "HIDDEN"
                  , i = {
                    params: [{
                        name: this.id + "_visibility",
                        value: g
                    }, {
                        name: this.id + "_index",
                        value: j
                    }]
                };
                f.call(this, i)
            }
        }
    },
    updateColspan: function() {
        var d = this.tbody.children("tr:first");
        if (d && d.hasClass("ui-datatable-empty-message")) {
            var c = this.itemContainer.find("> .ui-columntoggler-item > .ui-chkbox > .ui-chkbox-box.ui-state-active");
            if (c.length) {
                d.children("td").removeClass("ui-helper-hidden").attr("colspan", c.length)
            } else {
                d.children("td").addClass("ui-helper-hidden")
            }
        }
    }
});
PrimeFaces.widget.Dashboard = PrimeFaces.widget.BaseWidget.extend({
    init: function(d) {
        this._super(d);
        this.cfg.connectWith = this.jqId + " .ui-dashboard-column";
        this.cfg.placeholder = "ui-state-hover";
        this.cfg.forcePlaceholderSize = true;
        this.cfg.revert = false;
        this.cfg.handle = ".ui-panel-titlebar";
        var e = this;
        if (this.cfg.behaviors) {
            var f = this.cfg.behaviors.reorder;
            if (f) {
                this.cfg.update = function(b, c) {
                    if (this === c.item.parent()[0]) {
                        var j = c.item.parent().children().filter(":not(script):visible").index(c.item)
                          , a = c.item.parent().parent().children().index(c.item.parent());
                        var k = {
                            params: [{
                                name: e.id + "_reordered",
                                value: true
                            }, {
                                name: e.id + "_widgetId",
                                value: c.item.attr("id")
                            }, {
                                name: e.id + "_itemIndex",
                                value: j
                            }, {
                                name: e.id + "_receiverColumnIndex",
                                value: a
                            }]
                        };
                        if (c.sender) {
                            k.params.push({
                                name: e.id + "_senderColumnIndex",
                                value: c.sender.parent().children().index(c.sender)
                            })
                        }
                        f.call(e, k)
                    }
                }
            }
        }
        $(this.jqId + " .ui-dashboard-column").sortable(this.cfg)
    }
});
PrimeFaces.widget.DataGrid = PrimeFaces.widget.BaseWidget.extend({
    init: function(b) {
        this._super(b);
        this.cfg.formId = $(this.jqId).closest("form").attr("id");
        this.content = $(this.jqId + "_content");
        if (this.cfg.paginator) {
            this.setupPaginator()
        }
    },
    setupPaginator: function() {
        var b = this;
        this.cfg.paginator.paginate = function(a) {
            b.handlePagination(a)
        }
        ;
        this.paginator = new PrimeFaces.widget.Paginator(this.cfg.paginator)
    },
    hasBehavior: function(b) {
        if (this.cfg.behaviors) {
            return this.cfg.behaviors[b] !== undefined
        }
        return false
    },
    handlePagination: function(g) {
        var h = this
          , e = {
            source: this.id,
            update: this.id,
            process: this.id,
            formId: this.cfg.formId,
            params: [{
                name: this.id + "_pagination",
                value: true
            }, {
                name: this.id + "_first",
                value: g.first
            }, {
                name: this.id + "_rows",
                value: g.rows
            }],
            onsuccess: function(a, c, b) {
                PrimeFaces.ajax.Response.handle(a, c, b, {
                    widget: h,
                    handle: function(d) {
                        this.content.html(d)
                    }
                });
                return true
            },
            oncomplete: function() {
                h.paginator.cfg.page = g.page;
                h.paginator.updateUI()
            }
        };
        if (this.hasBehavior("page")) {
            var f = this.cfg.behaviors.page;
            f.call(this, e)
        } else {
            PrimeFaces.ajax.Request.handle(e)
        }
    },
    getPaginator: function() {
        return this.paginator
    }
});
PrimeFaces.widget.DataList = PrimeFaces.widget.BaseWidget.extend({
    init: function(b) {
        this._super(b);
        this.cfg.formId = $(this.jqId).parents("form:first").attr("id");
        this.content = $(this.jqId + "_content");
        if (this.cfg.paginator) {
            this.setupPaginator()
        }
    },
    setupPaginator: function() {
        var b = this;
        this.cfg.paginator.paginate = function(a) {
            b.handlePagination(a)
        }
        ;
        this.paginator = new PrimeFaces.widget.Paginator(this.cfg.paginator)
    },
    handlePagination: function(g) {
        var h = this
          , e = {
            source: this.id,
            update: this.id,
            process: this.id,
            formId: this.cfg.formId,
            params: [{
                name: this.id + "_pagination",
                value: true
            }, {
                name: this.id + "_first",
                value: g.first
            }, {
                name: this.id + "_rows",
                value: g.rows
            }],
            onsuccess: function(a, c, b) {
                PrimeFaces.ajax.Response.handle(a, c, b, {
                    widget: h,
                    handle: function(d) {
                        this.content.html(d)
                    }
                });
                return true
            },
            oncomplete: function() {
                h.paginator.cfg.page = g.page;
                h.paginator.updateUI()
            }
        };
        if (this.hasBehavior("page")) {
            var f = this.cfg.behaviors.page;
            f.call(this, e)
        } else {
            PrimeFaces.ajax.Request.handle(e)
        }
    },
    getPaginator: function() {
        return this.paginator
    },
    hasBehavior: function(b) {
        if (this.cfg.behaviors) {
            return this.cfg.behaviors[b] !== undefined
        }
        return false
    }
});
PrimeFaces.widget.DataScroller = PrimeFaces.widget.BaseWidget.extend({
    init: function(b) {
        this._super(b);
        this.content = this.jq.children("div.ui-datascroller-content");
        this.list = this.content.children("ul");
        this.loaderContainer = this.content.children("div.ui-datascroller-loader");
        this.loadStatus = $('<div class="ui-datascroller-loading"></div>');
        this.loading = false;
        this.allLoaded = false;
        this.cfg.offset = 0;
        this.cfg.mode = this.cfg.mode || "document";
        this.cfg.buffer = (100 - this.cfg.buffer) / 100;
        if (this.cfg.loadEvent === "scroll") {
            this.bindScrollListener()
        } else {
            this.loadTrigger = this.loaderContainer.children();
            this.bindManualLoader()
        }
    },
    bindScrollListener: function() {
        var g = this;
        if (this.cfg.mode === "document") {
            var h = $(window)
              , e = $(document)
              , g = this
              , f = "scroll." + this.id;
            h.off(f).on(f, function() {
                if (h.scrollTop() >= ((e.height() * g.cfg.buffer) - h.height()) && g.shouldLoad()) {
                    g.load()
                }
            })
        } else {
            this.content.on("scroll", function() {
                var a = this.scrollTop
                  , b = this.scrollHeight
                  , c = this.clientHeight;
                if ((a >= ((b * g.cfg.buffer) - (c))) && g.shouldLoad()) {
                    g.load()
                }
            })
        }
    },
    bindManualLoader: function() {
        var b = this;
        this.loadTrigger.on("click.dataScroller", function(a) {
            b.load();
            a.preventDefault()
        })
    },
    load: function() {
        this.loading = true;
        this.cfg.offset += this.cfg.chunkSize;
        this.loadStatus.appendTo(this.loaderContainer);
        if (this.loadTrigger) {
            this.loadTrigger.hide()
        }
        var c = this
          , d = {
            source: this.id,
            process: this.id,
            update: this.id,
            global: false,
            params: [{
                name: this.id + "_load",
                value: true
            }, {
                name: this.id + "_offset",
                value: this.cfg.offset
            }],
            onsuccess: function(a, f, b) {
                PrimeFaces.ajax.Response.handle(a, f, b, {
                    widget: c,
                    handle: function(e) {
                        this.list.append(e)
                    }
                });
                return true
            },
            oncomplete: function() {
                c.loading = false;
                c.allLoaded = (c.cfg.offset + c.cfg.chunkSize) >= c.cfg.totalSize;
                c.loadStatus.remove();
                if (c.loadTrigger && !c.allLoaded) {
                    c.loadTrigger.show()
                }
            }
        };
        PrimeFaces.ajax.AjaxRequest(d)
    },
    shouldLoad: function() {
        return (!this.loading && !this.allLoaded)
    }
});
PrimeFaces.widget.DataTable = PrimeFaces.widget.DeferredWidget.extend({
    SORT_ORDER: {
        ASCENDING: 1,
        DESCENDING: -1,
        UNSORTED: 0
    },
    init: function(a) {
        this._super(a);
        this.thead = this.getThead();
        this.tbody = this.getTbody();
        if (this.cfg.paginator) {
            this.bindPaginator()
        }
        this.bindSortEvents();
        if (this.cfg.selectionMode) {
            this.selectionHolder = this.jqId + "_selection";
            var b = $(this.selectionHolder).val();
            this.selection = b == "" ? [] : b.split(",");
            this.originRowIndex = 0;
            this.cursorIndex = null;
            this.bindSelectionEvents()
        }
        if (this.cfg.filter) {
            this.setupFiltering()
        }
        if (this.cfg.expansion) {
            this.expansionProcess = [];
            this.bindExpansionEvents()
        }
        if (this.cfg.editable) {
            this.bindEditEvents()
        }
        if (this.cfg.draggableRows) {
            this.makeRowsDraggable()
        }
        this.renderDeferred()
    },
    _render: function() {
        if (this.cfg.scrollable) {
            this.setupScrolling()
        }
        if (this.cfg.resizableColumns) {
            this.setupResizableColumns()
        }
        if (this.cfg.draggableColumns) {
            this.setupDraggableColumns()
        }
        if (this.cfg.stickyHeader) {
            this.setupStickyHeader()
        }
    },
    getThead: function() {
        return $(this.jqId + "_head")
    },
    getTbody: function() {
        return $(this.jqId + "_data")
    },
    updateData: function(a) {
        this.tbody.html(a);
        this.postUpdateData()
    },
    postUpdateData: function() {
        if (this.cfg.draggableRows) {
            this.makeRowsDraggable()
        }
    },
    refresh: function(b) {
        if (b.draggableColumns) {
            var a = PrimeFaces.escapeClientId(b.id);
            $(a + "_dnd_top," + a + "_dnd_bottom").remove()
        }
        this.columnWidthsFixed = false;
        this.init(b)
    },
    bindPaginator: function() {
        var a = this;
        this.cfg.paginator.paginate = function(b) {
            a.paginate(b)
        };
        this.paginator = new PrimeFaces.widget.Paginator(this.cfg.paginator)
    },
    bindSortEvents: function() {
        var d = this;
        this.sortableColumns = this.thead.find("> tr > th.ui-sortable-column");
        if (this.cfg.multiSort) {
            this.sortMeta = []
        }
        for (var a = 0; a < this.sortableColumns.length; a++) {
            var c = this.sortableColumns.eq(a),
                e = c.children("span.ui-sortable-column-icon"),
                b = null;
            if (c.hasClass("ui-state-active")) {
                if (e.hasClass("ui-icon-triangle-1-n")) {
                    b = this.SORT_ORDER.ASCENDING
                } else {
                    b = this.SORT_ORDER.DESCENDING
                }
                if (d.cfg.multiSort) {
                    d.addSortMeta({
                        col: c.attr("id"),
                        order: b
                    })
                }
            } else {
                b = this.SORT_ORDER.UNSORTED
            }
            c.data("sortorder", b)
        }
        this.sortableColumns.on("mouseenter.dataTable", function() {
            var f = $(this);
            if (!f.hasClass("ui-state-active")) {
                f.addClass("ui-state-hover")
            }
        }).on("mouseleave.dataTable", function() {
            var f = $(this);
            if (!f.hasClass("ui-state-active")) {
                f.removeClass("ui-state-hover")
            }
        }).on("click.dataTable", function(i) {
            if (d.isEmpty() || $(i.target).is(":not(th,span)")) {
                return
            }
            PrimeFaces.clearSelection();
            var h = $(this),
                f = h.data("sortorder"),
                g = (f === d.SORT_ORDER.UNSORTED) ? d.SORT_ORDER.ASCENDING : -1 * f,
                j = i.metaKey || i.ctrlKey;
            if (d.cfg.multiSort) {
                if (j) {
                    d.addSortMeta({
                        col: h.attr("id"),
                        order: g
                    });
                    d.sort(h, g, true)
                } else {
                    d.sortMeta = [];
                    d.addSortMeta({
                        col: h.attr("id"),
                        order: g
                    });
                    d.sort(h, g)
                }
            } else {
                d.sort(h, g)
            }
        })
    },
    addSortMeta: function(a) {
        this.sortMeta = $.grep(this.sortMeta, function(b) {
            return b.col !== a.col
        });
        this.sortMeta.push(a)
    },
    setupFiltering: function() {
        var b = this,
            a = this.thead.find("> tr > th.ui-filter-column");
        this.cfg.filterEvent = this.cfg.filterEvent || "keyup";
        this.cfg.filterDelay = this.cfg.filterDelay || 300;
        a.children(".ui-column-filter").each(function() {
            var c = $(this);
            if (c.is("input:text")) {
                PrimeFaces.skinInput(c);
                b.bindTextFilter(c)
            } else {
                PrimeFaces.skinSelect(c);
                b.bindChangeFilter(c)
            }
        })
    },
    bindTextFilter: function(a) {
        if (this.cfg.filterEvent === "enter") {
            this.bindEnterKeyFilter(a)
        } else {
            this.bindFilterEvent(a)
        }
    },
    bindChangeFilter: function(a) {
        var b = this;
        a.change(function() {
            b.filter()
        })
    },
    bindEnterKeyFilter: function(a) {
        var b = this;
        a.bind("keydown", function(f) {
            var c = f.which,
                d = $.ui.keyCode;
            if ((c === d.ENTER || c === d.NUMPAD_ENTER)) {
                f.preventDefault()
            }
        }).bind("keyup", function(f) {
            var c = f.which,
                d = $.ui.keyCode;
            if ((c === d.ENTER || c === d.NUMPAD_ENTER)) {
                b.filter();
                f.preventDefault()
            }
        })
    },
    bindFilterEvent: function(a) {
        var b = this;
        a.bind(this.cfg.filterEvent, function(c) {
            if (b.filterTimeout) {
                clearTimeout(b.filterTimeout)
            }
            b.filterTimeout = setTimeout(function() {
                b.filter();
                b.filterTimeout = null
            }, b.cfg.filterDelay)
        })
    },
    bindSelectionEvents: function() {
        var a = this;
        this.cfg.rowSelectMode = this.cfg.rowSelectMode || "new";
        this.rowSelector = "> tr.ui-widget-content.ui-datatable-selectable";
        if (this.cfg.selectionMode !== "radio") {
            this.bindRowHover();
            this.tbody.off("click.dataTable", this.rowSelector).on("click.dataTable", this.rowSelector, null, function(b) {
                a.onRowClick(b, this)
            })
        } else {
            this.bindRadioEvents()
        }
        if (this.isCheckboxSelectionEnabled()) {
            this.bindCheckboxEvents();
            this.updateHeaderCheckbox()
        }
        if (this.hasBehavior("rowDblselect")) {
            this.tbody.off("dblclick.dataTable", this.rowSelector).on("dblclick.dataTable", this.rowSelector, null, function(b) {
                a.onRowDblclick(b, $(this))
            })
        }
    },
    bindRowHover: function() {
        this.tbody.off("mouseenter.dataTable mouseleave.dataTable", this.rowSelector).on("mouseenter.dataTable", this.rowSelector, null, function() {
            var a = $(this);
            if (!a.hasClass("ui-state-highlight")) {
                a.addClass("ui-state-hover")
            }
        }).on("mouseleave.dataTable", this.rowSelector, null, function() {
            var a = $(this);
            if (!a.hasClass("ui-state-highlight")) {
                a.removeClass("ui-state-hover")
            }
        })
    },
    bindRadioEvents: function() {
        var c = this,
            b = "> tr.ui-widget-content:not(.ui-datatable-empty-message) > td.ui-selection-column :radio";
        if (this.cfg.nativeElements) {
            this.tbody.off("click.dataTable", b).on("click.dataTable", b, null, function(f) {
                var d = $(this);
                if (!d.prop("checked")) {
                    c.selectRowWithRadio(d)
                }
            })
        } else {
            var a = "> tr.ui-widget-content:not(.ui-datatable-empty-message) > td.ui-selection-column .ui-radiobutton .ui-radiobutton-box";
            this.tbody.off("click.dataTable mouseover.dataTable mouseout.dataTable", a).on("mouseover.dataTable", a, null, function() {
                var d = $(this);
                if (!d.hasClass("ui-state-disabled") && !d.hasClass("ui-state-active")) {
                    d.addClass("ui-state-hover")
                }
            }).on("mouseout.dataTable", a, null, function() {
                var d = $(this);
                d.removeClass("ui-state-hover")
            }).on("click.dataTable", a, null, function() {
                var d = $(this),
                    f = d.hasClass("ui-state-active"),
                    e = d.hasClass("ui-state-disabled");
                if (!e && !f) {
                    c.selectRowWithRadio(d)
                }
            })
        }
        this.tbody.off("focus.dataTable blur.dataTable change.dataTable", b).on("focus.dataTable", b, null, function() {
            var d = $(this),
                e = d.parent().next();
            if (d.prop("checked")) {
                e.removeClass("ui-state-active")
            }
            e.addClass("ui-state-focus")
        }).on("blur.dataTable", b, null, function() {
            var d = $(this),
                e = d.parent().next();
            if (d.prop("checked")) {
                e.addClass("ui-state-active")
            }
            e.removeClass("ui-state-focus")
        }).on("change.dataTable", b, null, function() {
            var d = $(b).filter(":checked"),
                e = d.parent().next();
            c.selectRowWithRadio(e)
        })
    },
    bindCheckboxEvents: function() {
        var b = this,
            c = "> tr.ui-widget-content.ui-datatable-selectable > td.ui-selection-column :checkbox";
        if (this.cfg.nativeElements) {
            this.checkAllToggler = this.thead.find("> tr > th.ui-selection-column > :checkbox");
            this.checkAllToggler.on("click", function() {
                b.toggleCheckAll()
            });
            this.tbody.off("click.dataTable", c).on("click.dataTable", c, null, function(f) {
                var d = $(this);
                if (d.prop("checked")) {
                    b.selectRowWithCheckbox(d)
                } else {
                    b.unselectRowWithCheckbox(d)
                }
            })
        } else {
            this.checkAllToggler = this.thead.find("> tr > th.ui-selection-column > .ui-chkbox.ui-chkbox-all > .ui-chkbox-box");
            this.checkAllToggler.on("mouseover", function() {
                var d = $(this);
                if (!d.hasClass("ui-state-disabled") && !d.hasClass("ui-state-active")) {
                    d.addClass("ui-state-hover")
                }
            }).on("mouseout", function() {
                $(this).removeClass("ui-state-hover")
            }).on("click", function() {
                var d = $(this);
                if (!d.hasClass("ui-state-disabled")) {
                    b.toggleCheckAll()
                }
            });
            var a = "> tr.ui-widget-content.ui-datatable-selectable > td.ui-selection-column .ui-chkbox .ui-chkbox-box";
            this.tbody.off("mouseover.dataTable mouseover.dataTable click.dataTable", a).on("mouseover.dataTable", a, null, function() {
                var d = $(this);
                if (!d.hasClass("ui-state-active")) {
                    d.addClass("ui-state-hover")
                }
            }).on("mouseout.dataTable", a, null, function() {
                $(this).removeClass("ui-state-hover")
            }).on("click.dataTable", a, null, function() {
                var e = $(this),
                    d = e.hasClass("ui-state-active");
                if (d) {
                    b.unselectRowWithCheckbox(e)
                } else {
                    b.selectRowWithCheckbox(e)
                }
            })
        }
        this.tbody.off("focus.dataTable blur.dataTable keydown.dataTable keyup.dataTable", c).on("focus.dataTable", c, null, function() {
            var d = $(this),
                e = d.parent().next();
            if (d.prop("checked")) {
                e.removeClass("ui-state-active")
            }
            e.addClass("ui-state-focus")
        }).on("blur.dataTable", c, null, function() {
            var d = $(this),
                e = d.parent().next();
            if (d.prop("checked")) {
                e.addClass("ui-state-active")
            }
            e.removeClass("ui-state-focus")
        }).on("keydown.dataTable", c, null, function(f) {
            var d = $.ui.keyCode;
            if (f.which === d.SPACE) {
                f.preventDefault()
            }
        }).on("keyup.dataTable", c, null, function(h) {
            var g = $.ui.keyCode;
            if (h.which === g.SPACE) {
                var d = $(this),
                    f = d.parent().next();
                if (d.prop("checked")) {
                    b.unselectRowWithCheckbox(f)
                } else {
                    b.selectRowWithCheckbox(f)
                }
                h.preventDefault()
            }
        })
    },
    bindExpansionEvents: function() {
        var b = this,
            a = "> tr > td > div.ui-row-toggler";
        this.tbody.off("click.datatable-expansion", a).on("click.datatable-expansion", a, null, function() {
            b.toggleExpansion($(this))
        })
    },
    setupScrolling: function() {
        this.scrollHeader = this.jq.children(".ui-datatable-scrollable-header");
        this.scrollBody = this.jq.children(".ui-datatable-scrollable-body");
        this.scrollFooter = this.jq.children(".ui-datatable-scrollable-footer");
        this.scrollStateHolder = $(this.jqId + "_scrollState");
        this.scrollHeaderBox = this.scrollHeader.children("div.ui-datatable-scrollable-header-box");
        this.scrollFooterBox = this.scrollFooter.children("div.ui-datatable-scrollable-footer-box");
        this.headerTable = this.scrollHeaderBox.children("table");
        this.bodyTable = this.scrollBody.children("table");
        this.footerTable = this.scrollFooter.children("table");
        this.colgroup = this.scrollBody.find("> table > colgroup");
        this.footerCols = this.scrollFooter.find("> .ui-datatable-scrollable-footer-box > table > tfoot > tr > td");
        this.percentageScrollHeight = this.cfg.scrollHeight && (this.cfg.scrollHeight.indexOf("%") !== -1);
        this.percentageScrollWidth = this.cfg.scrollWidth && (this.cfg.scrollWidth.indexOf("%") !== -1);
        var c = this,
            b = this.getScrollbarWidth() + "px";
        if (this.cfg.scrollHeight) {
            this.scrollHeaderBox.css("margin-right", b);
            this.scrollFooterBox.css("margin-right", b);
            if (this.percentageScrollHeight) {
                this.adjustScrollHeight()
            }
        }
        this.alignScrollBody();
        this.fixColumnWidths();
        if (this.cfg.scrollWidth) {
            if (this.percentageScrollWidth) {
                this.adjustScrollWidth()
            } else {
                this.setScrollWidth(this.cfg.scrollWidth)
            }
        }
        this.restoreScrollState();
        if (this.cfg.liveScroll) {
            this.scrollOffset = this.cfg.scrollStep;
            this.shouldLiveScroll = true
        }
        this.scrollBody.on("scroll.dataTable", function() {
            var g = c.scrollBody.scrollLeft();
            c.scrollHeaderBox.css("margin-left", -g);
            c.scrollFooterBox.css("margin-left", -g);
            if (c.shouldLiveScroll) {
                var f = this.scrollTop,
                    e = this.scrollHeight,
                    d = this.clientHeight;
                if (f >= (e - (d))) {
                    c.loadLiveRows()
                }
            }
            c.saveScrollState()
        });
        this.scrollHeader.on("scroll.dataTable", function() {
            c.scrollHeader.scrollLeft(0)
        });
        this.scrollFooter.on("scroll.dataTable", function() {
            c.scrollFooter.scrollLeft(0)
        });
        var a = "resize." + this.id;
        $(window).unbind(a).bind(a, function() {
            if (c.jq.is(":visible")) {
                if (c.percentageScrollHeight) {
                    c.adjustScrollHeight()
                }
                if (c.percentageScrollWidth) {
                    c.adjustScrollWidth()
                }
            }
        })
    },
    adjustScrollHeight: function() {
        var d = this.jq.parent().innerHeight() * (parseInt(this.cfg.scrollHeight) / 100),
            f = this.jq.children(".ui-datatable-header").outerHeight(true),
            b = this.jq.children(".ui-datatable-footer").outerHeight(true),
            c = (this.scrollHeader.outerHeight(true) + this.scrollFooter.outerHeight(true)),
            e = this.paginator ? this.paginator.getContainerHeight(true) : 0,
            a = (d - (c + e + f + b));
        this.scrollBody.height(a)
    },
    adjustScrollWidth: function() {
        var a = parseInt((this.jq.parent().innerWidth() * (parseInt(this.cfg.scrollWidth) / 100)));
        this.setScrollWidth(a)
    },
    setScrollWidth: function(a) {
        this.scrollHeader.width(a);
        this.scrollBody.css("margin-right", 0).width(a);
        this.scrollFooter.width(a)
    },
    getScrollbarWidth: function() {
        if (!this.scrollbarWidth) {
            this.scrollbarWidth = $.browser.webkit ? "15" : PrimeFaces.calculateScrollbarWidth()
        }
        return this.scrollbarWidth
    },
    alignScrollBody: function() {
        var b = (this.cfg.scrollHeight && this.bodyTable.outerHeight() > this.scrollBody.outerHeight()),
            a = b ? "0px" : this.getScrollbarWidth() + "px";
        this.scrollBody.css("margin-right", a)
    },
    restoreScrollState: function() {
        var a = this.scrollStateHolder.val(),
            b = a.split(",");
        this.scrollBody.scrollLeft(b[0]);
        this.scrollBody.scrollTop(b[1])
    },
    saveScrollState: function() {
        var a = this.scrollBody.scrollLeft() + "," + this.scrollBody.scrollTop();
        this.scrollStateHolder.val(a)
    },
    fixColumnWidths: function() {
        var a = this;
        if (!this.columnWidthsFixed) {
            if (PrimeFaces.isIE(7)) {
                this.bodyTable.css("width", "auto")
            }
            if (this.cfg.scrollable) {
                this.scrollHeader.find("> .ui-datatable-scrollable-header-box > table > thead > tr > th").each(function() {
                    var g = $(this),
                        c = g.index(),
                        e = g.width(),
                        b = g.innerWidth(),
                        d = PrimeFaces.isIE(7) ? e : b + 1;
                    g.width(e);
                    a.colgroup.children().eq(c).width(d);
                    if (a.footerCols.length > 0) {
                        var f = a.footerCols.eq(c);
                        f.width(e)
                    }
                })
            } else {
                this.jq.find("> .ui-datatable-tablewrapper > table > thead > tr > th").each(function() {
                    var b = $(this);
                    b.width(b.width())
                })
            }
            this.columnWidthsFixed = true
        }
    },
    loadLiveRows: function() {
        var b = this,
            a = {
                source: this.id,
                process: this.id,
                update: this.id,
                formId: this.cfg.formId,
                params: [{
                    name: this.id + "_scrolling",
                    value: true
                }, {
                    name: this.id + "_skipChildren",
                    value: true
                }, {
                    name: this.id + "_scrollOffset",
                    value: this.scrollOffset
                }, {
                    name: this.id + "_encodeFeature",
                    value: true
                }],
                onsuccess: function(e, c, d) {
                    PrimeFaces.ajax.Response.handle(e, c, d, {
                        widget: b,
                        handle: function(g) {
                            var f = $(this.jqId + " .ui-datatable-scrollable-body table tr:last");
                            f.after(g);
                            this.scrollOffset += this.cfg.scrollStep;
                            if (this.scrollOffset === this.cfg.scrollLimit) {
                                this.shouldLiveScroll = false
                            }
                        }
                    });
                    return true
                }
            };
        PrimeFaces.ajax.Request.handle(a)
    },
    paginate: function(d) {
        var c = this,
            b = {
                source: this.id,
                update: this.id,
                process: this.id,
                formId: this.cfg.formId,
                params: [{
                    name: this.id + "_pagination",
                    value: true
                }, {
                    name: this.id + "_first",
                    value: d.first
                }, {
                    name: this.id + "_rows",
                    value: d.rows
                }, {
                    name: this.id + "_encodeFeature",
                    value: true
                }],
                onsuccess: function(g, e, f) {
                    PrimeFaces.ajax.Response.handle(g, e, f, {
                        widget: c,
                        handle: function(h) {
                            this.updateData(h);
                            if (this.checkAllToggler) {
                                this.updateHeaderCheckbox()
                            }
                            if (this.cfg.scrollable) {
                                this.alignScrollBody()
                            }
                        }
                    });
                    return true
                },
                oncomplete: function() {
                    c.paginator.cfg.page = d.page;
                    c.paginator.updateUI()
                },
            };
        if (this.hasBehavior("page")) {
            var a = this.cfg.behaviors.page;
            a.call(this, b)
        } else {
            PrimeFaces.ajax.Request.handle(b)
        }
    },
    sort: function(d, a, f) {
        var e = this,
            b = {
                source: this.id,
                update: this.id,
                process: this.id,
                params: [{
                    name: this.id + "_sorting",
                    value: true
                }, {
                    name: this.id + "_skipChildren",
                    value: true
                }, {
                    name: this.id + "_encodeFeature",
                    value: true
                }],
                onsuccess: function(i, g, h) {
                    PrimeFaces.ajax.Response.handle(i, g, h, {
                        widget: e,
                        handle: function(j) {
                            this.updateData(j);
                            var l = e.getPaginator();
                            if (l) {
                                l.setPage(0, true)
                            }
                            if (!f) {
                                this.sortableColumns.filter(".ui-state-active").data("sortorder", this.SORT_ORDER.UNSORTED).removeClass("ui-state-active").find(".ui-sortable-column-icon").removeClass("ui-icon-triangle-1-n ui-icon-triangle-1-s")
                            }
                            d.data("sortorder", a).removeClass("ui-state-hover").addClass("ui-state-active");
                            var k = d.find(".ui-sortable-column-icon");
                            if (a === this.SORT_ORDER.DESCENDING) {
                                k.removeClass("ui-icon-triangle-1-n").addClass("ui-icon-triangle-1-s")
                            } else {
                                if (a === this.SORT_ORDER.ASCENDING) {
                                    k.removeClass("ui-icon-triangle-1-s").addClass("ui-icon-triangle-1-n")
                                }
                            }
                        }
                    });
                    return true
                },
                oncomplete: function(i, g, h) {
                    var j = e.getPaginator();
                    if (j && h && j.cfg.rowCount !== h.totalRecords) {
                        j.setTotalRecords(h.totalRecords)
                    }
                }
            };
        if (f) {
            b.params.push({
                name: this.id + "_multiSorting",
                value: true
            });
            b.params.push({
                name: this.id + "_sortKey",
                value: e.joinSortMetaOption("col")
            });
            b.params.push({
                name: this.id + "_sortDir",
                value: e.joinSortMetaOption("order")
            })
        } else {
            b.params.push({
                name: this.id + "_sortKey",
                value: d.attr("id")
            });
            b.params.push({
                name: this.id + "_sortDir",
                value: a
            })
        }
        if (this.hasBehavior("sort")) {
            var c = this.cfg.behaviors.sort;
            c.call(this, b)
        } else {
            PrimeFaces.ajax.Request.handle(b)
        }
    },
    joinSortMetaOption: function(b) {
        var c = "";
        for (var a = 0; a < this.sortMeta.length; a++) {
            c += this.sortMeta[a][b];
            if (a !== (this.sortMeta.length - 1)) {
                c += ","
            }
        }
        return c
    },
    filter: function() {
        var c = this,
            a = {
                source: this.id,
                update: this.id,
                process: this.id,
                formId: this.cfg.formId,
                params: [{
                    name: this.id + "_filtering",
                    value: true
                }, {
                    name: this.id + "_encodeFeature",
                    value: true
                }],
                onsuccess: function(f, d, e) {
                    PrimeFaces.ajax.Response.handle(f, d, e, {
                        widget: c,
                        handle: function(g) {
                            this.updateData(g);
                            if (this.cfg.scrollable) {
                                this.alignScrollBody()
                            }
                            if (this.isCheckboxSelectionEnabled()) {
                                this.updateHeaderCheckbox()
                            }
                        }
                    });
                    return true
                },
                oncomplete: function(f, d, e) {
                    var g = c.getPaginator();
                    if (g) {
                        g.setTotalRecords(e.totalRecords)
                    }
                }
            };
        if (this.hasBehavior("filter")) {
            var b = this.cfg.behaviors.filter;
            b.call(this, a)
        } else {
            PrimeFaces.ajax.AjaxRequest(a)
        }
    },
    onRowClick: function(e, d, a) {
        if ($(e.target).is("td,span:not(.ui-c)")) {
            var g = $(d),
                c = g.hasClass("ui-state-highlight"),
                f = e.metaKey || e.ctrlKey,
                b = e.shiftKey;
            if (c && f) {
                this.unselectRow(g, a)
            } else {
                if (this.isSingleSelection() || (this.isMultipleSelection() && e && !f && !b && this.cfg.rowSelectMode === "new")) {
                    this.unselectAllRows()
                }
                if (this.isMultipleSelection() && e && e.shiftKey) {
                    this.selectRowsInRange(g)
                } else {
                    this.originRowIndex = g.index();
                    this.cursorIndex = null;
                    this.selectRow(g, a)
                }
            }
            PrimeFaces.clearSelection()
        }
    },
    onRowDblclick: function(a, c) {
        PrimeFaces.clearSelection();
        if ($(a.target).is("td,span:not(.ui-c)")) {
            var b = this.getRowMeta(c);
            this.fireRowSelectEvent(b.key, "rowDblselect")
        }
    },
    findRow: function(a) {
        var b = a;
        if (PrimeFaces.isNumber(a)) {
            b = this.tbody.children("tr:eq(" + a + ")")
        }
        return b
    },
    selectRowsInRange: function(f) {
        var c = this.tbody.children(),
            e = this.getRowMeta(f),
            d = this;
        if (this.cursorIndex !== null) {
            var g = this.cursorIndex,
                a = g > this.originRowIndex ? c.slice(this.originRowIndex, g + 1) : c.slice(g, this.originRowIndex + 1);
            a.each(function(h, j) {
                d.unselectRow($(j), true)
            })
        }
        this.cursorIndex = f.index();
        var b = this.cursorIndex > this.originRowIndex ? c.slice(this.originRowIndex, this.cursorIndex + 1) : c.slice(this.cursorIndex, this.originRowIndex + 1);
        b.each(function(h, j) {
            d.selectRow($(j), true)
        });
        this.fireRowSelectEvent(e.key, "rowSelect")
    },
    selectRow: function(b, a) {
        var d = this.findRow(b),
            c = this.getRowMeta(d);
        this.highlightRow(d);
        if (this.isCheckboxSelectionEnabled()) {
            if (this.cfg.nativeElements) {
                d.children("td.ui-selection-column").find(":checkbox").prop("checked", true)
            } else {
                this.selectCheckbox(d.children("td.ui-selection-column").find("> div.ui-chkbox > div.ui-chkbox-box"))
            }
            this.updateHeaderCheckbox()
        }
        this.addSelection(c.key);
        this.writeSelections();
        if (!a) {
            this.fireRowSelectEvent(c.key, "rowSelect")
        }
    },
    unselectRow: function(b, a) {
        var d = this.findRow(b),
            c = this.getRowMeta(d);
        this.unhighlightRow(d);
        if (this.isCheckboxSelectionEnabled()) {
            if (this.cfg.nativeElements) {
                d.children("td.ui-selection-column").find(":checkbox").prop("checked", false)
            } else {
                this.unselectCheckbox(d.children("td.ui-selection-column").find("> div.ui-chkbox > div.ui-chkbox-box"))
            }
            this.updateHeaderCheckbox()
        }
        this.removeSelection(c.key);
        this.writeSelections();
        if (!a) {
            this.fireRowUnselectEvent(c.key, "rowUnselect")
        }
    },
    highlightRow: function(a) {
        a.removeClass("ui-state-hover").addClass("ui-state-highlight").attr("aria-selected", true)
    },
    unhighlightRow: function(a) {
        a.removeClass("ui-state-highlight").attr("aria-selected", false)
    },
    fireRowSelectEvent: function(d, a) {
        if (this.cfg.behaviors) {
            var c = this.cfg.behaviors[a];
            if (c) {
                var b = {
                    params: [{
                        name: this.id + "_instantSelectedRowKey",
                        value: d
                    }]
                };
                c.call(this, b)
            }
        }
    },
    fireRowUnselectEvent: function(d, b) {
        if (this.cfg.behaviors) {
            var a = this.cfg.behaviors[b];
            if (a) {
                var c = {
                    params: [{
                        name: this.id + "_instantUnselectedRowKey",
                        value: d
                    }]
                };
                a.call(this, c)
            }
        }
    },
    selectRowWithRadio: function(a) {
        var d = a.closest("tr"),
            c = this.getRowMeta(d);
        this.selection = [];
        if (this.currentRadio) {
            var b = this.currentRadio.closest("tr.ui-state-highlight");
            this.unhighlightRow(b);
            if (this.cfg.nativeElements) {
                this.currentRadio.prop("checked", false)
            } else {
                b.find("td.ui-selection-column .ui-radiobutton .ui-radiobutton-box").removeClass("ui-state-active").children("span.ui-radiobutton-icon").addClass("ui-icon-blank").removeClass("ui-icon-bullet");
                this.currentRadio.prev().children("input").prop("checked", false)
            }
        }
        this.currentRadio = a;
        if (!this.cfg.nativeElements) {
            if (!a.hasClass("ui-state-focus")) {
                a.addClass("ui-state-active")
            }
            a.children(".ui-radiobutton-icon").addClass("ui-icon-bullet").removeClass("ui-icon-blank");
            a.prev().children("input").attr("checked", "checked")
        }
        this.highlightRow(d);
        this.addSelection(c.key);
        this.writeSelections();
        this.fireRowSelectEvent(c.key, "rowSelectRadio")
    },
    selectRowWithCheckbox: function(b, a) {
        var d = b.closest("tr"),
            c = this.getRowMeta(d);
        this.highlightRow(d);
        if (!this.cfg.nativeElements) {
            this.selectCheckbox(b)
        }
        this.addSelection(c.key);
        this.updateHeaderCheckbox();
        this.writeSelections();
        if (!a) {
            this.fireRowSelectEvent(c.key, "rowSelectCheckbox")
        }
    },
    unselectRowWithCheckbox: function(b, a) {
        var d = b.closest("tr"),
            c = this.getRowMeta(d);
        this.unhighlightRow(d);
        if (!this.cfg.nativeElements) {
            this.unselectCheckbox(b)
        }
        this.removeSelection(c.key);
        this.uncheckHeaderCheckbox();
        this.writeSelections();
        if (!a) {
            this.fireRowUnselectEvent(c.key, "rowUnselectCheckbox")
        }
    },
    unselectAllRows: function() {
        var c = this.tbody.children("tr.ui-state-highlight"),
            a = this.isCheckboxSelectionEnabled();
        for (var b = 0; b < c.length; b++) {
            var d = c.eq(b);
            d.removeClass("ui-state-highlight").attr("aria-selected", false);
            if (a) {
                if (this.cfg.nativeElements) {
                    d.children("td.ui-selection-column").find(":checkbox").prop("checked", false)
                } else {
                    this.unselectCheckbox(d.children("td.ui-selection-column").find("> div.ui-chkbox > div.ui-chkbox-box"))
                }
            }
        }
        if (a) {
            this.uncheckHeaderCheckbox()
        }
        this.selection = [];
        this.writeSelections()
    },
    selectAllRowsOnPage: function() {
        var b = this.tbody.children("tr");
        for (var a = 0; a < b.length; a++) {
            var c = b.eq(a);
            this.selectRow(c, true)
        }
    },
    unselectAllRowsOnPage: function() {
        var b = this.tbody.children("tr");
        for (var a = 0; a < b.length; a++) {
            var c = b.eq(a);
            this.unselectRow(c, true)
        }
    },
    selectAllRows: function() {
        this.selectAllRowsOnPage();
        this.selection = new Array("@all");
        this.writeSelections()
    },
    toggleCheckAll: function() {
        if (this.cfg.nativeElements) {
            var d = this.tbody.find("> tr.ui-datatable-selectable > td.ui-selection-column > :checkbox"),
                c = this.checkAllToggler.prop("checked"),
                e = this;
            d.each(function() {
                if (c) {
                    var f = $(this);
                    f.prop("checked", true);
                    e.selectRowWithCheckbox(f, true)
                } else {
                    var f = $(this);
                    f.prop("checked", false);
                    e.unselectRowWithCheckbox(f, true)
                }
            })
        } else {
            var d = this.tbody.find("> tr.ui-datatable-selectable > td.ui-selection-column .ui-chkbox-box"),
                c = this.checkAllToggler.hasClass("ui-state-active"),
                e = this;
            if (c) {
                this.checkAllToggler.removeClass("ui-state-active").children("span.ui-chkbox-icon").removeClass("ui-icon ui-icon-check");
                d.each(function() {
                    e.unselectRowWithCheckbox($(this), true)
                })
            } else {
                this.checkAllToggler.addClass("ui-state-active").children("span.ui-chkbox-icon").addClass("ui-icon ui-icon-check");
                d.each(function() {
                    e.selectRowWithCheckbox($(this), true)
                })
            }
        }
        this.writeSelections();
        if (this.cfg.behaviors) {
            var a = this.cfg.behaviors.toggleSelect;
            if (a) {
                var b = {
                    params: [{
                        name: this.id + "_checked",
                        value: !c
                    }]
                };
                a.call(this, b)
            }
        }
    },
    selectCheckbox: function(a) {
        if (!a.hasClass("ui-state-focus")) {
            a.addClass("ui-state-active")
        }
        a.children("span.ui-chkbox-icon:first").addClass("ui-icon ui-icon-check");
        a.prev().children("input").prop("checked", true)
    },
    unselectCheckbox: function(a) {
        a.removeClass("ui-state-active");
        a.children("span.ui-chkbox-icon:first").removeClass("ui-icon ui-icon-check");
        a.prev().children("input").prop("checked", false)
    },
    toggleExpansion: function(b) {
        var d = b.closest("tr"),
            e = this.getRowMeta(d).index,
            a = b.hasClass("ui-icon-circle-triangle-s"),
            c = this;
        if ($.inArray(e, this.expansionProcess) === -1) {
            this.expansionProcess.push(e);
            if (a) {
                b.addClass("ui-icon-circle-triangle-e").removeClass("ui-icon-circle-triangle-s");
                this.collapseRow(d);
                c.expansionProcess = $.grep(c.expansionProcess, function(f) {
                    return (f !== e)
                });
                this.fireRowCollapseEvent(d)
            } else {
                if (this.cfg.rowExpandMode === "single") {
                    this.collapseAllRows()
                }
                d.addClass("ui-expanded-row");
                b.addClass("ui-icon-circle-triangle-s").removeClass("ui-icon-circle-triangle-e");
                this.loadExpandedRowContent(d)
            }
        }
    },
    loadExpandedRowContent: function(d) {
        var c = this,
            e = this.getRowMeta(d).index,
            a = {
                source: this.id,
                process: this.id,
                update: this.id,
                formId: this.cfg.formId,
                params: [{
                    name: this.id + "_rowExpansion",
                    value: true
                }, {
                    name: this.id + "_expandedRowIndex",
                    value: e
                }, {
                    name: this.id + "_encodeFeature",
                    value: true
                }, {
                    name: this.id + "_skipChildren",
                    value: true
                }],
                onsuccess: function(h, f, g) {
                    PrimeFaces.ajax.Response.handle(h, f, g, {
                        widget: c,
                        handle: function(i) {
                            this.displayExpandedRow(d, i)
                        }
                    });
                    return true
                },
                oncomplete: function() {
                    c.expansionProcess = $.grep(c.expansionProcess, function(f) {
                        return f !== e
                    })
                }
            };
        if (this.hasBehavior("rowToggle")) {
            var b = this.cfg.behaviors.rowToggle;
            b.call(this, a)
        } else {
            PrimeFaces.ajax.AjaxRequest(a)
        }
    },
    displayExpandedRow: function(b, a) {
        b.after(a);
        b.next().fadeIn()
    },
    fireRowCollapseEvent: function(c) {
        var d = this.getRowMeta(c).index;
        if (this.hasBehavior("rowToggle")) {
            var a = {
                params: [{
                    name: this.id + "_collapsedRowIndex",
                    value: d
                }]
            };
            var b = this.cfg.behaviors.rowToggle;
            b.call(this, a)
        }
    },
    collapseRow: function(a) {
        a.removeClass("ui-expanded-row").next().remove()
    },
    collapseAllRows: function() {
        var a = this;
        this.getExpandedRows().each(function() {
            var f = $(this);
            a.collapseRow(f);
            var c = f.children("td");
            for (var b = 0; b < c.length; b++) {
                var d = c.eq(b),
                    e = d.children(".ui-row-toggler");
                if (e.length > 0) {
                    e.addClass("ui-icon-circle-triangle-e").removeClass("ui-icon-circle-triangle-s");
                    break
                }
            }
        })
    },
    getExpandedRows: function() {
        return this.tbody.children(".ui-expanded-row")
    },
    bindEditEvents: function() {
        var c = this;
        this.cfg.cellSeparator = this.cfg.cellSeparator || " ";
        if (this.cfg.editMode === "row") {
            var a = "> tr > td > div.ui-row-editor";
            this.tbody.off("click.datatable", a).on("click.datatable", a, null, function(f) {
                var d = $(f.target),
                    g = d.closest("tr");
                if (d.hasClass("ui-icon-pencil")) {
                    c.switchToRowEdit(g);
                    d.hide().siblings().show()
                } else {
                    if (d.hasClass("ui-icon-check")) {
                        c.saveRowEdit(g)
                    } else {
                        if (d.hasClass("ui-icon-close")) {
                            c.cancelRowEdit(g)
                        }
                    }
                }
            })
        } else {
            if (this.cfg.editMode === "cell") {
                var b = "> tr > td.ui-editable-column";
                this.tbody.off("click.datatable-cell", b).on("click.datatable-cell", b, null, function(f) {
                    c.incellClick = true;
                    var d = $(this);
                    if (!d.hasClass("ui-cell-editing")) {
                        c.showCellEditor($(this))
                    }
                });
                $(document).off("click.datatable-cell-blur" + this.id).on("click.datatable-cell-blur" + this.id, function(d) {
                    if (!c.incellClick && c.currentCell && !c.contextMenuClick) {
                        c.saveCell(c.currentCell)
                    }
                    c.incellClick = false;
                    c.contextMenuClick = false
                })
            }
        }
    },
    switchToRowEdit: function(c) {
        this.showRowEditors(c);
        if (this.hasBehavior("rowEditInit")) {
            var b = this.cfg.behaviors.rowEditInit,
                d = this.getRowMeta(c).index;
            var a = {
                params: [{
                    name: this.id + "_rowEditIndex",
                    value: d
                }]
            };
            b.call(this, a)
        }
    },
    showRowEditors: function(a) {
        a.addClass("ui-state-highlight ui-row-editing").children("td.ui-editable-column").each(function() {
            var b = $(this);
            b.find(".ui-cell-editor-output").hide();
            b.find(".ui-cell-editor-input").show()
        })
    },
    showCellEditor: function(g) {
        this.incellClick = true;
        var k = null,
            h = this;
        if (g) {
            k = g;
            if (this.contextMenuCell) {
                this.contextMenuCell.parent().removeClass("ui-state-highlight")
            }
        } else {
            k = this.contextMenuCell
        }
        if (this.currentCell) {
            h.saveCell(this.currentCell)
        }
        this.currentCell = k;
        var b = k.children("div.ui-cell-editor"),
            a = b.children("div.ui-cell-editor-output"),
            l = b.children("div.ui-cell-editor-input"),
            e = l.find(":input:enabled"),
            f = e.length > 1;
        k.addClass("ui-state-highlight ui-cell-editing");
        a.hide();
        l.show();
        e.eq(0).focus().select();
        if (f) {
            var j = [];
            for (var d = 0; d < e.length; d++) {
                j.push(e.eq(d).val())
            }
            k.data("multi-edit", true);
            k.data("old-value", j)
        } else {
            k.data("multi-edit", false);
            k.data("old-value", e.eq(0).val())
        }
        if (!k.data("edit-events-bound")) {
            k.data("edit-events-bound", true);
            e.on("keydown.datatable-cell", function(o) {
                var n = $.ui.keyCode,
                    m = o.shiftKey,
                    i = o.which,
                    c = $(this);
                if (i === n.ENTER || i == n.NUMPAD_ENTER) {
                    h.saveCell(k);
                    o.preventDefault()
                } else {
                    if (i === n.TAB) {
                        if (f) {
                            var p = m ? c.index() - 1 : c.index() + 1;
                            if (p < 0 || (p === e.length)) {
                                h.tabCell(k, !m)
                            } else {
                                e.eq(p).focus()
                            }
                        } else {
                            h.tabCell(k, !m)
                        }
                        o.preventDefault()
                    }
                }
            })
        }
    },
    tabCell: function(a, d) {
        var b = d ? a.next() : a.prev();
        if (b.length == 0) {
            var c = d ? a.parent().next() : a.parent().prev();
            b = d ? c.children("td.ui-editable-column:first") : c.children("td.ui-editable-column:last")
        }
        this.showCellEditor(b)
    },
    saveCell: function(a) {
        var c = a.find("div.ui-cell-editor-input :input:enabled"),
            f = false,
            e = this;
        if (a.data("multi-edit")) {
            var b = a.data("old-value");
            for (var d = 0; d < c.length; d++) {
                if (c.eq(d).val() != b[d]) {
                    f = true;
                    break
                }
            }
        } else {
            f = (c.eq(0).val() != a.data("old-value"))
        }
        if (f) {
            e.doCellEditRequest(a)
        } else {
            e.viewMode(a)
        }
        this.currentCell = null
    },
    viewMode: function(a) {
        var b = a.children("div.ui-cell-editor"),
            d = b.children("div.ui-cell-editor-input"),
            c = b.children("div.ui-cell-editor-output");
        a.removeClass("ui-cell-editing ui-state-error ui-state-highlight");
        c.show();
        d.hide();
        a.removeData("old-value").removeData("multi-edit")
    },
    doCellEditRequest: function(a) {
        var h = this.getRowMeta(a.closest("tr")),
            e = a.children(".ui-cell-editor"),
            f = e.attr("id"),
            d = a.index(),
            c = h.index + "," + d,
            g = this;
        var b = {
            source: this.id,
            process: this.id,
            update: this.id,
            params: [{
                name: this.id + "_encodeFeature",
                value: true
            }, {
                name: this.id + "_cellInfo",
                value: c
            }, {
                name: f,
                value: f
            }],
            onsuccess: function(k, i, j) {
                PrimeFaces.ajax.Response.handle(k, i, j, {
                    widget: g,
                    handle: function(l) {
                        e.children(".ui-cell-editor-output").html(l)
                    }
                });
                return true
            },
            oncomplete: function(k, i, j) {
                if (j.validationFailed) {
                    a.addClass("ui-state-error")
                } else {
                    g.viewMode(a)
                }
            }
        };
        if (this.hasBehavior("cellEdit")) {
            this.cfg.behaviors.cellEdit.call(this, b)
        } else {
            PrimeFaces.ajax.Request.handle(b)
        }
    },
    saveRowEdit: function(a) {
        this.doRowEditRequest(a, "save")
    },
    cancelRowEdit: function(a) {
        this.doRowEditRequest(a, "cancel")
    },
    doRowEditRequest: function(a, d) {
        var f = a.closest("tr"),
            g = this.getRowMeta(f).index,
            b = f.hasClass("ui-expanded-row"),
            e = this,
            c = {
                source: this.id,
                process: this.id,
                update: this.id,
                formId: this.cfg.formId,
                params: [{
                    name: this.id + "_rowEditIndex",
                    value: this.getRowMeta(f).index
                }, {
                    name: this.id + "_rowEditAction",
                    value: d
                }, {
                    name: this.id + "_encodeFeature",
                    value: true
                }],
                onsuccess: function(j, h, i) {
                    PrimeFaces.ajax.Response.handle(j, h, i, {
                        widget: e,
                        handle: function(k) {
                            if (b) {
                                this.collapseRow(f)
                            }
                            this.updateRow(f, k)
                        }
                    });
                    return true
                },
                oncomplete: function(j, h, i) {
                    if (i && i.validationFailed) {
                        e.invalidateRow(g)
                    }
                }
            };
        if (d === "save") {
            this.getRowEditors(f).each(function() {
                c.params.push({
                    name: this.id,
                    value: this.id
                })
            })
        }
        if (d === "save" && this.hasBehavior("rowEdit")) {
            this.cfg.behaviors.rowEdit.call(this, c)
        } else {
            if (d === "cancel" && this.hasBehavior("rowEditCancel")) {
                this.cfg.behaviors.rowEditCancel.call(this, c)
            } else {
                PrimeFaces.ajax.Request.handle(c)
            }
        }
    },
    updateRow: function(b, a) {
        b.replaceWith(a)
    },
    invalidateRow: function(a) {
        this.tbody.children("tr").eq(a).addClass("ui-widget-content ui-row-editing ui-state-error")
    },
    getRowEditors: function(a) {
        return a.find("div.ui-cell-editor")
    },
    getPaginator: function() {
        return this.paginator
    },
    writeSelections: function() {
        $(this.selectionHolder).val(this.selection.join(","))
    },
    isSingleSelection: function() {
        return this.cfg.selectionMode == "single"
    },
    isMultipleSelection: function() {
        return this.cfg.selectionMode == "multiple" || this.isCheckboxSelectionEnabled()
    },
    clearSelection: function() {
        this.selection = [];
        $(this.selectionHolder).val("")
    },
    isSelectionEnabled: function() {
        return this.cfg.selectionMode != undefined || this.cfg.columnSelectionMode != undefined
    },
    isCheckboxSelectionEnabled: function() {
        return this.cfg.selectionMode === "checkbox"
    },
    clearFilters: function() {
        this.thead.find("> tr > th.ui-filter-column > .ui-column-filter").val("");
        $(this.jqId + "\\:globalFilter").val("");
        this.filter()
    },
    setupResizableColumns: function() {
        this.fixColumnWidths();
        if (!this.cfg.liveResize) {
            this.resizerHelper = $('<div class="ui-column-resizer-helper ui-state-highlight"></div>').appendTo(this.jq)
        }
        this.addResizers();
        var a = this.thead.find("> tr > th > span.ui-column-resizer"),
            b = this;
        a.draggable({
            axis: "x",
            start: function() {
                if (b.cfg.liveResize) {
                    b.jq.css("cursor", "col-resize")
                } else {
                    var c = b.cfg.scrollable ? b.scrollBody.height() : b.thead.parent().height() - b.thead.height() - 1;
                    b.resizerHelper.height(c);
                    b.resizerHelper.show()
                }
            },
            drag: function(c, d) {
                if (b.cfg.liveResize) {
                    b.resize(c, d)
                } else {
                    b.resizerHelper.offset({
                        left: d.helper.offset().left + d.helper.width() / 2,
                        top: b.thead.offset().top + b.thead.height()
                    })
                }
            },
            stop: function(d, f) {
                var e = f.helper.parent();
                f.helper.css("left", "");
                if (b.cfg.liveResize) {
                    b.jq.css("cursor", "default")
                } else {
                    b.resize(d, f);
                    b.resizerHelper.hide()
                }
                var c = {
                    source: b.id,
                    process: b.id,
                    params: [{
                        name: b.id + "_colResize",
                        value: true
                    }, {
                        name: b.id + "_columnId",
                        value: e.attr("id")
                    }, {
                        name: b.id + "_width",
                        value: e.width()
                    }, {
                        name: b.id + "_height",
                        value: e.height()
                    }]
                };
                if (b.hasBehavior("colResize")) {
                    b.cfg.behaviors.colResize.call(b, c)
                }
            },
            containment: this.jq
        })
    },
    addResizers: function() {
        this.thead.find("> tr > th.ui-resizable-column").prepend('<span class="ui-column-resizer">&nbsp;</span>').filter(":last-child").children("span.ui-column-resizer").hide()
    },
    resize: function(a, i) {
        var c = i.helper.parent(),
            e = c.next(),
            h = null,
            d = null,
            f = null;
        if (this.cfg.liveResize) {
            h = c.outerWidth() - (a.pageX - c.offset().left), d = (c.width() - h), f = (e.width() + h)
        } else {
            h = (i.position.left - i.originalPosition.left), d = (c.width() + h), f = (e.width() - h)
        }
        if (d > 15 && f > 15) {
            c.width(d);
            e.width(f);
            var k = c.index();
            if (this.cfg.scrollable) {
                var j = c.innerWidth() - c.width();
                this.colgroup.children().eq(k).css("width", d + j + 1 + "px");
                this.colgroup.children().eq(k + 1).css("width", f + j + 1 + "px");
                if (this.footerCols.length > 0) {
                    var g = this.footerCols.eq(k),
                        b = g.next();
                    g.width(d);
                    b.width(f)
                }
            }
        }
    },
    hasBehavior: function(a) {
        if (this.cfg.behaviors) {
            return this.cfg.behaviors[a] != undefined
        }
        return false
    },
    removeSelection: function(a) {
        this.selection = $.grep(this.selection, function(b) {
            return b != a
        })
    },
    addSelection: function(a) {
        if (!this.isSelected(a)) {
            this.selection.push(a)
        }
    },
    isSelected: function(a) {
        return PrimeFaces.inArray(this.selection, a)
    },
    getRowMeta: function(b) {
        var a = {
            index: b.data("ri"),
            key: b.attr("data-rk")
        };
        return a
    },
    setupDraggableColumns: function() {
        this.orderStateHolder = $(this.jqId + "_columnOrder");
        this.saveColumnOrder();
        this.dragIndicatorTop = $('<div id="' + this.id + '_dnd_top" class="ui-column-dnd-top"><span class="ui-icon ui-icon-arrowthick-1-s" /></div>').appendTo(document.body);
        this.dragIndicatorBottom = $('<div id="' + this.id + '_dnd_bottom" class="ui-column-dnd-bottom"><span class="ui-icon ui-icon-arrowthick-1-n" /></div>').appendTo(document.body);
        var a = this;
        $(this.jqId + " thead th").draggable({
            appendTo: "body",
            opacity: 0.75,
            cursor: "move",
            scope: this.id,
            cancel: ":input,.ui-column-resizer",
            drag: function(e, g) {
                var i = g.helper.data("droppable-column");
                if (i) {
                    var d = i.offset(),
                        b = d.top - 10,
                        c = d.top + i.height() + 8,
                        f = null;
                    if (e.originalEvent.pageX >= d.left + (i.width() / 2)) {
                        var h = i.next();
                        if (h.length == 1) {
                            f = h.offset().left - 9
                        } else {
                            f = i.offset().left + i.innerWidth() - 9
                        }
                        g.helper.data("drop-location", 1)
                    } else {
                        f = d.left - 9;
                        g.helper.data("drop-location", -1)
                    }
                    a.dragIndicatorTop.offset({
                        left: f,
                        top: b
                    }).show();
                    a.dragIndicatorBottom.offset({
                        left: f,
                        top: c
                    }).show()
                }
            },
            stop: function(b, c) {
                a.dragIndicatorTop.css({
                    left: 0,
                    top: 0
                }).hide();
                a.dragIndicatorBottom.css({
                    left: 0,
                    top: 0
                }).hide()
            },
            helper: function() {
                var c = $(this),
                    b = $('<div class="ui-widget ui-state-default" style="padding:4px 10px;text-align:center;"></div>');
                b.width(c.width());
                b.height(c.height());
                b.html(c.html());
                return b.get(0)
            }
        }).droppable({
            hoverClass: "ui-state-highlight",
            tolerance: "pointer",
            scope: this.id,
            over: function(b, c) {
                c.helper.data("droppable-column", $(this))
            },
            drop: function(g, h) {
                var c = h.draggable,
                    f = h.helper.data("drop-location"),
                    e = $(this);
                var b = a.tbody.find("> tr > td:nth-child(" + (c.index() + 1) + ")"),
                    d = a.tbody.find("> tr > td:nth-child(" + (e.index() + 1) + ")");
                if (f > 0) {
                    if (a.cfg.resizableColumns) {
                        if (e.next().length == 0) {
                            e.children("span.ui-column-resizer").show();
                            c.children("span.ui-column-resizer").hide()
                        }
                    }
                    c.insertAfter(e);
                    b.each(function(j, k) {
                        $(this).insertAfter(d.eq(j))
                    })
                } else {
                    c.insertBefore(e);
                    b.each(function(j, k) {
                        $(this).insertBefore(d.eq(j))
                    })
                }
                if (a.cfg.scrollable) {
                    a.columnWidthsFixed = false;
                    a.fixColumnWidths()
                }
                a.saveColumnOrder();
                if (a.cfg.behaviors) {
                    var i = a.cfg.behaviors.colReorder;
                    if (i) {
                        i.call(a)
                    }
                }
            }
        })
    },
    saveColumnOrder: function() {
        var a = [],
            b = $(this.jqId + " thead:first th");
        b.each(function(c, d) {
            a.push($(d).attr("id"))
        });
        this.orderStateHolder.val(a.join(","))
    },
    makeRowsDraggable: function() {
        var a = this;
        this.tbody.sortable({
            placeholder: "ui-datatable-rowordering ui-state-active",
            cursor: "move",
            handle: "td,span:not(.ui-c)",
            appendTo: document.body,
            helper: function(g, h) {
                var d = h.children(),
                    f = $('<div class="ui-datatable ui-widget"><table><tbody></tbody></table></div>'),
                    c = h.clone(),
                    b = c.children();
                for (var e = 0; e < b.length; e++) {
                    b.eq(e).width(d.eq(e).width())
                }
                c.appendTo(f.find("tbody"));
                return f
            },
            update: function(d, e) {
                var c = e.item.data("ri"),
                    f = a.paginator ? a.paginator.getFirst() + e.item.index() : e.item.index();
                a.syncRowParity();
                var b = {
                    source: a.id,
                    process: a.id,
                    params: [{
                        name: a.id + "_rowreorder",
                        value: true
                    }, {
                        name: a.id + "_fromIndex",
                        value: c
                    }, {
                        name: a.id + "_toIndex",
                        value: f
                    }, {
                        name: this.id + "_skipChildren",
                        value: true
                    }]
                };
                if (a.hasBehavior("rowReorder")) {
                    a.cfg.behaviors.rowReorder.call(a, b)
                } else {
                    PrimeFaces.ajax.Request.handle(b)
                }
            }
        })
    },
    syncRowParity: function() {
        var b = this.tbody.children("tr.ui-widget-content"),
            d = this.paginator ? this.paginator.getFirst() : 0;
        for (var a = d; a < b.length; a++) {
            var c = b.eq(a);
            c.data("ri", a).removeClass("ui-datatable-even ui-datatable-odd");
            if (a % 2 === 0) {
                c.addClass("ui-datatable-even")
            } else {
                c.addClass("ui-datatable-odd")
            }
        }
    },
    isEmpty: function() {
        return this.tbody.children("tr.ui-datatable-empty-message").length === 1
    },
    getSelectedRowsCount: function() {
        return this.isSelectionEnabled() ? this.selection.length : 0
    },
    updateHeaderCheckbox: function() {
        if (this.isEmpty()) {
            this.uncheckHeaderCheckbox()
        } else {
            var b = null;
            if (this.cfg.nativeElements) {
                var a = this.tbody.find("> tr.ui-datatable-selectable > td.ui-selection-column > :checkbox");
                b = $.grep(a, function(c) {
                    return $(c).prop("checked")
                })
            } else {
                var a = this.tbody.find("> tr.ui-datatable-selectable > td.ui-selection-column .ui-chkbox-box");
                b = $.grep(a, function(c) {
                    return $(c).hasClass("ui-state-active")
                })
            }
            if (a.length > 0 && a.length === b.length) {
                this.checkHeaderCheckbox()
            } else {
                this.uncheckHeaderCheckbox()
            }
        }
    },
    checkHeaderCheckbox: function() {
        if (this.cfg.nativeElements) {
            this.checkAllToggler.prop("checked", true)
        } else {
            this.checkAllToggler.addClass("ui-state-active").children("span.ui-chkbox-icon").addClass("ui-icon ui-icon-check")
        }
    },
    uncheckHeaderCheckbox: function() {
        if (this.cfg.nativeElements) {
            this.checkAllToggler.prop("checked", false)
        } else {
            this.checkAllToggler.removeClass("ui-state-active").children("span.ui-chkbox-icon").removeClass("ui-icon ui-icon-check")
        }
    },
    setupStickyHeader: function() {
        var e = this.thead.parent().offset(),
            d = $(window),
            c = this,
            b = "scroll." + this.id;
        this.cloneContainer = $('<div class="ui-datatable ui-datatable-sticky ui-widget"><table></table></div>');
        this.clone = this.thead.clone(true);
        this.cloneContainer.children("table").append(this.clone);
        this.cloneContainer.css({
            position: "absolute",
            width: this.thead.parent().width(),
            top: e.top,
            left: e.left
        }).appendTo(document.body);
        var a = this.cloneContainer.offset();
        this.initialState = {
            top: a.top,
            bottom: a.top + this.tbody.height()
        };
        d.off(b).on(b, function() {
            var f = d.scrollTop();
            if (f > c.initialState.top) {
                if (!c.fixed) {
                    c.cloneContainer.css({
                        position: "fixed",
                        top: 0,
                        "z-index": ++PrimeFaces.zindex
                    }).addClass("ui-shadow ui-sticky");
                    c.fixed = true
                }
                if (f >= c.initialState.bottom) {
                    c.cloneContainer.hide()
                } else {
                    c.cloneContainer.show()
                }
            } else {
                if (c.fixed) {
                    c.cloneContainer.css({
                        position: "absolute",
                        top: c.initialState.top
                    }).removeClass("ui-shadow ui-sticky");
                    c.fixed = false
                }
            }
        })
    }
});
PrimeFaces.widget.FrozenDataTable = PrimeFaces.widget.DataTable.extend({
    setupScrolling: function() {
        this.scrollLayout = this.jq.find("> table > tbody > tr > td.ui-datatable-frozenlayout-right");
        this.frozenLayout = this.jq.find("> table > tbody > tr > td.ui-datatable-frozenlayout-left");
        this.scrollContainer = this.jq.find("> table > tbody > tr > td.ui-datatable-frozenlayout-right > .ui-datatable-scrollable-container");
        this.frozenContainer = this.jq.find("> table > tbody > tr > td.ui-datatable-frozenlayout-left > .ui-datatable-frozen-container");
        this.scrollHeader = this.scrollContainer.children(".ui-datatable-scrollable-header");
        this.scrollHeaderBox = this.scrollHeader.children("div.ui-datatable-scrollable-header-box");
        this.scrollBody = this.scrollContainer.children(".ui-datatable-scrollable-body");
        this.scrollFooter = this.scrollContainer.children(".ui-datatable-scrollable-footer");
        this.scrollFooterBox = this.scrollFooter.children("div.ui-datatable-scrollable-footer-box");
        this.scrollStateHolder = $(this.jqId + "_scrollState");
        this.scrollHeaderTable = this.scrollHeaderBox.children("table");
        this.scrollBodyTable = this.scrollBody.children("table");
        this.scrollThead = this.thead.eq(1);
        this.scrollTbody = this.tbody.eq(1);
        this.scrollFooterTable = this.scrollFooterBox.children("table");
        this.scrollFooterCols = this.scrollFooter.find("> .ui-datatable-scrollable-footer-box > table > tfoot > tr > td");
        this.frozenHeader = this.frozenContainer.children(".ui-datatable-scrollable-header");
        this.frozenBody = this.frozenContainer.children(".ui-datatable-scrollable-body");
        this.frozenBodyTable = this.frozenBody.children("table");
        this.frozenThead = this.thead.eq(0);
        this.frozenTbody = this.tbody.eq(0);
        this.frozenFooter = this.frozenContainer.children(".ui-datatable-scrollable-footer");
        this.frozenFooterTable = this.frozenFooter.find("> .ui-datatable-scrollable-footer-box > table");
        this.frozenFooterCols = this.frozenFooter.find("> .ui-datatable-scrollable-footer-box > table > tfoot > tr > td");
        this.percentageScrollHeight = this.cfg.scrollHeight && (this.cfg.scrollHeight.indexOf("%") !== -1);
        this.percentageScrollWidth = this.cfg.scrollWidth && (this.cfg.scrollWidth.indexOf("%") !== -1);
        this.frozenThead.find("> tr > th").addClass("ui-frozen-column");
        var f = this
          , d = this.getScrollbarWidth() + "px";
        if (this.cfg.scrollHeight) {
            if (this.percentageScrollHeight) {
                this.adjustScrollHeight()
            }
            if (this.hasVerticalOverflow()) {
                this.scrollHeaderBox.css("margin-right", d);
                this.scrollFooterBox.css("margin-right", d)
            }
        }
        if (this.cfg.selectionMode) {
            this.scrollTbody.removeAttr("tabindex")
        }
        this.fixColumnWidths();
        if (this.cfg.scrollWidth) {
            if (this.percentageScrollWidth) {
                this.adjustScrollWidth()
            } else {
                this.setScrollWidth(parseInt(this.cfg.scrollWidth))
            }
            if (this.hasVerticalOverflow()) {
                if (PrimeFaces.env.browser.webkit === true) {
                    this.frozenBody.append('<div style="height:' + d + ';border:1px solid transparent"></div>')
                } else {
                    if (PrimeFaces.isIE(8)) {
                        this.frozenBody.append('<div style="height:' + d + '"></div>')
                    } else {
                        this.frozenBodyTable.css("margin-bottom", d)
                    }
                }
            }
        }
        this.cloneHead();
        this.restoreScrollState();
        if (this.cfg.liveScroll) {
            this.scrollOffset = 0;
            this.cfg.liveScrollBuffer = (100 - this.cfg.liveScrollBuffer) / 100;
            this.shouldLiveScroll = true;
            this.loadingLiveScroll = false;
            this.allLoadedLiveScroll = f.cfg.scrollStep >= f.cfg.scrollLimit
        }
        this.scrollBody.scroll(function() {
            var a = f.scrollBody.scrollLeft()
              , b = f.scrollBody.scrollTop();
            f.scrollHeaderBox.css("margin-left", -a);
            f.scrollFooterBox.css("margin-left", -a);
            f.frozenBody.scrollTop(b);
            if (f.shouldLiveScroll) {
                var b = Math.ceil(this.scrollTop)
                  , c = this.scrollHeight
                  , h = this.clientHeight;
                if ((b >= ((c * f.cfg.liveScrollBuffer) - (h))) && f.shouldLoadLiveScroll()) {
                    f.loadLiveRows()
                }
            }
            f.saveScrollState()
        });
        var e = "resize." + this.id;
        $(window).unbind(e).bind(e, function() {
            if (f.jq.is(":visible")) {
                if (f.percentageScrollHeight) {
                    f.adjustScrollHeight()
                }
                if (f.percentageScrollWidth) {
                    f.adjustScrollWidth()
                }
            }
        })
    },
    cloneHead: function() {
        this.frozenTheadClone = this.frozenThead.clone();
        this.frozenTheadClone.find("th").each(function() {
            var b = $(this);
            b.attr("id", b.attr("id") + "_clone");
            $(this).children().not(".ui-column-title").remove()
        });
        this.frozenTheadClone.removeAttr("id").addClass("ui-datatable-scrollable-theadclone").height(0).prependTo(this.frozenBodyTable);
        this.scrollTheadClone = this.scrollThead.clone();
        this.scrollTheadClone.find("th").each(function() {
            var b = $(this);
            b.attr("id", b.attr("id") + "_clone");
            $(this).children().not(".ui-column-title").remove()
        });
        this.scrollTheadClone.removeAttr("id").addClass("ui-datatable-scrollable-theadclone").height(0).prependTo(this.scrollBodyTable)
    },
    hasVerticalOverflow: function() {
        return this.scrollBodyTable.outerHeight() > this.scrollBody.outerHeight()
    },
    adjustScrollHeight: function() {
        var k = this.jq.parent().innerHeight() * (parseInt(this.cfg.scrollHeight) / 100)
          , i = this.jq.children(".ui-datatable-header").outerHeight(true)
          , g = this.jq.children(".ui-datatable-footer").outerHeight(true)
          , l = (this.scrollHeader.innerHeight() + this.scrollFooter.innerHeight())
          , j = this.paginator ? this.paginator.getContainerHeight(true) : 0
          , h = (k - (l + j + i + g));
        this.scrollBody.height(h);
        this.frozenBody.height(h)
    },
    adjustScrollWidth: function() {
        var b = parseInt((this.scrollLayout.innerWidth() * (parseInt(this.cfg.scrollWidth) / 100)));
        this.setScrollWidth(b)
    },
    setScrollWidth: function(d) {
        var f = this
          , e = d + this.frozenLayout.width();
        this.jq.children(".ui-widget-header").each(function() {
            f.setOuterWidth($(this), e)
        });
        this.scrollHeader.width(d);
        this.scrollBody.css("margin-right", 0).width(d);
        this.scrollFooter.width(d)
    },
    fixColumnWidths: function() {
        if (!this.columnWidthsFixed) {
            if (PrimeFaces.isIE(7)) {
                this.bodyTable.css("width", "auto")
            }
            if (this.cfg.scrollable) {
                this._fixColumnWidths(this.scrollHeader, this.scrollFooterCols, this.scrollColgroup);
                this._fixColumnWidths(this.frozenHeader, this.frozenFooterCols, this.frozenColgroup)
            } else {
                this.jq.find("> .ui-datatable-tablewrapper > table > thead > tr > th").each(function() {
                    var b = $(this);
                    b.width(b.width())
                })
            }
            this.columnWidthsFixed = true
        }
    },
    _fixColumnWidths: function(c, d) {
        c.find("> .ui-datatable-scrollable-header-box > table > thead > tr > th").each(function() {
            var a = $(this)
              , h = a.index()
              , g = a.width();
            a.width(g);
            if (d.length > 0) {
                var b = d.eq(h);
                b.width(g)
            }
        })
    },
    updateData: function(v, t) {
        var o = $("<table><tbody>" + v + "</tbody></table>")
          , i = o.find("> tbody > tr")
          , r = (t === undefined) ? true : t;
        if (r) {
            this.frozenTbody.children().remove();
            this.scrollTbody.children().remove()
        }
        var w = this.frozenTbody.children("tr:first")
          , q = w.length ? w.children("td").length : this.cfg.frozenColumns;
        for (var u = 0; u < i.length; u++) {
            var n = i.eq(u)
              , x = n.children("td")
              , p = this.copyRow(n)
              , s = this.copyRow(n);
            p.append(x.slice(0, q));
            s.append(x.slice(q));
            this.frozenTbody.append(p);
            this.scrollTbody.append(s)
        }
        this.postUpdateData()
    },
    copyRow: function(b) {
        return $("<tr></tr>").data("ri", b.data("ri")).attr("data-rk", b.data("rk")).addClass(b.attr("class")).attr("role", "row")
    },
    getThead: function() {
        return $(this.jqId + "_frozenThead," + this.jqId + "_scrollableThead")
    },
    getTbody: function() {
        return $(this.jqId + "_frozenTbody," + this.jqId + "_scrollableTbody")
    },
    getTfoot: function() {
        return $(this.jqId + "_frozenTfoot," + this.jqId + "_scrollableTfoot")
    },
    bindRowHover: function(d) {
        var c = this;
        this.tbody.off("mouseover.datatable mouseout.datatable", d).on("mouseover.datatable", d, null, function() {
            var b = $(this)
              , a = c.getTwinRow(b);
            if (!b.hasClass("ui-state-highlight")) {
                b.addClass("ui-state-hover");
                a.addClass("ui-state-hover")
            }
        }).on("mouseout.datatable", d, null, function() {
            var b = $(this)
              , a = c.getTwinRow(b);
            if (!b.hasClass("ui-state-highlight")) {
                b.removeClass("ui-state-hover");
                a.removeClass("ui-state-hover")
            }
        })
    },
    getTwinRow: function(c) {
        var d = (this.tbody.index(c.parent()) === 0) ? this.tbody.eq(1) : this.tbody.eq(0);
        return d.children().eq(c.index())
    },
    highlightRow: function(b) {
        this._super(b);
        this._super(this.getTwinRow(b))
    },
    unhighlightRow: function(b) {
        this._super(b);
        this._super(this.getTwinRow(b))
    },
    displayExpandedRow: function(e, f) {
        var g = this.getTwinRow(e);
        e.after(f);
        var h = e.next();
        h.show();
        g.after('<tr class="ui-expanded-row-content ui-widget-content"><td></td></tr>');
        g.next().children("td").attr("colspan", g.children("td").length).height(h.children("td").height())
    },
    collapseRow: function(b) {
        this._super(b);
        this._super(this.getTwinRow(b))
    },
    getExpandedRows: function() {
        return this.frozenTbody.children(".ui-expanded-row")
    },
    showRowEditors: function(b) {
        this._super(b);
        this._super(this.getTwinRow(b))
    },
    updateRow: function(l, n) {
        var o = $("<table><tbody>" + n + "</tbody></table>")
          , i = o.find("> tbody > tr")
          , p = i.children("td")
          , j = this.copyRow(i)
          , m = this.copyRow(i)
          , k = this.getTwinRow(l);
        j.append(p.slice(0, this.cfg.frozenColumns));
        m.append(p.slice(this.cfg.frozenColumns));
        l.replaceWith(j);
        k.replaceWith(m)
    },
    invalidateRow: function(b) {
        this.frozenTbody.children("tr").eq(b).addClass("ui-widget-content ui-row-editing ui-state-error");
        this.scrollTbody.children("tr").eq(b).addClass("ui-widget-content ui-row-editing ui-state-error")
    },
    getRowEditors: function(b) {
        return b.find("div.ui-cell-editor").add(this.getTwinRow(b).find("div.ui-cell-editor"))
    },
    findGroupResizer: function(d) {
        var c = this._findGroupResizer(d, this.frozenGroupResizers);
        if (c) {
            return c
        } else {
            return this._findGroupResizer(d, this.scrollGroupResizers)
        }
    },
    _findGroupResizer: function(h, f) {
        for (var e = 0; e < f.length; e++) {
            var g = f.eq(e);
            if (g.offset().left === h.helper.data("originalposition").left) {
                return g
            }
        }
        return null
    },
    addResizers: function() {
        var c = this.frozenThead.find("> tr > th.ui-resizable-column")
          , d = this.scrollThead.find("> tr > th.ui-resizable-column");
        c.prepend('<span class="ui-column-resizer">&nbsp;</span>');
        d.prepend('<span class="ui-column-resizer">&nbsp;</span>');
        if (this.cfg.resizeMode === "fit") {
            c.filter(":last-child").addClass("ui-frozen-column-last");
            d.filter(":last-child").children("span.ui-column-resizer").hide()
        }
        if (this.hasColumnGroup) {
            this.frozenGroupResizers = this.frozenThead.find("> tr:first > th > .ui-column-resizer");
            this.scrollGroupResizers = this.scrollThead.find("> tr:first > th > .ui-column-resizer")
        }
    },
    resize: function(B, E) {
        var z = null
          , J = null
          , I = null
          , D = null
          , P = (this.cfg.resizeMode === "expand");
        if (this.hasColumnGroup) {
            var C = this.findGroupResizer(E);
            if (!C) {
                return
            }
            z = C.parent()
        } else {
            z = E.helper.parent()
        }
        var L = z.next();
        var F = z.index()
          , Q = z.hasClass("ui-frozen-column-last");
        if (this.cfg.liveResize) {
            J = z.outerWidth() - (B.pageX - z.offset().left),
            I = (z.width() - J),
            D = (L.width() + J)
        } else {
            J = (E.position.left - E.originalPosition.left),
            I = (z.width() + J),
            D = (L.width() - J)
        }
        var G = parseInt(z.css("min-width"));
        G = (G == 0) ? 15 : G;
        var N = (P && I > G) || (Q ? (I > G) : (I > G && D > G));
        if (N) {
            var K = z.hasClass("ui-frozen-column")
              , H = K ? this.frozenTheadClone : this.scrollTheadClone
              , R = K ? this.frozenThead.parent() : this.scrollThead.parent()
              , O = H.parent()
              , w = K ? this.frozenFooterCols : this.scrollFooterCols
              , x = K ? this.frozenFooterTable : this.scrollFooterTable
              , M = this;
            if (P) {
                if (Q) {
                    this.frozenLayout.width(this.frozenLayout.width() + J)
                }
                R.width(R.width() + J);
                O.width(O.width() + J);
                x.width(x.width() + J);
                setTimeout(function() {
                    z.width(I);
                    if (M.hasColumnGroup) {
                        H.find("> tr:first").children("th").eq(F).width(I);
                        x.find("> tfoot > tr:first").children("th").eq(F).width(I)
                    } else {
                        H.find(PrimeFaces.escapeClientId(z.attr("id") + "_clone")).width(I);
                        w.eq(F).width(I)
                    }
                }, 1)
            } else {
                if (Q) {
                    this.frozenLayout.width(this.frozenLayout.width() + J)
                }
                z.width(I);
                L.width(D);
                if (this.hasColumnGroup) {
                    H.find("> tr:first").children("th").eq(F).width(I);
                    H.find("> tr:first").children("th").eq(F + 1).width(D);
                    x.find("> tfoot > tr:first").children("th").eq(F).width(I);
                    x.find("> tfoot > tr:first").children("th").eq(F + 1).width(D)
                } else {
                    H.find(PrimeFaces.escapeClientId(z.attr("id") + "_clone")).width(I);
                    H.find(PrimeFaces.escapeClientId(L.attr("id") + "_clone")).width(D);
                    if (w.length > 0) {
                        var y = w.eq(F)
                          , A = y.next();
                        y.width(I);
                        A.width(D)
                    }
                }
            }
        }
    },
    hasColGroup: function() {
        return this.frozenThead.children("tr").length > 1 || this.scrollThead.children("tr").length > 1
    },
    addGhostRow: function() {
        this._addGhostRow(this.frozenTbody, this.frozenThead, this.frozenTheadClone, this.frozenFooter.find("table"), "ui-frozen-column");
        this._addGhostRow(this.scrollTbody, this.scrollThead, this.scrollTheadClone, this.scrollFooterTable)
    },
    _addGhostRow: function(n, p, o, m, r) {
        var s = n.find("tr:first").children("td")
          , t = s.length
          , l = ""
          , i = r ? "ui-resizable-column " + r : "ui-resizable-column";
        for (var q = 0; q < t; q++) {
            l += '<th style="height:0px;border-bottom-width: 0px;border-top-width: 0px;padding-top: 0px;padding-bottom: 0px;outline: 0 none;width:' + s.eq(q).width() + 'px" class="' + i + '"></th>'
        }
        p.prepend("<tr>" + l + "</tr>");
        if (this.cfg.scrollable) {
            o.prepend("<tr>" + l + "</tr>");
            m.children("tfoot").prepend("<tr>" + l + "</tr>")
        }
    },
    getFocusableTbody: function() {
        return this.tbody.eq(0)
    },
    highlightFocusedRow: function() {
        this._super();
        this.getTwinRow(this.focusedRow).addClass("ui-state-hover")
    },
    unhighlightFocusedRow: function() {
        this._super();
        this.getTwinRow(this.focusedRow).removeClass("ui-state-hover")
    },
    assignFocusedRow: function(b) {
        this._super(b);
        if (!b.parent().attr("tabindex")) {
            this.frozenTbody.trigger("focus")
        }
    }
});
PrimeFaces.widget.Dialog = PrimeFaces.widget.BaseWidget.extend({
    init: function(d) {
        this._super(d);
        this.content = this.jq.children(".ui-dialog-content");
        this.titlebar = this.jq.children(".ui-dialog-titlebar");
        this.footer = this.jq.find(".ui-dialog-footer");
        this.icons = this.titlebar.children(".ui-dialog-titlebar-icon");
        this.closeIcon = this.titlebar.children(".ui-dialog-titlebar-close");
        this.minimizeIcon = this.titlebar.children(".ui-dialog-titlebar-minimize");
        this.maximizeIcon = this.titlebar.children(".ui-dialog-titlebar-maximize");
        this.blockEvents = "focus." + this.id + " mousedown." + this.id + " mouseup." + this.id;
        this.resizeNS = "resize." + this.id;
        this.cfg.absolutePositioned = this.jq.hasClass("ui-dialog-absolute");
        this.cfg.width = this.cfg.width || "auto";
        this.cfg.height = this.cfg.height || "auto";
        this.cfg.draggable = this.cfg.draggable === false ? false : true;
        this.cfg.resizable = this.cfg.resizable === false ? false : true;
        this.cfg.minWidth = this.cfg.minWidth || 150;
        this.cfg.minHeight = this.cfg.minHeight || this.titlebar.outerHeight();
        this.cfg.position = this.cfg.position || "center";
        this.parent = this.jq.parent();
        this.initSize();
        this.bindEvents();
        if (this.cfg.draggable) {
            this.setupDraggable()
        }
        if (this.cfg.resizable) {
            this.setupResizable()
        }
        if (this.cfg.appendTo) {
            this.parent = this.jq.parent();
            this.targetParent = PrimeFaces.expressions.SearchExpressionFacade.resolveComponentsAsSelector(this.cfg.appendTo);
            if (!this.parent.is(this.targetParent)) {
                this.jq.appendTo(this.targetParent)
            }
        }
        if ($(document.body).children(".ui-dialog-docking-zone").length === 0) {
            $(document.body).append('<div class="ui-dialog-docking-zone"></div>')
        }
        var c = $(this.jqId + "_modal");
        if (c.length > 0) {
            c.remove()
        }
        this.applyARIA();
        if (this.cfg.visible) {
            this.show()
        }
    },
    refresh: function(d) {
        this.positionInitialized = false;
        this.loaded = false;
        $(document).off("keydown.dialog_" + d.id);
        if (d.appendTo) {
            var c = $("[id=" + d.id.replace(/:/g, "\\:") + "]");
            if (c.length > 1) {
                PrimeFaces.expressions.SearchExpressionFacade.resolveComponentsAsSelector(d.appendTo).children(this.jqId).remove()
            }
        }
        this.init(d)
    },
    initSize: function() {
        this.jq.css({
            width: this.cfg.width,
            height: "auto"
        });
        this.content.height(this.cfg.height);
        if (this.cfg.fitViewport) {
            this.fitViewport()
        }
        if (this.cfg.width === "auto" && PrimeFaces.isIE(7)) {
            this.jq.width(this.content.outerWidth())
        }
    },
    fitViewport: function() {
        var c = $(window).height()
          , d = this.content.innerHeight() - this.content.height();
        if (this.jq.innerHeight() > c) {
            this.content.height(c - this.titlebar.innerHeight() - d)
        }
    },
    enableModality: function() {
        var c = this
          , d = $(document);
        $(document.body).append('<div id="' + this.id + '_modal" class="ui-widget-overlay ui-dialog-mask"></div>').children(this.jqId + "_modal").css("z-index", this.jq.css("z-index") - 1);
        d.on("keydown." + this.id, function(j) {
            var i = $(j.target);
            if (j.keyCode === $.ui.keyCode.TAB) {
                var k = c.jq.find(":tabbable").add(c.footer.find(":tabbable"));
                if (k.length) {
                    var b = k.filter(":first")
                      , l = k.filter(":last")
                      , a = null;
                    if (b.is(":radio")) {
                        a = k.filter('[name="' + b.attr("name") + '"]').filter(":checked");
                        if (a.length > 0) {
                            b = a
                        }
                    }
                    if (l.is(":radio")) {
                        a = k.filter('[name="' + l.attr("name") + '"]').filter(":checked");
                        if (a.length > 0) {
                            l = a
                        }
                    }
                    if (i.is(document.body)) {
                        b.focus(1);
                        j.preventDefault()
                    } else {
                        if (j.target === l[0] && !j.shiftKey) {
                            b.focus(1);
                            j.preventDefault()
                        } else {
                            if (j.target === b[0] && j.shiftKey) {
                                l.focus(1);
                                j.preventDefault()
                            }
                        }
                    }
                }
            } else {
                if (!i.is(document.body) && (i.zIndex() < c.jq.zIndex())) {
                    j.preventDefault()
                }
            }
        }).on(this.blockEvents, function(a) {
            if ($(a.target).zIndex() < c.jq.zIndex()) {
                a.preventDefault()
            }
        })
    },
    disableModality: function() {
        $(document.body).children(this.jqId + "_modal").remove();
        $(document).off(this.blockEvents).off("keydown." + this.id)
    },
    syncWindowResize: function() {
        $(window).resize(function() {
            $(document.body).children(".ui-widget-overlay").css({
                width: $(document).width(),
                height: $(document).height()
            })
        })
    },
    show: function() {
        if (this.isVisible()) {
            return
        }
        if (!this.loaded && this.cfg.dynamic) {
            this.loadContents()
        } else {
            if (!this.positionInitialized) {
                this.initPosition()
            }
            this._show()
        }
    },
    _show: function() {
        this.jq.removeClass("ui-overlay-hidden").addClass("ui-overlay-visible").css({
            display: "none",
            visibility: "visible"
        });
        this.moveToTop();
        if (this.cfg.absolutePositioned) {
            var d = $(window).scrollTop();
            this.jq.css("top", parseFloat(this.jq.css("top")) + (d - this.lastScrollTop) + "px");
            this.lastScrollTop = d
        }
        if (this.cfg.showEffect) {
            var c = this;
            this.jq.show(this.cfg.showEffect, null, "normal", function() {
                c.postShow()
            })
        } else {
            this.jq.show();
            this.postShow()
        }
        if (this.cfg.modal) {
            this.enableModality()
        }
    },
    postShow: function() {
        PrimeFaces.invokeDeferredRenders(this.id);
        if (this.cfg.onShow) {
            this.cfg.onShow.call(this)
        }
        this.jq.attr({
            "aria-hidden": false,
            "aria-live": "polite"
        });
        this.applyFocus();
        if (this.cfg.responsive) {
            this.bindResizeListener()
        }
    },
    hide: function() {
        if (!this.isVisible()) {
            return
        }
        if (this.cfg.hideEffect) {
            var b = this;
            this.jq.hide(this.cfg.hideEffect, null, "normal", function() {
                if (b.cfg.modal) {
                    b.disableModality()
                }
                b.onHide()
            })
        } else {
            this.jq.hide();
            if (this.cfg.modal) {
                this.disableModality()
            }
            this.onHide()
        }
    },
    applyFocus: function() {
        if (this.cfg.focus) {
            PrimeFaces.expressions.SearchExpressionFacade.resolveComponentsAsSelector(this.cfg.focus).focus()
        } else {
            this.jq.find(":not(:submit):not(:button):not(:radio):not(:checkbox):input:visible:enabled:first").focus()
        }
    },
    bindEvents: function() {
        var b = this;
        this.jq.mousedown(function(a) {
            if (!$(a.target).data("primefaces-overlay-target")) {
                b.moveToTop()
            }
        });
        this.icons.on("mouseover", function() {
            $(this).addClass("ui-state-hover")
        }).on("mouseout", function() {
            $(this).removeClass("ui-state-hover")
        }).on("focus", function() {
            $(this).addClass("ui-state-focus")
        }).on("blur", function() {
            $(this).removeClass("ui-state-focus")
        });
        this.closeIcon.on("click", function(a) {
            b.hide();
            a.preventDefault()
        });
        this.maximizeIcon.click(function(a) {
            b.toggleMaximize();
            a.preventDefault()
        });
        this.minimizeIcon.click(function(a) {
            b.toggleMinimize();
            a.preventDefault()
        });
        if (this.cfg.closeOnEscape) {
            $(document).on("keydown.dialog_" + this.id, function(e) {
                var f = $.ui.keyCode
                  , a = parseInt(b.jq.css("z-index")) === PrimeFaces.zindex;
                if (e.which === f.ESCAPE && b.isVisible() && a) {
                    b.hide()
                }
            })
        }
    },
    setupDraggable: function() {
        var b = this;
        this.jq.draggable({
            cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
            handle: ".ui-dialog-titlebar",
            containment: "document",
            stop: function(g, f) {
                if (b.hasBehavior("move")) {
                    var a = b.cfg.behaviors.move;
                    var h = {
                        params: [{
                            name: b.id + "_top",
                            value: f.offset.top
                        }, {
                            name: b.id + "_left",
                            value: f.offset.left
                        }]
                    };
                    a.call(b, h)
                }
            }
        })
    },
    setupResizable: function() {
        var b = this;
        this.jq.resizable({
            handles: "n,s,e,w,ne,nw,se,sw",
            minWidth: this.cfg.minWidth,
            minHeight: this.cfg.minHeight,
            alsoResize: this.content,
            containment: "document",
            start: function(a, d) {
                b.jq.data("offset", b.jq.offset());
                if (b.cfg.hasIframe) {
                    b.iframeFix = $('<div style="position:absolute;background-color:transparent;width:100%;height:100%;top:0;left:0;"></div>').appendTo(b.content)
                }
            },
            stop: function(a, f) {
                var e = b.jq.data("offset");
                b.jq.css("position", "fixed");
                b.jq.offset(e);
                if (b.cfg.hasIframe) {
                    b.iframeFix.remove()
                }
            }
        });
        this.resizers = this.jq.children(".ui-resizable-handle")
    },
    initPosition: function() {
        var h = this;
        this.jq.css({
            left: 0,
            top: 0
        });
        if (/(center|left|top|right|bottom)/.test(this.cfg.position)) {
            this.cfg.position = this.cfg.position.replace(",", " ");
            this.jq.position({
                my: "center",
                at: this.cfg.position,
                collision: "fit",
                of: window,
                using: function(a) {
                    var d = a.left < 0 ? 0 : a.left
                      , c = a.top < 0 ? 0 : a.top
                      , b = $(window).scrollTop();
                    if (h.cfg.absolutePositioned) {
                        c += b;
                        h.lastScrollTop = b
                    }
                    $(this).css({
                        left: d,
                        top: c
                    })
                }
            })
        } else {
            var e = this.cfg.position.split(",")
              , f = $.trim(e[0])
              , g = $.trim(e[1]);
            this.jq.offset({
                left: f,
                top: g
            })
        }
        this.positionInitialized = true
    },
    onHide: function(d, c) {
        this.fireBehaviorEvent("close");
        this.jq.attr({
            "aria-hidden": true,
            "aria-live": "off"
        });
        if (this.cfg.onHide) {
            this.cfg.onHide.call(this, d, c)
        }
        if (this.cfg.responsive) {
            this.unbindResizeListener()
        }
    },
    moveToTop: function() {
        this.jq.css("z-index", ++PrimeFaces.zindex)
    },
    toggleMaximize: function() {
        if (this.minimized) {
            this.toggleMinimize()
        }
        if (this.maximized) {
            this.jq.removeClass("ui-dialog-maximized");
            this.restoreState();
            this.maximizeIcon.children(".ui-icon").removeClass("ui-icon-newwin").addClass("ui-icon-extlink");
            this.maximized = false;
            this.fireBehaviorEvent("restoreMaximize")
        } else {
            this.saveState();
            var c = $(window);
            this.jq.addClass("ui-dialog-maximized").css({
                width: c.width() - 6,
                height: c.height()
            }).offset({
                top: c.scrollTop(),
                left: c.scrollLeft()
            });
            var d = this.content.innerHeight() - this.content.height();
            this.content.css({
                width: "auto",
                height: this.jq.height() - this.titlebar.outerHeight() - d
            });
            this.maximizeIcon.removeClass("ui-state-hover").children(".ui-icon").removeClass("ui-icon-extlink").addClass("ui-icon-newwin");
            this.maximized = true;
            this.fireBehaviorEvent("maximize")
        }
    },
    toggleMinimize: function() {
        var e = true
          , f = $(document.body).children(".ui-dialog-docking-zone");
        if (this.maximized) {
            this.toggleMaximize();
            e = false
        }
        var d = this;
        if (this.minimized) {
            this.jq.appendTo(this.parent).removeClass("ui-dialog-minimized").css({
                position: "fixed",
                "float": "none"
            });
            this.restoreState();
            this.content.show();
            this.minimizeIcon.removeClass("ui-state-hover").children(".ui-icon").removeClass("ui-icon-plus").addClass("ui-icon-minus");
            this.minimized = false;
            if (this.cfg.resizable) {
                this.resizers.show()
            }
            this.fireBehaviorEvent("restoreMinimize")
        } else {
            this.saveState();
            if (e) {
                this.jq.effect("transfer", {
                    to: f,
                    className: "ui-dialog-minimizing"
                }, 500, function() {
                    d.dock(f);
                    d.jq.addClass("ui-dialog-minimized")
                })
            } else {
                this.dock(f)
            }
        }
    },
    dock: function(b) {
        b.css("z-index", this.jq.css("z-index"));
        this.jq.appendTo(b).css("position", "static");
        this.jq.css({
            height: "auto",
            width: "auto",
            "float": "left"
        });
        this.content.hide();
        this.minimizeIcon.removeClass("ui-state-hover").children(".ui-icon").removeClass("ui-icon-minus").addClass("ui-icon-plus");
        this.minimized = true;
        if (this.cfg.resizable) {
            this.resizers.hide()
        }
        this.fireBehaviorEvent("minimize")
    },
    saveState: function() {
        this.state = {
            width: this.jq.width(),
            height: this.jq.height(),
            contentWidth: this.content.width(),
            contentHeight: this.content.height()
        };
        var b = $(window);
        this.state.offset = this.jq.offset();
        this.state.windowScrollLeft = b.scrollLeft();
        this.state.windowScrollTop = b.scrollTop()
    },
    restoreState: function() {
        this.jq.width(this.state.width).height(this.state.height);
        this.content.width(this.state.contentWidth).height(this.state.contentHeight);
        var b = $(window);
        this.jq.offset({
            top: this.state.offset.top + (b.scrollTop() - this.state.windowScrollTop),
            left: this.state.offset.left + (b.scrollLeft() - this.state.windowScrollLeft)
        })
    },
    loadContents: function() {
        var c = this
          , d = {
            source: this.id,
            process: this.id,
            update: this.id,
            params: [{
                name: this.id + "_contentLoad",
                value: true
            }],
            onsuccess: function(a, f, b) {
                PrimeFaces.ajax.Response.handle(a, f, b, {
                    widget: c,
                    handle: function(e) {
                        this.content.html(e)
                    }
                });
                return true
            },
            oncomplete: function() {
                c.loaded = true;
                c.show()
            }
        };
        PrimeFaces.ajax.Request.handle(d)
    },
    applyARIA: function() {
        this.jq.attr({
            role: "dialog",
            "aria-labelledby": this.id + "_title",
            "aria-hidden": !this.cfg.visible
        });
        this.titlebar.children("a.ui-dialog-titlebar-icon").attr("role", "button")
    },
    hasBehavior: function(b) {
        if (this.cfg.behaviors) {
            return this.cfg.behaviors[b] != undefined
        }
        return false
    },
    isVisible: function() {
        return this.jq.hasClass("ui-overlay-visible") || (this.jq.is(":visible") && this.jq.hasClass("ui-overlay-visible"))
    },
    bindResizeListener: function() {
        var b = this;
        $(window).on(this.resizeNS, function() {
            b.initPosition()
        })
    },
    unbindResizeListener: function() {
        $(window).off(this.resizeNS)
    },
    fireBehaviorEvent: function(c) {
        if (this.cfg.behaviors) {
            var d = this.cfg.behaviors[c];
            if (d) {
                d.call(this)
            }
        }
    }
});
PrimeFaces.widget.ConfirmDialog = PrimeFaces.widget.Dialog.extend({
    init: function(b) {
        b.draggable = false;
        b.resizable = false;
        b.modal = true;
        if (!b.appendTo && b.global) {
            b.appendTo = "@(body)"
        }
        this._super(b);
        this.title = this.titlebar.children(".ui-dialog-title");
        this.message = this.content.children(".ui-confirm-dialog-message");
        this.icon = this.content.children(".ui-confirm-dialog-severity");
        if (this.cfg.global) {
            PrimeFaces.confirmDialog = this;
            this.jq.find(".ui-confirmdialog-yes").on("click.ui-confirmdialog", function(d) {
                if (PrimeFaces.confirmSource) {
                    var a = new Function("event",PrimeFaces.confirmSource.data("pfconfirmcommand"));
                    a.call(PrimeFaces.confirmSource.get(0), d);
                    PrimeFaces.confirmDialog.hide();
                    PrimeFaces.confirmSource = null
                }
                d.preventDefault()
            });
            this.jq.find(".ui-confirmdialog-no").on("click.ui-confirmdialog", function(a) {
                PrimeFaces.confirmDialog.hide();
                PrimeFaces.confirmSource = null;
                a.preventDefault()
            })
        }
    },
    applyFocus: function() {
        this.jq.find(":button,:submit").filter(":visible:enabled").eq(0).focus()
    },
    showMessage: function(c) {
        var d = (c.icon === "null") ? "ui-icon-alert" : c.icon;
        this.icon.removeClass().addClass("ui-icon ui-confirm-dialog-severity " + d);
        if (c.header) {
            this.title.text(c.header)
        }
        if (c.message) {
            this.message.text(c.message)
        }
        this.show()
    }
});
PrimeFaces.widget.DynamicDialog = PrimeFaces.widget.Dialog.extend({
    show: function() {
        if (this.jq.hasClass("ui-overlay-visible")) {
            return
        }
        if (!this.positionInitialized) {
            this.initPosition()
        }
        this._show()
    },
    _show: function() {
        this.jq.removeClass("ui-overlay-hidden").addClass("ui-overlay-visible").css({
            display: "none",
            visibility: "visible"
        });
        this.moveToTop();
        this.jq.show();
        this.postShow();
        if (this.cfg.modal) {
            this.enableModality()
        }
    }
});
PrimeFaces.widget.Draggable = PrimeFaces.widget.BaseWidget.extend({
    init: function(b) {
        this.cfg = b;
        this.id = this.cfg.id;
        this.jqId = PrimeFaces.escapeClientId(this.id);
        this.jq = $(PrimeFaces.escapeClientId(this.cfg.target));
        if (this.cfg.appendTo) {
            this.cfg.appendTo = PrimeFaces.expressions.SearchExpressionFacade.resolveComponentsAsSelector(this.cfg.appendTo)
        }
        this.jq.draggable(this.cfg);
        this.removeScriptElement(this.id)
    }
});
PrimeFaces.widget.Droppable = PrimeFaces.widget.BaseWidget.extend({
    init: function(b) {
        this.cfg = b;
        this.id = this.cfg.id;
        this.jqId = PrimeFaces.escapeClientId(this.id);
        this.jq = $(PrimeFaces.escapeClientId(this.cfg.target));
        this.bindDropListener();
        this.jq.droppable(this.cfg);
        this.removeScriptElement(this.id)
    },
    bindDropListener: function() {
        var b = this;
        this.cfg.drop = function(h, g) {
            if (b.cfg.onDrop) {
                b.cfg.onDrop.call(b, h, g)
            }
            if (b.cfg.behaviors) {
                var f = b.cfg.behaviors.drop;
                if (f) {
                    var a = {
                        params: [{
                            name: b.id + "_dragId",
                            value: g.draggable.attr("id")
                        }, {
                            name: b.id + "_dropId",
                            value: b.cfg.target
                        }]
                    };
                    f.call(b, a)
                }
            }
        }
    }
});
PrimeFaces.widget.Effect = PrimeFaces.widget.BaseWidget.extend({
    init: function(c) {
        this.cfg = c;
        this.id = this.cfg.id;
        this.jqId = PrimeFaces.escapeClientId(this.id);
        this.source = $(PrimeFaces.escapeClientId(this.cfg.source));
        var d = this;
        this.runner = function() {
            if (d.timeoutId) {
                clearTimeout(d.timeoutId)
            }
            d.timeoutId = setTimeout(d.cfg.fn, d.cfg.delay)
        }
        ;
        if (this.cfg.event == "load") {
            this.runner.call()
        } else {
            this.source.bind(this.cfg.event, this.runner)
        }
        this.removeScriptElement(this.id)
    }
});
PrimeFaces.widget.Fieldset = PrimeFaces.widget.BaseWidget.extend({
    init: function(d) {
        this._super(d);
        this.legend = this.jq.children(".ui-fieldset-legend");
        var c = this;
        if (this.cfg.toggleable) {
            this.content = this.jq.children(".ui-fieldset-content");
            this.toggler = this.legend.children(".ui-fieldset-toggler");
            this.stateHolder = $(this.jqId + "_collapsed");
            this.legend.on("click", function(a) {
                c.toggle(a)
            }).on("mouseover", function() {
                c.legend.toggleClass("ui-state-hover")
            }).on("mouseout", function() {
                c.legend.toggleClass("ui-state-hover")
            }).on("mousedown", function() {
                c.legend.toggleClass("ui-state-active")
            }).on("mouseup", function() {
                c.legend.toggleClass("ui-state-active")
            }).on("focus", function() {
                c.legend.toggleClass("ui-state-focus")
            }).on("blur", function() {
                c.legend.toggleClass("ui-state-focus")
            }).on("keydown", function(a) {
                var e = a.which
                  , b = $.ui.keyCode;
                if ((e === b.ENTER || e === b.NUMPAD_ENTER)) {
                    c.toggle(a);
                    a.preventDefault()
                }
            })
        }
    },
    toggle: function(c) {
        this.updateToggleState(this.cfg.collapsed);
        var d = this;
        this.content.slideToggle(this.cfg.toggleSpeed, "easeInOutCirc", function() {
            if (d.cfg.behaviors) {
                var a = d.cfg.behaviors.toggle;
                if (a) {
                    a.call(d)
                }
            }
        });
        PrimeFaces.invokeDeferredRenders(this.id)
    },
    updateToggleState: function(b) {
        if (b) {
            this.toggler.removeClass("ui-icon-plusthick").addClass("ui-icon-minusthick")
        } else {
            this.toggler.removeClass("ui-icon-minusthick").addClass("ui-icon-plusthick")
        }
        this.cfg.collapsed = !b;
        this.stateHolder.val(!b)
    }
});
PrimeFaces.widget.InputText = PrimeFaces.widget.BaseWidget.extend({
    init: function(b) {
        this._super(b);
        PrimeFaces.skinInput(this.jq)
    },
    disable: function() {
        this.jq.prop("disabled", true).addClass("ui-state-disabled")
    },
    enable: function() {
        this.jq.prop("disabled", false).removeClass("ui-state-disabled")
    }
});
PrimeFaces.widget.InputTextarea = PrimeFaces.widget.DeferredWidget.extend({
    init: function(b) {
        this._super(b);
        if (this.cfg.autoResize) {
            this.renderDeferred()
        } else {
            this._render()
        }
    },
    _render: function() {
        PrimeFaces.skinInput(this.jq);
        if (this.cfg.autoComplete) {
            this.setupAutoComplete()
        }
        if (this.cfg.counter) {
            this.counter = this.cfg.counter ? $(PrimeFaces.escapeClientId(this.cfg.counter)) : null;
            this.cfg.counterTemplate = this.cfg.counterTemplate || "{0}";
            this.updateCounter()
        }
        if (this.cfg.maxlength) {
            this.applyMaxlength()
        }
        if (this.cfg.autoResize) {
            this.setupAutoResize()
        }
    },
    refresh: function(b) {
        if (b.autoComplete) {
            $(PrimeFaces.escapeClientId(b.id + "_panel")).remove()
        }
        this.init(b)
    },
    setupAutoResize: function() {
        var b = this;
        this.jq.keyup(function() {
            b.resize()
        }).focus(function() {
            b.resize()
        }).blur(function() {
            b.resize()
        })
    },
    resize: function() {
        var g = 0
          , f = this.jq.val().split("\n");
        for (var e = f.length - 1; e >= 0; --e) {
            g += Math.floor((f[e].length / this.cfg.colsDefault) + 1)
        }
        var h = (g >= this.cfg.rowsDefault) ? (g + 1) : this.cfg.rowsDefault;
        this.jq.attr("rows", h)
    },
    applyMaxlength: function() {
        var b = this;
        this.jq.on("keyup.inputtextarea-maxlength", function(e) {
            var f = b.normalizeNewlines(b.jq.val())
              , a = f.length;
            if (a > b.cfg.maxlength) {
                b.jq.val(f.substr(0, b.cfg.maxlength))
            }
        });
        if (b.counter) {
            this.jq.on("keyup.inputtextarea-counter", function(a) {
                b.updateCounter()
            })
        }
    },
    updateCounter: function() {
        var g = this.normalizeNewlines(this.jq.val())
          , h = g.length;
        if (this.counter) {
            var e = this.cfg.maxlength - h;
            if (e < 0) {
                e = 0
            }
            var f = this.cfg.counterTemplate.replace("{0}", e);
            this.counter.text(f)
        }
    },
    normalizeNewlines: function(b) {
        return b.replace(/(\r\n|\r|\n)/g, "\r\n")
    },
    setupAutoComplete: function() {
        var f = '<div id="' + this.id + '_panel" class="ui-autocomplete-panel ui-widget-content ui-corner-all ui-helper-hidden ui-shadow"></div>'
          , e = this;
        this.panel = $(f).appendTo(document.body);
        this.jq.keyup(function(a) {
            var b = $.ui.keyCode;
            switch (a.which) {
            case b.UP:
            case b.LEFT:
            case b.DOWN:
            case b.RIGHT:
            case b.ENTER:
            case b.NUMPAD_ENTER:
            case b.TAB:
            case b.SPACE:
            case 17:
            case 18:
            case b.ESCAPE:
            case 224:
                break;
            default:
                var c = e.extractQuery();
                if (c && c.length >= e.cfg.minQueryLength) {
                    if (e.timeout) {
                        e.clearTimeout(e.timeout)
                    }
                    e.timeout = setTimeout(function() {
                        e.search(c)
                    }, e.cfg.queryDelay)
                }
                break
            }
        }).keydown(function(a) {
            var m = e.panel.is(":visible")
              , b = $.ui.keyCode;
            switch (a.which) {
            case b.UP:
            case b.LEFT:
                if (m) {
                    var c = e.items.filter(".ui-state-highlight")
                      , k = c.length == 0 ? e.items.eq(0) : c.prev();
                    if (k.length == 1) {
                        c.removeClass("ui-state-highlight");
                        k.addClass("ui-state-highlight");
                        if (e.cfg.scrollHeight) {
                            PrimeFaces.scrollInView(e.panel, k)
                        }
                    }
                    a.preventDefault()
                } else {
                    e.clearTimeout()
                }
                break;
            case b.DOWN:
            case b.RIGHT:
                if (m) {
                    var c = e.items.filter(".ui-state-highlight")
                      , l = c.length == 0 ? e.items.eq(0) : c.next();
                    if (l.length == 1) {
                        c.removeClass("ui-state-highlight");
                        l.addClass("ui-state-highlight");
                        if (e.cfg.scrollHeight) {
                            PrimeFaces.scrollInView(e.panel, l)
                        }
                    }
                    a.preventDefault()
                } else {
                    e.clearTimeout()
                }
                break;
            case b.ENTER:
            case b.NUMPAD_ENTER:
                if (m) {
                    e.items.filter(".ui-state-highlight").trigger("click");
                    a.preventDefault()
                } else {
                    e.clearTimeout()
                }
                break;
            case b.SPACE:
            case 17:
            case 18:
            case b.BACKSPACE:
            case b.ESCAPE:
            case 224:
                e.clearTimeout();
                if (m) {
                    e.hide()
                }
                break;
            case b.TAB:
                e.clearTimeout();
                if (m) {
                    e.items.filter(".ui-state-highlight").trigger("click");
                    e.hide()
                }
                break
            }
        });
        $(document.body).bind("mousedown.ui-inputtextarea", function(b) {
            if (e.panel.is(":hidden")) {
                return
            }
            var a = e.panel.offset();
            if (b.target === e.jq.get(0)) {
                return
            }
            if (b.pageX < a.left || b.pageX > a.left + e.panel.width() || b.pageY < a.top || b.pageY > a.top + e.panel.height()) {
                e.hide()
            }
        });
        var d = "resize." + this.id;
        $(window).unbind(d).bind(d, function() {
            if (e.panel.is(":visible")) {
                e.hide()
            }
        });
        this.setupDialogSupport()
    },
    bindDynamicEvents: function() {
        var b = this;
        this.items.bind("mouseover", function() {
            var a = $(this);
            if (!a.hasClass("ui-state-highlight")) {
                b.items.filter(".ui-state-highlight").removeClass("ui-state-highlight");
                a.addClass("ui-state-highlight")
            }
        }).bind("click", function(g) {
            var h = $(this)
              , f = h.attr("data-item-value")
              , a = f.substring(b.query.length);
            b.jq.focus();
            b.jq.insertText(a, b.jq.getSelection().start, true);
            b.invokeItemSelectBehavior(g, f);
            b.hide()
        })
    },
    invokeItemSelectBehavior: function(e, g) {
        if (this.cfg.behaviors) {
            var h = this.cfg.behaviors.itemSelect;
            if (h) {
                var f = {
                    params: [{
                        name: this.id + "_itemSelect",
                        value: g
                    }]
                };
                h.call(this, f)
            }
        }
    },
    clearTimeout: function() {
        if (this.timeout) {
            clearTimeout(this.timeout)
        }
        this.timeout = null
    },
    extractQuery: function() {
        var d = this.jq.getSelection().end
          , e = /\S+$/.exec(this.jq.get(0).value.slice(0, d))
          , f = e ? e[0] : null;
        return f
    },
    search: function(d) {
        this.query = d;
        var f = this
          , e = {
            source: this.id,
            update: this.id,
            process: this.id,
            params: [{
                name: this.id + "_query",
                value: d
            }],
            onsuccess: function(a, c, b) {
                PrimeFaces.ajax.Response.handle(a, c, b, {
                    widget: f,
                    handle: function(h) {
                        this.panel.html(h);
                        this.items = f.panel.find(".ui-autocomplete-item");
                        this.bindDynamicEvents();
                        if (this.items.length > 0) {
                            this.items.eq(0).addClass("ui-state-highlight");
                            if (this.cfg.scrollHeight && this.panel.height() > this.cfg.scrollHeight) {
                                this.panel.height(this.cfg.scrollHeight)
                            }
                            if (this.panel.is(":hidden")) {
                                this.show()
                            } else {
                                this.alignPanel()
                            }
                        } else {
                            this.panel.hide()
                        }
                    }
                });
                return true
            }
        };
        PrimeFaces.ajax.Request.handle(e)
    },
    alignPanel: function() {
        var c = this.jq.getCaretPosition()
          , d = this.jq.offset();
        this.panel.css({
            left: d.left + c.left,
            top: d.top + c.top,
            width: this.jq.innerWidth(),
            "z-index": ++PrimeFaces.zindex
        })
    },
    show: function() {
        this.alignPanel();
        this.panel.show()
    },
    hide: function() {
        this.panel.hide()
    },
    setupDialogSupport: function() {
        var b = this.jq.parents(".ui-dialog:first");
        if (b.length == 1) {
            this.panel.css("position", "fixed")
        }
    }
});
PrimeFaces.widget.SelectOneMenu = PrimeFaces.widget.DeferredWidget.extend({
    init: function(i) {
        this._super(i);
        this.panelId = this.jqId + "_panel";
        this.input = $(this.jqId + "_input");
        this.focusInput = $(this.jqId + "_focus");
        this.label = this.jq.find(".ui-selectonemenu-label");
        this.menuIcon = this.jq.children(".ui-selectonemenu-trigger");
        this.panel = this.jq.children(this.panelId);
        this.disabled = this.jq.hasClass("ui-state-disabled");
        this.itemsWrapper = this.panel.children(".ui-selectonemenu-items-wrapper");
        this.itemsContainer = this.itemsWrapper.children(".ui-selectonemenu-items");
        this.items = this.itemsContainer.find(".ui-selectonemenu-item");
        this.options = this.input.children("option");
        this.cfg.effect = this.cfg.effect || "fade";
        this.cfg.effectSpeed = this.cfg.effectSpeed || "normal";
        this.optGroupsSize = this.itemsContainer.children("li.ui-selectonemenu-item-group").length;
        this.cfg.autoWidth = this.cfg.autoWidth === true ? true : false;
        var j = this
          , l = this.options.filter(":selected")
          , k = this.items.eq(l.index());
        this.options.filter(":disabled").each(function() {
            j.items.eq($(this).index()).addClass("ui-state-disabled")
        });
        this.triggers = this.cfg.editable ? this.jq.find(".ui-selectonemenu-trigger") : this.jq.find(".ui-selectonemenu-trigger, .ui-selectonemenu-label");
        if (this.cfg.editable) {
            var n = this.label.val();
            if (n === l.text()) {
                this.highlightItem(k)
            } else {
                this.items.eq(0).addClass("ui-state-highlight");
                this.customInput = true;
                this.customInputVal = n
            }
        } else {
            this.highlightItem(k)
        }
        if (this.cfg.syncTooltip) {
            this.syncTitle(l)
        }
        this.triggers.data("primefaces-overlay-target", true).find("*").data("primefaces-overlay-target", true);
        if (!this.disabled) {
            this.bindEvents();
            this.bindConstantEvents();
            this.appendPanel()
        }
        this.input.data(PrimeFaces.CLIENT_ID_DATA, this.id);
        if (PrimeFaces.env.touch) {
            this.focusInput.attr("readonly", true)
        }
        for (var m = 0; m < this.items.size(); m++) {
            this.items.eq(m).attr("id", this.id + "_" + m)
        }
        var h = k.attr("id");
        this.jq.attr("aria-owns", this.itemsContainer.attr("id"));
        this.focusInput.attr("aria-autocomplete", "list").attr("aria-activedescendant", h).attr("aria-describedby", h).attr("aria-disabled", this.disabled);
        this.itemsContainer.attr("aria-activedescendant", h);
        this.renderDeferred()
    },
    _render: function() {
        if (this.cfg.autoWidth) {
            this.jq.css("min-width", this.input.outerWidth())
        }
    },
    refresh: function(b) {
        this.panelWidthAdjusted = false;
        this._super(b)
    },
    appendPanel: function() {
        var b = this.cfg.appendTo ? PrimeFaces.expressions.SearchExpressionFacade.resolveComponentsAsSelector(this.cfg.appendTo) : $(document.body);
        if (!b.is(this.jq)) {
            b.children(this.panelId).remove();
            this.panel.appendTo(b)
        }
    },
    alignPanelWidth: function() {
        if (!this.panelWidthAdjusted) {
            var b = this.jq.outerWidth();
            if (this.panel.outerWidth() < b) {
                this.panel.width(b)
            }
            this.panelWidthAdjusted = true
        }
    },
    bindEvents: function() {
        var b = this;
        if (PrimeFaces.env.browser.webkit) {
            this.input.on("focus", function() {
                setTimeout(function() {
                    b.focusInput.trigger("focus.ui-selectonemenu")
                }, 2)
            })
        }
        this.items.filter(":not(.ui-state-disabled)").on("mouseover.selectonemenu", function() {
            var a = $(this);
            if (!a.hasClass("ui-state-highlight")) {
                $(this).addClass("ui-state-hover")
            }
        }).on("mouseout.selectonemenu", function() {
            $(this).removeClass("ui-state-hover")
        }).on("click.selectonemenu", function() {
            b.selectItem($(this));
            b.changeAriaValue($(this))
        });
        this.triggers.mouseenter(function() {
            if (!b.jq.hasClass("ui-state-focus")) {
                b.jq.addClass("ui-state-hover");
                b.menuIcon.addClass("ui-state-hover")
            }
        }).mouseleave(function() {
            b.jq.removeClass("ui-state-hover");
            b.menuIcon.removeClass("ui-state-hover")
        }).click(function(a) {
            if (b.panel.is(":hidden")) {
                b.show()
            } else {
                b.hide();
                b.revert();
                b.changeAriaValue(b.getActiveItem())
            }
            b.jq.removeClass("ui-state-hover");
            b.menuIcon.removeClass("ui-state-hover");
            b.focusInput.trigger("focus.ui-selectonemenu");
            a.preventDefault()
        });
        this.focusInput.on("focus.ui-selectonemenu", function() {
            b.jq.addClass("ui-state-focus");
            b.menuIcon.addClass("ui-state-focus")
        }).on("blur.ui-selectonemenu", function() {
            b.jq.removeClass("ui-state-focus");
            b.menuIcon.removeClass("ui-state-focus")
        });
        if (this.cfg.editable) {
            this.label.change(function() {
                b.triggerChange(true);
                b.customInput = true;
                b.customInputVal = $(this).val();
                b.items.filter(".ui-state-active").removeClass("ui-state-active");
                b.items.eq(0).addClass("ui-state-active")
            })
        }
        this.bindKeyEvents();
        if (this.cfg.filter) {
            this.cfg.initialHeight = this.itemsWrapper.height();
            this.setupFilterMatcher();
            this.filterInput = this.panel.find("> div.ui-selectonemenu-filter-container > input.ui-selectonemenu-filter");
            PrimeFaces.skinInput(this.filterInput);
            this.bindFilterEvents()
        }
    },
    bindConstantEvents: function() {
        var c = this
          , d = "mousedown." + this.id;
        $(document).off(d).on(d, function(b) {
            if (c.panel.is(":hidden")) {
                return
            }
            var a = c.panel.offset();
            if (b.target === c.label.get(0) || b.target === c.menuIcon.get(0) || b.target === c.menuIcon.children().get(0)) {
                return
            }
            if (b.pageX < a.left || b.pageX > a.left + c.panel.width() || b.pageY < a.top || b.pageY > a.top + c.panel.height()) {
                c.hide();
                setTimeout(function() {
                    c.revert();
                    c.changeAriaValue(c.getActiveItem())
                }, 2)
            }
        });
        this.resizeNS = "resize." + this.id;
        this.unbindResize();
        this.bindResize()
    },
    bindResize: function() {
        var b = this;
        $(window).bind(this.resizeNS, function(a) {
            if (b.panel.is(":visible")) {
                b.alignPanel()
            }
        })
    },
    unbindResize: function() {
        $(window).unbind(this.resizeNS)
    },
    unbindEvents: function() {
        this.items.off();
        this.triggers.off();
        this.input.off();
        this.focusInput.off();
        this.label.off()
    },
    revert: function() {
        if (this.cfg.editable && this.customInput) {
            this.setLabel(this.customInputVal);
            this.items.filter(".ui-state-active").removeClass("ui-state-active");
            this.items.eq(0).addClass("ui-state-active")
        } else {
            this.highlightItem(this.items.eq(this.preShowValue.index()))
        }
    },
    highlightItem: function(b) {
        this.items.filter(".ui-state-highlight").removeClass("ui-state-highlight");
        if (b.length > 0) {
            b.addClass("ui-state-highlight");
            this.setLabel(b.data("label"))
        }
    },
    triggerChange: function(b) {
        this.changed = false;
        this.input.trigger("change");
        if (!b) {
            this.value = this.options.filter(":selected").val()
        }
    },
    triggerItemSelect: function() {
        if (this.cfg.behaviors) {
            var b = this.cfg.behaviors.itemSelect;
            if (b) {
                b.call(this)
            }
        }
    },
    selectItem: function(i, g) {
        var j = this.options.eq(this.resolveItemIndex(i))
          , k = this.options.filter(":selected")
          , h = j.val() == k.val()
          , l = null;
        if (this.cfg.editable) {
            l = (!h) || (j.text() != this.label.val())
        } else {
            l = !h
        }
        if (l) {
            this.highlightItem(i);
            this.input.val(j.val());
            this.triggerChange();
            if (this.cfg.editable) {
                this.customInput = false
            }
            if (this.cfg.syncTooltip) {
                this.syncTitle(j)
            }
        }
        if (!g) {
            this.focusInput.focus();
            this.triggerItemSelect()
        }
        if (this.panel.is(":visible")) {
            this.hide()
        }
    },
    syncTitle: function(c) {
        var d = this.items.eq(c.index()).attr("title");
        if (d) {
            this.jq.attr("title", this.items.eq(c.index()).attr("title"))
        } else {
            this.jq.removeAttr("title")
        }
    },
    resolveItemIndex: function(b) {
        if (this.optGroupsSize === 0) {
            return b.index()
        } else {
            return b.index() - b.prevAll("li.ui-selectonemenu-item-group").length
        }
    },
    bindKeyEvents: function() {
        var b = this;
        this.focusInput.on("keydown.ui-selectonemenu", function(e) {
            var f = $.ui.keyCode
              , a = e.which;
            switch (a) {
            case f.UP:
            case f.LEFT:
                b.highlightPrev(e);
                break;
            case f.DOWN:
            case f.RIGHT:
                b.highlightNext(e);
                break;
            case f.ENTER:
            case f.NUMPAD_ENTER:
                b.handleEnterKey(e);
                break;
            case f.TAB:
                b.handleTabKey();
                break;
            case f.ESCAPE:
                b.handleEscapeKey(e);
                break;
            case f.SPACE:
                b.handleSpaceKey(e);
                break
            }
        }).on("keyup.ui-selectonemenu", function(k) {
            var l = $.ui.keyCode
              , m = k.which;
            switch (m) {
            case l.UP:
            case l.LEFT:
            case l.DOWN:
            case l.RIGHT:
            case l.ENTER:
            case l.NUMPAD_ENTER:
            case l.TAB:
            case l.ESCAPE:
            case l.SPACE:
            case l.HOME:
            case l.PAGE_DOWN:
            case l.PAGE_UP:
            case l.END:
            case l.DELETE:
            case 16:
            case 17:
            case 18:
            case 91:
            case 92:
            case 93:
            case 20:
                break;
            default:
                if (m >= 112 && m <= 123) {
                    break
                }
                var e = $(this).val()
                  , n = null
                  , j = k.metaKey || k.ctrlKey || k.shiftKey;
                if (!j) {
                    clearTimeout(b.searchTimer);
                    n = b.options.filter(function() {
                        var c = $(this);
                        return (c.is(":not(:disabled)") && (c.text().toLowerCase().indexOf(e.toLowerCase()) === 0))
                    });
                    if (n.length) {
                        var a = b.items.eq(n.index());
                        if (b.panel.is(":hidden")) {
                            b.selectItem(a)
                        } else {
                            b.highlightItem(a);
                            PrimeFaces.scrollInView(b.itemsWrapper, a)
                        }
                    }
                    b.searchTimer = setTimeout(function() {
                        b.focusInput.val("")
                    }, 1000)
                }
                break
            }
        })
    },
    bindFilterEvents: function() {
        var b = this;
        this.filterInput.on("keyup.ui-selectonemenu", function(g) {
            var h = $.ui.keyCode
              , a = g.which;
            switch (a) {
            case h.UP:
            case h.LEFT:
            case h.DOWN:
            case h.RIGHT:
            case h.ENTER:
            case h.NUMPAD_ENTER:
            case h.TAB:
            case h.ESCAPE:
            case h.SPACE:
            case h.HOME:
            case h.PAGE_DOWN:
            case h.PAGE_UP:
            case h.END:
            case h.DELETE:
            case 16:
            case 17:
            case 18:
            case 91:
            case 92:
            case 93:
            case 20:
                break;
            default:
                if (a >= 112 && a <= 123) {
                    break
                }
                var e = g.metaKey || g.ctrlKey;
                if (!e) {
                    b.filter($(this).val())
                }
                break
            }
        }).on("keydown.ui-selectonemenu", function(e) {
            var f = $.ui.keyCode
              , a = e.which;
            switch (a) {
            case f.UP:
                b.highlightPrev(e);
                break;
            case f.DOWN:
                b.highlightNext(e);
                break;
            case f.ENTER:
            case f.NUMPAD_ENTER:
                b.handleEnterKey(e);
                break;
            case f.TAB:
                b.handleTabKey();
                break;
            case f.ESCAPE:
                b.handleEscapeKey(e);
                break;
            case f.SPACE:
                b.handleSpaceKey(e);
                break;
            default:
                break
            }
        })
    },
    highlightNext: function(d) {
        var f = this.getActiveItem()
          , e = this.panel.is(":hidden") ? f.nextAll(":not(.ui-state-disabled,.ui-selectonemenu-item-group):first") : f.nextAll(":not(.ui-state-disabled,.ui-selectonemenu-item-group):visible:first");
        if (d.altKey) {
            this.show()
        } else {
            if (e.length === 1) {
                if (this.panel.is(":hidden")) {
                    this.selectItem(e)
                } else {
                    this.highlightItem(e);
                    PrimeFaces.scrollInView(this.itemsWrapper, e)
                }
                this.changeAriaValue(e)
            }
        }
        d.preventDefault()
    },
    highlightPrev: function(d) {
        var f = this.getActiveItem()
          , e = this.panel.is(":hidden") ? f.prevAll(":not(.ui-state-disabled,.ui-selectonemenu-item-group):first") : f.prevAll(":not(.ui-state-disabled,.ui-selectonemenu-item-group):visible:first");
        if (e.length === 1) {
            if (this.panel.is(":hidden")) {
                this.selectItem(e)
            } else {
                this.highlightItem(e);
                PrimeFaces.scrollInView(this.itemsWrapper, e)
            }
            this.changeAriaValue(e)
        }
        d.preventDefault()
    },
    handleEnterKey: function(b) {
        if (this.panel.is(":visible")) {
            this.selectItem(this.getActiveItem())
        }
        b.preventDefault();
        b.stopPropagation()
    },
    handleSpaceKey: function(d) {
        var c = $(d.target);
        if (c.is("input") && c.hasClass("ui-selectonemenu-filter")) {
            return
        }
        if (this.panel.is(":hidden")) {
            this.show()
        } else {
            this.hide();
            this.revert();
            this.changeAriaValue(this.getActiveItem())
        }
        d.preventDefault()
    },
    handleEscapeKey: function(b) {
        if (this.panel.is(":visible")) {
            this.revert();
            this.hide()
        }
        b.preventDefault()
    },
    handleTabKey: function() {
        if (this.panel.is(":visible")) {
            this.selectItem(this.getActiveItem())
        }
    },
    show: function() {
        var b = this;
        this.alignPanel();
        this.panel.css("z-index", ++PrimeFaces.zindex);
        if ($.browser.msie && /^[6,7]\.[0-9]+/.test($.browser.version)) {
            this.panel.parent().css("z-index", PrimeFaces.zindex - 1)
        }
        if (this.cfg.effect !== "none") {
            this.panel.show(this.cfg.effect, {}, this.cfg.effectSpeed, function() {
                PrimeFaces.scrollInView(b.itemsWrapper, b.getActiveItem());
                if (b.cfg.filter) {
                    b.focusFilter()
                }
            })
        } else {
            this.panel.show();
            PrimeFaces.scrollInView(this.itemsWrapper, this.getActiveItem());
            if (b.cfg.filter) {
                this.focusFilter(10)
            }
        }
        this.preShowValue = this.options.filter(":selected");
        this.focusInput.attr("aria-expanded", true);
        this.jq.attr("aria-expanded", true)
    },
    hide: function() {
        if ($.browser.msie && /^[6,7]\.[0-9]+/.test($.browser.version)) {
            this.panel.parent().css("z-index", "")
        }
        this.panel.css("z-index", "").hide();
        this.focusInput.attr("aria-expanded", false);
        this.jq.attr("aria-expanded", false)
    },
    focus: function() {
        this.focusInput.focus()
    },
    focusFilter: function(d) {
        if (d) {
            var c = this;
            setTimeout(function() {
                c.focusFilter()
            }, d)
        } else {
            this.filterInput.focus()
        }
    },
    blur: function() {
        this.focusInput.blur()
    },
    disable: function() {
        if (!this.disabled) {
            this.disabled = true;
            this.jq.addClass("ui-state-disabled");
            this.input.attr("disabled", "disabled");
            if (this.cfg.editable) {
                this.label.attr("disabled", "disabled")
            }
            this.unbindEvents()
        }
    },
    enable: function() {
        if (this.disabled) {
            this.disabled = false;
            this.jq.removeClass("ui-state-disabled");
            this.input.removeAttr("disabled");
            if (this.cfg.editable) {
                this.label.removeAttr("disabled")
            }
            this.bindEvents()
        }
    },
    alignPanel: function() {
        this.alignPanelWidth();
        if (this.panel.parent().is(this.jq)) {
            this.panel.css({
                left: 0,
                top: this.jq.innerHeight()
            })
        } else {
            this.panel.css({
                left: "",
                top: ""
            }).position({
                my: "left top",
                at: "left bottom",
                of: this.jq,
                collision: "flipfit"
            })
        }
    },
    setLabel: function(c) {
        var d = this.getLabelToDisplay(c);
        if (this.cfg.editable) {
            if (c === "&nbsp;") {
                this.label.val("")
            } else {
                this.label.val(d)
            }
        } else {
            if (c === "&nbsp;") {
                this.label.html("&nbsp;")
            } else {
                this.label.text(d)
            }
        }
    },
    selectValue: function(c) {
        var d = this.options.filter('[value="' + c + '"]');
        this.selectItem(this.items.eq(d.index()), true)
    },
    getActiveItem: function() {
        return this.items.filter(".ui-state-highlight")
    },
    setupFilterMatcher: function() {
        this.cfg.filterMatchMode = this.cfg.filterMatchMode || "startsWith";
        this.filterMatchers = {
            startsWith: this.startsWithFilter,
            contains: this.containsFilter,
            endsWith: this.endsWithFilter,
            custom: this.cfg.filterFunction
        };
        this.filterMatcher = this.filterMatchers[this.cfg.filterMatchMode]
    },
    startsWithFilter: function(c, d) {
        return c.indexOf(d) === 0
    },
    containsFilter: function(c, d) {
        return c.indexOf(d) !== -1
    },
    endsWithFilter: function(c, d) {
        return c.indexOf(d, c.length - d.length) !== -1
    },
    filter: function(m) {
        this.cfg.initialHeight = this.cfg.initialHeight || this.itemsWrapper.height();
        var n = this.cfg.caseSensitive ? $.trim(m) : $.trim(m).toLowerCase();
        if (n === "") {
            this.items.filter(":hidden").show();
            this.itemsContainer.children(".ui-selectonemenu-item-group").show()
        } else {
            for (var r = 0; r < this.options.length; r++) {
                var q = this.options.eq(r)
                  , s = this.cfg.caseSensitive ? q.text() : q.text().toLowerCase()
                  , g = this.items.eq(r);
                if (g.hasClass("ui-noselection-option")) {
                    g.hide()
                } else {
                    if (this.filterMatcher(s, n)) {
                        g.show()
                    } else {
                        g.hide()
                    }
                }
            }
            var t = this.itemsContainer.children(".ui-selectonemenu-item-group");
            for (var p = 0; p < t.length; p++) {
                var i = t.eq(p);
                if (p === (t.length - 1)) {
                    if (i.nextAll().filter(":visible").length === 0) {
                        i.hide()
                    } else {
                        i.show()
                    }
                } else {
                    if (i.nextUntil(".ui-selectonemenu-item-group").filter(":visible").length === 0) {
                        i.hide()
                    } else {
                        i.show()
                    }
                }
            }
        }
        var o = this.items.filter(":visible:not(.ui-state-disabled):first");
        if (o.length) {
            this.highlightItem(o)
        }
        if (this.itemsContainer.height() < this.cfg.initialHeight) {
            this.itemsWrapper.css("height", "auto")
        } else {
            this.itemsWrapper.height(this.cfg.initialHeight)
        }
        this.alignPanel()
    },
    getSelectedValue: function() {
        return this.input.val()
    },
    getSelectedLabel: function() {
        return this.options.filter(":selected").text()
    },
    getLabelToDisplay: function(b) {
        if (this.cfg.labelTemplate && b !== "&nbsp;") {
            return this.cfg.labelTemplate.replace("{0}", b)
        }
        return b
    },
    changeAriaValue: function(d) {
        var c = d.attr("id");
        this.focusInput.attr("aria-activedescendant", c).attr("aria-describedby", c);
        this.itemsContainer.attr("aria-activedescendant", c)
    }
});
PrimeFaces.widget.SelectOneRadio = PrimeFaces.widget.BaseWidget.extend({
    init: function(f) {
        this._super(f);
        if (this.checkPfVersion()) {
            if (this.cfg.custom) {
                this.inputs = $('input:radio[name="' + this.id + '"]:not(:disabled)');
                this.outputs = this.inputs.parent().next(".ui-radiobutton-box:not(.ui-state-disabled)");
                this.labels = $();
                this.icons = this.outputs.find(".ui-radiobutton-icon");
                for (var f = 0; f < this.outputs.length; f++) {
                    this.labels = this.labels.add('label[for="' + this.outputs.eq(f).parent().attr("id") + '"]')
                }
            } else {
                this.outputs = this.jq.find(".ui-radiobutton-box:not(.ui-state-disabled)");
                this.inputs = this.jq.find(":radio:not(:disabled)");
                this.labels = this.jq.find("label:not(.ui-state-disabled)");
                this.icons = this.jq.find(".ui-radiobutton-icon")
            }
            this.checkedRadio = this.outputs.filter(".ui-state-active");
            this.bindEventsOLD();
            this.inputs.data(PrimeFaces.CLIENT_ID_DATA, this.id)
        } else {
            if (this.cfg.custom) {
                this.originalInputs = this.jq.find(":radio");
                this.inputs = $('input:radio[name="' + this.id + '"].ui-radio-clone');
                this.outputs = this.inputs.parent().next(".ui-radiobutton-box");
                this.labels = $();
                for (var h = 0; h < this.outputs.length; h++) {
                    this.labels = this.labels.add('label[for="' + this.outputs.eq(h).parent().attr("id") + '"]')
                }
                for (var h = 0; h < this.inputs.length; h++) {
                    var j = this.inputs.eq(h)
                      , g = j.data("itemindex")
                      , i = this.originalInputs.eq(g);
                    j.val(i.val());
                    if (i.is(":checked")) {
                        j.prop("checked", true).parent().next().addClass("ui-state-active").children(".ui-radiobutton-icon").addClass("ui-icon-bullet").removeClass("ui-icon-blank")
                    }
                }
            } else {
                this.outputs = this.jq.find(".ui-radiobutton-box");
                this.inputs = this.jq.find(":radio");
                this.labels = this.jq.find("label")
            }
            this.enabledInputs = this.inputs.filter(":not(:disabled)");
            this.checkedRadio = this.outputs.filter(".ui-state-active");
            this.bindEvents();
            this.inputs.data(PrimeFaces.CLIENT_ID_DATA, this.id)
        }
    },
    checkPfVersion: function() {
        return $('input:radio[name="' + this.id + '"].ui-radio-clone').length == 0 ? true : false
    },
    bindEventsOLD: function() {
        var b = this;
        this.outputs.on("mouseover.selectOneRadio", function() {
            $(this).addClass("ui-state-hover")
        }).on("mouseout.selectOneRadio", function() {
            $(this).removeClass("ui-state-hover")
        }).on("click.selectOneRadio", function() {
            var d = $(this)
              , a = d.prev().children(":radio");
            if (!d.hasClass("ui-state-active")) {
                b.unselectOLD(b.checkedRadio);
                b.selectOLD(d);
                a.trigger("click");
                a.trigger("change")
            } else {
                a.trigger("click")
            }
        });
        this.labels.on("click.selectOneRadio", function(e) {
            var f = $(PrimeFaces.escapeClientId($(this).attr("for")))
              , a = null;
            if (f.is(":input")) {
                a = f.parent().next()
            } else {
                a = f.children(".ui-radiobutton-box")
            }
            a.trigger("click.selectOneRadio");
            e.preventDefault()
        });
        this.inputs.on("focus.selectOneRadio", function() {
            var a = $(this)
              , d = a.parent().next();
            if (a.prop("checked")) {
                d.removeClass("ui-state-active")
            }
            d.addClass("ui-state-focus")
        }).on("blur.selectOneRadio", function() {
            var a = $(this)
              , d = a.parent().next();
            if (a.prop("checked")) {
                d.addClass("ui-state-active")
            }
            d.removeClass("ui-state-focus")
        }).on("keydown.selectOneRadio", function(q) {
            var p = $(this)
              , s = p.parent().next()
              , r = b.inputs.index(p)
              , a = b.inputs.length
              , e = $.ui.keyCode
              , o = q.which;
            switch (o) {
            case e.UP:
            case e.LEFT:
                var u = (r === 0) ? b.inputs.eq((a - 1)) : b.inputs.eq(--r)
                  , n = u.parent().next();
                p.blur();
                b.unselectOLD(s);
                b.selectOLD(n);
                u.trigger("focus").trigger("change");
                q.preventDefault();
                break;
            case e.DOWN:
            case e.RIGHT:
                var t = (r === (a - 1)) ? b.inputs.eq(0) : b.inputs.eq(++r)
                  , v = t.parent().next();
                p.blur();
                b.unselectOLD(s);
                b.selectOLD(v);
                t.trigger("focus").trigger("change");
                q.preventDefault();
                break;
            case e.SPACE:
                p.blur();
                if (!p.prop("checked")) {
                    b.selectOLD(s)
                }
                q.preventDefault();
                break
            }
        })
    },
    unselectOLD: function(b) {
        b.prev().children(":radio").prop("checked", false);
        b.removeClass("ui-state-active").children(".ui-radiobutton-icon").removeClass("ui-icon-bullet").addClass("ui-icon-blank")
    },
    selectOLD: function(b) {
        this.checkedRadio = b;
        b.addClass("ui-state-active").children(".ui-radiobutton-icon").addClass("ui-icon-bullet").removeClass("ui-icon-blank");
        b.prev().children(":radio").prop("checked", true)
    },
    bindEvents: function() {
        var b = this;
        this.outputs.filter(":not(.ui-state-disabled)").on("mouseover.selectOneRadio", function() {
            $(this).addClass("ui-state-hover")
        }).on("mouseout.selectOneRadio", function() {
            $(this).removeClass("ui-state-hover")
        }).on("click.selectOneRadio", function() {
            var d = $(this)
              , a = d.prev().children(":radio");
            if (!d.hasClass("ui-state-active")) {
                b.unselect(b.checkedRadio);
                b.select(d);
                a.trigger("click");
                a.trigger("change")
            } else {
                a.trigger("click")
            }
        });
        this.labels.filter(":not(.ui-state-disabled)").on("click.selectOneRadio", function(e) {
            var f = $(PrimeFaces.escapeClientId($(this).attr("for")))
              , a = null;
            if (f.is(":input")) {
                a = f.parent().next()
            } else {
                a = f.children(".ui-radiobutton-box")
            }
            a.trigger("click.selectOneRadio");
            e.preventDefault()
        });
        this.enabledInputs.on("focus.selectOneRadio", function() {
            var a = $(this)
              , d = a.parent().next();
            if (a.prop("checked")) {
                d.removeClass("ui-state-active")
            }
            d.addClass("ui-state-focus")
        }).on("blur.selectOneRadio", function() {
            var a = $(this)
              , d = a.parent().next();
            if (a.prop("checked")) {
                d.addClass("ui-state-active")
            }
            d.removeClass("ui-state-focus")
        }).on("keydown.selectOneRadio", function(q) {
            var p = $(this)
              , s = p.parent().next()
              , r = b.enabledInputs.index(p)
              , a = b.enabledInputs.length
              , e = $.ui.keyCode
              , o = q.which;
            switch (o) {
            case e.UP:
            case e.LEFT:
                var u = (r === 0) ? b.enabledInputs.eq((a - 1)) : b.enabledInputs.eq(--r)
                  , n = u.parent().next();
                p.blur();
                b.unselect(s);
                b.select(n);
                u.trigger("focus").trigger("change");
                q.preventDefault();
                break;
            case e.DOWN:
            case e.RIGHT:
                var t = (r === (a - 1)) ? b.enabledInputs.eq(0) : b.enabledInputs.eq(++r)
                  , v = t.parent().next();
                p.blur();
                b.unselect(s);
                b.select(v);
                t.trigger("focus").trigger("change");
                q.preventDefault();
                break;
            case e.SPACE:
                if (!p.prop("checked")) {
                    b.select(s);
                    p.parent().next().addClass("ui-state-focus").removeClass("ui-state-active")
                }
                q.preventDefault();
                break
            }
        })
    },
    unselect: function(b) {
        b.prev().children(":radio").prop("checked", false);
        b.removeClass("ui-state-active").children(".ui-radiobutton-icon").removeClass("ui-icon-bullet").addClass("ui-icon-blank")
    },
    select: function(b) {
        this.checkedRadio = b;
        b.addClass("ui-state-active").children(".ui-radiobutton-icon").addClass("ui-icon-bullet").removeClass("ui-icon-blank");
        b.prev().children(":radio").prop("checked", true)
    },
    unbindEvents: function(b) {
        if (b) {
            b.off();
            b.parent().nextAll(".ui-radiobutton-box").off();
            this.labels.filter("label[for='" + b.attr("id") + "']").off()
        } else {
            this.inputs.off();
            this.labels.off();
            this.outputs.off()
        }
    },
    disable: function(f) {
        if (f == null) {
            this.inputs.attr("disabled", "disabled");
            this.labels.addClass("ui-state-disabled");
            this.outputs.addClass("ui-state-disabled");
            this.unbindEvents()
        } else {
            var e = this.inputs.eq(f)
              , d = this.labels.filter("label[for='" + e.attr("id") + "']");
            e.attr("disabled", "disabled").parent().nextAll(".ui-radiobutton-box").addClass("ui-state-disabled");
            d.addClass("ui-state-disabled");
            this.unbindEvents(e)
        }
    },
    enable: function(f) {
        if (f == null) {
            this.inputs.removeAttr("disabled");
            this.labels.removeClass("ui-state-disabled");
            this.outputs.removeClass("ui-state-disabled")
        } else {
            var e = this.inputs.eq(f)
              , d = this.labels.filter("label[for='" + e.attr("id") + "']");
            e.removeAttr("disabled").parent().nextAll(".ui-radiobutton-box").removeClass("ui-state-disabled");
            d.removeClass("ui-state-disabled")
        }
        this.bindEvents()
    }
});
PrimeFaces.widget.SelectBooleanCheckbox = PrimeFaces.widget.BaseWidget.extend({
    init: function(d) {
        this._super(d);
        this.input = $(this.jqId + "_input");
        this.box = this.jq.find(".ui-chkbox-box");
        this.icon = this.box.children(".ui-chkbox-icon");
        this.itemLabel = this.jq.find(".ui-chkbox-label");
        this.disabled = this.input.is(":disabled");
        var c = this;
        if (!this.disabled) {
            this.box.on("mouseover.selectBooleanCheckbox", function() {
                c.box.addClass("ui-state-hover")
            }).on("mouseout.selectBooleanCheckbox", function() {
                c.box.removeClass("ui-state-hover")
            }).on("click.selectBooleanCheckbox", function() {
                c.input.trigger("click");
                if (PrimeFaces.env.browser.msie && PrimeFaces.env.isLtIE(9)) {
                    c.input.trigger("change")
                }
            });
            this.input.on("focus.selectBooleanCheckbox", function() {
                if ($(this).prop("checked")) {
                    c.box.removeClass("ui-state-active")
                }
                c.box.addClass("ui-state-focus")
            }).on("blur.selectBooleanCheckbox", function() {
                if ($(this).prop("checked")) {
                    c.box.addClass("ui-state-active")
                }
                c.box.removeClass("ui-state-focus")
            }).on("change.selectBooleanCheckbox", function(a) {
                if (c.isChecked()) {
                    c.box.addClass("ui-state-active").children(".ui-chkbox-icon").removeClass("ui-icon-blank").addClass("ui-icon-check")
                } else {
                    c.box.removeClass("ui-state-active").children(".ui-chkbox-icon").addClass("ui-icon-blank").removeClass("ui-icon-check")
                }
            });
            this.itemLabel.click(function() {
                c.toggle();
                c.input.trigger("focus")
            })
        }
        this.input.data(PrimeFaces.CLIENT_ID_DATA, this.id)
    },
    toggle: function() {
        if (this.isChecked()) {
            this.uncheck()
        } else {
            this.check()
        }
    },
    isChecked: function() {
        return this.input.prop("checked")
    },
    check: function() {
        if (!this.isChecked()) {
            this.input.prop("checked", true).trigger("change");
            this.input.attr("aria-checked", true);
            this.box.addClass("ui-state-active").children(".ui-chkbox-icon").removeClass("ui-icon-blank").addClass("ui-icon-check")
        }
    },
    uncheck: function() {
        if (this.isChecked()) {
            this.input.prop("checked", false).trigger("change");
            this.input.attr("aria-checked", false);
            this.box.removeClass("ui-state-active").children(".ui-chkbox-icon").addClass("ui-icon-blank").removeClass("ui-icon-check")
        }
    }
});
PrimeFaces.widget.SelectManyCheckbox = PrimeFaces.widget.BaseWidget.extend({
    init: function(f) {
        this._super(f);
        if (this.cfg.custom) {
            this.originalInputs = this.jq.find(":checkbox");
            this.inputs = $('input:checkbox[name="' + this.id + '"].ui-chkbox-clone');
            this.outputs = this.inputs.parent().next(".ui-chkbox-box");
            for (var h = 0; h < this.inputs.length; h++) {
                var j = this.inputs.eq(h)
                  , g = j.data("itemindex")
                  , i = this.originalInputs.eq(g);
                j.val(i.val());
                if (i.is(":checked")) {
                    j.prop("checked", true).parent().next().addClass("ui-state-active").children(".ui-chkbox-icon").addClass("ui-icon-check").removeClass("ui-icon-blank")
                }
            }
        } else {
            this.outputs = this.jq.find(".ui-chkbox-box:not(.ui-state-disabled)");
            this.inputs = this.jq.find(":checkbox:not(:disabled)")
        }
        this.enabledInputs = this.inputs.filter(":not(:disabled)");
        this.bindEvents();
        this.inputs.data(PrimeFaces.CLIENT_ID_DATA, this.id)
    },
    bindEvents: function() {
        this.outputs.filter(":not(.ui-state-disabled)").on("mouseover", function() {
            $(this).addClass("ui-state-hover")
        }).on("mouseout", function() {
            $(this).removeClass("ui-state-hover")
        }).on("click", function() {
            var c = $(this)
              , d = c.prev().children(":checkbox");
            d.trigger("click");
            if ($.browser.msie && parseInt($.browser.version) < 9) {
                d.trigger("change")
            }
        });
        this.enabledInputs.on("focus", function() {
            var d = $(this)
              , c = d.parent().next();
            if (d.prop("checked")) {
                c.removeClass("ui-state-active")
            }
            c.addClass("ui-state-focus")
        }).on("blur", function() {
            var d = $(this)
              , c = d.parent().next();
            if (d.prop("checked")) {
                c.addClass("ui-state-active")
            }
            c.removeClass("ui-state-focus")
        }).on("change", function(i) {
            var g = $(this)
              , j = g.parent().next()
              , h = g.is(":focus")
              , e = g.is(":disabled");
            if (e) {
                return
            }
            if (g.is(":checked")) {
                j.children(".ui-chkbox-icon").removeClass("ui-icon-blank").addClass("ui-icon-check");
                if (!h) {
                    j.addClass("ui-state-active")
                }
            } else {
                j.removeClass("ui-state-active").children(".ui-chkbox-icon").addClass("ui-icon-blank").removeClass("ui-icon-check")
            }
        })
    }
});
PrimeFaces.widget.SelectListbox = PrimeFaces.widget.BaseWidget.extend({
    init: function(d) {
        this._super(d);
        this.input = $(this.jqId + "_input"),
        this.listContainer = this.jq.children(".ui-selectlistbox-listcontainer");
        this.listElement = this.listContainer.children(".ui-selectlistbox-list");
        this.options = $(this.input).children("option");
        this.allItems = this.listElement.find(".ui-selectlistbox-item");
        this.items = this.allItems.filter(":not(.ui-state-disabled)");
        var c = this.options.filter(":selected:not(:disabled)");
        if (c.length) {
            PrimeFaces.scrollInView(this.listContainer, this.items.eq(c.eq(0).index()))
        }
        this.bindEvents();
        this.input.data(PrimeFaces.CLIENT_ID_DATA, this.id)
    },
    bindEvents: function() {
        var b = this;
        this.items.on("mouseover.selectListbox", function() {
            var a = $(this);
            if (!a.hasClass("ui-state-highlight")) {
                a.addClass("ui-state-hover")
            }
        }).on("mouseout.selectListbox", function() {
            $(this).removeClass("ui-state-hover")
        }).on("dblclick.selectListbox", function(a) {
            b.input.trigger("dblclick");
            PrimeFaces.clearSelection();
            a.preventDefault()
        });
        this.input.on("focus.selectListbox", function() {
            b.jq.addClass("ui-state-focus")
        }).on("blur.selectListbox", function() {
            b.jq.removeClass("ui-state-focus")
        });
        if (this.cfg.filter) {
            this.filterInput = this.jq.find("> div.ui-selectlistbox-filter-container > input.ui-selectlistbox-filter");
            PrimeFaces.skinInput(this.filterInput);
            this.filterInput.on("keyup.selectListbox", function(a) {
                b.filter(this.value)
            });
            this.setupFilterMatcher()
        }
    },
    unselectAll: function() {
        this.items.removeClass("ui-state-highlight ui-state-hover");
        this.options.filter(":selected").prop("selected", false)
    },
    selectItem: function(b) {
        b.addClass("ui-state-highlight").removeClass("ui-state-hover");
        this.options.eq(b.index()).prop("selected", true)
    },
    unselectItem: function(b) {
        b.removeClass("ui-state-highlight");
        this.options.eq(b.index()).prop("selected", false)
    },
    setupFilterMatcher: function() {
        this.cfg.filterMatchMode = this.cfg.filterMatchMode || "startsWith";
        this.filterMatchers = {
            startsWith: this.startsWithFilter,
            contains: this.containsFilter,
            endsWith: this.endsWithFilter,
            custom: this.cfg.filterFunction
        };
        this.filterMatcher = this.filterMatchers[this.cfg.filterMatchMode]
    },
    startsWithFilter: function(c, d) {
        return c.indexOf(d) === 0
    },
    containsFilter: function(c, d) {
        return c.indexOf(d) !== -1
    },
    endsWithFilter: function(c, d) {
        return c.indexOf(d, c.length - d.length) !== -1
    },
    filter: function(j) {
        var i = this.cfg.caseSensitive ? $.trim(j) : $.trim(j).toLowerCase();
        if (i === "") {
            this.items.filter(":hidden").show()
        } else {
            for (var h = 0; h < this.options.length; h++) {
                var l = this.options.eq(h)
                  , g = this.cfg.caseSensitive ? l.text() : l.text().toLowerCase()
                  , k = this.items.eq(h);
                if (this.filterMatcher(g, i)) {
                    k.show()
                } else {
                    k.hide()
                }
            }
        }
    }
});
PrimeFaces.widget.SelectOneListbox = PrimeFaces.widget.SelectListbox.extend({
    bindEvents: function() {
        this._super();
        var b = this;
        if (!this.cfg.disabled) {
            this.items.on("click.selectListbox", function(e) {
                var a = $(this)
                  , f = b.items.filter(".ui-state-highlight");
                if (a.index() !== f.index()) {
                    if (f.length) {
                        b.unselectItem(f)
                    }
                    b.selectItem(a);
                    b.input.trigger("change")
                }
                b.input.trigger("click");
                PrimeFaces.clearSelection();
                e.preventDefault()
            })
        }
    }
});
PrimeFaces.widget.SelectManyMenu = PrimeFaces.widget.SelectListbox.extend({
    bindEvents: function() {
        this._super();
        var b = this;
        if (!this.cfg.disabled) {
            this.items.on("click.selectListbox", function(q) {
                if (b.checkboxClick) {
                    b.checkboxClick = false;
                    return
                }
                var e = $(this)
                  , u = b.items.filter(".ui-state-highlight")
                  , p = (q.metaKey || q.ctrlKey)
                  , v = (!p && u.length === 1 && u.index() === e.index());
                if (!q.shiftKey) {
                    if (!p) {
                        b.unselectAll()
                    }
                    if (p && e.hasClass("ui-state-highlight")) {
                        b.unselectItem(e)
                    } else {
                        b.selectItem(e);
                        b.cursorItem = e
                    }
                } else {
                    if (b.cursorItem) {
                        b.unselectAll();
                        var o = e.index()
                          , a = b.cursorItem.index()
                          , i = (o > a) ? a : o
                          , r = (o > a) ? (o + 1) : (a + 1);
                        for (var s = i; s < r; s++) {
                            var t = b.allItems.eq(s);
                            if (t.is(":visible") && !t.hasClass("ui-state-disabled")) {
                                b.selectItem(t)
                            }
                        }
                    } else {
                        b.selectItem(e);
                        b.cursorItem = e
                    }
                }
                if (!v) {
                    b.input.trigger("change")
                }
                b.input.trigger("click");
                PrimeFaces.clearSelection();
                q.preventDefault()
            });
            if (this.cfg.showCheckbox) {
                this.checkboxes = this.jq.find("div.ui-chkbox > div.ui-chkbox-box");
                this.checkboxes.on("mouseover.selectManyMenu", function(d) {
                    var a = $(this);
                    if (!a.hasClass("ui-state-active")) {
                        a.addClass("ui-state-hover")
                    }
                }).on("mouseout.selectManyMenu", function(a) {
                    $(this).removeClass("ui-state-hover")
                }).on("click.selectManyMenu", function(d) {
                    b.checkboxClick = true;
                    var a = $(this).closest(".ui-selectlistbox-item");
                    if (a.hasClass("ui-state-highlight")) {
                        b.unselectItem(a)
                    } else {
                        b.selectItem(a)
                    }
                    b.input.trigger("change")
                })
            }
        }
    },
    unselectAll: function() {
        for (var b = 0; b < this.items.length; b++) {
            this.unselectItem(this.items.eq(b))
        }
    },
    selectItem: function(b) {
        this._super(b);
        if (this.cfg.showCheckbox) {
            this.selectCheckbox(b.find("div.ui-chkbox-box"))
        }
    },
    unselectItem: function(b) {
        this._super(b);
        if (this.cfg.showCheckbox) {
            this.unselectCheckbox(b.find("div.ui-chkbox-box"))
        }
    },
    selectCheckbox: function(b) {
        b.removeClass("ui-state-hover").addClass("ui-state-active").children("span.ui-chkbox-icon").removeClass("ui-icon-blank").addClass("ui-icon-check")
    },
    unselectCheckbox: function(b) {
        b.removeClass("ui-state-active").children("span.ui-chkbox-icon").addClass("ui-icon-blank").removeClass("ui-icon-check")
    }
});
PrimeFaces.widget.CommandButton = PrimeFaces.widget.BaseWidget.extend({
    init: function(b) {
        this._super(b);
        PrimeFaces.skinButton(this.jq)
    },
    disable: function() {
        this.jq.removeClass("ui-state-hover ui-state-focus ui-state-active").addClass("ui-state-disabled").attr("disabled", "disabled")
    },
    enable: function() {
        this.jq.removeClass("ui-state-disabled").removeAttr("disabled")
    }
});
PrimeFaces.widget.Button = PrimeFaces.widget.BaseWidget.extend({
    init: function(b) {
        this._super(b);
        PrimeFaces.skinButton(this.jq)
    },
    disable: function() {
        this.jq.removeClass("ui-state-hover ui-state-focus ui-state-active").addClass("ui-state-disabled").attr("disabled", "disabled")
    },
    enable: function() {
        this.jq.removeClass("ui-state-disabled").removeAttr("disabled")
    }
});
PrimeFaces.widget.SelectManyButton = PrimeFaces.widget.BaseWidget.extend({
    init: function(b) {
        this._super(b);
        this.buttons = this.jq.children("div:not(.ui-state-disabled)");
        this.inputs = this.jq.find(":checkbox:not(:disabled)");
        this.bindEvents();
        this.inputs.data(PrimeFaces.CLIENT_ID_DATA, this.id)
    },
    bindEvents: function() {
        var b = this;
        this.buttons.on("mouseover", function() {
            var a = $(this);
            if (!a.hasClass("ui-state-active")) {
                a.addClass("ui-state-hover")
            }
        }).on("mouseout", function() {
            $(this).removeClass("ui-state-hover")
        }).on("click", function(e) {
            var f = $(this)
              , a = f.children(":checkbox");
            if (f.hasClass("ui-state-active")) {
                f.addClass("ui-state-hover")
            } else {
                f.removeClass("ui-state-hover")
            }
            a.trigger("click");
            if (PrimeFaces.env.browser.msie && PrimeFaces.env.isLtIE(9)) {
                a.trigger("change")
            }
        });
        this.inputs.on("focus", function() {
            var a = $(this)
              , d = a.parent();
            if (a.prop("checked")) {
                d.removeClass("ui-state-active")
            }
            d.addClass("ui-state-focus")
        }).on("blur", function() {
            var a = $(this)
              , d = a.parent();
            if (a.prop("checked")) {
                d.addClass("ui-state-active")
            }
            d.removeClass("ui-state-focus")
        }).on("change", function() {
            var a = $(this)
              , d = a.parent();
            if (a.prop("checked")) {
                d.addClass("ui-state-active")
            } else {
                d.removeClass("ui-state-active")
            }
        }).on("click", function(a) {
            a.stopPropagation()
        })
    },
    select: function(b) {
        b.children(":checkbox").prop("checked", true).change()
    },
    unselect: function(b) {
        b.children(":checkbox").prop("checked", false).change()
    }
});
PrimeFaces.widget.SelectOneButton = PrimeFaces.widget.BaseWidget.extend({
    init: function(b) {
        this._super(b);
        this.buttons = this.jq.children("div:not(.ui-state-disabled)");
        this.inputs = this.jq.find(":radio:not(:disabled)");
        this.bindEvents();
        this.inputs.data(PrimeFaces.CLIENT_ID_DATA, this.id)
    },
    bindEvents: function() {
        var b = this;
        this.buttons.on("mouseover", function() {
            var a = $(this);
            if (!a.hasClass("ui-state-active")) {
                a.addClass("ui-state-hover")
            }
        }).on("mouseout", function() {
            $(this).removeClass("ui-state-hover")
        }).on("click", function() {
            var a = $(this);
            if (!a.hasClass("ui-state-active")) {
                b.select(a)
            }
        });
        this.buttons.on("focus.selectOneButton", function() {
            var d = $(this)
              , a = d.children(":radio");
            if (a.prop("checked")) {
                d.removeClass("ui-state-active")
            }
            d.addClass("ui-state-focus")
        }).on("blur.selectOneButton", function() {
            var d = $(this)
              , a = d.children(":radio");
            if (a.prop("checked")) {
                d.addClass("ui-state-active")
            }
            d.removeClass("ui-state-focus")
        }).on("keydown.selectOneButton", function(e) {
            var h = $.ui.keyCode
              , i = e.which;
            if (i === h.SPACE || i === h.ENTER || i === h.NUMPAD_ENTER) {
                var j = $(this)
                  , a = j.children(":radio");
                if (!a.prop("checked")) {
                    b.select(j)
                }
                e.preventDefault()
            }
        })
    },
    select: function(b) {
        this.buttons.filter(".ui-state-active").removeClass("ui-state-active ui-state-hover").children(":radio").prop("checked", false);
        b.addClass("ui-state-active").children(":radio").prop("checked", true);
        this.triggerChange()
    },
    triggerChange: function() {
        if (this.cfg.change) {
            this.cfg.change.call(this)
        }
        if (this.hasBehavior("change")) {
            var b = this.cfg.behaviors.change;
            if (b) {
                b.call(this)
            }
        }
    },
    hasBehavior: function(b) {
        if (this.cfg.behaviors) {
            return this.cfg.behaviors[b] != undefined
        }
        return false
    }
});
PrimeFaces.widget.SelectBooleanButton = PrimeFaces.widget.BaseWidget.extend({
    init: function(d) {
        this._super(d);
        this.input = $(this.jqId + "_input");
        this.disabled = this.input.is(":disabled");
        this.icon = this.jq.children(".ui-button-icon-left");
        var c = this;
        if (!this.disabled) {
            this.jq.on("mouseover", function() {
                if (!c.jq.hasClass("ui-state-active")) {
                    c.jq.addClass("ui-state-hover")
                }
            }).on("mouseout", function() {
                c.jq.removeClass("ui-state-hover")
            }).on("click", function() {
                c.toggle();
                c.input.trigger("focus")
            })
        }
        this.input.on("focus", function() {
            c.jq.addClass("ui-state-focus")
        }).on("blur", function() {
            c.jq.removeClass("ui-state-focus")
        }).on("keydown", function(a) {
            var b = $.ui.keyCode;
            if (a.which === b.SPACE) {
                a.preventDefault()
            }
        }).on("keyup", function(a) {
            var b = $.ui.keyCode;
            if (a.which === b.SPACE) {
                c.toggle();
                a.preventDefault()
            }
        });
        this.input.data(PrimeFaces.CLIENT_ID_DATA, this.id)
    },
    toggle: function() {
        if (!this.disabled) {
            if (this.input.prop("checked")) {
                this.uncheck()
            } else {
                this.check()
            }
        }
    },
    check: function() {
        if (!this.disabled) {
            this.input.prop("checked", true);
            this.jq.addClass("ui-state-active").children(".ui-button-text").html(this.cfg.onLabel);
            if (this.icon.length > 0) {
                this.icon.removeClass(this.cfg.offIcon).addClass(this.cfg.onIcon)
            }
            this.input.trigger("change")
        }
    },
    uncheck: function() {
        if (!this.disabled) {
            this.input.prop("checked", false);
            this.jq.removeClass("ui-state-active").children(".ui-button-text").html(this.cfg.offLabel);
            if (this.icon.length > 0) {
                this.icon.removeClass(this.cfg.onIcon).addClass(this.cfg.offIcon)
            }
            this.input.trigger("change")
        }
    }
});
PrimeFaces.widget.SelectCheckboxMenu = PrimeFaces.widget.BaseWidget.extend({
    init: function(b) {
        this._super(b);
        this.labelContainer = this.jq.find(".ui-selectcheckboxmenu-label-container");
        this.label = this.jq.find(".ui-selectcheckboxmenu-label");
        this.menuIcon = this.jq.children(".ui-selectcheckboxmenu-trigger");
        this.triggers = this.jq.find(".ui-selectcheckboxmenu-trigger, .ui-selectcheckboxmenu-label");
        this.disabled = this.jq.hasClass("ui-state-disabled");
        this.inputs = this.jq.find(":checkbox");
        this.panelId = this.id + "_panel";
        this.labelId = this.id + "_label";
        this.keyboardTarget = $(this.jqId + "_focus");
        this.tabindex = this.keyboardTarget.attr("tabindex");
        this.cfg.showHeader = (this.cfg.showHeader === undefined) ? true : this.cfg.showHeader;
        if (!this.disabled) {
            if (this.cfg.multiple) {
                this.triggers = this.jq.find(".ui-selectcheckboxmenu-trigger, .ui-selectcheckboxmenu-multiple-container")
            }
            this.renderPanel();
            if (this.tabindex) {
                this.panel.find("a, input").attr("tabindex", this.tabindex)
            }
            this.checkboxes = this.itemContainer.find(".ui-chkbox-box:not(.ui-state-disabled)");
            this.labels = this.itemContainer.find("label");
            this.bindEvents();
            this.triggers.data("primefaces-overlay-target", true).find("*").data("primefaces-overlay-target", true);
            if (!this.cfg.multiple) {
                if (this.cfg.updateLabel) {
                    this.defaultLabel = this.label.text();
                    this.label.css({
                        "text-overflow": "ellipsis",
                        overflow: "hidden"
                    });
                    this.updateLabel()
                }
                this.label.attr("id", this.labelId);
                this.keyboardTarget.attr("aria-expanded", false).attr("aria-labelledby", this.labelId)
            }
        }
        this.inputs.data(PrimeFaces.CLIENT_ID_DATA, this.id)
    },
    refresh: function(b) {
        $(PrimeFaces.escapeClientId(this.panelId)).remove();
        this.init(b)
    },
    renderPanel: function() {
        this.panel = $('<div id="' + this.panelId + '" class="ui-selectcheckboxmenu-panel ui-widget ui-widget-content ui-corner-all ui-helper-hidden" role="dialog"></div>');
        this.appendPanel();
        if (this.cfg.panelStyle) {
            this.panel.attr("style", this.cfg.panelStyle)
        }
        if (this.cfg.panelStyleClass) {
            this.panel.addClass(this.cfg.panelStyleClass)
        }
        this.renderHeader();
        this.renderItems();
        if (this.cfg.scrollHeight) {
            this.itemContainerWrapper.height(this.cfg.scrollHeight)
        } else {
            if (this.inputs.length > 10) {
                this.itemContainerWrapper.height(200)
            }
        }
    },
    renderHeader: function() {
        this.header = $('<div class="ui-widget-header ui-corner-all ui-selectcheckboxmenu-header ui-helper-clearfix"></div>').appendTo(this.panel);
        if (!this.cfg.showHeader) {
            this.header.removeClass("ui-helper-clearfix").addClass("ui-helper-hidden")
        }
        this.toggler = $('<div class="ui-chkbox ui-widget"><div class="ui-helper-hidden-accessible"><input type="checkbox" role="checkbox" aria-label="Select All" readonly="readonly"/></div><div class="ui-chkbox-box ui-widget ui-corner-all ui-state-default"><span class="ui-chkbox-icon ui-icon ui-icon-blank"></span></div></div>').appendTo(this.header);
        this.togglerBox = this.toggler.children(".ui-chkbox-box");
        if (this.inputs.filter(":not(:checked)").length === 0) {
            this.check(this.togglerBox)
        }
        if (this.cfg.filter) {
            this.filterInputWrapper = $('<div class="ui-selectcheckboxmenu-filter-container"></div>').appendTo(this.header);
            this.filterInput = $('<input type="text" aria-multiline="false" aria-readonly="false" aria-disabled="false" aria-label="Filter Input" role="textbox" class="ui-inputfield ui-inputtext ui-widget ui-state-default ui-corner-all">').appendTo(this.filterInputWrapper);
            this.filterInputWrapper.append("<span class='ui-icon ui-icon-search'></span>")
        }
        this.closer = $('<a class="ui-selectcheckboxmenu-close ui-corner-all" href="#"><span class="ui-icon ui-icon-circle-close"></span></a>').attr("aria-label", "Close").appendTo(this.header)
    },
    renderItems: function() {
        var x = this;
        this.itemContainerWrapper = $('<div class="ui-selectcheckboxmenu-items-wrapper"><ul class="ui-selectcheckboxmenu-items ui-selectcheckboxmenu-list ui-widget-content ui-widget ui-corner-all ui-helper-reset"></ul></div>').appendTo(this.panel);
        this.itemContainer = this.itemContainerWrapper.children("ul.ui-selectcheckboxmenu-items");
        for (var A = 0; A < this.inputs.length; A++) {
            var s = this.inputs.eq(A)
              , t = s.next()
              , B = s.is(":disabled")
              , q = s.is(":checked")
              , u = s.attr("title")
              , y = "ui-chkbox-box ui-widget ui-corner-all ui-state-default"
              , v = "ui-selectcheckboxmenu-item ui-selectcheckboxmenu-list-item ui-corner-all"
              , D = s.data("escaped");
            if (B) {
                y += " ui-state-disabled"
            }
            if (q) {
                y += " ui-state-active"
            }
            var w = q ? "ui-chkbox-icon ui-icon ui-icon-check" : "ui-chkbox-icon ui-icon ui-icon-blank"
              , v = q ? v + " ui-selectcheckboxmenu-checked" : v + " ui-selectcheckboxmenu-unchecked";
            var i = $('<li class="' + v + '"></li>');
            i.append('<div class="ui-chkbox ui-widget"><div class="ui-helper-hidden-accessible"><input type="checkbox" role="checkbox" readonly="readonly"></input></div><div class="' + y + '"><span class="' + w + '"></span></div></div>');
            var C = $("<label></label>")
              , r = t.html().trim()
              , z = r.length;
            if (z > 0 && r !== "&nbsp;") {
                if (D) {
                    C.text(t.text())
                } else {
                    C.html(t.html())
                }
            } else {
                C.text(s.val())
            }
            C.appendTo(i);
            if (u) {
                i.attr("title", u)
            }
            if (x.cfg.multiple) {
                i.attr("data-item-value", s.val())
            }
            i.find("> .ui-chkbox > .ui-helper-hidden-accessible > input").prop("checked", q).attr("aria-checked", q);
            x.itemContainer.attr("role", "group");
            x.itemContainer.append(i)
        }
        this.items = this.itemContainer.children("li.ui-selectcheckboxmenu-item")
    },
    appendPanel: function() {
        if (this.cfg.appendTo) {
            this.panel.appendTo(PrimeFaces.expressions.SearchExpressionFacade.resolveComponentsAsSelector(this.cfg.appendTo))
        } else {
            this.panel.appendTo(document.body)
        }
    },
    bindEvents: function() {
        var f = this
          , d = "mousedown." + this.id
          , e = "resize." + this.id;
        this.bindCheckboxHover(this.checkboxes);
        this.checkboxes.on("click.selectCheckboxMenu", function() {
            f.toggleItem($(this))
        });
        this.bindCheckboxHover(this.togglerBox);
        this.togglerBox.on("click.selectCheckboxMenu", function() {
            var a = $(this);
            if (a.hasClass("ui-state-active")) {
                f.uncheckAll();
                a.addClass("ui-state-hover")
            } else {
                f.checkAll();
                a.removeClass("ui-state-hover")
            }
        });
        if (this.cfg.filter) {
            this.setupFilterMatcher();
            PrimeFaces.skinInput(this.filterInput);
            this.filterInput.on("keyup.selectCheckboxMenu", function() {
                f.filter($(this).val())
            })
        }
        this.closer.on("mouseenter.selectCheckboxMenu", function() {
            $(this).addClass("ui-state-hover")
        }).on("mouseleave.selectCheckboxMenu", function() {
            $(this).removeClass("ui-state-hover")
        }).on("click.selectCheckboxMenu", function(a) {
            f.hide(true);
            a.preventDefault()
        });
        this.labels.on("click.selectCheckboxMenu", function() {
            var a = $(this).prev().children(".ui-chkbox-box");
            f.toggleItem(a);
            a.removeClass("ui-state-hover");
            PrimeFaces.clearSelection()
        });
        this.triggers.on("mouseover.selectCheckboxMenu", function() {
            if (!f.disabled && !f.triggers.hasClass("ui-state-focus")) {
                f.triggers.addClass("ui-state-hover")
            }
        }).on("mouseout.selectCheckboxMenu", function() {
            if (!f.disabled) {
                f.triggers.removeClass("ui-state-hover")
            }
        }).on("mousedown.selectCheckboxMenu", function(a) {
            if (!f.disabled) {
                if (f.cfg.multiple && $(a.target).is(".ui-selectcheckboxmenu-token-icon")) {
                    return
                }
                if (f.panel.is(":hidden")) {
                    f.show()
                } else {
                    f.hide(true)
                }
            }
        }).on("click.selectCheckboxMenu", function(a) {
            f.keyboardTarget.trigger("focus");
            a.preventDefault()
        });
        this.bindKeyEvents();
        $(document.body).off(d).on(d, function(b) {
            if (f.panel.is(":hidden")) {
                return
            }
            var c = $(b.target);
            if (f.triggers.is(c) || f.triggers.has(c).length > 0) {
                return
            }
            var a = f.panel.offset();
            if (b.pageX < a.left || b.pageX > a.left + f.panel.width() || b.pageY < a.top || b.pageY > a.top + f.panel.height()) {
                f.hide(true)
            }
        });
        $(window).off(e).on(e, function() {
            if (f.panel.is(":visible")) {
                f.alignPanel()
            }
        });
        if (this.cfg.multiple) {
            this.bindMultipleModeEvents()
        }
        if (this.cfg.behaviors) {
            PrimeFaces.attachBehaviors(this.inputs, this.cfg.behaviors)
        }
    },
    bindKeyEvents: function() {
        var f = this;
        this.keyboardTarget.on("focus.selectCheckboxMenu", function() {
            f.jq.addClass("ui-state-focus");
            f.menuIcon.addClass("ui-state-focus")
        }).on("blur.selectCheckboxMenu", function() {
            f.jq.removeClass("ui-state-focus");
            f.menuIcon.removeClass("ui-state-focus")
        }).on("keydown.selectCheckboxMenu", function(a) {
            var b = $.ui.keyCode
              , c = a.which;
            switch (c) {
            case b.ENTER:
            case b.NUMPAD_ENTER:
                if (f.panel.is(":hidden")) {
                    f.show()
                } else {
                    f.hide(true)
                }
                a.preventDefault();
                break;
            case b.TAB:
                if (f.panel.is(":visible")) {
                    if (!f.cfg.showHeader) {
                        f.itemContainer.children("li:not(.ui-state-disabled):first").find("div.ui-helper-hidden-accessible > input").trigger("focus")
                    } else {
                        f.toggler.find("> div.ui-helper-hidden-accessible > input").trigger("focus")
                    }
                    a.preventDefault()
                }
                break
            }
        });
        this.closer.on("focus.selectCheckboxMenu", function(a) {
            f.closer.addClass("ui-state-focus")
        }).on("blur.selectCheckboxMenu", function(a) {
            f.closer.removeClass("ui-state-focus")
        }).on("keydown.selectCheckboxMenu", function(a) {
            var b = $.ui.keyCode
              , c = a.which;
            if (c === b.ENTER || c === b.NUMPAD_ENTER) {
                f.hide(true);
                a.preventDefault()
            }
        });
        var d = this.toggler.find("> div.ui-helper-hidden-accessible > input");
        this.bindCheckboxKeyEvents(d);
        d.on("keyup.selectCheckboxMenu", function(a) {
            if (a.which === $.ui.keyCode.SPACE) {
                var b = $(this);
                if (b.prop("checked")) {
                    f.uncheckAll()
                } else {
                    f.checkAll()
                }
                a.preventDefault()
            }
        }).on("change.selectCheckboxMenu", function(a) {
            var b = $(this);
            if (b.prop("checked")) {
                f.checkAll()
            } else {
                f.uncheckAll()
            }
        });
        var e = this.itemContainer.find("> li > div.ui-chkbox > div.ui-helper-hidden-accessible > input");
        this.bindCheckboxKeyEvents(e);
        e.on("keyup.selectCheckboxMenu", function(a) {
            if (a.which === $.ui.keyCode.SPACE) {
                var c = $(this)
                  , b = c.parent().next();
                if (c.prop("checked")) {
                    f.uncheck(b, true)
                } else {
                    f.check(b, true)
                }
                a.preventDefault()
            }
        }).on("change.selectCheckboxMenu", function(a) {
            var c = $(this)
              , b = c.parent().next();
            if (c.prop("checked")) {
                f.check(b, true)
            } else {
                f.uncheck(b, true)
            }
        })
    },
    bindMultipleModeEvents: function() {
        var c = this;
        this.multiItemContainer = this.jq.children(".ui-selectcheckboxmenu-multiple-container");
        var d = "> li.ui-selectcheckboxmenu-token > .ui-selectcheckboxmenu-token-icon";
        this.multiItemContainer.off("click", d).on("click", d, null, function(a) {
            var b = c.items.filter('[data-item-value="' + $(this).parent().data("item-value") + '"]');
            if (b && b.length) {
                if (c.cfg.dynamic && !c.isDynamicLoaded) {
                    c._renderPanel()
                }
                c.uncheck(b.children(".ui-chkbox").children(".ui-chkbox-box"), true)
            }
        })
    },
    bindCheckboxHover: function(b) {
        b.on("mouseenter.selectCheckboxMenu", function() {
            var a = $(this);
            if (!a.hasClass("ui-state-active") && !a.hasClass("ui-state-disabled")) {
                a.addClass("ui-state-hover")
            }
        }).on("mouseleave.selectCheckboxMenu", function() {
            $(this).removeClass("ui-state-hover")
        })
    },
    filter: function(j) {
        var i = this.cfg.caseSensitive ? $.trim(j) : $.trim(j).toLowerCase();
        if (i === "") {
            this.itemContainer.children("li.ui-selectcheckboxmenu-item").filter(":hidden").show()
        } else {
            for (var g = 0; g < this.labels.length; g++) {
                var h = this.labels.eq(g)
                  , k = h.parent()
                  , l = this.cfg.caseSensitive ? h.text() : h.text().toLowerCase();
                if (this.filterMatcher(l, i)) {
                    k.show()
                } else {
                    k.hide()
                }
            }
        }
        if (this.cfg.scrollHeight) {
            if (this.itemContainer.height() < this.cfg.initialHeight) {
                this.itemContainerWrapper.css("height", "auto")
            } else {
                this.itemContainerWrapper.height(this.cfg.initialHeight)
            }
        }
        this.updateToggler()
    },
    setupFilterMatcher: function() {
        this.cfg.filterMatchMode = this.cfg.filterMatchMode || "startsWith";
        this.filterMatchers = {
            startsWith: this.startsWithFilter,
            contains: this.containsFilter,
            endsWith: this.endsWithFilter,
            custom: this.cfg.filterFunction
        };
        this.filterMatcher = this.filterMatchers[this.cfg.filterMatchMode]
    },
    startsWithFilter: function(c, d) {
        return c.indexOf(d) === 0
    },
    containsFilter: function(c, d) {
        return c.indexOf(d) !== -1
    },
    endsWithFilter: function(c, d) {
        return c.indexOf(d, c.length - d.length) !== -1
    },
    checkAll: function() {
        for (var d = 0; d < this.items.length; d++) {
            var c = this.items.eq(d);
            if (c.is(":visible")) {
                this.inputs.eq(d).prop("checked", true).attr("aria-checked", true);
                this.check(c.children(".ui-chkbox").children(".ui-chkbox-box"));
                if (this.cfg.multiple) {
                    this.createMultipleItem(c)
                }
            }
        }
        this.check(this.togglerBox);
        if (!this.togglerBox.hasClass("ui-state-disabled")) {
            this.togglerBox.prev().children("input").trigger("focus.selectCheckboxMenu");
            this.togglerBox.addClass("ui-state-active")
        }
        if (this.cfg.multiple) {
            this.alignPanel()
        }
        this.fireToggleSelectEvent(true)
    },
    uncheckAll: function() {
        for (var d = 0; d < this.items.length; d++) {
            var c = this.items.eq(d);
            if (c.is(":visible")) {
                this.inputs.eq(d).prop("checked", false).attr("aria-checked", false);
                this.uncheck(c.children(".ui-chkbox").children(".ui-chkbox-box"));
                if (this.cfg.multiple) {
                    this.multiItemContainer.children().remove()
                }
            }
        }
        this.uncheck(this.togglerBox);
        if (!this.togglerBox.hasClass("ui-state-disabled")) {
            this.togglerBox.prev().children("input").trigger("focus.selectCheckboxMenu")
        }
        if (this.cfg.multiple) {
            this.alignPanel()
        }
        this.fireToggleSelectEvent(false)
    },
    fireToggleSelectEvent: function(f) {
        if (this.cfg.behaviors) {
            var e = this.cfg.behaviors.toggleSelect;
            if (e) {
                var d = {
                    params: [{
                        name: this.id + "_checked",
                        value: f
                    }]
                };
                e.call(this, d)
            }
        }
    },
    check: function(h, i) {
        if (!h.hasClass("ui-state-disabled")) {
            var g = h.prev().children("input")
              , j = h.closest("li.ui-selectcheckboxmenu-item");
            g.prop("checked", true).attr("aria-checked", true);
            if (i) {
                g.trigger("focus.selectCheckboxMenu")
            }
            h.addClass("ui-state-active").children(".ui-chkbox-icon").removeClass("ui-icon-blank").addClass("ui-icon-check");
            h.closest("li.ui-selectcheckboxmenu-item").removeClass("ui-selectcheckboxmenu-unchecked").addClass("ui-selectcheckboxmenu-checked");
            if (i) {
                var f = this.inputs.eq(j.index());
                f.prop("checked", true).attr("aria-checked", true).change();
                this.updateToggler();
                if (this.cfg.multiple) {
                    this.createMultipleItem(j);
                    this.alignPanel()
                }
            }
            if (this.cfg.updateLabel) {
                this.updateLabel()
            }
        }
    },
    uncheck: function(h, i) {
        if (!h.hasClass("ui-state-disabled")) {
            var f = h.prev().children("input")
              , j = h.closest("li.ui-selectcheckboxmenu-item");
            h.removeClass("ui-state-active").children(".ui-chkbox-icon").addClass("ui-icon-blank").removeClass("ui-icon-check");
            h.closest("li.ui-selectcheckboxmenu-item").addClass("ui-selectcheckboxmenu-unchecked").removeClass("ui-selectcheckboxmenu-checked");
            f.prop("checked", false).attr("aria-checked", false);
            if (i) {
                var g = this.inputs.eq(j.index());
                g.prop("checked", false).attr("aria-checked", false).change();
                f.trigger("focus.selectCheckboxMenu");
                this.updateToggler();
                if (this.cfg.multiple) {
                    this.removeMultipleItem(j);
                    this.alignPanel()
                }
            }
            if (this.cfg.updateLabel) {
                this.updateLabel()
            }
        }
    },
    show: function() {
        this.alignPanel();
        this.keyboardTarget.attr("aria-expanded", true);
        this.panel.show();
        this.postShow()
    },
    hide: function(d) {
        var c = this;
        this.keyboardTarget.attr("aria-expanded", false);
        if (d) {
            this.panel.fadeOut("fast", function() {
                c.postHide()
            })
        } else {
            this.panel.hide();
            this.postHide()
        }
    },
    postShow: function() {
        if (this.cfg.onShow) {
            this.cfg.onShow.call(this)
        }
    },
    postHide: function() {
        if (this.cfg.onHide) {
            this.cfg.onHide.call(this)
        }
    },
    alignPanel: function() {
        var e = this.panel.css("position") == "fixed"
          , h = $(window)
          , f = e ? "-" + h.scrollLeft() + " -" + h.scrollTop() : null
          , g = this.panel.attr("style");
        this.panel.css({
            left: "",
            top: "",
            "z-index": ++PrimeFaces.zindex
        });
        if (this.panel.parent().attr("id") === this.id) {
            this.panel.css({
                left: 0,
                top: this.jq.innerHeight()
            })
        } else {
            this.panel.position({
                my: "left top",
                at: "left bottom",
                of: this.jq,
                offset: f
            })
        }
        if (!this.widthAligned && (this.panel.width() < this.jq.width()) && (!g || g.toLowerCase().indexOf("width") === -1)) {
            this.panel.width(this.jq.width());
            this.widthAligned = true
        }
    },
    toggleItem: function(b) {
        if (!b.hasClass("ui-state-disabled")) {
            if (b.hasClass("ui-state-active")) {
                this.uncheck(b, true);
                b.addClass("ui-state-hover")
            } else {
                this.check(b, true);
                b.removeClass("ui-state-hover")
            }
        }
    },
    updateToggler: function() {
        var b = this.itemContainer.children("li.ui-selectcheckboxmenu-item:visible");
        if (b.length && b.filter(".ui-selectcheckboxmenu-unchecked").length === 0) {
            this.check(this.togglerBox)
        } else {
            this.uncheck(this.togglerBox)
        }
    },
    bindCheckboxKeyEvents: function(d) {
        var c = this;
        d.on("focus.selectCheckboxMenu", function(a) {
            var e = $(this)
              , b = e.parent().next();
            if (e.prop("checked")) {
                b.removeClass("ui-state-active")
            }
            b.addClass("ui-state-focus");
            PrimeFaces.scrollInView(c.itemContainerWrapper, b)
        }).on("blur.selectCheckboxMenu", function(a) {
            var e = $(this)
              , b = e.parent().next();
            if (e.prop("checked")) {
                b.addClass("ui-state-active")
            }
            b.removeClass("ui-state-focus")
        }).on("keydown.selectCheckboxMenu", function(a) {
            if (a.which === $.ui.keyCode.SPACE) {
                a.preventDefault()
            }
        })
    },
    updateLabel: function() {
        var e = this.jq.find(":checked")
          , f = "";
        if (e && e.length) {
            for (var d = 0; d < e.length; d++) {
                if (d != 0) {
                    f = f + ","
                }
                f = f + $(e[d]).next().text()
            }
        } else {
            f = this.defaultLabel
        }
        this.label.text(f);
        this.labelContainer.attr("title", f)
    },
    createMultipleItem: function(j) {
        var n = this.multiItemContainer.children();
        if (n.length && n.filter('[data-item-value="' + j.data("item-value") + '"]').length > 0) {
            return
        }
        var p = j.prevAll("li.ui-selectcheckboxmenu-item-group")
          , l = this.inputs.eq(j.index() - p.length)
          , r = l.data("escaped")
          , k = l.next().html().trim()
          , o = k.length
          , m = o > 0 && k !== "&nbsp;" ? (r ? l.next().text() : l.next().html()) : l.val()
          , q = '<li class="ui-selectcheckboxmenu-token ui-state-active ui-corner-all" data-item-value="' + l.val() + '">';
        q += '<span class="ui-selectcheckboxmenu-token-icon ui-icon ui-icon-close" />';
        q += '<span class="ui-selectcheckboxmenu-token-label">' + m + "</span></li>";
        this.multiItemContainer.append(q)
    },
    removeMultipleItem: function(c) {
        var d = this.multiItemContainer.children();
        if (d.length) {
            d.filter('[data-item-value="' + c.data("item-value") + '"]').remove()
        }
    }
});
PrimeFaces.widget.InputMask = PrimeFaces.widget.BaseWidget.extend({
    init: function(b) {
        this._super(b);
        if (this.cfg.mask) {
            this.jq.mask(this.cfg.mask, this.cfg)
        }
        PrimeFaces.skinInput(this.jq)
    },
    setValue: function(b) {
        this.jq.val(b);
        this.jq.unmask().mask(this.cfg.mask, this.cfg)
    },
    getValue: function() {
        return this.jq.val()
    }
});
PrimeFaces.widget.Password = PrimeFaces.widget.BaseWidget.extend({
    init: function(b) {
        this._super(b);
        if (!this.jq.is(":disabled")) {
            if (this.cfg.feedback) {
                this.setupFeedback()
            }
            PrimeFaces.skinInput(this.jq)
        }
    },
    setupFeedback: function() {
        var g = this;
        var i = $(this.jqId + "_panel");
        if (i.length == 1) {
            i.remove()
        }
        this.cfg.promptLabel = this.cfg.promptLabel || "Please enter a password";
        this.cfg.weakLabel = this.cfg.weakLabel || "Weak";
        this.cfg.goodLabel = this.cfg.goodLabel || "Medium";
        this.cfg.strongLabel = this.cfg.strongLabel || "Strong";
        var h = this.cfg.inline ? "ui-password-panel-inline" : "ui-password-panel-overlay";
        var j = '<div id="' + this.id + '_panel" class="ui-password-panel ui-widget ui-state-highlight ui-corner-all ui-helper-hidden ' + h + '">';
        j += '<div class="ui-password-meter" style="background-position:0pt 0pt">&nbsp;</div>';
        j += '<div class="ui-password-info">' + this.cfg.promptLabel + "</div>";
        j += "</div>";
        this.panel = $(j).insertAfter(this.jq);
        this.meter = this.panel.children("div.ui-password-meter");
        this.infoText = this.panel.children("div.ui-password-info");
        if (!this.cfg.inline) {
            this.panel.addClass("ui-shadow")
        }
        this.jq.focus(function() {
            g.show()
        }).blur(function() {
            g.hide()
        }).keyup(function() {
            var b = g.jq.val()
              , d = null
              , c = null;
            if (b.length == 0) {
                d = g.cfg.promptLabel;
                c = "0px 0px"
            } else {
                var a = g.testStrength(g.jq.val());
                if (a < 30) {
                    d = g.cfg.weakLabel;
                    c = "0px -10px"
                } else {
                    if (a >= 30 && a < 80) {
                        d = g.cfg.goodLabel;
                        c = "0px -20px"
                    } else {
                        if (a >= 80) {
                            d = g.cfg.strongLabel;
                            c = "0px -30px"
                        }
                    }
                }
            }
            g.meter.css("background-position", c);
            g.infoText.text(d)
        });
        if (!this.cfg.inline) {
            this.panel.appendTo("body");
            var f = "resize." + this.id;
            $(window).unbind(f).bind(f, function() {
                if (g.panel.is(":visible")) {
                    g.align()
                }
            })
        }
    },
    testStrength: function(g) {
        var e = 0
          , h = 0
          , f = this;
        h = g.match("[0-9]");
        e += f.normalize(h ? h.length : 1 / 4, 1) * 25;
        h = g.match("[a-zA-Z]");
        e += f.normalize(h ? h.length : 1 / 2, 3) * 10;
        h = g.match("[!@#$%^&*?_~.,;=]");
        e += f.normalize(h ? h.length : 1 / 6, 1) * 35;
        h = g.match("[A-Z]");
        e += f.normalize(h ? h.length : 1 / 6, 1) * 30;
        e *= g.length / 8;
        return e > 100 ? 100 : e
    },
    normalize: function(e, f) {
        var d = e - f;
        if (d <= 0) {
            return e / f
        } else {
            return 1 + 0.5 * (e / (e + f / 4))
        }
    },
    align: function() {
        this.panel.css({
            left: "",
            top: "",
            "z-index": ++PrimeFaces.zindex
        }).position({
            my: "left top",
            at: "right top",
            of: this.jq
        })
    },
    show: function() {
        if (!this.cfg.inline) {
            this.align();
            this.panel.fadeIn()
        } else {
            this.panel.slideDown()
        }
    },
    hide: function() {
        if (this.cfg.inline) {
            this.panel.slideUp()
        } else {
            this.panel.fadeOut()
        }
    }
});
PrimeFaces.widget.DefaultCommand = PrimeFaces.widget.BaseWidget.extend({
    init: function(d) {
        this.cfg = d;
        this.id = this.cfg.id;
        this.jqId = PrimeFaces.escapeClientId(this.id);
        this.jqTarget = $(PrimeFaces.escapeClientId(this.cfg.target));
        this.scope = this.cfg.scope ? $(PrimeFaces.escapeClientId(this.cfg.scope)) : null;
        var c = this;
        if (this.jqTarget.is(":not(:button):not(:input):not(a)")) {
            this.jqTarget = this.jqTarget.find("button,a").filter(":visible").first()
        }
        this.jqTarget.closest("form").off("keydown." + this.id).on("keydown." + this.id, function(a) {
            var b = $.ui.keyCode;
            if (a.which == b.ENTER || a.which == b.NUMPAD_ENTER) {
                if ((c.scope && c.scope.find(a.target).length == 0) || $(a.target).is('textarea,button,input[type="submit"],a')) {
                    return true
                }
                c.jqTarget.click();
                a.preventDefault()
            }
        });
        this.removeScriptElement(this.id)
    }
});
PrimeFaces.widget.SplitButton = PrimeFaces.widget.BaseWidget.extend({
    init: function(b) {
        this._super(b);
        this.button = $(this.jqId + "_button");
        this.menuButton = $(this.jqId + "_menuButton");
        this.menuId = this.jqId + "_menu";
        this.menu = $(this.menuId);
        this.menuitems = this.menu.find(".ui-menuitem:not(.ui-state-disabled)");
        this.cfg.disabled = this.button.is(":disabled");
        if (!this.cfg.disabled) {
            this.bindEvents();
            this.appendPanel()
        }
        this.button.data(PrimeFaces.CLIENT_ID_DATA, this.id);
        this.menuButton.data(PrimeFaces.CLIENT_ID_DATA, this.id)
    },
    refresh: function(b) {
        this.menu.remove();
        this.init(b)
    },
    destroy: function() {
        this._super();
        this.menu.remove()
    },
    bindEvents: function() {
        var f = this;
        PrimeFaces.skinButton(this.button).skinButton(this.menuButton);
        this.button.data("primefaces-overlay-target", true).find("*").data("primefaces-overlay-target", true);
        this.menuButton.click(function() {
            if (f.menu.is(":hidden")) {
                f.show()
            } else {
                f.hide()
            }
        });
        this.menuitems.mouseover(function(a) {
            var b = $(this)
              , c = b.children(".ui-menuitem-link");
            if (!c.hasClass("ui-state-disabled")) {
                b.addClass("ui-state-hover")
            }
        }).mouseout(function(a) {
            $(this).removeClass("ui-state-hover")
        }).click(function() {
            f.hide()
        });
        this.menuButton.keydown(function(b) {
            var c = $.ui.keyCode;
            switch (b.which) {
            case c.UP:
                var j = f.menuitems.filter(".ui-state-hover")
                  , k = j.length ? j.prevAll(":not(.ui-separator)") : null;
                if (k && k.length) {
                    j.removeClass("ui-state-hover");
                    k.eq(0).addClass("ui-state-hover")
                }
                b.preventDefault();
                break;
            case c.DOWN:
                var j = f.menuitems.filter(".ui-state-hover")
                  , a = j.length ? j.nextAll(":not(.ui-separator)") : f.menuitems.eq(0);
                if (a.length) {
                    j.removeClass("ui-state-hover");
                    a.eq(0).addClass("ui-state-hover")
                }
                b.preventDefault();
                break;
            case c.ENTER:
            case c.NUMPAD_ENTER:
            case c.SPACE:
                if (f.menu.is(":visible")) {
                    f.menuitems.filter(".ui-state-hover").children("a").trigger("click")
                } else {
                    f.show()
                }
                b.preventDefault();
                break;
            case c.ESCAPE:
            case c.TAB:
                f.hide();
                break
            }
        });
        var d = "mousedown." + this.id;
        $(document.body).off(d).on(d, function(b) {
            if (f.menu.is(":hidden")) {
                return
            }
            var c = $(b.target);
            if (c.is(f.button) || f.button.has(c).length > 0) {
                return
            }
            var a = f.menu.offset();
            if (b.pageX < a.left || b.pageX > a.left + f.menu.width() || b.pageY < a.top || b.pageY > a.top + f.menu.height()) {
                f.button.removeClass("ui-state-focus ui-state-hover");
                f.hide()
            }
        });
        var e = "resize." + this.id;
        $(window).off(e).on(e, function() {
            if (f.menu.is(":visible")) {
                f.alignPanel()
            }
        })
    },
    appendPanel: function() {
        var b = this.cfg.appendTo ? PrimeFaces.expressions.SearchExpressionFacade.resolveComponentsAsSelector(this.cfg.appendTo) : $(document.body);
        if (!b.is(this.jq)) {
            b.children(this.menuId).remove();
            this.menu.appendTo(b)
        }
    },
    show: function() {
        this.alignPanel();
        this.menuButton.focus();
        this.menu.show()
    },
    hide: function() {
        this.menuitems.filter(".ui-state-hover").removeClass("ui-state-hover");
        this.menuButton.removeClass("ui-state-focus");
        this.menu.fadeOut("fast")
    },
    alignPanel: function() {
        this.menu.css({
            left: "",
            top: "",
            "z-index": ++PrimeFaces.zindex
        });
        if (this.menu.parent().is(this.jq)) {
            this.menu.css({
                left: 0,
                top: this.jq.innerHeight()
            })
        } else {
            this.menu.position({
                my: "left top",
                at: "left bottom",
                of: this.button
            })
        }
    }
});
PrimeFaces.widget.ThemeSwitcher = PrimeFaces.widget.SelectOneMenu.extend({
    init: function(d) {
        this._super(d);
        var c = this;
        this.input.on("change", function() {
            PrimeFaces.changeTheme(c.getSelectedValue())
        })
    }
});
PrimeFaces.widget.MultiSelectListbox = PrimeFaces.widget.BaseWidget.extend({
    init: function(d) {
        this._super(d);
        this.root = this.jq.children("div.ui-multiselectlistbox-listcontainer");
        this.items = this.jq.find("li.ui-multiselectlistbox-item");
        this.input = $(this.jqId + "_input");
        this.cfg.disabled = this.jq.hasClass("ui-state-disabled");
        if (!this.cfg.disabled) {
            this.bindEvents()
        }
        var c = this.input.val();
        if (c !== "") {
            this.preselect(c)
        }
    },
    bindEvents: function() {
        var b = this;
        this.items.on("mouseover.multiSelectListbox", function() {
            var a = $(this);
            if (!a.hasClass("ui-state-highlight")) {
                $(this).addClass("ui-state-hover")
            }
        }).on("mouseout.multiSelectListbox", function() {
            var a = $(this);
            if (!a.hasClass("ui-state-highlight")) {
                $(this).removeClass("ui-state-hover")
            }
        }).on("click.multiSelectListbox", function() {
            var a = $(this);
            if (!a.hasClass("ui-state-highlight")) {
                b.showOptionGroup(a);
                b.triggerChange()
            }
        })
    },
    unbindEvents: function() {
        this.items.off("mouseover.multiSelectListbox mouseout.multiSelectListbox click.multiSelectListbox")
    },
    showOptionGroup: function(d) {
        d.addClass("ui-state-highlight").removeClass("ui-state-hover").siblings().filter(".ui-state-highlight").removeClass("ui-state-highlight");
        d.closest(".ui-multiselectlistbox-listcontainer").nextAll().remove();
        this.input.val(d.attr("data-value"));
        var e = d.children("ul");
        if (e.length) {
            var f = $('<div class="ui-multiselectlistbox-listcontainer" style="display:none"></div>');
            e.clone(true).appendTo(f).addClass("ui-multiselectlistbox-list ui-inputfield ui-widget-content").removeClass("ui-helper-hidden");
            if (this.cfg.showHeaders) {
                f.prepend('<div class="ui-multiselectlistbox-header ui-widget-header ui-corner-top">' + d.children("span").text() + "</div>").children(".ui-multiselectlistbox-list").addClass("ui-corner-bottom")
            } else {
                f.children().addClass("ui-corner-all")
            }
            this.jq.append(f);
            if (this.cfg.effect) {
                f.show(this.cfg.effect)
            } else {
                f.show()
            }
        }
    },
    enable: function() {
        if (this.cfg.disabled) {
            this.cfg.disabled = false;
            this.jq.removeClass("ui-state-disabled");
            this.bindEvents()
        }
    },
    disable: function() {
        if (!this.cfg.disabled) {
            this.cfg.disabled = true;
            this.jq.addClass("ui-state-disabled");
            this.unbindEvents();
            this.root.nextAll().remove()
        }
    },
    preselect: function(n) {
        var q = this
          , l = this.items.filter('[data-value="' + n + '"]');
        if (l.length === 0) {
            return
        }
        var i = l.parentsUntil(".ui-multiselectlistbox-list")
          , o = [];
        for (var t = (i.length - 1); t >= 0; t--) {
            var s = i.eq(t);
            if (s.is("li")) {
                o.push(s.index())
            } else {
                if (s.is("ul")) {
                    var p = $('<div class="ui-multiselectlistbox-listcontainer" style="display:none"></div>');
                    s.clone(true).appendTo(p).addClass("ui-multiselectlistbox-list ui-inputfield ui-widget-content ui-corner-all").removeClass("ui-helper-hidden");
                    if (this.cfg.showHeaders) {
                        p.prepend('<div class="ui-multiselectlistbox-header ui-widget-header ui-corner-top">' + s.prev("span").text() + "</div>").children(".ui-multiselectlistbox-list").addClass("ui-corner-bottom").removeClass("ui-corner-all")
                    }
                    q.jq.append(p)
                }
            }
        }
        var m = this.jq.children("div.ui-multiselectlistbox-listcontainer")
          , r = m.find(" > ul.ui-multiselectlistbox-list > li.ui-multiselectlistbox-item").filter('[data-value="' + n + '"]');
        r.addClass("ui-state-highlight");
        for (var t = 0; t < o.length; t++) {
            m.eq(t).find("> .ui-multiselectlistbox-list > li.ui-multiselectlistbox-item").eq(o[t]).addClass("ui-state-highlight")
        }
        q.jq.children("div.ui-multiselectlistbox-listcontainer:hidden").show()
    },
    triggerChange: function() {
        if (this.hasBehavior("change")) {
            var b = this.cfg.behaviors.change;
            if (b) {
                b.call(this)
            }
        }
    }
});
PrimeFaces.widget.Growl = PrimeFaces.widget.BaseWidget.extend({
    init: function(b) {
        this.cfg = b;
        this.id = this.cfg.id;
        this.jqId = PrimeFaces.escapeClientId(this.id);
        this.render();
        this.removeScriptElement(this.id)
    },
    refresh: function(b) {
        this.cfg = b;
        this.show(b.msgs);
        this.removeScriptElement(this.id)
    },
    show: function(c) {
        var d = this;
        this.jq.css("z-index", ++PrimeFaces.zindex);
        this.removeAll();
        $.each(c, function(b, a) {
            d.renderMessage(a)
        })
    },
    removeAll: function() {
        this.jq.children("div.ui-growl-item-container").remove()
    },
    render: function() {
        this.jq = $('<div id="' + this.id + '_container" class="ui-growl ui-widget"></div>');
        this.jq.appendTo($(document.body));
        this.show(this.cfg.msgs)
    },
    renderMessage: function(h) {
        var g = '<div class="ui-growl-item-container ui-state-highlight ui-corner-all ui-helper-hidden ui-shadow" aria-live="polite">';
        g += '<div class="ui-growl-item">';
        g += '<div class="ui-growl-icon-close ui-icon ui-icon-closethick" style="display:none"></div>';
        g += '<span class="ui-growl-image ui-growl-image-' + h.severity + '" />';
        g += '<div class="ui-growl-message">';
        g += '<span class="ui-growl-title"></span>';
        g += "<p></p>";
        g += '</div><div style="clear: both;"></div></div></div>';
        var j = $(g)
          , f = j.find("span.ui-growl-title")
          , i = f.next();
        if (this.cfg.escape) {
            f.text(h.summary);
            i.text(h.detail)
        } else {
            f.html(h.summary);
            i.html(h.detail)
        }
        this.bindEvents(j);
        j.appendTo(this.jq).fadeIn()
    },
    bindEvents: function(d) {
        var e = this
          , f = this.cfg.sticky;
        d.mouseover(function() {
            var a = $(this);
            if (!a.is(":animated")) {
                a.find("div.ui-growl-icon-close:first").show()
            }
        }).mouseout(function() {
            $(this).find("div.ui-growl-icon-close:first").hide()
        });
        d.find("div.ui-growl-icon-close").click(function() {
            e.removeMessage(d);
            if (!f) {
                clearTimeout(d.data("timeout"))
            }
        });
        if (!f) {
            this.setRemovalTimeout(d)
        }
    },
    removeMessage: function(b) {
        b.fadeTo("normal", 0, function() {
            b.slideUp("normal", "easeInOutCirc", function() {
                b.remove()
            })
        })
    },
    setRemovalTimeout: function(d) {
        var e = this;
        var f = setTimeout(function() {
            e.removeMessage(d)
        }, this.cfg.life);
        d.data("timeout", f)
    }
});
PrimeFaces.widget.Inplace = PrimeFaces.widget.BaseWidget.extend({
    init: function(f) {
        this._super(f);
        this.display = $(this.jqId + "_display");
        this.content = $(this.jqId + "_content");
        this.cfg.formId = this.jq.parents("form:first").attr("id");
        var h = this;
        if (!this.cfg.disabled) {
            if (this.cfg.toggleable) {
                this.display.bind(this.cfg.event, function() {
                    h.show()
                });
                this.display.mouseover(function() {
                    $(this).toggleClass("ui-state-highlight")
                }).mouseout(function() {
                    $(this).toggleClass("ui-state-highlight")
                })
            } else {
                this.display.css("cursor", "default")
            }
            if (this.cfg.editor) {
                this.cfg.formId = $(this.jqId).parents("form:first").attr("id");
                this.editor = $(this.jqId + "_editor");
                var e = this.editor.children(".ui-inplace-save")
                  , g = this.editor.children(".ui-inplace-cancel");
                PrimeFaces.skinButton(e).skinButton(g);
                e.click(function(a) {
                    h.save(a)
                });
                g.click(function(a) {
                    h.cancel(a)
                })
            }
            this.content.find("input:text,textarea").on("keydown.inplace-text", function(a) {
                var b = $.ui.keyCode;
                if (a.which === b.SPACE) {
                    a.stopPropagation()
                }
            })
        }
    },
    show: function() {
        this.toggle(this.content, this.display)
    },
    hide: function() {
        this.toggle(this.display, this.content)
    },
    toggle: function(e, d) {
        var f = this;
        if (this.cfg.effect === "fade") {
            d.fadeOut(this.cfg.effectSpeed, function() {
                e.fadeIn(f.cfg.effectSpeed);
                f.postShow()
            })
        } else {
            if (this.cfg.effect === "slide") {
                d.slideUp(this.cfg.effectSpeed, function() {
                    e.slideDown(f.cfg.effectSpeed);
                    f.postShow()
                })
            } else {
                if (this.cfg.effect === "none") {
                    d.hide();
                    e.show();
                    f.postShow()
                }
            }
        }
    },
    postShow: function() {
        this.content.find("input:text,textarea").filter(":visible:enabled:first").focus().select();
        PrimeFaces.invokeDeferredRenders(this.id)
    },
    getDisplay: function() {
        return this.display
    },
    getContent: function() {
        return this.content
    },
    save: function(f) {
        var e = {
            source: this.id,
            update: this.id,
            process: this.id,
            formId: this.cfg.formId
        };
        if (this.hasBehavior("save")) {
            var d = this.cfg.behaviors.save;
            d.call(this, e)
        } else {
            PrimeFaces.ajax.AjaxRequest(e)
        }
    },
    cancel: function(f) {
        var e = {
            source: this.id,
            update: this.id,
            process: this.id,
            formId: this.cfg.formId
        };
        e.params = [{
            name: this.id + "_cancel",
            value: true
        }];
        if (this.hasBehavior("cancel")) {
            var d = this.cfg.behaviors.cancel;
            d.call(this, e)
        } else {
            PrimeFaces.ajax.AjaxRequest(e)
        }
    },
    hasBehavior: function(b) {
        if (this.cfg.behaviors) {
            return this.cfg.behaviors[b] !== undefined
        }
        return false
    }
});
PrimeFaces.widget.LightBox = PrimeFaces.widget.BaseWidget.extend({
    init: function(b) {
        this._super(b);
        this.links = this.jq.children(":not(.ui-lightbox-inline)");
        this.createPanel();
        if (this.cfg.mode === "image") {
            this.setupImaging()
        } else {
            if (this.cfg.mode === "inline") {
                this.setupInline()
            } else {
                if (this.cfg.mode === "iframe") {
                    this.setupIframe()
                }
            }
        }
        this.bindCommonEvents();
        if (this.cfg.visible) {
            this.links.eq(0).click()
        }
        this.panel.data("widget", this);
        this.links.data("primefaces-lightbox-trigger", true).find("*").data("primefaces-lightbox-trigger", true)
    },
    refresh: function(b) {
        $(PrimeFaces.escapeClientId(b.id) + "_panel").remove();
        this.init(b)
    },
    destroy: function() {
        this.panel.remove()
    },
    createPanel: function() {
        var b = '<div id="' + this.id + '_panel" class="ui-lightbox ui-widget ui-helper-hidden ui-corner-all ui-shadow">';
        b += '<div class="ui-lightbox-content-wrapper">';
        b += '<a class="ui-state-default ui-lightbox-nav-left ui-corner-right ui-helper-hidden"><span class="ui-icon ui-icon-carat-1-w">go</span></a>';
        b += '<div class="ui-lightbox-content ui-corner-all"></div>';
        b += '<a class="ui-state-default ui-lightbox-nav-right ui-corner-left ui-helper-hidden"><span class="ui-icon ui-icon-carat-1-e">go</span></a>';
        b += "</div>";
        b += '<div class="ui-lightbox-caption ui-widget-header"><span class="ui-lightbox-caption-text"></span>';
        b += '<a class="ui-lightbox-close ui-corner-all" href="#"><span class="ui-icon ui-icon-closethick"></span></a><div style="clear:both" /></div>';
        b += "</div>";
        $(document.body).append(b);
        this.panel = $(this.jqId + "_panel");
        this.contentWrapper = this.panel.children(".ui-lightbox-content-wrapper");
        this.content = this.contentWrapper.children(".ui-lightbox-content");
        this.caption = this.panel.children(".ui-lightbox-caption");
        this.captionText = this.caption.children(".ui-lightbox-caption-text");
        this.closeIcon = this.caption.children(".ui-lightbox-close");
        this.closeIcon.data("primefaces-lightbox-trigger", true).find("*").data("primefaces-lightbox-trigger", true)
    },
    setupImaging: function() {
        var b = this;
        this.content.append('<img class="ui-helper-hidden"></img>');
        this.imageDisplay = this.content.children("img");
        this.navigators = this.contentWrapper.children("a");
        this.imageDisplay.load(function() {
            var e = $(this);
            b.scaleImage(e);
            var f = (b.panel.width() - e.width()) / 2
              , a = (b.panel.height() - e.height()) / 2;
            b.content.removeClass("ui-lightbox-loading").animate({
                width: e.width(),
                height: e.height()
            }, 500, function() {
                e.fadeIn();
                b.showNavigators();
                b.caption.slideDown()
            });
            b.panel.animate({
                left: "+=" + f,
                top: "+=" + a
            }, 500)
        });
        this.navigators.mouseover(function() {
            $(this).addClass("ui-state-hover")
        }).mouseout(function() {
            $(this).removeClass("ui-state-hover")
        }).click(function(f) {
            var e = $(this);
            b.hideNavigators();
            if (e.hasClass("ui-lightbox-nav-left")) {
                var a = b.current == 0 ? b.links.length - 1 : b.current - 1;
                b.links.eq(a).trigger("click")
            } else {
                var a = b.current == b.links.length - 1 ? 0 : b.current + 1;
                b.links.eq(a).trigger("click")
            }
            f.preventDefault()
        });
        this.links.click(function(d) {
            var a = $(this);
            if (b.isHidden()) {
                b.content.addClass("ui-lightbox-loading").width(32).height(32);
                b.show()
            } else {
                b.imageDisplay.fadeOut(function() {
                    $(this).css({
                        width: "auto",
                        height: "auto"
                    });
                    b.content.addClass("ui-lightbox-loading")
                });
                b.caption.slideUp()
            }
            setTimeout(function() {
                b.imageDisplay.attr("src", a.attr("href"));
                b.current = a.index();
                var c = a.attr("title");
                if (c) {
                    b.captionText.html(c)
                }
            }, 1000);
            d.preventDefault()
        })
    },
    scaleImage: function(j) {
        var k = $(window)
          , n = k.width()
          , h = k.height()
          , m = j.width()
          , i = j.height()
          , l = i / m;
        if (m >= n && l <= 1) {
            m = n * 0.75;
            i = m * l
        } else {
            if (i >= h) {
                i = h * 0.75;
                m = i / l
            }
        }
        j.css({
            width: m + "px",
            height: i + "px"
        })
    },
    setupInline: function() {
        this.inline = this.jq.children(".ui-lightbox-inline");
        this.inline.appendTo(this.content).show();
        var b = this;
        this.links.click(function(a) {
            b.show();
            var d = $(this).attr("title");
            if (d) {
                b.captionText.html(d);
                b.caption.slideDown()
            }
            a.preventDefault()
        })
    },
    setupIframe: function() {
        var b = this;
        this.iframeLoaded = false;
        this.cfg.width = this.cfg.width || "640px";
        this.cfg.height = this.cfg.height || "480px";
        this.iframe = $('<iframe frameborder="0" style="width:' + this.cfg.width + ";height:" + this.cfg.height + ';border:0 none; display: block;"></iframe>').appendTo(this.content);
        if (this.cfg.iframeTitle) {
            this.iframe.attr("title", this.cfg.iframeTitle)
        }
        this.links.click(function(a) {
            if (!b.iframeLoaded) {
                b.content.addClass("ui-lightbox-loading").css({
                    width: b.cfg.width,
                    height: b.cfg.height
                });
                b.show();
                b.iframe.on("load", function() {
                    b.iframeLoaded = true;
                    b.content.removeClass("ui-lightbox-loading")
                }).attr("src", b.links.eq(0).attr("href"))
            } else {
                b.show()
            }
            var d = b.links.eq(0).attr("title");
            if (d) {
                b.captionText.text(d);
                b.caption.slideDown()
            }
            a.preventDefault()
        })
    },
    bindCommonEvents: function() {
        var f = this
          , d = PrimeFaces.env.ios ? "touchstart." + this.id : "click." + this.id
          , e = "resize." + this.id;
        this.closeIcon.mouseover(function() {
            $(this).addClass("ui-state-hover")
        }).mouseout(function() {
            $(this).removeClass("ui-state-hover")
        });
        this.closeIcon.click(function(a) {
            f.hide();
            a.preventDefault()
        });
        $(document.body).off(d).on(d, function(b) {
            if (f.isHidden()) {
                return
            }
            var c = $(b.target);
            if (c.data("primefaces-lightbox-trigger")) {
                return
            }
            var a = f.panel.offset(), j, k;
            if (b.originalEvent.touches) {
                j = b.originalEvent.touches[0].pageX;
                k = b.originalEvent.touches[0].pageY
            } else {
                j = b.pageX;
                k = b.pageY
            }
            if (j < a.left || j > a.left + f.panel.width() || k < a.top || k > a.top + f.panel.height()) {
                b.preventDefault();
                f.hide()
            }
        });
        $(window).off(e).on(e, function() {
            if (!f.isHidden()) {
                $(document.body).children(".ui-widget-overlay").css({
                    width: $(document).width(),
                    height: $(document).height()
                })
            }
        })
    },
    show: function() {
        this.center();
        this.panel.css("z-index", ++PrimeFaces.zindex).show();
        if (!this.isModalActive()) {
            this.enableModality()
        }
        if (this.cfg.onShow) {
            this.cfg.onShow.call(this)
        }
    },
    hide: function() {
        this.panel.fadeOut();
        this.disableModality();
        this.caption.hide();
        if (this.cfg.mode == "image") {
            this.imageDisplay.hide().attr("src", "").removeAttr("style");
            this.hideNavigators()
        }
        if (this.cfg.onHide) {
            this.cfg.onHide.call(this)
        }
    },
    center: function() {
        var f = $(window)
          , d = (f.width() / 2) - (this.panel.width() / 2)
          , e = (f.height() / 2) - (this.panel.height() / 2);
        this.panel.css({
            left: d,
            top: e
        })
    },
    enableModality: function() {
        $(document.body).append('<div id="' + this.id + '_modal" class="ui-widget-overlay"></div>').children(this.jqId + "_modal").css({
            width: $(document).width(),
            height: $(document).height(),
            "z-index": this.panel.css("z-index") - 1
        })
    },
    disableModality: function() {
        $(document.body).children(this.jqId + "_modal").remove()
    },
    isModalActive: function() {
        return $(document.body).children(this.jqId + "_modal").length === 1
    },
    showNavigators: function() {
        this.navigators.zIndex(this.imageDisplay.zIndex() + 1).show()
    },
    hideNavigators: function() {
        this.navigators.hide()
    },
    addOnshowHandler: function(b) {
        this.onshowHandlers.push(b)
    },
    isHidden: function() {
        return this.panel.is(":hidden")
    },
    showURL: function(b) {
        if (b.width) {
            this.iframe.attr("width", b.width)
        }
        if (b.height) {
            this.iframe.attr("height", b.height)
        }
        this.iframe.attr("src", b.src);
        this.captionText.text(b.title || "");
        this.caption.slideDown();
        this.show()
    }
});
PrimeFaces.widget.Menu = PrimeFaces.widget.BaseWidget.extend({
    init: function(b) {
        this._super(b);
        if (this.cfg.overlay) {
            this.initOverlay()
        }
        this.keyboardTarget = this.jq.children(".ui-helper-hidden-accessible")
    },
    initOverlay: function() {
        var g = this;
        this.trigger = PrimeFaces.expressions.SearchExpressionFacade.resolveComponentsAsSelector(this.cfg.trigger);
        this.trigger.data("primefaces-overlay-target", true).find("*").data("primefaces-overlay-target", true);
        if (this.jq.length > 1) {
            $(document.body).children(this.jqId).remove();
            this.jq = $(this.jqId);
            this.jq.appendTo(document.body)
        } else {
            if (this.jq.parent().is(":not(body)")) {
                this.jq.appendTo(document.body)
            }
        }
        this.cfg.pos = {
            my: this.cfg.my,
            at: this.cfg.at,
            of: this.trigger
        };
        this.trigger.bind(this.cfg.triggerEvent + ".ui-menu", function(a) {
            var b = $(this);
            if (g.jq.is(":visible")) {
                g.hide()
            } else {
                g.show();
                if (b.is(":button")) {
                    b.addClass("ui-state-focus")
                }
                a.preventDefault()
            }
        });
        this.itemMouseDown = false;
        var h = "mousedown." + this.id;
        $(document.body).off(h).on(h, function(b) {
            if (g.jq.is(":hidden")) {
                return
            }
            var c = $(b.target);
            if (c.is(g.trigger.get(0)) || g.trigger.has(c).length > 0) {
                return
            }
            var a = g.jq.offset();
            if (b.pageX < a.left || b.pageX > a.left + g.jq.width() || b.pageY < a.top || b.pageY > a.top + g.jq.height()) {
                if (c.is(".ui-menuitem-link") || c.closest(".ui-menuitem-link").length) {
                    g.itemMouseDown = true
                } else {
                    g.hide(b)
                }
            }
        });
        var f = "mouseup." + this.id;
        $(document.body).off(f).on(f, function(a) {
            if (g.itemMouseDown) {
                g.hide(a);
                g.itemMouseDown = false
            }
        });
        var e = "resize." + this.id;
        $(window).off(e).on(e, function() {
            if (g.jq.is(":visible")) {
                g.align()
            }
        });
        this.setupDialogSupport()
    },
    setupDialogSupport: function() {
        var b = this.trigger.parents(".ui-dialog:first");
        if (b.length == 1) {
            this.jq.css("position", "fixed")
        }
    },
    show: function() {
        this.align();
        this.jq.css("z-index", ++PrimeFaces.zindex).show()
    },
    hide: function() {
        this.jq.fadeOut("fast");
        if (this.trigger && this.trigger.is(":button")) {
            this.trigger.removeClass("ui-state-focus")
        }
    },
    align: function() {
        var d = this.jq.css("position") == "fixed"
          , f = $(window)
          , e = d ? "-" + f.scrollLeft() + " -" + f.scrollTop() : null;
        this.cfg.pos.offset = e;
        this.jq.css({
            left: "",
            top: ""
        }).position(this.cfg.pos)
    }
});
PrimeFaces.widget.TieredMenu = PrimeFaces.widget.Menu.extend({
    init: function(b) {
        this._super(b);
        this.cfg.toggleEvent = this.cfg.toggleEvent || "hover";
        this.links = this.jq.find("a.ui-menuitem-link:not(.ui-state-disabled)");
        this.rootLinks = this.jq.find("> ul.ui-menu-list > .ui-menuitem > .ui-menuitem-link");
        this.bindEvents()
    },
    bindEvents: function() {
        this.bindItemEvents();
        this.bindKeyEvents();
        this.bindDocumentHandler()
    },
    bindItemEvents: function() {
        if (this.cfg.toggleEvent === "hover") {
            this.bindHoverModeEvents()
        } else {
            if (this.cfg.toggleEvent === "click") {
                this.bindClickModeEvents()
            }
        }
    },
    bindHoverModeEvents: function() {
        var b = this;
        this.links.mouseenter(function() {
            var a = $(this)
              , f = a.parent();
            var e = f.siblings(".ui-menuitem-active");
            if (e.length === 1) {
                e.find("li.ui-menuitem-active").each(function() {
                    b.deactivate($(this))
                });
                b.deactivate(e)
            }
            if (b.cfg.autoDisplay || b.active) {
                if (f.hasClass("ui-menuitem-active")) {
                    b.reactivate(f)
                } else {
                    b.activate(f)
                }
            } else {
                b.highlight(f)
            }
        });
        this.rootLinks.click(function(e) {
            var h = $(this)
              , g = h.parent()
              , a = g.children("ul.ui-menu-child");
            b.itemClick = true;
            if (a.length === 1) {
                if (a.is(":visible")) {
                    b.active = false;
                    b.deactivate(g)
                } else {
                    b.active = true;
                    b.highlight(g);
                    b.showSubmenu(g, a)
                }
            }
        });
        this.links.filter(".ui-submenu-link").click(function(a) {
            b.itemClick = true;
            a.preventDefault()
        });
        this.jq.find("ul.ui-menu-list").mouseleave(function(a) {
            if (b.activeitem) {
                b.deactivate(b.activeitem)
            }
            a.stopPropagation()
        })
    },
    bindClickModeEvents: function() {
        var b = this;
        this.links.mouseenter(function() {
            var a = $(this).parent();
            if (!a.hasClass("ui-menuitem-active")) {
                a.addClass("ui-menuitem-highlight").children("a.ui-menuitem-link").addClass("ui-state-hover")
            }
        }).mouseleave(function() {
            var a = $(this).parent();
            if (!a.hasClass("ui-menuitem-active")) {
                a.removeClass("ui-menuitem-highlight").children("a.ui-menuitem-link").removeClass("ui-state-hover")
            }
        });
        this.links.filter(".ui-submenu-link").on("click.tieredMenu", function(h) {
            var j = $(this)
              , i = j.parent()
              , a = i.children("ul.ui-menu-child");
            b.itemClick = true;
            var e = i.siblings(".ui-menuitem-active");
            if (e.length) {
                e.find("li.ui-menuitem-active").each(function() {
                    b.deactivate($(this))
                });
                b.deactivate(e)
            }
            if (a.length) {
                if (a.is(":visible")) {
                    b.deactivate(i);
                    i.addClass("ui-menuitem-highlight").children("a.ui-menuitem-link").addClass("ui-state-hover")
                } else {
                    i.addClass("ui-menuitem-active").children("a.ui-menuitem-link").removeClass("ui-state-hover").addClass("ui-state-active");
                    b.showSubmenu(i, a)
                }
            }
            h.preventDefault()
        })
    },
    bindKeyEvents: function() {},
    bindDocumentHandler: function() {
        var c = this
          , d = "click." + this.id;
        $(document.body).off(d).on(d, function(a) {
            if (c.itemClick) {
                c.itemClick = false;
                return
            }
            c.reset()
        })
    },
    deactivate: function(c, d) {
        this.activeitem = null;
        c.children("a.ui-menuitem-link").removeClass("ui-state-hover ui-state-active");
        c.removeClass("ui-menuitem-active ui-menuitem-highlight");
        if (d) {
            c.children("ul.ui-menu-child").fadeOut("fast")
        } else {
            c.children("ul.ui-menu-child").hide()
        }
    },
    activate: function(c) {
        this.highlight(c);
        var d = c.children("ul.ui-menu-child");
        if (d.length == 1) {
            this.showSubmenu(c, d)
        }
    },
    reactivate: function(g) {
        this.activeitem = g;
        var h = g.children("ul.ui-menu-child")
          , e = h.children("li.ui-menuitem-active:first")
          , f = this;
        if (e.length == 1) {
            f.deactivate(e)
        }
    },
    highlight: function(b) {
        this.activeitem = b;
        b.children("a.ui-menuitem-link").addClass("ui-state-hover");
        b.addClass("ui-menuitem-active")
    },
    showSubmenu: function(d, e) {
        var f = {
            my: "left top",
            at: "right top",
            of: d,
            collision: "flipfit"
        };
        e.css("z-index", ++PrimeFaces.zindex).show().position(f)
    },
    reset: function() {
        var b = this;
        this.active = false;
        this.jq.find("li.ui-menuitem-active").each(function() {
            b.deactivate($(this), true)
        })
    }
});
PrimeFaces.widget.Menubar = PrimeFaces.widget.TieredMenu.extend({
    showSubmenu: function(d, e) {
        var f = null;
        if (d.parent().hasClass("ui-menu-child")) {
            f = {
                my: "left top",
                at: "right top",
                of: d,
                collision: "flipfit"
            }
        } else {
            f = {
                my: "left top",
                at: "left bottom",
                of: d,
                collision: "flipfit"
            }
        }
        e.css("z-index", ++PrimeFaces.zindex).show().position(f)
    },
    bindKeyEvents: function() {
        var b = this;
        this.keyboardTarget.on("focus.menubar", function(a) {
            b.highlight(b.links.eq(0).parent())
        }).on("blur.menubar", function() {
            b.reset()
        }).on("keydown.menu", function(m) {
            var o = b.activeitem;
            if (!o) {
                return
            }
            var p = !o.closest("ul").hasClass("ui-menu-child")
              , a = $.ui.keyCode;
            switch (m.which) {
            case a.LEFT:
                if (p) {
                    var e = o.prevAll(".ui-menuitem:not(.ui-menubar-options):first");
                    if (e.length) {
                        b.deactivate(o);
                        b.highlight(e)
                    }
                    m.preventDefault()
                } else {
                    if (o.hasClass("ui-menu-parent") && o.children(".ui-menu-child").is(":visible")) {
                        b.deactivate(o);
                        b.highlight(o)
                    } else {
                        var q = o.parent().parent();
                        b.deactivate(o);
                        b.deactivate(q);
                        b.highlight(q)
                    }
                }
                break;
            case a.RIGHT:
                if (p) {
                    var s = o.nextAll(".ui-menuitem:not(.ui-menubar-options):first");
                    if (s.length) {
                        b.deactivate(o);
                        b.highlight(s)
                    }
                    m.preventDefault()
                } else {
                    if (o.hasClass("ui-menu-parent")) {
                        var t = o.children(".ui-menu-child");
                        if (t.is(":visible")) {
                            b.highlight(t.children(".ui-menuitem:first"))
                        } else {
                            b.activate(o)
                        }
                    }
                }
                break;
            case a.UP:
                if (!p) {
                    var e = o.prev(".ui-menuitem");
                    if (e.length) {
                        b.deactivate(o);
                        b.highlight(e)
                    }
                }
                m.preventDefault();
                break;
            case a.DOWN:
                if (p) {
                    var t = o.children("ul.ui-menu-child");
                    if (t.is(":visible")) {
                        b.highlight(t.children(".ui-menuitem:first"))
                    } else {
                        b.activate(o)
                    }
                } else {
                    var s = o.next(".ui-menuitem");
                    if (s.length) {
                        b.deactivate(o);
                        b.highlight(s)
                    }
                }
                m.preventDefault();
                break;
            case a.ENTER:
            case a.NUMPAD_ENTER:
                var n = o.children(".ui-menuitem-link");
                n.trigger("click");
                b.jq.blur();
                var r = n.attr("href");
                if (r && r !== "#") {
                    window.location.href = r
                }
                m.preventDefault();
                break
            }
        })
    }
});
PrimeFaces.widget.SlideMenu = PrimeFaces.widget.Menu.extend({
    init: function(j) {
        this._super(j);
        this.submenus = this.jq.find("ul.ui-menu-list");
        this.wrapper = this.jq.children("div.ui-slidemenu-wrapper");
        this.content = this.wrapper.children("div.ui-slidemenu-content");
        this.rootList = this.content.children("ul.ui-menu-list");
        this.links = this.jq.find("a.ui-menuitem-link:not(.ui-state-disabled)");
        this.backward = this.wrapper.children("div.ui-slidemenu-backward");
        this.rendered = false;
        this.stack = [];
        this.jqWidth = this.jq.width();
        if (!this.jq.hasClass("ui-menu-dynamic")) {
            if (this.jq.is(":not(:visible)")) {
                var g = this.jq.closest(".ui-hidden-container")
                  , f = g.data("widget")
                  , h = this;
                if (f) {
                    var i = PF(f);
                    if (i) {
                        i.addOnshowHandler(function() {
                            return h.render()
                        })
                    }
                }
            } else {
                this.render()
            }
        }
        this.bindEvents()
    },
    bindEvents: function() {
        var b = this;
        this.links.mouseenter(function() {
            $(this).addClass("ui-state-hover")
        }).mouseleave(function() {
            $(this).removeClass("ui-state-hover")
        }).click(function(e) {
            var f = $(this)
              , a = f.next();
            if (a.length) {
                b.forward(a);
                e.preventDefault()
            }
        });
        this.backward.click(function() {
            b.back()
        })
    },
    forward: function(f) {
        var e = this;
        this.push(f);
        var d = -1 * (this.depth() * this.jqWidth);
        f.show().css({
            left: this.jqWidth
        });
        this.rootList.animate({
            left: d
        }, 500, "easeInOutCirc", function() {
            if (e.backward.is(":hidden")) {
                e.backward.fadeIn("fast")
            }
        })
    },
    back: function() {
        var f = this
          , h = this.pop()
          , g = this.depth();
        var e = -1 * (g * this.jqWidth);
        this.rootList.animate({
            left: e
        }, 500, "easeInOutCirc", function() {
            if (h) {
                h.hide()
            }
            if (g == 0) {
                f.backward.fadeOut("fast")
            }
        })
    },
    push: function(b) {
        this.stack.push(b)
    },
    pop: function() {
        return this.stack.length !== 0 ? this.stack.pop() : null
    },
    last: function() {
        return this.stack[this.stack.length - 1]
    },
    depth: function() {
        return this.stack.length
    },
    render: function() {
        this.submenus.width(this.jq.width());
        this.wrapper.height(this.rootList.outerHeight(true) + this.backward.outerHeight(true));
        this.content.height(this.rootList.outerHeight(true));
        this.rendered = true
    },
    show: function() {
        this.align();
        this.jq.css("z-index", ++PrimeFaces.zindex).show();
        if (!this.rendered) {
            this.render()
        }
    }
});
PrimeFaces.widget.PlainMenu = PrimeFaces.widget.Menu.extend({
    init: function(b) {
        this._super(b);
        this.menuitemLinks = this.jq.find(".ui-menuitem-link:not(.ui-state-disabled)");
        this.bindEvents();
        if (this.cfg.toggleable) {
            this.collapsedIds = [];
            this.stateKey = "menu-" + this.id;
            this.restoreState()
        }
    },
    bindEvents: function() {
        var b = this;
        this.menuitemLinks.mouseenter(function(a) {
            if (b.jq.is(":focus")) {
                b.jq.blur()
            }
            $(this).addClass("ui-state-hover")
        }).mouseleave(function(a) {
            $(this).removeClass("ui-state-hover")
        });
        if (this.cfg.overlay) {
            this.menuitemLinks.click(function() {
                b.hide()
            })
        }
        if (this.cfg.toggleable) {
            this.jq.find("> .ui-menu-list > .ui-widget-header").on("mouseover.menu", function() {
                $(this).addClass("ui-state-hover")
            }).on("mouseout.menu", function() {
                $(this).removeClass("ui-state-hover")
            }).on("click.menu", function(a) {
                var d = $(this);
                if (d.find("> h3 > .ui-icon").hasClass("ui-icon-triangle-1-s")) {
                    b.collapseSubmenu(d, true)
                } else {
                    b.expandSubmenu(d, true)
                }
                PrimeFaces.clearSelection();
                a.preventDefault()
            })
        }
        this.keyboardTarget.on("focus.menu", function() {
            b.menuitemLinks.eq(0).addClass("ui-state-hover")
        }).on("blur.menu", function() {
            b.menuitemLinks.filter(".ui-state-hover").removeClass("ui-state-hover")
        }).on("keydown.menu", function(e) {
            var j = b.menuitemLinks.filter(".ui-state-hover")
              , i = $.ui.keyCode;
            switch (e.which) {
            case i.UP:
                var l = j.parent().prevAll(".ui-menuitem:first");
                if (l.length) {
                    j.removeClass("ui-state-hover");
                    l.children(".ui-menuitem-link").addClass("ui-state-hover")
                }
                e.preventDefault();
                break;
            case i.DOWN:
                var a = j.parent().nextAll(".ui-menuitem:first");
                if (a.length) {
                    j.removeClass("ui-state-hover");
                    a.children(".ui-menuitem-link").addClass("ui-state-hover")
                }
                e.preventDefault();
                break;
            case i.ENTER:
            case i.NUMPAD_ENTER:
                j.trigger("click");
                b.jq.blur();
                var k = j.attr("href");
                if (k && k !== "#") {
                    window.location.href = k
                }
                e.preventDefault();
                break
            }
        })
    },
    collapseSubmenu: function(f, d) {
        var e = f.nextUntil("li.ui-widget-header");
        f.attr("aria-expanded", false).find("> h3 > .ui-icon").removeClass("ui-icon-triangle-1-s").addClass("ui-icon-triangle-1-e");
        e.filter(".ui-submenu-child").hide();
        if (d) {
            this.collapsedIds.push(f.attr("id"));
            this.saveState()
        }
    },
    expandSubmenu: function(g, e) {
        var f = g.nextUntil("li.ui-widget-header");
        g.attr("aria-expanded", false).find("> h3 > .ui-icon").removeClass("ui-icon-triangle-1-e").addClass("ui-icon-triangle-1-s");
        f.filter(".ui-submenu-child").show();
        if (e) {
            var h = g.attr("id");
            this.collapsedIds = $.grep(this.collapsedIds, function(a) {
                return (a !== h)
            });
            this.saveState()
        }
    },
    saveState: function() {
        PrimeFaces.setCookie(this.stateKey, this.collapsedIds.join(","))
    },
    restoreState: function() {
        var c = PrimeFaces.getCookie(this.stateKey);
        if (c) {
            this.collapsedIds = c.split(",");
            for (var d = 0; d < this.collapsedIds.length; d++) {
                this.collapseSubmenu($(PrimeFaces.escapeClientId(this.collapsedIds[d])), false)
            }
        }
    },
    clearState: function() {
        PrimeFaces.setCookie(this.stateKey, null)
    }
});
PrimeFaces.widget.MenuButton = PrimeFaces.widget.BaseWidget.extend({
    init: function(b) {
        this._super(b);
        this.menuId = this.jqId + "_menu";
        this.button = this.jq.children("button");
        this.menu = this.jq.children(".ui-menu");
        this.menuitems = this.jq.find(".ui-menuitem");
        this.cfg.disabled = this.button.is(":disabled");
        if (!this.cfg.disabled) {
            this.bindEvents();
            this.appendPanel()
        }
    },
    bindEvents: function() {
        var f = this;
        this.button.mouseover(function() {
            if (!f.button.hasClass("ui-state-focus")) {
                f.button.addClass("ui-state-hover")
            }
        }).mouseout(function() {
            if (!f.button.hasClass("ui-state-focus")) {
                f.button.removeClass("ui-state-hover ui-state-active")
            }
        }).mousedown(function() {
            $(this).removeClass("ui-state-focus ui-state-hover").addClass("ui-state-active")
        }).mouseup(function() {
            var a = $(this);
            a.removeClass("ui-state-active");
            if (f.menu.is(":visible")) {
                a.addClass("ui-state-hover");
                f.hide()
            } else {
                a.addClass("ui-state-focus");
                f.show()
            }
        }).focus(function() {
            $(this).addClass("ui-state-focus")
        }).blur(function() {
            $(this).removeClass("ui-state-focus")
        });
        this.button.data("primefaces-overlay-target", true).find("*").data("primefaces-overlay-target", true);
        this.menuitems.mouseover(function(a) {
            var b = $(this);
            if (!b.hasClass("ui-state-disabled")) {
                b.addClass("ui-state-hover")
            }
        }).mouseout(function(a) {
            $(this).removeClass("ui-state-hover")
        }).click(function() {
            f.button.removeClass("ui-state-focus");
            f.hide()
        });
        var d = "mousedown." + this.id;
        $(document.body).off(d).on(d, function(b) {
            if (f.menu.is(":hidden") || f.cfg.disabled) {
                return
            }
            var c = $(b.target);
            if (c.is(f.button) || f.button.has(c).length > 0) {
                return
            }
            var a = f.menu.offset();
            if (b.pageX < a.left || b.pageX > a.left + f.menu.width() || b.pageY < a.top || b.pageY > a.top + f.menu.height()) {
                f.button.removeClass("ui-state-focus ui-state-hover");
                f.hide()
            }
        });
        var e = "resize." + this.id;
        $(window).unbind(e).bind(e, function() {
            if (f.menu.is(":visible")) {
                f.alignPanel()
            }
        });
        this.button.attr("role", "button").attr("aria-disabled", this.button.is(":disabled"))
    },
    appendPanel: function() {
        var b = this.cfg.appendTo ? PrimeFaces.expressions.SearchExpressionFacade.resolveComponentsAsSelector(this.cfg.appendTo) : $(document.body);
        if (!b.is(this.jq)) {
            b.children(this.menuId).remove();
            this.menu.appendTo(b)
        }
    },
    show: function() {
        this.alignPanel();
        this.menu.show()
    },
    hide: function() {
        this.menu.fadeOut("fast")
    },
    alignPanel: function() {
        this.menu.css({
            left: "",
            top: "",
            "z-index": ++PrimeFaces.zindex
        });
        if (this.menu.parent().is(this.jq)) {
            this.menu.css({
                left: 0,
                top: this.jq.innerHeight()
            })
        } else {
            this.menu.position({
                my: "left top",
                at: "left bottom",
                of: this.button
            })
        }
    }
});
PrimeFaces.widget.ContextMenu = PrimeFaces.widget.TieredMenu.extend({
    init: function(e) {
        e.autoDisplay = true;
        this._super(e);
        this.cfg.selectionMode = this.cfg.selectionMode || "multiple";
        var f = this
          , h = (this.cfg.target === undefined);
        this.cfg.event = this.cfg.event || "contextmenu";
        this.jqTargetId = h ? document : PrimeFaces.escapeClientId(this.cfg.target);
        this.jqTarget = $(this.jqTargetId);
        if (!this.jq.parent().is(document.body)) {
            this.jq.appendTo("body")
        }
        if (h) {
            $(document).off("contextmenu.ui-contextmenu").on("contextmenu.ui-contextmenu", function(a) {
                f.show(a)
            })
        } else {
            if (this.cfg.type === "DataTable") {
                this.bindDataTable()
            } else {
                if (this.cfg.type === "TreeTable") {
                    this.bindTreeTable()
                } else {
                    if (this.cfg.type === "Tree") {
                        this.bindTree()
                    } else {
                        var g = this.cfg.event + ".ui-contextmenu";
                        $(document).off(g, this.jqTargetId).on(g, this.jqTargetId, null, function(a) {
                            f.show(a)
                        })
                    }
                }
            }
        }
    },
    bindDataTable: function() {
        var e = this.jqTargetId + " tbody.ui-datatable-data > tr.ui-widget-content"
          , d = this.cfg.event + ".datatable"
          , f = this;
        $(document).off(d, e).on(d, e, null, function(b) {
            var j = PrimeFaces.widgets[f.cfg.targetWidgetVar]
              , a = $(this);
            if (j.cfg.selectionMode && a.hasClass("ui-datatable-selectable")) {
                j.onRowRightClick(b, this, f.cfg.selectionMode);
                f.show(b)
            } else {
                if (j.cfg.editMode === "cell") {
                    var c = $(b.target)
                      , k = c.is("td.ui-editable-column") ? c : c.parents("td.ui-editable-column:first");
                    if (j.contextMenuCell) {
                        j.contextMenuCell.removeClass("ui-state-highlight")
                    }
                    j.contextMenuClick = true;
                    j.contextMenuCell = k;
                    j.contextMenuCell.addClass("ui-state-highlight");
                    f.show(b)
                } else {
                    if (a.hasClass("ui-datatable-empty-message")) {
                        f.show(b)
                    }
                }
            }
        })
    },
    bindTreeTable: function() {
        var d = this.jqTargetId + " .ui-treetable-data > " + (this.cfg.nodeType ? "tr.ui-treetable-selectable-node." + this.cfg.nodeType : "tr.ui-treetable-selectable-node")
          , f = this.cfg.event + ".treetable"
          , e = this;
        $(document).off(f, d).on(f, d, null, function(a) {
            PrimeFaces.widgets[e.cfg.targetWidgetVar].onRowRightClick(a, $(this));
            e.show(a)
        })
    },
    bindTree: function() {
        var e = this.jqTargetId + " .ui-tree-selectable"
          , f = this.cfg.nodeType ? this.cfg.event + ".treenode." + this.cfg.nodeType : this.cfg.event + ".treenode"
          , g = this.cfg.event + ".tree"
          , h = this;
        $(document).off(f, e).on(f, e, null, function(a) {
            var b = $(this);
            if (h.cfg.nodeType === undefined || b.parent().data("nodetype") === h.cfg.nodeType) {
                PrimeFaces.widgets[h.cfg.targetWidgetVar].nodeRightClick(a, b);
                h.show(a)
            }
        });
        $(document).off(g, this.jqTargetId).on(g, this.jqTargetId, null, function(a) {
            if (PrimeFaces.widgets[h.cfg.targetWidgetVar].isEmpty()) {
                h.show(a)
            }
        })
    },
    refresh: function(d) {
        var e = PrimeFaces.escapeClientId(d.id)
          , f = $(e);
        if (f.length > 1) {
            $(document.body).children(e).remove()
        }
        this.init(d)
    },
    bindItemEvents: function() {
        this._super();
        var b = this;
        this.links.bind("click", function(f) {
            var a = $(f.target)
              , e = a.hasClass("ui-submenu-link") ? a : a.closest(".ui-submenu-link");
            if (e.length) {
                return
            }
            b.hide()
        })
    },
    bindDocumentHandler: function() {
        var c = this
          , d = "click." + this.id;
        $(document.body).off(d).on(d, function(a) {
            var b = $(a.target)
              , e = b.hasClass("ui-menuitem-link") ? b : b.closest(".ui-menuitem-link");
            if (c.jq.is(":hidden") || e.is(".ui-menuitem-link,.ui-state-disabled")) {
                return
            }
            c.hide()
        })
    },
    show: function(j) {
        if (this.cfg.targetFilter && $(j.target).is(":not(" + this.cfg.targetFilter + ")")) {
            return
        }
        $(document.body).children(".ui-contextmenu:visible").hide();
        var k = $(window)
          , l = j.pageX
          , m = j.pageY
          , e = this.jq.outerWidth()
          , i = this.jq.outerHeight();
        if ((l + e) > (k.width()) + k.scrollLeft()) {
            l = l - e
        }
        if ((m + i) > (k.height() + k.scrollTop())) {
            m = m - i
        }
        if (this.cfg.beforeShow) {
            var n = this.cfg.beforeShow.call(this, j);
            if (n === false) {
                return
            }
        }
        this.jq.css({
            left: l,
            top: m,
            "z-index": ++PrimeFaces.zindex
        }).show();
        j.preventDefault();
        j.stopPropagation()
    },
    hide: function() {
        var b = this;
        this.jq.find("li.ui-menuitem-active").each(function() {
            b.deactivate($(this), true)
        });
        this.jq.fadeOut("fast")
    },
    isVisible: function() {
        return this.jq.is(":visible") || (this.jq.is(":visible") && this.jq.hasClass("ui-overlay-visible"))
    },
    getTarget: function() {
        return this.jqTarget
    }
});
PrimeFaces.widget.MegaMenu = PrimeFaces.widget.BaseWidget.extend({
    init: function(b) {
        this._super(b);
        this.cfg.vertical = this.jq.hasClass("ui-megamenu-vertical");
        this.rootList = this.jq.children("ul.ui-menu-list");
        this.rootLinks = this.rootList.find("> li.ui-menuitem > a.ui-menuitem-link:not(.ui-state-disabled)");
        this.subLinks = this.jq.find(".ui-menu-child a.ui-menuitem-link:not(.ui-state-disabled)");
        this.keyboardTarget = this.jq.children(".ui-helper-hidden-accessible");
        if (this.cfg.activeIndex !== undefined) {
            this.rootLinks.eq(this.cfg.activeIndex).addClass("ui-state-hover").closest("li.ui-menuitem").addClass("ui-menuitem-active")
        }
        this.bindEvents();
        this.bindKeyEvents()
    },
    bindEvents: function() {
        var b = this;
        this.rootLinks.mouseenter(function(e) {
            var a = $(this)
              , g = a.parent();
            var h = g.siblings(".ui-menuitem-active");
            if (h.length > 0) {
                h.find("li.ui-menuitem-active").each(function() {
                    b.deactivate($(this))
                });
                b.deactivate(h, false)
            }
            if (b.cfg.autoDisplay || b.active) {
                b.activate(g)
            } else {
                b.highlight(g)
            }
        });
        if (this.cfg.autoDisplay === false) {
            this.rootLinks.data("primefaces-megamenu", this.id).find("*").data("primefaces-megamenu", this.id);
            this.rootLinks.click(function(e) {
                var h = $(this)
                  , g = h.parent()
                  , a = h.next();
                if (a.length === 1) {
                    if (a.is(":visible")) {
                        b.active = false;
                        b.deactivate(g, true)
                    } else {
                        b.active = true;
                        b.activate(g)
                    }
                }
                e.preventDefault()
            })
        } else {
            this.rootLinks.filter(".ui-submenu-link").click(function(a) {
                a.preventDefault()
            })
        }
        this.subLinks.mouseenter(function() {
            if (b.activeitem && !b.isRootLink(b.activeitem)) {
                b.deactivate(b.activeitem)
            }
            b.highlight($(this).parent())
        }).mouseleave(function() {
            if (b.activeitem && !b.isRootLink(b.activeitem)) {
                b.deactivate(b.activeitem)
            }
            $(this).removeClass("ui-state-hover")
        });
        this.rootList.mouseleave(function(d) {
            var a = b.rootList.children(".ui-menuitem-active");
            if (a.length === 1) {
                b.deactivate(a, false)
            }
        });
        this.rootList.find("> li.ui-menuitem > ul.ui-menu-child").mouseleave(function(a) {
            a.stopPropagation()
        });
        $(document.body).click(function(d) {
            var a = $(d.target);
            if (a.data("primefaces-megamenu") === b.id) {
                return
            }
            b.active = false;
            b.deactivate(b.rootList.children("li.ui-menuitem-active"), true)
        })
    },
    bindKeyEvents: function() {
        var b = this;
        this.keyboardTarget.on("focus.megamenu", function(a) {
            b.highlight(b.rootLinks.eq(0).parent())
        }).on("blur.megamenu", function() {
            b.reset()
        }).on("keydown.megamenu", function(o) {
            var q = b.activeitem;
            if (!q) {
                return
            }
            var r = b.isRootLink(q)
              , a = $.ui.keyCode;
            switch (o.which) {
            case a.LEFT:
                if (r && !b.cfg.vertical) {
                    var n = q.prevAll(".ui-menuitem:first");
                    if (n.length) {
                        b.deactivate(q);
                        b.highlight(n)
                    }
                    o.preventDefault()
                } else {
                    if (q.hasClass("ui-menu-parent") && q.children(".ui-menu-child").is(":visible")) {
                        b.deactivate(q);
                        b.highlight(q)
                    } else {
                        var s = q.closest("ul.ui-menu-child").parent();
                        if (s.length) {
                            b.deactivate(q);
                            b.deactivate(s);
                            b.highlight(s)
                        }
                    }
                }
                break;
            case a.RIGHT:
                if (r && !b.cfg.vertical) {
                    var u = q.nextAll(".ui-menuitem:visible:first");
                    if (u.length) {
                        b.deactivate(q);
                        b.highlight(u)
                    }
                    o.preventDefault()
                } else {
                    if (q.hasClass("ui-menu-parent")) {
                        var v = q.children(".ui-menu-child");
                        if (v.is(":visible")) {
                            b.highlight(v.find("ul.ui-menu-list:visible > .ui-menuitem:visible:first"))
                        } else {
                            b.activate(q)
                        }
                    }
                }
                break;
            case a.UP:
                if (!r || b.cfg.vertical) {
                    var n = b.findPrevItem(q);
                    if (n.length) {
                        b.deactivate(q);
                        b.highlight(n)
                    }
                }
                o.preventDefault();
                break;
            case a.DOWN:
                if (r && !b.cfg.vertical) {
                    var v = q.children("ul.ui-menu-child");
                    if (v.is(":visible")) {
                        var e = b.getFirstMenuList(v);
                        b.highlight(e.children(".ui-menuitem:visible:first"))
                    } else {
                        b.activate(q)
                    }
                } else {
                    var u = b.findNextItem(q);
                    if (u.length) {
                        b.deactivate(q);
                        b.highlight(u)
                    }
                }
                o.preventDefault();
                break;
            case a.ENTER:
            case a.NUMPAD_ENTER:
                var p = q.children(".ui-menuitem-link");
                p.trigger("click");
                b.jq.blur();
                var t = p.attr("href");
                if (t && t !== "#") {
                    window.location.href = t
                }
                b.deactivate(q);
                o.preventDefault();
                break;
            case a.ESCAPE:
                if (q.hasClass("ui-menu-parent")) {
                    var v = q.children("ul.ui-menu-list:visible");
                    if (v.length > 0) {
                        v.hide()
                    }
                } else {
                    var s = q.closest("ul.ui-menu-child").parent();
                    if (s.length) {
                        b.deactivate(q);
                        b.deactivate(s);
                        b.highlight(s)
                    }
                }
                o.preventDefault();
                break
            }
        })
    },
    findPrevItem: function(f) {
        var d = f.prev(".ui-menuitem");
        if (!d.length) {
            var e = f.closest("ul.ui-menu-list").prev(".ui-menu-list");
            if (!e.length) {
                e = f.closest("td").prev("td").children(".ui-menu-list:visible:last")
            }
            if (e.length) {
                d = e.find("li.ui-menuitem:visible:last")
            }
        }
        return d
    },
    findNextItem: function(f) {
        var e = f.next(".ui-menuitem");
        if (!e.length) {
            var d = f.closest("ul.ui-menu-list").next(".ui-menu-list");
            if (!d.length) {
                d = f.closest("td").next("td").children(".ui-menu-list:visible:first")
            }
            if (d.length) {
                e = d.find("li.ui-menuitem:visible:first")
            }
        }
        return e
    },
    getFirstMenuList: function(b) {
        return b.find(".ui-menu-list:not(.ui-state-disabled):first")
    },
    isRootLink: function(c) {
        var d = c.closest("ul");
        return d.parent().hasClass("ui-menu")
    },
    reset: function() {
        var b = this;
        this.active = false;
        this.jq.find("li.ui-menuitem-active").each(function() {
            b.deactivate($(this), true)
        })
    },
    deactivate: function(g, f) {
        var h = g.children("a.ui-menuitem-link")
          , e = h.next();
        g.removeClass("ui-menuitem-active");
        h.removeClass("ui-state-hover");
        this.activeitem = null;
        if (e.length > 0) {
            if (f) {
                e.fadeOut("fast")
            } else {
                e.hide()
            }
        }
    },
    highlight: function(c) {
        var d = c.children("a.ui-menuitem-link");
        c.addClass("ui-menuitem-active");
        d.addClass("ui-state-hover");
        this.activeitem = c
    },
    activate: function(f) {
        var e = f.children(".ui-menu-child")
          , d = this;
        d.highlight(f);
        if (e.length > 0) {
            d.showSubmenu(f, e)
        }
    },
    showSubmenu: function(d, e) {
        var f = null;
        if (this.cfg.vertical) {
            f = {
                my: "left top",
                at: "right top",
                of: d,
                collision: "flipfit"
            }
        } else {
            f = {
                my: "left top",
                at: "left bottom",
                of: d,
                collision: "flipfit"
            }
        }
        e.css("z-index", ++PrimeFaces.zindex).show().position(f)
    }
});
PrimeFaces.widget.PanelMenu = PrimeFaces.widget.BaseWidget.extend({
    init: function(b) {
        this._super(b);
        this.headers = this.jq.find("> .ui-panelmenu-panel > h3.ui-panelmenu-header:not(.ui-state-disabled)");
        this.menuContent = this.jq.find("> .ui-panelmenu-panel > .ui-panelmenu-content");
        this.menuitemLinks = this.menuContent.find(".ui-menuitem-link:not(.ui-state-disabled)");
        this.menuText = this.menuitemLinks.find(".ui-menuitem-text");
        this.treeLinks = this.menuContent.find(".ui-menu-parent > .ui-menuitem-link:not(.ui-state-disabled)");
        this.focusedItem = null;
        this.menuText.attr("tabindex", -1);
        this.menuText.attr("role", "menuitem");
        this.treeLinks.find("> .ui-menuitem-text").attr("aria-expanded", false);
        this.bindEvents();
        if (this.cfg.stateful) {
            this.stateKey = "panelMenu-" + this.id
        }
        this.restoreState()
    },
    bindEvents: function() {
        var b = this;
        this.headers.mouseover(function() {
            var a = $(this);
            if (!a.hasClass("ui-state-active")) {
                a.addClass("ui-state-hover")
            }
        }).mouseout(function() {
            var a = $(this);
            if (!a.hasClass("ui-state-active")) {
                a.removeClass("ui-state-hover")
            }
        }).click(function(a) {
            var d = $(this);
            if (d.hasClass("ui-state-active")) {
                b.collapseRootSubmenu($(this))
            } else {
                b.expandRootSubmenu($(this), false)
            }
            b.removeFocusedItem();
            d.focus();
            a.preventDefault()
        });
        this.menuitemLinks.mouseover(function() {
            $(this).addClass("ui-state-hover")
        }).mouseout(function() {
            $(this).removeClass("ui-state-hover")
        }).click(function(e) {
            var f = $(this);
            b.focusItem(f.closest(".ui-menuitem"));
            var a = f.attr("href");
            if (a && a !== "#") {
                window.location.href = a
            }
            e.preventDefault()
        });
        this.treeLinks.click(function(e) {
            var g = $(this)
              , h = g.parent()
              , a = g.next();
            if (a.is(":visible")) {
                b.collapseTreeItem(h)
            } else {
                b.expandTreeItem(h, false)
            }
            e.preventDefault()
        });
        this.bindKeyEvents()
    },
    bindKeyEvents: function() {
        var c = this;
        if (PrimeFaces.env.isIE()) {
            this.focusCheck = false
        }
        this.headers.on("focus.panelmenu", function() {
            $(this).addClass("ui-menuitem-outline")
        }).on("blur.panelmenu", function() {
            $(this).removeClass("ui-menuitem-outline ui-state-hover")
        }).on("keydown.panelmenu", function(a) {
            var b = $.ui.keyCode
              , e = a.which;
            if (e === b.SPACE || e === b.ENTER || e === b.NUMPAD_ENTER) {
                $(this).trigger("click");
                a.preventDefault()
            }
        });
        this.menuContent.on("mousedown.panelmenu", function(a) {
            if ($(a.target).is(":not(:input:enabled)")) {
                a.preventDefault()
            }
        }).on("focus.panelmenu", function() {
            if (!c.focusedItem) {
                c.focusItem(c.getFirstItemOfContent($(this)));
                if (PrimeFaces.env.isIE()) {
                    c.focusCheck = false
                }
            }
        });
        this.menuContent.off("keydown.panelmenu blur.panelmenu").on("keydown.panelmenu", function(a) {
            if (!c.focusedItem) {
                return
            }
            var b = $.ui.keyCode;
            switch (a.which) {
            case b.LEFT:
                if (c.isExpanded(c.focusedItem)) {
                    c.focusedItem.children(".ui-menuitem-link").trigger("click")
                } else {
                    var n = c.focusedItem.closest("ul.ui-menu-list");
                    if (n.parent().is(":not(.ui-panelmenu-content)")) {
                        c.focusItem(n.closest("li.ui-menuitem"))
                    }
                }
                a.preventDefault();
                break;
            case b.RIGHT:
                if (c.focusedItem.hasClass("ui-menu-parent") && !c.isExpanded(c.focusedItem)) {
                    c.focusedItem.children(".ui-menuitem-link").trigger("click")
                }
                a.preventDefault();
                break;
            case b.UP:
                var e = null
                  , p = c.focusedItem.prev();
                if (p.length) {
                    e = p.find("li.ui-menuitem:visible:last");
                    if (!e.length) {
                        e = p
                    }
                } else {
                    e = c.focusedItem.closest("ul").parent("li")
                }
                if (e.length) {
                    c.focusItem(e)
                }
                a.preventDefault();
                break;
            case b.DOWN:
                var e = null
                  , l = c.focusedItem.find("> ul > li:visible:first");
                if (l.length) {
                    e = l
                } else {
                    if (c.focusedItem.next().length) {
                        e = c.focusedItem.next()
                    } else {
                        if (c.focusedItem.next().length === 0) {
                            e = c.searchDown(c.focusedItem)
                        }
                    }
                }
                if (e && e.length) {
                    c.focusItem(e)
                }
                a.preventDefault();
                break;
            case b.ENTER:
            case b.NUMPAD_ENTER:
            case b.SPACE:
                var m = c.focusedItem.children(".ui-menuitem-link");
                setTimeout(function() {
                    m.trigger("click")
                }, 1);
                c.jq.blur();
                var o = m.attr("href");
                if (o && o !== "#") {
                    window.location.href = o
                }
                a.preventDefault();
                break;
            case b.TAB:
                if (c.focusedItem) {
                    if (PrimeFaces.env.isIE()) {
                        c.focusCheck = true
                    }
                    $(this).focus()
                }
                break
            }
        }).on("blur.panelmenu", function(a) {
            if (PrimeFaces.env.isIE() && !c.focusCheck) {
                return
            }
            c.removeFocusedItem()
        });
        var d = "click." + this.id;
        $(document.body).off(d).on(d, function(a) {
            if (!$(a.target).closest(".ui-panelmenu").length) {
                c.removeFocusedItem()
            }
        })
    },
    searchDown: function(d) {
        var e = d.closest("ul").parent("li").next()
          , f = null;
        if (e.length) {
            f = e
        } else {
            if (d.closest("ul").parent("li").length === 0) {
                f = d
            } else {
                f = this.searchDown(d.closest("ul").parent("li"))
            }
        }
        return f
    },
    getFirstItemOfContent: function(b) {
        return b.find("> .ui-menu-list > .ui-menuitem:visible:first-child")
    },
    getItemText: function(b) {
        return b.find("> .ui-menuitem-link > span.ui-menuitem-text")
    },
    focusItem: function(b) {
        this.removeFocusedItem();
        this.getItemText(b).addClass("ui-menuitem-outline").focus();
        this.focusedItem = b
    },
    removeFocusedItem: function() {
        if (this.focusedItem) {
            this.getItemText(this.focusedItem).removeClass("ui-menuitem-outline");
            this.focusedItem = null
        }
    },
    isExpanded: function(b) {
        return b.children("ul.ui-menu-list").is(":visible")
    },
    collapseRootSubmenu: function(c) {
        var d = c.next();
        c.attr("aria-expanded", false).removeClass("ui-state-active ui-corner-top").addClass("ui-state-hover ui-corner-all").children(".ui-icon").removeClass("ui-icon-triangle-1-s").addClass("ui-icon-triangle-1-e");
        d.attr("aria-hidden", true).slideUp("normal", "easeInOutCirc");
        this.removeAsExpanded(d)
    },
    expandRootSubmenu: function(f, d) {
        var e = f.next();
        f.attr("aria-expanded", true).addClass("ui-state-active ui-corner-top").removeClass("ui-state-hover ui-corner-all").children(".ui-icon").removeClass("ui-icon-triangle-1-e").addClass("ui-icon-triangle-1-s");
        if (d) {
            e.attr("aria-hidden", false).show()
        } else {
            e.attr("aria-hidden", false).slideDown("normal", "easeInOutCirc");
            this.addAsExpanded(e)
        }
    },
    expandTreeItem: function(e, d) {
        var f = e.find("> .ui-menuitem-link");
        f.find("> .ui-menuitem-text").attr("aria-expanded", true);
        f.find("> .ui-panelmenu-icon").addClass("ui-icon-triangle-1-s");
        e.children(".ui-menu-list").show();
        if (!d) {
            this.addAsExpanded(e)
        }
    },
    collapseTreeItem: function(d) {
        var c = d.find("> .ui-menuitem-link");
        c.find("> .ui-menuitem-text").attr("aria-expanded", false);
        c.find("> .ui-panelmenu-icon").removeClass("ui-icon-triangle-1-s");
        d.children(".ui-menu-list").hide();
        this.removeAsExpanded(d)
    },
    saveState: function() {
        if (this.cfg.stateful) {
            var b = this.expandedNodes.join(",");
            PrimeFaces.setCookie(this.stateKey, b, {
                path: "/"
            })
        }
    },
    restoreState: function() {
        var i = null;
        if (this.cfg.stateful) {
            i = PrimeFaces.getCookie(this.stateKey)
        }
        if (i) {
            this.collapseAll();
            this.expandedNodes = i.split(",");
            for (var j = 0; j < this.expandedNodes.length; j++) {
                var f = $(PrimeFaces.escapeClientId(this.expandedNodes[j]));
                if (f.is("div.ui-panelmenu-content")) {
                    this.expandRootSubmenu(f.prev(), true)
                } else {
                    if (f.is("li.ui-menu-parent")) {
                        this.expandTreeItem(f, true)
                    }
                }
            }
        } else {
            this.expandedNodes = [];
            var g = this.headers.filter(".ui-state-active")
              , h = this.jq.find(".ui-menu-parent > .ui-menu-list:not(.ui-helper-hidden)");
            for (var j = 0; j < g.length; j++) {
                this.expandedNodes.push(g.eq(j).next().attr("id"))
            }
            for (var j = 0; j < h.length; j++) {
                this.expandedNodes.push(h.eq(j).parent().attr("id"))
            }
        }
    },
    removeAsExpanded: function(d) {
        var c = d.attr("id");
        this.expandedNodes = $.grep(this.expandedNodes, function(a) {
            return a != c
        });
        this.saveState()
    },
    addAsExpanded: function(b) {
        this.expandedNodes.push(b.attr("id"));
        this.saveState()
    },
    clearState: function() {
        if (this.cfg.stateful) {
            PrimeFaces.deleteCookie(this.stateKey, {
                path: "/"
            })
        }
    },
    collapseAll: function() {
        this.headers.filter(".ui-state-active").each(function() {
            var b = $(this);
            b.removeClass("ui-state-active").children(".ui-icon-triangle-1-s").addClass("ui-icon-triangle-1-e").removeClass("ui-icon-triangle-1-s");
            b.next().addClass("ui-helper-hidden")
        });
        this.jq.find(".ui-menu-parent > .ui-menu-list:not(.ui-helper-hidden)").each(function() {
            $(this).addClass("ui-helper-hidden").prev().children(".ui-panelmenu-icon").removeClass("ui-icon-triangle-1-s").addClass("ui-icon-triangle-1-e")
        })
    }
});
PrimeFaces.widget.TabMenu = PrimeFaces.widget.Menu.extend({
    init: function(b) {
        this._super(b);
        this.items = this.jq.find("> .ui-tabmenu-nav > li:not(.ui-state-disabled)");
        this.bindEvents();
        this.bindKeyEvents()
    },
    bindEvents: function() {
        this.items.on("mouseover.tabmenu", function(c) {
            var d = $(this);
            if (!d.hasClass("ui-state-active")) {
                d.addClass("ui-state-hover")
            }
        }).on("mouseout.tabmenu", function(b) {
            $(this).removeClass("ui-state-hover")
        })
    },
    bindKeyEvents: function() {
        this.items.attr("tabindex", 0);
        this.items.on("focus.tabmenu", function(b) {
            $(this).addClass("ui-menuitem-outline")
        }).on("blur.tabmenu", function() {
            $(this).removeClass("ui-menuitem-outline")
        }).on("keydown.tabmenu", function(h) {
            var i = $.ui.keyCode
              , j = h.which;
            if (j === i.SPACE || j === i.ENTER || j === i.NUMPAD_ENTER) {
                var e = $(this).children("a");
                e.trigger("click");
                var g = e.attr("href");
                if (g && g !== "#") {
                    window.location.href = g
                }
                h.preventDefault()
            }
        })
    }
});
PrimeFaces.widget.Message = PrimeFaces.widget.BaseWidget.extend({
    init: function(d) {
        this._super(d);
        var c = this.jq.children(".ui-message-error-detail").text();
        if (c) {
            $(PrimeFaces.escapeClientId(this.cfg.target)).data("tooltip", c)
        }
    }
});
PrimeFaces.widget.NotificationBar = PrimeFaces.widget.BaseWidget.extend({
    init: function(c) {
        this._super(c);
        var d = this;
        this.jq.css(this.cfg.position, "0").appendTo($("body"));
        if (this.cfg.autoDisplay) {
            $(this.jq).css("display", "block")
        }
        this.jq.children(".ui-notificationbar-close").click(function() {
            d.hide()
        })
    },
    show: function() {
        if (this.cfg.effect === "slide") {
            $(this.jq).slideDown(this.cfg.effect)
        } else {
            if (this.cfg.effect === "fade") {
                $(this.jq).fadeIn(this.cfg.effect)
            } else {
                if (this.cfg.effect === "none") {
                    $(this.jq).show()
                }
            }
        }
    },
    hide: function() {
        if (this.cfg.effect === "slide") {
            $(this.jq).slideUp(this.cfg.effect)
        } else {
            if (this.cfg.effect === "fade") {
                $(this.jq).fadeOut(this.cfg.effect)
            } else {
                if (this.cfg.effect === "none") {
                    $(this.jq).hide()
                }
            }
        }
    },
    isVisible: function() {
        return this.jq.is(":visible") || (this.jq.is(":visible") && this.jq.hasClass("ui-overlay-visible"))
    },
    toggle: function() {
        if (this.isVisible()) {
            this.hide()
        } else {
            this.show()
        }
    }
});
PrimeFaces.widget.Panel = PrimeFaces.widget.BaseWidget.extend({
    init: function(b) {
        this._super(b);
        this.header = this.jq.children("div.ui-panel-titlebar");
        this.title = this.header.children("span.ui-panel-title");
        this.content = $(this.jqId + "_content");
        this.bindEvents()
    },
    bindEvents: function() {
        if (this.cfg.toggleable) {
            this.bindToggler()
        }
        if (this.cfg.closable) {
            this.bindCloser()
        }
        if (this.cfg.hasMenu) {
            $(this.jqId + "_menu").on("click.panel", function(b) {
                b.preventDefault()
            })
        }
        this.header.find(".ui-panel-titlebar-icon").on("mouseover.panel", function() {
            $(this).addClass("ui-state-hover")
        }).on("mouseout.panel", function() {
            $(this).removeClass("ui-state-hover")
        }).on("click.panel", function(c) {
            var d = $(this).attr("href");
            if (!d || d == "#") {
                c.preventDefault()
            }
        })
    },
    toggle: function() {
        if (this.cfg.collapsed) {
            this.expand();
            PrimeFaces.invokeDeferredRenders(this.id)
        } else {
            this.collapse()
        }
    },
    expand: function() {
        this.toggleState(false, "ui-icon-plusthick", "ui-icon-minusthick");
        if (this.cfg.toggleOrientation === "vertical") {
            this.slideDown()
        } else {
            if (this.cfg.toggleOrientation === "horizontal") {
                this.slideRight()
            }
        }
    },
    collapse: function() {
        this.toggleState(true, "ui-icon-minusthick", "ui-icon-plusthick");
        if (this.cfg.toggleOrientation === "vertical") {
            this.slideUp()
        } else {
            if (this.cfg.toggleOrientation === "horizontal") {
                this.slideLeft()
            }
        }
    },
    slideUp: function() {
        this.content.slideUp(this.cfg.toggleSpeed, "easeInOutCirc")
    },
    slideDown: function() {
        this.content.slideDown(this.cfg.toggleSpeed, "easeInOutCirc")
    },
    slideLeft: function() {
        var b = this;
        this.originalWidth = this.jq.width();
        this.title.hide();
        this.toggler.hide();
        this.content.hide();
        this.jq.animate({
            width: "42px"
        }, this.cfg.toggleSpeed, "easeInOutCirc", function() {
            b.toggler.show();
            b.jq.addClass("ui-panel-collapsed-h")
        })
    },
    slideRight: function() {
        var d = this
          , c = this.originalWidth || "100%";
        this.toggler.hide();
        this.jq.animate({
            width: c
        }, this.cfg.toggleSpeed, "easeInOutCirc", function() {
            d.jq.removeClass("ui-panel-collapsed-h");
            d.title.show();
            d.toggler.show();
            d.content.css({
                visibility: "visible",
                display: "block",
                height: "auto"
            })
        })
    },
    toggleState: function(f, d, e) {
        this.toggler.children("span.ui-icon").removeClass(d).addClass(e);
        this.cfg.collapsed = f;
        this.toggleStateHolder.val(f);
        this.fireToggleEvent()
    },
    fireToggleEvent: function() {
        if (this.cfg.behaviors) {
            var b = this.cfg.behaviors.toggle;
            if (b) {
                b.call(this)
            }
        }
    },
    close: function() {
        if (this.visibleStateHolder) {
            this.visibleStateHolder.val(false)
        }
        var b = this;
        this.jq.fadeOut(this.cfg.closeSpeed, function(d) {
            if (b.cfg.behaviors) {
                var a = b.cfg.behaviors.close;
                if (a) {
                    a.call(b)
                }
            }
        })
    },
    show: function() {
        var b = this;
        $(this.jqId).fadeIn(this.cfg.closeSpeed, function() {
            PrimeFaces.invokeDeferredRenders(b.id)
        });
        this.visibleStateHolder.val(true)
    },
    bindToggler: function() {
        var b = this;
        this.toggler = $(this.jqId + "_toggler");
        this.toggleStateHolder = $(this.jqId + "_collapsed");
        this.toggler.click(function() {
            b.toggle()
        })
    },
    bindCloser: function() {
        var b = this;
        this.closer = $(this.jqId + "_closer");
        this.visibleStateHolder = $(this.jqId + "_visible");
        this.closer.click(function(a) {
            b.close();
            a.preventDefault()
        })
    }
});
PrimeFaces.widget.Poll = PrimeFaces.widget.BaseWidget.extend({
    init: function(b) {
        this.cfg = b;
        this.id = this.cfg.id;
        this.active = false;
        if (this.cfg.autoStart) {
            this.start()
        }
    },
    refresh: function(b) {
        if (this.isActive()) {
            this.stop()
        }
        this.init(b)
    },
    start: function() {
        this.timer = setInterval(this.cfg.fn, (this.cfg.frequency * 1000));
        this.active = true
    },
    stop: function() {
        clearInterval(this.timer);
        this.active = false
    },
    isActive: function() {
        return this.active
    }
});
PrimeFaces.widget.OrderList = PrimeFaces.widget.BaseWidget.extend({
    init: function(d) {
        this._super(d);
        this.list = this.jq.find(".ui-orderlist-list"),
        this.items = this.list.children(".ui-orderlist-item");
        this.input = $(this.jqId + "_values");
        this.cfg.effect = this.cfg.effect || "fade";
        this.cfg.disabled = this.jq.hasClass("ui-state-disabled");
        var c = this;
        if (!this.cfg.disabled) {
            this.generateItems();
            this.setupButtons();
            this.bindEvents();
            this.list.sortable({
                revert: 1,
                start: function(b, a) {
                    PrimeFaces.clearSelection()
                },
                update: function(b, a) {
                    c.onDragDrop(b, a)
                }
            })
        }
    },
    generateItems: function() {
        var b = this;
        this.list.children(".ui-orderlist-item").each(function() {
            var a = $(this)
              , d = a.data("item-value");
            b.input.append('<option value="' + d + '" selected="selected">' + d + "</option>")
        })
    },
    bindEvents: function() {
        var b = this;
        this.items.on("mouseover.orderList", function(d) {
            var a = $(this);
            if (!a.hasClass("ui-state-highlight")) {
                $(this).addClass("ui-state-hover")
            }
        }).on("mouseout.orderList", function(d) {
            var a = $(this);
            if (!a.hasClass("ui-state-highlight")) {
                $(this).removeClass("ui-state-hover")
            }
        }).on("mousedown.orderList", function(f) {
            var a = $(this)
              , e = (f.metaKey || f.ctrlKey);
            if (!e) {
                a.removeClass("ui-state-hover").addClass("ui-state-highlight").siblings(".ui-state-highlight").removeClass("ui-state-highlight");
                b.fireItemSelectEvent(a, f)
            } else {
                if (a.hasClass("ui-state-highlight")) {
                    a.removeClass("ui-state-highlight");
                    b.fireItemUnselectEvent(a)
                } else {
                    a.removeClass("ui-state-hover").addClass("ui-state-highlight");
                    b.fireItemSelectEvent(a, f)
                }
            }
        })
    },
    setupButtons: function() {
        var b = this;
        PrimeFaces.skinButton(this.jq.find(".ui-button"));
        this.jq.find(" .ui-orderlist-controls .ui-orderlist-button-move-up").click(function() {
            b.moveUp(b.sourceList)
        });
        this.jq.find(" .ui-orderlist-controls .ui-orderlist-button-move-top").click(function() {
            b.moveTop(b.sourceList)
        });
        this.jq.find(" .ui-orderlist-controls .ui-orderlist-button-move-down").click(function() {
            b.moveDown(b.sourceList)
        });
        this.jq.find(" .ui-orderlist-controls .ui-orderlist-button-move-bottom").click(function() {
            b.moveBottom(b.sourceList)
        })
    },
    onDragDrop: function(d, c) {
        c.item.removeClass("ui-state-highlight");
        this.saveState();
        this.fireReorderEvent()
    },
    saveState: function() {
        this.input.children().remove();
        this.generateItems()
    },
    moveUp: function() {
        var j = this
          , h = j.list.children(".ui-orderlist-item.ui-state-highlight")
          , i = h.length
          , f = 0
          , g = h.is(":first-child");
        if (g) {
            return
        }
        h.each(function() {
            var a = $(this);
            if (!a.is(":first-child")) {
                a.hide(j.cfg.effect, {}, "fast", function() {
                    a.insertBefore(a.prev()).show(j.cfg.effect, {}, "fast", function() {
                        f++;
                        if (i === f) {
                            j.saveState();
                            j.fireReorderEvent()
                        }
                    })
                })
            } else {
                i--
            }
        })
    },
    moveTop: function() {
        var k = this
          , i = k.list.children(".ui-orderlist-item.ui-state-highlight")
          , j = i.length
          , g = 0
          , h = i.is(":first-child")
          , l = i.eq(0).index();
        if (h) {
            return
        }
        i.each(function(b) {
            var a = $(this)
              , c = (b === 0) ? 0 : (a.index() - l);
            if (!a.is(":first-child")) {
                a.hide(k.cfg.effect, {}, "fast", function() {
                    a.insertBefore(k.list.children(".ui-orderlist-item").eq(c)).show(k.cfg.effect, {}, "fast", function() {
                        g++;
                        if (j === g) {
                            k.saveState();
                            k.fireReorderEvent()
                        }
                    })
                })
            } else {
                j--
            }
        })
    },
    moveDown: function() {
        var j = this
          , h = $(j.list.children(".ui-orderlist-item.ui-state-highlight").get().reverse())
          , i = h.length
          , f = 0
          , g = h.is(":last-child");
        if (g) {
            return
        }
        h.each(function() {
            var a = $(this);
            if (!a.is(":last-child")) {
                a.hide(j.cfg.effect, {}, "fast", function() {
                    a.insertAfter(a.next()).show(j.cfg.effect, {}, "fast", function() {
                        f++;
                        if (i === f) {
                            j.saveState();
                            j.fireReorderEvent()
                        }
                    })
                })
            } else {
                i--
            }
        })
    },
    moveBottom: function() {
        var m = this
          , j = $(m.list.children(".ui-orderlist-item.ui-state-highlight").get().reverse())
          , k = j.length
          , n = 0
          , i = j.is(":last-child")
          , l = j.eq(0).index()
          , h = this.items.length;
        if (i) {
            return
        }
        j.each(function(b) {
            var a = $(this)
              , c = (b === 0) ? h - 1 : (a.index() - l) - 1;
            if (!a.is(":last-child")) {
                a.hide(m.cfg.effect, {}, "fast", function() {
                    a.insertAfter(m.list.children(".ui-orderlist-item").eq(c)).show(m.cfg.effect, {}, "fast", function() {
                        n++;
                        if (k === n) {
                            m.saveState();
                            m.fireReorderEvent()
                        }
                    })
                })
            } else {
                k--
            }
        })
    },
    hasBehavior: function(b) {
        if (this.cfg.behaviors) {
            return this.cfg.behaviors[b] != undefined
        }
        return false
    },
    fireItemSelectEvent: function(e, g) {
        if (this.hasBehavior("select")) {
            var h = this.cfg.behaviors.select
              , f = {
                params: [{
                    name: this.id + "_itemIndex",
                    value: e.index()
                }, {
                    name: this.id + "_metaKey",
                    value: g.metaKey
                }, {
                    name: this.id + "_ctrlKey",
                    value: g.ctrlKey
                }]
            };
            h.call(this, f)
        }
    },
    fireItemUnselectEvent: function(f) {
        if (this.hasBehavior("unselect")) {
            var e = this.cfg.behaviors.unselect
              , d = {
                params: [{
                    name: this.id + "_itemIndex",
                    value: f.index()
                }]
            };
            e.call(this, d)
        }
    },
    fireReorderEvent: function() {
        if (this.hasBehavior("reorder")) {
            this.cfg.behaviors.reorder.call(this)
        }
    }
});
PrimeFaces.widget.OutputPanel = PrimeFaces.widget.BaseWidget.extend({
    init: function(b) {
        this._super(b);
        this.cfg.global = this.cfg.global || false;
        if (this.cfg.deferred) {
            if (this.cfg.deferredMode === "load") {
                this.loadContent()
            } else {
                if (this.cfg.deferredMode === "visible") {
                    if (this.visible()) {
                        this.loadContent()
                    } else {
                        this.bindScrollMonitor()
                    }
                }
            }
        }
    },
    loadContent: function() {
        var c = this
          , d = {
            source: this.id,
            process: this.id,
            update: this.id,
            async: true,
            ignoreAutoUpdate: true,
            global: this.cfg.global,
            params: [{
                name: this.id + "_load",
                value: true
            }],
            onsuccess: function(a, f, b) {
                PrimeFaces.ajax.Response.handle(a, f, b, {
                    widget: c,
                    handle: function(e) {
                        this.jq.html(e)
                    }
                });
                return true
            },
            onerror: function(a, f, b) {
                c.jq.html("")
            }
        };
        if (this.cfg.delay) {
            setTimeout(function() {
                PrimeFaces.ajax.Request.handle(d)
            }, parseInt(this.cfg.delay))
        } else {
            PrimeFaces.ajax.Request.handle(d)
        }
    },
    bindScrollMonitor: function() {
        var c = this
          , d = $(window);
        d.off("scroll." + this.id).on("scroll." + this.id, function() {
            if (c.visible()) {
                c.unbindScrollMonitor();
                c.loadContent()
            }
        })
    },
    visible: function() {
        var h = $(window)
          , i = h.scrollTop()
          , g = h.height()
          , j = this.jq.offset().top
          , f = j + this.jq.innerHeight();
        if ((j >= i && j <= (i + g)) || (f >= i && f <= (i + g))) {
            return true
        }
    },
    unbindScrollMonitor: function() {
        $(window).off("scroll." + this.id)
    }
});
PrimeFaces.widget.OverlayPanel = PrimeFaces.widget.BaseWidget.extend({
    init: function(d) {
        this._super(d);
        this.content = this.jq.children("div.ui-overlaypanel-content");
        this.cfg.my = this.cfg.my || "left top";
        this.cfg.at = this.cfg.at || "left bottom";
        this.cfg.showEvent = this.cfg.showEvent || "click.ui-overlaypanel";
        this.cfg.hideEvent = this.cfg.hideEvent || "click.ui-overlaypanel";
        this.cfg.dismissable = (this.cfg.dismissable === false) ? false : true;
        if (this.cfg.showCloseIcon) {
            this.closerIcon = $('<a href="#" class="ui-overlaypanel-close ui-state-default" href="#"><span class="ui-icon ui-icon-closethick"></span></a>').appendTo(this.jq)
        }
        if (this.jq.length > 1) {
            $(document.body).children(this.jqId).remove();
            this.jq = $(this.jqId)
        }
        var c = $(this.jqId + "_modal");
        if (c.length > 0) {
            c.remove()
        }
        if (this.cfg.appendToBody) {
            this.jq.appendTo(document.body)
        }
        this.bindCommonEvents();
        if (this.cfg.target) {
            this.target = PrimeFaces.expressions.SearchExpressionFacade.resolveComponentsAsSelector(this.cfg.target);
            this.bindTargetEvents();
            this.setupDialogSupport()
        }
    },
    bindTargetEvents: function() {
        var g = this;
        this.target.data("primefaces-overlay-target", this.id).find("*").data("primefaces-overlay-target", this.id);
        if (this.cfg.showEvent === this.cfg.hideEvent) {
            var e = this.cfg.showEvent;
            this.target.on(e, function(a) {
                g.toggle()
            })
        } else {
            var f = this.cfg.showEvent + ".ui-overlaypanel"
              , h = this.cfg.hideEvent + ".ui-overlaypanel";
            this.target.off(f + " " + h).on(f, function(a) {
                if (!g.isVisible()) {
                    g.show();
                    if (f === "contextmenu.ui-overlaypanel") {
                        a.preventDefault()
                    }
                }
            }).on(h, function(a) {
                if (g.isVisible()) {
                    g.hide()
                }
            })
        }
        g.target.off("keydown.ui-overlaypanel keyup.ui-overlaypanel").on("keydown.ui-overlaypanel", function(a) {
            var b = $.ui.keyCode
              , c = a.which;
            if (c === b.ENTER || c === b.NUMPAD_ENTER) {
                a.preventDefault()
            }
        }).on("keyup.ui-overlaypanel", function(a) {
            var b = $.ui.keyCode
              , c = a.which;
            if (c === b.ENTER || c === b.NUMPAD_ENTER) {
                g.toggle();
                a.preventDefault()
            }
        })
    },
    bindCommonEvents: function() {
        var f = this;
        if (this.cfg.showCloseIcon) {
            this.closerIcon.on("mouseover.ui-overlaypanel", function() {
                $(this).addClass("ui-state-hover")
            }).on("mouseout.ui-overlaypanel", function() {
                $(this).removeClass("ui-state-hover")
            }).on("click.ui-overlaypanel", function(a) {
                f.hide();
                a.preventDefault()
            }).on("focus.ui-overlaypanel", function() {
                $(this).addClass("ui-state-focus")
            }).on("blur.ui-overlaypanel", function() {
                $(this).removeClass("ui-state-focus")
            })
        }
        if (this.cfg.dismissable && !this.cfg.modal) {
            var d = "mousedown." + this.id;
            $(document.body).off(d).on(d, function(b) {
                if (f.jq.hasClass("ui-overlay-hidden")) {
                    return
                }
                if (f.target) {
                    var c = $(b.target);
                    if (f.target.is(c) || f.target.has(c).length > 0) {
                        return
                    }
                }
                var a = f.jq.offset();
                if (b.pageX < a.left || b.pageX > a.left + f.jq.outerWidth() || b.pageY < a.top || b.pageY > a.top + f.jq.outerHeight()) {
                    f.hide()
                }
            })
        }
        var e = "resize." + this.id;
        $(window).off(e).on(e, function() {
            if (f.jq.hasClass("ui-overlay-visible")) {
                f.align()
            }
        })
    },
    toggle: function() {
        if (!this.isVisible()) {
            this.show()
        } else {
            this.hide()
        }
    },
    show: function(b) {
        if (!this.loaded && this.cfg.dynamic) {
            this.loadContents(b)
        } else {
            this._show(b)
        }
    },
    _show: function(f) {
        var d = this
          , e = f || this.cfg.target;
        this.targetElement = $(document.getElementById(e));
        this.targetZindex = this.targetElement.zIndex();
        this.align(f);
        this.jq.removeClass("ui-overlay-hidden").addClass("ui-overlay-visible").css({
            display: "none",
            visibility: "visible"
        });
        if (this.cfg.showEffect) {
            this.jq.show(this.cfg.showEffect, {}, 200, function() {
                d.postShow()
            })
        } else {
            this.jq.show();
            this.postShow()
        }
        if (this.cfg.modal) {
            this.enableModality()
        }
    },
    align: function(h) {
        var j = this.jq.css("position") == "fixed"
          , i = $(window)
          , g = j ? "-" + i.scrollLeft() + " -" + i.scrollTop() : null
          , f = h || this.cfg.target;
        this.jq.css({
            left: "",
            top: "",
            "z-index": ++PrimeFaces.zindex
        }).position({
            my: this.cfg.my,
            at: this.cfg.at,
            of: document.getElementById(f),
            offset: g
        })
    },
    hide: function() {
        var b = this;
        if (this.cfg.hideEffect) {
            this.jq.hide(this.cfg.hideEffect, {}, 200, function() {
                if (b.cfg.modal) {
                    b.disableModality()
                }
                b.postHide()
            })
        } else {
            this.jq.hide();
            if (b.cfg.modal) {
                b.disableModality()
            }
            this.postHide()
        }
    },
    postShow: function() {
        if (this.cfg.onShow) {
            this.cfg.onShow.call(this)
        }
        this.applyFocus()
    },
    postHide: function() {
        this.jq.removeClass("ui-overlay-visible").addClass("ui-overlay-hidden").css({
            display: "block",
            visibility: "hidden"
        });
        if (this.cfg.onHide) {
            this.cfg.onHide.call(this)
        }
    },
    setupDialogSupport: function() {
        var b = this.target.closest(".ui-dialog");
        if (b.length == 1) {
            this.jq.css("position", "fixed");
            if (!this.cfg.appendToBody) {
                this.jq.appendTo(document.body)
            }
        }
    },
    loadContents: function(f) {
        var d = this
          , e = {
            source: this.id,
            process: this.id,
            update: this.id,
            params: [{
                name: this.id + "_contentLoad",
                value: true
            }],
            onsuccess: function(a, c, b) {
                PrimeFaces.ajax.Response.handle(a, c, b, {
                    widget: d,
                    handle: function(h) {
                        this.content.html(h);
                        this.loaded = true
                    }
                });
                return true
            },
            oncomplete: function() {
                d._show(f)
            }
        };
        PrimeFaces.ajax.Request.handle(e)
    },
    isVisible: function() {
        return this.jq.hasClass("ui-overlay-visible")
    },
    applyFocus: function() {
        this.jq.find(":not(:submit):not(:button):input:visible:enabled:first").focus()
    },
    enableModality: function() {
        var c = this
          , d = $(document);
        $(document.body).append('<div id="' + this.id + '_modal" class="ui-widget-overlay ui-overlaypanel-mask"></div>').children(this.jqId + "_modal").css("z-index", this.jq.css("z-index") - 1);
        this.blockEvents = "focus." + this.id + " mousedown." + this.id + " mouseup." + this.id;
        if (this.targetElement) {
            this.targetElement.css("z-index", this.jq.css("z-index"))
        }
        d.on("keydown." + this.id, function(j) {
            var i = $(j.target);
            if (j.keyCode === $.ui.keyCode.TAB) {
                var k = c.getTabbables();
                if (k.length) {
                    var b = k.filter(":first")
                      , l = k.filter(":last")
                      , a = null;
                    if (b.is(":radio")) {
                        a = k.filter('[name="' + b.attr("name") + '"]').filter(":checked");
                        if (a.length > 0) {
                            b = a
                        }
                    }
                    if (l.is(":radio")) {
                        a = k.filter('[name="' + l.attr("name") + '"]').filter(":checked");
                        if (a.length > 0) {
                            l = a
                        }
                    }
                    if (i.is(document.body)) {
                        b.focus(1);
                        j.preventDefault()
                    } else {
                        if (j.target === l[0] && !j.shiftKey) {
                            b.focus(1);
                            j.preventDefault()
                        } else {
                            if (j.target === b[0] && j.shiftKey) {
                                l.focus(1);
                                j.preventDefault()
                            }
                        }
                    }
                }
            } else {
                if (!i.is(document.body) && (i.zIndex() < c.jq.zIndex())) {
                    j.preventDefault()
                }
            }
        }).on(this.blockEvents, function(a) {
            if ($(a.target).zIndex() < c.jq.zIndex()) {
                a.preventDefault()
            }
        })
    },
    disableModality: function() {
        if (this.targetElement) {
            this.targetElement.css("z-index", this.targetZindex)
        }
        $(document.body).children(this.jqId + "_modal").remove();
        $(document).off(this.blockEvents).off("keydown." + this.id)
    },
    getTabbables: function() {
        var b;
        if (this.targetElement && this.targetElement.is(":tabbable")) {
            b = this.targetElement
        }
        return this.jq.find(":tabbable").add(b)
    }
});
PrimeFaces.widget.Paginator = PrimeFaces.widget.BaseWidget.extend({
    init: function(c) {
        this.cfg = c;
        this.jq = $();
        var d = this;
        $.each(this.cfg.id, function(b, a) {
            d.jq = d.jq.add($(PrimeFaces.escapeClientId(a)))
        });
        this.pagesContainer = this.jq.children(".ui-paginator-pages");
        this.pageLinks = this.pagesContainer.children(".ui-paginator-page");
        this.rppSelect = this.jq.children(".ui-paginator-rpp-options");
        this.jtpSelect = this.jq.children(".ui-paginator-jtp-select");
        this.firstLink = this.jq.children(".ui-paginator-first");
        this.prevLink = this.jq.children(".ui-paginator-prev");
        this.nextLink = this.jq.children(".ui-paginator-next");
        this.endLink = this.jq.children(".ui-paginator-last");
        this.currentReport = this.jq.children(".ui-paginator-current");
        this.cfg.rows = this.cfg.rows == 0 ? this.cfg.rowCount : this.cfg.rows;
        this.cfg.prevRows = this.cfg.rows;
        this.cfg.pageCount = Math.ceil(this.cfg.rowCount / this.cfg.rows) || 1;
        this.cfg.pageLinks = this.cfg.pageLinks || 10;
        this.cfg.currentPageTemplate = this.cfg.currentPageTemplate || "({currentPage} of {totalPages})";
        this.cfg.ariaPageLabel = PrimeFaces.getAriaLabel("paginator.PAGE");
        this.bindEvents()
    },
    bindEvents: function() {
        var b = this;
        this.jq.children("a.ui-state-default").on("mouseover.paginator", function() {
            var a = $(this);
            if (!a.hasClass("ui-state-disabled")) {
                a.addClass("ui-state-hover")
            }
        }).on("mouseout.paginator", function() {
            $(this).removeClass("ui-state-hover")
        }).on("focus.paginator", function() {
            var a = $(this);
            if (!a.hasClass("ui-state-disabled")) {
                a.addClass("ui-state-focus")
            }
        }).on("blur.paginator", function() {
            $(this).removeClass("ui-state-focus")
        }).on("keydown.paginator", function(e) {
            var a = e.which
              , f = $.ui.keyCode;
            if ((a === f.ENTER || a === f.NUMPAD_ENTER)) {
                $(this).trigger("click");
                e.preventDefault()
            }
        });
        this.bindPageLinkEvents();
        PrimeFaces.skinSelect(this.rppSelect);
        this.rppSelect.change(function(a) {
            if (!$(this).hasClass("ui-state-disabled")) {
                b.setRowsPerPage(parseInt($(this).val()))
            }
        });
        PrimeFaces.skinSelect(this.jtpSelect);
        this.jtpSelect.change(function(a) {
            if (!$(this).hasClass("ui-state-disabled")) {
                b.setPage(parseInt($(this).val()))
            }
        });
        this.firstLink.click(function(a) {
            PrimeFaces.clearSelection();
            if (!$(this).hasClass("ui-state-disabled")) {
                b.setPage(0)
            }
            a.preventDefault()
        });
        this.prevLink.click(function(a) {
            PrimeFaces.clearSelection();
            if (!$(this).hasClass("ui-state-disabled")) {
                b.setPage(b.cfg.page - 1)
            }
            a.preventDefault()
        });
        this.nextLink.click(function(a) {
            PrimeFaces.clearSelection();
            if (!$(this).hasClass("ui-state-disabled")) {
                b.setPage(b.cfg.page + 1)
            }
            a.preventDefault()
        });
        this.endLink.click(function(a) {
            PrimeFaces.clearSelection();
            if (!$(this).hasClass("ui-state-disabled")) {
                b.setPage(b.cfg.pageCount - 1)
            }
            a.preventDefault()
        })
    },
    bindPageLinkEvents: function() {
        var d = this
          , c = this.pagesContainer.children(".ui-paginator-page");
        c.each(function() {
            var a = $(this)
              , b = parseInt(a.text());
            a.attr("aria-label", d.cfg.ariaPageLabel.replace("{0}", (b)))
        });
        c.on("click.paginator", function(a) {
            var b = $(this)
              , e = parseInt(b.text());
            if (!b.hasClass("ui-state-disabled") && !b.hasClass("ui-state-active")) {
                d.setPage(e - 1)
            }
            a.preventDefault()
        }).on("mouseover.paginator", function() {
            var a = $(this);
            if (!a.hasClass("ui-state-disabled") && !a.hasClass("ui-state-active")) {
                a.addClass("ui-state-hover")
            }
        }).on("mouseout.paginator", function() {
            $(this).removeClass("ui-state-hover")
        }).on("focus.paginator", function() {
            $(this).addClass("ui-state-focus")
        }).on("blur.paginator", function() {
            $(this).removeClass("ui-state-focus")
        }).on("keydown.paginator", function(a) {
            var e = a.which
              , b = $.ui.keyCode;
            if ((e === b.ENTER || e === b.NUMPAD_ENTER)) {
                $(this).trigger("click");
                a.preventDefault()
            }
        })
    },
    updateUI: function() {
        if (this.cfg.page === 0) {
            this.disableElement(this.firstLink);
            this.disableElement(this.prevLink)
        } else {
            this.enableElement(this.firstLink);
            this.enableElement(this.prevLink)
        }
        if (this.cfg.page === (this.cfg.pageCount - 1)) {
            this.disableElement(this.nextLink);
            this.disableElement(this.endLink)
        } else {
            this.enableElement(this.nextLink);
            this.enableElement(this.endLink)
        }
        var f = (this.cfg.rowCount === 0) ? 0 : (this.cfg.page * this.cfg.rows) + 1
          , h = (this.cfg.page * this.cfg.rows) + this.cfg.rows;
        if (h > this.cfg.rowCount) {
            h = this.cfg.rowCount
        }
        var g = this.cfg.currentPageTemplate.replace("{currentPage}", this.cfg.page + 1).replace("{totalPages}", this.cfg.pageCount).replace("{totalRecords}", this.cfg.rowCount).replace("{startRecord}", f).replace("{endRecord}", h);
        this.currentReport.text(g);
        if (this.cfg.prevRows !== this.cfg.rows) {
            this.rppSelect.filter(":not(.ui-state-focus)").children("option").filter("option[value=" + this.cfg.rows + "]").prop("selected", true);
            this.cfg.prevRows = this.cfg.rows
        }
        if (this.jtpSelect.length > 0) {
            this.jtpSelect.children().remove();
            for (var e = 0; e < this.cfg.pageCount; e++) {
                this.jtpSelect.append("<option value=" + e + ">" + (e + 1) + "</option>")
            }
            this.jtpSelect.children("option[value=" + (this.cfg.page) + "]").prop("selected", "selected")
        }
        this.updatePageLinks()
    },
    updatePageLinks: function() {
        var v, u, i, o = $(document.activeElement), t, s;
        if (o.hasClass("ui-paginator-page")) {
            var m = this.pagesContainer.index(o.parent());
            if (m >= 0) {
                t = this.pagesContainer.eq(m);
                s = o.index()
            }
        }
        this.cfg.pageCount = Math.ceil(this.cfg.rowCount / this.cfg.rows) || 1;
        var p = Math.min(this.cfg.pageLinks, this.cfg.pageCount);
        v = Math.max(0, Math.ceil(this.cfg.page - ((p) / 2)));
        u = Math.min(this.cfg.pageCount - 1, v + p - 1);
        i = this.cfg.pageLinks - (u - v + 1);
        v = Math.max(0, v - i);
        this.pagesContainer.children().remove();
        for (var r = v; r <= u; r++) {
            var q = "ui-paginator-page ui-state-default ui-corner-all"
              , n = this.cfg.ariaPageLabel.replace("{0}", (r + 1));
            if (this.cfg.page == r) {
                q += " ui-state-active"
            }
            this.pagesContainer.append('<a class="' + q + '" aria-label="' + n + '" tabindex="0" href="#">' + (r + 1) + "</a>")
        }
        if (t) {
            t.children().eq(s).trigger("focus")
        }
        this.bindPageLinkEvents()
    },
    setPage: function(f, e) {
        if (f >= 0 && f < this.cfg.pageCount && this.cfg.page != f) {
            var d = {
                first: this.cfg.rows * f,
                rows: this.cfg.rows,
                page: f
            };
            if (e) {
                this.cfg.page = f;
                this.updateUI()
            } else {
                this.cfg.paginate.call(this, d)
            }
        }
    },
    setRowsPerPage: function(d) {
        var f = this.cfg.rows * this.cfg.page
          , e = parseInt(f / d);
        this.cfg.rows = d;
        this.cfg.pageCount = Math.ceil(this.cfg.rowCount / this.cfg.rows);
        this.cfg.page = -1;
        this.setPage(e)
    },
    setTotalRecords: function(b) {
        this.cfg.rowCount = b;
        this.cfg.pageCount = Math.ceil(b / this.cfg.rows) || 1;
        this.cfg.page = 0;
        this.updateUI()
    },
    getCurrentPage: function() {
        return this.cfg.page
    },
    getFirst: function() {
        return (this.cfg.rows * this.cfg.page)
    },
    getRows: function() {
        return this.cfg.rows
    },
    getContainerHeight: function(f) {
        var e = 0;
        for (var d = 0; d < this.jq.length; d++) {
            e += this.jq.eq(d).outerHeight(f)
        }
        return e
    },
    disableElement: function(b) {
        b.removeClass("ui-state-hover ui-state-focus ui-state-active").addClass("ui-state-disabled").attr("tabindex", -1);
        b.removeClass("ui-state-hover ui-state-focus ui-state-active").addClass("ui-state-disabled").attr("tabindex", -1)
    },
    enableElement: function(b) {
        b.removeClass("ui-state-disabled").attr("tabindex", 0)
    },
    next: function() {
        this.setPage(this.cfg.page + 1)
    },
    prev: function() {
        this.setPage(this.cfg.page - 1)
    }
});
PrimeFaces.widget.PickList = PrimeFaces.widget.BaseWidget.extend({
    init: function(l) {
        this._super(l);
        this.sourceList = this.jq.find("ul.ui-picklist-source");
        this.targetList = this.jq.find("ul.ui-picklist-target");
        this.sourceInput = $(this.jqId + "_source");
        this.targetInput = $(this.jqId + "_target");
        this.items = this.jq.find(".ui-picklist-item:not(.ui-state-disabled)");
        if (this.cfg.showCheckbox) {
            this.checkboxes = this.items.find("div.ui-chkbox > div.ui-chkbox-box")
        }
        this.focusedItem = null;
        this.ariaRegion = $(this.jqId + "_ariaRegion");
        var g = this.sourceList.prev(".ui-picklist-caption")
          , h = this.targetList.prev(".ui-picklist-caption");
        if (g.length) {
            var i = g.text();
            this.sourceList.attr("aria-label", i);
            this.sourceInput.attr("title", i)
        }
        if (h.length) {
            var i = h.text();
            this.targetList.attr("aria-label", i);
            this.targetInput.attr("title", i)
        }
        this.setTabIndex();
        this.generateItems(this.sourceList, this.sourceInput);
        this.generateItems(this.targetList, this.targetInput);
        if (this.cfg.disabled) {
            $(this.jqId + " li.ui-picklist-item").addClass("ui-state-disabled");
            $(this.jqId + " button").attr("disabled", "disabled").addClass("ui-state-disabled");
            $(this.jqId + " .ui-picklist-filter-container").addClass("ui-state-disabled").children("input").attr("disabled", "disabled")
        } else {
            var j = this
              , k = true;
            $(this.jqId + " ul").sortable({
                cancel: ".ui-state-disabled,.ui-chkbox-box",
                connectWith: this.jqId + " .ui-picklist-list",
                revert: 1,
                update: function(b, a) {
                    j.unselectItem(a.item);
                    j.saveState();
                    if (k) {
                        j.fireReorderEvent();
                        k = false
                    }
                },
                receive: function(b, a) {
                    j.fireTransferEvent(a.item, a.sender, a.item.parents("ul.ui-picklist-list:first"), "dragdrop")
                },
                start: function(b, a) {
                    j.itemListName = j.getListName(a.item);
                    j.dragging = true
                },
                stop: function(b, a) {
                    j.dragging = false
                },
                beforeStop: function(b, a) {
                    if (j.itemListName !== j.getListName(a.item)) {
                        k = false
                    } else {
                        k = true
                    }
                }
            });
            this.bindItemEvents();
            this.bindButtonEvents();
            this.bindFilterEvents();
            this.bindKeyEvents();
            this.updateListRole()
        }
    },
    bindItemEvents: function() {
        var b = this;
        this.items.on("mouseover.pickList", function(d) {
            var a = $(this);
            if (!a.hasClass("ui-state-highlight")) {
                $(this).addClass("ui-state-hover")
            }
        }).on("mouseout.pickList", function(a) {
            $(this).removeClass("ui-state-hover")
        }).on("click.pickList", function(q) {
            if (b.checkboxClick || b.dragging) {
                b.checkboxClick = false;
                return
            }
            var e = $(this)
              , n = e.parent()
              , p = (q.metaKey || q.ctrlKey);
            if (!q.shiftKey) {
                if (!p) {
                    b.unselectAll()
                }
                if (p && e.hasClass("ui-state-highlight")) {
                    b.unselectItem(e, true)
                } else {
                    b.selectItem(e, true);
                    b.cursorItem = e
                }
            } else {
                b.unselectAll();
                if (b.cursorItem && (b.cursorItem.parent().is(e.parent()))) {
                    var o = e.index()
                      , a = b.cursorItem.index()
                      , i = (o > a) ? a : o
                      , r = (o > a) ? (o + 1) : (a + 1);
                    for (var s = i; s < r; s++) {
                        var t = n.children("li.ui-picklist-item").eq(s);
                        if (t.is(":visible")) {
                            if (s === (r - 1)) {
                                b.selectItem(t, true)
                            } else {
                                b.selectItem(t)
                            }
                        }
                    }
                } else {
                    b.selectItem(e, true);
                    b.cursorItem = e
                }
            }
            b.removeOutline();
            b.focusedItem = e;
            n.trigger("focus.pickList")
        }).on("dblclick.pickList", function() {
            var a = $(this);
            if ($(this).parent().hasClass("ui-picklist-source")) {
                b.transfer(a, b.sourceList, b.targetList, "dblclick")
            } else {
                b.transfer(a, b.targetList, b.sourceList, "dblclick")
            }
            b.removeOutline();
            b.focusedItem = null;
            PrimeFaces.clearSelection()
        });
        if (this.cfg.showCheckbox) {
            this.checkboxes.on("mouseover.pickList", function(d) {
                var a = $(this);
                if (!a.hasClass("ui-state-active")) {
                    a.addClass("ui-state-hover")
                }
            }).on("mouseout.pickList", function(a) {
                $(this).removeClass("ui-state-hover")
            }).on("click.pickList", function(d) {
                b.checkboxClick = true;
                var a = $(this).closest("li.ui-picklist-item");
                if (a.hasClass("ui-state-highlight")) {
                    b.unselectItem(a, true)
                } else {
                    b.selectItem(a, true)
                }
                b.focusedItem = a
            })
        }
    },
    bindKeyEvents: function() {
        var c = this
          , d = "ul.ui-picklist-source, ul.ui-picklist-target";
        this.jq.off("focus.pickList blur.pickList keydown.pickList", d).on("focus.pickList", d, null, function(b) {
            var e = $(this)
              , a = c.focusedItem || e.children(".ui-state-highlight:visible:first");
            if (a.length) {
                c.focusedItem = a
            } else {
                c.focusedItem = e.children(".ui-picklist-item:visible:first")
            }
            PrimeFaces.scrollInView(e, c.focusedItem);
            c.focusedItem.addClass("ui-picklist-outline");
            c.ariaRegion.text(c.focusedItem.data("item-label"))
        }).on("blur.pickList", d, null, function() {
            c.removeOutline();
            c.focusedItem = null
        }).on("keydown.pickList", d, null, function(a) {
            if (!c.focusedItem) {
                return
            }
            var e = $(this)
              , b = $.ui.keyCode
              , j = a.which;
            switch (j) {
            case b.UP:
                c.removeOutline();
                if (!c.focusedItem.hasClass("ui-state-highlight")) {
                    c.selectItem(c.focusedItem)
                } else {
                    var k = c.focusedItem.prevAll(".ui-picklist-item:visible:first");
                    if (k.length) {
                        c.unselectAll();
                        c.selectItem(k);
                        c.focusedItem = k;
                        PrimeFaces.scrollInView(e, c.focusedItem)
                    }
                }
                c.ariaRegion.text(c.focusedItem.data("item-label"));
                a.preventDefault();
                break;
            case b.DOWN:
                c.removeOutline();
                if (!c.focusedItem.hasClass("ui-state-highlight")) {
                    c.selectItem(c.focusedItem)
                } else {
                    var l = c.focusedItem.nextAll(".ui-picklist-item:visible:first");
                    if (l.length) {
                        c.unselectAll();
                        c.selectItem(l);
                        c.focusedItem = l;
                        PrimeFaces.scrollInView(e, c.focusedItem)
                    }
                }
                c.ariaRegion.text(c.focusedItem.data("item-label"));
                a.preventDefault();
                break;
            case b.ENTER:
            case b.NUMPAD_ENTER:
            case b.SPACE:
                if (c.focusedItem && c.focusedItem.hasClass("ui-state-highlight")) {
                    c.focusedItem.trigger("dblclick.pickList");
                    c.focusedItem = null
                }
                a.preventDefault();
                break
            }
        })
    },
    removeOutline: function() {
        if (this.focusedItem && this.focusedItem.hasClass("ui-picklist-outline")) {
            this.focusedItem.removeClass("ui-picklist-outline")
        }
    },
    selectItem: function(c, d) {
        c.removeClass("ui-state-hover").addClass("ui-state-highlight");
        if (this.cfg.showCheckbox) {
            this.selectCheckbox(c.find("div.ui-chkbox-box"))
        }
        if (d) {
            this.fireItemSelectEvent(c)
        }
    },
    unselectItem: function(c, d) {
        c.removeClass("ui-state-hover ui-state-highlight");
        if (PrimeFaces.isIE(8)) {
            c.css("filter", "")
        }
        if (this.cfg.showCheckbox) {
            this.unselectCheckbox(c.find("div.ui-chkbox-box"))
        }
        if (d) {
            this.fireItemUnselectEvent(c)
        }
    },
    unselectAll: function() {
        var c = this.items.filter(".ui-state-highlight");
        for (var d = 0; d < c.length; d++) {
            this.unselectItem(c.eq(d))
        }
    },
    selectCheckbox: function(b) {
        b.removeClass("ui-state-hover").addClass("ui-state-active").children("span.ui-chkbox-icon").removeClass("ui-icon-blank").addClass("ui-icon-check")
    },
    unselectCheckbox: function(b) {
        b.removeClass("ui-state-active").children("span.ui-chkbox-icon").addClass("ui-icon-blank").removeClass("ui-icon-check")
    },
    generateItems: function(c, d) {
        c.children(".ui-picklist-item").each(function() {
            var b = $(this)
              , a = PrimeFaces.escapeHTML(b.attr("data-item-value"))
              , g = b.attr("data-item-label")
              , h = (g) ? PrimeFaces.escapeHTML(g) : "";
            d.append('<option value="' + a + '" selected="selected">' + h + "</option>")
        })
    },
    bindButtonEvents: function() {
        var b = this;
        PrimeFaces.skinButton(this.jq.find(".ui-button"));
        $(this.jqId + " .ui-picklist-button-add").click(function() {
            b.add()
        });
        $(this.jqId + " .ui-picklist-button-add-all").click(function() {
            b.addAll()
        });
        $(this.jqId + " .ui-picklist-button-remove").click(function() {
            b.remove()
        });
        $(this.jqId + " .ui-picklist-button-remove-all").click(function() {
            b.removeAll()
        });
        if (this.cfg.showSourceControls) {
            $(this.jqId + " .ui-picklist-source-controls .ui-picklist-button-move-up").click(function() {
                b.moveUp(b.sourceList)
            });
            $(this.jqId + " .ui-picklist-source-controls .ui-picklist-button-move-top").click(function() {
                b.moveTop(b.sourceList)
            });
            $(this.jqId + " .ui-picklist-source-controls .ui-picklist-button-move-down").click(function() {
                b.moveDown(b.sourceList)
            });
            $(this.jqId + " .ui-picklist-source-controls .ui-picklist-button-move-bottom").click(function() {
                b.moveBottom(b.sourceList)
            })
        }
        if (this.cfg.showTargetControls) {
            $(this.jqId + " .ui-picklist-target-controls .ui-picklist-button-move-up").click(function() {
                b.moveUp(b.targetList)
            });
            $(this.jqId + " .ui-picklist-target-controls .ui-picklist-button-move-top").click(function() {
                b.moveTop(b.targetList)
            });
            $(this.jqId + " .ui-picklist-target-controls .ui-picklist-button-move-down").click(function() {
                b.moveDown(b.targetList)
            });
            $(this.jqId + " .ui-picklist-target-controls .ui-picklist-button-move-bottom").click(function() {
                b.moveBottom(b.targetList)
            })
        }
    },
    bindFilterEvents: function() {
        this.setupFilterMatcher();
        this.sourceFilter = $(this.jqId + "_source_filter");
        this.targetFilter = $(this.jqId + "_target_filter");
        var b = this;
        PrimeFaces.skinInput(this.sourceFilter);
        PrimeFaces.skinInput(this.targetFilter);
        this.sourceFilter.on("keyup", function(a) {
            b.filter(this.value, b.sourceList)
        }).on("keydown", this.blockEnterKey);
        this.targetFilter.on("keyup", function(a) {
            b.filter(this.value, b.targetList)
        }).on("keydown", this.blockEnterKey)
    },
    blockEnterKey: function(f) {
        var e = f.which
          , d = $.ui.keyCode;
        if ((e === d.ENTER || e === d.NUMPAD_ENTER)) {
            f.preventDefault()
        }
    },
    setupFilterMatcher: function() {
        this.cfg.filterMatchMode = this.cfg.filterMatchMode || "startsWith";
        this.filterMatchers = {
            startsWith: this.startsWithFilter,
            contains: this.containsFilter,
            endsWith: this.endsWithFilter,
            custom: this.cfg.filterFunction
        };
        this.filterMatcher = this.filterMatchers[this.cfg.filterMatchMode]
    },
    filter: function(l, p) {
        var n = $.trim(l).toLowerCase()
          , o = p.children("li.ui-picklist-item")
          , s = this.isAnimated()
          , m = this;
        if (n === "") {
            o.filter(":hidden").show()
        } else {
            for (var r = 0; r < o.length; r++) {
                var i = o.eq(r)
                  , t = i.attr("data-item-label")
                  , q = this.filterMatcher(t, n);
                if (q) {
                    if (s) {
                        i.fadeIn("fast", function() {
                            m.updateListRole()
                        })
                    } else {
                        i.show();
                        this.updateListRole()
                    }
                } else {
                    if (s) {
                        i.fadeOut("fast", function() {
                            m.updateListRole()
                        })
                    } else {
                        i.hide();
                        this.updateListRole()
                    }
                }
            }
        }
    },
    startsWithFilter: function(c, d) {
        return c.toLowerCase().indexOf(d) === 0
    },
    containsFilter: function(c, d) {
        return c.toLowerCase().indexOf(d) !== -1
    },
    endsWithFilter: function(c, d) {
        return c.indexOf(d, c.length - d.length) !== -1
    },
    add: function() {
        var b = this.sourceList.children("li.ui-picklist-item.ui-state-highlight");
        this.transfer(b, this.sourceList, this.targetList, "command")
    },
    addAll: function() {
        var b = this.sourceList.children("li.ui-picklist-item:visible:not(.ui-state-disabled)");
        this.transfer(b, this.sourceList, this.targetList, "command")
    },
    remove: function() {
        var b = this.targetList.children("li.ui-picklist-item.ui-state-highlight");
        this.transfer(b, this.targetList, this.sourceList, "command")
    },
    removeAll: function() {
        var b = this.targetList.children("li.ui-picklist-item:visible:not(.ui-state-disabled)");
        this.transfer(b, this.targetList, this.sourceList, "command")
    },
    moveUp: function(i) {
        var g = this
          , j = g.isAnimated()
          , l = i.children(".ui-state-highlight")
          , h = l.length
          , k = 0;
        if (h) {
            l.each(function() {
                var a = $(this);
                if (!a.is(":first-child")) {
                    if (j) {
                        a.hide(g.cfg.effect, {}, g.cfg.effectSpeed, function() {
                            a.insertBefore(a.prev()).show(g.cfg.effect, {}, g.cfg.effectSpeed, function() {
                                k++;
                                if (k === h) {
                                    g.saveState();
                                    g.fireReorderEvent()
                                }
                            })
                        })
                    } else {
                        a.hide().insertBefore(a.prev()).show()
                    }
                }
            });
            if (!j) {
                this.saveState();
                this.fireReorderEvent()
            }
        }
    },
    moveTop: function(i) {
        var g = this
          , j = g.isAnimated()
          , l = i.children(".ui-state-highlight")
          , h = l.length
          , k = 0;
        if (h) {
            l.each(function() {
                var a = $(this);
                if (!a.is(":first-child")) {
                    if (j) {
                        a.hide(g.cfg.effect, {}, g.cfg.effectSpeed, function() {
                            a.prependTo(a.parent()).show(g.cfg.effect, {}, g.cfg.effectSpeed, function() {
                                k++;
                                if (k === h) {
                                    g.saveState();
                                    g.fireReorderEvent()
                                }
                            })
                        })
                    } else {
                        a.hide().prependTo(a.parent()).show()
                    }
                }
            });
            if (!j) {
                this.saveState();
                this.fireReorderEvent()
            }
        }
    },
    moveDown: function(i) {
        var g = this
          , j = g.isAnimated()
          , l = i.children(".ui-state-highlight")
          , h = l.length
          , k = 0;
        if (h) {
            $(l.get().reverse()).each(function() {
                var a = $(this);
                if (!a.is(":last-child")) {
                    if (j) {
                        a.hide(g.cfg.effect, {}, g.cfg.effectSpeed, function() {
                            a.insertAfter(a.next()).show(g.cfg.effect, {}, g.cfg.effectSpeed, function() {
                                k++;
                                if (k === h) {
                                    g.saveState();
                                    g.fireReorderEvent()
                                }
                            })
                        })
                    } else {
                        a.hide().insertAfter(a.next()).show()
                    }
                }
            });
            if (!j) {
                this.saveState();
                this.fireReorderEvent()
            }
        }
    },
    moveBottom: function(i) {
        var g = this
          , j = g.isAnimated()
          , l = i.children(".ui-state-highlight")
          , h = l.length
          , k = 0;
        if (h) {
            l.each(function() {
                var a = $(this);
                if (!a.is(":last-child")) {
                    if (j) {
                        a.hide(g.cfg.effect, {}, g.cfg.effectSpeed, function() {
                            a.appendTo(a.parent()).show(g.cfg.effect, {}, g.cfg.effectSpeed, function() {
                                k++;
                                if (k === h) {
                                    g.saveState();
                                    g.fireReorderEvent()
                                }
                            })
                        })
                    } else {
                        a.hide().appendTo(a.parent()).show()
                    }
                }
            });
            if (!j) {
                this.saveState();
                this.fireReorderEvent()
            }
        }
    },
    saveState: function() {
        this.sourceInput.children().remove();
        this.targetInput.children().remove();
        this.generateItems(this.sourceList, this.sourceInput);
        this.generateItems(this.targetList, this.targetInput);
        this.cursorItem = null
    },
    transfer: function(h, j, k, m) {
        var l = this
          , i = h.length
          , n = 0;
        if (this.isAnimated()) {
            h.hide(this.cfg.effect, {}, this.cfg.effectSpeed, function() {
                var a = $(this);
                l.unselectItem(a);
                a.appendTo(k).show(l.cfg.effect, {}, l.cfg.effectSpeed, function() {
                    n++;
                    if (n == i) {
                        l.saveState();
                        l.fireTransferEvent(h, j, k, m)
                    }
                    l.updateListRole()
                })
            })
        } else {
            h.hide();
            if (this.cfg.showCheckbox) {
                h.each(function() {
                    l.unselectItem($(this))
                })
            }
            h.appendTo(k).show();
            this.saveState();
            this.fireTransferEvent(h, j, k, m);
            this.updateListRole()
        }
    },
    fireTransferEvent: function(n, l, k, m) {
        if (this.cfg.onTransfer) {
            var p = {};
            p.items = n;
            p.from = l;
            p.to = k;
            p.type = m;
            this.cfg.onTransfer.call(this, p)
        }
        if (this.cfg.behaviors) {
            var r = this.cfg.behaviors.transfer;
            if (r) {
                var q = {
                    params: []
                }
                  , o = this.id + "_transferred"
                  , j = l.hasClass("ui-picklist-source");
                n.each(function(b, a) {
                    q.params.push({
                        name: o,
                        value: $(a).attr("data-item-value")
                    })
                });
                q.params.push({
                    name: this.id + "_add",
                    value: j
                });
                r.call(this, q)
            }
        }
    },
    getListName: function(b) {
        return b.parent().hasClass("ui-picklist-source") ? "source" : "target"
    },
    hasBehavior: function(b) {
        if (this.cfg.behaviors) {
            return this.cfg.behaviors[b] != undefined
        }
        return false
    },
    fireItemSelectEvent: function(d) {
        if (this.hasBehavior("select")) {
            var f = this.cfg.behaviors.select
              , e = {
                params: [{
                    name: this.id + "_itemIndex",
                    value: d.index()
                }, {
                    name: this.id + "_listName",
                    value: this.getListName(d)
                }]
            };
            f.call(this, e)
        }
    },
    fireItemUnselectEvent: function(f) {
        if (this.hasBehavior("unselect")) {
            var e = this.cfg.behaviors.unselect
              , d = {
                params: [{
                    name: this.id + "_itemIndex",
                    value: f.index()
                }, {
                    name: this.id + "_listName",
                    value: this.getListName(f)
                }]
            };
            e.call(this, d)
        }
    },
    fireReorderEvent: function() {
        if (this.hasBehavior("reorder")) {
            this.cfg.behaviors.reorder.call(this)
        }
    },
    isAnimated: function() {
        return (this.cfg.effect && this.cfg.effect != "none")
    },
    setTabIndex: function() {
        var b = (this.cfg.disabled) ? "-1" : (this.cfg.tabindex || "0");
        this.sourceList.attr("tabindex", b);
        this.targetList.attr("tabindex", b);
        $(this.jqId + " button").attr("tabindex", b);
        $(this.jqId + " .ui-picklist-filter-container > input").attr("tabindex", b)
    },
    updateListRole: function() {
        this.sourceList.children("li:visible").length > 0 ? this.sourceList.attr("role", "menu") : this.sourceList.removeAttr("role");
        this.targetList.children("li:visible").length > 0 ? this.targetList.attr("role", "menu") : this.targetList.removeAttr("role")
    }
});
PrimeFaces.widget.ProgressBar = PrimeFaces.widget.BaseWidget.extend({
    init: function(b) {
        this._super(b);
        this.jqValue = this.jq.children(".ui-progressbar-value");
        this.jqLabel = this.jq.children(".ui-progressbar-label");
        this.value = this.cfg.initialValue;
        this.cfg.global = (this.cfg.global === false) ? false : true;
        if (this.cfg.ajax) {
            this.cfg.formId = this.jq.closest("form").attr("id")
        }
        this.enableARIA()
    },
    setValue: function(c) {
        if (c >= 0 && c <= 100) {
            if (c == 0) {
                this.jqValue.hide().css("width", "0%").removeClass("ui-corner-right");
                this.jqLabel.hide()
            } else {
                this.jqValue.show().animate({
                    width: c + "%"
                }, 500, "easeInOutCirc");
                if (this.cfg.labelTemplate) {
                    var d = this.cfg.labelTemplate.replace(/{value}/gi, c);
                    this.jqLabel.html(d).show()
                }
            }
            this.value = c;
            this.jq.attr("aria-valuenow", c)
        }
    },
    getValue: function() {
        return this.value
    },
    start: function() {
        var b = this;
        if (this.cfg.ajax) {
            this.progressPoll = setInterval(function() {
                var a = {
                    source: b.id,
                    process: b.id,
                    formId: b.cfg.formId,
                    global: b.cfg.global,
                    async: true,
                    oncomplete: function(g, j, i) {
                        var h = i[b.id + "_value"];
                        b.setValue(h);
                        if (h === 100) {
                            b.fireCompleteEvent()
                        }
                    }
                };
                PrimeFaces.ajax.AjaxRequest(a)
            }, this.cfg.interval)
        }
    },
    fireCompleteEvent: function() {
        clearInterval(this.progressPoll);
        if (this.cfg.behaviors) {
            var b = this.cfg.behaviors.complete;
            if (b) {
                b.call(this)
            }
        }
    },
    cancel: function() {
        clearInterval(this.progressPoll);
        this.setValue(0)
    },
    enableARIA: function() {
        this.jq.attr("role", "progressbar").attr("aria-valuemin", 0).attr("aria-valuenow", this.value).attr("aria-valuemax", 100)
    }
});
PrimeFaces.widget.Rating = PrimeFaces.widget.BaseWidget.extend({
    init: function(b) {
        this._super(b);
        this.jqInput = $(this.jqId + "_input");
        this.value = this.getValue();
        this.stars = this.jq.children(".ui-rating-star");
        this.cancel = this.jq.children(".ui-rating-cancel");
        if (!this.cfg.disabled && !this.cfg.readonly) {
            this.bindEvents()
        }
        if (this.cfg.readonly) {
            this.jq.children().css("cursor", "default")
        }
    },
    bindEvents: function() {
        var b = this;
        this.stars.click(function() {
            var a = b.stars.index(this) + 1;
            b.setValue(a)
        });
        this.cancel.hover(function() {
            $(this).toggleClass("ui-rating-cancel-hover")
        }).click(function() {
            b.reset()
        })
    },
    unbindEvents: function() {
        this.stars.unbind("click");
        this.cancel.unbind("hover click")
    },
    getValue: function() {
        var b = this.jqInput.val();
        return b == "" ? null : parseInt(b)
    },
    setValue: function(f) {
        this.jqInput.val(f);
        this.stars.removeClass("ui-rating-star-on");
        for (var d = 0; d < f; d++) {
            this.stars.eq(d).addClass("ui-rating-star-on")
        }
        if (this.cfg.onRate) {
            this.cfg.onRate.call(this, f)
        }
        if (this.cfg.behaviors) {
            var e = this.cfg.behaviors.rate;
            if (e) {
                e.call(this)
            }
        }
    },
    enable: function() {
        this.cfg.disabled = false;
        this.bindEvents();
        this.jq.removeClass("ui-state-disabled")
    },
    disable: function() {
        this.cfg.disabled = true;
        this.unbindEvents();
        this.jq.addClass("ui-state-disabled")
    },
    reset: function() {
        this.jqInput.val("");
        this.stars.filter(".ui-rating-star-on").removeClass("ui-rating-star-on");
        if (this.cfg.behaviors) {
            var b = this.cfg.behaviors.cancel;
            if (b) {
                b.call(this)
            }
        }
    }
});
PrimeFaces.widget.Resizable = PrimeFaces.widget.BaseWidget.extend({
    init: function(c) {
        this.cfg = c;
        this.id = this.cfg.id;
        this.jqId = PrimeFaces.escapeClientId(this.id);
        this.jqTarget = $(PrimeFaces.escapeClientId(this.cfg.target));
        if (this.cfg.ajaxResize) {
            this.cfg.formId = $(this.target).parents("form:first").attr("id")
        }
        if (this.cfg.isContainment) {
            this.cfg.containment = PrimeFaces.escapeClientId(this.cfg.parentComponentId)
        }
        var d = this;
        this.cfg.stop = function(b, a) {
            if (d.cfg.onStop) {
                d.cfg.onStop.call(d, b, a)
            }
            d.fireAjaxResizeEvent(b, a)
        }
        ;
        this.cfg.start = function(b, a) {
            if (d.cfg.onStart) {
                d.cfg.onStart.call(d, b, a)
            }
        }
        ;
        this.cfg.resize = function(b, a) {
            if (d.cfg.onResize) {
                d.cfg.onResize.call(d, b, a)
            }
        }
        ;
        this.jqTarget.resizable(this.cfg);
        this.removeScriptElement(this.id)
    },
    fireAjaxResizeEvent: function(h, g) {
        if (this.cfg.behaviors) {
            var f = this.cfg.behaviors.resize;
            if (f) {
                var e = {
                    params: [{
                        name: this.id + "_width",
                        value: parseInt(g.helper.width())
                    }, {
                        name: this.id + "_height",
                        value: parseInt(g.helper.height())
                    }]
                };
                f.call(this, e)
            }
        }
    }
});
PrimeFaces.widget.Slider = PrimeFaces.widget.BaseWidget.extend({
    init: function(c) {
        this._super(c);
        this.cfg.displayTemplate = this.cfg.displayTemplate || (this.cfg.range ? "{min} - {max}" : "{value}");
        if (this.cfg.range) {
            var d = this.cfg.input.split(",");
            this.input = $(PrimeFaces.escapeClientId(d[0]) + "," + PrimeFaces.escapeClientId(d[1]))
        } else {
            this.input = $(PrimeFaces.escapeClientId(this.cfg.input))
        }
        if (this.cfg.display) {
            this.output = $(PrimeFaces.escapeClientId(this.cfg.display))
        }
        this.jq.slider(this.cfg);
        this.bindEvents()
    },
    bindEvents: function() {
        var b = this;
        this.jq.bind("slide", function(a, d) {
            b.onSlide(a, d)
        });
        if (this.cfg.onSlideStart) {
            this.jq.bind("slidestart", function(a, d) {
                b.cfg.onSlideStart.call(this, a, d)
            })
        }
        this.jq.bind("slidestop", function(a, d) {
            b.onSlideEnd(a, d)
        });
        this.input.on("keydown.slider", function(h) {
            var i = $.ui.keyCode
              , j = h.which;
            switch (j) {
            case i.UP:
            case i.DOWN:
            case i.LEFT:
            case i.RIGHT:
            case i.BACKSPACE:
            case i.DELETE:
            case i.END:
            case i.HOME:
            case i.TAB:
                break;
            default:
                var e = h.metaKey || h.ctrlKey
                  , a = (j >= 48 && j <= 57) || (j >= 96 && j <= 105);
                if (h.altKey || (h.shiftKey && !(j === i.UP || j === i.DOWN || j === i.LEFT || j === i.RIGHT))) {
                    h.preventDefault()
                }
                if (!a && !e) {
                    h.preventDefault()
                }
                break
            }
        }).on("keyup.slider", function(a) {
            b.setValue(b.input.val())
        })
    },
    onSlide: function(d, c) {
        if (this.cfg.onSlide) {
            this.cfg.onSlide.call(this, d, c)
        }
        if (this.cfg.range) {
            this.input.eq(0).val(c.values[0]);
            this.input.eq(1).val(c.values[1]);
            if (this.output) {
                this.output.html(this.cfg.displayTemplate.replace("{min}", c.values[0]).replace("{max}", c.values[1]))
            }
        } else {
            this.input.val(c.value);
            if (this.output) {
                this.output.html(this.cfg.displayTemplate.replace("{value}", c.value))
            }
        }
    },
    onSlideEnd: function(h, g) {
        if (this.cfg.onSlideEnd) {
            this.cfg.onSlideEnd.call(this, h, g)
        }
        if (this.cfg.behaviors) {
            var f = this.cfg.behaviors.slideEnd;
            if (f) {
                var e = {
                    params: [{
                        name: this.id + "_slideValue",
                        value: g.value
                    }]
                };
                f.call(this, e)
            }
        }
    },
    getValue: function() {
        return this.jq.slider("value")
    },
    setValue: function(b) {
        this.jq.slider("value", b)
    },
    getValues: function() {
        return this.jq.slider("values")
    },
    setValues: function(b) {
        this.jq.slider("values", b)
    },
    enable: function() {
        this.jq.slider("enable")
    },
    disable: function() {
        this.jq.slider("disable")
    }
});
PrimeFaces.widget.Spinner = PrimeFaces.widget.BaseWidget.extend({
    init: function(d) {
        this._super(d);
        this.input = this.jq.children(".ui-spinner-input");
        this.upButton = this.jq.children("a.ui-spinner-up");
        this.downButton = this.jq.children("a.ui-spinner-down");
        this.cfg.step = this.cfg.step || 1;
        this.cursorOffset = this.cfg.prefix ? this.cfg.prefix.length : 0;
        if (parseInt(this.cfg.step) === 0) {
            this.cfg.precision = this.cfg.step.toString().split(/[,]|[.]/)[1].length
        }
        var c = this.input.attr("maxlength");
        if (c) {
            this.cfg.maxlength = parseInt(c)
        }
        this.updateValue();
        this.addARIA();
        if (this.input.prop("disabled") || this.input.prop("readonly")) {
            return
        }
        this.bindEvents();
        this.input.data(PrimeFaces.CLIENT_ID_DATA, this.id);
        PrimeFaces.skinInput(this.input)
    },
    bindEvents: function() {
        var b = this;
        this.jq.children(".ui-spinner-button").on("mouseover.spinner", function() {
            $(this).addClass("ui-state-hover")
        }).on("mouseout.spinner", function() {
            $(this).removeClass("ui-state-hover ui-state-active");
            if (b.timer) {
                clearInterval(b.timer)
            }
        }).on("mouseup.spinner", function() {
            clearInterval(b.timer);
            $(this).removeClass("ui-state-active").addClass("ui-state-hover");
            b.input.trigger("change")
        }).on("mousedown.spinner", function(e) {
            var f = $(this)
              , a = f.hasClass("ui-spinner-up") ? 1 : -1;
            f.removeClass("ui-state-hover").addClass("ui-state-active");
            if (b.input.is(":not(:focus)")) {
                b.input.focus()
            }
            b.repeat(null, a);
            e.preventDefault()
        });
        this.input.on("keydown.spinner", function(d) {
            var a = $.ui.keyCode;
            switch (d.which) {
            case a.UP:
                b.spin(1);
                break;
            case a.DOWN:
                b.spin(-1);
                break;
            case a.ENTER:
            case a.NUMPAD_ENTER:
                b.updateValue();
                b.format();
                break;
            default:
                break
            }
        }).on("keyup.spinner", function(d) {
            b.updateValue();
            var a = $.ui.keyCode;
            if (d.which === a.UP || d.which === a.DOWN) {
                b.input.trigger("change")
            }
        }).on("blur.spinner", function(a) {
            b.format()
        }).on("mousewheel.spinner", function(a, d) {
            if (b.input.is(":focus")) {
                if (d > 0) {
                    b.spin(1)
                } else {
                    b.spin(-1)
                }
                return false
            }
        })
    },
    repeat: function(f, e) {
        var g = this
          , h = f || 500;
        clearTimeout(this.timer);
        this.timer = setTimeout(function() {
            g.repeat(40, e)
        }, h);
        this.spin(e)
    },
    toFixed: function(f, e) {
        var d = Math.pow(10, e || 0);
        return String(Math.round(f * d) / d)
    },
    spin: function(f) {
        var h = this.cfg.step * f
          , e = this.value ? this.value : 0
          , g = null;
        if (this.cfg.precision) {
            g = parseFloat(this.toFixed(e + h, this.cfg.precision))
        } else {
            g = parseInt(e + h)
        }
        if (this.cfg.maxlength !== undefined && g.toString().length > this.cfg.maxlength) {
            g = e
        }
        if (this.cfg.min !== undefined && g < this.cfg.min) {
            g = this.cfg.min
        }
        if (this.cfg.max !== undefined && g > this.cfg.max) {
            g = this.cfg.max
        }
        this.value = g;
        this.format();
        this.input.attr("aria-valuenow", g)
    },
    updateValue: function() {
        var b = this.input.val();
        if ($.trim(b) === "") {
            if (this.cfg.min !== undefined) {
                this.value = this.cfg.min
            } else {
                this.value = null
            }
        } else {
            if (this.cfg.prefix && b.indexOf(this.cfg.prefix) === 0) {
                b = b.substring(this.cfg.prefix.length, b.length)
            } else {
                if (this.cfg.suffix && b.indexOf(this.cfg.suffix) === (b.length - this.cfg.suffix.length)) {
                    b = b.substring(0, b.length - this.cfg.suffix.length)
                }
            }
            if (this.cfg.precision) {
                b = parseFloat(b)
            } else {
                b = parseInt(b)
            }
            if (!isNaN(b)) {
                if (this.cfg.max !== undefined && b > this.cfg.max) {
                    b = this.cfg.max
                }
                if (this.cfg.min !== undefined && b < this.cfg.min) {
                    b = this.cfg.min
                }
                this.value = b
            }
        }
    },
    format: function() {
        if (this.value !== null) {
            var b = this.value;
            if (this.cfg.prefix) {
                b = this.cfg.prefix + b
            }
            if (this.cfg.suffix) {
                b = b + this.cfg.suffix
            }
            this.input.val(b)
        }
    },
    addARIA: function() {
        this.input.attr("role", "spinner");
        this.input.attr("aria-multiline", false);
        this.input.attr("aria-valuenow", this.value);
        if (this.cfg.min !== undefined) {
            this.input.attr("aria-valuemin", this.cfg.min)
        }
        if (this.cfg.max !== undefined) {
            this.input.attr("aria-valuemax", this.cfg.max)
        }
        if (this.input.prop("disabled")) {
            this.input.attr("aria-disabled", true)
        }
        if (this.input.prop("readonly")) {
            this.input.attr("aria-readonly", true)
        }
    }
});
PrimeFaces.widget.Spotlight = PrimeFaces.widget.BaseWidget.extend({
    init: function(b) {
        this._super(b);
        this.target = PrimeFaces.expressions.SearchExpressionFacade.resolveComponentsAsSelector(this.cfg.target);
        this.eventsToBlock = "focus." + this.id + " mousedown." + this.id + " mouseup." + this.id;
        if (!$(document.body).children(".ui-spotlight").length) {
            this.createMasks()
        }
        if (this.cfg.active) {
            this.show()
        }
    },
    createMasks: function() {
        var b = $(document.body);
        b.append('<div class="ui-widget-overlay ui-spotlight ui-spotlight-top ui-helper-hidden"></div><div class="ui-widget-overlay ui-spotlight ui-spotlight-bottom ui-helper-hidden"></div><div class="ui-widget-overlay ui-spotlight ui-spotlight-left ui-helper-hidden"></div><div class="ui-widget-overlay ui-spotlight ui-spotlight-right ui-helper-hidden"></div>')
    },
    show: function() {
        this.calculatePositions();
        $(document.body).children("div.ui-spotlight").show();
        this.bindEvents()
    },
    calculatePositions: function() {
        var j = $(document)
          , f = $(document.body)
          , h = this.target.offset();
        f.children("div.ui-spotlight-top").css({
            left: 0,
            top: 0,
            width: f.width(),
            height: h.top
        });
        var i = h.top + this.target.outerHeight();
        f.children("div.ui-spotlight-bottom").css({
            left: 0,
            top: i,
            width: f.width(),
            height: j.height() - i
        });
        f.children("div.ui-spotlight-left").css({
            left: 0,
            top: h.top,
            width: h.left,
            height: this.target.outerHeight()
        });
        var g = h.left + this.target.outerWidth();
        f.children("div.ui-spotlight-right").css({
            left: g,
            top: h.top,
            width: f.width() - g,
            height: this.target.outerHeight()
        })
    },
    bindEvents: function() {
        var b = this;
        this.target.data("zindex", this.target.zIndex()).css("z-index", ++PrimeFaces.zindex);
        $(document).on("keydown." + this.id, function(i) {
            var h = $(i.target);
            if (i.keyCode === $.ui.keyCode.TAB) {
                var j = b.target.find(":tabbable");
                if (j.length) {
                    var g = j.filter(":first")
                      , a = j.filter(":last");
                    if (h.is(document.body)) {
                        g.focus(1);
                        i.preventDefault()
                    } else {
                        if (i.target === a[0] && !i.shiftKey) {
                            g.focus(1);
                            i.preventDefault()
                        } else {
                            if (i.target === g[0] && i.shiftKey) {
                                a.focus(1);
                                i.preventDefault()
                            }
                        }
                    }
                }
            } else {
                if (!h.is(document.body) && (h.zIndex() < b.target.zIndex())) {
                    i.preventDefault()
                }
            }
        }).on(this.eventsToBlock, function(a) {
            if ($(a.target).zIndex() < b.target.zIndex()) {
                a.preventDefault()
            }
        });
        $(window).on("resize.spotlight", function() {
            b.calculatePositions()
        })
    },
    unbindEvents: function() {
        $(document).off(this.eventsToBlock).off("keydown." + this.id);
        $(window).off("resize.spotlight")
    },
    hide: function() {
        $(document.body).children(".ui-spotlight").hide();
        this.unbindEvents();
        this.target.css("z-index", this.target.zIndex())
    }
});
PrimeFaces.widget.Sticky = PrimeFaces.widget.BaseWidget.extend({
    init: function(b) {
        this.cfg = b;
        this.id = this.cfg.id;
        this.target = $(PrimeFaces.escapeClientId(this.cfg.target));
        this.cfg.margin = this.cfg.margin || 0;
        this.initialState = {
            top: this.target.offset().top,
            height: this.target.height()
        };
        this.bindEvents()
    },
    refresh: function(b) {
        this.target = $(PrimeFaces.escapeClientId(this.cfg.target));
        if (this.fixed) {
            this.ghost.remove();
            this.fix(true)
        }
    },
    bindEvents: function() {
        var g = this
          , h = $(window)
          , e = "scroll." + this.cfg.id
          , f = "resize." + this.cfg.id;
        h.off(e).on(e, function() {
            if (h.scrollTop() > g.initialState.top) {
                g.fix()
            } else {
                g.restore()
            }
        }).off(f).on(f, function() {
            if (g.fixed) {
                g.target.width(g.ghost.outerWidth() - (g.target.outerWidth() - g.target.width()))
            }
        })
    },
    fix: function(b) {
        if (!this.fixed || b) {
            this.target.css({
                position: "fixed",
                top: this.cfg.margin,
                "z-index": ++PrimeFaces.zindex
            }).addClass("ui-shadow ui-sticky");
            this.ghost = $('<div class="ui-sticky-ghost"></div>').height(this.initialState.height).insertBefore(this.target);
            this.target.width(this.ghost.outerWidth() - (this.target.outerWidth() - this.target.width()));
            this.fixed = true
        }
    },
    restore: function() {
        if (this.fixed) {
            this.target.css({
                position: "static",
                top: "auto",
                width: "auto"
            }).removeClass("ui-shadow ui-sticky");
            this.ghost.remove();
            this.fixed = false
        }
    }
});
PrimeFaces.widget.TabView = PrimeFaces.widget.DeferredWidget.extend({
    init: function(b) {
        this._super(b);
        this.panelContainer = this.jq.children(".ui-tabs-panels");
        this.stateHolder = $(this.jqId + "_activeIndex");
        this.cfg.selected = parseInt(this.stateHolder.val());
        this.focusedTabHeader = null;
        this.tabindex = this.cfg.tabindex || 0;
        if (this.cfg.scrollable) {
            this.navscroller = this.jq.children(".ui-tabs-navscroller");
            this.navcrollerLeft = this.navscroller.children(".ui-tabs-navscroller-btn-left");
            this.navcrollerRight = this.navscroller.children(".ui-tabs-navscroller-btn-right");
            this.navContainer = this.navscroller.children(".ui-tabs-nav");
            this.firstTab = this.navContainer.children(":first-child");
            this.lastTab = this.navContainer.children(":last-child");
            this.scrollStateHolder = $(this.jqId + "_scrollState")
        } else {
            this.navContainer = this.jq.children(".ui-tabs-nav")
        }
        this.bindEvents();
        if (this.cfg.dynamic && this.cfg.cache) {
            this.markAsLoaded(this.panelContainer.children().eq(this.cfg.selected))
        }
        this.renderDeferred()
    },
    renderDeferred: function() {
        if (this.jq.is(":visible")) {
            this._render()
        } else {
            var d = this.jq.parent().closest(".ui-hidden-container")
              , c = this;
            if (d.length) {
                this.addDeferredRender(this.id, d, function() {
                    return c.render()
                })
            }
        }
    },
    _render: function() {
        if (this.cfg.scrollable) {
            this.initScrolling()
        }
    },
    bindEvents: function() {
        var b = this;
        this.navContainer.children("li").on("mouseover.tabview", function(d) {
            var a = $(this);
            if (!a.hasClass("ui-state-disabled")) {
                a.addClass("ui-state-hover")
            }
        }).on("mouseout.tabview", function(d) {
            var a = $(this);
            if (!a.hasClass("ui-state-disabled")) {
                a.removeClass("ui-state-hover")
            }
        }).on("click.tabview", function(e) {
            var f = $(this);
            if ($(e.target).is(":not(.ui-icon-close)")) {
                var a = f.index();
                if (!f.hasClass("ui-state-disabled") && a !== b.cfg.selected) {
                    b.select(a)
                }
            }
            e.preventDefault()
        });
        this.navContainer.find("li .ui-icon-close").on("click.tabview", function(e) {
            var a = $(this).parent().index();
            if (b.cfg.onTabClose) {
                var f = b.cfg.onTabClose.call(b, a);
                if (f !== false) {
                    b.remove(a)
                }
            } else {
                b.remove(a)
            }
            e.preventDefault()
        });
        if (this.cfg.scrollable) {
            this.navscroller.children(".ui-tabs-navscroller-btn").on("mouseover.tabview", function() {
                var a = $(this);
                if (!a.hasClass("ui-state-disabled")) {
                    $(this).addClass("ui-state-hover")
                }
            }).on("mouseout.tabview", function() {
                var a = $(this);
                if (!a.hasClass("ui-state-disabled")) {
                    $(this).removeClass("ui-state-hover ui-state-active")
                }
            }).on("mousedown.tabview", function() {
                var a = $(this);
                if (!a.hasClass("ui-state-disabled")) {
                    $(this).removeClass("ui-state-hover").addClass("ui-state-active")
                }
            }).on("mouseup.tabview", function() {
                var a = $(this);
                if (!a.hasClass("ui-state-disabled")) {
                    $(this).addClass("ui-state-hover").removeClass("ui-state-active")
                }
            }).on("focus.tabview", function() {
                $(this).addClass("ui-state-focus")
            }).on("blur.tabview", function() {
                $(this).removeClass("ui-state-focus")
            });
            this.navcrollerLeft.on("click.tabview", function(a) {
                b.scroll(100);
                a.preventDefault()
            });
            this.navcrollerRight.on("click.tabview", function(a) {
                b.scroll(-100);
                a.preventDefault()
            })
        }
        this.bindKeyEvents()
    },
    bindKeyEvents: function() {
        var c = this
          , d = this.navContainer.children("li");
        d.attr("tabindex", this.tabindex);
        d.on("focus.tabview", function(a) {
            var b = $(this);
            b.addClass("ui-tabs-outline");
            if (c.cfg.scrollable) {
                if (b.position().left + b.width() > c.navcrollerRight.position().left) {
                    c.navcrollerRight.trigger("click.tabview")
                } else {
                    if (b.position().left < c.navcrollerLeft.position().left) {
                        c.navcrollerLeft.trigger("click.tabview")
                    }
                }
            }
        }).on("blur.tabview", function() {
            $(this).removeClass("ui-tabs-outline")
        }).on("keydown.tabview", function(a) {
            var b = $.ui.keyCode
              , e = a.which;
            if (e === b.SPACE || e === b.ENTER || e === b.NUMPAD_ENTER) {
                c.select($(this).index());
                a.preventDefault()
            }
        });
        if (this.cfg.scrollable) {
            this.navcrollerLeft.on("keydown.tabview", function(a) {
                var b = $.ui.keyCode
                  , e = a.which;
                if (e === b.SPACE || e === b.ENTER || e === b.NUMPAD_ENTER) {
                    c.scroll(100);
                    a.preventDefault()
                }
            });
            this.navcrollerRight.on("keydown.tabview", function(a) {
                var b = $.ui.keyCode
                  , e = a.which;
                if (e === b.SPACE || e === b.ENTER || e === b.NUMPAD_ENTER) {
                    c.scroll(-100);
                    a.preventDefault()
                }
            })
        }
    },
    initScrolling: function() {
        if (this.panelContainer.children().length) {
            var b = ((this.lastTab.position().left + this.lastTab.width()) - this.firstTab.position().left) > this.navscroller.innerWidth();
            if (b) {
                this.navscroller.css("padding-left", "18px");
                this.navcrollerLeft.attr("tabindex", this.tabindex).show();
                this.navcrollerRight.attr("tabindex", this.tabindex).show();
                this.restoreScrollState()
            }
        }
    },
    scroll: function(l) {
        if (this.navContainer.is(":animated")) {
            return
        }
        var i = parseInt(this.navContainer.css("margin-left"))
          , g = i + l
          , h = this.navscroller.innerWidth()
          , k = this;
        if (l < 0) {
            var j = this.lastTab.position().left + parseInt(this.lastTab.innerWidth());
            if (j > h) {
                this.navContainer.animate({
                    "margin-left": g + "px"
                }, "fast", "easeInOutCirc", function() {
                    k.saveScrollState(g);
                    if ((j + l) < h) {
                        k.disableScrollerButton(k.navcrollerRight)
                    }
                    if (k.navcrollerLeft.hasClass("ui-state-disabled")) {
                        k.enableScrollerButton(k.navcrollerLeft)
                    }
                })
            }
        } else {
            if (g <= 0) {
                this.navContainer.animate({
                    "margin-left": g + "px"
                }, "fast", "easeInOutCirc", function() {
                    k.saveScrollState(g);
                    if (g === 0) {
                        k.disableScrollerButton(k.navcrollerLeft)
                    }
                    if (k.navcrollerRight.hasClass("ui-state-disabled")) {
                        k.enableScrollerButton(k.navcrollerRight)
                    }
                })
            }
        }
    },
    disableScrollerButton: function(b) {
        b.addClass("ui-state-disabled").removeClass("ui-state-hover ui-state-active ui-state-focus").attr("tabindex", -1)
    },
    enableScrollerButton: function(b) {
        b.removeClass("ui-state-disabled").attr("tabindex", this.tabindex)
    },
    saveScrollState: function(b) {
        this.scrollStateHolder.val(b)
    },
    restoreScrollState: function() {
        var b = parseInt(this.scrollStateHolder.val());
        if (b === 0) {
            this.disableScrollerButton(this.navcrollerLeft)
        }
        this.navContainer.css("margin-left", this.scrollStateHolder.val() + "px")
    },
    select: function(i, j) {
        if (this.cfg.onTabChange && !j) {
            var g = this.cfg.onTabChange.call(this, i);
            if (g === false) {
                return false
            }
        }
        var f = this.panelContainer.children().eq(i)
          , h = this.cfg.dynamic && !this.isLoaded(f);
        this.stateHolder.val(i);
        this.cfg.selected = i;
        if (h) {
            this.loadDynamicTab(f)
        } else {
            this.show(f);
            if (this.hasBehavior("tabChange") && !j) {
                this.fireTabChangeEvent(f)
            }
        }
        return true
    },
    show: function(l) {
        var i = this.navContainer.children()
          , j = i.filter(".ui-state-active")
          , g = i.eq(l.index())
          , k = this.panelContainer.children(".ui-tabs-panel:visible")
          , h = this;
        k.attr("aria-hidden", true);
        j.attr("aria-expanded", false);
        j.attr("aria-selected", false);
        l.attr("aria-hidden", false);
        g.attr("aria-expanded", true);
        g.attr("aria-selected", true);
        if (this.cfg.effect) {
            k.hide(this.cfg.effect, null, this.cfg.effectDuration, function() {
                j.removeClass("ui-tabs-selected ui-state-active");
                g.addClass("ui-tabs-selected ui-state-active");
                l.show(h.cfg.effect, null, h.cfg.effectDuration, function() {
                    h.postTabShow(l)
                })
            })
        } else {
            j.removeClass("ui-tabs-selected ui-state-active");
            k.hide();
            g.addClass("ui-tabs-selected ui-state-active");
            l.show();
            this.postTabShow(l)
        }
    },
    loadDynamicTab: function(g) {
        var i = this
          , j = g.index()
          , f = {
            source: this.id,
            process: this.id,
            update: this.id,
            params: [{
                name: this.id + "_contentLoad",
                value: true
            }, {
                name: this.id + "_newTab",
                value: g.attr("id")
            }, {
                name: this.id + "_tabindex",
                value: j
            }],
            onsuccess: function(a, c, b) {
                PrimeFaces.ajax.Response.handle(a, c, b, {
                    widget: i,
                    handle: function(d) {
                        g.html(d);
                        if (this.cfg.cache) {
                            this.markAsLoaded(g)
                        }
                    }
                });
                return true
            },
            oncomplete: function() {
                i.show(g)
            }
        };
        if (this.hasBehavior("tabChange")) {
            var h = this.cfg.behaviors.tabChange;
            h.call(this, f)
        } else {
            PrimeFaces.ajax.Request.handle(f)
        }
    },
    remove: function(o) {
        var k = this.navContainer.children().eq(o)
          , i = this.panelContainer.children().eq(o);
        k.remove();
        i.remove();
        var m = this.getLength();
        if (m > 0) {
            if (o < this.cfg.selected) {
                this.cfg.selected--
            } else {
                if (o === this.cfg.selected) {
                    var n = (this.cfg.selected === (m)) ? (this.cfg.selected - 1) : this.cfg.selected
                      , l = this.navContainer.children("li")
                      , p = l.eq(n);
                    if (p.hasClass("ui-state-disabled")) {
                        var j = l.filter(":not(.ui-state-disabled):first");
                        if (j.length) {
                            this.select(j.index(), true)
                        }
                    } else {
                        this.select(n, true)
                    }
                }
            }
        } else {
            this.cfg.selected = -1
        }
        this.fireTabCloseEvent(i.attr("id"), o)
    },
    getLength: function() {
        return this.navContainer.children().length
    },
    getActiveIndex: function() {
        return this.cfg.selected
    },
    fireTabChangeEvent: function(e) {
        var f = this.cfg.behaviors.tabChange
          , d = {
            params: [{
                name: this.id + "_newTab",
                value: e.attr("id")
            }, {
                name: this.id + "_tabindex",
                value: e.index()
            }]
        };
        f.call(this, d)
    },
    fireTabCloseEvent: function(g, f) {
        if (this.hasBehavior("tabClose")) {
            var h = this.cfg.behaviors.tabClose
              , e = {
                params: [{
                    name: this.id + "_closeTab",
                    value: g
                }, {
                    name: this.id + "_tabindex",
                    value: f
                }]
            };
            h.call(this, e)
        }
    },
    hasBehavior: function(b) {
        if (this.cfg.behaviors) {
            return this.cfg.behaviors[b] !== undefined
        }
        return false
    },
    markAsLoaded: function(b) {
        b.data("loaded", true)
    },
    isLoaded: function(b) {
        return b.data("loaded") === true
    },
    disable: function(b) {
        this.navContainer.children().eq(b).addClass("ui-state-disabled")
    },
    enable: function(b) {
        this.navContainer.children().eq(b).removeClass("ui-state-disabled")
    },
    postTabShow: function(b) {
        if (this.cfg.onTabShow) {
            this.cfg.onTabShow.call(this, b.index())
        }
        PrimeFaces.invokeDeferredRenders(this.id)
    }
});
PrimeFaces.widget.TagCloud = PrimeFaces.widget.BaseWidget.extend({
    init: function(c) {
        this._super(c);
        var d = this;
        this.jq.find("a").mouseover(function() {
            $(this).addClass("ui-state-hover")
        }).mouseout(function() {
            $(this).removeClass("ui-state-hover")
        }).click(function(a) {
            var b = $(this);
            if (b.attr("href") === "#") {
                d.fireSelectEvent(b);
                a.preventDefault()
            }
        })
    },
    fireSelectEvent: function(d) {
        if (this.cfg.behaviors) {
            var f = this.cfg.behaviors.select;
            if (f) {
                var e = {
                    params: [{
                        name: this.id + "_itemIndex",
                        value: d.parent().index()
                    }]
                };
                f.call(this, e)
            }
        }
    }
});
PrimeFaces.widget.Tooltip = PrimeFaces.widget.BaseWidget.extend({
    init: function(b) {
        this.cfg = b;
        this.id = this.cfg.id;
        this.cfg.showEvent = this.cfg.showEvent ? this.cfg.showEvent + ".tooltip" : "mouseover.tooltip";
        this.cfg.hideEvent = this.cfg.hideEvent ? this.cfg.hideEvent + ".tooltip" : "mouseout.tooltip";
        this.cfg.showEffect = this.cfg.showEffect ? this.cfg.showEffect : "fade";
        this.cfg.hideEffect = this.cfg.hideEffect ? this.cfg.hideEffect : "fade";
        this.cfg.showDelay = this.cfg.showDelay || 150;
        this.cfg.hideDelay = this.cfg.hideDelay || 0;
        this.cfg.hideEffectDuration = this.cfg.target ? 250 : 1;
        if (this.cfg.target) {
            this.bindTarget()
        } else {
            this.bindGlobal()
        }
        this.removeScriptElement(this.id)
    },
    refresh: function(b) {
        if (b.target) {
            if ($(PrimeFaces.escapeClientId(b.id)).length > 1) {
                $(document.body).children(PrimeFaces.escapeClientId(b.id)).remove()
            }
        } else {
            $(document.body).children(".ui-tooltip-global").remove()
        }
        this._super(b)
    },
    bindGlobal: function() {
        this.jq = $('<div class="ui-tooltip ui-tooltip-global ui-widget ui-widget-content ui-corner-all ui-shadow" />').appendTo("body");
        this.cfg.globalSelector = this.cfg.globalSelector || "a,:input,:button";
        this.cfg.escape = (this.cfg.escape === undefined) ? true : this.cfg.escape;
        var c = this;
        $(document).off(this.cfg.showEvent + " " + this.cfg.hideEvent, this.cfg.globalSelector).on(this.cfg.showEvent, this.cfg.globalSelector, function(e) {
            var h = $(this);
            if (h.prop("disabled")) {
                return
            }
            if (c.cfg.trackMouse) {
                c.mouseEvent = e
            }
            var a = h.attr("title");
            if (a) {
                h.data("tooltip", a).removeAttr("title")
            }
            if (h.hasClass("ui-state-error")) {
                c.jq.addClass("ui-state-error")
            }
            var b = h.data("tooltip");
            if (b) {
                if (c.cfg.escape) {
                    c.jq.text(b)
                } else {
                    c.jq.html(b)
                }
                c.globalTitle = b;
                c.target = h;
                c.show()
            }
        }).on(this.cfg.hideEvent + ".tooltip", this.cfg.globalSelector, function() {
            if (c.globalTitle) {
                c.hide();
                c.globalTitle = null;
                c.target = null;
                c.jq.removeClass("ui-state-error")
            }
        });
        var d = "resize.tooltip";
        $(window).unbind(d).bind(d, function() {
            if (c.jq.is(":visible")) {
                c.align()
            }
        })
    },
    bindTarget: function() {
        this.id = this.cfg.id;
        this.jqId = PrimeFaces.escapeClientId(this.id);
        this.jq = $(this.jqId);
        this.target = PrimeFaces.expressions.SearchExpressionFacade.resolveComponentsAsSelector(this.cfg.target);
        var c = this;
        this.target.off(this.cfg.showEvent + " " + this.cfg.hideEvent).on(this.cfg.showEvent, function(b) {
            if (c.cfg.trackMouse) {
                c.mouseEvent = b
            }
            var a = $.trim(c.jq.text());
            if (c.jq.children().length > 0 || a !== "") {
                c.show()
            }
        }).on(this.cfg.hideEvent + ".tooltip", function() {
            c.hide()
        });
        this.jq.appendTo(document.body);
        if ($.trim(this.jq.html()) === "") {
            this.jq.html(this.target.attr("title"))
        }
        this.target.removeAttr("title");
        var d = "resize." + this.id;
        $(window).unbind(d).bind(d, function() {
            if (c.jq.is(":visible")) {
                c.align()
            }
        })
    },
    align: function() {
        this.jq.css({
            left: "",
            top: "",
            "z-index": ++PrimeFaces.zindex
        });
        if (this.cfg.trackMouse && this.mouseEvent) {
            this.jq.position({
                my: "left top+15",
                at: "right bottom",
                of: this.mouseEvent,
                collision: "flipfit"
            });
            this.mouseEvent = null
        } else {
            this.jq.position({
                my: "left top",
                at: "right bottom",
                of: this.target,
                collision: "flipfit"
            })
        }
    },
    show: function() {
        if (this.target) {
            var b = this;
            this.clearTimeout();
            this.timeout = setTimeout(function() {
                b._show()
            }, this.cfg.showDelay)
        }
    },
    _show: function() {
        var c = this;
        if (this.cfg.beforeShow) {
            var d = this.cfg.beforeShow.call(this);
            if (d === false) {
                return
            }
        }
        this.align();
        if (this.cfg.trackMouse) {
            this.followMouse()
        }
        this.jq.show(this.cfg.showEffect, {}, 250, function() {
            if (c.cfg.onShow) {
                c.cfg.onShow.call()
            }
        })
    },
    hide: function() {
        var b = this;
        this.clearTimeout();
        if (this.cfg.hideDelay) {
            this.timeout = setTimeout(function() {
                b._hide()
            }, this.cfg.hideDelay)
        } else {
            this._hide()
        }
    },
    _hide: function() {
        var b = this;
        if (this.isVisible()) {
            this.jq.hide(this.cfg.hideEffect, {}, this.cfg.hideEffectDuration, function() {
                $(this).css("z-index", "");
                if (b.cfg.trackMouse) {
                    b.unfollowMouse()
                }
                if (b.cfg.onHide) {
                    b.cfg.onHide.call()
                }
            })
        }
    },
    clearTimeout: function() {
        if (this.timeout) {
            clearTimeout(this.timeout)
        }
    },
    followMouse: function() {
        var b = this;
        this.target.on("mousemove.tooltip-track", function(a) {
            b.jq.position({
                my: "left top+15",
                at: "right bottom",
                of: a,
                collision: "flipfit"
            })
        })
    },
    unfollowMouse: function() {
        this.target.off("mousemove.tooltip-track")
    },
    isVisible: function() {
        return this.jq.is(":visible") && this.jq.hasClass("ui-overlay-visible")
    }
});
PrimeFaces.widget.BaseTree = PrimeFaces.widget.BaseWidget.extend({
    init: function(b) {
        this._super(b);
        this.cfg.highlight = (this.cfg.highlight === false) ? false : true;
        this.focusedNode = null;
        if (this.cfg.selectionMode) {
            this.initSelection()
        }
        this.bindEvents();
        this.jq.data("widget", this)
    },
    initSelection: function() {
        this.selectionHolder = $(this.jqId + "_selection");
        var b = this.selectionHolder.val();
        this.selections = b === "" ? [] : b.split(",");
        if (this.isCheckboxSelection()) {
            this.preselectCheckbox()
        }
    },
    expandNode: function(e) {
        var h = this;
        if (this.cfg.dynamic) {
            if (this.cfg.cache && h.getNodeChildrenContainer(e).children().length > 0) {
                this.showNodeChildren(e);
                return
            }
            if (e.data("processing")) {
                PrimeFaces.debug("Node is already being expanded, ignoring expand event.");
                return
            }
            e.data("processing", true);
            var f = {
                source: this.id,
                process: this.id,
                update: this.id,
                formId: this.cfg.formId,
                params: [{
                    name: this.id + "_expandNode",
                    value: h.getRowKey(e)
                }],
                onsuccess: function(a, c, b) {
                    PrimeFaces.ajax.Response.handle(a, c, b, {
                        widget: h,
                        handle: function(j) {
                            var d = this.getNodeChildrenContainer(e);
                            d.append(j);
                            this.showNodeChildren(e);
                            if (this.cfg.draggable) {
                                this.makeDraggable(d.find("span.ui-treenode-content"))
                            }
                            if (this.cfg.droppable) {
                                this.makeDropPoints(d.find("li.ui-tree-droppoint"));
                                this.makeDropNodes(d.find("span.ui-treenode-droppable"))
                            }
                        }
                    });
                    return true
                },
                oncomplete: function() {
                    e.removeData("processing")
                }
            };
            if (this.hasBehavior("expand")) {
                var g = this.cfg.behaviors.expand;
                g.call(this, f)
            } else {
                PrimeFaces.ajax.Request.handle(f)
            }
        } else {
            this.showNodeChildren(e);
            this.fireExpandEvent(e)
        }
    },
    fireExpandEvent: function(d) {
        if (this.cfg.behaviors) {
            var f = this.cfg.behaviors.expand;
            if (f) {
                var e = {
                    params: [{
                        name: this.id + "_expandNode",
                        value: this.getRowKey(d)
                    }]
                };
                f.call(this, e)
            }
        }
    },
    fireCollapseEvent: function(f) {
        if (this.cfg.behaviors) {
            var e = this.cfg.behaviors.collapse;
            if (e) {
                var d = {
                    params: [{
                        name: this.id + "_collapseNode",
                        value: this.getRowKey(f)
                    }]
                };
                e.call(this, d)
            }
        }
    },
    getNodeChildrenContainer: function(b) {
        throw "Unsupported Operation"
    },
    showNodeChildren: function(b) {
        throw "Unsupported Operation"
    },
    writeSelections: function() {
        this.selectionHolder.val(this.selections.join(","))
    },
    fireNodeSelectEvent: function(j) {
        if (this.isCheckboxSelection() && this.cfg.dynamic) {
            var h = this
              , g = {
                source: this.id,
                process: this.id
            };
            g.params = [{
                name: this.id + "_instantSelection",
                value: this.getRowKey(j)
            }];
            g.oncomplete = function(a, e, d) {
                if (d.descendantRowKeys && d.descendantRowKeys !== "") {
                    var b = d.descendantRowKeys.split(",");
                    for (var c = 0; c < b.length; c++) {
                        h.addToSelection(b[c])
                    }
                    h.writeSelections()
                }
            }
            ;
            if (this.hasBehavior("select")) {
                var i = this.cfg.behaviors.select;
                i.call(this, g)
            } else {
                PrimeFaces.ajax.AjaxRequest(g)
            }
        } else {
            if (this.hasBehavior("select")) {
                var i = this.cfg.behaviors.select
                  , f = {
                    params: [{
                        name: this.id + "_instantSelection",
                        value: this.getRowKey(j)
                    }]
                };
                i.call(this, f)
            }
        }
    },
    fireNodeUnselectEvent: function(f) {
        if (this.cfg.behaviors) {
            var e = this.cfg.behaviors.unselect;
            if (e) {
                var d = {
                    params: [{
                        name: this.id + "_instantUnselection",
                        value: this.getRowKey(f)
                    }]
                };
                e.call(this, d)
            }
        }
    },
    fireContextMenuEvent: function(f) {
        if (this.hasBehavior("contextMenu")) {
            var d = this.cfg.behaviors.contextMenu
              , e = {
                params: [{
                    name: this.id + "_contextMenuNode",
                    value: this.getRowKey(f)
                }]
            };
            d.call(this, e)
        }
    },
    getRowKey: function(b) {
        return b.attr("data-rowkey")
    },
    isNodeSelected: function(b) {
        return $.inArray(this.getRowKey(b), this.selections) != -1
    },
    isSingleSelection: function() {
        return this.cfg.selectionMode == "single"
    },
    isMultipleSelection: function() {
        return this.cfg.selectionMode == "multiple"
    },
    isCheckboxSelection: function() {
        return this.cfg.selectionMode == "checkbox"
    },
    addToSelection: function(b) {
        if (!PrimeFaces.inArray(this.selections, b)) {
            this.selections.push(b)
        }
    },
    removeFromSelection: function(b) {
        this.selections = $.grep(this.selections, function(a) {
            return a !== b
        })
    },
    removeDescendantsFromSelection: function(f) {
        var e = [];
        for (var d = 0; d < this.selections.length; d++) {
            if (this.selections[d].indexOf(f + "_") !== 0) {
                e.push(this.selections[d])
            }
        }
        this.selections = e
    },
    hasBehavior: function(b) {
        if (this.cfg.behaviors) {
            return this.cfg.behaviors[b] != undefined
        }
        return false
    },
    nodeClick: function(k, i) {
        if ($(k.target).is(":not(.ui-tree-toggler)")) {
            var l = i.parent()
              , h = i.hasClass("ui-tree-selectable");
            if (this.cfg.onNodeClick) {
                this.cfg.onNodeClick.call(this, l, k)
            }
            if (h && this.cfg.selectionMode) {
                var m = this.isNodeSelected(l)
                  , j = k.metaKey || k.ctrlKey
                  , n = k.shiftKey;
                if (this.isCheckboxSelection()) {
                    this.toggleCheckboxNode(l)
                } else {
                    if (m && (j)) {
                        this.unselectNode(l)
                    } else {
                        if (this.isSingleSelection() || (this.isMultipleSelection() && !j)) {
                            this.unselectAllNodes()
                        }
                        this.selectNode(l);
                        this.cursorNode = l
                    }
                }
                if ($(k.target).is(":not(:input:enabled)")) {
                    PrimeFaces.clearSelection();
                    this.focusNode(l)
                }
            }
        }
    },
    nodeRightClick: function(h, g) {
        PrimeFaces.clearSelection();
        if ($(h.target).is(":not(.ui-tree-toggler)")) {
            var i = g.parent()
              , f = g.hasClass("ui-tree-selectable");
            if (f && this.cfg.selectionMode) {
                var j = this.isNodeSelected(i);
                if (!j) {
                    if (this.isCheckboxSelection()) {
                        this.toggleCheckboxNode(i)
                    } else {
                        this.unselectAllNodes();
                        this.selectNode(i, true)
                    }
                }
                this.fireContextMenuEvent(i)
            }
        }
    },
    bindEvents: function() {
        throw "Unsupported Operation"
    },
    selectNode: function(c, d) {
        throw "Unsupported Operation"
    },
    unselectNode: function(c, d) {
        throw "Unsupported Operation"
    },
    unselectAllNodes: function() {
        throw "Unsupported Operation"
    },
    preselectCheckbox: function() {
        throw "Unsupported Operation"
    },
    toggleCheckboxNode: function(b) {
        throw "Unsupported Operation"
    },
    isEmpty: function() {
        throw "Unsupported Operation"
    },
    toggleCheckboxState: function(c, d) {
        if (d) {
            this.uncheck(c)
        } else {
            this.check(c)
        }
    },
    partialCheck: function(i) {
        var f = i.children(".ui-chkbox-box")
          , g = f.children(".ui-chkbox-icon")
          , j = i.closest(".ui-treenode")
          , h = this.getRowKey(j);
        j.find("> .ui-treenode-content > .ui-treenode-label").removeClass("ui-state-highlight");
        g.removeClass("ui-icon-blank ui-icon-check").addClass("ui-icon-minus");
        j.removeClass("ui-treenode-selected ui-treenode-unselected").addClass("ui-treenode-hasselected").attr("aria-checked", false).attr("aria-selected", false);
        this.removeFromSelection(h)
    },
    check: function(i) {
        var f = i.children(".ui-chkbox-box")
          , g = f.children(".ui-chkbox-icon")
          , j = i.closest(".ui-treenode")
          , h = this.getRowKey(j);
        f.removeClass("ui-state-hover");
        g.removeClass("ui-icon-blank ui-icon-minus").addClass("ui-icon-check");
        j.removeClass("ui-treenode-hasselected ui-treenode-unselected").addClass("ui-treenode-selected").attr("aria-checked", true).attr("aria-selected", true);
        this.addToSelection(h)
    },
    uncheck: function(i) {
        var f = i.children(".ui-chkbox-box")
          , g = f.children(".ui-chkbox-icon")
          , j = i.closest(".ui-treenode")
          , h = this.getRowKey(j);
        f.removeClass("ui-state-hover");
        g.removeClass("ui-icon-minus ui-icon-check").addClass("ui-icon-blank");
        j.removeClass("ui-treenode-hasselected ui-treenode-selected").addClass("ui-treenode-unselected").attr("aria-checked", false).attr("aria-selected", false);
        this.removeFromSelection(h)
    },
    isExpanded: function(b) {
        return this.getNodeChildrenContainer(b).is(":visible")
    },
    focusNode: function() {
        throw "Unsupported Operation"
    }
});
PrimeFaces.widget.VerticalTree = PrimeFaces.widget.BaseTree.extend({
    init: function(b) {
        this._super(b);
        this.container = this.jq.children(".ui-tree-container");
        this.cfg.rtl = this.jq.hasClass("ui-tree-rtl");
        this.cfg.collapsedIcon = this.cfg.rtl ? "ui-icon-triangle-1-w" : "ui-icon-triangle-1-e";
        if (this.cfg.draggable) {
            this.initDraggable()
        }
        if (this.cfg.droppable) {
            this.initDroppable()
        }
    },
    bindEvents: function() {
        var h = this
          , f = ".ui-tree-toggler"
          , g = ".ui-tree-selectable .ui-treenode-label"
          , j = ".ui-treenode-content";
        this.jq.off("click.tree-toggle", f).on("click.tree-toggle", f, null, function(a) {
            var c = $(this)
              , b = c.closest("li");
            if (c.hasClass(h.cfg.collapsedIcon)) {
                h.expandNode(b)
            } else {
                h.collapseNode(b)
            }
        });
        if (this.cfg.highlight && this.cfg.selectionMode) {
            this.jq.off("mouseout.tree mouseover.tree", g).on("mouseout.tree", g, null, function() {
                var a = $(this);
                a.removeClass("ui-state-hover");
                if (h.isCheckboxSelection()) {
                    a.siblings("div.ui-chkbox").children("div.ui-chkbox-box").removeClass("ui-state-hover")
                }
            }).on("mouseover.tree", g, null, function() {
                var a = $(this);
                $(this).addClass("ui-state-hover");
                if (h.isCheckboxSelection()) {
                    a.siblings("div.ui-chkbox").children("div.ui-chkbox-box").addClass("ui-state-hover")
                }
            })
        }
        if (this.isCheckboxSelection()) {
            var i = ".ui-chkbox-box:not(.ui-state-disabled)";
            this.jq.off("mouseout.tree-checkbox mouseover.tree-checkbox click.tree-checkbox", i).on("mouseout.tree-checkbox", i, null, function() {
                $(this).removeClass("ui-state-hover").parent().siblings("span.ui-treenode-label").removeClass("ui-state-hover")
            }).on("mouseover.tree-checkbox", i, null, function() {
                $(this).addClass("ui-state-hover").parent().siblings("span.ui-treenode-label").addClass("ui-state-hover")
            })
        }
        this.jq.off("click.tree-content", j).on("click.tree-content", j, null, function(a) {
            h.nodeClick(a, $(this))
        });
        this.bindKeyEvents()
    },
    bindKeyEvents: function() {
        var d = this
          , c = false;
        this.jq.on("mousedown.tree", function(a) {
            if ($(a.target).is(":not(:input:enabled)")) {
                a.preventDefault()
            }
        }).on("focus.tree", function() {
            if (!d.focusedNode && !c) {
                d.focusNode(d.getFirstNode())
            }
        });
        this.jq.off("keydown.tree blur.tree", ".ui-treenode-label").on("keydown.tree", ".ui-treenode-label", null, function(p) {
            if (!d.focusedNode) {
                return
            }
            var i = ""
              , b = $.ui.keyCode;
            switch (p.which) {
            case b.LEFT:
                var t = d.focusedNode.data("rowkey").toString()
                  , a = t.length;
                if (d.isExpanded(d.focusedNode)) {
                    d.collapseNode(d.focusedNode)
                } else {
                    var s = null;
                    for (var q = 1; q < parseInt(a / 2) + 1; q++) {
                        i = t.substring(0, a - 2 * q);
                        s = d.container.find("li:visible[data-rowkey = '" + i + "']");
                        if (s.length) {
                            d.focusNode(s);
                            break
                        }
                    }
                }
                p.preventDefault();
                break;
            case b.RIGHT:
                if (!d.focusedNode.hasClass("ui-treenode-leaf")) {
                    var t = d.focusedNode.data("rowkey").toString()
                      , a = t.length;
                    if (!d.isExpanded(d.focusedNode)) {
                        d.expandNode(d.focusedNode)
                    }
                    if (!d.isExpanded(d.focusedNode) && !d.cfg.dynamic) {
                        i = t + "_0";
                        var s = d.container.find("li:visible[data-rowkey = '" + i + "']");
                        if (s.length) {
                            d.focusNode(s)
                        }
                    }
                }
                p.preventDefault();
                break;
            case b.UP:
                var s = null
                  , v = d.focusedNode.prev();
                if (v.length) {
                    s = v.find("li.ui-treenode:visible:last");
                    if (!s.length) {
                        s = v
                    }
                } else {
                    s = d.focusedNode.closest("ul").parent("li")
                }
                if (s.length) {
                    d.focusNode(s)
                }
                p.preventDefault();
                break;
            case b.DOWN:
                var s = null
                  , u = d.focusedNode.find("> ul > li:visible:first");
                if (u.length) {
                    s = u
                } else {
                    if (d.focusedNode.next().length) {
                        s = d.focusedNode.next()
                    } else {
                        var t = d.focusedNode.data("rowkey").toString();
                        if (t.length !== 1) {
                            s = d.searchDown(d.focusedNode)
                        }
                    }
                }
                if (s && s.length) {
                    d.focusNode(s)
                }
                p.preventDefault();
                break;
            case b.ENTER:
            case b.NUMPAD_ENTER:
            case b.SPACE:
                if (d.cfg.selectionMode) {
                    var e = d.focusedNode.children(".ui-treenode-content").hasClass("ui-tree-selectable");
                    if (d.cfg.onNodeClick) {
                        d.cfg.onNodeClick.call(d, d.focusedNode, p)
                    }
                    if (e) {
                        var r = d.isNodeSelected(d.focusedNode);
                        if (d.isCheckboxSelection()) {
                            d.toggleCheckboxNode(d.focusedNode)
                        } else {
                            if (r) {
                                d.unselectNode(d.focusedNode)
                            } else {
                                if (d.isSingleSelection()) {
                                    d.unselectAllNodes()
                                }
                                d.selectNode(d.focusedNode);
                                d.cursorNode = d.focusedNode
                            }
                        }
                    }
                }
                p.preventDefault();
                break;
            case b.TAB:
                c = true;
                d.jq.focus();
                setTimeout(function() {
                    c = false
                }, 2);
                break
            }
        }).on("blur.tree", ".ui-treenode-label", null, function(a) {
            if (d.focusedNode) {
                d.getNodeLabel(d.focusedNode).removeClass("ui-treenode-outline");
                d.focusedNode = null
            }
        })
    },
    searchDown: function(g) {
        var e = g.closest("ul").parent("li").next()
          , f = null;
        if (e.length) {
            f = e
        } else {
            if (g.hasClass("ui-treenode-leaf") && g.closest("ul").parent("li").length == 0) {
                f = g
            } else {
                var h = g.data("rowkey").toString();
                if (h.length !== 1) {
                    f = this.searchDown(g.closest("ul").parent("li"))
                }
            }
        }
        return f
    },
    collapseNode: function(k) {
        var i = this
          , n = k.find("> .ui-treenode-content")
          , l = n.find("> .ui-tree-toggler")
          , o = k.data("nodetype")
          , p = l.nextAll("span.ui-treenode-icon")
          , j = this.cfg.iconStates[o]
          , m = k.children(".ui-treenode-children");
        n.find("> .ui-treenode-label").attr("aria-expanded", false);
        l.addClass(i.cfg.collapsedIcon).removeClass("ui-icon-triangle-1-s");
        if (j) {
            p.removeClass(j.expandedIcon).addClass(j.collapsedIcon)
        }
        if (this.cfg.animate) {
            m.slideUp("fast", function() {
                i.postCollapse(k, m)
            })
        } else {
            m.hide();
            this.postCollapse(k, m)
        }
    },
    postCollapse: function(c, d) {
        if (this.cfg.dynamic && !this.cfg.cache) {
            d.empty()
        }
        this.fireCollapseEvent(c)
    },
    getNodeChildrenContainer: function(b) {
        return b.children(".ui-treenode-children")
    },
    showNodeChildren: function(i) {
        var k = i.find("> .ui-treenode-content")
          , j = k.find("> .ui-tree-toggler")
          , l = i.data("nodetype")
          , g = j.nextAll("span.ui-treenode-icon")
          , h = this.cfg.iconStates[l];
        k.find("> .ui-treenode-label").attr("aria-expanded", true);
        j.addClass("ui-icon-triangle-1-s").removeClass(this.cfg.collapsedIcon);
        if (h) {
            g.removeClass(h.collapsedIcon).addClass(h.expandedIcon)
        }
        if (this.cfg.animate) {
            i.children(".ui-treenode-children").slideDown("fast")
        } else {
            i.children(".ui-treenode-children").show()
        }
    },
    unselectAllNodes: function() {
        this.selections = [];
        this.jq.find(".ui-treenode-label.ui-state-highlight").each(function() {
            $(this).removeClass("ui-state-highlight").closest(".ui-treenode").attr("aria-selected", false)
        })
    },
    selectNode: function(c, d) {
        c.attr("aria-selected", true).find("> .ui-treenode-content > .ui-treenode-label").removeClass("ui-state-hover").addClass("ui-state-highlight");
        this.addToSelection(this.getRowKey(c));
        this.writeSelections();
        if (!d) {
            this.fireNodeSelectEvent(c)
        }
    },
    unselectNode: function(d, e) {
        var f = this.getRowKey(d);
        d.attr("aria-selected", false).find("> .ui-treenode-content > .ui-treenode-label").removeClass("ui-state-highlight ui-state-hover");
        this.removeFromSelection(f);
        this.writeSelections();
        if (!e) {
            this.fireNodeUnselectEvent(d)
        }
    },
    toggleCheckboxNode: function(e) {
        var g = this
          , h = e.find("> .ui-treenode-content > .ui-chkbox")
          , f = h.find("> .ui-chkbox-box > .ui-chkbox-icon").hasClass("ui-icon-check");
        this.toggleCheckboxState(h, f);
        if (this.cfg.propagateDown) {
            e.children(".ui-treenode-children").find(".ui-chkbox").each(function() {
                g.toggleCheckboxState($(this), f)
            });
            if (this.cfg.dynamic) {
                this.removeDescendantsFromSelection(e.data("rowkey"))
            }
        }
        if (this.cfg.propagateUp) {
            e.parents("li.ui-treenode-parent").each(function() {
                var c = $(this)
                  , b = c.find("> .ui-treenode-content > .ui-chkbox")
                  , a = c.find("> .ui-treenode-children > .ui-treenode");
                if (f) {
                    if (a.filter(".ui-treenode-unselected").length === a.length) {
                        g.uncheck(b)
                    } else {
                        g.partialCheck(b)
                    }
                } else {
                    if (a.filter(".ui-treenode-selected").length === a.length) {
                        g.check(b)
                    } else {
                        g.partialCheck(b)
                    }
                }
            })
        }
        this.writeSelections();
        if (f) {
            this.fireNodeUnselectEvent(e)
        } else {
            this.fireNodeSelectEvent(e)
        }
    },
    preselectCheckbox: function() {
        this.jq.find(".ui-chkbox-icon").not(".ui-icon-check").each(function() {
            var d = $(this)
              , c = d.closest("li");
            if (c.children(".ui-treenode-children").find(".ui-chkbox-icon.ui-icon-check").length > 0) {
                c.addClass("ui-treenode-hasselected");
                d.removeClass("ui-icon-blank").addClass("ui-icon-minus")
            }
        })
    },
    check: function(b) {
        this._super(b);
        b.siblings("span.ui-treenode-label").addClass("ui-state-highlight").removeClass("ui-state-hover")
    },
    uncheck: function(b) {
        this._super(b);
        b.siblings("span.ui-treenode-label").removeClass("ui-state-highlight")
    },
    initDraggable: function() {
        this.makeDraggable(this.jq.find("span.ui-treenode-content"))
    },
    initDroppable: function() {
        this.makeDropPoints(this.jq.find("li.ui-tree-droppoint"));
        this.makeDropNodes(this.jq.find("span.ui-treenode-droppable"));
        this.initDropScrollers()
    },
    makeDraggable: function(d) {
        var f = this
          , e = this.cfg.dragdropScope || this.id;
        d.draggable({
            helper: function() {
                var a = $('<div class="ui-tree-draghelper ui-state-highlight"></div>');
                a.width(f.jq.width());
                a.height(20);
                return a
            },
            appendTo: document.body,
            zIndex: ++PrimeFaces.zindex,
            revert: true,
            scope: e
        }).data({
            dragsourceid: this.jqId,
            dragmode: this.cfg.dragMode
        })
    },
    makeDropPoints: function(d) {
        var f = this
          , e = this.cfg.dragdropScope || this.id;
        d.droppable({
            hoverClass: "ui-state-hover",
            accept: "span.ui-treenode-content",
            tolerance: "pointer",
            scope: e,
            drop: function(C, t) {
                var B = $(t.draggable.data("dragsourceid")).data("widget")
                  , u = t.draggable.data("dragmode")
                  , v = f
                  , c = $(this)
                  , s = c.closest("li.ui-treenode-parent")
                  , b = f.getRowKey(s)
                  , y = t.draggable.closest("li.ui-treenode")
                  , A = f.findTargetDragNode(y, u)
                  , w = f.getRowKey(A)
                  , D = A.next("li.ui-tree-droppoint")
                  , a = A.parent().closest("li.ui-treenode-parent")
                  , z = (B.id !== v.id);
                t.helper.remove();
                c.removeClass("ui-state-hover");
                var x = f.validateDropPoint(y, c);
                if (!x) {
                    return
                }
                A.hide().insertAfter(c);
                if (z) {
                    if (B.cfg.selectionMode) {
                        B.unselectSubtree(A)
                    }
                    D.remove();
                    f.updateDragDropBindings(A)
                } else {
                    D.insertAfter(A)
                }
                if (a.length && (a.find("> ul.ui-treenode-children > li.ui-treenode").length === 0)) {
                    f.makeLeaf(a)
                }
                A.fadeIn();
                if (f.isCheckboxSelection()) {
                    f.syncDNDCheckboxes(B, a, s)
                }
                f.syncDragDrop();
                if (z) {
                    B.syncDragDrop()
                }
                f.fireDragDropEvent({
                    dragNodeKey: w,
                    dropNodeKey: b,
                    dragSource: B.id,
                    dndIndex: c.prevAll("li.ui-treenode").length,
                    transfer: z
                })
            }
        })
    },
    makeDropNodes: function(d) {
        var f = this
          , e = this.cfg.dragdropScope || this.id;
        d.droppable({
            accept: ".ui-treenode-content",
            tolerance: "pointer",
            scope: e,
            over: function(b, a) {
                $(this).children(".ui-treenode-label").addClass("ui-state-hover")
            },
            out: function(b, a) {
                $(this).children(".ui-treenode-label").removeClass("ui-state-hover")
            },
            drop: function(D, t) {
                var C = $(t.draggable.data("dragsourceid")).data("widget")
                  , v = t.draggable.data("dragmode")
                  , w = f
                  , u = $(this)
                  , c = u.closest("li.ui-treenode")
                  , a = f.getRowKey(c)
                  , z = t.draggable.closest("li.ui-treenode")
                  , B = f.findTargetDragNode(z, v)
                  , x = f.getRowKey(B)
                  , E = B.next("li.ui-tree-droppoint")
                  , F = B.parent().closest("li.ui-treenode-parent")
                  , b = c.children(".ui-treenode-children")
                  , A = (C.id !== w.id);
                t.helper.remove();
                u.children(".ui-treenode-label").removeClass("ui-state-hover");
                var y = f.validateDropNode(z, c, F);
                if (!y) {
                    return
                }
                if (b.children("li.ui-treenode").length === 0) {
                    f.makeParent(c)
                }
                B.hide();
                b.append(B);
                if (F.length && (F.find("> ul.ui-treenode-children > li.ui-treenode").length === 0)) {
                    f.makeLeaf(F)
                }
                if (A) {
                    if (C.cfg.selectionMode) {
                        C.unselectSubtree(B)
                    }
                    E.remove();
                    f.updateDragDropBindings(B)
                } else {
                    b.append(E)
                }
                B.fadeIn();
                if (f.isCheckboxSelection()) {
                    f.syncDNDCheckboxes(C, F, c)
                }
                f.syncDragDrop();
                if (A) {
                    C.syncDragDrop()
                }
                f.fireDragDropEvent({
                    dragNodeKey: x,
                    dropNodeKey: a,
                    dragSource: C.id,
                    dndIndex: B.prevAll("li.ui-treenode").length,
                    transfer: A
                })
            }
        })
    },
    initDropScrollers: function() {
        var c = this
          , d = this.cfg.dragdropScope || this.id;
        this.jq.prepend('<div class="ui-tree-scroller ui-tree-scrollertop"></div>').append('<div class="ui-tree-scroller ui-tree-scrollerbottom"></div>');
        this.jq.children("div.ui-tree-scroller").droppable({
            accept: ".ui-treenode-content",
            tolerance: "pointer",
            scope: d,
            over: function() {
                var a = $(this).hasClass("ui-tree-scrollertop") ? -10 : 10;
                c.scrollInterval = setInterval(function() {
                    c.scroll(a)
                }, 100)
            },
            out: function() {
                clearInterval(c.scrollInterval)
            }
        })
    },
    scroll: function(b) {
        this.container.scrollTop(this.container.scrollTop() + b)
    },
    updateDragDropBindings: function(f) {
        f.after('<li class="ui-tree-droppoint ui-droppable"></li>');
        this.makeDropPoints(f.next("li.ui-tree-droppoint"));
        var d = f.find("li.ui-tree-droppoint");
        d.droppable("destroy");
        this.makeDropPoints(d);
        var e = f.find("span.ui-treenode-content");
        e.droppable("destroy");
        this.makeDropNodes(e);
        if (this.cfg.draggable) {
            e.data({
                dragsourceid: this.jqId,
                dragmode: this.cfg.dragMode
            })
        }
    },
    findTargetDragNode: function(d, f) {
        var e = null;
        if (f === "self") {
            e = d
        } else {
            if (f === "parent") {
                e = d.parent().closest("li.ui-treenode")
            } else {
                if (f === "ancestor") {
                    e = d.parent().parents("li.ui-treenode:last")
                }
            }
        }
        if (e.length === 0) {
            e = d
        }
        return e
    },
    findNodes: function(f) {
        var e = [];
        for (var d = 0; d < f.length; d++) {
            e.push($(this.jqId + "\\:" + f[d]))
        }
        return e
    },
    updateRowKeys: function() {
        var b = this.jq.find("> ul.ui-tree-container > li.ui-treenode");
        this.updateChildrenRowKeys(b, null)
    },
    updateChildrenRowKeys: function(d, e) {
        var f = this;
        d.each(function(b) {
            var c = $(this)
              , a = c.attr("data-rowkey")
              , h = (e === null) ? b.toString() : e + "_" + b;
            c.attr({
                id: f.id + ":" + h,
                "data-rowkey": h
            });
            if (c.hasClass("ui-treenode-parent")) {
                f.updateChildrenRowKeys(c.find("> ul.ui-treenode-children > li.ui-treenode"), h)
            }
        })
    },
    validateDropPoint: function(d, c) {
        if (d.next().get(0) === c.get(0) || d.prev().get(0) === c.get(0)) {
            return false
        }
        if (d.has(c.get(0)).length) {
            return false
        }
        if (this.cfg.dropRestrict) {
            if (this.cfg.dropRestrict === "sibling" && d.parent().get(0) !== c.parent().get(0)) {
                return false
            }
        }
        return true
    },
    validateDropNode: function(f, d, e) {
        if (e.get(0) === d.get(0)) {
            return false
        }
        if (f.has(d.get(0)).length) {
            return false
        }
        if (this.cfg.dropRestrict) {
            if (this.cfg.dropRestrict === "sibling") {
                return false
            }
        }
        return true
    },
    makeLeaf: function(b) {
        b.removeClass("ui-treenode-parent").addClass("ui-treenode-leaf");
        b.find("> .ui-treenode-content > .ui-tree-toggler").addClass("ui-treenode-leaf-icon").removeClass("ui-tree-toggler ui-icon ui-icon-triangle-1-s");
        b.children(".ui-treenode-children").hide().children().remove()
    },
    makeParent: function(b) {
        b.removeClass("ui-treenode-leaf").addClass("ui-treenode-parent");
        b.find("> span.ui-treenode-content > span.ui-treenode-leaf-icon").removeClass("ui-treenode-leaf-icon").addClass("ui-tree-toggler ui-icon ui-icon-triangle-1-e");
        b.children(".ui-treenode-children").append('<li class="ui-tree-droppoint ui-droppable"></li>');
        this.makeDropPoints(b.find("> ul.ui-treenode-children > li.ui-tree-droppoint"))
    },
    syncDragDrop: function() {
        var d = this;
        if (this.cfg.selectionMode) {
            var c = this.findNodes(this.selections);
            this.updateRowKeys();
            this.selections = [];
            $.each(c, function(b, a) {
                d.selections.push(a.attr("data-rowkey"))
            });
            this.writeSelections()
        } else {
            this.updateRowKeys()
        }
    },
    syncDNDCheckboxes: function(e, d, f) {
        if (d.length) {
            e.propagateDNDCheckbox(d)
        }
        if (f.length) {
            this.propagateDNDCheckbox(f)
        }
    },
    unselectSubtree: function(e) {
        var f = this;
        if (this.isCheckboxSelection()) {
            var d = e.find("> .ui-treenode-content > .ui-chkbox");
            this.toggleCheckboxState(d, true);
            e.children(".ui-treenode-children").find(".ui-chkbox").each(function() {
                f.toggleCheckboxState($(this), true)
            })
        } else {
            e.find(".ui-treenode-label.ui-state-highlight").each(function() {
                $(this).removeClass("ui-state-highlight").closest("li.ui-treenode").attr("aria-selected", false)
            })
        }
    },
    propagateDNDCheckbox: function(h) {
        var g = h.find("> .ui-treenode-content > .ui-chkbox")
          , f = h.find("> .ui-treenode-children > .ui-treenode");
        if (f.length) {
            if (f.filter(".ui-treenode-unselected").length === f.length) {
                this.uncheck(g)
            } else {
                if (f.filter(".ui-treenode-selected").length === f.length) {
                    this.check(g)
                } else {
                    this.partialCheck(g)
                }
            }
        }
        var e = h.parent().closest(".ui-treenode-parent");
        if (e.length) {
            this.propagateDNDCheckbox(e)
        }
    },
    fireDragDropEvent: function(h) {
        var g = this
          , e = {
            source: this.id,
            process: h.transfer ? this.id + " " + h.dragSource : this.id
        };
        e.params = [{
            name: this.id + "_dragdrop",
            value: true
        }, {
            name: this.id + "_dragNode",
            value: h.dragNodeKey
        }, {
            name: this.id + "_dragSource",
            value: h.dragSource
        }, {
            name: this.id + "_dropNode",
            value: h.dropNodeKey
        }, {
            name: this.id + "_dndIndex",
            value: h.dndIndex
        }];
        if (this.hasBehavior("dragdrop")) {
            var f = this.cfg.behaviors.dragdrop;
            f.call(this, e)
        } else {
            PrimeFaces.ajax.AjaxRequest(e)
        }
    },
    isEmpty: function() {
        return (this.container.children().length === 0)
    },
    getFirstNode: function() {
        return this.jq.find("> ul.ui-tree-container > li:first-child")
    },
    getNodeLabel: function(b) {
        return b.find("> span.ui-treenode-content > span.ui-treenode-label")
    },
    focusNode: function(b) {
        if (this.focusedNode) {
            this.getNodeLabel(this.focusedNode).removeClass("ui-treenode-outline")
        }
        this.getNodeLabel(b).addClass("ui-treenode-outline").focus();
        this.focusedNode = b
    }
});
PrimeFaces.widget.HorizontalTree = PrimeFaces.widget.BaseTree.extend({
    init: function(b) {
        this._super(b);
        if (PrimeFaces.isIE()) {
            this.drawConnectors()
        }
    },
    bindEvents: function() {
        var h = this
          , g = this.cfg.selectionMode
          , f = ".ui-tree-toggler"
          , e = ".ui-treenode-content.ui-tree-selectable";
        this.jq.off("click.tree-toggle", f).on("click.tree-toggle", f, null, function() {
            var b = $(this)
              , a = b.closest("td.ui-treenode");
            if (a.hasClass("ui-treenode-collapsed")) {
                h.expandNode(a)
            } else {
                h.collapseNode(a)
            }
        });
        if (g && this.cfg.highlight) {
            this.jq.off("mouseout.tree mouseover.tree", e).on("mouseover.tree", e, null, function() {
                var a = $(this);
                if (!a.hasClass("ui-state-highlight")) {
                    a.addClass("ui-state-hover");
                    if (h.isCheckboxSelection()) {
                        a.children("div.ui-chkbox").children("div.ui-chkbox-box").addClass("ui-state-hover")
                    }
                }
            }).on("mouseout.tree", e, null, function() {
                var a = $(this);
                if (!a.hasClass("ui-state-highlight")) {
                    a.removeClass("ui-state-hover");
                    if (h.isCheckboxSelection()) {
                        a.children("div.ui-chkbox").children("div.ui-chkbox-box").removeClass("ui-state-hover")
                    }
                }
            })
        }
        this.jq.off("click.tree-content", e).on("click.tree-content", e, null, function(a) {
            h.nodeClick(a, $(this))
        })
    },
    showNodeChildren: function(h) {
        h.attr("aria-expanded", true);
        var j = h.next()
          , i = h.find("> .ui-treenode-content > .ui-tree-toggler")
          , f = h.data("nodetype")
          , g = this.cfg.iconStates[f];
        if (g) {
            i.nextAll("span.ui-treenode-icon").removeClass(g.collapsedIcon).addClass(g.expandedIcon)
        }
        i.addClass("ui-icon-minus").removeClass("ui-icon-plus");
        h.removeClass("ui-treenode-collapsed");
        j.show();
        if ($.browser.msie) {
            this.drawConnectors()
        }
    },
    collapseNode: function(h) {
        var j = h.next()
          , i = h.find("> .ui-treenode-content > .ui-tree-toggler")
          , f = h.data("nodetype")
          , g = this.cfg.iconStates[f];
        if (g) {
            i.nextAll("span.ui-treenode-icon").addClass(g.collapsedIcon).removeClass(g.expandedIcon)
        }
        i.removeClass("ui-icon-minus").addClass("ui-icon-plus");
        h.addClass("ui-treenode-collapsed");
        j.hide();
        if (this.cfg.dynamic && !this.cfg.cache) {
            j.children(".ui-treenode-children").empty()
        }
        this.fireCollapseEvent(h);
        if ($.browser.msie) {
            this.drawConnectors()
        }
    },
    getNodeChildrenContainer: function(b) {
        return b.next(".ui-treenode-children-container").children(".ui-treenode-children")
    },
    selectNode: function(c, d) {
        c.removeClass("ui-treenode-unselected").addClass("ui-treenode-selected").children(".ui-treenode-content").removeClass("ui-state-hover").addClass("ui-state-highlight");
        this.addToSelection(this.getRowKey(c));
        this.writeSelections();
        if (!d) {
            this.fireNodeSelectEvent(c)
        }
    },
    unselectNode: function(d, e) {
        var f = this.getRowKey(d);
        d.removeClass("ui-treenode-selected").addClass("ui-treenode-unselected").children(".ui-treenode-content").removeClass("ui-state-highlight");
        this.removeFromSelection(f);
        this.writeSelections();
        if (!e) {
            this.fireNodeUnselectEvent(d)
        }
    },
    unselectAllNodes: function() {
        this.selections = [];
        this.jq.find(".ui-treenode-content.ui-state-highlight").each(function() {
            $(this).removeClass("ui-state-highlight").closest(".ui-treenode").attr("aria-selected", false)
        })
    },
    preselectCheckbox: function() {
        var b = this;
        this.jq.find(".ui-chkbox-icon").not(".ui-icon-check").each(function() {
            var f = $(this)
              , e = f.closest(".ui-treenode")
              , a = b.getNodeChildrenContainer(e);
            if (a.find(".ui-chkbox-icon.ui-icon-check").length > 0) {
                f.removeClass("ui-icon-blank").addClass("ui-icon-minus")
            }
        })
    },
    toggleCheckboxNode: function(e) {
        var g = this
          , h = e.find("> .ui-treenode-content > .ui-chkbox")
          , f = h.find("> .ui-chkbox-box > .ui-chkbox-icon").hasClass("ui-icon-check");
        this.toggleCheckboxState(h, f);
        if (this.cfg.propagateDown) {
            e.next(".ui-treenode-children-container").find(".ui-chkbox").each(function() {
                g.toggleCheckboxState($(this), f)
            });
            if (this.cfg.dynamic) {
                this.removeDescendantsFromSelection(e.data("rowkey"))
            }
        }
        if (this.cfg.propagateUp) {
            e.parents("td.ui-treenode-children-container").each(function() {
                var c = $(this)
                  , d = c.prev(".ui-treenode-parent")
                  , b = d.find("> .ui-treenode-content > .ui-chkbox")
                  , a = c.find("> .ui-treenode-children > table > tbody > tr > td.ui-treenode");
                if (f) {
                    if (a.filter(".ui-treenode-unselected").length === a.length) {
                        g.uncheck(b)
                    } else {
                        g.partialCheck(b)
                    }
                } else {
                    if (a.filter(".ui-treenode-selected").length === a.length) {
                        g.check(b)
                    } else {
                        g.partialCheck(b)
                    }
                }
            })
        }
        this.writeSelections();
        if (f) {
            this.fireNodeUnselectEvent(e)
        } else {
            this.fireNodeSelectEvent(e)
        }
    },
    check: function(b) {
        this._super(b);
        b.parent(".ui-treenode-content").addClass("ui-state-highlight").removeClass("ui-state-hover")
    },
    uncheck: function(b) {
        this._super(b);
        b.parent(".ui-treenode-content").removeClass("ui-state-highlight")
    },
    drawConnectors: function() {
        this.jq.find("table.ui-treenode-connector-table").each(function() {
            var b = $(this);
            b.height(0).height(b.parent().height())
        })
    },
    isEmpty: function() {
        return this.jq.children("table").length === 0
    },
    focusNode: function(b) {},
    partialCheck: function(i) {
        var f = i.children(".ui-chkbox-box")
          , g = f.children(".ui-chkbox-icon")
          , j = i.closest(".ui-treenode")
          , h = this.getRowKey(j);
        j.find("> .ui-treenode-content").removeClass("ui-state-highlight");
        g.removeClass("ui-icon-blank ui-icon-check").addClass("ui-icon-minus");
        j.removeClass("ui-treenode-selected ui-treenode-unselected").addClass("ui-treenode-hasselected").attr("aria-checked", false).attr("aria-selected", false);
        this.removeFromSelection(h)
    }
});
PrimeFaces.widget.TreeTable = PrimeFaces.widget.DeferredWidget.extend({
    init: function(b) {
        this._super(b);
        this.thead = $(this.jqId + "_head");
        this.tbody = $(this.jqId + "_data");
        this.cfg.expandMode = this.cfg.expandMode || "children";
        this.renderDeferred()
    },
    _render: function() {
        if (this.cfg.scrollable) {
            this.setupScrolling()
        }
        if (this.cfg.resizableColumns) {
            this.setupResizableColumns()
        }
        if (this.cfg.stickyHeader) {
            this.setupStickyHeader()
        }
        if (this.cfg.editable) {
            this.bindEditEvents()
        }
        this.bindEvents()
    },
    refresh: function(b) {
        this.columnWidthsFixed = false;
        this.init(b)
    },
    bindEvents: function() {
        var f = this
          , e = "> tr > td:first-child > .ui-treetable-toggler";
        this.tbody.off("click.treeTable-toggle", e).on("click.treeTable-toggle", e, null, function(a) {
            var b = $(this)
              , c = b.closest("tr");
            if (!c.data("processing")) {
                c.data("processing", true);
                if (b.hasClass("ui-icon-triangle-1-e")) {
                    f.expandNode(c)
                } else {
                    f.collapseNode(c)
                }
            }
        });
        if (this.cfg.selectionMode) {
            this.jqSelection = $(this.jqId + "_selection");
            var d = this.jqSelection.val();
            this.selections = d === "" ? [] : d.split(",");
            this.cfg.disabledTextSelection = this.cfg.disabledTextSelection === false ? false : true;
            this.bindSelectionEvents()
        }
        this.bindSortEvents()
    },
    bindSelectionEvents: function() {
        var f = this
          , e = "> tr.ui-treetable-selectable-node";
        this.tbody.off("mouseover.treeTable mouseout.treeTable click.treeTable", e).on("mouseover.treeTable", e, null, function(a) {
            var b = $(this);
            if (!b.hasClass("ui-state-highlight")) {
                b.addClass("ui-state-hover");
                if (f.isCheckboxSelection() && !f.cfg.nativeElements) {
                    b.find("> td:first-child > div.ui-chkbox > div.ui-chkbox-box").addClass("ui-state-hover")
                }
            }
        }).on("mouseout.treeTable", e, null, function(a) {
            var b = $(this);
            if (!b.hasClass("ui-state-highlight")) {
                b.removeClass("ui-state-hover");
                if (f.isCheckboxSelection() && !f.cfg.nativeElements) {
                    b.find("> td:first-child > div.ui-chkbox > div.ui-chkbox-box").removeClass("ui-state-hover")
                }
            }
        }).on("click.treeTable", e, null, function(a) {
            f.onRowClick(a, $(this))
        });
        if (this.isCheckboxSelection()) {
            var d = this.cfg.nativeElements ? "> tr.ui-treetable-selectable-node > td:first-child :checkbox" : "> tr.ui-treetable-selectable-node > td:first-child div.ui-chkbox-box";
            this.tbody.off("click.treeTable-checkbox", d).on("click.treeTable-checkbox", d, null, function(a) {
                var b = $(this).closest("tr.ui-treetable-selectable-node");
                f.toggleCheckboxNode(b)
            });
            if (this.cfg.nativeElements) {
                this.indeterminateNodes(this.tbody.children("tr.ui-treetable-partialselected"))
            }
        }
    },
    bindSortEvents: function() {
        var b = this;
        this.sortableColumns = this.thead.find("> tr > th.ui-sortable-column");
        this.sortableColumns.filter(".ui-state-active").each(function() {
            var f = $(this)
              , e = f.children("span.ui-sortable-column-icon")
              , a = null;
            if (e.hasClass("ui-icon-triangle-1-n")) {
                a = "ASCENDING"
            } else {
                a = "DESCENDING"
            }
            f.data("sortorder", a)
        });
        this.sortableColumns.on("mouseenter.treeTable", function() {
            var a = $(this);
            if (!a.hasClass("ui-state-active")) {
                a.addClass("ui-state-hover")
            }
        }).on("mouseleave.treeTable", function() {
            var a = $(this);
            if (!a.hasClass("ui-state-active")) {
                a.removeClass("ui-state-hover")
            }
        }).on("click.treeTable", function(e) {
            if ($(e.target).is("th,span:not(.ui-c)")) {
                PrimeFaces.clearSelection();
                var f = $(this)
                  , a = f.data("sortorder") || "DESCENDING";
                if (a === "ASCENDING") {
                    a = "DESCENDING"
                } else {
                    if (a === "DESCENDING") {
                        a = "ASCENDING"
                    }
                }
                b.sort(f, a)
            }
        })
    },
    setupStickyHeader: function() {
        var g = this.thead.parent()
          , i = g.offset()
          , k = $(window)
          , l = this
          , j = "scroll." + this.id
          , h = "resize.sticky-" + this.id;
        this.stickyContainer = $('<div class="ui-treetable ui-treetable-sticky ui-widget"><table></table></div>');
        this.clone = this.thead.clone(false);
        this.stickyContainer.children("table").append(this.thead);
        g.append(this.clone);
        this.stickyContainer.css({
            position: "absolute",
            width: g.outerWidth(),
            top: i.top,
            left: i.left,
            "z-index": ++PrimeFaces.zindex
        });
        this.jq.prepend(this.stickyContainer);
        if (this.cfg.resizableColumns) {
            this.relativeHeight = 0
        }
        k.off(j).on(j, function() {
            var a = k.scrollTop()
              , b = g.offset();
            if (a > b.top) {
                l.stickyContainer.css({
                    position: "fixed",
                    top: "0px"
                }).addClass("ui-shadow ui-sticky");
                if (l.cfg.resizableColumns) {
                    l.relativeHeight = a - b.top
                }
                if (a >= (b.top + l.tbody.height())) {
                    l.stickyContainer.hide()
                } else {
                    l.stickyContainer.show()
                }
            } else {
                l.stickyContainer.css({
                    position: "absolute",
                    top: b.top
                }).removeClass("ui-shadow ui-sticky");
                if (l.stickyContainer.is(":hidden")) {
                    l.stickyContainer.show()
                }
                if (l.cfg.resizableColumns) {
                    l.relativeHeight = 0
                }
            }
        }).off(h).on(h, function() {
            l.stickyContainer.width(g.outerWidth())
        })
    },
    bindEditEvents: function() {
        var f = this;
        this.cfg.cellSeparator = this.cfg.cellSeparator || " ";
        if (this.cfg.editMode === "row") {
            var e = "> tr > td > div.ui-row-editor";
            this.tbody.off("click.treetable", e).on("click.treetable", e, null, function(b) {
                var c = $(b.target)
                  , a = c.closest("tr");
                if (c.hasClass("ui-icon-pencil")) {
                    f.switchToRowEdit(a);
                    c.hide().siblings().show()
                } else {
                    if (c.hasClass("ui-icon-check")) {
                        f.saveRowEdit(a)
                    } else {
                        if (c.hasClass("ui-icon-close")) {
                            f.cancelRowEdit(a)
                        }
                    }
                }
            })
        } else {
            if (this.cfg.editMode === "cell") {
                var d = "> tr > td.ui-editable-column";
                this.tbody.off("click.treetable-cell", d).on("click.treetable-cell", d, null, function(a) {
                    if (!$(a.target).is("span.ui-c")) {
                        f.incellClick = true;
                        var b = $(this);
                        if (!b.hasClass("ui-cell-editing")) {
                            f.showCellEditor($(this))
                        }
                    }
                });
                $(document).off("click.treetable-cell-blur" + this.id).on("click.treetable-cell-blur" + this.id, function(a) {
                    if ((!f.incellClick && f.currentCell && !f.contextMenuClick)) {
                        f.saveCell(f.currentCell)
                    }
                    f.incellClick = false;
                    f.contextMenuClick = false
                })
            }
        }
    },
    sort: function(i, g) {
        var h = this
          , f = {
            source: this.id,
            update: this.id,
            process: this.id,
            params: [{
                name: this.id + "_sorting",
                value: true
            }, {
                name: this.id + "_sortKey",
                value: i.attr("id")
            }, {
                name: this.id + "_sortDir",
                value: g
            }],
            onsuccess: function(a, c, b) {
                PrimeFaces.ajax.Response.handle(a, c, b, {
                    widget: h,
                    handle: function(e) {
                        this.tbody.html(e);
                        i.siblings().filter(".ui-state-active").removeData("sortorder").removeClass("ui-state-active").find(".ui-sortable-column-icon").removeClass("ui-icon-triangle-1-n ui-icon-triangle-1-s");
                        i.removeClass("ui-state-hover").addClass("ui-state-active").data("sortorder", g);
                        var d = i.find(".ui-sortable-column-icon");
                        if (g === "DESCENDING") {
                            d.removeClass("ui-icon-triangle-1-n").addClass("ui-icon-triangle-1-s")
                        } else {
                            if (g === "ASCENDING") {
                                d.removeClass("ui-icon-triangle-1-s").addClass("ui-icon-triangle-1-n")
                            }
                        }
                    }
                });
                return true
            },
            oncomplete: function(a, c, b) {
                if (h.cfg.selectionMode && b.selection) {
                    h.selections = b.selection.split(",");
                    h.writeSelections()
                }
            }
        };
        if (this.hasBehavior("sort")) {
            var j = this.cfg.behaviors.sort;
            j.call(this, f)
        } else {
            PrimeFaces.ajax.Request.handle(f)
        }
    },
    expandNode: function(j) {
        var i = this
          , f = j.attr("data-rk")
          , g = {
            source: this.id,
            process: this.id,
            update: this.id,
            params: [{
                name: this.id + "_expand",
                value: f
            }],
            onsuccess: function(a, c, b) {
                PrimeFaces.ajax.Response.handle(a, c, b, {
                    widget: i,
                    handle: function(d) {
                        if (i.cfg.expandMode === "self") {
                            j.replaceWith(d)
                        } else {
                            j.after(d)
                        }
                        j.find(".ui-treetable-toggler:first").addClass("ui-icon-triangle-1-s").removeClass("ui-icon-triangle-1-e");
                        j.attr("aria-expanded", true);
                        i.indeterminateNodes(i.tbody.children("tr.ui-treetable-partialselected"));
                        if (this.cfg.scrollable) {
                            this.alignScrollBody()
                        }
                    }
                });
                return true
            },
            oncomplete: function() {
                j.data("processing", false)
            }
        };
        if (this.hasBehavior("expand")) {
            var h = this.cfg.behaviors.expand;
            h.call(this, g)
        } else {
            PrimeFaces.ajax.Request.handle(g)
        }
    },
    collapseNode: function(l) {
        var o = l.attr("data-rk")
          , k = l.nextAll();
        for (var n = 0; n < k.length; n++) {
            var i = k.eq(n)
              , p = i.attr("data-rk");
            if (p.indexOf(o) !== -1) {
                i.remove()
            } else {
                break
            }
        }
        l.attr("aria-expanded", false).find(".ui-treetable-toggler:first").addClass("ui-icon-triangle-1-e").removeClass("ui-icon-triangle-1-s");
        l.data("processing", false);
        if (this.cfg.scrollable) {
            this.alignScrollBody()
        }
        if (this.hasBehavior("collapse")) {
            var j = this.cfg.behaviors.collapse
              , o = l.attr("data-rk");
            var m = {
                params: [{
                    name: this.id + "_collapse",
                    value: o
                }]
            };
            j.call(this, m)
        }
    },
    onRowClick: function(i, j) {
        if ($(i.target).is("td,span:not(.ui-c)")) {
            var f = j.hasClass("ui-state-highlight")
              , h = i.metaKey || i.ctrlKey
              , g = i.shiftKey;
            if (this.isCheckboxSelection()) {
                this.toggleCheckboxNode(j)
            } else {
                if (f && h) {
                    this.unselectNode(j)
                } else {
                    if (this.isSingleSelection() || (this.isMultipleSelection() && !h)) {
                        this.unselectAllNodes()
                    }
                    if (this.isMultipleSelection() && g) {
                        this.selectNodesInRange(j)
                    } else {
                        this.selectNode(j);
                        this.cursorNode = j
                    }
                }
            }
            if (this.cfg.disabledTextSelection) {
                PrimeFaces.clearSelection()
            }
        }
    },
    onRowRightClick: function(f, d) {
        var e = d.hasClass("ui-state-highlight");
        if (this.isCheckboxSelection()) {
            if (!e) {
                this.toggleCheckboxNode(d)
            }
        } else {
            if (this.isSingleSelection() || !e) {
                this.unselectAllNodes()
            }
            this.selectNode(d)
        }
        if (this.cfg.disabledTextSelection) {
            PrimeFaces.clearSelection()
        }
    },
    selectNode: function(f, e) {
        var d = f.attr("data-rk");
        f.removeClass("ui-state-hover ui-treetable-partialselected").addClass("ui-state-highlight").attr("aria-selected", true);
        this.addToSelection(d);
        this.writeSelections();
        if (this.isCheckboxSelection()) {
            if (this.cfg.nativeElements) {
                f.find("> td:first-child > :checkbox").prop("checked", true).prop("indeterminate", false)
            } else {
                f.find("> td:first-child > div.ui-chkbox > div.ui-chkbox-box").removeClass("ui-state-hover").children("span.ui-chkbox-icon").removeClass("ui-icon-blank ui-icon-minus").addClass("ui-icon-check")
            }
        }
        if (!e) {
            this.fireSelectNodeEvent(d)
        }
    },
    unselectNode: function(f, e) {
        var d = f.attr("data-rk");
        f.removeClass("ui-state-highlight ui-treetable-partialselected").attr("aria-selected", false);
        this.removeSelection(d);
        this.writeSelections();
        if (this.isCheckboxSelection()) {
            if (this.cfg.nativeElements) {
                f.find("> td:first-child > :checkbox").prop("checked", false).prop("indeterminate", false)
            } else {
                f.find("> td:first-child > div.ui-chkbox > div.ui-chkbox-box > span.ui-chkbox-icon").addClass("ui-icon-blank").removeClass("ui-icon-check ui-icon-minus")
            }
        }
        if (!e) {
            this.fireUnselectNodeEvent(d)
        }
    },
    unselectAllNodes: function() {
        var c = this.tbody.children("tr.ui-state-highlight");
        for (var d = 0; d < c.length; d++) {
            this.unselectNode(c.eq(d), true)
        }
        this.selections = [];
        this.writeSelections()
    },
    selectNodesInRange: function(m) {
        if (this.cursorNode) {
            this.unselectAllNodes();
            var j = m.index()
              , n = this.cursorNode.index()
              , k = (j > n) ? n : j
              , l = (j > n) ? (j + 1) : (n + 1)
              , i = this.tbody.children();
            for (var h = k; h < l; h++) {
                this.selectNode(i.eq(h), true)
            }
        } else {
            this.selectNode(m)
        }
    },
    indeterminateNodes: function(d) {
        for (var c = 0; c < d.length; c++) {
            d.eq(c).find("> td:first-child > :checkbox").prop("indeterminate", true)
        }
    },
    toggleCheckboxNode: function(l) {
        var m = l.hasClass("ui-state-highlight")
          , j = l.data("rk");
        if (m) {
            this.unselectNode(l, true)
        } else {
            this.selectNode(l, true)
        }
        var k = this.getDescendants(l);
        for (var h = 0; h < k.length; h++) {
            var n = k[h];
            if (m) {
                this.unselectNode(n, true)
            } else {
                this.selectNode(n, true)
            }
        }
        if (m) {
            this.removeDescendantsFromSelection(l.data("rk"))
        }
        var i = this.getParent(l);
        if (i) {
            this.propagateUp(i)
        }
        this.writeSelections();
        if (m) {
            this.fireUnselectNodeEvent(j)
        } else {
            this.fireSelectNodeEvent(j)
        }
    },
    getDescendants: function(l) {
        var n = l.attr("data-rk")
          , j = l.nextAll()
          , k = [];
        for (var m = 0; m < j.length; m++) {
            var i = j.eq(m)
              , h = i.attr("data-rk");
            if (h.indexOf(n) != -1) {
                k.push(i)
            } else {
                break
            }
        }
        return k
    },
    getChildren: function(k) {
        var n = k.attr("data-rk")
          , j = k.nextAll()
          , l = [];
        for (var m = 0; m < j.length; m++) {
            var i = j.eq(m)
              , h = i.attr("data-prk");
            if (h === n) {
                l.push(i)
            }
        }
        return l
    },
    propagateUp: function(o) {
        var q = this.getChildren(o)
          , i = true
          , m = false
          , l = this.cfg.nativeElements ? o.find("> td:first-child > :checkbox") : o.find("> td:first-child > div.ui-chkbox > div.ui-chkbox-box > span.ui-chkbox-icon");
        for (var n = 0; n < q.length; n++) {
            var r = q[n]
              , p = r.hasClass("ui-state-highlight");
            i = i && p;
            m = m || p || r.hasClass("ui-treetable-partialselected")
        }
        if (i) {
            o.removeClass("ui-treetable-partialselected");
            this.selectNode(o, true)
        } else {
            if (m) {
                o.removeClass("ui-state-highlight").addClass("ui-treetable-partialselected");
                if (this.cfg.nativeElements) {
                    l.prop("indeterminate", true)
                } else {
                    l.removeClass("ui-icon-blank ui-icon-check").addClass("ui-icon-minus")
                }
                this.removeSelection(o.attr("data-rk"))
            } else {
                o.removeClass("ui-state-highlight ui-treetable-partialselected");
                if (this.cfg.nativeElements) {
                    l.prop("indeterminate", false).prop("checked", false)
                } else {
                    l.addClass("ui-icon-blank").removeClass("ui-icon-check ui-icon-minus")
                }
                this.removeSelection(o.attr("data-rk"))
            }
        }
        var k = this.getParent(o);
        if (k) {
            this.propagateUp(k)
        }
    },
    getParent: function(c) {
        var d = $(this.jqId + "_node_" + c.attr("data-prk"));
        return d.length === 1 ? d : null
    },
    hasBehavior: function(b) {
        if (this.cfg.behaviors) {
            return this.cfg.behaviors[b] != undefined
        }
        return false
    },
    removeDescendantsFromSelection: function(b) {
        this.selections = $.grep(this.selections, function(a) {
            return a.indexOf(b + "_") !== 0
        })
    },
    removeSelection: function(b) {
        this.selections = $.grep(this.selections, function(a) {
            return a !== b
        })
    },
    addToSelection: function(b) {
        if (!this.isSelected(b)) {
            this.selections.push(b)
        }
    },
    isSelected: function(b) {
        return PrimeFaces.inArray(this.selections, b)
    },
    isSingleSelection: function() {
        return this.cfg.selectionMode == "single"
    },
    isMultipleSelection: function() {
        return this.cfg.selectionMode == "multiple"
    },
    isCheckboxSelection: function() {
        return this.cfg.selectionMode == "checkbox"
    },
    writeSelections: function() {
        this.jqSelection.val(this.selections.join(","))
    },
    fireSelectNodeEvent: function(f) {
        if (this.isCheckboxSelection()) {
            var h = this
              , g = {
                source: this.id,
                process: this.id
            };
            g.params = [{
                name: this.id + "_instantSelection",
                value: f
            }];
            g.oncomplete = function(a, e, d) {
                if (d.descendantRowKeys && d.descendantRowKeys !== "") {
                    var b = d.descendantRowKeys.split(",");
                    for (var c = 0; c < b.length; c++) {
                        h.addToSelection(b[c])
                    }
                    h.writeSelections()
                }
            }
            ;
            if (this.hasBehavior("select")) {
                var i = this.cfg.behaviors.select;
                i.call(this, g)
            } else {
                PrimeFaces.ajax.AjaxRequest(g)
            }
        } else {
            if (this.hasBehavior("select")) {
                var i = this.cfg.behaviors.select
                  , j = {
                    params: [{
                        name: this.id + "_instantSelection",
                        value: f
                    }]
                };
                i.call(this, j)
            }
        }
    },
    fireUnselectNodeEvent: function(d) {
        if (this.hasBehavior("unselect")) {
            var e = this.cfg.behaviors.unselect
              , f = {
                params: [{
                    name: this.id + "_instantUnselection",
                    value: d
                }]
            };
            e.call(this, f)
        }
    },
    setupScrolling: function() {
        this.scrollHeader = this.jq.children("div.ui-treetable-scrollable-header");
        this.scrollBody = this.jq.children("div.ui-treetable-scrollable-body");
        this.scrollFooter = this.jq.children("div.ui-treetable-scrollable-footer");
        this.scrollStateHolder = $(this.jqId + "_scrollState");
        this.scrollHeaderBox = this.scrollHeader.children("div.ui-treetable-scrollable-header-box");
        this.scrollFooterBox = this.scrollFooter.children("div.ui-treetable-scrollable-footer-box");
        this.headerTable = this.scrollHeaderBox.children("table");
        this.bodyTable = this.scrollBody.children("table");
        this.footerTable = this.scrollFooterBox.children("table");
        this.headerCols = this.headerTable.find("> thead > tr > th");
        this.footerCols = this.footerTable.find("> tfoot > tr > td");
        var f = this;
        if (this.cfg.scrollHeight) {
            if (this.cfg.scrollHeight.indexOf("%") !== -1) {
                this.adjustScrollHeight()
            }
            var d = this.getScrollbarWidth() + "px";
            this.scrollHeaderBox.css("margin-right", d);
            this.scrollFooterBox.css("margin-right", d);
            this.alignScrollBody()
        }
        this.fixColumnWidths();
        if (this.cfg.scrollWidth) {
            if (this.cfg.scrollWidth.indexOf("%") !== -1) {
                this.adjustScrollWidth()
            } else {
                this.setScrollWidth(parseInt(this.cfg.scrollWidth))
            }
        }
        this.cloneHead();
        this.restoreScrollState();
        this.scrollBody.scroll(function() {
            var a = f.scrollBody.scrollLeft();
            f.scrollHeaderBox.css("margin-left", -a);
            f.scrollFooterBox.css("margin-left", -a);
            f.saveScrollState()
        });
        this.scrollHeader.on("scroll.treeTable", function() {
            f.scrollHeader.scrollLeft(0)
        });
        this.scrollFooter.on("scroll.treeTable", function() {
            f.scrollFooter.scrollLeft(0)
        });
        var e = "resize." + this.id;
        $(window).unbind(e).bind(e, function() {
            if (f.jq.is(":visible")) {
                if (f.percentageScrollHeight) {
                    f.adjustScrollHeight()
                }
                if (f.percentageScrollWidth) {
                    f.adjustScrollWidth()
                }
            }
        })
    },
    cloneHead: function() {
        this.theadClone = this.headerTable.children("thead").clone();
        this.theadClone.find("th").each(function() {
            var b = $(this);
            b.attr("id", b.attr("id") + "_clone")
        });
        this.theadClone.removeAttr("id").addClass("ui-treetable-scrollable-theadclone").height(0).prependTo(this.bodyTable)
    },
    fixColumnWidths: function() {
        var b = this;
        if (!this.columnWidthsFixed) {
            if (this.cfg.scrollable) {
                this.headerCols.each(function() {
                    var f = $(this)
                      , a = f.index()
                      , h = f.width();
                    f.width(h);
                    if (b.footerCols.length > 0) {
                        var g = b.footerCols.eq(a);
                        g.width(h)
                    }
                })
            } else {
                this.jq.find("> table > thead > tr > th").each(function() {
                    var a = $(this);
                    a.width(a.width())
                })
            }
            this.columnWidthsFixed = true
        }
    },
    adjustScrollHeight: function() {
        var i = this.jq.parent().innerHeight() * (parseInt(this.cfg.scrollHeight) / 100)
          , h = this.jq.children(".ui-treetable-header").outerHeight(true)
          , f = this.jq.children(".ui-treetable-footer").outerHeight(true)
          , j = (this.scrollHeader.outerHeight(true) + this.scrollFooter.outerHeight(true))
          , g = (i - (j + h + f));
        this.scrollBody.height(g)
    },
    adjustScrollWidth: function() {
        var b = parseInt((this.jq.parent().innerWidth() * (parseInt(this.cfg.scrollWidth) / 100)));
        this.setScrollWidth(b)
    },
    setOuterWidth: function(e, d) {
        var f = e.outerWidth() - e.width();
        e.width(d - f)
    },
    hasVerticalOverflow: function() {
        return (this.cfg.scrollHeight && this.bodyTable.outerHeight() > this.scrollBody.outerHeight())
    },
    setScrollWidth: function(d) {
        var c = this;
        this.jq.children(".ui-widget-header").each(function() {
            c.setOuterWidth($(this), d)
        });
        this.scrollHeader.width(d);
        this.scrollBody.css("padding-right", 0).width(d);
        this.scrollFooter.width(d)
    },
    alignScrollBody: function() {
        if (!this.cfg.scrollWidth) {
            if (this.hasVerticalOverflow()) {
                this.scrollBody.css("padding-right", 0)
            } else {
                this.scrollBody.css("padding-right", this.getScrollbarWidth())
            }
        }
    },
    getScrollbarWidth: function() {
        return $.browser.webkit ? "15" : PrimeFaces.calculateScrollbarWidth()
    },
    restoreScrollState: function() {
        var d = this.scrollStateHolder.val()
          , c = d.split(",");
        this.scrollBody.scrollLeft(c[0]);
        this.scrollBody.scrollTop(c[1])
    },
    saveScrollState: function() {
        var b = this.scrollBody.scrollLeft() + "," + this.scrollBody.scrollTop();
        this.scrollStateHolder.val(b)
    },
    setupResizableColumns: function() {
        this.fixColumnWidths();
        if (!this.cfg.liveResize) {
            this.resizerHelper = $('<div class="ui-column-resizer-helper ui-state-highlight"></div>').appendTo(this.jq)
        }
        this.thead.find("> tr > th.ui-resizable-column:not(:last-child)").prepend('<span class="ui-column-resizer">&nbsp;</span>');
        var d = this.thead.find("> tr > th > span.ui-column-resizer")
          , c = this;
        d.draggable({
            axis: "x",
            start: function() {
                if (c.cfg.liveResize) {
                    c.jq.css("cursor", "col-resize")
                } else {
                    var a = c.cfg.stickyHeader ? c.clone : c.thead
                      , b = c.cfg.scrollable ? c.scrollBody.height() : a.parent().height() - a.height() - 1;
                    if (c.cfg.stickyHeader) {
                        b = b - c.relativeHeight
                    }
                    c.resizerHelper.height(b);
                    c.resizerHelper.show()
                }
            },
            drag: function(b, a) {
                if (c.cfg.liveResize) {
                    c.resize(b, a)
                } else {
                    c.resizerHelper.offset({
                        left: a.helper.offset().left + a.helper.width() / 2,
                        top: c.thead.offset().top + c.thead.height()
                    })
                }
            },
            stop: function(g, a) {
                var b = a.helper.parent();
                a.helper.css("left", "");
                if (c.cfg.liveResize) {
                    c.jq.css("cursor", "default")
                } else {
                    c.resize(g, a);
                    c.resizerHelper.hide()
                }
                var h = {
                    source: c.id,
                    process: c.id,
                    params: [{
                        name: c.id + "_colResize",
                        value: true
                    }, {
                        name: c.id + "_columnId",
                        value: b.attr("id")
                    }, {
                        name: c.id + "_width",
                        value: b.width()
                    }, {
                        name: c.id + "_height",
                        value: b.height()
                    }]
                };
                if (c.hasBehavior("colResize")) {
                    c.cfg.behaviors.colResize.call(c, h)
                }
                if (c.cfg.stickyHeader) {
                    c.reclone()
                }
            },
            containment: this.jq
        })
    },
    resize: function(t, l) {
        var r = l.helper.parent()
          , p = r.next()
          , m = null
          , q = null
          , o = null;
        if (this.cfg.liveResize) {
            m = r.outerWidth() - (t.pageX - r.offset().left),
            q = (r.width() - m),
            o = (p.width() + m)
        } else {
            m = (l.position.left - l.originalPosition.left),
            q = (r.width() + m),
            o = (p.width() - m)
        }
        if (q > 15 && o > 15) {
            r.width(q);
            p.width(o);
            var k = r.index();
            if (this.cfg.scrollable) {
                this.theadClone.find(PrimeFaces.escapeClientId(r.attr("id") + "_clone")).width(q);
                this.theadClone.find(PrimeFaces.escapeClientId(p.attr("id") + "_clone")).width(o);
                if (this.footerCols.length > 0) {
                    var n = this.footerCols.eq(k)
                      , s = n.next();
                    n.width(q);
                    s.width(o)
                }
            }
        }
    },
    reclone: function() {
        this.clone.remove();
        this.clone = this.thead.clone(false);
        this.jq.children("table").append(this.clone)
    },
    switchToRowEdit: function(h) {
        this.showRowEditors(h);
        if (this.hasBehavior("rowEditInit")) {
            var e = this.cfg.behaviors.rowEditInit
              , g = h.data("rk");
            var f = {
                params: [{
                    name: this.id + "_rowEditIndex",
                    value: g
                }]
            };
            e.call(this, f)
        }
    },
    showRowEditors: function(b) {
        b.addClass("ui-state-highlight ui-row-editing").children("td.ui-editable-column").each(function() {
            var a = $(this);
            a.find(".ui-cell-editor-output").hide();
            a.find(".ui-cell-editor-input").show()
        })
    },
    saveRowEdit: function(b) {
        this.doRowEditRequest(b, "save")
    },
    cancelRowEdit: function(b) {
        this.doRowEditRequest(b, "cancel")
    },
    doRowEditRequest: function(i, m) {
        var k = i.closest("tr")
          , j = k.data("rk")
          , h = k.hasClass("ui-expanded-row")
          , l = this
          , n = {
            source: this.id,
            process: this.id,
            update: this.id,
            formId: this.cfg.formId,
            params: [{
                name: this.id + "_rowEditIndex",
                value: j
            }, {
                name: this.id + "_rowEditAction",
                value: m
            }],
            onsuccess: function(a, c, b) {
                PrimeFaces.ajax.Response.handle(a, c, b, {
                    widget: l,
                    handle: function(d) {
                        if (h) {
                            this.collapseRow(k)
                        }
                        this.updateRows(k, d)
                    }
                });
                return true
            },
            oncomplete: function(a, c, b) {
                if (b && b.validationFailed) {
                    l.invalidateRow(j)
                }
            }
        };
        if (m === "save") {
            this.getRowEditors(k).each(function() {
                n.params.push({
                    name: this.id,
                    value: this.id
                })
            })
        }
        if (m === "save" && this.hasBehavior("rowEdit")) {
            this.cfg.behaviors.rowEdit.call(this, n)
        } else {
            if (m === "cancel" && this.hasBehavior("rowEditCancel")) {
                this.cfg.behaviors.rowEditCancel.call(this, n)
            } else {
                PrimeFaces.ajax.Request.handle(n)
            }
        }
    },
    updateRows: function(c, d) {
        this.tbody.children("tr").filter('[data-prk^="' + c.data("rk") + '"]').remove();
        c.replaceWith(d)
    },
    invalidateRow: function(b) {
        this.tbody.children("tr").eq(b).addClass("ui-widget-content ui-row-editing ui-state-error")
    },
    getRowEditors: function(b) {
        return b.find("div.ui-cell-editor")
    },
    collapseRow: function(b) {
        b.removeClass("ui-expanded-row").next(".ui-expanded-row-content").remove()
    },
    showCellEditor: function(o) {
        this.incellClick = true;
        var i = null
          , n = this;
        if (o) {
            i = o;
            if (this.contextMenuCell) {
                this.contextMenuCell.parent().removeClass("ui-state-highlight")
            }
        } else {
            i = this.contextMenuCell
        }
        if (this.currentCell) {
            n.saveCell(this.currentCell)
        }
        this.currentCell = i;
        var s = i.children("div.ui-cell-editor")
          , t = s.children("div.ui-cell-editor-output")
          , c = s.children("div.ui-cell-editor-input")
          , q = c.find(":input:enabled")
          , p = q.length > 1;
        i.addClass("ui-state-highlight ui-cell-editing");
        t.hide();
        c.show();
        q.eq(0).focus().select();
        if (p) {
            var m = [];
            for (var r = 0; r < q.length; r++) {
                m.push(q.eq(r).val())
            }
            i.data("multi-edit", true);
            i.data("old-value", m)
        } else {
            i.data("multi-edit", false);
            i.data("old-value", q.eq(0).val())
        }
        if (!i.data("edit-events-bound")) {
            i.data("edit-events-bound", true);
            q.on("keydown.treetable-cell", function(e) {
                var g = $.ui.keyCode
                  , a = e.shiftKey
                  , b = e.which
                  , f = $(this);
                if (b === g.ENTER || b == g.NUMPAD_ENTER) {
                    n.saveCell(i);
                    e.preventDefault()
                } else {
                    if (b === g.TAB) {
                        if (p) {
                            var d = a ? f.index() - 1 : f.index() + 1;
                            if (d < 0 || (d === q.length)) {
                                n.tabCell(i, !a)
                            } else {
                                q.eq(d).focus()
                            }
                        } else {
                            n.tabCell(i, !a)
                        }
                        e.preventDefault()
                    }
                }
            }).on("focus.treetable-cell click.treetable-cell", function(a) {
                n.currentCell = i
            })
        }
    },
    tabCell: function(f, g) {
        var e = g ? f.next() : f.prev();
        if (e.length == 0) {
            var h = g ? f.parent().next() : f.parent().prev();
            e = g ? h.children("td.ui-editable-column:first") : h.children("td.ui-editable-column:last")
        }
        this.showCellEditor(e)
    },
    saveCell: function(h) {
        var l = h.find("div.ui-cell-editor-input :input:enabled")
          , i = false
          , j = this;
        if (h.data("multi-edit")) {
            var g = h.data("old-value");
            for (var k = 0; k < l.length; k++) {
                if (l.eq(k).val() != g[k]) {
                    i = true;
                    break
                }
            }
        } else {
            i = (l.eq(0).val() != h.data("old-value"))
        }
        if (i) {
            j.doCellEditRequest(h)
        } else {
            j.viewMode(h)
        }
        this.currentCell = null
    },
    viewMode: function(f) {
        var e = f.children("div.ui-cell-editor")
          , g = e.children("div.ui-cell-editor-input")
          , h = e.children("div.ui-cell-editor-output");
        f.removeClass("ui-cell-editing ui-state-error ui-state-highlight");
        h.show();
        g.hide();
        f.removeData("old-value").removeData("multi-edit")
    },
    doCellEditRequest: function(i) {
        var l = i.children(".ui-cell-editor")
          , k = l.attr("id")
          , m = i.index()
          , n = i.closest("tr").data("rk") + "," + m
          , j = this;
        var h = {
            source: this.id,
            process: this.id,
            update: this.id,
            params: [{
                name: this.id + "_cellInfo",
                value: n
            }, {
                name: k,
                value: k
            }],
            onsuccess: function(a, c, b) {
                PrimeFaces.ajax.Response.handle(a, c, b, {
                    widget: j,
                    handle: function(d) {
                        l.children(".ui-cell-editor-output").html(d)
                    }
                });
                return true
            },
            oncomplete: function(a, c, b) {
                if (b.validationFailed) {
                    i.addClass("ui-state-error")
                } else {
                    j.viewMode(i)
                }
            }
        };
        if (this.hasBehavior("cellEdit")) {
            this.cfg.behaviors.cellEdit.call(this, h)
        } else {
            PrimeFaces.ajax.Request.handle(h)
        }
    }
});
PrimeFaces.widget.Wizard = PrimeFaces.widget.BaseWidget.extend({
    init: function(d) {
        this._super(d);
        this.content = $(this.jqId + "_content");
        this.backNav = $(this.jqId + "_back");
        this.nextNav = $(this.jqId + "_next");
        this.cfg.formId = this.jq.parents("form:first").attr("id");
        this.currentStep = this.cfg.initialStep;
        var e = this;
        if (this.cfg.showStepStatus) {
            this.stepControls = $(this.jqId + " .ui-wizard-step-titles li.ui-wizard-step-title")
        }
        if (this.cfg.showNavBar) {
            var f = this.getStepIndex(this.currentStep);
            PrimeFaces.skinButton(this.backNav);
            PrimeFaces.skinButton(this.nextNav);
            this.backNav.click(function() {
                e.back()
            });
            this.nextNav.click(function() {
                e.next()
            });
            if (f == 0) {
                this.backNav.hide()
            } else {
                if (f == this.cfg.steps.length - 1) {
                    this.nextNav.hide()
                }
            }
        }
    },
    back: function() {
        if (this.cfg.onback) {
            var f = this.cfg.onback.call(this);
            if (f === false) {
                return
            }
        }
        var e = this.getStepIndex(this.currentStep) - 1;
        if (e >= 0) {
            var d = this.cfg.steps[e];
            this.loadStep(d, true)
        }
    },
    next: function() {
        if (this.cfg.onnext) {
            var f = this.cfg.onnext.call(this);
            if (f === false) {
                return
            }
        }
        var e = this.getStepIndex(this.currentStep) + 1;
        if (e < this.cfg.steps.length) {
            var d = this.cfg.steps[e];
            this.loadStep(d, false)
        }
    },
    loadStep: function(h, e) {
        var g = this
          , f = {
            source: this.id,
            process: this.id,
            update: this.id,
            formId: this.cfg.formId,
            params: [{
                name: this.id + "_wizardRequest",
                value: true
            }, {
                name: this.id + "_stepToGo",
                value: h
            }],
            onsuccess: function(a, c, b) {
                PrimeFaces.ajax.Response.handle(a, c, b, {
                    widget: g,
                    handle: function(d) {
                        this.content.html(d)
                    }
                });
                return true
            },
            oncomplete: function(a, d, c) {
                g.currentStep = c.currentStep;
                if (!c.validationFailed) {
                    var b = g.getStepIndex(g.currentStep);
                    if (g.cfg.showNavBar) {
                        if (b === g.cfg.steps.length - 1) {
                            g.hideNextNav();
                            g.showBackNav()
                        } else {
                            if (b === 0) {
                                g.hideBackNav();
                                g.showNextNav()
                            } else {
                                g.showBackNav();
                                g.showNextNav()
                            }
                        }
                    }
                    if (g.cfg.showStepStatus) {
                        g.stepControls.removeClass("ui-state-highlight");
                        $(g.stepControls.get(b)).addClass("ui-state-highlight")
                    }
                }
            }
        };
        if (e) {
            f.params.push({
                name: this.id + "_backRequest",
                value: true
            })
        }
        PrimeFaces.ajax.Request.handle(f)
    },
    getStepIndex: function(c) {
        for (var d = 0; d < this.cfg.steps.length; d++) {
            if (this.cfg.steps[d] == c) {
                return d
            }
        }
        return -1
    },
    showNextNav: function() {
        this.nextNav.fadeIn()
    },
    hideNextNav: function() {
        this.nextNav.fadeOut()
    },
    showBackNav: function() {
        this.backNav.fadeIn()
    },
    hideBackNav: function() {
        this.backNav.fadeOut()
    }
});
PrimeFaces.widget.TriStateCheckbox = PrimeFaces.widget.BaseWidget.extend({
    init: function(c) {
        this._super(c);
        this.input = $(this.jqId + "_input");
        this.box = this.jq.find(".ui-chkbox-box");
        this.icon = this.box.children(".ui-chkbox-icon");
        this.itemLabel = this.jq.find(".ui-chkbox-label");
        this.disabled = this.input.is(":disabled");
        this.fixedMod = function(a, b) {
            return ((a % b) + b) % b
        }
        ;
        var d = this;
        if (!this.disabled) {
            this.box.mouseover(function() {
                d.box.addClass("ui-state-hover")
            }).mouseout(function() {
                d.box.removeClass("ui-state-hover")
            }).click(function(a) {
                d.toggle(1);
                if (a.preventDefault) {
                    a.preventDefault()
                } else {
                    a.returnValue = false
                }
            });
            this.itemLabel.click(function() {
                d.toggle(1);
                if (event.preventDefault) {
                    event.preventDefault()
                } else {
                    event.returnValue = false
                }
            });
            this.box.bind("keydown", function(a) {
                switch (a.keyCode) {
                case 38:
                    d.toggle(1);
                    if (a.preventDefault) {
                        a.preventDefault()
                    } else {
                        a.returnValue = false
                    }
                    break;
                case 40:
                    d.toggle(-1);
                    if (a.preventDefault) {
                        a.preventDefault()
                    } else {
                        a.returnValue = false
                    }
                    break;
                case 39:
                    d.toggle(1);
                    if (a.preventDefault) {
                        a.preventDefault()
                    } else {
                        a.returnValue = false
                    }
                    break;
                case 37:
                    d.toggle(-1);
                    if (a.preventDefault) {
                        a.preventDefault()
                    } else {
                        a.returnValue = false
                    }
                    break;
                case 32:
                    d.toggle(1);
                    if (a.preventDefault) {
                        a.preventDefault()
                    } else {
                        a.returnValue = false
                    }
                    break
                }
            });
            if (this.cfg.behaviors) {
                PrimeFaces.attachBehaviors(this.input, this.cfg.behaviors)
            }
        }
        this.input.data(PrimeFaces.CLIENT_ID_DATA, this.id)
    },
    toggle: function(i) {
        if (!this.disabled) {
            var g = parseInt(this.input.val());
            var j = this.fixedMod((g + i), 3);
            this.input.val(j);
            if (j == 0) {
                this.box.removeClass("ui-state-active")
            } else {
                this.box.addClass("ui-state-active")
            }
            var h = this.box.data("iconstates");
            this.icon.removeClass(h[g]).addClass(h[j]);
            var f = this.box.data("titlestates");
            if (f != null && f.length > 0) {
                this.box.attr("title", f[j])
            }
            this.input.change()
        }
    }
});
