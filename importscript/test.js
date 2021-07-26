/*
 ngTagsInput v3.2.0
 http://mbenford.github.io/ngTagsInput

 Copyright (c) 2013-2017 Michael Benford
 License: MIT

 Generated at 2017-04-15 17:08:51 -0300
 accounting.js v0.4.2, copyright 2014 Open Exchange Rates, MIT license, http://openexchangerates.github.io/accounting.js
 screenfull
 v2.0.0 - 2014-12-22
 (c) Sindre Sorhus; MIT License
*/
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.findInternal = function (a, c, d) {
    a instanceof String && (a = String(a));
    for (var f = a.length, n = 0; n < f; n++) {
        var k = a[n];
        if (c.call(d, k, n, a)) return {i: n, v: k}
    }
    return {i: -1, v: void 0}
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, c, d) {
    a != Array.prototype && a != Object.prototype && (a[c] = d.value)
};
$jscomp.getGlobal = function (a) {
    return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function (a, c, d, f) {
    if (c) {
        d = $jscomp.global;
        a = a.split(".");
        for (f = 0; f < a.length - 1; f++) {
            var n = a[f];
            n in d || (d[n] = {});
            d = d[n]
        }
        a = a[a.length - 1];
        f = d[a];
        c = c(f);
        c != f && null != c && $jscomp.defineProperty(d, a, {configurable: !0, writable: !0, value: c})
    }
};
$jscomp.polyfill("Array.prototype.find", function (a) {
    return a ? a : function (a, d) {
        return $jscomp.findInternal(this, a, d).v
    }
}, "es6", "es3");
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function () {
    $jscomp.initSymbol = function () {
    };
    $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
};
$jscomp.Symbol = function () {
    var a = 0;
    return function (c) {
        return $jscomp.SYMBOL_PREFIX + (c || "") + a++
    }
}();
$jscomp.initSymbolIterator = function () {
    $jscomp.initSymbol();
    var a = $jscomp.global.Symbol.iterator;
    a || (a = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
    "function" != typeof Array.prototype[a] && $jscomp.defineProperty(Array.prototype, a, {
        configurable: !0,
        writable: !0,
        value: function () {
            return $jscomp.arrayIterator(this)
        }
    });
    $jscomp.initSymbolIterator = function () {
    }
};
$jscomp.arrayIterator = function (a) {
    var c = 0;
    return $jscomp.iteratorPrototype(function () {
        return c < a.length ? {done: !1, value: a[c++]} : {done: !0}
    })
};
$jscomp.iteratorPrototype = function (a) {
    $jscomp.initSymbolIterator();
    a = {next: a};
    a[$jscomp.global.Symbol.iterator] = function () {
        return this
    };
    return a
};
$jscomp.iteratorFromArray = function (a, c) {
    $jscomp.initSymbolIterator();
    a instanceof String && (a += "");
    var d = 0, f = {
        next: function () {
            if (d < a.length) {
                var n = d++;
                return {value: c(n, a[n]), done: !1}
            }
            f.next = function () {
                return {done: !0, value: void 0}
            };
            return f.next()
        }
    };
    f[Symbol.iterator] = function () {
        return f
    };
    return f
};
$jscomp.polyfill("Array.prototype.keys", function (a) {
    return a ? a : function () {
        return $jscomp.iteratorFromArray(this, function (a) {
            return a
        })
    }
}, "es6", "es3");
$jscomp.polyfill("Number.isFinite", function (a) {
    return a ? a : function (a) {
        return "number" !== typeof a ? !1 : !isNaN(a) && Infinity !== a && -Infinity !== a
    }
}, "es6", "es3");
$jscomp.polyfill("Number.isInteger", function (a) {
    return a ? a : function (a) {
        return Number.isFinite(a) ? a === Math.floor(a) : !1
    }
}, "es6", "es3");
$jscomp.checkStringArgs = function (a, c, d) {
    if (null == a) throw new TypeError("The 'this' value for String.prototype." + d + " must not be null or undefined");
    if (c instanceof RegExp) throw new TypeError("First argument to String.prototype." + d + " must not be a regular expression");
    return a + ""
};
$jscomp.polyfill("String.prototype.startsWith", function (a) {
    return a ? a : function (a, d) {
        var c = $jscomp.checkStringArgs(this, a, "startsWith");
        a += "";
        var n = c.length, k = a.length;
        d = Math.max(0, Math.min(d | 0, c.length));
        for (var m = 0; m < k && d < n;) if (c[d++] != a[m++]) return !1;
        return m >= k
    }
}, "es6", "es3");
(function () {
    var a = ["text", "email", "url"], c = angular.module("ngTagsInput", []);
    c.directive("tagsInput", ["$timeout", "$document", "$window", "$q", "tagsInputConfig", "tiUtil", function (c, f, n, k, m, l) {
        function e(a, c, e, d) {
            var h = {};
            var g = function (c) {
                return l.safeToString(c[a.displayProperty])
            };
            var f = function (c, e) {
                c[a.displayProperty] = e
            };
            var r = function (c) {
                var d = g(c);
                d = d && d.length >= a.minLength && d.length <= a.maxLength && a.allowedTagsPattern.test(d) && !l.findInObjectArray(h.items, c, a.keyProperty || a.displayProperty);
                return k.when(d &&
                    e({$tag: c})).then(l.promisifyValue)
            };
            var m = function (a) {
                return k.when(d({$tag: a})).then(l.promisifyValue)
            };
            h.items = [];
            h.addText = function (a) {
                var c = {};
                f(c, a);
                return h.add(c)
            };
            h.add = function (e) {
                var d = g(e);
                a.replaceSpacesWithDashes && (d = l.replaceSpacesWithDashes(d));
                f(e, d);
                return r(e).then(function () {
                    h.items.push(e);
                    c.trigger("tag-added", {$tag: e})
                }).catch(function () {
                    d && c.trigger("invalid-tag", {$tag: e})
                })
            };
            h.remove = function (a) {
                var e = h.items[a];
                return m(e).then(function () {
                    h.items.splice(a, 1);
                    h.clearSelection();
                    c.trigger("tag-removed", {$tag: e});
                    return e
                })
            };
            h.select = function (a) {
                0 > a ? a = h.items.length - 1 : a >= h.items.length && (a = 0);
                h.index = a;
                h.selected = h.items[a]
            };
            h.selectPrior = function () {
                h.select(--h.index)
            };
            h.selectNext = function () {
                h.select(++h.index)
            };
            h.removeSelected = function () {
                return h.remove(h.index)
            };
            h.clearSelection = function () {
                h.selected = null;
                h.index = -1
            };
            h.getItems = function () {
                return a.useStrings ? h.items.map(g) : h.items
            };
            h.clearSelection();
            return h
        }

        function d(c) {
            return -1 !== a.indexOf(c)
        }

        return {
            restrict: "E",
            require: "ngModel",
            scope: {
                tags: "\x3dngModel",
                text: "\x3d?",
                templateScope: "\x3d?",
                tagClass: "\x26",
                onTagAdding: "\x26",
                onTagAdded: "\x26",
                onInvalidTag: "\x26",
                onTagRemoving: "\x26",
                onTagRemoved: "\x26",
                onTagClicked: "\x26"
            },
            replace: !1,
            transclude: !0,
            templateUrl: "ngTagsInput/tags-input.html",
            controller: ["$scope", "$attrs", "$element", function (a, c, h) {
                a.events = l.simplePubSub();
                m.load("tagsInput", a, c, {
                    template: [String, "ngTagsInput/tag-item.html"],
                    type: [String, "text", d],
                    placeholder: [String, "Add a tag"],
                    tabindex: [Number,
                        null],
                    removeTagSymbol: [String, String.fromCharCode(215)],
                    replaceSpacesWithDashes: [Boolean, !0],
                    minLength: [Number, 3],
                    maxLength: [Number, 9007199254740991],
                    addOnEnter: [Boolean, !0],
                    addOnSpace: [Boolean, !1],
                    addOnComma: [Boolean, !0],
                    addOnBlur: [Boolean, !0],
                    addOnPaste: [Boolean, !1],
                    pasteSplitPattern: [RegExp, /,/],
                    allowedTagsPattern: [RegExp, /.+/],
                    enableEditingLastTag: [Boolean, !1],
                    minTags: [Number, 0],
                    maxTags: [Number, 9007199254740991],
                    displayProperty: [String, "text"],
                    keyProperty: [String, ""],
                    allowLeftoverText: [Boolean,
                        !1],
                    addFromAutocompleteOnly: [Boolean, !1],
                    spellcheck: [Boolean, !0],
                    useStrings: [Boolean, !1]
                });
                a.tagList = new e(a.options, a.events, l.handleUndefinedResult(a.onTagAdding, !0), l.handleUndefinedResult(a.onTagRemoving, !0));
                this.registerAutocomplete = function () {
                    h.find("input");
                    return {
                        addTag: function (c) {
                            return a.tagList.add(c)
                        }, getTags: function () {
                            return a.tagList.items
                        }, getCurrentTagText: function () {
                            return a.newTag.text()
                        }, getOptions: function () {
                            return a.options
                        }, getTemplateScope: function () {
                            return a.templateScope
                        },
                        on: function (c, e) {
                            a.events.on(c, e, !0);
                            return this
                        }
                    }
                };
                this.registerTagItem = function () {
                    return {
                        getOptions: function () {
                            return a.options
                        }, removeTag: function (c) {
                            a.disabled || a.tagList.remove(c)
                        }
                    }
                }
            }],
            link: function (a, e, d, h) {
                var g = [13, 188, 32, 8, 46, 37, 39], k = a.tagList, m = a.events, r = a.options, t = e.find("input"),
                    D = ["minTags", "maxTags", "allowLeftoverText"];
                var q = function () {
                    h.$setValidity("maxTags", k.items.length <= r.maxTags);
                    h.$setValidity("minTags", k.items.length >= r.minTags);
                    h.$setValidity("leftoverText", a.hasFocus ||
                    r.allowLeftoverText ? !0 : !a.newTag.text())
                };
                var y = function () {
                    c(function () {
                        t[0].focus()
                    })
                };
                h.$isEmpty = function (b) {
                    return !b || !b.length
                };
                a.newTag = {
                    text: function (b) {
                        if (angular.isDefined(b)) a.text = b, m.trigger("input-change", b); else return a.text || ""
                    }, invalid: null
                };
                a.track = function (b) {
                    return b[r.keyProperty || r.displayProperty]
                };
                a.getTagClass = function (b, c) {
                    var e = b === k.selected;
                    return [a.tagClass({$tag: b, $index: c, $selected: e}), {selected: e}]
                };
                a.$watch("tags", function (b) {
                    b ? (k.items = l.makeObjectArray(b, r.displayProperty),
                    r.useStrings || (a.tags = k.items)) : k.items = []
                });
                a.$watch("tags.length", function () {
                    q();
                    h.$validate()
                });
                d.$observe("disabled", function (b) {
                    a.disabled = b
                });
                a.eventHandlers = {
                    input: {
                        keydown: function (b) {
                            m.trigger("input-keydown", b)
                        }, focus: function () {
                            a.hasFocus || (a.hasFocus = !0, m.trigger("input-focus"))
                        }, blur: function () {
                            c(function () {
                                var b = f.prop("activeElement"), c = b === t[0];
                                b = e[0].contains(b);
                                if (c || !b) a.hasFocus = !1, m.trigger("input-blur")
                            })
                        }, paste: function (b) {
                            b.getTextData = function () {
                                var a = b.clipboardData || b.originalEvent &&
                                    b.originalEvent.clipboardData;
                                return a ? a.getData("text/plain") : n.clipboardData.getData("Text")
                            };
                            m.trigger("input-paste", b)
                        }
                    }, host: {
                        click: function () {
                            a.disabled || y()
                        }
                    }, tag: {
                        click: function (b) {
                            m.trigger("tag-clicked", {$tag: b})
                        }
                    }
                };
                m.on("tag-added", a.onTagAdded).on("invalid-tag", a.onInvalidTag).on("tag-removed", a.onTagRemoved).on("tag-clicked", a.onTagClicked).on("tag-added", function () {
                    a.newTag.text("")
                }).on("tag-added tag-removed", function () {
                    a.tags = k.getItems();
                    h.$setDirty();
                    y()
                }).on("invalid-tag", function () {
                    a.newTag.invalid =
                        !0
                }).on("option-change", function (b) {
                    -1 !== D.indexOf(b.name) && q()
                }).on("input-change", function () {
                    k.clearSelection();
                    a.newTag.invalid = null
                }).on("input-focus", function () {
                    e.triggerHandler("focus");
                    h.$setValidity("leftoverText", !0)
                }).on("input-blur", function () {
                    r.addOnBlur && !r.addFromAutocompleteOnly && k.addText(a.newTag.text());
                    e.triggerHandler("blur");
                    q()
                }).on("input-keydown", function (b) {
                    var c = b.keyCode, e = {};
                    if (!l.isModifierOn(b) && -1 !== g.indexOf(c)) {
                        e[13] = r.addOnEnter;
                        e[188] = r.addOnComma;
                        e[32] = r.addOnSpace;
                        e = !r.addFromAutocompleteOnly && e[c];
                        var d = (8 === c || 46 === c) && k.selected;
                        var h = 8 === c && 0 === a.newTag.text().length && r.enableEditingLastTag;
                        var f = (8 === c || 37 === c || 39 === c) && 0 === a.newTag.text().length && !r.enableEditingLastTag;
                        e ? k.addText(a.newTag.text()) : h ? (k.selectPrior(), k.removeSelected().then(function (b) {
                            b && a.newTag.text(b[r.displayProperty])
                        })) : d ? k.removeSelected() : f && (37 === c || 8 === c ? k.selectPrior() : 39 === c && k.selectNext());
                        (e || f || d || h) && b.preventDefault()
                    }
                }).on("input-paste", function (b) {
                    if (r.addOnPaste) {
                        var a =
                            b.getTextData().split(r.pasteSplitPattern);
                        1 < a.length && (a.forEach(function (b) {
                            k.addText(b)
                        }), b.preventDefault())
                    }
                })
            }
        }
    }]);
    c.directive("tiTagItem", ["tiUtil", function (a) {
        return {
            restrict: "E",
            require: "^tagsInput",
            template: '\x3cng-include src\x3d"$$template"\x3e\x3c/ng-include\x3e',
            scope: {$scope: "\x3dscope", data: "\x3d"},
            link: function (c, d, k, m) {
                var f = m.registerTagItem(), e = f.getOptions();
                c.$$template = e.template;
                c.$$removeTagSymbol = e.removeTagSymbol;
                c.$getDisplayText = function () {
                    return a.safeToString(c.data[e.displayProperty])
                };
                c.$removeTag = function () {
                    f.removeTag(c.$index)
                };
                c.$watch("$parent.$index", function (a) {
                    c.$index = a
                })
            }
        }
    }]);
    c.directive("autoComplete", ["$document", "$timeout", "$sce", "$q", "tagsInputConfig", "tiUtil", function (a, c, n, k, m, l) {
        function e(a, c, e) {
            var d = {}, h;
            var f = function () {
                return c.tagsInput.keyProperty || c.tagsInput.displayProperty
            };
            var m = function (a, e) {
                return a.filter(function (a) {
                    return !l.findInObjectArray(e, a, f(), function (a, e) {
                        c.tagsInput.replaceSpacesWithDashes && (a = l.replaceSpacesWithDashes(a), e = l.replaceSpacesWithDashes(e));
                        return l.defaultComparer(a, e)
                    })
                })
            };
            d.reset = function () {
                h = null;
                d.items = [];
                d.visible = !1;
                d.index = -1;
                d.selected = null;
                d.query = null
            };
            d.show = function () {
                c.selectFirstMatch ? d.select(0) : d.selected = null;
                d.visible = !0
            };
            d.load = l.debounce(function (e, g) {
                d.query = e;
                var r = k.when(a({$query: e}));
                h = r;
                r.then(function (a) {
                    r === h && (a = l.makeObjectArray(a.data || a, f()), a = m(a, g), d.items = a.slice(0, c.maxResultsToShow), 0 < d.items.length ? d.show() : d.reset())
                })
            }, c.debounceDelay);
            d.selectNext = function () {
                d.select(++d.index)
            };
            d.selectPrior =
                function () {
                    d.select(--d.index)
                };
            d.select = function (a) {
                0 > a ? a = d.items.length - 1 : a >= d.items.length && (a = 0);
                d.index = a;
                d.selected = d.items[a];
                e.trigger("suggestion-selected", a)
            };
            d.reset();
            return d
        }

        return {
            restrict: "E",
            require: "^tagsInput",
            scope: {source: "\x26", matchClass: "\x26"},
            templateUrl: "ngTagsInput/auto-complete.html",
            controller: ["$scope", "$element", "$attrs", function (a, c, d) {
                a.events = l.simplePubSub();
                m.load("autoComplete", a, d, {
                    template: [String, "ngTagsInput/auto-complete-match.html"],
                    debounceDelay: [Number,
                        100],
                    minLength: [Number, 3],
                    highlightMatchedText: [Boolean, !0],
                    maxResultsToShow: [Number, 10],
                    loadOnDownArrow: [Boolean, !1],
                    loadOnEmpty: [Boolean, !1],
                    loadOnFocus: [Boolean, !1],
                    selectFirstMatch: [Boolean, !0],
                    displayProperty: [String, ""]
                });
                a.suggestionList = new e(a.source, a.options, a.events);
                this.registerAutocompleteMatch = function () {
                    return {
                        getOptions: function () {
                            return a.options
                        }, getQuery: function () {
                            return a.suggestionList.query
                        }
                    }
                }
            }],
            link: function (a, c, e, d) {
                var h = [13, 9, 27, 38, 40], f = a.suggestionList, g = d.registerAutocomplete(),
                    k = a.options;
                e = a.events;
                k.tagsInput = g.getOptions();
                var m = function (a) {
                    return a && a.length >= k.minLength || !a && k.loadOnEmpty
                };
                a.templateScope = g.getTemplateScope();
                a.addSuggestionByIndex = function (c) {
                    f.select(c);
                    a.addSuggestion()
                };
                a.addSuggestion = function () {
                    var a = !1;
                    f.selected && (g.addTag(angular.copy(f.selected)), f.reset(), a = !0);
                    return a
                };
                a.track = function (a) {
                    return a[k.tagsInput.keyProperty || k.tagsInput.displayProperty]
                };
                a.getSuggestionClass = function (c, e) {
                    var d = c === f.selected;
                    return [a.matchClass({
                        $match: c,
                        $index: e, $selected: d
                    }), {selected: d}]
                };
                g.on("tag-added tag-removed invalid-tag input-blur", function () {
                    f.reset()
                }).on("input-change", function (a) {
                    m(a) ? f.load(a, g.getTags()) : f.reset()
                }).on("input-focus", function () {
                    var a = g.getCurrentTagText();
                    k.loadOnFocus && m(a) && f.load(a, g.getTags())
                }).on("input-keydown", function (c) {
                    var e = c.keyCode, d = !1;
                    if (!l.isModifierOn(c) && -1 !== h.indexOf(e)) {
                        if (f.visible) if (40 === e) f.selectNext(), d = !0; else if (38 === e) f.selectPrior(), d = !0; else if (27 === e) f.reset(), d = !0; else {
                            if (13 === e ||
                                9 === e) d = a.addSuggestion()
                        } else 40 === e && a.options.loadOnDownArrow && (f.load(g.getCurrentTagText(), g.getTags()), d = !0);
                        if (d) return c.preventDefault(), c.stopImmediatePropagation(), !1
                    }
                });
                e.on("suggestion-selected", function (a) {
                    var e = c.find("li").eq(a);
                    a = e.parent();
                    var d = e.prop("offsetTop");
                    e = e.prop("offsetHeight");
                    var h = a.prop("clientHeight"), b = a.prop("scrollTop");
                    d < b ? a.prop("scrollTop", d) : d + e > h + b && a.prop("scrollTop", d + e - h)
                })
            }
        }
    }]);
    c.directive("tiAutocompleteMatch", ["$sce", "tiUtil", function (a, c) {
        return {
            restrict: "E",
            require: "^autoComplete",
            template: '\x3cng-include src\x3d"$$template"\x3e\x3c/ng-include\x3e',
            scope: {$scope: "\x3dscope", data: "\x3d"},
            link: function (d, f, m, l) {
                var e = l.registerAutocompleteMatch(), h = e.getOptions();
                d.$$template = h.template;
                d.$index = d.$parent.$index;
                d.$highlight = function (d) {
                    h.highlightMatchedText && (d = c.safeHighlight(d, e.getQuery()));
                    return a.trustAsHtml(d)
                };
                d.$getDisplayText = function () {
                    return c.safeToString(d.data[h.displayProperty || h.tagsInput.displayProperty])
                }
            }
        }
    }]);
    c.directive("tiTranscludeAppend",
        function () {
            return function (a, c, n, k, m) {
                m(function (a) {
                    c.append(a)
                })
            }
        });
    c.directive("tiAutosize", ["tagsInputConfig", function (a) {
        return {
            restrict: "A", require: "ngModel", link: function (c, d, k, m) {
                var f = a.getTextAutosizeThreshold();
                var e = angular.element('\x3cspan class\x3d"input"\x3e\x3c/span\x3e');
                e.css("display", "none").css("visibility", "hidden").css("width", "auto").css("white-space", "pre");
                d.parent().append(e);
                var h = function (a) {
                    var c = a;
                    angular.isString(c) && 0 === c.length && (c = k.placeholder);
                    if (c) {
                        e.text(c);
                        e.css("display", "");
                        var h = e.prop("offsetWidth");
                        e.css("display", "none")
                    }
                    d.css("width", h ? h + f + "px" : "");
                    return a
                };
                m.$parsers.unshift(h);
                m.$formatters.unshift(h);
                k.$observe("placeholder", function (a) {
                    m.$modelValue || h(a)
                })
            }
        }
    }]);
    c.directive("tiBindAttrs", function () {
        return function (a, c, n) {
            a.$watch(n.tiBindAttrs, function (a) {
                angular.forEach(a, function (a, c) {
                    n.$set(c, a)
                })
            }, !0)
        }
    });
    c.provider("tagsInputConfig", function () {
        var a = {}, c = {}, n = 3;
        this.setDefaults = function (c, d) {
            a[c] = d;
            return this
        };
        this.setActiveInterpolation =
            function (a, d) {
                c[a] = d;
                return this
            };
        this.setTextAutosizeThreshold = function (a) {
            n = a;
            return this
        };
        this.$get = ["$interpolate", function (d) {
            var f = {};
            f[String] = function (a) {
                return a
            };
            f[Number] = function (a) {
                return parseInt(a, 10)
            };
            f[Boolean] = function (a) {
                return "true" === a.toLowerCase()
            };
            f[RegExp] = function (a) {
                return new RegExp(a)
            };
            return {
                load: function (k, e, h, m) {
                    var l = function () {
                        return !0
                    };
                    e.options = {};
                    angular.forEach(m, function (g, m) {
                        var r = g[0];
                        var n = g[1];
                        var t = g[2] || l;
                        var w = f[r];
                        var D = function () {
                            var c = a[k] && a[k][m];
                            return angular.isDefined(c) ? c : n
                        };
                        var E = function (a) {
                            e.options[m] = a && t(a) ? w(a) : D()
                        };
                        c[k] && c[k][m] ? h.$observe(m, function (a) {
                            E(a);
                            e.events.trigger("option-change", {name: m, newValue: a})
                        }) : E(h[m] && d(h[m])(e.$parent))
                    })
                }, getTextAutosizeThreshold: function () {
                    return n
                }
            }
        }]
    });
    c.factory("tiUtil", ["$timeout", "$q", function (a, c) {
        var d = {
            debounce: function (c, d) {
                var f;
                return function () {
                    var e = arguments;
                    a.cancel(f);
                    f = a(function () {
                        c.apply(null, e)
                    }, d)
                }
            }, makeObjectArray: function (a, c) {
                if (!angular.isArray(a) || 0 === a.length ||
                    angular.isObject(a[0])) return a;
                var d = [];
                a.forEach(function (a) {
                    var e = {};
                    e[c] = a;
                    d.push(e)
                });
                return d
            }, findInObjectArray: function (a, c, f, e) {
                var h = null;
                e = e || d.defaultComparer;
                a.some(function (a) {
                    if (e(a[f], c[f])) return h = a, !0
                });
                return h
            }, defaultComparer: function (a, c) {
                return d.safeToString(a).toLowerCase() === d.safeToString(c).toLowerCase()
            }, safeHighlight: function (a, c) {
                a = d.encodeHTML(a);
                c = d.encodeHTML(c);
                if (!c) return a;
                var f = new RegExp("\x26[^;]+;|" + c.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"), "gi");
                return a.replace(f,
                    function (a) {
                        return a.toLowerCase() === c.toLowerCase() ? "\x3cem\x3e" + a + "\x3c/em\x3e" : a
                    })
            }, safeToString: function (a) {
                return angular.isUndefined(a) || null == a ? "" : a.toString().trim()
            }, encodeHTML: function (a) {
                return d.safeToString(a).replace(/&/g, "\x26amp;").replace(/</g, "\x26lt;").replace(/>/g, "\x26gt;")
            }, handleUndefinedResult: function (a, c) {
                return function () {
                    var d = a.apply(null, arguments);
                    return angular.isUndefined(d) ? c : d
                }
            }, replaceSpacesWithDashes: function (a) {
                return d.safeToString(a).replace(/\s/g, "-")
            }, isModifierOn: function (a) {
                return a.shiftKey ||
                    a.ctrlKey || a.altKey || a.metaKey
            }, promisifyValue: function (a) {
                a = angular.isUndefined(a) ? !0 : a;
                return c[a ? "when" : "reject"]()
            }, simplePubSub: function () {
                var a = {};
                return {
                    on: function (c, d, e) {
                        c.split(" ").forEach(function (c) {
                            a[c] || (a[c] = []);
                            (e ? [].unshift : [].push).call(a[c], d)
                        });
                        return this
                    }, trigger: function (c, f) {
                        (a[c] || []).every(function (a) {
                            return d.handleUndefinedResult(a, !0)(f)
                        });
                        return this
                    }
                }
            }
        };
        return d
    }]);
    c.run(["$templateCache", function (a) {
        a.put("ngTagsInput/tags-input.html", '\x3cdiv class\x3d"host" tabindex\x3d"-1" ng-click\x3d"eventHandlers.host.click()" ti-transclude-append\x3e\x3cdiv class\x3d"tags" ng-class\x3d"{focused: hasFocus}"\x3e\x3cul class\x3d"tag-list"\x3e\x3cli class\x3d"tag-item" ng-repeat\x3d"tag in tagList.items track by track(tag)" ng-class\x3d"getTagClass(tag, $index)" ng-click\x3d"eventHandlers.tag.click(tag)"\x3e\x3cti-tag-item scope\x3d"templateScope" data\x3d"::tag"\x3e\x3c/ti-tag-item\x3e\x3c/li\x3e\x3c/ul\x3e\x3cinput class\x3d"input" autocomplete\x3d"off" ng-model\x3d"newTag.text" ng-model-options\x3d"{getterSetter: true}" ng-keydown\x3d"eventHandlers.input.keydown($event)" ng-focus\x3d"eventHandlers.input.focus($event)" ng-blur\x3d"eventHandlers.input.blur($event)" ng-paste\x3d"eventHandlers.input.paste($event)" ng-trim\x3d"false" ng-class\x3d"{\'invalid-tag\': newTag.invalid}" ng-disabled\x3d"disabled" ti-bind-attrs\x3d"{type: options.type, placeholder: options.placeholder, tabindex: options.tabindex, spellcheck: options.spellcheck}" ti-autosize\x3e\x3c/div\x3e\x3c/div\x3e');
        a.put("ngTagsInput/tag-item.html", '\x3cspan ng-bind\x3d"$getDisplayText()"\x3e\x3c/span\x3e \x3ca class\x3d"remove-button" ng-click\x3d"$removeTag()" ng-bind\x3d"::$$removeTagSymbol"\x3e\x3c/a\x3e');
        a.put("ngTagsInput/auto-complete.html", '\x3cdiv class\x3d"autocomplete" ng-if\x3d"suggestionList.visible"\x3e\x3cul class\x3d"suggestion-list"\x3e\x3cli class\x3d"suggestion-item" ng-repeat\x3d"item in suggestionList.items track by track(item)" ng-class\x3d"getSuggestionClass(item, $index)" ng-click\x3d"addSuggestionByIndex($index)" ng-mouseenter\x3d"suggestionList.select($index)"\x3e\x3cti-autocomplete-match scope\x3d"templateScope" data\x3d"::item"\x3e\x3c/ti-autocomplete-match\x3e\x3c/li\x3e\x3c/ul\x3e\x3c/div\x3e');
        a.put("ngTagsInput/auto-complete-match.html", '\x3cspan ng-bind-html\x3d"$highlight($getDisplayText())"\x3e\x3c/span\x3e')
    }])
})();
var isFullScreen = !1, isFullScreenClicked = !1, redirectXpos = 0, redirectYpos = 0;
setTimeout(function () {
    var a = document.getElementById("modal-nav");
    a && a.addEventListener("touchmove", function (a) {
        a.preventDefault()
    }, !1)
}, 10);
var closeWindow = function () {
    window.close()
}, hasClass = function (a, c) {
    return a.classList ? a.classList.contains(c) : !!a.className.match(new RegExp("(\\s|^)" + c + "(\\s|$)"))
}, addClass = function (a, c) {
    a.classList ? a.classList.add(c) : hasClass(a, c) || (a.className += " " + c)
}, removeClass = function (a, c) {
    a.classList ? a.classList.remove(c) : hasClass(a, c) && (a.className = a.className.replace(new RegExp("(\\s|^)" + c + "(\\s|$)"), " "))
}, search = function (a, c, d) {
    for (var f = null, n = 0; n < d.length; n++) if (d[n][a].toLowerCase() === c.toLowerCase()) {
        f =
            d[n];
        break
    }
    return f
}, isInteger = function (a) {
    return 0 === a % 1
}, isFullScreenMode = function () {
    var a = !1;
    if (document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen) a = !0;
    return a
}, hideElem = function (a) {
    a = document.getElementById(a);
    void 0 != a && (a.style.display = "none")
}, hideFullscreen = function () {
    isFullScreen = !1;
    removeClass(document.body, "fullscreen");
    setTimeout(function () {
        window.scrollTo(redirectXpos, redirectYpos)
    }, 200)
}, hideElemOnExitFullscreen = function (a) {
    hideFullscreen();
    cancelFullScreenMode(-1,
        !0);
    window.location.hash = "";
    a = getDevice();
    (a.isIDevice || a.isMac && a.isSafari) && history.back()
};
document.onkeyup = function (a) {
    27 === (a || window.event).which && hideFullscreen()
};
var language_list = ["EN", "GR", "RU", "ZH"], getLanguageCode = function () {
        var a = "EN", c = window.location.pathname.split("/");
        1 < c.length && -1 < language_list.indexOf(c[1]) && (a = c[1]);
        return a
    }, getValueInLanguage = function (a, c) {
        var d = "";
        void 0 != a[c] && (d = getLanguageCode(), d = a[c][d] ? a[c][d] : a[c].EN);
        return d
    }, getDevice = function () {
        var a = window.navigator, c = a.userAgent;
        a = {
            isMobile: !0,
            isRetina: window.devicePixelRatio && 1 < window.devicePixelRatio,
            isIDevice: /iphone|ipod|ipad/i.test(c),
            isMobileChrome: -1 < c.indexOf("Android") &&
            /Chrome\/[.0-9]*/.test(c) && -1 == c.indexOf("Version"),
            isMobileIE: -1 < c.indexOf("Windows Phone"),
            isMac: 0 <= a.platform.toUpperCase().indexOf("MAC"),
            language: a.language && a.language.toLowerCase().replace("-", "_") || ""
        };
        a.isChrome = -1 < c.indexOf("Chrome");
        a.isSafari = -1 < c.indexOf("Safari") && !a.isChrome;
        a.isMobileSafari = a.isIDevice && -1 < c.indexOf("Safari") && 0 > c.indexOf("CriOS");
        a.OS = a.isIDevice ? "ios" : a.isMobileChrome ? "android" : a.isMobileIE ? "windows" : "unsupported";
        var d = c.match(/(OS|Android) (\d+[_\.]\d+)/);
        a.OSVersion =
            d && d[2] ? +d[2].replace("_", ".") : 0;
        a.isStandalone = "standalone" in window.navigator && window.navigator.standalone;
        a.isTablet = a.isMobileSafari && -1 < c.indexOf("iPad") || a.isMobileChrome && 0 > c.indexOf("Mobile");
        a.isMobile = _mobilecheck();
        return a
    }, getBrowserInfo = function () {
        var a = window.navigator.userAgent,
            c = a.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(c[1])) {
            var d = /\brv[ :]+(\d+)/g.exec(a) || [];
            return "IE " + (d[1] || "")
        }
        if ("Chrome" === c[1] && (d = a.match(/\b(OPR|Edge)\/(\d+)/),
        null != d)) return d.slice(1).join(" ").replace("OPR", "Opera");
        c = c[2] ? [c[1], c[2]] : [navigator.appName, navigator.appVersion, "-?"];
        null != (d = a.match(/version\/(\d+)/i)) && c.splice(1, 1, d[1]);
        return c.join(" ")
    }, _mobilecheck = function () {
        var a = !1, c = navigator.userAgent || navigator.vendor || window.opera;
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(c) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(c.substr(0,
                4))) a = !0;
        return a
    }, isNumber = function (a) {
        return !isNaN(parseFloat(a)) && isFinite(a)
    }, getCountryFromIp = function (a) {
        var c = "";
        if (checkCookie("country_from_ip")) c = getCookie("country_from_ip"), a(c); else {
            var d = new XMLHttpRequest;
            d.onload = function (d) {
                d = d.target.response;
                void 0 != d && void 0 != d.country_name && (c = d.country_name, void 0 != a && (setCookie("country_from_ip", c, gl_cookies_duration), a(c)))
            };
            d.open("GET", "/get-country", !0);
            d.responseType = "json";
            d.send()
        }
    }, getCurrencyRate = function (a, c) {
        var d = new XMLHttpRequest;
        a = {currency_code: a};
        a = JSON.stringify(a);
        d.onload = function (a) {
            a = a.target.response;
            void 0 != a ? void 0 != c && c(a) : c({rate: 1})
        };
        d.open("POST", "/get-currency", !0);
        d.setRequestHeader("Content-type", "application/json");
        d.responseType = "json";
        d.send(a)
    }, getLanguageText = function (a, c) {
        var d = c, f = getLanguageCode();
        a in languageDictionary && f in languageDictionary[a] && (d = languageDictionary[a][f]);
        "" == d.trim() && (d = c);
        return d
    }, languageDictionary = {
        BTN_BIGGEST_BUILT_SIZE_FIRST: {
            EN: "Biggest built size first",
            GR: "\u039c\u03ad\u03b3\u03b9\u03c3\u03c4\u03b1 \u03a4\u03b5\u03c4. \u039c\u03ad\u03c4\u03c1\u03b1 \u039a\u03b1\u03c4\u03bf\u03b9\u03ba\u03af\u03b1\u03c2",
            RU: "\u0421\u043d\u0430\u0447\u0430\u043b\u0430 \u043d\u0430\u0438\u0431\u043e\u043b\u044c\u0448\u0438\u0439 \u0440\u0430\u0437\u043c\u0435\u0440 \u0437\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438",
            ZH: "\u6700\u5927\u5efa\u6210\u5c3a\u5bf8\u4f18\u5148"
        },
        BTN_BIGGEST_PLOT_FIRST: {
            EN: "Biggest plot first",
            GR: "\u039c\u03ad\u03b3\u03b9\u03c3\u03c4\u03bf \u039f\u03b9\u03ba\u03cc\u03c0\u03b5\u03b4\u03bf",
            RU: "\u0421\u043d\u0430\u0447\u0430\u043b\u0430 \u0441\u0430\u043c\u044b\u0439 \u0431\u043e\u043b\u044c\u0448\u043e\u0439 \u0443\u0447\u0430\u0441\u0442\u043e\u043a",
            ZH: "\u6700\u5927\u571f\u5730\u9762\u79ef\u4f18\u5148"
        },
        BTN_DEALS_FIRST: {
            EN: "Deals first",
            GR: "\u0395\u03c5\u03ba\u03b1\u03b9\u03c1\u03af\u03b5\u03c2 \u03c0\u03c1\u03ce\u03c4\u03b1",
            RU: "\u0421\u043d\u0430\u0447\u0430\u043b\u0430 \u0430\u043a\u0446\u0438\u043e\u043d\u043d\u044b\u0435 \u043f\u0440\u0435\u0434\u043b\u043e\u0436\u0435\u043d\u0438\u044f",
            ZH: "\u6210\u4ea4\u4f18\u5148"
        },
        BTN_FAVOURITES: {
            EN: "Favourites",
            GR: "\u0391\u03b3\u03b1\u03c0\u03b7\u03bc\u03ad\u03bd\u03b1",
            RU: "\u0418\u0437\u0431\u0440\u0430\u043d\u043d\u043e\u0435",
            ZH: "\u6536\u85cf"
        },
        BTN_HIGHEST_PRICE_FIRST: {
            EN: "Highest price first",
            GR: "\u03a8\u03b7\u03bb\u03cc\u03c4\u03b5\u03c1\u03b7 \u03c4\u03b9\u03bc\u03ae \u03c0\u03c1\u03ce\u03c4\u03b1",
            RU: "\u0421\u043d\u0430\u0447\u0430\u043b\u0430 \u0441\u0430\u043c\u0430\u044f \u0432\u044b\u0441\u043e\u043a\u0430\u044f \u0446\u0435\u043d\u0430",
            ZH: "\u6700\u9ad8\u4ef7\u683c\u4f18\u5148"
        },
        BTN_LOWEST_PRICE_FIRST: {
            EN: "Lowest price first",
            GR: "\u03a7\u03b1\u03bc\u03b7\u03bb\u03cc\u03c4\u03b5\u03c1\u03b7 \u03c4\u03b9\u03bc\u03ae \u03c0\u03c1\u03ce\u03c4\u03b1",
            RU: "\u0421\u043d\u0430\u0447\u0430\u043b\u0430 \u0441\u0430\u043c\u0430\u044f \u043d\u0438\u0437\u043a\u0430\u044f \u0446\u0435\u043d\u0430",
            ZH: "\u6700\u4f4e\u4ef7\u683c\u4f18\u5148"
        },
        BTN_MAX_BEDS: {
            EN: "Max Beds",
            GR: "\u039c\u03ad\u03b3\u03b9\u03c3\u03c4\u03b1 \u03a5\u03c0\u03bd\u03bf\u03b4\u03c9\u03bc\u03ac\u03c4\u03b9\u03b1",
            RU: "\u041c\u0430\u043a\u0441. \u043a\u0440\u043e\u0432\u0430\u0442\u0438",
            ZH: "\u6700\u591a\u5e8a\u4f4d"
        },
        BTN_MAX_PRICE: {
            EN: "Max Price", GR: "\u039c\u03ad\u03b3\u03b9\u03c3\u03c4\u03b7 \u03a4\u03b9\u03bc\u03ae",
            RU: "\u041c\u0430\u043a\u0441. \u0446\u0435\u043d\u0430", ZH: "\u6700\u9ad8\u4ef7\u683c"
        },
        BTN_MIN_BEDS: {
            EN: "Min Beds",
            GR: "\u0395\u03bb\u03ac\u03c7\u03b9\u03c3\u03c4\u03b1 \u03a5\u03c0\u03bd\u03bf\u03b4\u03c9\u03bc\u03ac\u03c4\u03b9\u03b1",
            RU: "\u041c\u0438\u043d. \u043a\u043e\u043c\u043d\u0430\u0442",
            ZH: "\u6700\u5c11\u5e8a\u4f4d"
        },
        BTN_MIN_PRICE: {
            EN: "Min Price",
            GR: "\u0395\u03bb\u03ac\u03c7\u03b9\u03c3\u03c4\u03b7 \u03c4\u03b9\u03bc\u03ae",
            RU: "\u041c\u0438\u043d. \u0446\u0435\u043d\u0430",
            ZH: "\u6700\u4f4e\u4ef7\u683c"
        },
        BTN_MORE: {
            EN: "More",
            GR: "\u03a0\u03b5\u03c1\u03b9\u03c3\u03c3\u03cc\u03c4\u03b5\u03c1\u03b1",
            RU: "\u0415\u0449\u0435",
            ZH: "\u66f4\u591a"
        },
        BTN_RECENTLY_LISTED_FIRST: {
            EN: "Recently listed first",
            GR: "\u03a0\u03c1\u03cc\u03c3\u03c6\u03b1\u03c4\u03b5\u03c2 \u039a\u03b1\u03c4\u03b1\u03c7\u03c9\u03c1\u03ae\u03c3\u03b5\u03b9\u03c2",
            RU: "\u0421\u043d\u0430\u0447\u0430\u043b\u0430 \u043d\u0435\u0434\u0430\u0432\u043d\u043e \u043e\u043f\u0443\u0431\u043b\u0438\u043a\u043e\u0432\u0430\u043d\u043d\u044b\u0435",
            ZH: "\u6700\u8fd1\u5217\u51fa\u4f18\u5148"
        },
        BTN_TYPE: {EN: "Type", GR: "\u03a4\u03cd\u03c0\u03bf\u03c2", RU: "\u0422\u0438\u043f", ZH: "\u7c7b\u578b"},
        TXT_ALL: {EN: "All", GR: "\u038c\u03bb\u03b1", RU: "\u0412\u0441\u0435", ZH: "\u5168\u90e8"},
        TXT_APARTMENT: {
            EN: "Apartment",
            GR: "\u0394\u03b9\u03b1\u03bc\u03ad\u03c1\u03b9\u03c3\u03bc\u03b1",
            RU: "\u0410\u043f\u0430\u0440\u0442\u0430\u043c\u0435\u043d\u0442\u044b",
            ZH: "\u516c\u5bd3"
        },
        TXT_APARTMENTS: {
            EN: "Apartments",
            GR: "\u0394\u03b9\u03b1\u03bc\u03b5\u03c1\u03af\u03c3\u03bc\u03b1\u03c4\u03b1",
            RU: "\u0410\u043f\u0430\u0440\u0442\u0430\u043c\u0435\u043d\u0442\u044b",
            ZH: "\u516c\u5bd3"
        },
        TXT_BUNGALOW: {
            ZH: "\u5e73\u623f",
            EN: "Bungalow",
            GR: "\u039c\u03c0\u03ac\u03bd\u03b3\u03ba\u03b1\u03bb\u03bf\u03bf\u03c5",
            RU: "\u0411\u0443\u043d\u0433\u0430\u043b\u043e"
        },
        TXT_COMMERCIAL: {
            EN: "Commercial",
            GR: "\u0395\u03bc\u03c0\u03bf\u03c1\u03b9\u03ba\u03cc",
            RU: "\u041e\u0444\u0438\u0441\u043d\u0430\u044f \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u044c",
            ZH: "\u5e7f\u544a"
        },
        TXT_DETACHED_HOUSE: {
            ZH: "\u72ec\u7acb\u5f0f\u4f4f\u5b85",
            EN: "Detached house",
            GR: "\u039c\u03bf\u03bd\u03bf\u03ba\u03b1\u03c4\u03bf\u03b9\u03ba\u03af\u03b1",
            RU: "\u041e\u0441\u043e\u0431\u043d\u044f\u043a"
        },
        TXT_END_TOWN_HOUSE: {
            ZH: "\u5e02\u8fb9\u754c\u4f4f\u5b85",
            EN: "End town house",
            GR: "\u0393\u03c9\u03bd\u03b9\u03b1\u03ba\u03ae \u039c\u03b5\u03b6\u03bf\u03bd\u03ad\u03c4\u03b1",
            RU: "\u041a\u0440\u0430\u0439\u043d\u0438\u0439 \u0442\u0430\u0443\u043d\u0445\u0430\u0443\u0441"
        },
        TXT_ENTIRE_FLOOR_APARTMENT: {
            ZH: "\u6574\u5c42\u516c\u5bd3",
            EN: "Entire floor apartment",
            GR: "\u039f\u03c1\u03bf\u03c6\u03bf\u03b4\u03b9\u03b1\u03bc\u03ad\u03c1\u03b9\u03c3\u03bc\u03b1",
            RU: "\u0410\u043f\u0430\u0440\u0442\u0430\u043c\u0435\u043d\u0442\u044b \u043d\u0430 \u044d\u0442\u0430\u0436"
        },
        TXT_GROUND_FLOOR_APARTMENT: {
            ZH: "\u4e00\u697c\u7684\u516c\u5bd3",
            EN: "Ground floor apartment",
            GR: "\u0399\u03c3\u03cc\u03b3\u03b5\u03b9\u03bf \u03b4\u03b9\u03b1\u03bc\u03ad\u03c1\u03b9\u03c3\u03bc\u03b1",
            RU: "\u0410\u043f\u0430\u0440\u0442\u0430\u043c\u0435\u043d\u0442\u044b \u043d\u0430 \u043f\u0435\u0440\u0432\u043e\u043c \u044d\u0442\u0430\u0436\u0435"
        },
        TXT_HOUSE: {
            EN: "House", GR: "\u039a\u03b1\u03c4\u03bf\u03b9\u03ba\u03af\u03b1",
            RU: "\u0434\u043e\u043c", ZH: "\u623f\u5c4b"
        },
        TXT_HOUSES: {
            EN: "Houses",
            GR: "\u039a\u03b1\u03c4\u03bf\u03b9\u03ba\u03af\u03b5\u03c2",
            RU: "\u0434\u043e\u043c\u0430(\u043e\u0432)",
            ZH: "\u623f\u5c4b"
        },
        TXT_LAND: {
            EN: "Land",
            GR: "\u0393\u03b7",
            RU: "\u0417\u0435\u043c\u0435\u043b\u044c\u043d\u044b\u0435 \u0443\u0447\u0430\u0441\u0442\u043a\u0438",
            ZH: "\u571f\u5730"
        },
        TXT_LINKED_DETACHED_BUNGALOW: {
            ZH: "\u8fde\u63a5\u578b\u72ec\u7acb\u522b\u5885",
            EN: "Linked detached bungalow",
            GR: "\u03a3\u03c5\u03bd\u03b4\u03b5\u03b4\u03b5\u03bc\u03ad\u03bd\u03bf \u03bc\u03c0\u03ac\u03bd\u03b3\u03ba\u03b1\u03bb\u03bf\u03bf\u03c5",
            RU: "\u0421\u043c\u0435\u0436\u043d\u043e\u0435 \u043e\u0434\u043d\u043e\u0441\u0435\u043c\u0435\u0439\u043d\u043e\u0435 \u0431\u0443\u043d\u0433\u0430\u043b\u043e"
        },
        TXT_LINKED_DETACHED_HOUSE: {
            ZH: "\u8fde\u63a5\u578b\u72ec\u7acb\u4f4f\u5b85",
            EN: "Linked detached house",
            GR: "\u03a3\u03c5\u03bd\u03b4\u03b5\u03b4\u03b5\u03bc\u03ad\u03bd\u03b7 \u03bc\u03bf\u03bd\u03bf\u03ba\u03b1\u03c4\u03bf\u03b9\u03ba\u03af\u03b1",
            RU: "\u0421\u043c\u0435\u0436\u043d\u044b\u0439 \u043e\u0434\u043d\u043e\u0441\u0435\u043c\u0435\u0439\u043d\u044b\u0439 \u0434\u043e\u043c"
        },
        TXT_MAISONETTE: {
            ZH: "\u590d\u5f0f\u4f4f\u5b85",
            EN: "Maisonette",
            GR: "\u039c\u03b5\u03b6\u03bf\u03bd\u03ad\u03c4\u03b1",
            RU: "\u0414\u0432\u0443\u0445\u044d\u0442\u0430\u0436\u043d\u0430\u044f \u043a\u0432\u0430\u0440\u0442\u0438\u0440\u0430"
        },
        TXT_PENTHOUSE: {
            ZH: "\u9876\u5c42\u8c6a\u534e\u516c\u5bd3",
            EN: "Penthouse",
            GR: "\u03a1\u03b5\u03c4\u03b9\u03c1\u03ad",
            RU: "\u041f\u0435\u043d\u0442\u0445\u0430\u0443\u0441"
        },
        TXT_PLOT: {
            EN: "Plot",
            GR: "\u039f\u03b9\u03ba\u03cc\u03c0\u03b5\u03b4\u03bf",
            RU: "\u0423\u0447\u0430\u0441\u0442\u043e\u043a",
            ZH: "\u5730\u5757"
        },
        TXT_REGION_PLACEHOLDER: {
            EN: "e.g. 'Coral Bay' or 'Paphos' or 'Ayia Napa' or property ID",
            GR: "\u03c0.\u03c7. 'K\u03cc\u03bb\u03c0\u03bf\u03c2 \u03c4\u03c9\u03bd \u039a\u03bf\u03c1\u03b1\u03bb\u03bb\u03af\u03c9\u03bd' \u03ae '\u03a0\u03ac\u03c6\u03bf\u03c2' \u03ae '\u0391\u03b3\u03af\u03b1 \u039d\u03ac\u03c0\u03b1' \u03ae \u03c4\u03b1\u03c5\u03c4\u03cc\u03c4\u03b7\u03c4\u03b1 \u03b1\u03ba\u03b9\u03bd\u03ae\u03c4\u03bf\u03c5",
            RU: '\u043d\u0430\u043f\u0440\u0438\u043c\u0435\u0440, "\u041a\u043e\u0440\u0430\u043b \u0411\u044d\u0439" \u0438\u043b\u0438 "\u041f\u0430\u0444\u043e\u0441" \u0438\u043b\u0438 "\u0410\u0439\u044f-\u041d\u0430\u043f\u0430" \u0438\u043b\u0438 ID \u043e\u0431\u044a\u0435\u043a\u0442\u0430',
            ZH: "\u4f8b\u5982 '\u73ca\u745a\u6e7e' \u6216 '\u5e15\u798f\u65af' \u6216 '\u5723\u7eb3\u5e15' \u6216\u623f\u4ea7\u7f16\u53f7 "
        },
        TXT_SEMI_DETACHED_HOUSE: {
            ZH: "\u534a\u72ec\u7acb\u5f0f\u4f4f\u5b85",
            EN: "Semi-detached house",
            GR: "\u0397\u03bc\u03b9\u03b1\u03bd\u03b5\u03be\u03ac\u03c1\u03c4\u03b7\u03c4\u03b7 \u03bc\u03bf\u03bd\u03bf\u03ba\u03b1\u03c4\u03bf\u03b9\u03ba\u03af\u03b1",
            RU: "\u0414\u0432\u0443\u0445\u043a\u0432\u0430\u0440\u0442\u0438\u0440\u043d\u044b\u0439 \u043e\u0441\u043e\u0431\u043d\u044f\u043a"
        },
        TXT_SEMI_DETACHED_BUNGALOW: {
            ZH: "\u8054\u6392\u522b\u5885",
            EN: "Semi-detached bungalow",
            GR: "\u0397\u03bc\u03b9\u03b1\u03bd\u03b5\u03be\u03ac\u03c1\u03c4\u03b7\u03c4\u03bf \u03bc\u03c0\u03ac\u03bd\u03b3\u03ba\u03b1\u03bb\u03bf\u03bf\u03c5",
            RU: "\u0414\u0432\u0443\u0445\u043a\u0432\u0430\u0440\u0442\u0438\u0440\u043d\u044b\u0439 \u0411\u0443\u043d\u0433\u0430\u043b\u043e"
        },
        TXT_SUBTYPES: {
            EN: "subtypes",
            GR: "\u03c5\u03c0\u03bf\u03ba\u03b1\u03c4\u03b7\u03b3\u03bf\u03c1\u03af\u03b5\u03c2",
            RU: "\u043f\u043e\u0434\u0442\u0438\u043f\u044b",
            ZH: "\u5b50\u7c7b\u578b"
        },
        TXT_TOWN_HOUSE: {
            ZH: "\u5e02\u5185\u4f4f\u5b85",
            EN: "Town house",
            GR: "\u039c\u03b5\u03b6\u03bf\u03bd\u03ad\u03c4\u03b1",
            RU: "\u0422\u0430\u0443\u043d\u0445\u0430\u0443\u0441"
        },
        TXT_TYPE_TO_ADD_MORE: {
            EN: "Type to add more",
            GR: "\u03a0\u03bb\u03b7\u03ba\u03c4\u03c1\u03bf\u03bb\u03bf\u03b3\u03ae\u03c3\u03c4\u03b5 \u03b3\u03b9\u03b1 \u03bd\u03b1 \u03c0\u03c1\u03bf\u03c3\u03b8\u03ad\u03c3\u03b5\u03c4\u03b5 \u03c0\u03b5\u03c1\u03b9\u03c3\u03c3\u03cc\u03c4\u03b5\u03c1\u03b1",
            RU: "\u041f\u0435\u0447\u0430\u0442\u0430\u0439\u0442\u0435, \u0447\u0442\u043e\u0431\u044b \u0434\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0431\u043e\u043b\u044c\u0448\u0435",
            ZH: "\u952e\u5165\u6765\u6dfb\u52a0\u66f4\u591a"
        }
    }, elmBody = document.getElementsByTagName("BODY")[0], slideshowCanvas = document.getElementById("slideshow-canvas"),
    slideshowCanvasImgList = document.getElementById("slideshow-canvas-img-list"),
    gridItemMapContainer = document.getElementById("fullscreen-placeholder"),
    buttonFullScreen = document.getElementById("slider-button-fullscreen"),
    buttonFullScreenExit = document.getElementById("slider-button-fullscreen-exit"), buttonFullScreenGridItem = null,
    buttonFullScreenGridItemExit =
        null, g_maxPageListingsCount = 24, g_pageListingsCount = 0, resetSlideshowCanvasSize = function (a) {
        void 0 != slideshowCanvas && (slideshowCanvas.style.maxHeight = "none", slideshowCanvasImgList.style.maxHeight = "none", slideshowCanvas.style.height = "auto");
        void 0 != a && "" != a && (a = document.getElementById("bs-slider-container" + a), void 0 != a && (a.style.height = "auto"));
        void 0 != buttonFullScreen && (buttonFullScreen.style.display = "none", buttonFullScreenExit.style.display = "block")
    }, setSlideshowCanvasSize = function (a) {
        var c = .61 * window.innerHeight;
        850 > window.innerWidth && (c = 560 * window.innerWidth / 850);
        void 0 != slideshowCanvas && (slideshowCanvas.style.maxHeight = c + "px", slideshowCanvasImgList.style.maxHeight = c + "px", slideshowCanvas.style.height = c + "px");
        void 0 != a && "" != a && (a = this["oSwiper" + a], void 0 != oSwiperFullscreen && a.slideTo(oSwiperFullscreen.activeIndex, 3));
        void 0 != buttonFullScreen && (buttonFullScreen.style.display = "block", buttonFullScreenExit.style.display = "none")
    }, fixGridSliderHeight = function () {
        for (var a = 0; 25 > a; a++) {
            var c = document.getElementById("bs-slider-container" +
                a);
            void 0 != c && (c.style.height = "265px")
        }
    }, fixGridSliderFulscreenMode = function () {
        "undefined" != typeof oSwiperCurrent && void 0 != oSwiperCurrent && "undefined" != typeof oSwiperFullscreen && void 0 != oSwiperFullscreen && (oSwiperCurrent.slideTo(oSwiperFullscreen.activeIndex, 3), oSwiperFullscreen.disableKeyboardControl(), void 0 != oSwiper && oSwiper.enableKeyboardControl())
    }, searchToolbarResize = function () {
        var a = window.innerWidth, c = document.getElementById("menu-property-type-outer"),
            d = document.getElementById("menu-beds"),
            f = document.getElementById("menu-price");
        void 0 != c && (1250 <= a ? (c.style.display = "block", void 0 != d && (d.style.display = "flex")) : (c.style.display = "none", void 0 != d && (d.style.display = "none")), void 0 != f && (f.style.display = 820 <= a ? "flex" : "none"))
    }, slideshowCanvasResize = function () {
        if (isFullScreenMode()) resetSlideshowCanvasSize(); else {
            var a = getDevice();
            a.isIDevice || a.isMac && a.isSafari || !isFullScreen || isFullScreenClicked || (isFullScreen = !1, removeClass(document.body, "fullscreen"), window.scrollTo(redirectXpos, redirectYpos));
            isFullScreenClicked = a.isMobile ? !1 : !0;
            setSlideshowCanvasSize();
            fixGridSliderFulscreenMode()
        }
    }, resizeWindow = function () {
        slideshowCanvasResize();
        searchToolbarResize();
        showHideFillerAds()
    }, loaded = function () {
        resizeWindow()
    }, showHideFillerAds = function () {
        var a = document.getElementById("listingItem25"), c = document.getElementById("listingItem26"),
            d = document.getElementById("listingItem27"), f = document.getElementById("listings-count"),
            n = -1 < window.location.href.indexOf("/favourites/");
        g_pageListingsCount = void 0 ==
        f ? 0 : 1 * f.value;
        !n && 0 < g_pageListingsCount && (g_pageListingsCount += 1);
        n = window.innerWidth;
        f = 1;
        g_pageListingsCount == g_maxPageListingsCount ? void 0 != a && (a.style.display = "none", c.style.display = "none", d.style.display = "none") : (1650 <= n ? f = 4 : 1250 <= n ? f = 3 : 820 <= n && (f = 2), n = g_pageListingsCount % f, f = 0 == n ? 0 : f - n, void 0 != a && (a.style.display = 1 <= f ? "block" : "none"), void 0 != c && (c.style.display = 2 <= f ? "block" : "none"), void 0 != d && (d.style.display = 3 <= f ? "block" : "none"))
    };
(function () {
    function a(a) {
        a.fn.swiper = function (c) {
            var e;
            a(this).each(function () {
                var a = new d(this, c);
                e || (e = a)
            });
            return e
        }
    }

    var c, d = function (a, l) {
        function e() {
            b.autoplayTimeoutId = setTimeout(function () {
                b.params.loop ? (b.fixLoop(), b._slideNext(), b.emit("onAutoplay", b)) : b.isEnd ? l.autoplayStopOnLast ? b.stopAutoplay() : (b._slideTo(0), b.emit("onAutoplay", b)) : (b._slideNext(), b.emit("onAutoplay", b))
            }, b.params.autoplay)
        }

        function h(b, a) {
            b = c(b.target);
            if (!b.is(a)) if ("string" === typeof a) b = b.parents(a); else if (a.nodeType) {
                var p;
                b.parents().each(function (b, c) {
                    c === a && (p = a)
                });
                if (p) return a;
                return
            }
            if (0 !== b.length) return b[0]
        }

        function k(a, c) {
            c = c || {};
            var p = new (window.MutationObserver || window.WebkitMutationObserver)(function (a) {
                a.forEach(function (a) {
                    b.onResize(!0);
                    b.emit("onObserverUpdate", b, a)
                })
            });
            p.observe(a, {
                attributes: "undefined" === typeof c.attributes ? !0 : c.attributes,
                childList: "undefined" === typeof c.childList ? !0 : c.childList,
                characterData: "undefined" === typeof c.characterData ? !0 : c.characterData
            });
            b.observers.push(p)
        }

        function m(a) {
            a.originalEvent &&
            (a = a.originalEvent);
            var c = a.keyCode || a.charCode;
            if (!b.params.allowSwipeToNext && (b.isHorizontal() && 39 === c || !b.isHorizontal() && 40 === c) || !b.params.allowSwipeToPrev && (b.isHorizontal() && 37 === c || !b.isHorizontal() && 38 === c)) return !1;
            if (!(a.shiftKey || a.altKey || a.ctrlKey || a.metaKey || document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase()))) {
                if (37 === c || 39 === c || 38 === c || 40 === c) {
                    var p = !1;
                    if (0 < b.container.parents(".swiper-slide").length &&
                        0 === b.container.parents(".swiper-slide-active").length) return;
                    var e = window.pageXOffset, d = window.pageYOffset, h = window.innerWidth, f = window.innerHeight,
                        g = b.container.offset();
                    b.rtl && (g.left -= b.container[0].scrollLeft);
                    g = [[g.left, g.top], [g.left + b.width, g.top], [g.left, g.top + b.height], [g.left + b.width, g.top + b.height]];
                    for (var q = 0; q < g.length; q++) {
                        var k = g[q];
                        k[0] >= e && k[0] <= e + h && k[1] >= d && k[1] <= d + f && (p = !0)
                    }
                    if (!p) return
                }
                if (b.isHorizontal()) {
                    if (37 === c || 39 === c) a.preventDefault ? a.preventDefault() : a.returnValue =
                        !1;
                    (39 === c && !b.rtl || 37 === c && b.rtl) && b.slideNext();
                    (37 === c && !b.rtl || 39 === c && b.rtl) && b.slidePrev()
                } else {
                    if (38 === c || 40 === c) a.preventDefault ? a.preventDefault() : a.returnValue = !1;
                    40 === c && b.slideNext();
                    38 === c && b.slidePrev()
                }
            }
        }

        function g(a) {
            a.originalEvent && (a = a.originalEvent);
            var c = b.mousewheel.event, p = 0, e = b.rtl ? -1 : 1;
            if ("mousewheel" === c) if (b.params.mousewheelForceToAxis) if (b.isHorizontal()) if (Math.abs(a.wheelDeltaX) > Math.abs(a.wheelDeltaY)) p = a.wheelDeltaX * e; else return; else if (Math.abs(a.wheelDeltaY) > Math.abs(a.wheelDeltaX)) p =
                a.wheelDeltaY; else return; else p = Math.abs(a.wheelDeltaX) > Math.abs(a.wheelDeltaY) ? -a.wheelDeltaX * e : -a.wheelDeltaY; else if ("DOMMouseScroll" === c) p = -a.detail; else if ("wheel" === c) if (b.params.mousewheelForceToAxis) if (b.isHorizontal()) if (Math.abs(a.deltaX) > Math.abs(a.deltaY)) p = -a.deltaX * e; else return; else if (Math.abs(a.deltaY) > Math.abs(a.deltaX)) p = -a.deltaY; else return; else p = Math.abs(a.deltaX) > Math.abs(a.deltaY) ? -a.deltaX * e : -a.deltaY;
            if (0 !== p) {
                b.params.mousewheelInvert && (p = -p);
                if (b.params.freeMode) {
                    if (c =
                        b.getWrapperTranslate() + p * b.params.mousewheelSensitivity, p = b.isBeginning, e = b.isEnd, c >= b.minTranslate() && (c = b.minTranslate()), c <= b.maxTranslate() && (c = b.maxTranslate()), b.setWrapperTransition(0), b.setWrapperTranslate(c), b.updateProgress(), b.updateActiveIndex(), (!p && b.isBeginning || !e && b.isEnd) && b.updateClasses(), b.params.freeModeSticky ? (clearTimeout(b.mousewheel.timeout), b.mousewheel.timeout = setTimeout(function () {
                        b.slideReset()
                    }, 300)) : b.params.lazyLoading && b.lazy && b.lazy.load(), 0 === c || c === b.maxTranslate()) return
                } else {
                    if (60 <
                        (new window.Date).getTime() - b.mousewheel.lastScrollTime) if (0 > p) if ((!b.isEnd || b.params.loop) && !b.animating) b.slideNext(); else {
                        if (b.params.mousewheelReleaseOnEdges) return !0
                    } else if ((!b.isBeginning || b.params.loop) && !b.animating) b.slidePrev(); else if (b.params.mousewheelReleaseOnEdges) return !0;
                    b.mousewheel.lastScrollTime = (new window.Date).getTime()
                }
                b.params.autoplay && b.stopAutoplay();
                a.preventDefault ? a.preventDefault() : a.returnValue = !1;
                return !1
            }
        }

        function n(a, e) {
            a = c(a);
            var p = b.rtl ? -1 : 1;
            var d = a.attr("data-swiper-parallax") ||
                "0";
            var h = a.attr("data-swiper-parallax-x");
            var f = a.attr("data-swiper-parallax-y");
            h || f ? (h = h || "0", f = f || "0") : b.isHorizontal() ? (h = d, f = "0") : (f = d, h = "0");
            h = 0 <= h.indexOf("%") ? parseInt(h, 10) * e * p + "%" : h * e * p + "px";
            f = 0 <= f.indexOf("%") ? parseInt(f, 10) * e + "%" : f * e + "px";
            a.transform("translate3d(" + h + ", " + f + ",0px)")
        }

        function z(b) {
            0 !== b.indexOf("on") && (b = b[0] !== b[0].toUpperCase() ? "on" + b[0].toUpperCase() + b.substring(1) : "on" + b);
            return b
        }

        if (!(this instanceof d)) return new d(a, l);
        var A = {
            direction: "horizontal",
            touchEventsTarget: "container",
            initialSlide: 0,
            speed: 300,
            autoplay: !1,
            autoplayDisableOnInteraction: !0,
            autoplayStopOnLast: !1,
            iOSEdgeSwipeDetection: !1,
            iOSEdgeSwipeThreshold: 20,
            freeMode: !1,
            freeModeMomentum: !0,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: !0,
            freeModeMomentumBounceRatio: 1,
            freeModeSticky: !1,
            freeModeMinimumVelocity: .02,
            autoHeight: !1,
            setWrapperSize: !1,
            virtualTranslate: !1,
            effect: "slide",
            coverflow: {rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: !0},
            flip: {slideShadows: !0, limitRotation: !0},
            cube: {
                slideShadows: !0, shadow: !0,
                shadowOffset: 20, shadowScale: .94
            },
            fade: {crossFade: !1},
            parallax: !1,
            scrollbar: null,
            scrollbarHide: !0,
            scrollbarDraggable: !1,
            scrollbarSnapOnRelease: !1,
            keyboardControl: !1,
            mousewheelControl: !1,
            mousewheelReleaseOnEdges: !1,
            mousewheelInvert: !1,
            mousewheelForceToAxis: !1,
            mousewheelSensitivity: 1,
            hashnav: !1,
            breakpoints: void 0,
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: "column",
            slidesPerGroup: 1,
            centeredSlides: !1,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            roundLengths: !1,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: !0,
            shortSwipes: !0,
            longSwipes: !0,
            longSwipesRatio: .5,
            longSwipesMs: 300,
            followFinger: !0,
            onlyExternal: !1,
            threshold: 0,
            touchMoveStopPropagation: !0,
            uniqueNavElements: !0,
            pagination: null,
            paginationElement: "span",
            paginationClickable: !1,
            paginationHide: !1,
            paginationBulletRender: null,
            paginationProgressRender: null,
            paginationFractionRender: null,
            paginationCustomRender: null,
            paginationType: "bullets",
            resistance: !0,
            resistanceRatio: .85,
            nextButton: null,
            prevButton: null,
            watchSlidesProgress: !1,
            watchSlidesVisibility: !1,
            grabCursor: !1,
            preventClicks: !0,
            preventClicksPropagation: !0,
            slideToClickedSlide: !1,
            lazyLoading: !1,
            lazyLoadingInPrevNext: !1,
            lazyLoadingInPrevNextAmount: 1,
            lazyLoadingOnTransitionStart: !1,
            preloadImages: !0,
            updateOnImagesReady: !0,
            loop: !1,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            control: void 0,
            controlInverse: !1,
            controlBy: "slide",
            allowSwipeToPrev: !0,
            allowSwipeToNext: !0,
            swipeHandler: null,
            noSwiping: !0,
            noSwipingClass: "swiper-no-swiping",
            slideClass: "swiper-slide",
            slideActiveClass: "swiper-slide-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            slideNextClass: "swiper-slide-next",
            slidePrevClass: "swiper-slide-prev",
            wrapperClass: "swiper-wrapper",
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
            buttonDisabledClass: "swiper-button-disabled",
            paginationCurrentClass: "swiper-pagination-current",
            paginationTotalClass: "swiper-pagination-total",
            paginationHiddenClass: "swiper-pagination-hidden",
            paginationProgressbarClass: "swiper-pagination-progressbar",
            observer: !1,
            observeParents: !1,
            a11y: !1,
            prevSlideMessage: "Previous slide",
            nextSlideMessage: "Next slide",
            firstSlideMessage: "This is the first slide",
            lastSlideMessage: "This is the last slide",
            paginationBulletMessage: "Go to slide {{index}}",
            runCallbacksOnInit: !0
        }, F = l && l.virtualTranslate;
        l = l || {};
        var w = {}, x;
        for (x in l) if ("object" !== typeof l[x] || null === l[x] || l[x].nodeType || l[x] === window || l[x] === document || "undefined" !== typeof f && l[x] instanceof f || "undefined" !== typeof jQuery && l[x] instanceof jQuery) w[x] = l[x]; else {
            w[x] = {};
            for (var E in l[x]) w[x][E] =
                l[x][E]
        }
        for (var q in A) if ("undefined" === typeof l[q]) l[q] = A[q]; else if ("object" === typeof l[q]) for (var y in A[q]) "undefined" === typeof l[q][y] && (l[q][y] = A[q][y]);
        var b = this;
        b.params = l;
        b.originalParams = w;
        b.classNames = [];
        "undefined" !== typeof c && "undefined" !== typeof f && (c = f);
        if ("undefined" === typeof c && (c = "undefined" === typeof f ? window.Dom7 || window.Zepto || window.jQuery : f, !c)) return;
        b.$ = c;
        b.currentBreakpoint = void 0;
        b.getActiveBreakpoint = function () {
            if (!b.params.breakpoints) return !1;
            var a = !1, c = [];
            for (d in b.params.breakpoints) b.params.breakpoints.hasOwnProperty(d) &&
            c.push(d);
            c.sort(function (b, a) {
                return parseInt(b, 10) > parseInt(a, 10)
            });
            for (var e = 0; e < c.length; e++) {
                var d = c[e];
                d >= window.innerWidth && !a && (a = d)
            }
            return a || "max"
        };
        b.setBreakpoint = function () {
            var a = b.getActiveBreakpoint();
            if (a && b.currentBreakpoint !== a) {
                var c = a in b.params.breakpoints ? b.params.breakpoints[a] : b.originalParams,
                    e = b.params.loop && c.slidesPerView !== b.params.slidesPerView, d;
                for (d in c) b.params[d] = c[d];
                b.currentBreakpoint = a;
                e && b.destroyLoop && b.reLoop(!0)
            }
        };
        b.params.breakpoints && b.setBreakpoint();
        b.container = c(a);
        if (0 !== b.container.length) {
            if (1 < b.container.length) {
                var Q = [];
                b.container.each(function () {
                    Q.push(new d(this, l))
                });
                return Q
            }
            b.container[0].swiper = b;
            b.container.data("swiper", b);
            b.classNames.push("swiper-container-" + b.params.direction);
            b.params.freeMode && b.classNames.push("swiper-container-free-mode");
            b.support.flexbox || (b.classNames.push("swiper-container-no-flexbox"), b.params.slidesPerColumn = 1);
            b.params.autoHeight && b.classNames.push("swiper-container-autoheight");
            if (b.params.parallax ||
                b.params.watchSlidesVisibility) b.params.watchSlidesProgress = !0;
            0 <= ["cube", "coverflow", "flip"].indexOf(b.params.effect) && (b.support.transforms3d ? (b.params.watchSlidesProgress = !0, b.classNames.push("swiper-container-3d")) : b.params.effect = "slide");
            "slide" !== b.params.effect && b.classNames.push("swiper-container-" + b.params.effect);
            "cube" === b.params.effect && (b.params.resistanceRatio = 0, b.params.slidesPerView = 1, b.params.slidesPerColumn = 1, b.params.slidesPerGroup = 1, b.params.centeredSlides = !1, b.params.spaceBetween =
                0, b.params.virtualTranslate = !0, b.params.setWrapperSize = !1);
            if ("fade" === b.params.effect || "flip" === b.params.effect) b.params.slidesPerView = 1, b.params.slidesPerColumn = 1, b.params.slidesPerGroup = 1, b.params.watchSlidesProgress = !0, b.params.spaceBetween = 0, b.params.setWrapperSize = !1, "undefined" === typeof F && (b.params.virtualTranslate = !0);
            b.params.grabCursor && b.support.touch && (b.params.grabCursor = !1);
            b.wrapper = b.container.children("." + b.params.wrapperClass);
            b.params.pagination && (b.paginationContainer = c(b.params.pagination),
            b.params.uniqueNavElements && "string" === typeof b.params.pagination && 1 < b.paginationContainer.length && 1 === b.container.find(b.params.pagination).length && (b.paginationContainer = b.container.find(b.params.pagination)), "bullets" === b.params.paginationType && b.params.paginationClickable ? b.paginationContainer.addClass("swiper-pagination-clickable") : b.params.paginationClickable = !1, b.paginationContainer.addClass("swiper-pagination-" + b.params.paginationType));
            if (b.params.nextButton || b.params.prevButton) b.params.nextButton &&
            (b.nextButton = c(b.params.nextButton), b.params.uniqueNavElements && "string" === typeof b.params.nextButton && 1 < b.nextButton.length && 1 === b.container.find(b.params.nextButton).length && (b.nextButton = b.container.find(b.params.nextButton))), b.params.prevButton && (b.prevButton = c(b.params.prevButton), b.params.uniqueNavElements && "string" === typeof b.params.prevButton && 1 < b.prevButton.length && 1 === b.container.find(b.params.prevButton).length && (b.prevButton = b.container.find(b.params.prevButton)));
            b.isHorizontal = function () {
                return "horizontal" ===
                    b.params.direction
            };
            b.rtl = b.isHorizontal() && ("rtl" === b.container[0].dir.toLowerCase() || "rtl" === b.container.css("direction"));
            b.rtl && b.classNames.push("swiper-container-rtl");
            b.rtl && (b.wrongRTL = "-webkit-box" === b.wrapper.css("display"));
            1 < b.params.slidesPerColumn && b.classNames.push("swiper-container-multirow");
            b.device.android && b.classNames.push("swiper-container-android");
            b.container.addClass(b.classNames.join(" "));
            b.translate = 0;
            b.progress = 0;
            b.velocity = 0;
            b.lockSwipeToNext = function () {
                b.params.allowSwipeToNext =
                    !1
            };
            b.lockSwipeToPrev = function () {
                b.params.allowSwipeToPrev = !1
            };
            b.lockSwipes = function () {
                b.params.allowSwipeToNext = b.params.allowSwipeToPrev = !1
            };
            b.unlockSwipeToNext = function () {
                b.params.allowSwipeToNext = !0
            };
            b.unlockSwipeToPrev = function () {
                b.params.allowSwipeToPrev = !0
            };
            b.unlockSwipes = function () {
                b.params.allowSwipeToNext = b.params.allowSwipeToPrev = !0
            };
            b.params.grabCursor && (b.container[0].style.cursor = "move", b.container[0].style.cursor = "-webkit-grab", b.container[0].style.cursor = "-moz-grab", b.container[0].style.cursor =
                "grab");
            b.imagesToLoad = [];
            b.imagesLoaded = 0;
            b.loadImage = function (b, a, c, e, d) {
                function p() {
                    d && d()
                }

                b.complete && e ? p() : a ? (b = new window.Image, b.onload = p, b.onerror = p, c && (b.srcset = c), a && (b.src = a)) : p()
            };
            b.preloadImages = function () {
                function a() {
                    "undefined" !== typeof b && null !== b && (void 0 !== b.imagesLoaded && b.imagesLoaded++, b.imagesLoaded === b.imagesToLoad.length && (b.params.updateOnImagesReady && b.update(), b.emit("onImagesReady", b)))
                }

                b.imagesToLoad = b.container.find("img");
                for (var c = 0; c < b.imagesToLoad.length; c++) b.loadImage(b.imagesToLoad[c],
                    b.imagesToLoad[c].currentSrc || b.imagesToLoad[c].getAttribute("src"), b.imagesToLoad[c].srcset || b.imagesToLoad[c].getAttribute("srcset"), !0, a)
            };
            b.autoplayTimeoutId = void 0;
            b.autoplaying = !1;
            b.autoplayPaused = !1;
            b.startAutoplay = function () {
                if ("undefined" !== typeof b.autoplayTimeoutId || !b.params.autoplay || b.autoplaying) return !1;
                b.autoplaying = !0;
                b.emit("onAutoplayStart", b);
                e()
            };
            b.stopAutoplay = function (a) {
                b.autoplayTimeoutId && (b.autoplayTimeoutId && clearTimeout(b.autoplayTimeoutId), b.autoplaying = !1, b.autoplayTimeoutId =
                    void 0, b.emit("onAutoplayStop", b))
            };
            b.pauseAutoplay = function (a) {
                b.autoplayPaused || (b.autoplayTimeoutId && clearTimeout(b.autoplayTimeoutId), b.autoplayPaused = !0, 0 === a ? (b.autoplayPaused = !1, e()) : b.wrapper.transitionEnd(function () {
                    b && (b.autoplayPaused = !1, b.autoplaying ? e() : b.stopAutoplay())
                }))
            };
            b.minTranslate = function () {
                return -b.snapGrid[0]
            };
            b.maxTranslate = function () {
                return -b.snapGrid[b.snapGrid.length - 1]
            };
            b.updateAutoHeight = function () {
                var a = b.slides.eq(b.activeIndex)[0];
                "undefined" !== typeof a && (a = a.offsetHeight) &&
                b.wrapper.css("height", a + "px")
            };
            b.updateContainerSize = function () {
                var a = "undefined" !== typeof b.params.width ? b.params.width : b.container[0].clientWidth;
                var c = "undefined" !== typeof b.params.height ? b.params.height : b.container[0].clientHeight;
                0 === a && b.isHorizontal() || 0 === c && !b.isHorizontal() || (a = a - parseInt(b.container.css("padding-left"), 10) - parseInt(b.container.css("padding-right"), 10), c = c - parseInt(b.container.css("padding-top"), 10) - parseInt(b.container.css("padding-bottom"), 10), b.width = a, b.height = c, b.size =
                    b.isHorizontal() ? b.width : b.height)
            };
            b.updateSlidesSize = function () {
                b.slides = b.wrapper.children("." + b.params.slideClass);
                b.snapGrid = [];
                b.slidesGrid = [];
                b.slidesSizesGrid = [];
                var a = b.params.spaceBetween, c = -b.params.slidesOffsetBefore, e, d = 0, h = 0;
                if ("undefined" !== typeof b.size) {
                    "string" === typeof a && 0 <= a.indexOf("%") && (a = parseFloat(a.replace("%", "")) / 100 * b.size);
                    b.virtualSize = -a;
                    b.rtl ? b.slides.css({marginLeft: "", marginTop: ""}) : b.slides.css({
                        marginRight: "",
                        marginBottom: ""
                    });
                    if (1 < b.params.slidesPerColumn) {
                        var f =
                            Math.floor(b.slides.length / b.params.slidesPerColumn) === b.slides.length / b.params.slidesPerColumn ? b.slides.length : Math.ceil(b.slides.length / b.params.slidesPerColumn) * b.params.slidesPerColumn;
                        "auto" !== b.params.slidesPerView && "row" === b.params.slidesPerColumnFill && (f = Math.max(f, b.params.slidesPerView * b.params.slidesPerColumn))
                    }
                    var g = b.params.slidesPerColumn, q = f / g,
                        k = q - (b.params.slidesPerColumn * q - b.slides.length);
                    for (e = 0; e < b.slides.length; e++) {
                        var l = 0;
                        var m = b.slides.eq(e);
                        if (1 < b.params.slidesPerColumn) {
                            if ("column" ===
                                b.params.slidesPerColumnFill) {
                                var r = Math.floor(e / g);
                                var n = e - r * g;
                                (r > k || r === k && n === g - 1) && ++n >= g && (n = 0, r++);
                                var y = r + n * f / g;
                                m.css({
                                    "-webkit-box-ordinal-group": y,
                                    "-moz-box-ordinal-group": y,
                                    "-ms-flex-order": y,
                                    "-webkit-order": y,
                                    order: y
                                })
                            } else n = Math.floor(e / q), r = e - n * q;
                            m.css({"margin-top": 0 !== n && b.params.spaceBetween && b.params.spaceBetween + "px"}).attr("data-swiper-column", r).attr("data-swiper-row", n)
                        }
                        "none" !== m.css("display") && ("auto" === b.params.slidesPerView ? (l = b.isHorizontal() ? m.outerWidth(!0) : m.outerHeight(!0),
                        b.params.roundLengths && (l = Math.floor(l))) : (l = (b.size - (b.params.slidesPerView - 1) * a) / b.params.slidesPerView, b.params.roundLengths && (l = Math.floor(l)), b.isHorizontal() ? b.slides[e].style.width = l + "px" : b.slides[e].style.height = l + "px"), b.slides[e].swiperSlideSize = l, b.slidesSizesGrid.push(l), b.params.centeredSlides ? (c = c + l / 2 + d / 2 + a, 0 === e && (c = c - b.size / 2 - a), .001 > Math.abs(c) && (c = 0), 0 === h % b.params.slidesPerGroup && b.snapGrid.push(c), b.slidesGrid.push(c)) : (0 === h % b.params.slidesPerGroup && b.snapGrid.push(c), b.slidesGrid.push(c),
                            c = c + l + a), b.virtualSize += l + a, d = l, h++)
                    }
                    b.virtualSize = Math.max(b.virtualSize, b.size) + b.params.slidesOffsetAfter;
                    b.rtl && b.wrongRTL && ("slide" === b.params.effect || "coverflow" === b.params.effect) && b.wrapper.css({width: b.virtualSize + b.params.spaceBetween + "px"});
                    if (!b.support.flexbox || b.params.setWrapperSize) b.isHorizontal() ? b.wrapper.css({width: b.virtualSize + b.params.spaceBetween + "px"}) : b.wrapper.css({height: b.virtualSize + b.params.spaceBetween + "px"});
                    if (1 < b.params.slidesPerColumn && (b.virtualSize = (l + b.params.spaceBetween) *
                        f, b.virtualSize = Math.ceil(b.virtualSize / b.params.slidesPerColumn) - b.params.spaceBetween, b.wrapper.css({width: b.virtualSize + b.params.spaceBetween + "px"}), b.params.centeredSlides)) {
                        c = [];
                        for (e = 0; e < b.snapGrid.length; e++) b.snapGrid[e] < b.virtualSize + b.snapGrid[0] && c.push(b.snapGrid[e]);
                        b.snapGrid = c
                    }
                    if (!b.params.centeredSlides) {
                        c = [];
                        for (e = 0; e < b.snapGrid.length; e++) b.snapGrid[e] <= b.virtualSize - b.size && c.push(b.snapGrid[e]);
                        b.snapGrid = c;
                        1 < Math.floor(b.virtualSize - b.size) - Math.floor(b.snapGrid[b.snapGrid.length -
                        1]) && b.snapGrid.push(b.virtualSize - b.size)
                    }
                    0 === b.snapGrid.length && (b.snapGrid = [0]);
                    0 !== b.params.spaceBetween && (b.isHorizontal() ? b.rtl ? b.slides.css({marginLeft: a + "px"}) : b.slides.css({marginRight: a + "px"}) : b.slides.css({marginBottom: a + "px"}));
                    b.params.watchSlidesProgress && b.updateSlidesOffset()
                }
            };
            b.updateSlidesOffset = function () {
                for (var a = 0; a < b.slides.length; a++) b.slides[a].swiperSlideOffset = b.isHorizontal() ? b.slides[a].offsetLeft : b.slides[a].offsetTop
            };
            b.updateSlidesProgress = function (a) {
                "undefined" ===
                typeof a && (a = b.translate || 0);
                if (0 !== b.slides.length) {
                    "undefined" === typeof b.slides[0].swiperSlideOffset && b.updateSlidesOffset();
                    var c = -a;
                    b.rtl && (c = a);
                    b.slides.removeClass(b.params.slideVisibleClass);
                    for (a = 0; a < b.slides.length; a++) {
                        var e = b.slides[a],
                            d = (c - e.swiperSlideOffset) / (e.swiperSlideSize + b.params.spaceBetween);
                        if (b.params.watchSlidesVisibility) {
                            var p = -(c - e.swiperSlideOffset), h = p + b.slidesSizesGrid[a];
                            (0 <= p && p < b.size || 0 < h && h <= b.size || 0 >= p && h >= b.size) && b.slides.eq(a).addClass(b.params.slideVisibleClass)
                        }
                        e.progress =
                            b.rtl ? -d : d
                    }
                }
            };
            b.updateProgress = function (a) {
                "undefined" === typeof a && (a = b.translate || 0);
                var c = b.maxTranslate() - b.minTranslate(), e = b.isBeginning, d = b.isEnd;
                0 === c ? (b.progress = 0, b.isBeginning = b.isEnd = !0) : (b.progress = (a - b.minTranslate()) / c, b.isBeginning = 0 >= b.progress, b.isEnd = 1 <= b.progress);
                b.isBeginning && !e && b.emit("onReachBeginning", b);
                b.isEnd && !d && b.emit("onReachEnd", b);
                b.params.watchSlidesProgress && b.updateSlidesProgress(a);
                b.emit("onProgress", b, b.progress)
            };
            b.updateActiveIndex = function () {
                var a = b.rtl ?
                    b.translate : -b.translate, c, e;
                for (e = 0; e < b.slidesGrid.length; e++) "undefined" !== typeof b.slidesGrid[e + 1] ? a >= b.slidesGrid[e] && a < b.slidesGrid[e + 1] - (b.slidesGrid[e + 1] - b.slidesGrid[e]) / 2 ? c = e : a >= b.slidesGrid[e] && a < b.slidesGrid[e + 1] && (c = e + 1) : a >= b.slidesGrid[e] && (c = e);
                if (0 > c || "undefined" === typeof c) c = 0;
                a = Math.floor(c / b.params.slidesPerGroup);
                a >= b.snapGrid.length && (a = b.snapGrid.length - 1);
                c !== b.activeIndex && (b.snapIndex = a, b.previousIndex = b.activeIndex, b.activeIndex = c, b.updateClasses())
            };
            b.updateClasses = function () {
                b.slides.removeClass(b.params.slideActiveClass +
                    " " + b.params.slideNextClass + " " + b.params.slidePrevClass);
                var a = b.slides.eq(b.activeIndex);
                a.addClass(b.params.slideActiveClass);
                var e = a.next("." + b.params.slideClass).addClass(b.params.slideNextClass);
                b.params.loop && 0 === e.length && b.slides.eq(0).addClass(b.params.slideNextClass);
                a = a.prev("." + b.params.slideClass).addClass(b.params.slidePrevClass);
                b.params.loop && 0 === a.length && b.slides.eq(-1).addClass(b.params.slidePrevClass);
                if (b.paginationContainer && 0 < b.paginationContainer.length) {
                    a = b.params.loop ? Math.ceil((b.slides.length -
                        2 * b.loopedSlides) / b.params.slidesPerGroup) : b.snapGrid.length;
                    if (b.params.loop) {
                        var d = Math.ceil((b.activeIndex - b.loopedSlides) / b.params.slidesPerGroup);
                        d > b.slides.length - 1 - 2 * b.loopedSlides && (d -= b.slides.length - 2 * b.loopedSlides);
                        d > a - 1 && (d -= a);
                        0 > d && "bullets" !== b.params.paginationType && (d = a + d)
                    } else d = "undefined" !== typeof b.snapIndex ? b.snapIndex : b.activeIndex || 0;
                    "bullets" === b.params.paginationType && b.bullets && 0 < b.bullets.length && (b.bullets.removeClass(b.params.bulletActiveClass), 1 < b.paginationContainer.length ?
                        b.bullets.each(function () {
                            c(this).index() === d && c(this).addClass(b.params.bulletActiveClass)
                        }) : b.bullets.eq(d).addClass(b.params.bulletActiveClass));
                    "fraction" === b.params.paginationType && (b.paginationContainer.find("." + b.params.paginationCurrentClass).text(d + 1), b.paginationContainer.find("." + b.params.paginationTotalClass).text(a));
                    if ("progress" === b.params.paginationType) {
                        var h = e = (d + 1) / a, f = 1;
                        b.isHorizontal() || (f = e, h = 1);
                        b.paginationContainer.find("." + b.params.paginationProgressbarClass).transform("translate3d(0,0,0) scaleX(" +
                            h + ") scaleY(" + f + ")").transition(b.params.speed)
                    }
                    "custom" === b.params.paginationType && b.params.paginationCustomRender && (b.paginationContainer.html(b.params.paginationCustomRender(b, d + 1, a)), b.emit("onPaginationRendered", b, b.paginationContainer[0]))
                }
                b.params.loop || (b.params.prevButton && b.prevButton && 0 < b.prevButton.length && (b.isBeginning ? (b.prevButton.addClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.disable(b.prevButton)) : (b.prevButton.removeClass(b.params.buttonDisabledClass), b.params.a11y &&
                b.a11y && b.a11y.enable(b.prevButton))), b.params.nextButton && b.nextButton && 0 < b.nextButton.length && (b.isEnd ? (b.nextButton.addClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.disable(b.nextButton)) : (b.nextButton.removeClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.enable(b.nextButton))))
            };
            b.updatePagination = function () {
                if (b.params.pagination && b.paginationContainer && 0 < b.paginationContainer.length) {
                    var a = "";
                    if ("bullets" === b.params.paginationType) {
                        for (var c = b.params.loop ?
                            Math.ceil((b.slides.length - 2 * b.loopedSlides) / b.params.slidesPerGroup) : b.snapGrid.length, e = 0; e < c; e++) a = b.params.paginationBulletRender ? a + b.params.paginationBulletRender(e, b.params.bulletClass) : a + ("\x3c" + b.params.paginationElement + ' class\x3d"' + b.params.bulletClass + '"\x3e\x3c/' + b.params.paginationElement + "\x3e");
                        b.paginationContainer.html(a);
                        b.bullets = b.paginationContainer.find("." + b.params.bulletClass);
                        b.params.paginationClickable && b.params.a11y && b.a11y && b.a11y.initPagination()
                    }
                    "fraction" === b.params.paginationType &&
                    (a = b.params.paginationFractionRender ? b.params.paginationFractionRender(b, b.params.paginationCurrentClass, b.params.paginationTotalClass) : '\x3cspan class\x3d"' + b.params.paginationCurrentClass + '"\x3e\x3c/span\x3e / \x3cspan class\x3d"' + b.params.paginationTotalClass + '"\x3e\x3c/span\x3e', b.paginationContainer.html(a));
                    "progress" === b.params.paginationType && (a = b.params.paginationProgressRender ? b.params.paginationProgressRender(b, b.params.paginationProgressbarClass) : '\x3cspan class\x3d"' + b.params.paginationProgressbarClass +
                        '"\x3e\x3c/span\x3e', b.paginationContainer.html(a));
                    "custom" !== b.params.paginationType && b.emit("onPaginationRendered", b, b.paginationContainer[0])
                }
            };
            b.update = function (a) {
                function c() {
                    e = Math.min(Math.max(b.translate, b.maxTranslate()), b.minTranslate());
                    b.setWrapperTranslate(e);
                    b.updateActiveIndex();
                    b.updateClasses()
                }

                b.updateContainerSize();
                b.updateSlidesSize();
                b.updateProgress();
                b.updatePagination();
                b.updateClasses();
                b.params.scrollbar && b.scrollbar && b.scrollbar.set();
                if (a) {
                    var e;
                    b.controller && b.controller.spline &&
                    (b.controller.spline = void 0);
                    b.params.freeMode ? (c(), b.params.autoHeight && b.updateAutoHeight()) : (a = ("auto" === b.params.slidesPerView || 1 < b.params.slidesPerView) && b.isEnd && !b.params.centeredSlides ? b.slideTo(b.slides.length - 1, 0, !1, !0) : b.slideTo(b.activeIndex, 0, !1, !0)) || c()
                } else b.params.autoHeight && b.updateAutoHeight()
            };
            b.onResize = function (a) {
                b.params.breakpoints && b.setBreakpoint();
                var c = b.params.allowSwipeToPrev, e = b.params.allowSwipeToNext;
                b.params.allowSwipeToPrev = b.params.allowSwipeToNext = !0;
                b.updateContainerSize();
                b.updateSlidesSize();
                ("auto" === b.params.slidesPerView || b.params.freeMode || a) && b.updatePagination();
                b.params.scrollbar && b.scrollbar && b.scrollbar.set();
                b.controller && b.controller.spline && (b.controller.spline = void 0);
                a = !1;
                if (b.params.freeMode) {
                    var d = Math.min(Math.max(b.translate, b.maxTranslate()), b.minTranslate());
                    b.setWrapperTranslate(d);
                    b.updateActiveIndex();
                    b.updateClasses();
                    b.params.autoHeight && b.updateAutoHeight()
                } else b.updateClasses(), a = ("auto" === b.params.slidesPerView || 1 < b.params.slidesPerView) &&
                b.isEnd && !b.params.centeredSlides ? b.slideTo(b.slides.length - 1, 0, !1, !0) : b.slideTo(b.activeIndex, 0, !1, !0);
                b.params.lazyLoading && !a && b.lazy && b.lazy.load();
                b.params.allowSwipeToPrev = c;
                b.params.allowSwipeToNext = e
            };
            a = ["mousedown", "mousemove", "mouseup"];
            window.navigator.pointerEnabled ? a = ["pointerdown", "pointermove", "pointerup"] : window.navigator.msPointerEnabled && (a = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]);
            b.touchEvents = {
                start: b.support.touch || !b.params.simulateTouch ? "touchstart" : a[0],
                move: b.support.touch ||
                !b.params.simulateTouch ? "touchmove" : a[1],
                end: b.support.touch || !b.params.simulateTouch ? "touchend" : a[2]
            };
            (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === b.params.touchEventsTarget ? b.container : b.wrapper).addClass("swiper-wp8-" + b.params.direction);
            b.initEvents = function (a) {
                var c = a ? "off" : "on";
                a = a ? "removeEventListener" : "addEventListener";
                var e = "container" === b.params.touchEventsTarget ? b.container[0] : b.wrapper[0],
                    d = b.support.touch ? e : document, p = b.params.nested ? !0 : !1;
                b.browser.ie ?
                    (e[a](b.touchEvents.start, b.onTouchStart, !1), d[a](b.touchEvents.move, b.onTouchMove, p), d[a](b.touchEvents.end, b.onTouchEnd, !1)) : (b.support.touch && (e[a](b.touchEvents.start, b.onTouchStart, !1), e[a](b.touchEvents.move, b.onTouchMove, p), e[a](b.touchEvents.end, b.onTouchEnd, !1)), !l.simulateTouch || b.device.ios || b.device.android || (e[a]("mousedown", b.onTouchStart, !1), document[a]("mousemove", b.onTouchMove, p), document[a]("mouseup", b.onTouchEnd, !1)));
                window[a]("resize", b.onResize);
                if (b.params.nextButton && b.nextButton &&
                    0 < b.nextButton.length && (b.nextButton[c]("click", b.onClickNext), b.params.a11y && b.a11y)) b.nextButton[c]("keydown", b.a11y.onEnterKey);
                if (b.params.prevButton && b.prevButton && 0 < b.prevButton.length && (b.prevButton[c]("click", b.onClickPrev), b.params.a11y && b.a11y)) b.prevButton[c]("keydown", b.a11y.onEnterKey);
                if (b.params.pagination && b.params.paginationClickable && (b.paginationContainer[c]("click", "." + b.params.bulletClass, b.onClickIndex), b.params.a11y && b.a11y)) b.paginationContainer[c]("keydown", "." + b.params.bulletClass,
                    b.a11y.onEnterKey);
                if (b.params.preventClicks || b.params.preventClicksPropagation) e[a]("click", b.preventClicks, !0)
            };
            b.attachEvents = function () {
                b.initEvents()
            };
            b.detachEvents = function () {
                b.initEvents(!0)
            };
            b.allowClick = !0;
            b.preventClicks = function (a) {
                b.allowClick || (b.params.preventClicks && a.preventDefault(), b.params.preventClicksPropagation && b.animating && (a.stopPropagation(), a.stopImmediatePropagation()))
            };
            b.onClickNext = function (a) {
                a.preventDefault();
                b.isEnd && !b.params.loop || b.slideNext()
            };
            b.onClickPrev =
                function (a) {
                    a.preventDefault();
                    b.isBeginning && !b.params.loop || b.slidePrev()
                };
            b.onClickIndex = function (a) {
                a.preventDefault();
                a = c(this).index() * b.params.slidesPerGroup;
                b.params.loop && (a += b.loopedSlides);
                b.slideTo(a)
            };
            b.updateClickedSlide = function (a) {
                a = h(a, "." + b.params.slideClass);
                var e = !1;
                if (a) for (var d = 0; d < b.slides.length; d++) b.slides[d] === a && (e = !0);
                if (a && e) {
                    if (b.clickedSlide = a, b.clickedIndex = c(a).index(), b.params.slideToClickedSlide && void 0 !== b.clickedIndex && b.clickedIndex !== b.activeIndex) {
                        var p = b.clickedIndex;
                        b.params.loop ? b.animating || (a = c(b.clickedSlide).attr("data-swiper-slide-index"), b.params.centeredSlides ? p < b.loopedSlides - b.params.slidesPerView / 2 || p > b.slides.length - b.loopedSlides + b.params.slidesPerView / 2 ? (b.fixLoop(), p = b.wrapper.children("." + b.params.slideClass + '[data-swiper-slide-index\x3d"' + a + '"]:not(.swiper-slide-duplicate)').eq(0).index(), setTimeout(function () {
                            b.slideTo(p)
                        }, 0)) : b.slideTo(p) : p > b.slides.length - b.params.slidesPerView ? (b.fixLoop(), p = b.wrapper.children("." + b.params.slideClass + '[data-swiper-slide-index\x3d"' +
                            a + '"]:not(.swiper-slide-duplicate)').eq(0).index(), setTimeout(function () {
                            b.slideTo(p)
                        }, 0)) : b.slideTo(p)) : b.slideTo(p)
                    }
                } else b.clickedSlide = void 0, b.clickedIndex = void 0
            };
            var u, C, J, K, H, B, v, L, O = Date.now(), I, G = [], M;
            b.animating = !1;
            b.touches = {startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0};
            var P, N;
            b.onTouchStart = function (a) {
                a.originalEvent && (a = a.originalEvent);
                if ((P = "touchstart" === a.type) || !("which" in a) || 3 !== a.which) if (b.params.noSwiping && h(a, "." + b.params.noSwipingClass)) b.allowClick = !0; else if (!b.params.swipeHandler ||
                    h(a, b.params.swipeHandler)) {
                    var e = b.touches.currentX = "touchstart" === a.type ? a.targetTouches[0].pageX : a.pageX,
                        d = b.touches.currentY = "touchstart" === a.type ? a.targetTouches[0].pageY : a.pageY;
                    b.device.ios && b.params.iOSEdgeSwipeDetection && e <= b.params.iOSEdgeSwipeThreshold || (u = !0, C = !1, J = !0, N = H = void 0, b.touches.startX = e, b.touches.startY = d, K = Date.now(), b.allowClick = !0, b.updateContainerSize(), b.swipeDirection = void 0, 0 < b.params.threshold && (L = !1), "touchstart" !== a.type && (e = !0, c(a.target).is("input, select, textarea, button") &&
                    (e = !1), document.activeElement && c(document.activeElement).is("input, select, textarea, button") && document.activeElement.blur(), e && a.preventDefault()), b.emit("onTouchStart", b, a))
                }
            };
            b.onTouchMove = function (a) {
                a.originalEvent && (a = a.originalEvent);
                if (!P || "mousemove" !== a.type) if (a.preventedByNestedSwiper) b.touches.startX = "touchmove" === a.type ? a.targetTouches[0].pageX : a.pageX, b.touches.startY = "touchmove" === a.type ? a.targetTouches[0].pageY : a.pageY; else if (b.params.onlyExternal) b.allowClick = !1, u && (b.touches.startX =
                    b.touches.currentX = "touchmove" === a.type ? a.targetTouches[0].pageX : a.pageX, b.touches.startY = b.touches.currentY = "touchmove" === a.type ? a.targetTouches[0].pageY : a.pageY, K = Date.now()); else if (P && document.activeElement && a.target === document.activeElement && c(a.target).is("input, select, textarea, button")) C = !0, b.allowClick = !1; else if (J && b.emit("onTouchMove", b, a), !(a.targetTouches && 1 < a.targetTouches.length)) {
                    b.touches.currentX = "touchmove" === a.type ? a.targetTouches[0].pageX : a.pageX;
                    b.touches.currentY = "touchmove" ===
                    a.type ? a.targetTouches[0].pageY : a.pageY;
                    if ("undefined" === typeof H) {
                        var e = 180 * Math.atan2(Math.abs(b.touches.currentY - b.touches.startY), Math.abs(b.touches.currentX - b.touches.startX)) / Math.PI;
                        H = b.isHorizontal() ? e > b.params.touchAngle : 90 - e > b.params.touchAngle
                    }
                    H && b.emit("onTouchMoveOpposite", b, a);
                    "undefined" !== typeof N || !b.browser.ieTouch || b.touches.currentX === b.touches.startX && b.touches.currentY === b.touches.startY || (N = !0);
                    if (u) if (H) u = !1; else if (N || !b.browser.ieTouch) {
                        b.allowClick = !1;
                        b.emit("onSliderMove",
                            b, a);
                        a.preventDefault();
                        b.params.touchMoveStopPropagation && !b.params.nested && a.stopPropagation();
                        C || (l.loop && b.fixLoop(), v = b.getWrapperTranslate(), b.setWrapperTransition(0), b.animating && b.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"), b.params.autoplay && b.autoplaying && (b.params.autoplayDisableOnInteraction ? b.stopAutoplay() : b.pauseAutoplay()), M = !1, b.params.grabCursor && (b.container[0].style.cursor = "move", b.container[0].style.cursor = "-webkit-grabbing",
                            b.container[0].style.cursor = "-moz-grabbin", b.container[0].style.cursor = "grabbing"));
                        C = !0;
                        e = b.touches.diff = b.isHorizontal() ? b.touches.currentX - b.touches.startX : b.touches.currentY - b.touches.startY;
                        e *= b.params.touchRatio;
                        b.rtl && (e = -e);
                        b.swipeDirection = 0 < e ? "prev" : "next";
                        B = e + v;
                        var d = !0;
                        0 < e && B > b.minTranslate() ? (d = !1, b.params.resistance && (B = b.minTranslate() - 1 + Math.pow(-b.minTranslate() + v + e, b.params.resistanceRatio))) : 0 > e && B < b.maxTranslate() && (d = !1, b.params.resistance && (B = b.maxTranslate() + 1 - Math.pow(b.maxTranslate() -
                            v - e, b.params.resistanceRatio)));
                        d && (a.preventedByNestedSwiper = !0);
                        !b.params.allowSwipeToNext && "next" === b.swipeDirection && B < v && (B = v);
                        !b.params.allowSwipeToPrev && "prev" === b.swipeDirection && B > v && (B = v);
                        if (b.params.followFinger) {
                            if (0 < b.params.threshold) if (Math.abs(e) > b.params.threshold || L) {
                                if (!L) {
                                    L = !0;
                                    b.touches.startX = b.touches.currentX;
                                    b.touches.startY = b.touches.currentY;
                                    B = v;
                                    b.touches.diff = b.isHorizontal() ? b.touches.currentX - b.touches.startX : b.touches.currentY - b.touches.startY;
                                    return
                                }
                            } else {
                                B = v;
                                return
                            }
                            (b.params.freeMode ||
                                b.params.watchSlidesProgress) && b.updateActiveIndex();
                            b.params.freeMode && (0 === G.length && G.push({
                                position: b.touches[b.isHorizontal() ? "startX" : "startY"],
                                time: K
                            }), G.push({
                                position: b.touches[b.isHorizontal() ? "currentX" : "currentY"],
                                time: (new window.Date).getTime()
                            }));
                            b.updateProgress(B);
                            b.setWrapperTranslate(B)
                        }
                    }
                }
            };
            b.onTouchEnd = function (a) {
                a.originalEvent && (a = a.originalEvent);
                J && b.emit("onTouchEnd", b, a);
                J = !1;
                if (u) {
                    b.params.grabCursor && C && u && (b.container[0].style.cursor = "move", b.container[0].style.cursor =
                        "-webkit-grab", b.container[0].style.cursor = "-moz-grab", b.container[0].style.cursor = "grab");
                    var e = Date.now(), d = e - K;
                    b.allowClick && (b.updateClickedSlide(a), b.emit("onTap", b, a), 300 > d && 300 < e - O && (I && clearTimeout(I), I = setTimeout(function () {
                        b && (b.params.paginationHide && 0 < b.paginationContainer.length && !c(a.target).hasClass(b.params.bulletClass) && b.paginationContainer.toggleClass(b.params.paginationHiddenClass), b.emit("onClick", b, a))
                    }, 300)), 300 > d && 300 > e - O && (I && clearTimeout(I), b.emit("onDoubleTap", b, a)));
                    O =
                        Date.now();
                    setTimeout(function () {
                        b && (b.allowClick = !0)
                    }, 0);
                    if (u && C && b.swipeDirection && 0 !== b.touches.diff && B !== v) if (u = C = !1, e = b.params.followFinger ? b.rtl ? b.translate : -b.translate : -B, b.params.freeMode) if (e < -b.minTranslate()) b.slideTo(b.activeIndex); else if (e > -b.maxTranslate()) b.slides.length < b.snapGrid.length ? b.slideTo(b.snapGrid.length - 1) : b.slideTo(b.slides.length - 1); else {
                        if (b.params.freeModeMomentum) {
                            if (1 < G.length) {
                                e = G.pop();
                                var p = G.pop(), h = e.time - p.time;
                                b.velocity = (e.position - p.position) / h;
                                b.velocity /=
                                    2;
                                Math.abs(b.velocity) < b.params.freeModeMinimumVelocity && (b.velocity = 0);
                                if (150 < h || 300 < (new window.Date).getTime() - e.time) b.velocity = 0
                            } else b.velocity = 0;
                            G.length = 0;
                            e = 1E3 * b.params.freeModeMomentumRatio;
                            p = b.translate + b.velocity * e;
                            b.rtl && (p = -p);
                            h = !1;
                            var f = 20 * Math.abs(b.velocity) * b.params.freeModeMomentumBounceRatio;
                            if (p < b.maxTranslate()) if (b.params.freeModeMomentumBounce) {
                                p + b.maxTranslate() < -f && (p = b.maxTranslate() - f);
                                var g = b.maxTranslate();
                                M = h = !0
                            } else p = b.maxTranslate(); else if (p > b.minTranslate()) b.params.freeModeMomentumBounce ?
                                (p - b.minTranslate() > f && (p = b.minTranslate() + f), g = b.minTranslate(), M = h = !0) : p = b.minTranslate(); else if (b.params.freeModeSticky) {
                                f = 0;
                                for (f = 0; f < b.snapGrid.length; f += 1) if (b.snapGrid[f] > -p) {
                                    var q = f;
                                    break
                                }
                                p = Math.abs(b.snapGrid[q] - p) < Math.abs(b.snapGrid[q - 1] - p) || "next" === b.swipeDirection ? b.snapGrid[q] : b.snapGrid[q - 1];
                                b.rtl || (p = -p)
                            }
                            if (0 !== b.velocity) e = b.rtl ? Math.abs((-p - b.translate) / b.velocity) : Math.abs((p - b.translate) / b.velocity); else if (b.params.freeModeSticky) {
                                b.slideReset();
                                return
                            }
                            b.params.freeModeMomentumBounce &&
                            h ? (b.updateProgress(g), b.setWrapperTransition(e), b.setWrapperTranslate(p), b.onTransitionStart(), b.animating = !0, b.wrapper.transitionEnd(function () {
                                b && M && (b.emit("onMomentumBounce", b), b.setWrapperTransition(b.params.speed), b.setWrapperTranslate(g), b.wrapper.transitionEnd(function () {
                                    if (b) b.onTransitionEnd()
                                }))
                            })) : b.velocity ? (b.updateProgress(p), b.setWrapperTransition(e), b.setWrapperTranslate(p), b.onTransitionStart(), b.animating || (b.animating = !0, b.wrapper.transitionEnd(function () {
                                    if (b) b.onTransitionEnd()
                                }))) :
                                b.updateProgress(p);
                            b.updateActiveIndex()
                        }
                        if (!b.params.freeModeMomentum || d >= b.params.longSwipesMs) b.updateProgress(), b.updateActiveIndex()
                    } else {
                        q = 0;
                        h = b.slidesSizesGrid[0];
                        for (p = 0; p < b.slidesGrid.length; p += b.params.slidesPerGroup) "undefined" !== typeof b.slidesGrid[p + b.params.slidesPerGroup] ? e >= b.slidesGrid[p] && e < b.slidesGrid[p + b.params.slidesPerGroup] && (q = p, h = b.slidesGrid[p + b.params.slidesPerGroup] - b.slidesGrid[p]) : e >= b.slidesGrid[p] && (q = p, h = b.slidesGrid[b.slidesGrid.length - 1] - b.slidesGrid[b.slidesGrid.length -
                        2]);
                        e = (e - b.slidesGrid[q]) / h;
                        d > b.params.longSwipesMs ? b.params.longSwipes ? ("next" === b.swipeDirection && (e >= b.params.longSwipesRatio ? b.slideTo(q + b.params.slidesPerGroup) : b.slideTo(q)), "prev" === b.swipeDirection && (e > 1 - b.params.longSwipesRatio ? b.slideTo(q + b.params.slidesPerGroup) : b.slideTo(q))) : b.slideTo(b.activeIndex) : b.params.shortSwipes ? ("next" === b.swipeDirection && b.slideTo(q + b.params.slidesPerGroup), "prev" === b.swipeDirection && b.slideTo(q)) : b.slideTo(b.activeIndex)
                    } else u = C = !1
                }
            };
            b._slideTo = function (a,
                                   c) {
                return b.slideTo(a, c, !0, !0)
            };
            b.slideTo = function (a, c, e, d) {
                "undefined" === typeof e && (e = !0);
                "undefined" === typeof a && (a = 0);
                0 > a && (a = 0);
                b.snapIndex = Math.floor(a / b.params.slidesPerGroup);
                b.snapIndex >= b.snapGrid.length && (b.snapIndex = b.snapGrid.length - 1);
                var p = -b.snapGrid[b.snapIndex];
                b.params.autoplay && b.autoplaying && (d || !b.params.autoplayDisableOnInteraction ? b.pauseAutoplay(c) : b.stopAutoplay());
                b.updateProgress(p);
                for (d = 0; d < b.slidesGrid.length; d++) -Math.floor(100 * p) >= Math.floor(100 * b.slidesGrid[d]) && (a =
                    d);
                if (!b.params.allowSwipeToNext && p < b.translate && p < b.minTranslate() || !b.params.allowSwipeToPrev && p > b.translate && p > b.maxTranslate() && (b.activeIndex || 0) !== a) return !1;
                "undefined" === typeof c && (c = b.params.speed);
                b.previousIndex = b.activeIndex || 0;
                b.activeIndex = a;
                if (b.rtl && -p === b.translate || !b.rtl && p === b.translate) return b.params.autoHeight && b.updateAutoHeight(), b.updateClasses(), "slide" !== b.params.effect && b.setWrapperTranslate(p), !1;
                b.updateClasses();
                b.onTransitionStart(e);
                0 === c ? (b.setWrapperTranslate(p),
                    b.setWrapperTransition(0), b.onTransitionEnd(e)) : (b.setWrapperTranslate(p), b.setWrapperTransition(c), b.animating || (b.animating = !0, b.wrapper.transitionEnd(function () {
                    if (b) b.onTransitionEnd(e)
                })));
                return !0
            };
            b.onTransitionStart = function (a) {
                "undefined" === typeof a && (a = !0);
                b.params.autoHeight && b.updateAutoHeight();
                if (b.lazy) b.lazy.onTransitionStart();
                a && (b.emit("onTransitionStart", b), b.activeIndex !== b.previousIndex && (b.emit("onSlideChangeStart", b), b.activeIndex > b.previousIndex ? b.emit("onSlideNextStart",
                    b) : b.emit("onSlidePrevStart", b)))
            };
            b.onTransitionEnd = function (a) {
                b.animating = !1;
                b.setWrapperTransition(0);
                "undefined" === typeof a && (a = !0);
                if (b.lazy) b.lazy.onTransitionEnd();
                a && (b.emit("onTransitionEnd", b), b.activeIndex !== b.previousIndex && (b.emit("onSlideChangeEnd", b), b.activeIndex > b.previousIndex ? b.emit("onSlideNextEnd", b) : b.emit("onSlidePrevEnd", b)));
                b.params.hashnav && b.hashnav && b.hashnav.setHash()
            };
            b.slideNext = function (a, c, e) {
                if (b.params.loop) {
                    if (b.animating) return !1;
                    b.fixLoop()
                }
                return b.slideTo(b.activeIndex +
                    b.params.slidesPerGroup, c, a, e)
            };
            b._slideNext = function (a) {
                return b.slideNext(!0, a, !0)
            };
            b.slidePrev = function (a, c, e) {
                if (b.params.loop) {
                    if (b.animating) return !1;
                    b.fixLoop()
                }
                return b.slideTo(b.activeIndex - 1, c, a, e)
            };
            b._slidePrev = function (a) {
                return b.slidePrev(!0, a, !0)
            };
            b.slideReset = function (a, c, e) {
                return b.slideTo(b.activeIndex, c, a)
            };
            b.setWrapperTransition = function (a, c) {
                b.wrapper.transition(a);
                "slide" !== b.params.effect && b.effects[b.params.effect] && b.effects[b.params.effect].setTransition(a);
                b.params.parallax &&
                b.parallax && b.parallax.setTransition(a);
                b.params.scrollbar && b.scrollbar && b.scrollbar.setTransition(a);
                b.params.control && b.controller && b.controller.setTransition(a, c);
                b.emit("onSetTransition", b, a)
            };
            b.setWrapperTranslate = function (a, c, e) {
                var d = 0, h = 0;
                b.isHorizontal() ? d = b.rtl ? -a : a : h = a;
                b.params.roundLengths && (d = Math.floor(d), h = Math.floor(h));
                b.params.virtualTranslate || (b.support.transforms3d ? b.wrapper.transform("translate3d(" + d + "px, " + h + "px, 0px)") : b.wrapper.transform("translate(" + d + "px, " + h + "px)"));
                b.translate =
                    b.isHorizontal() ? d : h;
                d = b.maxTranslate() - b.minTranslate();
                (0 === d ? 0 : (a - b.minTranslate()) / d) !== b.progress && b.updateProgress(a);
                c && b.updateActiveIndex();
                "slide" !== b.params.effect && b.effects[b.params.effect] && b.effects[b.params.effect].setTranslate(b.translate);
                b.params.parallax && b.parallax && b.parallax.setTranslate(b.translate);
                b.params.scrollbar && b.scrollbar && b.scrollbar.setTranslate(b.translate);
                b.params.control && b.controller && b.controller.setTranslate(b.translate, e);
                b.emit("onSetTranslate", b, b.translate)
            };
            b.getTranslate = function (a, c) {
                "undefined" === typeof c && (c = "x");
                if (b.params.virtualTranslate) return b.rtl ? -b.translate : b.translate;
                a = window.getComputedStyle(a, null);
                if (window.WebKitCSSMatrix) {
                    var e = a.transform || a.webkitTransform;
                    6 < e.split(",").length && (e = e.split(", ").map(function (b) {
                        return b.replace(",", ".")
                    }).join(", "));
                    a = new window.WebKitCSSMatrix("none" === e ? "" : e)
                } else {
                    a = a.MozTransform || a.OTransform || a.MsTransform || a.msTransform || a.transform || a.getPropertyValue("transform").replace("translate(",
                        "matrix(1, 0, 0, 1,");
                    var d = a.toString().split(",")
                }
                "x" === c && (e = window.WebKitCSSMatrix ? a.m41 : 16 === d.length ? parseFloat(d[12]) : parseFloat(d[4]));
                "y" === c && (e = window.WebKitCSSMatrix ? a.m42 : 16 === d.length ? parseFloat(d[13]) : parseFloat(d[5]));
                b.rtl && e && (e = -e);
                return e || 0
            };
            b.getWrapperTranslate = function (a) {
                "undefined" === typeof a && (a = b.isHorizontal() ? "x" : "y");
                return b.getTranslate(b.wrapper[0], a)
            };
            b.observers = [];
            b.initObservers = function () {
                if (b.params.observeParents) for (var a = b.container.parents(), c = 0; c < a.length; c++) k(a[c]);
                k(b.container[0], {childList: !1});
                k(b.wrapper[0], {attributes: !1})
            };
            b.disconnectObservers = function () {
                for (var a = 0; a < b.observers.length; a++) b.observers[a].disconnect();
                b.observers = []
            };
            b.createLoop = function () {
                b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass).remove();
                var a = b.wrapper.children("." + b.params.slideClass);
                "auto" !== b.params.slidesPerView || b.params.loopedSlides || (b.params.loopedSlides = a.length);
                b.loopedSlides = parseInt(b.params.loopedSlides || b.params.slidesPerView, 10);
                b.loopedSlides += b.params.loopAdditionalSlides;
                b.loopedSlides > a.length && (b.loopedSlides = a.length);
                var e = [], d = [], h;
                a.each(function (h, p) {
                    var f = c(this);
                    h < b.loopedSlides && d.push(p);
                    h < a.length && h >= a.length - b.loopedSlides && e.push(p);
                    f.attr("data-swiper-slide-index", h)
                });
                for (h = 0; h < d.length; h++) b.wrapper.append(c(d[h].cloneNode(!0)).addClass(b.params.slideDuplicateClass));
                for (h = e.length - 1; 0 <= h; h--) b.wrapper.prepend(c(e[h].cloneNode(!0)).addClass(b.params.slideDuplicateClass))
            };
            b.destroyLoop = function () {
                b.wrapper.children("." +
                    b.params.slideClass + "." + b.params.slideDuplicateClass).remove();
                b.slides.removeAttr("data-swiper-slide-index")
            };
            b.reLoop = function (a) {
                var c = b.activeIndex - b.loopedSlides;
                b.destroyLoop();
                b.createLoop();
                b.updateSlidesSize();
                a && b.slideTo(c + b.loopedSlides, 0, !1)
            };
            b.fixLoop = function () {
                if (b.activeIndex < b.loopedSlides) {
                    var a = b.slides.length - 3 * b.loopedSlides + b.activeIndex;
                    a += b.loopedSlides;
                    b.slideTo(a, 0, !1, !0)
                } else if ("auto" === b.params.slidesPerView && b.activeIndex >= 2 * b.loopedSlides || b.activeIndex > b.slides.length -
                    2 * b.params.slidesPerView) a = -b.slides.length + b.activeIndex + b.loopedSlides, a += b.loopedSlides, b.slideTo(a, 0, !1, !0)
            };
            b.appendSlide = function (a) {
                b.params.loop && b.destroyLoop();
                if ("object" === typeof a && a.length) for (var c = 0; c < a.length; c++) a[c] && b.wrapper.append(a[c]); else b.wrapper.append(a);
                b.params.loop && b.createLoop();
                b.params.observer && b.support.observer || b.update(!0)
            };
            b.prependSlide = function (a) {
                b.params.loop && b.destroyLoop();
                var c = b.activeIndex + 1;
                if ("object" === typeof a && a.length) {
                    for (c = 0; c < a.length; c++) a[c] &&
                    b.wrapper.prepend(a[c]);
                    c = b.activeIndex + a.length
                } else b.wrapper.prepend(a);
                b.params.loop && b.createLoop();
                b.params.observer && b.support.observer || b.update(!0);
                b.slideTo(c, 0, !1)
            };
            b.removeSlide = function (a) {
                b.params.loop && (b.destroyLoop(), b.slides = b.wrapper.children("." + b.params.slideClass));
                var c = b.activeIndex;
                if ("object" === typeof a && a.length) for (var e = 0; e < a.length; e++) {
                    var d = a[e];
                    b.slides[d] && b.slides.eq(d).remove();
                    d < c && c--
                } else d = a, b.slides[d] && b.slides.eq(d).remove(), d < c && c--;
                c = Math.max(c, 0);
                b.params.loop &&
                b.createLoop();
                b.params.observer && b.support.observer || b.update(!0);
                b.params.loop ? b.slideTo(c + b.loopedSlides, 0, !1) : b.slideTo(c, 0, !1)
            };
            b.removeAllSlides = function () {
                for (var a = [], c = 0; c < b.slides.length; c++) a.push(c);
                b.removeSlide(a)
            };
            b.effects = {
                fade: {
                    setTranslate: function () {
                        for (var a = 0; a < b.slides.length; a++) {
                            var c = b.slides.eq(a), e = -c[0].swiperSlideOffset;
                            b.params.virtualTranslate || (e -= b.translate);
                            var d = 0;
                            b.isHorizontal() || (d = e, e = 0);
                            c.css({
                                opacity: b.params.fade.crossFade ? Math.max(1 - Math.abs(c[0].progress),
                                    0) : 1 + Math.min(Math.max(c[0].progress, -1), 0)
                            }).transform("translate3d(" + e + "px, " + d + "px, 0px)")
                        }
                    }, setTransition: function (a) {
                        b.slides.transition(a);
                        if (b.params.virtualTranslate && 0 !== a) {
                            var c = !1;
                            b.slides.transitionEnd(function () {
                                if (!c && b) {
                                    c = !0;
                                    b.animating = !1;
                                    for (var a = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], e = 0; e < a.length; e++) b.wrapper.trigger(a[e])
                                }
                            })
                        }
                    }
                }, flip: {
                    setTranslate: function () {
                        for (var a = 0; a < b.slides.length; a++) {
                            var e = b.slides.eq(a), d = e[0].progress;
                            b.params.flip.limitRotation && (d = Math.max(Math.min(e[0].progress, 1), -1));
                            var h = -180 * d, f = 0, g = -e[0].swiperSlideOffset, q = 0;
                            b.isHorizontal() ? b.rtl && (h = -h) : (q = g, g = 0, f = -h, h = 0);
                            e[0].style.zIndex = -Math.abs(Math.round(d)) + b.slides.length;
                            if (b.params.flip.slideShadows) {
                                var l = b.isHorizontal() ? e.find(".swiper-slide-shadow-left") : e.find(".swiper-slide-shadow-top"),
                                    k = b.isHorizontal() ? e.find(".swiper-slide-shadow-right") : e.find(".swiper-slide-shadow-bottom");
                                0 === l.length && (l = c('\x3cdiv class\x3d"swiper-slide-shadow-' +
                                    (b.isHorizontal() ? "left" : "top") + '"\x3e\x3c/div\x3e'), e.append(l));
                                0 === k.length && (k = c('\x3cdiv class\x3d"swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"\x3e\x3c/div\x3e'), e.append(k));
                                l.length && (l[0].style.opacity = Math.max(-d, 0));
                                k.length && (k[0].style.opacity = Math.max(d, 0))
                            }
                            e.transform("translate3d(" + g + "px, " + q + "px, 0px) rotateX(" + f + "deg) rotateY(" + h + "deg)")
                        }
                    }, setTransition: function (a) {
                        b.slides.transition(a).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(a);
                        if (b.params.virtualTranslate && 0 !== a) {
                            var e = !1;
                            b.slides.eq(b.activeIndex).transitionEnd(function () {
                                if (!e && b && c(this).hasClass(b.params.slideActiveClass)) {
                                    e = !0;
                                    b.animating = !1;
                                    for (var a = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], d = 0; d < a.length; d++) b.wrapper.trigger(a[d])
                                }
                            })
                        }
                    }
                }, cube: {
                    setTranslate: function () {
                        var a = 0;
                        if (b.params.cube.shadow) if (b.isHorizontal()) {
                            var e = b.wrapper.find(".swiper-cube-shadow");
                            0 === e.length && (e = c('\x3cdiv class\x3d"swiper-cube-shadow"\x3e\x3c/div\x3e'),
                                b.wrapper.append(e));
                            e.css({height: b.width + "px"})
                        } else e = b.container.find(".swiper-cube-shadow"), 0 === e.length && (e = c('\x3cdiv class\x3d"swiper-cube-shadow"\x3e\x3c/div\x3e'), b.container.append(e));
                        for (var d = 0; d < b.slides.length; d++) {
                            var h = b.slides.eq(d), f = 90 * d, g = Math.floor(f / 360);
                            b.rtl && (f = -f, g = Math.floor(-f / 360));
                            var q = Math.max(Math.min(h[0].progress, 1), -1), l = 0, k = 0, m = 0;
                            0 === d % 4 ? (l = 4 * -g * b.size, m = 0) : 0 === (d - 1) % 4 ? (l = 0, m = 4 * -g * b.size) : 0 === (d - 2) % 4 ? (l = b.size + 4 * g * b.size, m = b.size) : 0 === (d - 3) % 4 && (l = -b.size, m = 3 *
                                b.size + 4 * b.size * g);
                            b.rtl && (l = -l);
                            b.isHorizontal() || (k = l, l = 0);
                            f = "rotateX(" + (b.isHorizontal() ? 0 : -f) + "deg) rotateY(" + (b.isHorizontal() ? f : 0) + "deg) translate3d(" + l + "px, " + k + "px, " + m + "px)";
                            1 >= q && -1 < q && (a = 90 * d + 90 * q, b.rtl && (a = 90 * -d - 90 * q));
                            h.transform(f);
                            b.params.cube.slideShadows && (f = b.isHorizontal() ? h.find(".swiper-slide-shadow-left") : h.find(".swiper-slide-shadow-top"), g = b.isHorizontal() ? h.find(".swiper-slide-shadow-right") : h.find(".swiper-slide-shadow-bottom"), 0 === f.length && (f = c('\x3cdiv class\x3d"swiper-slide-shadow-' +
                                (b.isHorizontal() ? "left" : "top") + '"\x3e\x3c/div\x3e'), h.append(f)), 0 === g.length && (g = c('\x3cdiv class\x3d"swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"\x3e\x3c/div\x3e'), h.append(g)), f.length && (f[0].style.opacity = Math.max(-q, 0)), g.length && (g[0].style.opacity = Math.max(q, 0)))
                        }
                        b.wrapper.css({
                            "-webkit-transform-origin": "50% 50% -" + b.size / 2 + "px",
                            "-moz-transform-origin": "50% 50% -" + b.size / 2 + "px",
                            "-ms-transform-origin": "50% 50% -" + b.size / 2 + "px",
                            "transform-origin": "50% 50% -" + b.size / 2 + "px"
                        });
                        b.params.cube.shadow && (b.isHorizontal() ? e.transform("translate3d(0px, " + (b.width / 2 + b.params.cube.shadowOffset) + "px, " + -b.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + b.params.cube.shadowScale + ")") : (d = Math.abs(a) - 90 * Math.floor(Math.abs(a) / 90), d = b.params.cube.shadowScale / (1.5 - (Math.sin(2 * d * Math.PI / 360) / 2 + Math.cos(2 * d * Math.PI / 360) / 2)), e.transform("scale3d(" + b.params.cube.shadowScale + ", 1, " + d + ") translate3d(0px, " + (b.height / 2 + b.params.cube.shadowOffset) + "px, " + -b.height / 2 / d + "px) rotateX(-90deg)")));
                        b.wrapper.transform("translate3d(0px,0," + (b.isSafari || b.isUiWebView ? -b.size / 2 : 0) + "px) rotateX(" + (b.isHorizontal() ? 0 : a) + "deg) rotateY(" + (b.isHorizontal() ? -a : 0) + "deg)")
                    }, setTransition: function (a) {
                        b.slides.transition(a).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(a);
                        b.params.cube.shadow && !b.isHorizontal() && b.container.find(".swiper-cube-shadow").transition(a)
                    }
                }, coverflow: {
                    setTranslate: function () {
                        var a = b.translate;
                        a = b.isHorizontal() ?
                            -a + b.width / 2 : -a + b.height / 2;
                        for (var e = b.isHorizontal() ? b.params.coverflow.rotate : -b.params.coverflow.rotate, d = b.params.coverflow.depth, h = 0, f = b.slides.length; h < f; h++) {
                            var g = b.slides.eq(h), q = b.slidesSizesGrid[h];
                            q = (a - g[0].swiperSlideOffset - q / 2) / q * b.params.coverflow.modifier;
                            var l = b.isHorizontal() ? e * q : 0, k = b.isHorizontal() ? 0 : e * q,
                                m = -d * Math.abs(q), r = b.isHorizontal() ? 0 : b.params.coverflow.stretch * q,
                                n = b.isHorizontal() ? b.params.coverflow.stretch * q : 0;
                            .001 > Math.abs(n) && (n = 0);
                            .001 > Math.abs(r) && (r = 0);
                            .001 > Math.abs(m) &&
                            (m = 0);
                            .001 > Math.abs(l) && (l = 0);
                            .001 > Math.abs(k) && (k = 0);
                            g.transform("translate3d(" + n + "px," + r + "px," + m + "px)  rotateX(" + k + "deg) rotateY(" + l + "deg)");
                            g[0].style.zIndex = -Math.abs(Math.round(q)) + 1;
                            b.params.coverflow.slideShadows && (l = b.isHorizontal() ? g.find(".swiper-slide-shadow-left") : g.find(".swiper-slide-shadow-top"), k = b.isHorizontal() ? g.find(".swiper-slide-shadow-right") : g.find(".swiper-slide-shadow-bottom"), 0 === l.length && (l = c('\x3cdiv class\x3d"swiper-slide-shadow-' + (b.isHorizontal() ? "left" : "top") + '"\x3e\x3c/div\x3e'),
                                g.append(l)), 0 === k.length && (k = c('\x3cdiv class\x3d"swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"\x3e\x3c/div\x3e'), g.append(k)), l.length && (l[0].style.opacity = 0 < q ? q : 0), k.length && (k[0].style.opacity = 0 < -q ? -q : 0))
                        }
                        b.browser.ie && (b.wrapper[0].style.perspectiveOrigin = a + "px 50%")
                    }, setTransition: function (a) {
                        b.slides.transition(a).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(a)
                    }
                }
            };
            b.lazy = {
                initialImageLoaded: !1,
                loadImageInSlide: function (a, e) {
                    if ("undefined" !== typeof a && ("undefined" === typeof e && (e = !0), 0 !== b.slides.length)) {
                        var d = b.slides.eq(a);
                        a = d.find(".swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)");
                        !d.hasClass("swiper-lazy") || d.hasClass("swiper-lazy-loaded") || d.hasClass("swiper-lazy-loading") || (a = a.add(d[0]));
                        0 !== a.length && a.each(function () {
                            var a = c(this);
                            a.addClass("swiper-lazy-loading");
                            var h = a.attr("data-background"), f = a.attr("data-src"), g = a.attr("data-srcset");
                            b.loadImage(a[0], f || h,
                                g, !1, function () {
                                    h ? (a.css("background-image", 'url("' + h + '")'), a.removeAttr("data-background")) : (g && (a.attr("srcset", g), a.removeAttr("data-srcset")), f && (a.attr("src", f), a.removeAttr("data-src")));
                                    a.addClass("swiper-lazy-loaded").removeClass("swiper-lazy-loading");
                                    d.find(".swiper-lazy-preloader, .preloader").remove();
                                    if (b.params.loop && e) {
                                        var c = d.attr("data-swiper-slide-index");
                                        c = d.hasClass(b.params.slideDuplicateClass) ? b.wrapper.children('[data-swiper-slide-index\x3d"' + c + '"]:not(.' + b.params.slideDuplicateClass +
                                            ")") : b.wrapper.children("." + b.params.slideDuplicateClass + '[data-swiper-slide-index\x3d"' + c + '"]');
                                        b.lazy.loadImageInSlide(c.index(), !1)
                                    }
                                    b.emit("onLazyImageReady", b, d[0], a[0])
                                });
                            b.emit("onLazyImageLoad", b, d[0], a[0])
                        })
                    }
                }, load: function () {
                    var a;
                    if (b.params.watchSlidesVisibility) b.wrapper.children("." + b.params.slideVisibleClass).each(function () {
                        b.lazy.loadImageInSlide(c(this).index())
                    }); else if (1 < b.params.slidesPerView) for (a = b.activeIndex; a < b.activeIndex + b.params.slidesPerView; a++) b.slides[a] && b.lazy.loadImageInSlide(a);
                    else b.lazy.loadImageInSlide(b.activeIndex);
                    if (b.params.lazyLoadingInPrevNext) if (1 < b.params.slidesPerView || b.params.lazyLoadingInPrevNextAmount && 1 < b.params.lazyLoadingInPrevNextAmount) {
                        a = b.params.lazyLoadingInPrevNextAmount;
                        var e = b.params.slidesPerView,
                            d = Math.min(b.activeIndex + e + Math.max(a, e), b.slides.length);
                        e = Math.max(b.activeIndex - Math.max(e, a), 0);
                        for (a = b.activeIndex + b.params.slidesPerView; a < d; a++) b.slides[a] && b.lazy.loadImageInSlide(a);
                        for (a = e; a < b.activeIndex; a++) b.slides[a] && b.lazy.loadImageInSlide(a)
                    } else d =
                        b.wrapper.children("." + b.params.slideNextClass), 0 < d.length && b.lazy.loadImageInSlide(d.index()), d = b.wrapper.children("." + b.params.slidePrevClass), 0 < d.length && b.lazy.loadImageInSlide(d.index())
                }, onTransitionStart: function () {
                    b.params.lazyLoading && (b.params.lazyLoadingOnTransitionStart || !b.params.lazyLoadingOnTransitionStart && !b.lazy.initialImageLoaded) && b.lazy.load()
                }, onTransitionEnd: function () {
                    b.params.lazyLoading && !b.params.lazyLoadingOnTransitionStart && b.lazy.load()
                }
            };
            b.scrollbar = {
                isTouched: !1, setDragPosition: function (a) {
                    var c =
                        b.scrollbar;
                    a = (b.isHorizontal() ? "touchstart" === a.type || "touchmove" === a.type ? a.targetTouches[0].pageX : a.pageX || a.clientX : "touchstart" === a.type || "touchmove" === a.type ? a.targetTouches[0].pageY : a.pageY || a.clientY) - c.track.offset()[b.isHorizontal() ? "left" : "top"] - c.dragSize / 2;
                    var e = -b.minTranslate() * c.moveDivider, d = -b.maxTranslate() * c.moveDivider;
                    a < e ? a = e : a > d && (a = d);
                    a = -a / c.moveDivider;
                    b.updateProgress(a);
                    b.setWrapperTranslate(a, !0)
                }, dragStart: function (a) {
                    var c = b.scrollbar;
                    c.isTouched = !0;
                    a.preventDefault();
                    a.stopPropagation();
                    c.setDragPosition(a);
                    clearTimeout(c.dragTimeout);
                    c.track.transition(0);
                    b.params.scrollbarHide && c.track.css("opacity", 1);
                    b.wrapper.transition(100);
                    c.drag.transition(100);
                    b.emit("onScrollbarDragStart", b)
                }, dragMove: function (a) {
                    var c = b.scrollbar;
                    c.isTouched && (a.preventDefault ? a.preventDefault() : a.returnValue = !1, c.setDragPosition(a), b.wrapper.transition(0), c.track.transition(0), c.drag.transition(0), b.emit("onScrollbarDragMove", b))
                }, dragEnd: function (a) {
                    var c = b.scrollbar;
                    c.isTouched &&
                    (c.isTouched = !1, b.params.scrollbarHide && (clearTimeout(c.dragTimeout), c.dragTimeout = setTimeout(function () {
                        c.track.css("opacity", 0);
                        c.track.transition(400)
                    }, 1E3)), b.emit("onScrollbarDragEnd", b), b.params.scrollbarSnapOnRelease && b.slideReset())
                }, enableDraggable: function () {
                    var a = b.scrollbar, e = b.support.touch ? a.track : document;
                    c(a.track).on(b.touchEvents.start, a.dragStart);
                    c(e).on(b.touchEvents.move, a.dragMove);
                    c(e).on(b.touchEvents.end, a.dragEnd)
                }, disableDraggable: function () {
                    var a = b.scrollbar, e = b.support.touch ?
                        a.track : document;
                    c(a.track).off(b.touchEvents.start, a.dragStart);
                    c(e).off(b.touchEvents.move, a.dragMove);
                    c(e).off(b.touchEvents.end, a.dragEnd)
                }, set: function () {
                    if (b.params.scrollbar) {
                        var a = b.scrollbar;
                        a.track = c(b.params.scrollbar);
                        b.params.uniqueNavElements && "string" === typeof b.params.scrollbar && 1 < a.track.length && 1 === b.container.find(b.params.scrollbar).length && (a.track = b.container.find(b.params.scrollbar));
                        a.drag = a.track.find(".swiper-scrollbar-drag");
                        0 === a.drag.length && (a.drag = c('\x3cdiv class\x3d"swiper-scrollbar-drag"\x3e\x3c/div\x3e'),
                            a.track.append(a.drag));
                        a.drag[0].style.width = "";
                        a.drag[0].style.height = "";
                        a.trackSize = b.isHorizontal() ? a.track[0].offsetWidth : a.track[0].offsetHeight;
                        a.divider = b.size / b.virtualSize;
                        a.moveDivider = a.trackSize / b.size * a.divider;
                        a.dragSize = a.trackSize * a.divider;
                        b.isHorizontal() ? a.drag[0].style.width = a.dragSize + "px" : a.drag[0].style.height = a.dragSize + "px";
                        a.track[0].style.display = 1 <= a.divider ? "none" : "";
                        b.params.scrollbarHide && (a.track[0].style.opacity = 0)
                    }
                }, setTranslate: function () {
                    if (b.params.scrollbar) {
                        var a =
                            b.scrollbar, c = a.dragSize;
                        var e = (a.trackSize - a.dragSize) * b.progress;
                        b.rtl && b.isHorizontal() ? (e = -e, 0 < e ? (c = a.dragSize - e, e = 0) : -e + a.dragSize > a.trackSize && (c = a.trackSize + e)) : 0 > e ? (c = a.dragSize + e, e = 0) : e + a.dragSize > a.trackSize && (c = a.trackSize - e);
                        b.isHorizontal() ? (b.support.transforms3d ? a.drag.transform("translate3d(" + e + "px, 0, 0)") : a.drag.transform("translateX(" + e + "px)"), a.drag[0].style.width = c + "px") : (b.support.transforms3d ? a.drag.transform("translate3d(0px, " + e + "px, 0)") : a.drag.transform("translateY(" + e +
                            "px)"), a.drag[0].style.height = c + "px");
                        b.params.scrollbarHide && (clearTimeout(a.timeout), a.track[0].style.opacity = 1, a.timeout = setTimeout(function () {
                            a.track[0].style.opacity = 0;
                            a.track.transition(400)
                        }, 1E3))
                    }
                }, setTransition: function (a) {
                    b.params.scrollbar && b.scrollbar.drag.transition(a)
                }
            };
            b.controller = {
                LinearSpline: function (b, a) {
                    this.x = b;
                    this.y = a;
                    this.lastIndex = b.length - 1;
                    var c, e;
                    this.interpolate = function (b) {
                        if (!b) return 0;
                        e = d(this.x, b);
                        c = e - 1;
                        return (b - this.x[c]) * (this.y[e] - this.y[c]) / (this.x[e] - this.x[c]) +
                            this.y[c]
                    };
                    var d = function () {
                        var b, a, c;
                        return function (e, d) {
                            a = -1;
                            for (b = e.length; 1 < b - a;) e[c = b + a >> 1] <= d ? a = c : b = c;
                            return b
                        }
                    }()
                }, getInterpolateFunction: function (a) {
                    b.controller.spline || (b.controller.spline = b.params.loop ? new b.controller.LinearSpline(b.slidesGrid, a.slidesGrid) : new b.controller.LinearSpline(b.snapGrid, a.snapGrid))
                }, setTranslate: function (a, c) {
                    function e(c) {
                        a = c.rtl && "horizontal" === c.params.direction ? -b.translate : b.translate;
                        "slide" === b.params.controlBy && (b.controller.getInterpolateFunction(c),
                            g = -b.controller.spline.interpolate(-a));
                        g && "container" !== b.params.controlBy || (f = (c.maxTranslate() - c.minTranslate()) / (b.maxTranslate() - b.minTranslate()), g = (a - b.minTranslate()) * f + c.minTranslate());
                        b.params.controlInverse && (g = c.maxTranslate() - g);
                        c.updateProgress(g);
                        c.setWrapperTranslate(g, !1, b);
                        c.updateActiveIndex()
                    }

                    var h = b.params.control, f, g;
                    if (b.isArray(h)) for (var q = 0; q < h.length; q++) h[q] !== c && h[q] instanceof d && e(h[q]); else h instanceof d && c !== h && e(h)
                }, setTransition: function (a, c) {
                    function e(c) {
                        c.setWrapperTransition(a,
                            b);
                        0 !== a && (c.onTransitionStart(), c.wrapper.transitionEnd(function () {
                            h && (c.params.loop && "slide" === b.params.controlBy && c.fixLoop(), c.onTransitionEnd())
                        }))
                    }

                    var h = b.params.control, f;
                    if (b.isArray(h)) for (f = 0; f < h.length; f++) h[f] !== c && h[f] instanceof d && e(h[f]); else h instanceof d && c !== h && e(h)
                }
            };
            b.hashnav = {
                init: function () {
                    if (b.params.hashnav) {
                        b.hashnav.initialized = !0;
                        var a = document.location.hash.replace("#", "");
                        if (a) for (var c = 0, e = b.slides.length; c < e; c++) {
                            var d = b.slides.eq(c);
                            d.attr("data-hash") !== a || d.hasClass(b.params.slideDuplicateClass) ||
                            (d = d.index(), b.slideTo(d, 0, b.params.runCallbacksOnInit, !0))
                        }
                    }
                }, setHash: function () {
                    b.hashnav.initialized && b.params.hashnav && (document.location.hash = b.slides.eq(b.activeIndex).attr("data-hash") || "")
                }
            };
            b.disableKeyboardControl = function () {
                b.params.keyboardControl = !1;
                c(document).off("keydown", m)
            };
            b.enableKeyboardControl = function () {
                b.params.keyboardControl = !0;
                c(document).on("keydown", m)
            };
            b.mousewheel = {event: !1, lastScrollTime: (new window.Date).getTime()};
            if (b.params.mousewheelControl) {
                try {
                    new window.WheelEvent("wheel"),
                        b.mousewheel.event = "wheel"
                } catch (p) {
                    if (window.WheelEvent || b.container[0] && "wheel" in b.container[0]) b.mousewheel.event = "wheel"
                }
                b.mousewheel.event || void 0 === document.onmousewheel || (b.mousewheel.event = "mousewheel");
                b.mousewheel.event || (b.mousewheel.event = "DOMMouseScroll")
            }
            b.disableMousewheelControl = function () {
                if (!b.mousewheel.event) return !1;
                b.container.off(b.mousewheel.event, g);
                return !0
            };
            b.enableMousewheelControl = function () {
                if (!b.mousewheel.event) return !1;
                b.container.on(b.mousewheel.event, g);
                return !0
            };
            b.parallax = {
                setTranslate: function () {
                    b.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
                        n(this, b.progress)
                    });
                    b.slides.each(function () {
                        var b = c(this);
                        b.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
                            n(this, Math.min(Math.max(b[0].progress, -1), 1))
                        })
                    })
                }, setTransition: function (a) {
                    "undefined" === typeof a && (a = b.params.speed);
                    b.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
                        var b =
                            c(this), e = parseInt(b.attr("data-swiper-parallax-duration"), 10) || a;
                        0 === a && (e = 0);
                        b.transition(e)
                    })
                }
            };
            b._plugins = [];
            for (var R in b.plugins) (a = b.plugins[R](b, b.params[R])) && b._plugins.push(a);
            b.callPlugins = function (a, c, e, d, h, f) {
                for (var g = 0; g < b._plugins.length; g++) if (a in b._plugins[g]) b._plugins[g][a](c, e, d, h, f)
            };
            b.emitterEventListeners = {};
            b.emit = function (a, c, e, d, h, f) {
                if (b.params[a]) b.params[a](c, e, d, h, f);
                var g;
                if (b.emitterEventListeners[a]) for (g = 0; g < b.emitterEventListeners[a].length; g++) b.emitterEventListeners[a][g](c,
                    e, d, h, f);
                b.callPlugins && b.callPlugins(a, c, e, d, h, f)
            };
            b.on = function (a, c) {
                a = z(a);
                b.emitterEventListeners[a] || (b.emitterEventListeners[a] = []);
                b.emitterEventListeners[a].push(c);
                return b
            };
            b.off = function (a, c) {
                var e;
                a = z(a);
                if ("undefined" === typeof c) return b.emitterEventListeners[a] = [], b;
                if (b.emitterEventListeners[a] && 0 !== b.emitterEventListeners[a].length) {
                    for (e = 0; e < b.emitterEventListeners[a].length; e++) b.emitterEventListeners[a][e] === c && b.emitterEventListeners[a].splice(e, 1);
                    return b
                }
            };
            b.once = function (a,
                               c) {
                a = z(a);
                var e = function (d, h, f, g, q) {
                    c(d, h, f, g, q);
                    b.off(a, e)
                };
                b.on(a, e);
                return b
            };
            b.a11y = {
                makeFocusable: function (b) {
                    b.attr("tabIndex", "0");
                    return b
                },
                addRole: function (b, a) {
                    b.attr("role", a);
                    return b
                },
                addLabel: function (b, a) {
                    b.attr("aria-label", a);
                    return b
                },
                disable: function (b) {
                    b.attr("aria-disabled", !0);
                    return b
                },
                enable: function (b) {
                    b.attr("aria-disabled", !1);
                    return b
                },
                onEnterKey: function (a) {
                    13 === a.keyCode && (c(a.target).is(b.params.nextButton) ? (b.onClickNext(a), b.isEnd ? b.a11y.notify(b.params.lastSlideMessage) :
                        b.a11y.notify(b.params.nextSlideMessage)) : c(a.target).is(b.params.prevButton) && (b.onClickPrev(a), b.isBeginning ? b.a11y.notify(b.params.firstSlideMessage) : b.a11y.notify(b.params.prevSlideMessage)), c(a.target).is("." + b.params.bulletClass) && c(a.target)[0].click())
                },
                liveRegion: c('\x3cspan class\x3d"swiper-notification" aria-live\x3d"assertive" aria-atomic\x3d"true"\x3e\x3c/span\x3e'),
                notify: function (a) {
                    var c = b.a11y.liveRegion;
                    0 !== c.length && (c.html(""), c.html(a))
                },
                init: function () {
                    b.params.nextButton && b.nextButton &&
                    0 < b.nextButton.length && (b.a11y.makeFocusable(b.nextButton), b.a11y.addRole(b.nextButton, "button"), b.a11y.addLabel(b.nextButton, b.params.nextSlideMessage));
                    b.params.prevButton && b.prevButton && 0 < b.prevButton.length && (b.a11y.makeFocusable(b.prevButton), b.a11y.addRole(b.prevButton, "button"), b.a11y.addLabel(b.prevButton, b.params.prevSlideMessage));
                    c(b.container).append(b.a11y.liveRegion)
                },
                initPagination: function () {
                    b.params.pagination && b.params.paginationClickable && b.bullets && b.bullets.length && b.bullets.each(function () {
                        var a =
                            c(this);
                        b.a11y.makeFocusable(a);
                        b.a11y.addRole(a, "button");
                        b.a11y.addLabel(a, b.params.paginationBulletMessage.replace(/{{index}}/, a.index() + 1))
                    })
                },
                destroy: function () {
                    b.a11y.liveRegion && 0 < b.a11y.liveRegion.length && b.a11y.liveRegion.remove()
                }
            };
            b.init = function () {
                b.params.loop && b.createLoop();
                b.updateContainerSize();
                b.updateSlidesSize();
                b.updatePagination();
                b.params.scrollbar && b.scrollbar && (b.scrollbar.set(), b.params.scrollbarDraggable && b.scrollbar.enableDraggable());
                "slide" !== b.params.effect && b.effects[b.params.effect] &&
                (b.params.loop || b.updateProgress(), b.effects[b.params.effect].setTranslate());
                b.params.loop ? b.slideTo(b.params.initialSlide + b.loopedSlides, 0, b.params.runCallbacksOnInit) : (b.slideTo(b.params.initialSlide, 0, b.params.runCallbacksOnInit), 0 === b.params.initialSlide && (b.parallax && b.params.parallax && b.parallax.setTranslate(), b.lazy && b.params.lazyLoading && (b.lazy.load(), b.lazy.initialImageLoaded = !0)));
                b.attachEvents();
                b.params.observer && b.support.observer && b.initObservers();
                b.params.preloadImages && !b.params.lazyLoading &&
                b.preloadImages();
                b.params.autoplay && b.startAutoplay();
                b.params.keyboardControl && b.enableKeyboardControl && b.enableKeyboardControl();
                b.params.mousewheelControl && b.enableMousewheelControl && b.enableMousewheelControl();
                b.params.hashnav && b.hashnav && b.hashnav.init();
                b.params.a11y && b.a11y && b.a11y.init();
                b.emit("onInit", b)
            };
            b.cleanupStyles = function () {
                b.container.removeClass(b.classNames.join(" ")).removeAttr("style");
                b.wrapper.removeAttr("style");
                b.slides && b.slides.length && b.slides.removeClass([b.params.slideVisibleClass,
                    b.params.slideActiveClass, b.params.slideNextClass, b.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row");
                b.paginationContainer && b.paginationContainer.length && b.paginationContainer.removeClass(b.params.paginationHiddenClass);
                b.bullets && b.bullets.length && b.bullets.removeClass(b.params.bulletActiveClass);
                b.params.prevButton && c(b.params.prevButton).removeClass(b.params.buttonDisabledClass);
                b.params.nextButton && c(b.params.nextButton).removeClass(b.params.buttonDisabledClass);
                b.params.scrollbar && b.scrollbar && (b.scrollbar.track && b.scrollbar.track.length && b.scrollbar.track.removeAttr("style"), b.scrollbar.drag && b.scrollbar.drag.length && b.scrollbar.drag.removeAttr("style"))
            };
            b.destroy = function (a, c) {
                b.detachEvents();
                b.stopAutoplay();
                b.params.scrollbar && b.scrollbar && b.params.scrollbarDraggable && b.scrollbar.disableDraggable();
                b.params.loop && b.destroyLoop();
                c && b.cleanupStyles();
                b.disconnectObservers();
                b.params.keyboardControl && b.disableKeyboardControl && b.disableKeyboardControl();
                b.params.mousewheelControl && b.disableMousewheelControl && b.disableMousewheelControl();
                b.params.a11y && b.a11y && b.a11y.destroy();
                b.emit("onDestroy");
                !1 !== a && (b = null)
            };
            b.init();
            return b
        }
    };
    d.prototype = {
        isSafari: function () {
            var a = navigator.userAgent.toLowerCase();
            return 0 <= a.indexOf("safari") && 0 > a.indexOf("chrome") && 0 > a.indexOf("android")
        }(),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),
        isArray: function (a) {
            return "[object Array]" === Object.prototype.toString.apply(a)
        },
        browser: {
            ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
            ieTouch: window.navigator.msPointerEnabled && 1 < window.navigator.msMaxTouchPoints || window.navigator.pointerEnabled && 1 < window.navigator.maxTouchPoints
        },
        device: function () {
            var a = navigator.userAgent, c = a.match(/(Android);?[\s\/]+([\d.]+)?/),
                e = a.match(/(iPad).*OS\s([\d_]+)/), d = a.match(/(iPod)(.*OS\s([\d_]+))?/);
            a = !e && a.match(/(iPhone\sOS)\s([\d_]+)/);
            return {ios: e || a || d, android: c}
        }(),
        support: {
            touch: window.Modernizr && !0 === Modernizr.touch ||
            !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch),
            transforms3d: window.Modernizr && !0 === Modernizr.csstransforms3d || function () {
                var a = document.createElement("div").style;
                return "webkitPerspective" in a || "MozPerspective" in a || "OPerspective" in a || "MsPerspective" in a || "perspective" in a
            }(),
            flexbox: function () {
                for (var a = document.createElement("div").style, c = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "),
                         e = 0; e < c.length; e++) if (c[e] in a) return !0
            }(),
            observer: "MutationObserver" in window || "WebkitMutationObserver" in window
        },
        plugins: {}
    };
    var f = function () {
            var a = function (a) {
                var c;
                for (c = 0; c < a.length; c++) this[c] = a[c];
                this.length = a.length;
                return this
            }, c = function (c, d) {
                var e = [];
                if (c && !d && c instanceof a) return c;
                if (c) if ("string" === typeof c) {
                    var h = c.trim();
                    if (0 <= h.indexOf("\x3c") && 0 <= h.indexOf("\x3e")) {
                        d = "div";
                        0 === h.indexOf("\x3cli") && (d = "ul");
                        0 === h.indexOf("\x3ctr") && (d = "tbody");
                        if (0 === h.indexOf("\x3ctd") || 0 === h.indexOf("\x3cth")) d =
                            "tr";
                        0 === h.indexOf("\x3ctbody") && (d = "table");
                        0 === h.indexOf("\x3coption") && (d = "select");
                        d = document.createElement(d);
                        d.innerHTML = c;
                        for (h = 0; h < d.childNodes.length; h++) e.push(d.childNodes[h])
                    } else for (c = d || "#" !== c[0] || c.match(/[ .<>:~]/) ? (d || document).querySelectorAll(c) : [document.getElementById(c.split("#")[1])], h = 0; h < c.length; h++) c[h] && e.push(c[h])
                } else if (c.nodeType || c === window || c === document) e.push(c); else if (0 < c.length && c[0].nodeType) for (h = 0; h < c.length; h++) e.push(c[h]);
                return new a(e)
            };
            a.prototype =
                {
                    addClass: function (a) {
                        if ("undefined" === typeof a) return this;
                        a = a.split(" ");
                        for (var c = 0; c < a.length; c++) for (var e = 0; e < this.length; e++) this[e].classList.add(a[c]);
                        return this
                    }, removeClass: function (a) {
                        a = a.split(" ");
                        for (var c = 0; c < a.length; c++) for (var e = 0; e < this.length; e++) this[e].classList.remove(a[c]);
                        return this
                    }, hasClass: function (a) {
                        return this[0] ? this[0].classList.contains(a) : !1
                    }, toggleClass: function (a) {
                        a = a.split(" ");
                        for (var c = 0; c < a.length; c++) for (var e = 0; e < this.length; e++) this[e].classList.toggle(a[c]);
                        return this
                    }, attr: function (a, c) {
                        if (1 === arguments.length && "string" === typeof a) {
                            if (this[0]) return this[0].getAttribute(a)
                        } else {
                            for (var e = 0; e < this.length; e++) if (2 === arguments.length) this[e].setAttribute(a, c); else for (var d in a) this[e][d] = a[d], this[e].setAttribute(d, a[d]);
                            return this
                        }
                    }, removeAttr: function (a) {
                        for (var c = 0; c < this.length; c++) this[c].removeAttribute(a);
                        return this
                    }, data: function (a, c) {
                        if ("undefined" === typeof c) {
                            if (this[0]) {
                                if (c = this[0].getAttribute("data-" + a)) return c;
                                if (this[0].dom7ElementDataStorage &&
                                    a in this[0].dom7ElementDataStorage) return this[0].dom7ElementDataStorage[a]
                            }
                        } else {
                            for (var e = 0; e < this.length; e++) {
                                var d = this[e];
                                d.dom7ElementDataStorage || (d.dom7ElementDataStorage = {});
                                d.dom7ElementDataStorage[a] = c
                            }
                            return this
                        }
                    }, transform: function (a) {
                        for (var c = 0; c < this.length; c++) {
                            var e = this[c].style;
                            e.webkitTransform = e.MsTransform = e.msTransform = e.MozTransform = e.OTransform = e.transform = a
                        }
                        return this
                    }, transition: function (a) {
                        "string" !== typeof a && (a += "ms");
                        for (var c = 0; c < this.length; c++) {
                            var e = this[c].style;
                            e.webkitTransitionDuration = e.MsTransitionDuration = e.msTransitionDuration = e.MozTransitionDuration = e.OTransitionDuration = e.transitionDuration = a
                        }
                        return this
                    }, on: function (a, d, f, k) {
                        function e(a) {
                            var e = a.target;
                            if (c(e).is(d)) f.call(e, a); else {
                                e = c(e).parents();
                                for (var h = 0; h < e.length; h++) c(e[h]).is(d) && f.call(e[h], a)
                            }
                        }

                        a = a.split(" ");
                        var h, l;
                        for (h = 0; h < this.length; h++) if ("function" === typeof d || !1 === d) for ("function" === typeof d && (k = (f = d) || !1), l = 0; l < a.length; l++) this[h].addEventListener(a[l], f, k); else for (l = 0; l <
                        a.length; l++) this[h].dom7LiveListeners || (this[h].dom7LiveListeners = []), this[h].dom7LiveListeners.push({
                            listener: f,
                            liveListener: e
                        }), this[h].addEventListener(a[l], e, k);
                        return this
                    }, off: function (a, c, d, f) {
                        a = a.split(" ");
                        for (var e = 0; e < a.length; e++) for (var h = 0; h < this.length; h++) if ("function" === typeof c || !1 === c) "function" === typeof c && (f = (d = c) || !1), this[h].removeEventListener(a[e], d, f); else if (this[h].dom7LiveListeners) for (var k = 0; k < this[h].dom7LiveListeners.length; k++) this[h].dom7LiveListeners[k].listener ===
                        d && this[h].removeEventListener(a[e], this[h].dom7LiveListeners[k].liveListener, f);
                        return this
                    }, once: function (a, c, d, f) {
                        function e(g) {
                            d(g);
                            h.off(a, c, e, f)
                        }

                        var h = this;
                        "function" === typeof c && (f = d = c = !1);
                        h.on(a, c, e, f)
                    }, trigger: function (a, c) {
                        for (var e = 0; e < this.length; e++) {
                            try {
                                var d = new window.CustomEvent(a, {detail: c, bubbles: !0, cancelable: !0})
                            } catch (g) {
                                d = document.createEvent("Event"), d.initEvent(a, !0, !0), d.detail = c
                            }
                            this[e].dispatchEvent(d)
                        }
                        return this
                    }, transitionEnd: function (a) {
                        function c(h) {
                            if (h.target ===
                                this) for (a.call(this, h), d = 0; d < e.length; d++) f.off(e[d], c)
                        }

                        var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
                            d, f = this;
                        if (a) for (d = 0; d < e.length; d++) f.on(e[d], c);
                        return this
                    }, width: function () {
                        return this[0] === window ? window.innerWidth : 0 < this.length ? parseFloat(this.css("width")) : null
                    }, outerWidth: function (a) {
                        return 0 < this.length ? a ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null
                    }, height: function () {
                        return this[0] ===
                        window ? window.innerHeight : 0 < this.length ? parseFloat(this.css("height")) : null
                    }, outerHeight: function (a) {
                        return 0 < this.length ? a ? this[0].offsetHeight + parseFloat(this.css("margin-top")) + parseFloat(this.css("margin-bottom")) : this[0].offsetHeight : null
                    }, offset: function () {
                        if (0 < this.length) {
                            var a = this[0], c = a.getBoundingClientRect(), d = document.body;
                            return {
                                top: c.top + (window.pageYOffset || a.scrollTop) - (a.clientTop || d.clientTop || 0),
                                left: c.left + (window.pageXOffset || a.scrollLeft) - (a.clientLeft || d.clientLeft || 0)
                            }
                        }
                        return null
                    },
                    css: function (a, c) {
                        var e;
                        if (1 === arguments.length) if ("string" === typeof a) {
                            if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(a)
                        } else {
                            for (e = 0; e < this.length; e++) for (var d in a) this[e].style[d] = a[d];
                            return this
                        }
                        if (2 === arguments.length && "string" === typeof a) for (e = 0; e < this.length; e++) this[e].style[a] = c;
                        return this
                    }, each: function (a) {
                        for (var c = 0; c < this.length; c++) a.call(this[c], c, this[c]);
                        return this
                    }, html: function (a) {
                        if ("undefined" === typeof a) return this[0] ? this[0].innerHTML : void 0;
                        for (var c =
                            0; c < this.length; c++) this[c].innerHTML = a;
                        return this
                    }, text: function (a) {
                        if ("undefined" === typeof a) return this[0] ? this[0].textContent.trim() : null;
                        for (var c = 0; c < this.length; c++) this[c].textContent = a;
                        return this
                    }, is: function (e) {
                        if (!this[0]) return !1;
                        if ("string" === typeof e) {
                            var d = this[0];
                            if (d === document) return e === document;
                            if (d === window) return e === window;
                            if (d.matches) return d.matches(e);
                            if (d.webkitMatchesSelector) return d.webkitMatchesSelector(e);
                            if (d.mozMatchesSelector) return d.mozMatchesSelector(e);
                            if (d.msMatchesSelector) return d.msMatchesSelector(e);
                            e = c(e);
                            for (d = 0; d < e.length; d++) if (e[d] === this[0]) return !0;
                            return !1
                        }
                        if (e === document) return this[0] === document;
                        if (e === window) return this[0] === window;
                        if (e.nodeType || e instanceof a) for (e = e.nodeType ? [e] : e, d = 0; d < e.length; d++) if (e[d] === this[0]) return !0;
                        return !1
                    }, index: function () {
                        if (this[0]) {
                            for (var a = this[0], c = 0; null !== (a = a.previousSibling);) 1 === a.nodeType && c++;
                            return c
                        }
                    }, eq: function (c) {
                        if ("undefined" === typeof c) return this;
                        var e = this.length;
                        return c > e - 1 ? new a([]) : 0 > c ? (c = e + c, 0 > c ? new a([]) : new a([this[c]])) :
                            new a([this[c]])
                    }, append: function (c) {
                        var e;
                        for (e = 0; e < this.length; e++) if ("string" === typeof c) {
                            var d = document.createElement("div");
                            for (d.innerHTML = c; d.firstChild;) this[e].appendChild(d.firstChild)
                        } else if (c instanceof a) for (d = 0; d < c.length; d++) this[e].appendChild(c[d]); else this[e].appendChild(c);
                        return this
                    }, prepend: function (c) {
                        var d, e;
                        for (d = 0; d < this.length; d++) if ("string" === typeof c) {
                            var f = document.createElement("div");
                            f.innerHTML = c;
                            for (e = f.childNodes.length - 1; 0 <= e; e--) this[d].insertBefore(f.childNodes[e],
                                this[d].childNodes[0])
                        } else if (c instanceof a) for (e = 0; e < c.length; e++) this[d].insertBefore(c[e], this[d].childNodes[0]); else this[d].insertBefore(c, this[d].childNodes[0]);
                        return this
                    }, insertBefore: function (a) {
                        a = c(a);
                        for (var d = 0; d < this.length; d++) if (1 === a.length) a[0].parentNode.insertBefore(this[d], a[0]); else if (1 < a.length) for (var e = 0; e < a.length; e++) a[e].parentNode.insertBefore(this[d].cloneNode(!0), a[e])
                    }, insertAfter: function (a) {
                        a = c(a);
                        for (var d = 0; d < this.length; d++) if (1 === a.length) a[0].parentNode.insertBefore(this[d],
                            a[0].nextSibling); else if (1 < a.length) for (var e = 0; e < a.length; e++) a[e].parentNode.insertBefore(this[d].cloneNode(!0), a[e].nextSibling)
                    }, next: function (d) {
                        return 0 < this.length ? d ? this[0].nextElementSibling && c(this[0].nextElementSibling).is(d) ? new a([this[0].nextElementSibling]) : new a([]) : this[0].nextElementSibling ? new a([this[0].nextElementSibling]) : new a([]) : new a([])
                    }, nextAll: function (d) {
                        var e = [], f = this[0];
                        if (!f) return new a([]);
                        for (; f.nextElementSibling;) f = f.nextElementSibling, d ? c(f).is(d) && e.push(f) :
                            e.push(f);
                        return new a(e)
                    }, prev: function (d) {
                        return 0 < this.length ? d ? this[0].previousElementSibling && c(this[0].previousElementSibling).is(d) ? new a([this[0].previousElementSibling]) : new a([]) : this[0].previousElementSibling ? new a([this[0].previousElementSibling]) : new a([]) : new a([])
                    }, prevAll: function (d) {
                        var e = [], f = this[0];
                        if (!f) return new a([]);
                        for (; f.previousElementSibling;) f = f.previousElementSibling, d ? c(f).is(d) && e.push(f) : e.push(f);
                        return new a(e)
                    }, parent: function (a) {
                        for (var d = [], e = 0; e < this.length; e++) a ?
                            c(this[e].parentNode).is(a) && d.push(this[e].parentNode) : d.push(this[e].parentNode);
                        return c(c.unique(d))
                    }, parents: function (a) {
                        for (var d = [], e = 0; e < this.length; e++) for (var f = this[e].parentNode; f;) a ? c(f).is(a) && d.push(f) : d.push(f), f = f.parentNode;
                        return c(c.unique(d))
                    }, find: function (c) {
                        for (var d = [], e = 0; e < this.length; e++) for (var f = this[e].querySelectorAll(c), g = 0; g < f.length; g++) d.push(f[g]);
                        return new a(d)
                    }, children: function (d) {
                        for (var e = [], f = 0; f < this.length; f++) for (var k = this[f].childNodes, g = 0; g < k.length; g++) d ?
                            1 === k[g].nodeType && c(k[g]).is(d) && e.push(k[g]) : 1 === k[g].nodeType && e.push(k[g]);
                        return new a(c.unique(e))
                    }, remove: function () {
                        for (var a = 0; a < this.length; a++) this[a].parentNode && this[a].parentNode.removeChild(this[a]);
                        return this
                    }, add: function () {
                        var a, d;
                        for (a = 0; a < arguments.length; a++) {
                            var f = c(arguments[a]);
                            for (d = 0; d < f.length; d++) this[this.length] = f[d], this.length++
                        }
                        return this
                    }
                };
            c.fn = a.prototype;
            c.unique = function (a) {
                for (var c = [], d = 0; d < a.length; d++) -1 === c.indexOf(a[d]) && c.push(a[d]);
                return c
            };
            return c
        }(),
        n = ["jQuery", "Zepto", "Dom7"], k = 0;
    for (; k < n.length; k++) window[n[k]] && a(window[n[k]]);
    if (n = "undefined" === typeof f ? window.Dom7 || window.Zepto || window.jQuery : f) "transitionEnd" in n.fn || (n.fn.transitionEnd = function (a) {
        function c(e) {
            if (e.target === this) for (a.call(this, e), f = 0; f < d.length; f++) k.off(d[f], c)
        }

        var d = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], f,
            k = this;
        if (a) for (f = 0; f < d.length; f++) k.on(d[f], c);
        return this
    }), "transform" in n.fn || (n.fn.transform = function (a) {
        for (var c =
            0; c < this.length; c++) {
            var d = this[c].style;
            d.webkitTransform = d.MsTransform = d.msTransform = d.MozTransform = d.OTransform = d.transform = a
        }
        return this
    }), "transition" in n.fn || (n.fn.transition = function (a) {
        "string" !== typeof a && (a += "ms");
        for (var c = 0; c < this.length; c++) {
            var d = this[c].style;
            d.webkitTransitionDuration = d.MsTransitionDuration = d.msTransitionDuration = d.MozTransitionDuration = d.OTransitionDuration = d.transitionDuration = a
        }
        return this
    });
    window.Swiper = d
})();
"undefined" !== typeof module ? module.exports = window.Swiper : "function" === typeof define && define.amd && define([], function () {
    return window.Swiper
});
var cancelFullScreenMode = function (a, c) {
    "undefined" != typeof mapOptions && (mapOptions.isFullScreen = !1);
    document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.msExitFullscreen && document.msExitFullscreen();
    c || (setTimeout(function () {
        setSlideshowCanvasSize(a)
    }, 300), void 0 != oSwiper && showMap(oSwiper))
}, enterFullScreenMode = function (a) {
    a.requestFullscreen ? a.requestFullscreen() : a.webkitRequestFullscreen ?
        a.webkitRequestFullscreen() : a.mozRequestFullScreen ? a.mozRequestFullScreen() : a.msRequestFullscreen && a.msRequestFullscreen()
}, map, mapFullScreen;

function createShadedPolygon(a, c) {
    Array.isArray(c) || (c = JSON.parse(c));
    for (var d = [], f = 0; f < c.length; f++) {
        var n = new google.maps.LatLng(c[f][1], c[f][0]);
        d.push(n)
    }
    (new google.maps.Polygon({
        path: d,
        strokeColor: "red",
        strokeWeight: 1,
        fillColor: "pink",
        fillOpacity: .55,
        zIndex: 90
    })).setMap(a)
}

function createMarker(a, c) {
    var d = new google.maps.LatLng(c.centerLat, c.centerLng);
    (new GmapMarkerLabel({
        position: d,
        map: a,
        labelContent: c.name,
        labelAnchor: new google.maps.Point(50, 0),
        labelClass: "labels",
        labelStyle: {opacity: .85},
        icon: "img/pixel_trans.gif",
        draggable: !0,
        zIndex: 100,
        district: c.district
    })).setMap(a)
}

function displayMap(a, c, d) {
    void 0 == a && setTimeout(function () {
        a = new google.maps.Map(d, {
            zoom: 12,
            center: {lat: c.centerLat, lng: c.centerLng},
            fullscreenControl: !1,
            gestureHandling: "cooperative"
        });
        createShadedPolygon(a, c.coordinates);
        createMarker(a, c)
    }, 40)
}

function displaySlideshowMap(a) {
    var c = a.isFullScreen ? mapFullScreen : map, d = document.getElementById("listingMap"),
        f = document.getElementById("listingMapFullScreen");
    displayMap(c, a, a.isFullScreen ? f : d);
    a.isFullScreen ? mapFullScreen = c : map = c
}

function displayGridMap(a) {
    var c = document.getElementById("gridItemMap");
    displayMap(null, a, c)
}

var gl_cookies_duration = 365, gl_cookiesTick = null, setCookie = function (a, c, d) {
    var f = new Date;
    f.setTime(f.getTime() + 864E5 * d);
    d = "expires\x3d" + f.toUTCString();
    document.cookie = a + "\x3d" + c + ";" + d + ";path\x3d/"
}, getCookie = function (a) {
    a += "\x3d";
    for (var c = decodeURIComponent(document.cookie).split(";"), d = 0; d < c.length; d++) {
        for (var f = c[d]; " " == f.charAt(0);) f = f.substring(1);
        if (0 == f.indexOf(a)) return f.substring(a.length, f.length)
    }
    return ""
}, checkCookie = function (a) {
    var c = !0;
    "" == getCookie(a) && (c = !1);
    return c
}, isCookiesAllowed =
    function (a) {
        void 0 == a && (a = !0);
        var c = checkCookie("useremail"), d = checkCookie("rejectcookies");
        c || d ? clearInterval(gl_cookiesTick) : a ? -1 === window.location.href.indexOf("register-for-listings") && -1 === window.location.href.indexOf("cookies-info") && -1 === window.location.href.indexOf("contact") && -1 === window.location.href.indexOf("home-valuation") && -1 === window.location.href.indexOf("feedback") && -1 === window.location.href.indexOf("request-information") ? (setCookie("cookiesprevurl", window.location.href, 1), openModal()) :
            clearInterval(gl_cookiesTick) : (setCookie("rejectcookies", "1", 45), setCookie("cookiesprevurl", window.location.href, 1), window.location.href = "/register-save-listings")
    }, deleteCookie = function (a) {
    document.cookie = a + "\x3d; expires\x3dThu, 01 Jan 1970 00:00:00 UTC; path\x3d/;"
};

function deleteAllCookies() {
    for (var a = document.cookie.split(";"), c = 0; c < a.length; c++) {
        var d = a[c], f = d.indexOf("\x3d");
        d = -1 < f ? d.substr(0, f) : d;
        document.cookie = d + "\x3d;expires\x3dThu, 01 Jan 1970 00:00:00 GMT"
    }
}

var setCookieEmail = function (a) {
        var c = !0;
        void 0 == a && (a = !0);
        var d = document.getElementById("cookie-email");
        void 0 != d && (validateEmail(d.value) ? setCookie("useremail", d.value, gl_cookies_duration) : (c = !1, a && alert("You have entered an invalid email address!"), d.focus()));
        return c
    }, validateEmail = function (a) {
        return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(a) ? !0 : !1
    }, openModal = function () {
        var a = document.getElementById("cookiespopup");
        void 0 != a && (a.style.display = "block")
    },
    closeModal = function () {
        var a = document.getElementById("cookiespopup");
        void 0 != a && (a.style.display = "none")
    };
gl_cookiesTick || (gl_cookiesTick = setInterval(function () {
    isCookiesAllowed(!0)
}, 3E3));
var g_favouriteLabel = "", getFavourites = function () {
    var a = getCookie("favourites");
    "" == a && (a = []);
    Array.isArray(a) || (a = a.split(","));
    return a
}, showFavouriteIcon = function (a) {
    var c = document.getElementById("grid-item-favourite-" + a);
    void 0 != c && (c = c.children, c[0].style.display = "none", c[1].style.display = "block", a = document.getElementById("grid-item-favourite-text-" + a), void 0 != a && (a.innerHTML = getLanguageText("TXT_SAVED_TO_FAVOURITES", "Saved to favourites")))
}, hideFavouriteIcon = function (a) {
    var c = document.getElementById("grid-item-favourite-" +
        a);
    void 0 != c && (c = c.children, c[0].style.display = "block", c[1].style.display = "none", a = document.getElementById("grid-item-favourite-text-" + a), void 0 != a && (a.innerHTML = getLanguageText("TXT_SAVE_TO_FAVOURITES", "Save to favourites")))
}, displayFavouriteIcon = function () {
    var a = getCookie("favourites");
    "" == a && (a = []);
    Array.isArray(a) || (a = a.split(","));
    for (var c = 0; c < a.length; c++) showFavouriteIcon(a[c]);
    c = a.length;
    g_favouriteLabel = getLanguageText("BTN_FAVOURITES", "Favourites") + " (" + c + ")";
    c = document.getElementById("btn-favourite");
    void 0 != c.parentNode.tagName && "a" == c.parentNode.tagName.toLowerCase() && (c.textContent = g_favouriteLabel, c.parentNode.href = c.parentNode.baseURI + "favourites/ids-" + a.toString() + "/page-1")
}, setAndDisplayFavourites = function (a) {
    setCookie("favourites", a, gl_cookies_duration);
    displayFavouriteIcon()
}, accessViewingHistory = function (a, c) {
    var d = new XMLHttpRequest;
    a = JSON.stringify(a);
    d.onload = function (a) {
        a = a.target.response;
        void 0 != a && void 0 != c && c(a)
    };
    d.open("POST", "/viewing-history", !0);
    d.setRequestHeader("Content-type",
        "application/json");
    d.responseType = "json";
    d.send(a)
}, fetchViewingHistory = function () {
    if (checkCookie("useremail")) {
        var a = {email: getCookie("useremail"), action: "fetchClientInfo"};
        accessViewingHistory(a, function (a) {
            setAndDisplayFavourites(a.success ? a.favorites : [])
        })
    }
}, saveFavourite = function (a, c, d) {
    checkCookie("useremail") && (a = {
        email: getCookie("useremail"),
        id: a,
        action: c
    }, accessViewingHistory(a, function (a) {
        void 0 != d && d(a.success)
    }))
}, saveSearchCriteria = function (a) {
    checkCookie("useremail") && (a = {
        email: getCookie("useremail"),
        data: a, action: "addSearchHistory"
    }, accessViewingHistory(a, function (a) {
    }))
}, getUserSearchCriteria = function (a, c) {
    var d = {};
    for (key in a) "object" == typeof c[key] || "array" == typeof c[key] ? void 0 != c[key] && 0 < c[key].length && (d[key] = c[key]) : "count" != key && c[key] != a[key] && (d[key] = c[key]);
    0 < Object.keys(d).length && saveSearchCriteria(d)
}, setFavourite = function (a) {
    if (checkCookie("useremail")) {
        var c = getCookie("favourites");
        "" == c && (c = []);
        Array.isArray(c) || (c = c.split(","));
        var d = c.indexOf(a.toString());
        -1 == d ? (saveFavourite(a,
            "markAsFavourite", function (a) {
            }), c.push(a)) : (saveFavourite(a, "removeFavourite", function (a) {
        }), c.splice(d, 1), hideFavouriteIcon(a));
        setAndDisplayFavourites(c)
    } else deleteCookie("rejectcookies"), isCookiesAllowed(!1)
};
setTimeout(function () {
    fetchViewingHistory()
}, 10);
var activateThumbnail = function (a, c) {
        var d = a.slides.length - 2;
        c > d ? c = 1 : 0 == c && (c = d);
        a = document.querySelector("#bs-slide-thumb" + a.previousIndex);
        void 0 != a && a.classList.remove("slider-active");
        a = document.querySelector("#bs-slide-thumb" + c);
        void 0 != a && a.classList.add("slider-active")
    }, hideMap = function () {
        var a = document.getElementById("listingMap");
        a.style.display = "none";
        a = document.getElementById("listingMapFullScreen");
        a.style.display = "none"
    }, showMap = function (a) {
    }, oSwiper = null, createMainSlider = function () {
        oSwiper =
            new Swiper(".swiper-main", {
                slidesPerView: 1,
                spaceBetween: 0,
                loop: !0,
                keyboardControl: !0,
                touchAngle: 20,
                pagination: ".swiper-pagination",
                paginationType: "fraction",
                paginationFractionRender: function (a, c, d) {
                    return _getPaginationHtml(c, d)
                },
                preloadImages: !1,
                lazyLoading: !0,
                lazyLoadingInPrevNext: !0,
                cube: {slideShadows: !1, shadow: !1, shadowOffset: 20, shadowScale: .94},
                coverflow: {rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: !1},
                onInit: function (a) {
                    activateThumbnail(a, 1)
                },
                onSlidePrevStart: function (a) {
                    activateThumbnail(a,
                        a.activeIndex)
                },
                onSlideNextStart: function (a) {
                    activateThumbnail(a, a.activeIndex)
                },
                onClick: function (a, c) {
                    a.slideNext()
                },
                onTouchEnd: function (a, c) {
                },
                onTap: function (a, c) {
                }
            })
    }, changePage = function () {
        if ("undefined" != typeof angular) {
            var a = document.getElementById("results-paging");
            if (void 0 != a) {
                var c = angular.element(a).scope();
                c.$apply(function () {
                    c.changePage()
                })
            }
        }
    }, _getImageTitleFromSrc = function (a) {
        a = a.split("/");
        a = a[a.length - 1];
        -1 < a.lastIndexOf(".") && (a = a.split(".")[0]);
        return a = a.replace(/\s/g, "-")
    }, createMainSwiperDom =
        function (a) {
            var c = document.getElementById("slideshow-canvas-img-list");
            if (void 0 != c && void 0 != a) {
                for (var d = "", f = 0; f < a.images.length; f++) {
                    var n = a.images[f], k = _getImageTitleFromSrc(n);
                    d += '\t\x3cdiv class\x3d"swiper-slide"\x3e';
                    d += '\t\t\x3cimg data-src\x3d"' + n + '" alt\x3d"' + k + '" title\x3d"' + k + '" class\x3d"swiper-lazy swiper-slide-img"\x3e';
                    d += '\t\t\x3cdiv class\x3d"swiper-lazy-preloader swiper-lazy-preloader-white"\x3e\x3c/div\x3e';
                    d += "\t\x3c/div\x3e"
                }
                c.innerHTML = d + '\t\x3cdiv class\x3d"swiper-slide" id\x3d"listingMapFake"\x3e\x3c/div\x3e';
                createMainSlider()
            }
        }, showSlide = function (a) {
        oSwiper.slideTo(a, 3);
        activateThumbnail(oSwiper, a)
    }, showNextSlide = function (a) {
        oSwiper.slideNext()
    }, showPreviousSlide = function (a) {
        oSwiper.slidePrev()
    }, _getPaginationHtml = function (a, c) {
        return '\x3cdiv class\x3d"bs-card-media-label-photos"\x3e\t\x3csvg class\x3d"black-stripe-icon" xmlns\x3d"http://www.w3.org/2000/svg" fit\x3d"" height\x3d"100%" width\x3d"100%" preserveAspectRatio\x3d"xMidYMid meet" viewBox\x3d"0 0 24 24" focusable\x3d"false"\x3e\t\t\x3cg id\x3d"camera_alt"\x3e\x3ccircle r\x3d"3.2" cy\x3d"12" cx\x3d"12"/\x3e\x3cpath d\x3d"M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/\x3e\x3c/g\x3e\t\x3c/svg\x3e\t\x3cspan class\x3d"' +
            a + '"\x3e\x3c/span\x3e / \x3cspan class\x3d"' + c + '"\x3e\x3c/span\x3e\x3c/div\x3e'
    }, oSwiper0 = null, oSwiper1 = null, oSwiper2 = null, oSwiper3 = null, oSwiper4 = null, oSwiper5 = null,
    oSwiper6 = null, oSwiper7 = null, oSwiper8 = null, oSwiper9 = null, oSwiper10 = null, oSwiper11 = null,
    oSwiper12 = null, oSwiper13 = null, oSwiper14 = null, oSwiper15 = null, oSwiper16 = null, oSwiper17 = null,
    oSwiper18 = null, oSwiper19 = null, oSwiper20 = null, oSwiper21 = null, oSwiper22 = null, oSwiper23 = null,
    oSwiper24 = null, oSwiperFullscreen = null, oSwiperCurrent = null, resetGridSliders =
        function () {
            oSwiper24 = oSwiper23 = oSwiper22 = oSwiper21 = oSwiper20 = oSwiper19 = oSwiper18 = oSwiper17 = oSwiper16 = oSwiper15 = oSwiper14 = oSwiper13 = oSwiper12 = oSwiper11 = oSwiper10 = oSwiper9 = oSwiper8 = oSwiper7 = oSwiper6 = oSwiper5 = oSwiper4 = oSwiper3 = oSwiper2 = oSwiper1 = oSwiper0 = null
        }, swiperOptions = {
        speed: 100,
        slidesPerView: 1,
        spaceBetween: 0,
        loop: !0,
        pagination: ".swiper-pagination",
        paginationType: "fraction",
        paginationFractionRender: function (a, c, d) {
            return _getPaginationHtml(c, d)
        },
        preloadImages: !1,
        lazyLoading: !0,
        lazyLoadingInPrevNext: !0,
        a11y: !1,
        keyboardControl: !1,
        cube: {slideShadows: !1, shadow: !1, shadowOffset: 20, shadowScale: .94},
        coverflow: {rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: !1}
    }, createSliders = function () {
        resetGridSliders();
        oSwiper0 = new Swiper(".swiper0", swiperOptions);
        oSwiper1 = new Swiper(".swiper1", swiperOptions);
        oSwiper2 = new Swiper(".swiper2", swiperOptions);
        oSwiper3 = new Swiper(".swiper3", swiperOptions);
        oSwiper4 = new Swiper(".swiper4", swiperOptions);
        oSwiper5 = new Swiper(".swiper5", swiperOptions);
        oSwiper6 = new Swiper(".swiper6",
            swiperOptions);
        oSwiper7 = new Swiper(".swiper7", swiperOptions);
        oSwiper8 = new Swiper(".swiper8", swiperOptions);
        oSwiper9 = new Swiper(".swiper9", swiperOptions);
        oSwiper10 = new Swiper(".swiper10", swiperOptions);
        oSwiper11 = new Swiper(".swiper11", swiperOptions);
        oSwiper12 = new Swiper(".swiper12", swiperOptions);
        oSwiper13 = new Swiper(".swiper13", swiperOptions);
        oSwiper14 = new Swiper(".swiper14", swiperOptions);
        oSwiper15 = new Swiper(".swiper15", swiperOptions);
        oSwiper16 = new Swiper(".swiper16", swiperOptions);
        oSwiper17 = new Swiper(".swiper17",
            swiperOptions);
        oSwiper18 = new Swiper(".swiper18", swiperOptions);
        oSwiper19 = new Swiper(".swiper19", swiperOptions);
        oSwiper20 = new Swiper(".swiper20", swiperOptions);
        oSwiper21 = new Swiper(".swiper21", swiperOptions);
        oSwiper22 = new Swiper(".swiper22", swiperOptions);
        oSwiper23 = new Swiper(".swiper23", swiperOptions);
        oSwiper24 = new Swiper(".swiper24", swiperOptions);
        showHideFillerAds()
    }, swiperImages = {}, createSwipersDom = function (a) {
        var c = document.getElementById("search-results-container");
        void 0 != c && (c.innerHTML = a,
            createSliders())
    }, prepareFullScreenMode = function (a, c, d, f) {
        "undefined" === typeof a && (a = "");
        "undefined" === typeof f && (f = !1);
        var n = null;
        if ("" != a || f) {
            if (f = getDevice(), n = createFullscreenSlider(a, c, d), f.isIDevice || f.isMac && f.isSafari || enterFullScreenMode(n), void 0 != oSwiper && oSwiper.disableKeyboardControl(), isFullScreen = !0, oSwiperFullscreen = new Swiper(".swiper_l", swiperOptions), oSwiperFullscreen.enableKeyboardControl(), oSwiperCurrent = c = this["oSwiper" + a], oSwiperFullscreen.slideTo(c.activeIndex, 3), f.isIDevice ||
            f.isMac && f.isSafari) history.pushState("cancelIOSbackbutton", null, null), window.scrollTo(0, 0)
        } else n = document.getElementById("bs-slider-container" + a), enterFullScreenMode(n), setTimeout(function () {
            resetSlideshowCanvasSize(a)
        }, 200), void 0 != oSwiper && showMap(oSwiper)
    }, createFullscreenSlider = function (a, c, d) {
        if ("undefined" === typeof a || "" === a) a = "null";
        var f = "", n = document.getElementById("fullscreen-placeholder");
        if (void 0 != n) {
            f += '\t\t\x3cdiv class\x3d"swiper-container bs-slider swiper_l"\x3e\t\t\t\x3cdiv class\x3d"swiper-wrapper"\x3e';
            for (var k = 0; k < d.length; k++) {
                var m = d[k], l = _getImageTitleFromSrc(m);
                f += '\t\t\t\t\x3cdiv class\x3d"swiper-slide"\x3e';
                f += '\t\t\t\t\t\x3cimg data-src\x3d"' + m + '" alt\x3d"' + l + '" title\x3d"' + l + '" class\x3d"swiper-lazy swiper-slide-img"\x3e';
                f += '\t\t\t\t\t\x3cdiv class\x3d"swiper-lazy-preloader swiper-lazy-preloader-white"\x3e\x3c/div\x3e';
                f += "\t\t\t\t\x3c/div\x3e"
            }
            n.innerHTML = f + '\t\t\t\x3c/div\x3e\t\t\t\x3cdiv class\x3d"swiper-pagination"\x3e\x3c/div\x3e' + ('\t\t\t\x3cdiv class\x3d"bs-slider-arrow bs-slider-arrow-right bs-md-button"\x3e\x3ci class\x3d"fa fa-angle-right fa-3x bs-slider-arrow-content" onclick\x3d"swiperNext(' +
                a + ');" aria-hidden\x3d"true"\x3e\x3c/i\x3e\x3c/div\x3e') + ('\t\t\t\x3cdiv class\x3d"bs-slider-arrow bs-slider-arrow-left bs-md-button"\x3e\x3ci class\x3d"fa fa-angle-left fa-3x bs-slider-arrow-content" onclick\x3d"swiperPrevious(' + a + ');" aria-hidden\x3d"true"\x3e\x3c/i\x3e\x3c/div\x3e') + ('\t\t\t\x3cdiv class\x3d"bs-gallery-slider-arrow-fullscreen bs-md-button"\x3e\x3ci class\x3d"fa fa-compress fa-2x bs-slider-arrow-content" onclick\x3d"fullscreen_click(' + a + ", " + c + ');" aria-hidden\x3d"true"\x3e\x3c/i\x3e\x3c/div\x3e') +
                "\t\t\x3c/div\x3e";
            redirectYpos = window.pageYOffset || document.scrollTop || document.body.scrollTop;
            redirectXpos = window.pageXOffset || document.scrollLeft || document.body.scrollLeft;
            a = getDevice();
            isFullScreen = !0;
            isFullScreenClicked = a.isMovile ? !0 : !1;
            addClass(document.body, "fullscreen")
        }
        return n
    }, createMapPlaceholder = function () {
        var a = document.getElementById("fullscreen-placeholder");
        if (void 0 != a) {
            a.innerHTML = '\t\t\x3cdiv class\x3d"grid-item-map" id\x3d"gridItemMap"\x3e\x3c/div\x3e\t\t\t\x3cdiv class\x3d"bs-gallery-slider-arrow-fullscreen bs-md-button"\x3e\x3ci class\x3d"fa fa-compress fa-2x bs-slider-arrow-content" onclick\x3d"fullscreen_click(null, -1);" aria-hidden\x3d"true"\x3e\x3c/i\x3e\x3c/div\x3e';
            redirectYpos = window.pageYOffset || document.scrollTop || document.body.scrollTop;
            redirectXpos = window.pageXOffset || document.scrollLeft || document.body.scrollLeft;
            var c = getDevice();
            isFullScreen = !0;
            isFullScreenClicked = c.isMobile ? !0 : !1;
            addClass(document.body, "fullscreen")
        }
        return a
    }, deny_fullscreen_click = function () {
        void 0 != oSwiperFullscreen && void 0 != oSwiperCurrent && oSwiperCurrent.slideTo(oSwiperFullscreen.activeIndex, 3);
        history.back()
    }, fullscreen_click = function (a, c, d, f) {
        a = void 0 == a ? "" : a.toString();
        isFullScreen ?
            (c = getDevice(), isFullScreen = !1, removeClass(document.body, "fullscreen"), c.isIDevice || c.isMac && c.isSafari ? deny_fullscreen_click() : cancelFullScreenMode(a, !1), setTimeout(function () {
                window.scrollTo(redirectXpos, redirectYpos)
            }, 200)) : prepareFullScreenMode(a, c, d, f)
    }, showGridItemMap = function (a) {
        var c = createMapPlaceholder(), d = getDevice();
        d.isIDevice || d.isMac && d.isSafari ? isFullScreen = !0 : enterFullScreenMode(c);
        displayGridMap(a)
    }, swiperPrevious = function (a) {
        (isFullScreenMode() || isFullScreen ? oSwiperFullscreen : this["oSwiper" +
        a]).slidePrev()
    }, swiperNext = function (a) {
        (isFullScreenMode() || isFullScreen ? oSwiperFullscreen : this["oSwiper" + a]).slideNext()
    }, swiperClick = function (a) {
        var c = "_blank";
        getDevice().isIDevice && (c = "_self");
        window.open(a, c).focus()
    };
(function (a, c) {
    function d(a) {
        return !!("" === a || a && a.charCodeAt && a.substr)
    }

    function f(a) {
        return t ? t(a) : "[object Array]" === g.call(a)
    }

    function n(a) {
        return "[object Object]" === g.call(a)
    }

    function k(a, c) {
        var d;
        a = a || {};
        c = c || {};
        for (d in c) c.hasOwnProperty(d) && null == a[d] && (a[d] = c[d]);
        return a
    }

    function m(a, c, d) {
        var e = [], f;
        if (!a) return e;
        if (r && a.map === r) return a.map(c, d);
        var b = 0;
        for (f = a.length; b < f; b++) e[b] = c.call(d, a[b], b, a);
        return e
    }

    function l(a, c) {
        a = Math.round(Math.abs(a));
        return isNaN(a) ? c : a
    }

    function e(a) {
        var c =
            h.settings.currency.format;
        "function" === typeof a && (a = a());
        return d(a) && a.match("%v") ? {
            pos: a,
            neg: a.replace("-", "").replace("%v", "-%v"),
            zero: a
        } : a && a.pos && a.pos.match("%v") ? a : d(c) ? h.settings.currency.format = {
            pos: c,
            neg: c.replace("%v", "-%v"),
            zero: c
        } : c
    }

    var h = {
        version: "0.4.1",
        settings: {
            currency: {symbol: "$", format: "%s%v", decimal: ".", thousand: ",", precision: 2, grouping: 3},
            number: {precision: 0, grouping: 3, thousand: ",", decimal: "."}
        }
    }, r = Array.prototype.map, t = Array.isArray, g = Object.prototype.toString, D = h.unformat =
        h.parse = function (a, c) {
            if (f(a)) return m(a, function (a) {
                return D(a, c)
            });
            a = a || 0;
            if ("number" === typeof a) return a;
            c = c || ".";
            var d = RegExp("[^0-9-" + c + "]", ["g"]);
            d = parseFloat(("" + a).replace(/\((.*)\)/, "-$1").replace(d, "").replace(c, "."));
            return isNaN(d) ? 0 : d
        }, z = h.toFixed = function (a, c) {
        c = l(c, h.settings.number.precision);
        var d = Math.pow(10, c);
        return (Math.round(h.unformat(a) * d) / d).toFixed(c)
    }, A = h.formatNumber = h.format = function (a, c, d, e) {
        if (f(a)) return m(a, function (b) {
            return A(b, c, d, e)
        });
        a = D(a);
        var g = k(n(c) ? c : {
                precision: c,
                thousand: d, decimal: e
            }, h.settings.number), b = l(g.precision), q = 0 > a ? "-" : "", u = parseInt(z(Math.abs(a || 0), b), 10) + "",
            C = 3 < u.length ? u.length % 3 : 0;
        return q + (C ? u.substr(0, C) + g.thousand : "") + u.substr(C).replace(/(\d{3})(?=\d)/g, "$1" + g.thousand) + (b ? g.decimal + z(Math.abs(a), b).split(".")[1] : "")
    }, F = h.formatMoney = function (a, c, d, g, y, b) {
        if (f(a)) return m(a, function (a) {
            return F(a, c, d, g, y, b)
        });
        a = D(a);
        var q = k(n(c) ? c : {symbol: c, precision: d, thousand: g, decimal: y, format: b}, h.settings.currency),
            u = e(q.format);
        return (0 < a ? u.pos : 0 >
        a ? u.neg : u.zero).replace("%s", q.symbol).replace("%v", A(Math.abs(a), l(q.precision), q.thousand, q.decimal))
    };
    h.formatColumn = function (a, c, g, q, y, b) {
        if (!a) return [];
        var r = k(n(c) ? c : {symbol: c, precision: g, thousand: q, decimal: y, format: b}, h.settings.currency),
            u = e(r.format), C = u.pos.indexOf("%s") < u.pos.indexOf("%v") ? !0 : !1, z = 0;
        a = m(a, function (a) {
            if (f(a)) return h.formatColumn(a, r);
            a = D(a);
            a = (0 < a ? u.pos : 0 > a ? u.neg : u.zero).replace("%s", r.symbol).replace("%v", A(Math.abs(a), l(r.precision), r.thousand, r.decimal));
            a.length > z &&
            (z = a.length);
            return a
        });
        return m(a, function (a) {
            return d(a) && a.length < z ? C ? a.replace(r.symbol, r.symbol + Array(z - a.length + 1).join(" ")) : Array(z - a.length + 1).join(" ") + a : a
        })
    };
    "undefined" !== typeof exports ? ("undefined" !== typeof module && module.exports && (exports = module.exports = h), exports.accounting = h) : "function" === typeof define && define.amd ? define([], function () {
        return h
    }) : (h.noConflict = function (d) {
        return function () {
            a.accounting = d;
            h.noConflict = c;
            return h
        }
    }(a.accounting), a.accounting = h)
})(this);

function completely(a, c) {
    c = c || {};
    c.fontSize = c.fontSize || "16px";
    c.fontFamily = c.fontFamily || "sans-serif";
    c.promptInnerHTML = c.promptInnerHTML || "";
    c.color = c.color || "#333";
    c.hintColor = c.hintColor || "#aaa";
    c.backgroundColor = c.backgroundColor || "#fff";
    c.dropDownBorderColor = c.dropDownBorderColor || "#aaa";
    c.dropDownZIndex = c.dropDownZIndex || "100";
    c.dropDownOnHoverBackgroundColor = c.dropDownOnHoverBackgroundColor || "#ddd";
    var d = document.createElement("input");
    d.type = "text";
    d.spellcheck = !1;
    d.className = "at at-input";
    var f = d.cloneNode();
    f.disabled = "";
    f.className = "at at-input at-hint";
    d.style.backgroundColor = "transparent";
    d.style.verticalAlign = "top";
    d.style.position = "relative";
    var n = document.createElement("div");
    n.className = "at-wrapper";
    var k = document.createElement("div");
    k.className = "at at-prompt";
    k.innerHTML = c.promptInnerHTML;
    if (void 0 === document.body) throw"document.body is undefined. The library was wired up incorrectly.";
    document.body.appendChild(k);
    var m = k.getBoundingClientRect().right;
    n.appendChild(k);
    k.style.visibility =
        "visible";
    k.style.left = "-" + m + "px";
    n.style.marginLeft = m + "px";
    n.appendChild(f);
    n.appendChild(d);
    var l = document.createElement("div");
    l.className = "at at-dropdown";
    var e = function (a) {
        var d = [], e = 0, f = -1, g = function () {
            this.style.outline = "1px solid #ddd"
        }, h = function () {
            this.style.outline = "0"
        }, k = function () {
            q.hide();
            q.onmouseselection(this.__hint)
        }, q = {
            hide: function () {
                a.style.visibility = "hidden"
            }, refresh: function (c, b) {
                a.style.visibility = "hidden";
                e = 0;
                a.innerHTML = "";
                var f = window.innerHeight || document.documentElement.clientHeight,
                    l = a.parentNode.getBoundingClientRect(), n = l.top - 6;
                f = f - l.bottom - 6;
                d = [];
                for (l = 0; l < b.length; l++) if (0 === b[l]._lowername.indexOf(c.toLowerCase())) {
                    var m = document.createElement("div");
                    m.className = "at-results-row";
                    m.onmouseover = g;
                    m.onmouseout = h;
                    m.onmousedown = k;
                    m.__hint = b[l]._lowername;
                    m.innerHTML = c + "\x3cb\x3e" + b[l]._lowername.substring(c.length) + "\x3c/b\x3e";
                    d.push(m);
                    a.appendChild(m)
                }
                0 === d.length || 1 === d.length && c === d[0].__hint || 2 > d.length || (q.highlight(0), n > 3 * f ? (a.style.top = "", a.style.bottom = "100%") : (a.style.top =
                    "100%", a.style.bottom = ""), a.style.visibility = "visible")
            }, highlight: function (a) {
                -1 != f && d[f] && (d[f].style.backgroundColor = c.backgroundColor);
                d[a].style.backgroundColor = c.dropDownOnHoverBackgroundColor;
                f = a
            }, move: function (c) {
                if ("hidden" === a.style.visibility) return "";
                if (-1 === e + c || e + c === d.length) return d[e].__hint;
                e += c;
                q.highlight(e);
                return d[e].__hint
            }, onmouseselection: function () {
            }
        };
        return q
    }(l);
    e.onmouseselection = function (a) {
        d.value = f.value = r + a;
        t.onChange(d.value);
        g = d.value;
        setTimeout(function () {
                d.focus()
            },
            0)
    };
    n.appendChild(l);
    a.appendChild(n);
    var h, r, t = {
        onArrowDown: function () {
        }, onArrowUp: function () {
        }, onEnter: function () {
        }, onTab: function () {
        }, onChange: function () {
            t.repaint()
        }, startFrom: 0, options: [], wrapper: n, input: d, hint: f, dropDown: l, prompt: k, setText: function (a) {
            f.value = a;
            d.value = a
        }, getText: function () {
            return d.value
        }, hideDropDown: function () {
            e.hide()
        }, repaint: function () {
            var a = d.value, c = t.startFrom, g = t.options, k = g.length, n = a.substring(c);
            r = a.substring(0, c);
            f.value = "";
            for (c = 0; c < k; c++) {
                var m = g[c];
                if (0 === m._lowername.indexOf(n.toLowerCase())) {
                    f.value =
                        r + m._lowername;
                    break
                }
            }
            g = l.style;
            k = r;
            void 0 === h && (h = document.createElement("span"), h.className = "at at-spacer", document.body.appendChild(h));
            h.innerHTML = String(k).replace(/&/g, "\x26amp;").replace(/"/g, "\x26quot;").replace(/'/g, "\x26#39;").replace(/</g, "\x26lt;").replace(/>/g, "\x26gt;");
            k = h.getBoundingClientRect().right;
            g.left = k + "px";
            "" == a ? e.hide() : e.refresh(n, t.options)
        }
    }, g;
    (function (a, c) {
        g = a.value;
        var d = function () {
            var d = a.value;
            g !== d && (g = d, c(d))
        };
        a.addEventListener ? (a.addEventListener("input", d, !1),
            a.addEventListener("keyup", d, !1), a.addEventListener("change", d, !1)) : (a.attachEvent("oninput", d), a.attachEvent("onkeyup", d), a.attachEvent("onchange", d))
    })(d, function (a) {
        t.onChange(a)
    });
    a = function (a) {
        a = a || window.event;
        var c = a.keyCode;
        if (33 != c && 34 != c) if (27 == c) e.hide(), f.value = d.value, d.focus(); else if (39 == c || 35 == c || 9 == c) {
            if (9 == c && (a.preventDefault(), a.stopPropagation(), 0 == f.value.length)) t.onTab();
            if (0 < f.value.length && (e.hide(), d.value = f.value, a = g != d.value, g = d.value, a)) t.onChange(d.value);
            if (39 == c) t.onEnter()
        } else if (13 ==
            c) {
            if (0 != f.value.length) {
                a = "hidden" == l.style.visibility;
                e.hide();
                if (a) {
                    f.value = d.value;
                    d.focus();
                    t.onEnter();
                    return
                }
                d.value = f.value;
                a = g != d.value;
                g = d.value;
                if (a) t.onChange(d.value)
            }
            t.onEnter()
        } else if (40 == c) {
            c = e.move(1);
            if ("" == c) t.onArrowDown();
            f.value = r + c
        } else if (38 == c) {
            c = e.move(-1);
            if ("" == c) t.onArrowUp();
            f.value = r + c;
            a.preventDefault();
            a.stopPropagation()
        } else f.value = ""
    };
    d.addEventListener ? d.addEventListener("keydown", a, !1) : d.attachEvent("onkeydown", a);
    return t
}

var g_isFilterVisible = !1, changeLanguage = function (a) {
    a = "EN" == a ? "" : "/" + a;
    var c = window.location.pathname, d = c.split("/"), f = ["EN", "GR", "RU", "ZH"];
    d = 0 < d.length ? d[1] : "";
    c = "" != d && -1 < f.indexOf(d) ? c.replace("/" + d, a) : a + c;
    window.location.href = c
}, showFilters = function () {
    g_isFilterVisible = !0;
    document.getElementById("btn-search-area-mobile").checked = !0
}, hideFilters = function () {
    g_isFilterVisible = !1;
    var a = document.getElementById("btn-search-results");
    void 0 != a && (a.checked = !0)
};
window.onload = function () {
    if ("function" === typeof history.pushState) {
        var a = getDevice();
        if (a.isIDevice || a.isMac && a.isSafari) window.onpopstate = function () {
            if (isFullScreen) {
                var a = window.location.hash;
                isFullScreen = !1;
                -1 < a.indexOf("map") ? hideElemOnExitFullscreen() : (removeClass(document.body, "fullscreen"), deny_fullscreen_click(), history.pushState("newCancelIOSbackbutton", null, null), setTimeout(function () {
                    window.scrollTo(redirectXpos, redirectYpos)
                }, 200))
            }
        }
    }
    "function" === typeof loaded && loaded()
};
var _getLocationModalAlertHtml = function (a) {
    var c = '\t\x3cdiv class\x3d"modal-alert-content"\x3e' + ('\t\t\x3cp class\x3d"modal-alert-title"\x3e' + getLanguageText("TXT_LOCATION_NOT_FOUND", "Location not found") + "\x3c/p\x3e");
    c += '\t\t\x3cp class\x3d"modal-alert-text"\x3e' + getLanguageText("TXT_PLEASE_CHANGE_YOUR_SEARCH", "Location [location] not found. Please change your search and try again.") + "\x3c/p\x3e";
    return c = (c + '\t\t\x3cbutton class\x3d"modal-alert-close" onclick\x3d"hideElem(\'modal-alert\')"\x3eOK\x3c/button\x3e\t\x3c/div\x3e').replace("[location]",
        a)
}, displayLocationModalAlert = function (a) {
    a = _getLocationModalAlertHtml(a);
    var c = document.getElementById("modal-alert");
    void 0 != c && (c.innerHTML = a, c.style.display = "block")
}, getListingsFromBOS = function (a, c) {
    var d = new XMLHttpRequest;
    a = JSON.stringify(a);
    d.onload = function (a) {
        a = a.target.response;
        void 0 != a && void 0 != c && c(a)
    };
    d.open("POST", "/search-in-bos", !0);
    d.setRequestHeader("Content-type", "application/json");
    d.responseType = "json";
    d.send(a)
}, myApp = angular.module("myApp", ["ngRoute", "ngResource", "ngAnimate",
    "ngTagsInput"]);
myApp.config(["$routeProvider", "$locationProvider", function (a, c) {
    var d = getLanguageCode(), f = "EN" == d ? "" : "/" + d;
    d = "EN" == d ? "" : d + "/";
    a.when(f + "/", {
        templateUrl: d + "partials/index.jade",
        controller: "ListingsRoutingCtrl"
    }).when(f + "/home", {
        templateUrl: d + "partials/index.jade",
        controller: "MainController"
    }).when(f + "/test", {
        templateUrl: d + "partials/index.jade",
        controller: "ListingsRoutingCtrl"
    }).when(f + "/contact", {
        templateUrl: d + "partials/contact.jade",
        controller: "ListingsRoutingCtrl"
    }).when(f + "/home-valuation", {
        templateUrl: d +
        "partials/home-valuation.jade", controller: "ListingsRoutingCtrl"
    }).when(f + "/listings", {
        templateUrl: d + "partials/index.jade",
        controller: "ListingsRoutingCtrl"
    }).when(f + "/listing/:listingid", {
        templateUrl: d + "partials/index.jade",
        controller: "ListingsRoutingCtrl"
    }).when(f + "/listing/:type/:value", {
        templateUrl: d + "partials/index.jade",
        controller: "ListingsRoutingCtrl"
    }).when(f + "/property-for-sale/:district/:area/:html", {
        templateUrl: d + "partials/index.jade",
        controller: "ListingsRoutingCtrl"
    }).when(f + "/properties-for-sale/locations/:value",
        {
            templateUrl: d + "properties-for-sale/locations/:value",
            controller: "ListingsRoutingCtrl"
        }).when(f + "/favourites/:listingsids/:param1/:param2/:param3", {
        templateUrl: d + "partials/index.jade",
        controller: "ListingsRoutingCtrl"
    }).when(f + "/favourites/:listingsids/:param1/:param2", {
        templateUrl: d + "partials/index.jade",
        controller: "ListingsRoutingCtrl"
    }).when(f + "/favourites/:listingsids/:param1", {
        templateUrl: d + "partials/index.jade",
        controller: "ListingsRoutingCtrl"
    }).when(f + "/favourites/:listingsids", {
        templateUrl: d +
        "partials/index.jade", controller: "ListingsRoutingCtrl"
    }).when(f + "/properties-for-sale/:param1/:param2/:param3/:param4/:param5/:param6/:param7/:param8/:param9/:param10/:param11/:param12/:param13/:param14", {
        templateUrl: d + "partials/index.jade",
        controller: "ListingsRoutingCtrl"
    }).when(f + "/properties-for-sale/:param1/:param2/:param3/:param4/:param5/:param6/:param7/:param8/:param9/:param10/:param11/:param12/:param13", {
        templateUrl: d + "partials/index.jade",
        controller: "ListingsRoutingCtrl"
    }).when(f + "/properties-for-sale/:param1/:param2/:param3/:param4/:param5/:param6/:param7/:param8/:param9/:param10/:param11/:param12",
        {
            templateUrl: d + "partials/index.jade",
            controller: "ListingsRoutingCtrl"
        }).when(f + "/properties-for-sale/:param1/:param2/:param3/:param4/:param5/:param6/:param7/:param8/:param9/:param10/:param11", {
        templateUrl: d + "partials/index.jade",
        controller: "ListingsRoutingCtrl"
    }).when(f + "/properties-for-sale/:param1/:param2/:param3/:param4/:param5/:param6/:param7/:param8/:param9/:param10", {
        templateUrl: d + "partials/index.jade",
        controller: "ListingsRoutingCtrl"
    }).when(f + "/properties-for-sale/:param1/:param2/:param3/:param4/:param5/:param6/:param7/:param8/:param9",
        {
            templateUrl: d + "partials/index.jade",
            controller: "ListingsRoutingCtrl"
        }).when(f + "/properties-for-sale/:param1/:param2/:param3/:param4/:param5/:param6/:param7/:param8", {
        templateUrl: d + "partials/index.jade",
        controller: "ListingsRoutingCtrl"
    }).when(f + "/properties-for-sale/:param1/:param2/:param3/:param4/:param5/:param6/:param7", {
        templateUrl: d + "partials/index.jade",
        controller: "ListingsRoutingCtrl"
    }).when(f + "/properties-for-sale/:param1/:param2/:param3/:param4/:param5/:param6", {
        templateUrl: d + "partials/index.jade",
        controller: "ListingsRoutingCtrl"
    }).when(f + "/properties-for-sale/:param1/:param2/:param3/:param4/:param5", {
        templateUrl: d + "partials/index.jade",
        controller: "ListingsRoutingCtrl"
    }).when(f + "/properties-for-sale/:param1/:param2/:param3/:param4", {
        templateUrl: d + "partials/index.jade",
        controller: "ListingsRoutingCtrl"
    }).when(f + "/properties-for-sale/:param1/:param2/:param3", {
        templateUrl: d + "partials/index.jade",
        controller: "ListingsRoutingCtrl"
    }).when(f + "/properties-for-sale/:param1/:param2", {
        templateUrl: d + "partials/index.jade",
        controller: "ListingsRoutingCtrl"
    }).when(f + "/properties-for-sale/:param1", {
        templateUrl: d + "partials/index.jade",
        controller: "ListingsRoutingCtrl"
    }).when(f + "/properties-sold/:param1/:param2/:param3/:param4/:param5/:param6", {
        templateUrl: d + "partials/index.jade",
        controller: "ListingsRoutingCtrl"
    }).when(f + "/properties-sold/:param1/:param2/:param3/:param4/:param5", {
        templateUrl: d + "partials/index.jade",
        controller: "ListingsRoutingCtrl"
    }).when(f + "/properties-sold/:param1/:param2/:param3/:param4", {
        templateUrl: d +
        "partials/index.jade", controller: "ListingsRoutingCtrl"
    }).when(f + "/properties-sold/:param1/:param2/:param3", {
        templateUrl: d + "partials/index.jade",
        controller: "ListingsRoutingCtrl"
    }).when(f + "/properties-sold/:param1/:param2", {
        templateUrl: d + "partials/index.jade",
        controller: "ListingsRoutingCtrl"
    }).otherwise({redirectTo: f + "/"});
    c.html5Mode(!0)
}]);
myApp.config(["tagsInputConfigProvider", function (a) {
    a.setActiveInterpolation("tagsInput", {placeholder: !0})
}]);
"use strict";
myApp.factory("ListingSrv", ["$resource", "$http", function (a, c) {
    return a("/api/listings/:id", {id: "@_id"}, {
        create: {method: "POST"},
        getList: {method: "GET", isArray: !0},
        getOne: {method: "GET", isArray: !1},
        update: {method: "PUT"},
        destroy: {method: "DELETE"}
    })
}]);
myApp.factory("LocationSrv", ["$resource", "$http", function (a, c) {
    return a("/api/locations/:id/:title", {id: "@_id", title: "@_title"}, {
        create: {method: "POST"},
        getList: {method: "GET", isArray: !0},
        getOne: {method: "GET", isArray: !1},
        update: {method: "PUT"},
        destroy: {method: "DELETE"}
    })
}]);
myApp.factory("EventEmitterListSrv", function () {
    function a(a, c) {
        f.forEach(function (d) {
            d[a].forEach(function (a) {
                a(c)
            })
        })
    }

    function c(a, c, m) {
        var k = d(c);
        -1 < k ? f[k][a].push(m) : f.push({scope: c, add: "add" == a ? [m] : [], remove: "remove" == a ? [m] : []})
    }

    function d(a) {
        for (var c = -1, d = 0; d < f.length; d++) if (f[d].scope == a) {
            c = d;
            break
        }
        return c
    }

    var f = [];
    return {
        emitAddItem: function (c) {
            a("add", c)
        }, onAddItem: function (a, d) {
            c("add", a, d)
        }, emitRemoveItem: function (c) {
            a("remove", c)
        }, onRemoveItem: function (a, d) {
            c("remove", a, d)
        }, clear: function (a) {
            a =
                d(a);
            -1 < a && f.splice(a, 1)
        }
    }
});
myApp.service("MapInitializer", ["$q", "uiGmapGoogleMapApi", function (a, c) {
    this.getMapOptions = function () {
        return {mapOptions: {minZoom: 3}}
    };
    this.initMap = function () {
        var c = a.defer();
        c.resolve({
            center: {latitude: 34.7651, longitude: 32.5487},
            position: {coords: {latitude: 34.7651, longitude: 32.5487}}
        });
        return c.promise
    }
}]);
myApp.factory("Markers", function () {
    return [{
        id: "0",
        coords: {latitude: "34.8943384", longitude: "32.2935776"},
        window: {title: "Pegia, CY"}
    }, {id: "1", coords: {latitude: "34.7727478", longitude: "32.3981421"}, window: {title: "Paphos, CY"}}]
});
myApp.factory("Polygons", ["$window", function (a) {
    for (var c, d = [{
        path: [{latitude: 34.771, longitude: 32.4119}, {
            latitude: 34.7676,
            longitude: 32.4091
        }, {latitude: 34.7655, longitude: 32.4173}, {latitude: 34.7696, longitude: 32.4213}]
    }, {
        path: [{latitude: 34.7685, longitude: 32.435}, {latitude: 34.7657, longitude: 32.4335}, {
            latitude: 34.7645,
            longitude: 32.4393
        }, {latitude: 34.7675, longitude: 32.4399}]
    }, {
        path: [{latitude: 34.7641, longitude: 32.4273}, {latitude: 34.7761, longitude: 32.4306}, {
            latitude: 34.7735,
            longitude: 32.4359
        }, {
            latitude: 34.7714,
            longitude: 32.4333
        }]
    }, {
        path: [{latitude: 34.7671, longitude: 32.4197}, {latitude: 34.7688, longitude: 32.4222}, {
            latitude: 34.7643,
            longitude: 32.4265
        }, {latitude: 34.7621, longitude: 32.4229}]
    }, {
        path: [{latitude: 34.7733, longitude: 32.4442}, {latitude: 34.7735, longitude: 32.4472}, {
            latitude: 34.7713,
            longitude: 32.4475
        }, {latitude: 34.7708, longitude: 32.4435}]
    }], f = {
        visible: !0,
        editable: !0,
        draggable: !0,
        geodesic: !0,
        stroke: {weight: "0"},
        fill: {opacity: "0.3"},
        polygonEvents: {
            click: function (d, e, f) {
                c && (c.setEditable(!1), c = null);
                c = d;
                d.setEditable(!0);
                1 == a.confirm("Polygon co-ordinates:\n" + d.getPath().getArray().join("\n") + "\n\nPress OK to delete this shape OR Cancel to avoid deletion.") && c && c.setMap(null)
            }
        }
    }, n = [], k = 0; k < d.length; k++) {
        var m = {};
        angular.copy(f, m);
        m.id = k;
        m.path = d[k].path;
        n.push(m)
    }
    return n
}]);
var formWaiting = function () {
    addClass(document.getElementById("html-body"), "modal-effect");
    addClass(document.getElementById("bsloader"), "bsloader")
}, formSubmit = function () {
    var a = document.getElementById("bsform");
    void 0 != a && a.submit()
}, validateForm = function (a) {
    a.preventDefault();
    if ("undefined" != typeof angular && (a = document.getElementById("bsform"), void 0 != a)) {
        var c = angular.element(a).scope();
        c.$apply(function () {
            c.formValidation()
        })
    }
}, onformload = function () {
    var a = document.getElementById("btnForm");
    void 0 !=
    a && (a.onclick = validateForm)
}, goBack = function (a) {
    var c = getCookie("cookiesprevurl");
    if ("" != c) return window.location.href = c + "?", !1;
    a ? window.history.go(-a) : window.history.back()
};
onformload();
"use strict";
"use strict";
myApp.directive("onSizeChanged", ["$window", function (a) {
    return {
        restrict: "A", scope: {onSizeChanged: "\x26"}, link: function (c, d, f) {
            var n = d[0];
            (function (a, c) {
                a.cachedElementWidth = c.offsetWidth;
                a.cachedElementHeight = c.offsetHeight
            })(c, n);
            a.addEventListener("resize", function () {
                c.cachedElementWidth == n.offsetWidth && c.cachedElementHeight == n.offsetHeight || c.onSizeChanged()()
            })
        }
    }
}]);
myApp.directive("scrollThenFixToTop", ["$window", function (a) {
    return {
        scope: {}, restrict: "E", link: function (a, d, f) {
            var c = document.getElementById(f.scrollelementid), k = document.getElementById(f.fixtotopid);
            a = f.relatedheightids;
            Array.isArray(a) || (a = a.split(","));
            var m = [];
            for (f = 0; f < a.length; f++) m.push(document.getElementById(a[f]));
            c.addEventListener("scroll", function () {
                var a = k.offsetLeft;
                0 < a && d.css("left", a + "px");
                a = c.scrollTop;
                for (var e = 0, f = 0; f < m.length; f++) e += m[f].offsetHeight;
                div_top_total = e;
                a > div_top_total ?
                    d.addClass("stick-to-top") : d.removeClass("stick-to-top")
            })
        }
    }
}]);
myApp.controller("MainController", ["$window", "$location", function (a, c) {
    a.location.href = "/#"
}]);
myApp.controller("ListingsRoutingCtrl", ["$routeParams", "EventEmitterListSrv", function (a, c) {
    void 0 != a && void 0 == a.a && (a.a = "");
    if (void 0 != a && void 0 != a.listingid) a = {
        ctrl: "listingrouting",
        value: a.listingid,
        action: a.a
    }; else if (void 0 != a && void 0 != a.district && void 0 != a.area && void 0 != a.html) {
        var d = a.html;
        d = d.replace(".html", "");
        d = d.split("-");
        a = {ctrl: "listingrouting", value: d[d.length - 1], action: a.a}
    } else a = void 0 != a && void 0 != a.type ? {
        ctrl: "listingrouting",
        type: a.type,
        value: a.value,
        action: a.a
    } : {ctrl: "homerouting"};
    null != a && c.emitAddItem(a)
}]);
myApp.controller("ListingsCtrl", ["$scope", "$location", "$timeout", "$filter", "$window", "$document", "$http", "ListingSrv", "LocationSrv", "EventEmitterListSrv", function (a, c, d, f, n, k, m, l, e, h) {
    function r() {
        a.screenWidth1250 = 1250 <= n.innerWidth;
        a.screenWidth820 = 820 <= n.innerWidth
    }

    function t(c) {
        l.getList({listingType: "autocomplete"}, function (d) {
            a.regions = d;
            c()
        })
    }

    var g = this;
    g.listing = {};
    g.listing_reference = "";
    g.displayOnlyFavourites = !0;
    g.isGridLoaded = !1;
    g.searchCriteriaCount = 0;
    g.previousPageUrl = "";
    g.nextPageUrl =
        "";
    g.previousUrl = "";
    g.useThisUrl = "";
    g.requestedRegions = [];
    g.beds_baths_size = "";
    g.tags = [];
    g.defaultAutocompletePlaceholder = getLanguageText("TXT_REGION_PLACEHOLDER", "e.g. 'Coral Bay' or 'Paphos' or 'Ayia Napa' or property ID");
    g.typeMoreAutocompletePlaceholder = getLanguageText("TXT_TYPE_TO_ADD_MORE", "Type to add more");
    g.autocompletePlaceholder = g.defaultAutocompletePlaceholder;
    a.screenWidth1250 = !0;
    a.screenWidth820 = !0;
    a.typeaheadControl = {};
    a.favouritesButtonLabel = getLanguageText("BTN_FAVOURITES", "Favourites");
    n.addEventListener("resize", r);
    r();
    g.isSoldListings = function () {
        var a = !1, d = c.path().split("/");
        0 < d.length && "properties-sold" === d[1].toLowerCase() && (a = !0);
        return a
    };
    g.getListingIdFromUrl = function () {
        var a = "", d = c.path().split("/");
        2 < d.length && (d = d[2], -1 < d.indexOf("-") && (a = d.split("-")[1]), Number.isInteger(1 * a) || (a = ""));
        return a
    };
    g.fullscreen_click = function (a) {
        fullscreen_click(a)
    };
    g.setFavourite = function (a) {
        setFavourite(a)
    };
    g.swiperNext = function (a) {
        swiperNext(a)
    };
    g.swiperPrevious = function (a) {
        swiperPrevious(a)
    };
    g.handleFavourites = function () {
        g.displayOnlyFavourites ? (g.fetchFavourites(), g.displayOnlyFavourites = !1, g.previousUrl = c.path()) : (g.discardFavourites(), g.displayOnlyFavourites = !0, g.useThisUrl = g.previousUrl);
        a.getNewListings()
    };
    g.fetchFavourites = function () {
        a.search.isfavourites = !0;
        a.search.listingIds = getFavourites();
        0 == a.search.listingIds.length && (a.search.listingIds = [])
    };
    g.discardFavourites = function () {
        a.search.isfavourites = !1;
        a.search.listingIds = [];
        g.selectedRegions = [];
        g.requestedRegions = []
    };
    g.showSlide =
        function (a) {
            showSlide(a)
        };
    g.listingsSort = [];
    g.isSoldListings() ? (g.listingsSort.push({
        name: getLanguageText("BTN_EFFICIENCY_FIRST", "Efficiency first"),
        code: "e"
    }), g.listingsSort.push({
        name: getLanguageText("BTN_RECENTLY_SOLD_FIRST", "Recently sold first"),
        code: "rs"
    })) : (g.listingsSort.push({
        name: getLanguageText("BTN_DEALS_FIRST", "Deals first"),
        code: "d"
    }), g.listingsSort.push({
        name: getLanguageText("BTN_RECENTLY_LISTED_FIRST", "Recently listed first"),
        code: "rl"
    }), g.listingsSort.push({
        name: getLanguageText("BTN_RECENTLY_UPDATED_FIRST",
            "Recently updated first"), code: "ru"
    }), g.listingsSort.push({
        name: getLanguageText("BTN_LOWEST_PRICE_FIRST", "Lowest price first"),
        code: "lp"
    }), g.listingsSort.push({
        name: getLanguageText("BTN_HIGHEST_PRICE_FIRST", "Highest price first"),
        code: "hp"
    }), g.listingsSort.push({
        name: getLanguageText("BTN_BIGGEST_BUILT_SIZE_FIRST", "Biggest built size first"),
        code: "bbs"
    }), g.listingsSort.push({name: getLanguageText("BTN_BIGGEST_PLOT_FIRST", "Biggest plot first"), code: "bp"}));
    a.mapheight = {};
    a.mapHomeImageHeight = "5px";
    a.mapHomeImageWidth =
        "1400px";
    a.tipStripeHeight = {height: "36px"};
    a.resizeImagePlaceholder = function () {
        var c = .61 * (n.innerHeight - 50);
        a.mapheight = {"min-height": c + "px", "max-height": c + "px"}
    };
    a.minPriceLabel = getLanguageText("BTN_MIN_PRICE", "Min Price");
    a.maxPriceLabel = getLanguageText("BTN_MAX_PRICE", "Max Price");
    a.minBedLabel = getLanguageText("BTN_MIN_BEDS", "Min Beds");
    a.maxBedLabel = getLanguageText("BTN_MAX_BEDS", "Max Beds");
    a.propertyTypeLabel = getLanguageText("BTN_TYPE", "Type");
    a.propertyTypeText = getLanguageText("TXT_HOUSE",
        "House");
    a.moreLabel = getLanguageText("BTN_MORE", "More");
    a.listingReference = 0;
    a.currentListingRegion = "";
    a.initialRegion = null;
    a.isCookiesChecked = !1;
    a.searchDefault = {
        count: 0,
        pageno: 1,
        minprice: 0,
        maxprice: 0,
        minbeds: -1,
        maxbeds: -1,
        minbaths: 0,
        maxbaths: 0,
        pthouse: !1,
        ptapartment: !1,
        ptland: !1,
        ptcommercial: !1,
        propertySubtypes: [],
        minArea: 0,
        maxArea: 0,
        minPlotSize: 0,
        maxPlotSize: 0,
        minYearBuilt: 0,
        maxYearBuilt: 0,
        keywords: "",
        region: "",
        district: "",
        searchNearby: !0,
        searchedRegions: [],
        nearbyRegions: [],
        listingIds: [],
        isfavourites: !1,
        listingType: "listings",
        listingsOrder: g.isSoldListings() ? "e" : "ru",
        currency: "EUR",
        searchText: "",
        isSoldListings: g.isSoldListings(),
        listing_id: g.getListingIdFromUrl()
    };
    a.search = _.cloneDeep(a.searchDefault);
    a.resetSearch = function (c) {
        void 0 == c && (c = !1);
        if (c) var d = a.search.searchedRegions;
        a.propertyTypesSelected = [];
        F();
        a.savedSearch = {apply: !1};
        a.search = _.cloneDeep(a.searchDefault);
        c && (a.search.searchedRegions = d)
    };
    g.resetUrl = function () {
        var d = c.path(), e = d.split("/"), b = [];
        d = getLanguageCode();
        d = ("EN" == d ? "" : "/" +
            d) + (a.search.isSoldListings ? "/properties-sold" : "/properties-for-sale");
        for (var f = 0; f < e.length; f++) {
            var g = e[f];
            var h = g.split("-")[0];
            if (-1 === b.indexOf(h)) {
                if ("ids" != h) switch (h) {
                    case "sort":
                        d += "/" + g;
                        break;
                    case "location":
                        d += "/" + g;
                        break;
                    case "nearby":
                        break;
                    case "page":
                        d += "/page-1";
                        break;
                    default:
                        value = h = ""
                }
                "" != h && b.push(h)
            }
        }
        return d
    };
    a.isMenuPricesVisible = !1;
    a.isPropertyTypeSearchVisible = !1;
    a.isPropertySubTypeSearchVisible = !1;
    a.isMoreSearchVisible = !1;
    a.isListingView = !1;
    a.listingImages = [];
    a.listings = {};
    a.regions = [];
    a.currentServerDateTime = "";
    a.savedSearch = {apply: !1};
    g.countSearchCriteria = function () {
        var c = 0;
        (0 < a.search.minprice || 0 < a.search.maxprice) && c++;
        (-1 < a.search.minbeds || -1 < a.search.maxbeds) && c++;
        (a.search.pthouse || a.search.ptapartment || a.search.ptland || a.search.ptcommercial || a.search.pthouse && a.search.ptapartment && a.search.ptland && a.search.ptcommercial) && c++;
        (0 < a.search.minbaths || 0 < a.search.maxbaths) && c++;
        (0 < a.search.minArea || 0 < a.search.maxArea) && c++;
        (0 < a.search.minPlotSize || 0 < a.search.maxPlotSize) &&
        c++;
        (0 < a.search.minYearBuilt || 0 < a.search.maxYearBuilt) && c++;
        0 < a.search.keywords.length && c++;
        return c
    };
    g.setUrl = function () {
        var c = getLanguageCode();
        if ("" != g.useThisUrl) c = g.useThisUrl, g.useThisUrl = ""; else {
            c = "EN" == c ? "" : "/" + c;
            if (a.search.isfavourites) c = c + "/favourites" + ("/ids-" + a.search.listingIds.toString()); else {
                c += a.search.isSoldListings ? "/properties-sold" : "/properties-for-sale";
                if (0 < a.search.listingIds.length) c += "/ids-" + a.search.listingIds.toString(); else if (0 < a.search.searchedRegions.length) {
                    var d =
                        a.search.searchedRegions;
                    c += "/location-";
                    for (var b = 0; b < d.length; b++) {
                        var e = d[b].type, f = d[b].subname.replace(/\s/g, "-"), h = d[b].name.replace(/\s/g, "-");
                        "district" === e.toLowerCase() && (f = h, h = "all");
                        c += h + "_" + f + ","
                    }
                    c = c.substr(0, c.length - 1)
                }
                a.search.searchNearby || (c += "/no-nearby");
                if (0 < a.search.minprice || 0 < a.search.maxprice) c += "/price-" + a.search.minprice, 0 < a.search.maxprice && (c += "-" + a.search.maxprice);
                !(a.search.pthouse || a.search.ptapartment || a.search.ptland || a.search.ptcommercial) || a.search.pthouse && a.search.ptapartment &&
                a.search.ptland && a.search.ptcommercial || (c += "/type-", a.search.pthouse && (c += "house,"), a.search.ptapartment && (c += "apartment,"), a.search.ptland && (c += "land,"), a.search.ptcommercial && (c += "commercial,"), c = c.substr(0, c.length - 1));
                if (0 < a.search.propertySubtypes.length) {
                    c += "/subtype-";
                    for (d = 0; d < a.search.propertySubtypes.length; d++) c += a.search.propertySubtypes[d] + ",";
                    c = c.substr(0, c.length - 1)
                }
                if (-1 < a.search.minbeds || -1 < a.search.maxbeds) c = c + "/beds-" + (-1 == a.search.minbeds ? "n" : a.search.minbeds), -1 < a.search.maxbeds &&
                (c += "-" + a.search.maxbeds);
                if (0 < a.search.minbaths || 0 < a.search.maxbaths) c += "/baths-" + a.search.minbaths, 0 < a.search.maxbaths && (c += "-" + a.search.maxbaths);
                if (0 < a.search.minArea || 0 < a.search.maxArea) c += "/size-" + a.search.minArea, 0 < a.search.maxArea && (c += "-" + a.search.maxArea);
                if (0 < a.search.minPlotSize || 0 < a.search.maxPlotSize) c += "/plot-" + a.search.minPlotSize, 0 < a.search.maxPlotSize && (c += "-" + a.search.maxPlotSize);
                if (0 < a.search.minYearBuilt || 0 < a.search.maxYearBuilt) c += "/age-" + a.search.minYearBuilt, 0 < a.search.maxYearBuilt &&
                (c += "-" + a.search.maxYearBuilt);
                "" != a.search.keywords && (c += "/keywords-" + a.search.keywords);
                "" != a.search.searchText && (c += "/text-" + a.search.searchText)
            }
            "" != a.search.currency && (c += "/cur-" + a.search.currency);
            "" != a.search.listingsOrder && (c += "/sort-" + a.search.listingsOrder);
            c += "/page-1"
        }
        return c
    };
    var D = function () {
        var e = c.path().split("/"), f = [], b = !0;
        if (getDevice().isMobile && a.savedSearch.apply) g.getFilterDataFromSavedSearch(); else {
            a.savedSearch.apply = !0;
            var h = getCookie("currency");
            a.search.currency = "" == h ?
                "EUR" : h;
            g.tags = [];
            for (h = 0; h < e.length; h++) {
                var k = e[h], l = k.split("-"), n = "", m = "";
                if (Array.isArray(l) && (n = l[0], -1 === f.indexOf(n))) {
                    m = k.substring(n.length + 1, k.length);
                    "favourites" === n && (a.search.isfavourites = !0, g.displayOnlyFavourites = !1);
                    if ("ids" == n) {
                        var r = [];
                        l = {};
                        m = m.split(",");
                        for (k = 0; k < m.length; k++) l = m[k], l = {
                            _lowername: l,
                            label: l,
                            name: l,
                            subname: "",
                            type: "listing"
                        }, r.push(l);
                        a.search.listingIds = m;
                        d(function () {
                            g.selectedRegions = r;
                            g.requestedRegions = r
                        }, 10);
                        a.savedSearch.searchedIds = m
                    } else switch (n) {
                        case "sort":
                            a.search.listingsOrder =
                                m;
                            break;
                        case "page":
                            a.search.pageno = isInteger(m) ? 1 * m : 1;
                            break;
                        case "location":
                            var t = [];
                            k = {};
                            l = m.split(",");
                            for (m = 0; m < l.length; m++) {
                                var v = l[m].split("_");
                                2 == v.length && (k = v[1].replace(/-/g, " "), v = v[0].replace(/-/g, " "), k = {
                                    _lowername: "",
                                    label: "all" === v ? k : v,
                                    name: "all" === v ? k : v,
                                    subname: "all" === v ? "" : k,
                                    type: "all" === v ? "district" : "area"
                                }, t.push(k), g.tags.push(k))
                            }
                            a.search.searchedRegions = t;
                            d(function () {
                                g.selectedRegions = t;
                                g.requestedRegions = t
                            }, 10);
                            a.savedSearch.searchedRegions = t;
                            break;
                        case "no":
                            "nearby" === m.toLowerCase() &&
                            (a.search.searchNearby = !1, a.savedSearch.searchNearby = !1);
                            break;
                        case "text":
                            a.search.searchText = m;
                            a.savedSearch.searchText = m;
                            g.tags.push({label: m});
                            break;
                        case "price":
                            3 >= l.length && (m = l[1], l = 3 == l.length ? l[2] : 0, isInteger(m) && isInteger(l) ? (m *= 1, l *= 1, m = g.getNearestLowerPrice(m), l = g.getNearestHigherPrice(l), a.search.minprice = m, g.minPriceChanged(), a.search.maxprice = l, a.savedSearch.minprice = m, a.savedSearch.maxprice = l) : b = !1);
                            break;
                        case "type":
                            l = m.split(",");
                            if (0 < l.length) {
                                a.search.pthouse = !1;
                                a.search.ptapartment =
                                    !1;
                                a.search.ptland = !1;
                                a.search.ptcommercial = !1;
                                for (m = 0; m < l.length; m++) k = l[m], "house" === k.toLowerCase() ? (a.search.pthouse = !0, g.setPropertyTypes("house", !1)) : "apartment" === k.toLowerCase() ? (a.search.ptapartment = !0, g.setPropertyTypes("apartment", !1)) : "land" === k.toLowerCase() ? (a.search.ptland = !0, g.setPropertyTypes("land", !1)) : "commercial" === k.toLowerCase() ? (a.search.ptcommercial = !0, g.setPropertyTypes("commercial", !1)) : b = !1;
                                a.savedSearch.pthouse = a.search.pthouse;
                                a.savedSearch.ptapartment = a.search.ptapartment;
                                a.savedSearch.ptland = a.search.ptland;
                                a.savedSearch.ptcommercial = a.search.ptcommercial
                            }
                            break;
                        case "subtype":
                            l = m.split(",");
                            a.search.propertySubtypes = l;
                            a.$broadcast("subtypesChanged");
                            a.savedSearch.propertySubtypes = l;
                            break;
                        case "beds":
                            3 >= l.length && (m = l[1], l = 3 == l.length ? l[2] : -1, !isInteger(m) && "n" != m || !isInteger(l) ? b = !1 : (m *= 1, l *= 1, a.search.minbeds = m, g.minBedsChanged(), a.search.maxbeds = l, a.savedSearch.minbeds = m, a.savedSearch.maxbeds = l));
                            break;
                        case "baths":
                            3 >= l.length && (m = l[1], l = 3 == l.length ? l[2] : 0, isInteger(m) &&
                            isInteger(l) ? (m *= 1, l *= 1, a.search.minbaths = m, a.$broadcast("minBathsChanged"), a.search.maxbaths = l, a.savedSearch.minbaths = m, a.savedSearch.maxbaths = l) : b = !1);
                            break;
                        case "size":
                            3 >= l.length && (m = l[1], l = 3 == l.length ? l[2] : 0, isInteger(m) && isInteger(l) ? (m *= 1, l *= 1, a.search.minArea = m, a.$broadcast("minSizeChanged"), a.search.maxArea = l, a.savedSearch.minArea = m, a.savedSearch.maxArea = l) : b = !1);
                            break;
                        case "plot":
                            3 >= l.length && (m = l[1], l = 3 == l.length ? l[2] : 0, isInteger(m) && isInteger(l) ? (m *= 1, l *= 1, a.search.minPlotSize = m, a.$broadcast("minPlotChanged"),
                                a.search.maxPlotSize = l, a.savedSearch.minPlotSize = m, a.savedSearch.maxPlotSize = l) : b = !1);
                            break;
                        case "age":
                            3 >= l.length && (m = l[1], l = 3 == l.length ? l[2] : 0, isInteger(m) && isInteger(l) ? (m *= 1, l *= 1, a.search.minYearBuilt = m, a.$broadcast("minYearChanged"), a.search.maxYearBuilt = l, a.savedSearch.minYearBuilt = m, a.savedSearch.maxYearBuilt = l) : b = !1);
                            break;
                        case "keywords":
                            l = m;
                            0 < l.length && (a.search.keywords = l, a.savedSearch.keywords = l);
                            break;
                        case "nearby":
                            break;
                        default:
                            m = n = ""
                    }
                    "" != n && f.push(n)
                }
            }
            0 < g.tags.length && (g.autocompletePlaceholder =
                g.typeMoreAutocompletePlaceholder)
        }
        return b
    };
    g.getSearchCriteria = function (c) {
        a.resetSearch();
        g.displayOnlyFavourites = !0;
        0 == a.regions.length ? t(function () {
            c(D())
        }) : c(D())
    };
    g.getFilterDataFromSavedSearch = function () {
        if (a.savedSearch.apply) for (key in a.savedSearch) key in a.search && (a.search[key] = a.savedSearch[key], "searchedregions" === key.toLowerCase() && d(function () {
            g.selectedRegions = a.savedSearch[key];
            g.requestedRegions = a.savedSearch[key]
        }, 10))
    };
    g.loadAutocomlpete = function (a) {
        return m.get("api/listings/?listingType\x3dautocomplete",
            {cache: !0}).then(function (c) {
            c = c.data;
            for (var b = {}, d = [], e = 0; e < c.length; e++) {
                var f = c[e];
                void 0 == b[f.name] && f.name.toLowerCase().startsWith(a.toLowerCase()) && (b[f.name] = "", d.push(f))
            }
            return d
        })
    };
    g.newTag = function (c) {
        var d = getDevice();
        void 0 == c.type && (a.search.searchText = c.label);
        0 < g.tags.length && (g.autocompletePlaceholder = g.typeMoreAutocompletePlaceholder);
        d.isMobile || g.reloadListingsWithRegionsSelected(g.tags)
    };
    g.removeTag = function (c) {
        c = getDevice();
        for (var d = !1, b = g.tags.length - 1; 0 <= b; b--) if (void 0 ==
            g.tags[b].type) {
            d = !0;
            a.search.searchText = g.tags[b].label;
            break
        }
        d || (a.search.searchText = "");
        0 == g.tags.length && (g.autocompletePlaceholder = g.defaultAutocompletePlaceholder);
        c.isMobile || g.reloadListingsWithRegionsSelected(g.tags)
    };
    a.findProperties = function () {
        a.savedSearch.apply = !1;
        var c = a.search.searchedRegions, e = !0, b = a.typeaheadControl.getItemSearch();
        if (void 0 != b && "" != b) {
            var h = {name: b};
            h = f("wordsStartsWith")(a.regions, h);
            0 < h.length ? (c.push(h[0]), a.search.searchedRegions = c, d(function () {
                g.requestedRegions =
                    c
            }, 10)) : (e = !1, displayLocationModalAlert(b))
        }
        a.typeaheadControl.resetItemSearch();
        e && a.getNewListings()
    };
    a.getNewListings = function (a) {
        a = a || !1;
        d(function () {
            hideFilters();
            var d = a ? g.resetUrl() : g.setUrl();
            c.hash("");
            c.path(d)
        }, 10)
    };
    a.$on("$locationChangeStart", function (d, e, b) {
        a.startPath = c.path();
        a.startNewUrl = e;
        a.startOldUrl = b
    });
    a.$on("$locationChangeSuccess", function (d, e, b) {
        a.successPath = c.path();
        a.successNewUrl = e;
        a.successOldUrl = b;
        "edit-filter" == c.hash().toLowerCase() ? showFilters() : hideFilters()
    });
    a.getListings = function (c, e) {
        getDevice();
        g.getSearchCriteria(function (b) {
            if (b) return addClass(document.getElementById("search-results-container"), "fade-effect"), a.$broadcast("setMoreLabel"), g_isFilterVisible = !1, void 0 == c && (c = !0), g.searchCriteriaCount = g.countSearchCriteria(), a.search.language_code = getLanguageCode(), a.search.listing_id = g.getListingIdFromUrl(), l.getList(a.search, function (a) {
            }).$promise.then(function (b) {
                if (void 0 != b[1]) {
                    var c = [JSON.parse(b[1])];
                    a.search.searchedRegions = c;
                    g.selectedRegions =
                        c;
                    g.requestedRegions = c
                }
                d(function () {
                    createSwipersDom(b[0]);
                    displayFavouriteIcon();
                    removeClass(document.getElementById("search-results-container"), "fade-effect")
                }, 10);
                g.isGridLoaded = !0;
                return "listings loaded"
            });
            a.getNewListings(!0)
        })
    };
    a.propertyTypesSelected = [];
    a.districtLocations = {};
    a.areaLocations = {};
    a.locationsArea = {};
    a.locations = {};
    h.onAddItem("ListingsCtrl", function (c) {
        if (void 0 != c && void 0 != c.ctrl && "listingrouting" == c.ctrl) {
            if (void 0 == c.type || "id" == c.type) c.type = "listing"
        } else void 0 != c && void 0 !=
        c.ctrl && "homerouting" == c.ctrl && a.getListings(!0)
    });
    h.onRemoveItem("ListingsCtrl", function (a) {
    });
    a.$on("$destroy", function () {
        h.clear("ListingsCtrl")
    });
    g.listingOrderChanged = function () {
        a.getNewListings()
    };
    a.listingClicked = function (d, e, b) {
        void 0 == b && (b = !0);
        g.listing_reference !== d && (a.setSelectedListingIndex(e), b && c.path("/listing/" + d).search({a: "l"}))
    };
    g.getPagingUrl = function (a) {
        var d = c.path(), b = d.split("/");
        2 < b.length && (b = b[b.length - 1].split("-"), 2 === b.length && (b = b[1], isInteger(b) && (a = "page-" + (1 * b +
            1 * a), b = d.lastIndexOf("page-" + b), d = d.substr(0, b) + a)));
        return d
    };
    g.isEvenNumber = function (a) {
        return 0 == a % 2
    };
    g.isOddNumber = function (a) {
        return 1 == Math.abs(a % 2)
    };
    g.selectedRegions = [];
    g.nearbyRegions = [];
    0 == a.regions.length && t(function () {
    });
    var z = getLanguageText("TXT_INCLUDE_NEARBY_LOCATIONS", "Include nearby locations");
    g.recreateSelect = !0;
    g.nearbyLabel = z;
    g.locations = [];
    g.applySelectedRegions = function () {
        a.search.searchNearby || (a.search.searchNearby = !0, a.getNewListings())
    };
    g.searchNearbyChanged = function () {
        a.getNewListings()
    };
    g.setNearbyRegions = function (c) {
        g.isNearbyOptionSelected(c) ? g.nearbyRegions = _.without(g.nearbyRegions, c) : g.nearbyRegions.push(c);
        0 == g.nearbyRegions.length && (g.nearbyRegions = g.locations);
        g.nearbyLabel = 0 == g.nearbyRegions.length ? z : z + " (" + g.nearbyRegions.length + ")";
        a.getNewListings()
    };
    g.isNearbyOptionSelected = function (a) {
        return -1 < g.nearbyRegions.indexOf(a)
    };
    a.$on("regions-selected", function (a, c) {
        g.reloadListingsWithRegionsSelected(c.regions)
    });
    g.reloadListingsWithRegionsSelected = function (c) {
        var d = getDevice();
        g.selectedRegions = c;
        a.search.searchedRegions = [];
        a.search.listingIds = [];
        for (var b = [], e = [], f = 0; f < c.length; f++) "listing" === c[f].type ? e.push(c[f].name) : void 0 != c[f].type && b.push(c[f]);
        0 < e.length ? a.search.listingIds = e : a.search.searchedRegions = b;
        d.isMobile || a.getNewListings()
    };
    g.setPropertyTypeFromUrl = function (c) {
        switch (c) {
            case "house":
                a.search.pthouse = !0;
                a.search.ptapartment = !1;
                a.search.ptland = !1;
                a.search.ptcommercial = !1;
                g.setPropertyTypes("house", !1);
                break;
            case "apartment":
                a.search.pthouse = !1, a.search.ptapartment =
                    !0, a.search.ptland = !1, a.search.ptcommercial = !1, g.setPropertyTypes("apartment", !1)
        }
    };
    g.propertyTypesSelected = [];
    g.propertyTypesAvailable = [{name: "house", label: getLanguageText("TXT_HOUSES", "Houses")}, {
        name: "apartment",
        label: getLanguageText("TXT_APARTMENTS", "Apartments")
    }, {name: "land", label: getLanguageText("TXT_LAND", "Land")}, {
        name: "commercial",
        label: getLanguageText("TXT_COMMERCIAL", "Commercial")
    }];
    var A = getLanguageText("BTN_TYPE", "Type");
    g.isTypeOptionSelected = function (c) {
        return -1 < a.propertyTypesSelected.indexOf(c)
    };
    g.setPropertyTypes = function (c, d) {
        void 0 == d && (d = !0);
        g.isTypeOptionSelected(c) ? a.propertyTypesSelected = _.without(a.propertyTypesSelected, c) : a.propertyTypesSelected.push(c);
        0 == a.propertyTypesSelected.length ? (a.search.pthouse = !1, a.search.ptapartment = !1, a.search.ptland = !1, a.search.ptcommercial = !1) : (a.search.pthouse = -1 < a.propertyTypesSelected.indexOf("house"), a.search.ptapartment = -1 < a.propertyTypesSelected.indexOf("apartment"), a.search.ptland = -1 < a.propertyTypesSelected.indexOf("land"), a.search.ptcommercial =
            -1 < a.propertyTypesSelected.indexOf("commercial"));
        a.search.propertySubtypes = [];
        F();
        d && a.getNewListings();
        1 === a.propertyTypesSelected.length ? (c = {
            ctrl: "propertytype",
            ptType: a.propertyTypesSelected[0]
        }, g.propertyTypesSelected.push(c), h.emitAddItem(c)) : (c = g.propertyTypesSelected.splice(0, 1), h.emitRemoveItem(c[0]))
    };
    var F = function () {
        var c = -1 < a.propertyTypesSelected.indexOf("house"), d = -1 < a.propertyTypesSelected.indexOf("apartment"),
            b = -1 < a.propertyTypesSelected.indexOf("land"), e = -1 < a.propertyTypesSelected.indexOf("commercial"),
            f = 0, g = "";
        c || d || b || e ? (c && (f++, g = getLanguageText("TXT_HOUSE", "House")), d && (f++, g = getLanguageText("TXT_APARTMENT", "Apartment")), b && (f++, g = getLanguageText("TXT_LAND", "Land")), e && (f++, g = getLanguageText("TXT_COMMERCIAL", "Commercial")), a.propertyTypeLabel = 4 > f ? 1 == f ? A + " (" + g + ")" : A + " (" + f + ")" : A) : (a.search.pthouse = !1, a.search.ptapartment = !1, a.search.ptland = !1, a.search.ptcommercial = !1, a.propertyTypeLabel = A);
        a.propertyTypeText = g
    };
    g.currenciesAvailable = [{value: "EUR", text: "EUR(\u20ac)", symbol: "\u20ac", round: 1},
        {value: "GBP", text: "GBP(\u00a3)", symbol: "\u00a3", round: 25E3}, {
            value: "USD",
            text: "USD($)",
            symbol: "$",
            round: 25E3
        }, {
            value: "RUB",
            text: "RUB(\u200e\u0440\u0443\u0431)",
            symbol: "\u0440\u0443\u0431 ",
            round: 1E6
        }, {value: "CNY", text: "CNY(\u00a5)", symbol: "\u00a5", round: 5E4}, {
            value: "AED",
            text: "AED(\u062f.\u0625)",
            symbol: "AED ",
            round: 5E4
        }];
    g.currencyRate = 1;
    g.minPriceSelected = 0;
    g.maxPriceSelected = 0;
    g.minPriceCurrencyRate = 1;
    g.maxPriceCurrencyRate = 1;
    var w = function () {
        var a = getCookie("currency");
        a = search("value", a, g.currenciesAvailable);
        return null == a ? "\u20ac" : a.symbol
    };
    g.currencySymbol = w();
    var x = function () {
        var a = getCookie("currency");
        a = search("value", a, g.currenciesAvailable);
        return null == a ? "1" : a.round
    };
    g.currencyChangedOnResponse = function (c) {
        getCurrencyRate(getCookie("currency"), function (d) {
            var b = d.rate;
            d = g.minPriceSelected / g.minPriceCurrencyRate * b;
            var e = g.maxPriceSelected / g.maxPriceCurrencyRate * b, f = b < g.currencyRate;
            g.currencyRate = b;
            g.minPrices = g.listPrices();
            g.maxPrices = g.listPrices();
            b = x();
            d = Math.round(d / b) * b;
            d = f ? g.getNearestHigherPrice(d) :
                g.getNearestLowerPrice(d);
            a.search.minprice = d;
            e = Math.round(e / b) * b;
            e = f ? g.getNearestLowerPrice(e) : g.getNearestHigherPrice(e);
            a.search.maxprice = e;
            g.minPriceChanged();
            c()
        })
    };
    g.currencyChanged = function () {
        setCookie("currency", a.search.currency, gl_cookies_duration);
        g.currencySymbol = w()
    };
    g.dCurrencyChanged = function () {
        g.currencyChanged();
        g.currencyChangedOnResponse(function () {
            a.getNewListings()
        })
    };
    g.mCurrencyChanged = function () {
        g.currencyChanged();
        g.currencyChangedOnResponse(function () {
        })
    };
    g.showMinPrice = !0;
    g.maxPriceIndex = null;
    g.minPriceIndex = null;
    g.minPrices = [];
    g.maxPrices = [];
    g.getNearestLowerPrice = function (a) {
        for (var c = g.minPrices[0], b = 0; b < g.minPrices.length; b++) g.minPrices[b] <= a && (c = g.minPrices[b]);
        return c
    };
    g.getNearestHigherPrice = function (a) {
        for (var c = g.minPrices[0], b = g.minPrices.length - 1; 0 <= b; b--) g.minPrices[b] >= a && (c = g.minPrices[b]);
        return c
    };
    g.listPrices = function (a) {
        var c = [0], b = x();
        if (void 0 == a || "" == a) {
            var d = 5E4;
            125E3 != d && 175E3 != d && (a = Math.round(d * g.currencyRate / b) * b, -1 === c.indexOf(a) && c.push(a));
            for (; 2E7 > d;) {
                125E3 == d ? d = 12E4 : 175E3 == d && (d = 17E4);
                var e = 1E7 <= d ? 5E6 : 5E6 <= d ? 25E5 : 3E6 <= d ? 1E6 : 2E6 <= d ? 5E5 : 1E6 <= d ? 25E4 : 7E5 <= d ? 1E5 : 5E5 <= d ? 5E4 : 3E5 <= d ? 25E3 : 1E4;
                12E4 == d ? (a = Math.round(125E3 * g.currencyRate / b) * b, -1 === c.indexOf(a) && c.push(a)) : 17E4 == d && (a = Math.round(175E3 * g.currencyRate / b) * b, -1 === c.indexOf(a) && c.push(a));
                d += e;
                a = Math.round(d * g.currencyRate / b) * b;
                -1 === c.indexOf(a) && c.push(a)
            }
        } else if (c = g.minPrices.slice(0), a = Math.round(a * g.currencyRate / b) * b, b = c.indexOf(a), -1 < b) for (--b; 0 < b; b--) c.splice(b, 1);
        return c
    };
    g.setMinPrice = function (c, d) {
        a.search.minprice = c;
        g.minPriceIndex = d;
        g.maxPrices = g.listPrices(c);
        g.showMinPrice = !1;
        E();
        a.getNewListings()
    };
    g.minPriceChanged = function () {
        g.minPriceSelected = a.search.minprice;
        g.minPriceCurrencyRate = g.currencyRate;
        var c = a.search.minprice;
        void 0 != c && "" != c ? (c *= 1, 999999999 < c && (c = 999999999, a.search.minprice = c)) : a.search.minprice = 0;
        var d = g.minPrices.indexOf(c);
        g.minPriceIndex = d;
        g.maxPrices = g.listPrices(c / g.currencyRate);
        E()
    };
    g.dMinPriceChanged = function () {
        g.minPriceChanged();
        a.getNewListings()
    };
    g.mMinPriceChanged = function () {
        g.minPriceChanged()
    };
    g.setMaxPrice = function (c, d) {
        a.search.maxprice = c;
        g.maxPriceIndex = d;
        g.showMinPrice = !0;
        a.isMenuPricesVisible = !1;
        a.getNewListings()
    };
    g.maxPriceChanged = function () {
        g.maxPriceSelected = a.search.maxprice;
        g.maxPriceCurrencyRate = g.currencyRate
    };
    g.dMaxPriceChanged = function () {
        g.maxPriceChanged();
        a.getNewListings()
    };
    g.mMaxPriceChanged = function () {
        g.maxPriceChanged()
    };
    var E = function () {
        var c = a.search.maxprice, d = a.search.minprice;
        void 0 != c && "" != c ? (c *= 1, 999999999 < c ?
            (c = 999999999, a.search.maxprice = c) : void 0 != d && "" != d && 0 < c && 1 * d > c && (c = 0, a.search.maxprice = c, g.maxPriceChanged())) : a.search.maxprice = 0;
        g.maxPriceIndex = g.maxPrices.indexOf(c)
    };
    g.nearestKorM = function (a) {
        var c = a;
        0 < a && 1E6 > a ? (a = _.round(a / 1E3, 1), c = a + "K") : 1E6 <= a && (a = _.round(a / 1E6, 2), c = a + "M");
        return c
    };
    g.currencyChangedOnResponse(function () {
        a.search.minprice = g.minPrices[0];
        a.search.maxprice = g.maxPrices[0]
    });
    g.minBedsAvailable = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    g.maxBedsAvailable = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    g.maxBedsIndex =
        null;
    a.search.minbeds = g.minBedsAvailable[0];
    a.search.maxbeds = g.maxBedsAvailable[0];
    g.minBedsChanged = function () {
        var c = a.search.minbeds;
        void 0 != c && "" !== c && -1 < c || (a.search.minbeds = -1);
        c = a.search.minbeds;
        c = void 0 == c || "" === c || -1 == c ? 0 : c;
        var d = [-1];
        for (d.push(c); 10 > c;) c++, d.push(c);
        g.maxBedsAvailable = d;
        c = a.search.maxbeds;
        d = a.search.minbeds;
        void 0 != c && "" !== c && -1 < c ? (c *= 1, void 0 != d && "" !== d && -1 < d && -1 < c && 1 * d > c && (c = -1, a.search.maxbeds = c, g.maxBedsChanged())) : a.search.maxbeds = -1;
        g.maxBedsIndex = g.maxBedsAvailable.indexOf(c)
    };
    g.dMinBedsChanged = function () {
        g.minBedsChanged();
        a.getNewListings()
    };
    g.mMinBedsChanged = function () {
        g.minBedsChanged()
    };
    g.maxBedsChanged = function () {
    };
    g.dMaxBedsChanged = function () {
        g.maxBedsChanged();
        a.getNewListings()
    };
    g.mMaxBedsChanged = function () {
        g.maxBedsChanged()
    };
    g.goToPage = function (a) {
        window.scrollTo(0, 0)
    };
    g.goToFirstPage = function () {
    };
    a.changePage = function (a) {
        g.goToPage()
    }
}]);
myApp.controller("MoreSearchCtrl", ["$scope", "EventEmitterListSrv", function (a, c) {
    var d = this, f = getLanguageText("BTN_MORE", "More");
    a.$on("setMoreLabel", function (a) {
        d.setMoreLabel()
    });
    a.$on("minBathsChanged", function (a) {
        d.minBathsChanged()
    });
    a.$on("minSizeChanged", function (a) {
        d.minAreaChanged()
    });
    a.$on("minPlotChanged", function (a) {
        d.minPlotAreaChanged()
    });
    a.$on("minYearChanged", function (a) {
        d.minYearChanged()
    });
    a.$on("subtypesChanged", function (c) {
        d.propertySubTypesSelected = a.search.propertySubtypes;
        k(a.propertyTypeText)
    });
    d.resetSearch = function () {
        a.resetSearch();
        d.applyMoreSearch(!0)
    };
    d.applyMoreSearch = function (c) {
        c = c || !1;
        d.setMoreLabel();
        a.isMoreSearchVisible = !1;
        a.$parent.$parent.hideMenu();
        a.getNewListings(c)
    };
    d.setMoreLabel = function () {
        var c = 1 * a.search.minbaths, d = 1 * a.search.maxbaths, l = 1 * a.search.minArea, k = 1 * a.search.maxArea,
            g = 1 * a.search.minPlotSize, m = 1 * a.search.maxPlotSize, n = 1 * a.search.minYearBuilt,
            A = 1 * a.search.maxYearBuilt, F = a.search.keywords, w = 0;
        0 < a.search.propertySubtypes.length && w++;
        (0 < c || 0 < d) && w++;
        (0 < l || 0 < k) &&
        w++;
        (0 < g || 0 < m) && w++;
        (0 < n || 0 < A) && w++;
        "" != F && w++;
        a.moreLabel = 0 < w ? f + "(" + w + ")" : f;
        a.$parent.$parent.value = a.moreLabel
    };
    d.isSubtypeSearchVisible = !1;
    var n = getLanguageText("TXT_SUBTYPES", "subtypes");
    d.subtypeLabel = n;
    d.propertySubTypes = [];
    d.propertySubTypesSelected = [];
    d.propertySubTypeSelected = "";
    d.isSubtypeOptionSelected = function (a) {
        return -1 < d.propertySubTypesSelected.indexOf(a)
    };
    d.mPropertySubtypeChanged = function () {
        d.propertySubTypesSelected = [];
        null != d.propertySubTypeSelected && "" != d.propertySubTypeSelected &&
        d.propertySubTypesSelected.push(d.propertySubTypeSelected);
        a.search.propertySubtypes = d.propertySubTypesSelected
    };
    d.setPropertySubTypes = function (c) {
        d.isSubtypeOptionSelected(c) ? d.propertySubTypesSelected = _.without(d.propertySubTypesSelected, c) : d.propertySubTypesSelected.push(c);
        a.search.propertySubtypes = d.propertySubTypesSelected;
        k(a.propertyTypeText)
    };
    var k = function (a) {
        var c = getLanguageText("TXT_" + a.toUpperCase(), "");
        "" == c && (c = a);
        d.subtypeLabel = d.propertySubTypes.length === d.propertySubTypesSelected.length ||
        0 === d.propertySubTypesSelected.length ? getLanguageText("TXT_ALL", "All") + " " + c + " " + n : c + " " + n + " (" + d.propertySubTypesSelected.length + ")"
    };
    c.onAddItem("MoreDropDownCtrl", function (c) {
        if (void 0 != c && void 0 != c.ctrl && "propertytype" == c.ctrl) {
            c = c.ptType;
            var e = [];
            "" != c && (e = _.filter(a.propertyTypes, {name: c}));
            c = e;
            e = [];
            var f = "";
            0 < c.length && (e = c[0].subtypes, f = c[0].label);
            d.propertySubTypes = e;
            k(f)
        }
    });
    c.onRemoveItem("MoreDropDownCtrl", function (a) {
        void 0 != a && void 0 != a.ctrl && "propertytype" == a.ctrl && (d.propertySubTypes =
            [], d.propertySubTypesSelected = [])
    });
    a.$on("$destroy", function () {
        c.clear("MoreDropDownCtrl")
    });
    d.minBathsAvailable = [0, 1, 2, 3, 4, 5, 6];
    d.maxBathsAvailable = [0, 1, 2, 3, 4, 5, 6];
    d.maxBathsIndex = null;
    a.search.minbaths = d.minBathsAvailable[0];
    a.search.maxbaths = d.maxBathsAvailable[0];
    d.minBathsChanged = function () {
        var c = a.search.minbaths;
        void 0 != c && "" !== c && 0 < c || (a.search.minbaths = 0);
        c = a.search.minbaths;
        c = void 0 == c || "" === c || 0 == c ? 0 : c;
        var f = [0];
        for (f.push(c); 6 > c;) c++, f.push(c);
        d.maxBathsAvailable = f;
        c = a.search.maxbaths;
        f = a.search.minbaths;
        void 0 != c && "" != c && 0 < c ? (c *= 1, void 0 != f && "" !== f && 0 < f && 0 < c && 1 * f > c && (c = 0, a.search.maxbaths = c, d.maxBathsChanged())) : a.search.maxbaths = 0;
        d.maxBathsIndex = d.maxBathsAvailable.indexOf(c)
    };
    d.dMinBathsChanged = function () {
        d.minBathsChanged()
    };
    d.mMinBathsChanged = function () {
        d.minBathsChanged()
    };
    d.maxBathsChanged = function () {
    };
    d.dMaxBathsChanged = function () {
        d.maxBathsChanged()
    };
    d.mMaxBathsChanged = function () {
        d.maxBathsChanged()
    };
    d.minAreaAvailable = [0, 30, 60, 80, 120, 150, 180, 200, 250, 300, 400, 500, 1E3];
    d.maxAreaAvailable = [0, 30, 60, 80, 120, 150, 180, 200, 250, 300, 400, 500, 1E3];
    d.maxAreaIndex = null;
    a.search.minArea = d.minAreaAvailable[0];
    a.search.maxArea = d.maxAreaAvailable[0];
    d.minAreaChanged = function () {
        var c = a.search.minArea;
        void 0 != c && "" !== c && 0 < c || (a.search.minArea = 0);
        c = a.search.minArea;
        c = void 0 == c || "" === c || 0 == c ? 30 : c;
        var f = [0];
        for (f.push(c); 1E3 > c;) {
            var l = 500 <= c ? 500 : 300 <= c ? 100 : 200 <= c ? 50 : 180 <= c ? 20 : 120 <= c ? 30 : 80 <= c ? 40 : 60 <= c ? 20 : 30;
            c += l;
            f.push(c)
        }
        d.maxAreaAvailable = f;
        c = a.search.maxArea;
        f = a.search.minArea;
        void 0 !=
        c && "" !== c && 0 < c ? (c *= 1, void 0 != f && "" !== f && 0 < f && 0 < c && 1 * f > c && (c = 0, a.search.maxArea = c, d.maxAreaChanged())) : a.search.maxArea = 0;
        d.maxAreaIndex = d.maxAreaAvailable.indexOf(c)
    };
    d.dMinAreaChanged = function () {
        d.minAreaChanged()
    };
    d.mMinAreaChanged = function () {
        d.minAreaChanged()
    };
    d.maxAreaChanged = function () {
    };
    d.dMaxAreaChanged = function () {
        d.maxAreaChanged()
    };
    d.mMaxAreaChanged = function () {
        d.maxAreaChanged()
    };
    d.minPlotAreaAvailable = [0, 50, 100, 150, 200, 300, 400, 500, 800, 1E3, 2E3, 3E3, 4E3, 5E3, 1E4];
    d.maxPlotAreaAvailable = [0,
        50, 100, 150, 200, 300, 400, 500, 800, 1E3, 2E3, 3E3, 4E3, 5E3, 1E4];
    d.maxPlotAreaIndex = null;
    a.search.minPlotSize = d.minPlotAreaAvailable[0];
    a.search.maxPlotSize = d.maxPlotAreaAvailable[0];
    d.minPlotAreaChanged = function () {
        var c = a.search.minPlotSize;
        void 0 != c && "" !== c && 0 < c || (a.search.minPlotSize = 0);
        c = a.search.minPlotSize;
        c = void 0 == c || "" === c || 0 == c ? 50 : c;
        var f = [0];
        for (f.push(c); 1E4 > c;) {
            var l = 5E3 <= c ? 5E3 : 1E3 <= c ? 1E3 : 800 <= c ? 200 : 200 <= c ? 100 : 50;
            c += l;
            f.push(c)
        }
        d.maxPlotAreaAvailable = f;
        c = a.search.maxPlotSize;
        f = a.search.minPlotSize;
        void 0 != c && "" !== c && 0 < c ? (c *= 1, void 0 != f && "" !== f && 0 < f && 0 < c && 1 * f > c && (c = 0, a.search.maxPlotSize = c, d.maxPlotAreaChanged())) : a.search.maxPlotSize = 0;
        d.maxPlotAreaIndex = d.maxPlotAreaAvailable.indexOf(c)
    };
    d.dMinPlotAreaChanged = function () {
        d.minPlotAreaChanged()
    };
    d.mMinPlotAreaChanged = function () {
        d.minPlotAreaChanged()
    };
    d.maxPlotAreaChanged = function () {
    };
    d.dMaxPlotAreaChanged = function () {
        d.maxPlotAreaChanged()
    };
    d.mMaxPlotAreaChanged = function () {
        d.maxPlotAreaChanged()
    };
    var m = (new Date).getFullYear(), l = function (a) {
        var c =
            [0];
        for (a = void 0 == a || "" === a || 0 == a ? 1980 : a; a <= m; a++) c.push(a);
        return c
    };
    d.minYearsAvailable = l(1980);
    d.maxYearsAvailable = l(1980);
    d.maxYearIndex = null;
    a.search.minYearBuilt = d.minYearsAvailable[0];
    a.search.maxYearBuilt = d.maxYearsAvailable[0];
    d.minYearChanged = function () {
        var c = a.search.minYearBuilt;
        void 0 != c && "" !== c && 0 < c || (a.search.minYearBuilt = 0);
        d.maxYearsAvailable = l(a.search.minYearBuilt);
        c = a.search.maxYearBuilt;
        var f = a.search.minYearBuilt;
        void 0 != c && "" !== c && 0 < c ? (c *= 1, void 0 != f && "" !== f && 0 < f && 0 < c && 1 * f >
        c && (c = 0, a.search.maxYearBuilt = c, d.maxYearChanged())) : a.search.maxYearBuilt = 0;
        d.maxYearIndex = d.maxYearsAvailable.indexOf(c)
    };
    d.dMinYearChanged = function () {
        d.minYearChanged()
    };
    d.mMinYearChanged = function () {
        d.minYearChanged()
    };
    d.maxYearChanged = function () {
    };
    d.dMaxYearChanged = function () {
        d.maxYearChanged()
    };
    d.mMaxYearChanged = function () {
        d.maxYearChanged()
    }
}]);
myApp.controller("UtilsCtrl", ["$scope", function (a) {
    a.getLanguageText = function (a, d) {
        return getLanguageText(a, d)
    };
    a.propertyTypes = [{
        name: "house",
        label: "House",
        subtypes: [{
            name: "detachedHouse",
            label: getLanguageText("TXT_DETACHED_HOUSE", "Detached house")
        }, {
            name: "semiDetachedHouse",
            label: getLanguageText("TXT_SEMI_DETACHED_HOUSE", "Semi detached house")
        }, {name: "bungalow", label: getLanguageText("TXT_BUNGALOW", "Bungalow")}, {
            name: "semiDetachedBungalow",
            label: getLanguageText("TXT_SEMI_DETACHED_BUNGALOW", "Semi detached bungalow")
        },
            {name: "townHouse", label: getLanguageText("TXT_TOWN_HOUSE", "Town house")}, {
                name: "endTownHouse",
                label: getLanguageText("TXT_END_TOWN_HOUSE", "End town house")
            }, {
                name: "linkedDetachedHouse",
                label: getLanguageText("TXT_LINKED_DETACHED_HOUSE", "Linked detached house")
            }, {
                name: "linkedDetachedBungalow",
                label: getLanguageText("TXT_LINKED_DETACHED_BUNGALOW", "Linked detached bungalow")
            }]
    }, {
        name: "apartment",
        label: "Apartment",
        subtypes: [{name: "apartment", label: getLanguageText("TXT_APARTMENT", "Apartment")}, {
            name: "penthouse",
            label: getLanguageText("TXT_PENTHOUSE", "Penthouse")
        }, {
            name: "entireFloor",
            label: getLanguageText("TXT_ENTIRE_FLOOR_APARTMENT", "Entire floor apartment")
        }, {name: "maisonette", label: getLanguageText("TXT_MAISONETTE", "Maisonette")}, {
            name: "groundFloor",
            label: getLanguageText("TXT_GROUND_FLOOR_APARTMENT", "Ground floor apartment")
        }]
    }, {
        name: "land",
        label: "Land",
        subtypes: [{name: "land", label: getLanguageText("TXT_LAND", "Land")}, {
            name: "plot",
            label: getLanguageText("TXT_PLOT", "Plot")
        }]
    }, {
        name: "commercial", label: "Commercial",
        subtypes: [{
            name: "ApartmentBuilding",
            label: getLanguageText("TXT_APARTMENT_BUILDING", "Apartment Building")
        }, {name: "Bar", label: getLanguageText("TXT_BAR", "Bar")}, {
            name: "Blockofflats",
            label: getLanguageText("TXT_BLOCK_OF_FLATS", "Block of flats")
        }, {name: "Building", label: getLanguageText("TXT_BUILDING", "Building")}, {
            name: "BusinessPark",
            label: getLanguageText("TXT_BUSINESS_PARK", "Business Park")
        }, {name: "Cafe", label: getLanguageText("TXT_CAFE", "Cafe")}, {
            name: "ChildcareFacility", label: getLanguageText("TXT_CHILDCARE_FACILITY",
                "Childcare Facility")
        }, {
            name: "CommercialBuilding",
            label: getLanguageText("TXT_COMMERCIAL_BUILDING", "Commercial Building")
        }, {
            name: "CommercialDevelopment",
            label: getLanguageText("TXT_COMMERCIAL_DEVELOPMENT", "Commercial Development")
        }, {
            name: "ConvenienceStore",
            label: getLanguageText("TXT_CONVENIENCE_STORE", "Convenience Store")
        }, {
            name: "DataCenter",
            label: getLanguageText("TXT_DATA_CENTER", "Data Center")
        }, {
            name: "DistributionWarehouse",
            label: getLanguageText("TXT_DISTRIBUTION_WAREHOUSE", "Distribution Warehouse")
        },
            {name: "Factory", label: getLanguageText("TXT_FACTORY", "Factory")}, {
                name: "Farm",
                label: getLanguageText("TXT_FARM", "Farm")
            }, {name: "Garage", label: getLanguageText("TXT_GARAGE", "Garage")}, {
                name: "GuestHouse",
                label: getLanguageText("TXT_GUEST_HOUSE", "Guest House")
            }, {
                name: "HairdresserBarberShop",
                label: getLanguageText("TXT_HAIRDRESSER_SHOP", "Hairdresser/Barber Shop")
            }, {name: "HealthcareFacility", label: getLanguageText("TXT_HEALTHCARE_FACILITY", "Healthcare Facility")}, {
                name: "HeavyIndustrial", label: getLanguageText("TXT_HEAVY_INDUSTRIAL",
                    "Heavy Industrial")
            }, {
                name: "HighStreetRetailProperty",
                label: getLanguageText("TXT_HIGH_STREET_RETAIL_PROPERTY", "High Street Retail Property")
            }, {name: "Hotel", label: getLanguageText("TXT_HOTEL", "Hotel")}, {
                name: "HotelApartments",
                label: getLanguageText("TXT_HOTEL_APARTMENTS", "Hotel Apartments")
            }, {
                name: "IndustrialDevelopment",
                label: getLanguageText("TXT_INDUSTRIAL_DEVELOPMENT", "Industrial Development")
            }, {name: "IndustrialPark", label: getLanguageText("TXT_INDUSTRIAL_PARK", "Industrial Park")}, {
                name: "LeisureFacility",
                label: getLanguageText("TXT_LEISURE_FACILITY", "Leisure Facility")
            }, {
                name: "MarineProperty",
                label: getLanguageText("TXT_MARINE_PROPERTY", "Marine Property")
            }, {name: "Mill", label: getLanguageText("TXT_MILL", "Mill")}, {
                name: "MixedUseProject",
                label: getLanguageText("TXT_MIXED_USE_PROJECT", "Mixed Use Project")
            }, {name: "Nightclub", label: getLanguageText("TXT_NIGHTCLUB", "Nightclub")}, {
                name: "Office",
                label: getLanguageText("TXT_OFFICE", "Office")
            }, {
                name: "OutofTownRetailProperty", label: getLanguageText("TXT_OUT_OF_TOWN_RETAIL_PROPERTY",
                    "Out of Town Retail Property")
            }, {
                name: "PetrolStation",
                label: getLanguageText("TXT_PETROL_STATION", "Petrol Station")
            }, {
                name: "PlaceofWorship",
                label: getLanguageText("TXT_PLACE_OF_WORSHIP", "Place of Worship")
            }, {name: "PostOffice", label: getLanguageText("TXT_POST_OFFICE", "Post Office")}, {
                name: "Pub",
                label: getLanguageText("TXT_PUB", "Pub")
            }, {
                name: "ResearchDevelopmentFacility",
                label: getLanguageText("TXT_RESEARCH_DEVELOPMENT_FACILITY", "Research \x26 Development Facility")
            }, {
                name: "ResidentialDevelopment", label: getLanguageText("TXT_RESIDENTIAL_DEVELOPMENT",
                    "Residential Development")
            }, {name: "Restaurant", label: getLanguageText("TXT_RESTAURANT", "Restaurant")}, {
                name: "SciencePark",
                label: getLanguageText("TXT_SCIENCE_PARK", "Science Park")
            }, {
                name: "ServicedOffice",
                label: getLanguageText("TXT_SERVICED_OFFICE", "Serviced Office")
            }, {name: "Shop", label: getLanguageText("TXT_SHOP", "Shop")}, {
                name: "Shoppingcenter",
                label: getLanguageText("TXT_SHOPPING_CENTER", "Shopping center")
            }, {name: "Shoppingmall", label: getLanguageText("TXT_SHOPPING_MALL", "Shopping mall")}, {
                name: "Showroom",
                label: getLanguageText("TXT_SHOWROOM", "Showroom")
            }, {name: "Storage", label: getLanguageText("TXT_STORAGE", "Storage")}, {
                name: "Tradecounter",
                label: getLanguageText("TXT_TRADE_COUNTER", "Trade counter")
            }, {name: "Warehouse", label: getLanguageText("TXT_WAREHOUSE", "Warehouse")}, {
                name: "Workshop",
                label: getLanguageText("TXT_WORKSHOP", "Workshop")
            }]
    }];
    a.getPropertySubtypeLabel = function (c) {
        return _.find(_.find(a.propertyTypes, {subtypes: [{name: c}]}).subtypes, {name: c}).label
    }
}]);
myApp.controller("mapFullCtrl", ["$scope", "$window", "LocationSrv", function (a, c, d) {
    var f = this;
    f.map = {};
    f.markers = [];
    f.polygons = [];
    f.isHome = !1;
    f.isSoldListings = !1;
    f.mapDistrictCenter = {
        nicosia: {centerLat: 35.167248213164, centerLng: 33.3568847179413},
        limassol: {centerLat: 34.6828070602876, centerLng: 33.0339271386254},
        paphos: {centerLat: 34.777733838939, centerLng: 32.4309736684222},
        famagusta: {centerLat: 34.9843492898119, centerLng: 34.0104920516455},
        larnaca: {centerLat: 34.9008275368615, centerLng: 33.6199395724889}
    };
    f.mapOptions = {centerLat: 34.77323900528499, centerLng: 32.40918517112732, isFullScreen: !0};
    f.getRegion = function (a) {
        if (void 0 != a && f.isHome) {
            var d = getLanguageCode(), m = a.district.replace(/\s/g, "-");
            a = a.name.replace(/\s/g, "-");
            d = ("EN" == d ? "" : "/" + d) + (f.isSoldListings ? "/properties-sold" : "/properties-for-sale");
            d += "/location-" + a + "_" + m + "/page-1";
            getDevice().isMobile && (d += "#edit-filter");
            c.location.href = d
        }
        cancelFullScreenMode(-1, !0)
    };
    f.hidePolygons = function () {
        for (var a = 0; a < f.polygons.length; a++) f.polygons[a].setMap(null);
        f.polygons = []
    };
    f.createShadedPolygon = function (a, c) {
        c = c.coordinates[0];
        if (Array.isArray(c)) {
            for (var d = [], l = 0; l < c.length; l++) {
                var e = new google.maps.LatLng(c[l][1], c[l][0]);
                d.push(e)
            }
            c = new google.maps.Polygon({
                path: d,
                strokeColor: "red",
                strokeWeight: 1,
                fillColor: "pink",
                fillOpacity: .55,
                zIndex: 90
            });
            f.polygons.push(c);
            c.setMap(a)
        }
    };
    f.createMarker = function (a, c) {
        var d = new google.maps.LatLng(c.centerLat, c.centerLng), l = getValueInLanguage(c, "title"),
            e = getValueInLanguage(c, "district");
        d = new GmapMarkerLabel({
            position: d,
            map: a,
            labelContent: l,
            labelAnchor: new google.maps.Point(50, 0),
            labelClass: "labels",
            icon: "img/pixel_trans.gif",
            draggable: !1,
            zIndex: 100,
            district: e,
            districtEn: c.district.EN,
            regionEn: c.title.EN
        });
        f.markers.push(d);
        google.maps.event.addListener(d, "click", function () {
            f.getRegion({name: this.regionEn, district: this.districtEn})
        });
        google.maps.event.addListener(d, "mouseover", function () {
            f.hidePolygons();
            f.createShadedPolygon(a, c)
        });
        google.maps.event.addListener(d, "mouseout", function () {
            f.hidePolygons()
        });
        d.setMap(a)
    };
    f.loadCyprusGeoJson = function (c, k, m) {
        a.currentMap = c;
        if (m) {
            f.hidePolygons();
            for (c = 0; c < f.markers.length; c++) f.markers[c].setMap(null);
            f.markers = []
        }
        d.getList({location_type: "district", value: k}, function (a) {
            for (var c = 0; c < a.length; c++) f.createMarker(f.map, a[c])
        })
    };
    f.getMapOptions = function (a) {
        var c = f.mapOptions;
        switch (a.toLowerCase()) {
            case "nicosia":
                c = f.mapDistrictCenter.nicosia;
                break;
            case "limassol":
                c = f.mapDistrictCenter.limassol;
                break;
            case "paphos":
                c = f.mapDistrictCenter.paphos;
                break;
            case "famagusta":
                c =
                    f.mapDistrictCenter.famagusta;
                break;
            case "larnaca":
                c = f.mapDistrictCenter.larnaca
        }
        return c
    };
    f.displayFullMap = function (a) {
        a = a || "default";
        var c = f.getMapOptions(a), d = document.getElementById("gridItemMap");
        "district" in f.map && f.map.district == a || setTimeout(function () {
            f.map = new google.maps.Map(d, {
                zoom: 12,
                center: {lat: c.centerLat, lng: c.centerLng},
                fullscreenControl: !1,
                district: a,
                gestureHandling: "cooperative"
            });
            f.loadCyprusGeoJson(f.map, a, !0)
        }, 100)
    };
    f.createMapPlaceholder = function (a) {
        var c = document.getElementById("fullscreen-placeholder");
        void 0 == c || "district" in f.map && f.map.district == a || (c.innerHTML = '\t\t\x3cdiv class\x3d"grid-item-map" id\x3d"gridItemMap"\x3e\x3c/div\x3e\t\t\t\x3cdiv class\x3d"bs-gallery-slider-arrow-fullscreen bs-md-button"\x3e\x3ci class\x3d"fa fa-compress fa-2x bs-slider-arrow-content" onclick\x3d"hideElemOnExitFullscreen(\'fullscreen-placeholder\')" aria-hidden\x3d"true"\x3e\x3c/i\x3e\x3c/div\x3e\t\t\x3c/div\x3e');
        a = getDevice();
        isFullScreen = !0;
        isFullScreenClicked = a.isMobile ? !0 : !1;
        addClass(document.body, "fullscreen");
        return c
    };
    f.showMap = function (a, c) {
        void 0 == a && (a = !1);
        f.isHome = a;
        a = f.createMapPlaceholder(c);
        var d = getDevice();
        d.isIDevice || d.isMac && d.isSafari ? (isFullScreen = !0, history.pushState("cancelIOSbackbutton", null, null)) : enterFullScreenMode(a);
        f.displayFullMap(c)
    };
    f.district = "default";
    f.showMapByDistrict = function (a) {
        f.isSoldListings = void 0 == a ? !1 : a;
        "default" != f.district && (f.showMap(!0, f.district), f.district = "default")
    };
    f.showListingByDistrict = function (c, d) {
        a.resetSearch();
        a.search.nearbyRegions = c;
        a.$emit("map-district-selected",
            {district: c, type: d, search: "multi"})
    }
}]);
myApp.controller("FormCtrl", ["$scope", "$location", "LocationSrv", "$http", function (a, c, d, f) {
    function n(a) {
        d.getList({}, function (a) {
        }).$promise.then(function (c) {
            if (0 == k.locations.length) {
                for (var d = 0; d < c.length; d++) {
                    var f = getValueInLanguage(c[d], "title"), l = c[d].district.EN;
                    k.locations.push({location_ref: c[d].location_reference, name: f, label: f, district: l});
                    -1 === k.districts.indexOf(l) && k.districts.push(l)
                }
                k.locations.sort(function (a, c) {
                    return a.label < c.label ? -1 : a.label > c.label ? 1 : 0
                });
                k.locationsFiltered =
                    k.locations;
                0 < k.districts.length && (k.districts.sort(), k.districts.reverse());
                _.filter(k.locations, {district: "Paphos"});
                a()
            }
        })
    }

    var k = this;
    k.location = {location_ref: ""};
    k.locations = [];
    k.locationsFiltered = [];
    k.district = {};
    k.districts = [];
    k.districtChange = function () {
        k.locationsFiltered = _.filter(k.locations, {district: k.district})
    };
    k.countries_official = {
        "Islamic Republic of Afghanistan": {short_name: "Afghanistan", iso3: "AFG", iso2: "AF", calling_code: "93"},
        "Republic of Albania": {
            short_name: "Albania", iso3: "ALB",
            iso2: "AL", calling_code: "355"
        },
        "People's Democratic Republic of Algeria": {
            short_name: "Algeria",
            iso3: "DZA",
            iso2: "DZ",
            calling_code: "213"
        },
        "American Samoa": {short_name: "American Samoa", iso3: "ASM", iso2: "AS", calling_code: "1684"},
        "Principality of Andorra": {short_name: "Andorra", iso3: "AND", iso2: "AD", calling_code: "376"},
        "Republic of Angola": {short_name: "Angola", iso3: "AGO", iso2: "AO", calling_code: "244"},
        Anguilla: {short_name: "Anguilla", iso3: "AIA", iso2: "AI", calling_code: "1264"},
        Antarctica: {
            short_name: "Antarctica",
            iso3: "ATA", iso2: "AQ"
        },
        "Antigua and Barbuda": {short_name: "Antigua and Barbuda", iso3: "ATG", iso2: "AG", calling_code: "1268"},
        "Argentine Republic": {short_name: "Argentina", iso3: "ARG", iso2: "AR", calling_code: "54"},
        "Republic of Armenia": {short_name: "Armenia", iso3: "ARM", iso2: "AM", calling_code: "374"},
        Aruba: {short_name: "Aruba", iso3: "ABW", iso2: "AW", calling_code: "297"},
        "Commonwealth of Australia": {short_name: "Australia", iso3: "AUS", iso2: "AU", calling_code: "61"},
        "Republic of Austria": {
            short_name: "Austria", iso3: "AUT",
            iso2: "AT", calling_code: "43"
        },
        "Republic of Azerbaijan": {short_name: "Azerbaijan", iso3: "AZE", iso2: "AZ", calling_code: "994"},
        "Commonwealth of the Bahamas": {short_name: "Bahamas", iso3: "BHS", iso2: "BS", calling_code: "1242"},
        "Kingdom of Bahrain": {short_name: "Bahrain", iso3: "BHR", iso2: "BH", calling_code: "973"},
        "People's Republic of Bangladesh": {short_name: "Bangladesh", iso3: "BGD", iso2: "BD", calling_code: "880"},
        Barbados: {short_name: "Barbados", iso3: "BRB", iso2: "BB", calling_code: "1246"},
        "Republic of Belarus": {
            short_name: "Belarus",
            iso3: "BLR", iso2: "BY", calling_code: "375"
        },
        "Kingdom of Belgium": {short_name: "Belgium", iso3: "BEL", iso2: "BE", calling_code: "32"},
        Belize: {short_name: "Belize", iso3: "BLZ", iso2: "BZ", calling_code: "501"},
        "Republic of Benin": {short_name: "Benin", iso3: "BEN", iso2: "BJ", calling_code: "229"},
        Bermuda: {short_name: "Bermuda", iso3: "BMU", iso2: "BM", calling_code: "1441"},
        "Kingdom of Bhutan": {short_name: "Bhutan", iso3: "BTN", iso2: "BT", calling_code: "975"},
        "Plurinational State of Bolivia": {
            short_name: "Bolivia", iso3: "BOL", iso2: "BO",
            calling_code: "591"
        },
        "Bosnia and Herzegovina": {short_name: "Bosnia and Herzegovina", iso3: "BIH", iso2: "BA", calling_code: "387"},
        "Republic of Botswana": {short_name: "Botswana", iso3: "BWA", iso2: "BW", calling_code: "267"},
        "Bouvet Island": {short_name: "Bouvet Island", iso3: "BVT", iso2: "BV"},
        "Federative Republic of Brazil": {short_name: "Brazil", iso3: "BRA", iso2: "BR", calling_code: "55"},
        "British Indian Ocean Territory": {
            short_name: "British Indian Ocean Territory",
            iso3: "IOT",
            iso2: "IO",
            calling_code: "246"
        },
        "Virgin Islands": {
            short_name: "British Virgin Islands",
            iso3: "VGB", iso2: "VG", calling_code: "1284"
        },
        "Nation of Brunei, Abode of Peace": {short_name: "Brunei", iso3: "BRN", iso2: "BN", calling_code: "673"},
        "Republic of Bulgaria": {short_name: "Bulgaria", iso3: "BGR", iso2: "BG", calling_code: "359"},
        "Burkina Faso": {short_name: "Burkina Faso", iso3: "BFA", iso2: "BF", calling_code: "226"},
        "Republic of Burundi": {short_name: "Burundi", iso3: "BDI", iso2: "BI", calling_code: "257"},
        "Kingdom of Cambodia": {short_name: "Cambodia", iso3: "KHM", iso2: "KH", calling_code: "855"},
        "Republic of Cameroon": {
            short_name: "Cameroon",
            iso3: "CMR", iso2: "CM", calling_code: "237"
        },
        Canada: {short_name: "Canada", iso3: "CAN", iso2: "CA", calling_code: "1"},
        "Republic of Cabo Verde": {short_name: "Cape Verde", iso3: "CPV", iso2: "CV", calling_code: "238"},
        "Bonaire, Sint Eustatius and Saba": {
            short_name: "Caribbean Netherlands",
            iso3: "BES",
            iso2: "BQ",
            calling_code: "599"
        },
        "Cayman Islands": {short_name: "Cayman Islands", iso3: "CYM", iso2: "KY", calling_code: "1345"},
        "Central African Republic": {
            short_name: "Central African Republic",
            iso3: "CAF",
            iso2: "CF",
            calling_code: "236"
        },
        "Republic of Chad": {short_name: "Chad", iso3: "TCD", iso2: "TD", calling_code: "235"},
        "Republic of Chile": {short_name: "Chile", iso3: "CHL", iso2: "CL", calling_code: "56"},
        "People's Republic of China": {short_name: "China", iso3: "CHN", iso2: "CN", calling_code: "86"},
        "Territory of Christmas Island": {short_name: "Christmas Island", iso3: "CXR", iso2: "CX", calling_code: "61"},
        "Territory of the Cocos (Keeling) Islands": {
            short_name: "Cocos (Keeling) Islands",
            iso3: "CCK",
            iso2: "CC",
            calling_code: "61"
        },
        "Republic of Colombia": {
            short_name: "Colombia",
            iso3: "COL", iso2: "CO", calling_code: "57"
        },
        "Union of the Comoros": {short_name: "Comoros", iso3: "COM", iso2: "KM", calling_code: "269"},
        "Cook Islands": {short_name: "Cook Islands", iso3: "COK", iso2: "CK", calling_code: "682"},
        "Republic of Costa Rica": {short_name: "Costa Rica", iso3: "CRI", iso2: "CR", calling_code: "506"},
        "Republic of Croatia": {short_name: "Croatia", iso3: "HRV", iso2: "HR", calling_code: "385"},
        "Republic of Cuba": {short_name: "Cuba", iso3: "CUB", iso2: "CU", calling_code: "53"},
        "Country of Cura\u00e7ao": {
            short_name: "Cura\u00e7ao",
            iso3: "CUW", iso2: "CW", calling_code: "5999"
        },
        "Republic of Cyprus": {short_name: "Cyprus", iso3: "CYP", iso2: "CY", calling_code: "357"},
        "Czech Republic": {short_name: "Czechia", iso3: "CZE", iso2: "CZ", calling_code: "420"},
        "Democratic Republic of the Congo": {short_name: "DR Congo", iso3: "COD", iso2: "CD", calling_code: "243"},
        "Kingdom of Denmark": {short_name: "Denmark", iso3: "DNK", iso2: "DK", calling_code: "45"},
        "Republic of Djibouti": {short_name: "Djibouti", iso3: "DJI", iso2: "DJ", calling_code: "253"},
        "Commonwealth of Dominica": {
            short_name: "Dominica",
            iso3: "DMA", iso2: "DM", calling_code: "1767"
        },
        "Dominican Republic": {short_name: "Dominican Republic", iso3: "DOM", iso2: "DO", calling_code: "1809"},
        "Republic of Ecuador": {short_name: "Ecuador", iso3: "ECU", iso2: "EC", calling_code: "593"},
        "Arab Republic of Egypt": {short_name: "Egypt", iso3: "EGY", iso2: "EG", calling_code: "20"},
        "Republic of El Salvador": {short_name: "El Salvador", iso3: "SLV", iso2: "SV", calling_code: "503"},
        "Republic of Equatorial Guinea": {
            short_name: "Equatorial Guinea",
            iso3: "GNQ",
            iso2: "GQ",
            calling_code: "240"
        },
        "State of Eritrea": {short_name: "Eritrea", iso3: "ERI", iso2: "ER", calling_code: "291"},
        "Republic of Estonia": {short_name: "Estonia", iso3: "EST", iso2: "EE", calling_code: "372"},
        "Federal Democratic Republic of Ethiopia": {
            short_name: "Ethiopia",
            iso3: "ETH",
            iso2: "ET",
            calling_code: "251"
        },
        "Falkland Islands": {short_name: "Falkland Islands", iso3: "FLK", iso2: "FK", calling_code: "500"},
        "Faroe Islands": {short_name: "Faroe Islands", iso3: "FRO", iso2: "FO", calling_code: "298"},
        "Republic of Fiji": {
            short_name: "Fiji", iso3: "FJI", iso2: "FJ",
            calling_code: "679"
        },
        "Republic of Finland": {short_name: "Finland", iso3: "FIN", iso2: "FI", calling_code: "358"},
        "French Republic": {short_name: "France", iso3: "FRA", iso2: "FR", calling_code: "33"},
        Guiana: {short_name: "French Guiana", iso3: "GUF", iso2: "GF", calling_code: "594"},
        "French Polynesia": {short_name: "French Polynesia", iso3: "PYF", iso2: "PF", calling_code: "689"},
        "Territory of the French Southern and Antarctic Lands": {
            short_name: "French Southern and Antarctic Lands",
            iso3: "ATF",
            iso2: "TF"
        },
        "Gabonese Republic": {
            short_name: "Gabon",
            iso3: "GAB", iso2: "GA", calling_code: "241"
        },
        "Republic of the Gambia": {short_name: "Gambia", iso3: "GMB", iso2: "GM", calling_code: "220"},
        Georgia: {short_name: "Georgia", iso3: "GEO", iso2: "GE", calling_code: "995"},
        "Federal Republic of Germany": {short_name: "Germany", iso3: "DEU", iso2: "DE", calling_code: "49"},
        "Republic of Ghana": {short_name: "Ghana", iso3: "GHA", iso2: "GH", calling_code: "233"},
        Gibraltar: {short_name: "Gibraltar", iso3: "GIB", iso2: "GI", calling_code: "350"},
        "Hellenic Republic": {
            short_name: "Greece", iso3: "GRC", iso2: "GR",
            calling_code: "30"
        },
        Greenland: {short_name: "Greenland", iso3: "GRL", iso2: "GL", calling_code: "299"},
        Grenada: {short_name: "Grenada", iso3: "GRD", iso2: "GD", calling_code: "1473"},
        Guadeloupe: {short_name: "Guadeloupe", iso3: "GLP", iso2: "GP", calling_code: "590"},
        Guam: {short_name: "Guam", iso3: "GUM", iso2: "GU", calling_code: "1671"},
        "Republic of Guatemala": {short_name: "Guatemala", iso3: "GTM", iso2: "GT", calling_code: "502"},
        "Bailiwick of Guernsey": {short_name: "Guernsey", iso3: "GGY", iso2: "GG", calling_code: "44"},
        "Republic of Guinea": {
            short_name: "Guinea",
            iso3: "GIN", iso2: "GN", calling_code: "224"
        },
        "Republic of Guinea-Bissau": {short_name: "Guinea-Bissau", iso3: "GNB", iso2: "GW", calling_code: "245"},
        "Co-operative Republic of Guyana": {short_name: "Guyana", iso3: "GUY", iso2: "GY", calling_code: "592"},
        "Republic of Haiti": {short_name: "Haiti", iso3: "HTI", iso2: "HT", calling_code: "509"},
        "Heard Island and McDonald Islands": {short_name: "Heard Island and McDonald Islands", iso3: "HMD", iso2: "HM"},
        "Republic of Honduras": {short_name: "Honduras", iso3: "HND", iso2: "HN", calling_code: "504"},
        "Hong Kong Special Administrative Region of the People's Republic of China": {
            short_name: "Hong Kong",
            iso3: "HKG",
            iso2: "HK",
            calling_code: "852"
        },
        Hungary: {short_name: "Hungary", iso3: "HUN", iso2: "HU", calling_code: "36"},
        Iceland: {short_name: "Iceland", iso3: "ISL", iso2: "IS", calling_code: "354"},
        "Republic of India": {short_name: "India", iso3: "IND", iso2: "IN", calling_code: "91"},
        "Republic of Indonesia": {short_name: "Indonesia", iso3: "IDN", iso2: "ID", calling_code: "62"},
        "Islamic Republic of Iran": {
            short_name: "Iran", iso3: "IRN",
            iso2: "IR", calling_code: "98"
        },
        "Republic of Iraq": {short_name: "Iraq", iso3: "IRQ", iso2: "IQ", calling_code: "964"},
        "Republic of Ireland": {short_name: "Ireland", iso3: "IRL", iso2: "IE", calling_code: "353"},
        "Isle of Man": {short_name: "Isle of Man", iso3: "IMN", iso2: "IM", calling_code: "44"},
        "State of Israel": {short_name: "Israel", iso3: "ISR", iso2: "IL", calling_code: "972"},
        "Italian Republic": {short_name: "Italy", iso3: "ITA", iso2: "IT", calling_code: "39"},
        "Republic of C\u00f4te d'Ivoire": {
            short_name: "Ivory Coast", iso3: "CIV",
            iso2: "CI", calling_code: "225"
        },
        Jamaica: {short_name: "Jamaica", iso3: "JAM", iso2: "JM", calling_code: "1876"},
        Japan: {short_name: "Japan", iso3: "JPN", iso2: "JP", calling_code: "81"},
        "Bailiwick of Jersey": {short_name: "Jersey", iso3: "JEY", iso2: "JE", calling_code: "44"},
        "Hashemite Kingdom of Jordan": {short_name: "Jordan", iso3: "JOR", iso2: "JO", calling_code: "962"},
        "Republic of Kazakhstan": {short_name: "Kazakhstan", iso3: "KAZ", iso2: "KZ", calling_code: "76"},
        "Republic of Kenya": {short_name: "Kenya", iso3: "KEN", iso2: "KE", calling_code: "254"},
        "Independent and Sovereign Republic of Kiribati": {
            short_name: "Kiribati",
            iso3: "KIR",
            iso2: "KI",
            calling_code: "686"
        },
        "Republic of Kosovo": {short_name: "Kosovo", iso3: "UNK", iso2: "XK", calling_code: "383"},
        "State of Kuwait": {short_name: "Kuwait", iso3: "KWT", iso2: "KW", calling_code: "965"},
        "Kyrgyz Republic": {short_name: "Kyrgyzstan", iso3: "KGZ", iso2: "KG", calling_code: "996"},
        "Lao People's Democratic Republic": {short_name: "Laos", iso3: "LAO", iso2: "LA", calling_code: "856"},
        "Republic of Latvia": {
            short_name: "Latvia", iso3: "LVA",
            iso2: "LV", calling_code: "371"
        },
        "Lebanese Republic": {short_name: "Lebanon", iso3: "LBN", iso2: "LB", calling_code: "961"},
        "Kingdom of Lesotho": {short_name: "Lesotho", iso3: "LSO", iso2: "LS", calling_code: "266"},
        "Republic of Liberia": {short_name: "Liberia", iso3: "LBR", iso2: "LR", calling_code: "231"},
        "State of Libya": {short_name: "Libya", iso3: "LBY", iso2: "LY", calling_code: "218"},
        "Principality of Liechtenstein": {short_name: "Liechtenstein", iso3: "LIE", iso2: "LI", calling_code: "423"},
        "Republic of Lithuania": {
            short_name: "Lithuania",
            iso3: "LTU", iso2: "LT", calling_code: "370"
        },
        "Grand Duchy of Luxembourg": {short_name: "Luxembourg", iso3: "LUX", iso2: "LU", calling_code: "352"},
        "Macao Special Administrative Region of the People's Republic of China": {
            short_name: "Macau",
            iso3: "MAC",
            iso2: "MO",
            calling_code: "853"
        },
        "Republic of Macedonia": {short_name: "Macedonia", iso3: "MKD", iso2: "MK", calling_code: "389"},
        "Republic of Madagascar": {short_name: "Madagascar", iso3: "MDG", iso2: "MG", calling_code: "261"},
        "Republic of Malawi": {
            short_name: "Malawi", iso3: "MWI",
            iso2: "MW", calling_code: "265"
        },
        Malaysia: {short_name: "Malaysia", iso3: "MYS", iso2: "MY", calling_code: "60"},
        "Republic of the Maldives": {short_name: "Maldives", iso3: "MDV", iso2: "MV", calling_code: "960"},
        "Republic of Mali": {short_name: "Mali", iso3: "MLI", iso2: "ML", calling_code: "223"},
        "Republic of Malta": {short_name: "Malta", iso3: "MLT", iso2: "MT", calling_code: "356"},
        "Republic of the Marshall Islands": {
            short_name: "Marshall Islands",
            iso3: "MHL",
            iso2: "MH",
            calling_code: "692"
        },
        Martinique: {
            short_name: "Martinique", iso3: "MTQ",
            iso2: "MQ", calling_code: "596"
        },
        "Islamic Republic of Mauritania": {short_name: "Mauritania", iso3: "MRT", iso2: "MR", calling_code: "222"},
        "Republic of Mauritius": {short_name: "Mauritius", iso3: "MUS", iso2: "MU", calling_code: "230"},
        "Department of Mayotte": {short_name: "Mayotte", iso3: "MYT", iso2: "YT", calling_code: "262"},
        "United Mexican States": {short_name: "Mexico", iso3: "MEX", iso2: "MX", calling_code: "52"},
        "Federated States of Micronesia": {short_name: "Micronesia", iso3: "FSM", iso2: "FM", calling_code: "691"},
        "Republic of Moldova": {
            short_name: "Moldova",
            iso3: "MDA", iso2: "MD", calling_code: "373"
        },
        "Principality of Monaco": {short_name: "Monaco", iso3: "MCO", iso2: "MC", calling_code: "377"},
        Mongolia: {short_name: "Mongolia", iso3: "MNG", iso2: "MN", calling_code: "976"},
        Montenegro: {short_name: "Montenegro", iso3: "MNE", iso2: "ME", calling_code: "382"},
        Montserrat: {short_name: "Montserrat", iso3: "MSR", iso2: "MS", calling_code: "1664"},
        "Kingdom of Morocco": {short_name: "Morocco", iso3: "MAR", iso2: "MA", calling_code: "212"},
        "Republic of Mozambique": {
            short_name: "Mozambique", iso3: "MOZ",
            iso2: "MZ", calling_code: "258"
        },
        "Republic of the Union of Myanmar": {short_name: "Myanmar", iso3: "MMR", iso2: "MM", calling_code: "95"},
        "Republic of Namibia": {short_name: "Namibia", iso3: "NAM", iso2: "NA", calling_code: "264"},
        "Republic of Nauru": {short_name: "Nauru", iso3: "NRU", iso2: "NR", calling_code: "674"},
        "Federal Democratic Republic of Nepal": {short_name: "Nepal", iso3: "NPL", iso2: "NP", calling_code: "977"},
        "Kingdom of the Netherlands": {short_name: "Netherlands", iso3: "NLD", iso2: "NL", calling_code: "31"},
        "New Caledonia": {
            short_name: "New Caledonia",
            iso3: "NCL", iso2: "NC", calling_code: "687"
        },
        "New Zealand": {short_name: "New Zealand", iso3: "NZL", iso2: "NZ", calling_code: "64"},
        "Republic of Nicaragua": {short_name: "Nicaragua", iso3: "NIC", iso2: "NI", calling_code: "505"},
        "Republic of Niger": {short_name: "Niger", iso3: "NER", iso2: "NE", calling_code: "227"},
        "Federal Republic of Nigeria": {short_name: "Nigeria", iso3: "NGA", iso2: "NG", calling_code: "234"},
        Niue: {short_name: "Niue", iso3: "NIU", iso2: "NU", calling_code: "683"},
        "Territory of Norfolk Island": {
            short_name: "Norfolk Island",
            iso3: "NFK", iso2: "NF", calling_code: "672"
        },
        "Democratic People's Republic of Korea": {
            short_name: "North Korea",
            iso3: "PRK",
            iso2: "KP",
            calling_code: "850"
        },
        "Commonwealth of the Northern Mariana Islands": {
            short_name: "Northern Mariana Islands",
            iso3: "MNP",
            iso2: "MP",
            calling_code: "1670"
        },
        "Kingdom of Norway": {short_name: "Norway", iso3: "NOR", iso2: "NO", calling_code: "47"},
        "Sultanate of Oman": {short_name: "Oman", iso3: "OMN", iso2: "OM", calling_code: "968"},
        "Islamic Republic of Pakistan": {
            short_name: "Pakistan", iso3: "PAK",
            iso2: "PK", calling_code: "92"
        },
        "Republic of Palau": {short_name: "Palau", iso3: "PLW", iso2: "PW", calling_code: "680"},
        "State of Palestine": {short_name: "Palestine", iso3: "PSE", iso2: "PS", calling_code: "970"},
        "Republic of Panama": {short_name: "Panama", iso3: "PAN", iso2: "PA", calling_code: "507"},
        "Independent State of Papua New Guinea": {
            short_name: "Papua New Guinea",
            iso3: "PNG",
            iso2: "PG",
            calling_code: "675"
        },
        "Republic of Paraguay": {short_name: "Paraguay", iso3: "PRY", iso2: "PY", calling_code: "595"},
        "Republic of Peru": {
            short_name: "Peru",
            iso3: "PER", iso2: "PE", calling_code: "51"
        },
        "Republic of the Philippines": {short_name: "Philippines", iso3: "PHL", iso2: "PH", calling_code: "63"},
        "Pitcairn Group of Islands": {short_name: "Pitcairn Islands", iso3: "PCN", iso2: "PN", calling_code: "64"},
        "Republic of Poland": {short_name: "Poland", iso3: "POL", iso2: "PL", calling_code: "48"},
        "Portuguese Republic": {short_name: "Portugal", iso3: "PRT", iso2: "PT", calling_code: "351"},
        "Commonwealth of Puerto Rico": {short_name: "Puerto Rico", iso3: "PRI", iso2: "PR", calling_code: "1787"},
        "State of Qatar": {short_name: "Qatar", iso3: "QAT", iso2: "QA", calling_code: "974"},
        "Republic of the Congo": {short_name: "Republic of the Congo", iso3: "COG", iso2: "CG", calling_code: "242"},
        Romania: {short_name: "Romania", iso3: "ROU", iso2: "RO", calling_code: "40"},
        "Russian Federation": {short_name: "Russia", iso3: "RUS", iso2: "RU", calling_code: "7"},
        "Republic of Rwanda": {short_name: "Rwanda", iso3: "RWA", iso2: "RW", calling_code: "250"},
        "R\u00e9union Island": {short_name: "R\u00e9union", iso3: "REU", iso2: "RE", calling_code: "262"},
        "Collectivity of Saint Barth\u00e9lemy": {
            short_name: "Saint Barth\u00e9lemy",
            iso3: "BLM",
            iso2: "BL",
            calling_code: "590"
        },
        "Saint Helena, Ascension and Tristan da Cunha": {
            short_name: "Saint Helena, Ascension and Tristan da Cunha",
            iso3: "SHN",
            iso2: "SH",
            calling_code: "290"
        },
        "Federation of Saint Christopher and Nevisa": {
            short_name: "Saint Kitts and Nevis",
            iso3: "KNA",
            iso2: "KN",
            calling_code: "1869"
        },
        "Saint Lucia": {short_name: "Saint Lucia", iso3: "LCA", iso2: "LC", calling_code: "1758"},
        "Saint Martin": {
            short_name: "Saint Martin",
            iso3: "MAF", iso2: "MF", calling_code: "590"
        },
        "Saint Pierre and Miquelon": {
            short_name: "Saint Pierre and Miquelon",
            iso3: "SPM",
            iso2: "PM",
            calling_code: "508"
        },
        "Saint Vincent and the Grenadines": {
            short_name: "Saint Vincent and the Grenadines",
            iso3: "VCT",
            iso2: "VC",
            calling_code: "1784"
        },
        "Independent State of Samoa": {short_name: "Samoa", iso3: "WSM", iso2: "WS", calling_code: "685"},
        "Most Serene Republic of San Marino": {short_name: "San Marino", iso3: "SMR", iso2: "SM", calling_code: "378"},
        "Kingdom of Saudi Arabia": {
            short_name: "Saudi Arabia",
            iso3: "SAU", iso2: "SA", calling_code: "966"
        },
        "Republic of Senegal": {short_name: "Senegal", iso3: "SEN", iso2: "SN", calling_code: "221"},
        "Republic of Serbia": {short_name: "Serbia", iso3: "SRB", iso2: "RS", calling_code: "381"},
        "Republic of Seychelles": {short_name: "Seychelles", iso3: "SYC", iso2: "SC", calling_code: "248"},
        "Republic of Sierra Leone": {short_name: "Sierra Leone", iso3: "SLE", iso2: "SL", calling_code: "232"},
        "Republic of Singapore": {short_name: "Singapore", iso3: "SGP", iso2: "SG", calling_code: "65"},
        "Sint Maarten": {
            short_name: "Sint Maarten",
            iso3: "SXM", iso2: "SX", calling_code: "1721"
        },
        "Slovak Republic": {short_name: "Slovakia", iso3: "SVK", iso2: "SK", calling_code: "421"},
        "Republic of Slovenia": {short_name: "Slovenia", iso3: "SVN", iso2: "SI", calling_code: "386"},
        "Solomon Islands": {short_name: "Solomon Islands", iso3: "SLB", iso2: "SB", calling_code: "677"},
        "Federal Republic of Somalia": {short_name: "Somalia", iso3: "SOM", iso2: "SO", calling_code: "252"},
        "Republic of South Africa": {short_name: "South Africa", iso3: "ZAF", iso2: "ZA", calling_code: "27"},
        "South Georgia and the South Sandwich Islands": {
            short_name: "South Georgia",
            iso3: "SGS", iso2: "GS", calling_code: "500"
        },
        "Republic of Korea": {short_name: "South Korea", iso3: "KOR", iso2: "KR", calling_code: "82"},
        "Republic of South Sudan": {short_name: "South Sudan", iso3: "SSD", iso2: "SS", calling_code: "211"},
        "Kingdom of Spain": {short_name: "Spain", iso3: "ESP", iso2: "ES", calling_code: "34"},
        "Democratic Socialist Republic of Sri Lanka": {
            short_name: "Sri Lanka",
            iso3: "LKA",
            iso2: "LK",
            calling_code: "94"
        },
        "Republic of the Sudan": {short_name: "Sudan", iso3: "SDN", iso2: "SD", calling_code: "249"},
        "Republic of Suriname": {
            short_name: "Suriname",
            iso3: "SUR", iso2: "SR", calling_code: "597"
        },
        "Svalbard og Jan Mayen": {short_name: "Svalbard and Jan Mayen", iso3: "SJM", iso2: "SJ", calling_code: "4779"},
        "Kingdom of Swaziland": {short_name: "Swaziland", iso3: "SWZ", iso2: "SZ", calling_code: "268"},
        "Kingdom of Sweden": {short_name: "Sweden", iso3: "SWE", iso2: "SE", calling_code: "46"},
        "Swiss Confederation": {short_name: "Switzerland", iso3: "CHE", iso2: "CH", calling_code: "41"},
        "Syrian Arab Republic": {short_name: "Syria", iso3: "SYR", iso2: "SY", calling_code: "963"},
        "Democratic Republic of S\u00e3o Tom\u00e9 and Pr\u00edncipe": {
            short_name: "S\u00e3o Tom\u00e9 and Pr\u00edncipe",
            iso3: "STP", iso2: "ST", calling_code: "239"
        },
        "Republic of China (Taiwan)": {short_name: "Taiwan", iso3: "TWN", iso2: "TW", calling_code: "886"},
        "Republic of Tajikistan": {short_name: "Tajikistan", iso3: "TJK", iso2: "TJ", calling_code: "992"},
        "United Republic of Tanzania": {short_name: "Tanzania", iso3: "TZA", iso2: "TZ", calling_code: "255"},
        "Kingdom of Thailand": {short_name: "Thailand", iso3: "THA", iso2: "TH", calling_code: "66"},
        "Democratic Republic of Timor-Leste": {short_name: "Timor-Leste", iso3: "TLS", iso2: "TL", calling_code: "670"},
        "Togolese Republic": {short_name: "Togo", iso3: "TGO", iso2: "TG", calling_code: "228"},
        Tokelau: {short_name: "Tokelau", iso3: "TKL", iso2: "TK", calling_code: "690"},
        "Kingdom of Tonga": {short_name: "Tonga", iso3: "TON", iso2: "TO", calling_code: "676"},
        "Republic of Trinidad and Tobago": {
            short_name: "Trinidad and Tobago",
            iso3: "TTO",
            iso2: "TT",
            calling_code: "1868"
        },
        "Tunisian Republic": {short_name: "Tunisia", iso3: "TUN", iso2: "TN", calling_code: "216"},
        "Republic of Turkey": {short_name: "Turkey", iso3: "TUR", iso2: "TR", calling_code: "90"},
        Turkmenistan: {short_name: "Turkmenistan", iso3: "TKM", iso2: "TM", calling_code: "993"},
        "Turks and Caicos Islands": {
            short_name: "Turks and Caicos Islands",
            iso3: "TCA",
            iso2: "TC",
            calling_code: "1649"
        },
        Tuvalu: {short_name: "Tuvalu", iso3: "TUV", iso2: "TV", calling_code: "688"},
        "Republic of Uganda": {short_name: "Uganda", iso3: "UGA", iso2: "UG", calling_code: "256"},
        Ukraine: {short_name: "Ukraine", iso3: "UKR", iso2: "UA", calling_code: "380"},
        "United Arab Emirates": {short_name: "United Arab Emirates", iso3: "ARE", iso2: "AE", calling_code: "971"},
        "United Kingdom of Great Britain and Northern Ireland": {
            short_name: "United Kingdom",
            iso3: "GBR",
            iso2: "GB",
            calling_code: "44"
        },
        "United States of America": {short_name: "United States", iso3: "USA", iso2: "US", calling_code: "1"},
        "United States Minor Outlying Islands": {
            short_name: "United States Minor Outlying Islands",
            iso3: "UMI",
            iso2: "UM"
        },
        "Virgin Islands of the United States": {
            short_name: "United States Virgin Islands",
            iso3: "VIR",
            iso2: "VI",
            calling_code: "1340"
        },
        "Oriental Republic of Uruguay": {
            short_name: "Uruguay",
            iso3: "URY", iso2: "UY", calling_code: "598"
        },
        "Republic of Uzbekistan": {short_name: "Uzbekistan", iso3: "UZB", iso2: "UZ", calling_code: "998"},
        "Republic of Vanuatu": {short_name: "Vanuatu", iso3: "VUT", iso2: "VU", calling_code: "678"},
        "Vatican City State": {short_name: "Vatican City", iso3: "VAT", iso2: "VA", calling_code: "379"},
        "Bolivarian Republic of Venezuela": {short_name: "Venezuela", iso3: "VEN", iso2: "VE", calling_code: "58"},
        "Socialist Republic of Vietnam": {short_name: "Vietnam", iso3: "VNM", iso2: "VN", calling_code: "84"},
        "Territory of the Wallis and Futuna Islands": {
            short_name: "Wallis and Futuna",
            iso3: "WLF", iso2: "WF", calling_code: "681"
        },
        "Sahrawi Arab Democratic Republic": {
            short_name: "Western Sahara",
            iso3: "ESH",
            iso2: "EH",
            calling_code: "212"
        },
        "Republic of Yemen": {short_name: "Yemen", iso3: "YEM", iso2: "YE", calling_code: "967"},
        "Republic of Zambia": {short_name: "Zambia", iso3: "ZMB", iso2: "ZM", calling_code: "260"},
        "Republic of Zimbabwe": {short_name: "Zimbabwe", iso3: "ZWE", iso2: "ZW", calling_code: "263"},
        "\u00c5land Islands": {short_name: "\u00c5land Islands", iso3: "ALA", iso2: "AX", calling_code: "358"}
    };
    k.countries_common =
        {
            Afghanistan: {short_name: "Afghanistan", iso3: "AFG", iso2: "AF", calling_code: "93"},
            Albania: {short_name: "Albania", iso3: "ALB", iso2: "AL", calling_code: "355"},
            Algeria: {short_name: "Algeria", iso3: "DZA", iso2: "DZ", calling_code: "213"},
            "American Samoa": {short_name: "American Samoa", iso3: "ASM", iso2: "AS", calling_code: "1684"},
            Andorra: {short_name: "Andorra", iso3: "AND", iso2: "AD", calling_code: "376"},
            Angola: {short_name: "Angola", iso3: "AGO", iso2: "AO", calling_code: "244"},
            Anguilla: {
                short_name: "Anguilla", iso3: "AIA", iso2: "AI",
                calling_code: "1264"
            },
            Antarctica: {short_name: "Antarctica", iso3: "ATA", iso2: "AQ"},
            "Antigua and Barbuda": {short_name: "Antigua and Barbuda", iso3: "ATG", iso2: "AG", calling_code: "1268"},
            Argentina: {short_name: "Argentina", iso3: "ARG", iso2: "AR", calling_code: "54"},
            Armenia: {short_name: "Armenia", iso3: "ARM", iso2: "AM", calling_code: "374"},
            Aruba: {short_name: "Aruba", iso3: "ABW", iso2: "AW", calling_code: "297"},
            Australia: {short_name: "Australia", iso3: "AUS", iso2: "AU", calling_code: "61"},
            Austria: {
                short_name: "Austria", iso3: "AUT",
                iso2: "AT", calling_code: "43"
            },
            Azerbaijan: {short_name: "Azerbaijan", iso3: "AZE", iso2: "AZ", calling_code: "994"},
            Bahamas: {short_name: "Bahamas", iso3: "BHS", iso2: "BS", calling_code: "1242"},
            Bahrain: {short_name: "Bahrain", iso3: "BHR", iso2: "BH", calling_code: "973"},
            Bangladesh: {short_name: "Bangladesh", iso3: "BGD", iso2: "BD", calling_code: "880"},
            Barbados: {short_name: "Barbados", iso3: "BRB", iso2: "BB", calling_code: "1246"},
            Belarus: {short_name: "Belarus", iso3: "BLR", iso2: "BY", calling_code: "375"},
            Belgium: {
                short_name: "Belgium",
                iso3: "BEL", iso2: "BE", calling_code: "32"
            },
            Belize: {short_name: "Belize", iso3: "BLZ", iso2: "BZ", calling_code: "501"},
            Benin: {short_name: "Benin", iso3: "BEN", iso2: "BJ", calling_code: "229"},
            Bermuda: {short_name: "Bermuda", iso3: "BMU", iso2: "BM", calling_code: "1441"},
            Bhutan: {short_name: "Bhutan", iso3: "BTN", iso2: "BT", calling_code: "975"},
            Bolivia: {short_name: "Bolivia", iso3: "BOL", iso2: "BO", calling_code: "591"},
            "Bosnia and Herzegovina": {
                short_name: "Bosnia and Herzegovina",
                iso3: "BIH",
                iso2: "BA",
                calling_code: "387"
            },
            Botswana: {
                short_name: "Botswana",
                iso3: "BWA", iso2: "BW", calling_code: "267"
            },
            "Bouvet Island": {short_name: "Bouvet Island", iso3: "BVT", iso2: "BV"},
            Brazil: {short_name: "Brazil", iso3: "BRA", iso2: "BR", calling_code: "55"},
            "British Indian Ocean Territory": {
                short_name: "British Indian Ocean Territory",
                iso3: "IOT",
                iso2: "IO",
                calling_code: "246"
            },
            "British Virgin Islands": {
                short_name: "British Virgin Islands",
                iso3: "VGB",
                iso2: "VG",
                calling_code: "1284"
            },
            Brunei: {short_name: "Brunei", iso3: "BRN", iso2: "BN", calling_code: "673"},
            Bulgaria: {
                short_name: "Bulgaria", iso3: "BGR",
                iso2: "BG", calling_code: "359"
            },
            "Burkina Faso": {short_name: "Burkina Faso", iso3: "BFA", iso2: "BF", calling_code: "226"},
            Burundi: {short_name: "Burundi", iso3: "BDI", iso2: "BI", calling_code: "257"},
            Cambodia: {short_name: "Cambodia", iso3: "KHM", iso2: "KH", calling_code: "855"},
            Cameroon: {short_name: "Cameroon", iso3: "CMR", iso2: "CM", calling_code: "237"},
            Canada: {short_name: "Canada", iso3: "CAN", iso2: "CA", calling_code: "1"},
            "Cape Verde": {short_name: "Cape Verde", iso3: "CPV", iso2: "CV", calling_code: "238"},
            "Caribbean Netherlands": {
                short_name: "Caribbean Netherlands",
                iso3: "BES", iso2: "BQ", calling_code: "599"
            },
            "Cayman Islands": {short_name: "Cayman Islands", iso3: "CYM", iso2: "KY", calling_code: "1345"},
            "Central African Republic": {
                short_name: "Central African Republic",
                iso3: "CAF",
                iso2: "CF",
                calling_code: "236"
            },
            Chad: {short_name: "Chad", iso3: "TCD", iso2: "TD", calling_code: "235"},
            Chile: {short_name: "Chile", iso3: "CHL", iso2: "CL", calling_code: "56"},
            China: {short_name: "China", iso3: "CHN", iso2: "CN", calling_code: "86"},
            "Christmas Island": {
                short_name: "Christmas Island", iso3: "CXR", iso2: "CX",
                calling_code: "61"
            },
            "Cocos (Keeling) Islands": {
                short_name: "Cocos (Keeling) Islands",
                iso3: "CCK",
                iso2: "CC",
                calling_code: "61"
            },
            Colombia: {short_name: "Colombia", iso3: "COL", iso2: "CO", calling_code: "57"},
            Comoros: {short_name: "Comoros", iso3: "COM", iso2: "KM", calling_code: "269"},
            "Cook Islands": {short_name: "Cook Islands", iso3: "COK", iso2: "CK", calling_code: "682"},
            "Costa Rica": {short_name: "Costa Rica", iso3: "CRI", iso2: "CR", calling_code: "506"},
            Croatia: {short_name: "Croatia", iso3: "HRV", iso2: "HR", calling_code: "385"},
            Cuba: {
                short_name: "Cuba",
                iso3: "CUB", iso2: "CU", calling_code: "53"
            },
            "Cura\u00e7ao": {short_name: "Cura\u00e7ao", iso3: "CUW", iso2: "CW", calling_code: "5999"},
            Cyprus: {short_name: "Cyprus", iso3: "CYP", iso2: "CY", calling_code: "357"},
            Czechia: {short_name: "Czechia", iso3: "CZE", iso2: "CZ", calling_code: "420"},
            "DR Congo": {short_name: "DR Congo", iso3: "COD", iso2: "CD", calling_code: "243"},
            Denmark: {short_name: "Denmark", iso3: "DNK", iso2: "DK", calling_code: "45"},
            Djibouti: {short_name: "Djibouti", iso3: "DJI", iso2: "DJ", calling_code: "253"},
            Dominica: {
                short_name: "Dominica",
                iso3: "DMA", iso2: "DM", calling_code: "1767"
            },
            "Dominican Republic": {short_name: "Dominican Republic", iso3: "DOM", iso2: "DO", calling_code: "1809"},
            Ecuador: {short_name: "Ecuador", iso3: "ECU", iso2: "EC", calling_code: "593"},
            Egypt: {short_name: "Egypt", iso3: "EGY", iso2: "EG", calling_code: "20"},
            "El Salvador": {short_name: "El Salvador", iso3: "SLV", iso2: "SV", calling_code: "503"},
            "Equatorial Guinea": {short_name: "Equatorial Guinea", iso3: "GNQ", iso2: "GQ", calling_code: "240"},
            Eritrea: {short_name: "Eritrea", iso3: "ERI", iso2: "ER", calling_code: "291"},
            Estonia: {short_name: "Estonia", iso3: "EST", iso2: "EE", calling_code: "372"},
            Ethiopia: {short_name: "Ethiopia", iso3: "ETH", iso2: "ET", calling_code: "251"},
            "Falkland Islands": {short_name: "Falkland Islands", iso3: "FLK", iso2: "FK", calling_code: "500"},
            "Faroe Islands": {short_name: "Faroe Islands", iso3: "FRO", iso2: "FO", calling_code: "298"},
            Fiji: {short_name: "Fiji", iso3: "FJI", iso2: "FJ", calling_code: "679"},
            Finland: {short_name: "Finland", iso3: "FIN", iso2: "FI", calling_code: "358"},
            France: {
                short_name: "France", iso3: "FRA", iso2: "FR",
                calling_code: "33"
            },
            "French Guiana": {short_name: "French Guiana", iso3: "GUF", iso2: "GF", calling_code: "594"},
            "French Polynesia": {short_name: "French Polynesia", iso3: "PYF", iso2: "PF", calling_code: "689"},
            "French Southern and Antarctic Lands": {
                short_name: "French Southern and Antarctic Lands",
                iso3: "ATF",
                iso2: "TF"
            },
            Gabon: {short_name: "Gabon", iso3: "GAB", iso2: "GA", calling_code: "241"},
            Gambia: {short_name: "Gambia", iso3: "GMB", iso2: "GM", calling_code: "220"},
            Georgia: {short_name: "Georgia", iso3: "GEO", iso2: "GE", calling_code: "995"},
            Germany: {short_name: "Germany", iso3: "DEU", iso2: "DE", calling_code: "49"},
            Ghana: {short_name: "Ghana", iso3: "GHA", iso2: "GH", calling_code: "233"},
            Gibraltar: {short_name: "Gibraltar", iso3: "GIB", iso2: "GI", calling_code: "350"},
            Greece: {short_name: "Greece", iso3: "GRC", iso2: "GR", calling_code: "30"},
            Greenland: {short_name: "Greenland", iso3: "GRL", iso2: "GL", calling_code: "299"},
            Grenada: {short_name: "Grenada", iso3: "GRD", iso2: "GD", calling_code: "1473"},
            Guadeloupe: {short_name: "Guadeloupe", iso3: "GLP", iso2: "GP", calling_code: "590"},
            Guam: {short_name: "Guam", iso3: "GUM", iso2: "GU", calling_code: "1671"},
            Guatemala: {short_name: "Guatemala", iso3: "GTM", iso2: "GT", calling_code: "502"},
            Guernsey: {short_name: "Guernsey", iso3: "GGY", iso2: "GG", calling_code: "44"},
            Guinea: {short_name: "Guinea", iso3: "GIN", iso2: "GN", calling_code: "224"},
            "Guinea-Bissau": {short_name: "Guinea-Bissau", iso3: "GNB", iso2: "GW", calling_code: "245"},
            Guyana: {short_name: "Guyana", iso3: "GUY", iso2: "GY", calling_code: "592"},
            Haiti: {short_name: "Haiti", iso3: "HTI", iso2: "HT", calling_code: "509"},
            "Heard Island and McDonald Islands": {
                short_name: "Heard Island and McDonald Islands",
                iso3: "HMD",
                iso2: "HM"
            },
            Honduras: {short_name: "Honduras", iso3: "HND", iso2: "HN", calling_code: "504"},
            "Hong Kong": {short_name: "Hong Kong", iso3: "HKG", iso2: "HK", calling_code: "852"},
            Hungary: {short_name: "Hungary", iso3: "HUN", iso2: "HU", calling_code: "36"},
            Iceland: {short_name: "Iceland", iso3: "ISL", iso2: "IS", calling_code: "354"},
            India: {short_name: "India", iso3: "IND", iso2: "IN", calling_code: "91"},
            Indonesia: {
                short_name: "Indonesia", iso3: "IDN",
                iso2: "ID", calling_code: "62"
            },
            Iran: {short_name: "Iran", iso3: "IRN", iso2: "IR", calling_code: "98"},
            Iraq: {short_name: "Iraq", iso3: "IRQ", iso2: "IQ", calling_code: "964"},
            Ireland: {short_name: "Ireland", iso3: "IRL", iso2: "IE", calling_code: "353"},
            "Isle of Man": {short_name: "Isle of Man", iso3: "IMN", iso2: "IM", calling_code: "44"},
            Israel: {short_name: "Israel", iso3: "ISR", iso2: "IL", calling_code: "972"},
            Italy: {short_name: "Italy", iso3: "ITA", iso2: "IT", calling_code: "39"},
            "Ivory Coast": {
                short_name: "Ivory Coast", iso3: "CIV", iso2: "CI",
                calling_code: "225"
            },
            Jamaica: {short_name: "Jamaica", iso3: "JAM", iso2: "JM", calling_code: "1876"},
            Japan: {short_name: "Japan", iso3: "JPN", iso2: "JP", calling_code: "81"},
            Jersey: {short_name: "Jersey", iso3: "JEY", iso2: "JE", calling_code: "44"},
            Jordan: {short_name: "Jordan", iso3: "JOR", iso2: "JO", calling_code: "962"},
            Kazakhstan: {short_name: "Kazakhstan", iso3: "KAZ", iso2: "KZ", calling_code: "76"},
            Kenya: {short_name: "Kenya", iso3: "KEN", iso2: "KE", calling_code: "254"},
            Kiribati: {short_name: "Kiribati", iso3: "KIR", iso2: "KI", calling_code: "686"},
            Kosovo: {short_name: "Kosovo", iso3: "UNK", iso2: "XK", calling_code: "383"},
            Kuwait: {short_name: "Kuwait", iso3: "KWT", iso2: "KW", calling_code: "965"},
            Kyrgyzstan: {short_name: "Kyrgyzstan", iso3: "KGZ", iso2: "KG", calling_code: "996"},
            Laos: {short_name: "Laos", iso3: "LAO", iso2: "LA", calling_code: "856"},
            Latvia: {short_name: "Latvia", iso3: "LVA", iso2: "LV", calling_code: "371"},
            Lebanon: {short_name: "Lebanon", iso3: "LBN", iso2: "LB", calling_code: "961"},
            Lesotho: {short_name: "Lesotho", iso3: "LSO", iso2: "LS", calling_code: "266"},
            Liberia: {
                short_name: "Liberia",
                iso3: "LBR", iso2: "LR", calling_code: "231"
            },
            Libya: {short_name: "Libya", iso3: "LBY", iso2: "LY", calling_code: "218"},
            Liechtenstein: {short_name: "Liechtenstein", iso3: "LIE", iso2: "LI", calling_code: "423"},
            Lithuania: {short_name: "Lithuania", iso3: "LTU", iso2: "LT", calling_code: "370"},
            Luxembourg: {short_name: "Luxembourg", iso3: "LUX", iso2: "LU", calling_code: "352"},
            Macau: {short_name: "Macau", iso3: "MAC", iso2: "MO", calling_code: "853"},
            Macedonia: {short_name: "Macedonia", iso3: "MKD", iso2: "MK", calling_code: "389"},
            Madagascar: {
                short_name: "Madagascar",
                iso3: "MDG", iso2: "MG", calling_code: "261"
            },
            Malawi: {short_name: "Malawi", iso3: "MWI", iso2: "MW", calling_code: "265"},
            Malaysia: {short_name: "Malaysia", iso3: "MYS", iso2: "MY", calling_code: "60"},
            Maldives: {short_name: "Maldives", iso3: "MDV", iso2: "MV", calling_code: "960"},
            Mali: {short_name: "Mali", iso3: "MLI", iso2: "ML", calling_code: "223"},
            Malta: {short_name: "Malta", iso3: "MLT", iso2: "MT", calling_code: "356"},
            "Marshall Islands": {short_name: "Marshall Islands", iso3: "MHL", iso2: "MH", calling_code: "692"},
            Martinique: {
                short_name: "Martinique",
                iso3: "MTQ", iso2: "MQ", calling_code: "596"
            },
            Mauritania: {short_name: "Mauritania", iso3: "MRT", iso2: "MR", calling_code: "222"},
            Mauritius: {short_name: "Mauritius", iso3: "MUS", iso2: "MU", calling_code: "230"},
            Mayotte: {short_name: "Mayotte", iso3: "MYT", iso2: "YT", calling_code: "262"},
            Mexico: {short_name: "Mexico", iso3: "MEX", iso2: "MX", calling_code: "52"},
            Micronesia: {short_name: "Micronesia", iso3: "FSM", iso2: "FM", calling_code: "691"},
            Moldova: {short_name: "Moldova", iso3: "MDA", iso2: "MD", calling_code: "373"},
            Monaco: {
                short_name: "Monaco",
                iso3: "MCO", iso2: "MC", calling_code: "377"
            },
            Mongolia: {short_name: "Mongolia", iso3: "MNG", iso2: "MN", calling_code: "976"},
            Montenegro: {short_name: "Montenegro", iso3: "MNE", iso2: "ME", calling_code: "382"},
            Montserrat: {short_name: "Montserrat", iso3: "MSR", iso2: "MS", calling_code: "1664"},
            Morocco: {short_name: "Morocco", iso3: "MAR", iso2: "MA", calling_code: "212"},
            Mozambique: {short_name: "Mozambique", iso3: "MOZ", iso2: "MZ", calling_code: "258"},
            "Myanmar [ Burma ]": {short_name: "Myanmar", iso3: "MMR", iso2: "MM", calling_code: "95"},
            Namibia: {
                short_name: "Namibia",
                iso3: "NAM", iso2: "NA", calling_code: "264"
            },
            Nauru: {short_name: "Nauru", iso3: "NRU", iso2: "NR", calling_code: "674"},
            Nepal: {short_name: "Nepal", iso3: "NPL", iso2: "NP", calling_code: "977"},
            Netherlands: {short_name: "Netherlands", iso3: "NLD", iso2: "NL", calling_code: "31"},
            "New Caledonia": {short_name: "New Caledonia", iso3: "NCL", iso2: "NC", calling_code: "687"},
            "New Zealand": {short_name: "New Zealand", iso3: "NZL", iso2: "NZ", calling_code: "64"},
            Nicaragua: {short_name: "Nicaragua", iso3: "NIC", iso2: "NI", calling_code: "505"},
            Niger: {
                short_name: "Niger",
                iso3: "NER", iso2: "NE", calling_code: "227"
            },
            Nigeria: {short_name: "Nigeria", iso3: "NGA", iso2: "NG", calling_code: "234"},
            Niue: {short_name: "Niue", iso3: "NIU", iso2: "NU", calling_code: "683"},
            "Norfolk Island": {short_name: "Norfolk Island", iso3: "NFK", iso2: "NF", calling_code: "672"},
            "North Korea": {short_name: "North Korea", iso3: "PRK", iso2: "KP", calling_code: "850"},
            "Northern Mariana Islands": {
                short_name: "Northern Mariana Islands",
                iso3: "MNP",
                iso2: "MP",
                calling_code: "1670"
            },
            Norway: {
                short_name: "Norway", iso3: "NOR", iso2: "NO",
                calling_code: "47"
            },
            Oman: {short_name: "Oman", iso3: "OMN", iso2: "OM", calling_code: "968"},
            Pakistan: {short_name: "Pakistan", iso3: "PAK", iso2: "PK", calling_code: "92"},
            Palau: {short_name: "Palau", iso3: "PLW", iso2: "PW", calling_code: "680"},
            Palestine: {short_name: "Palestine", iso3: "PSE", iso2: "PS", calling_code: "970"},
            Panama: {short_name: "Panama", iso3: "PAN", iso2: "PA", calling_code: "507"},
            "Papua New Guinea": {short_name: "Papua New Guinea", iso3: "PNG", iso2: "PG", calling_code: "675"},
            Paraguay: {
                short_name: "Paraguay", iso3: "PRY",
                iso2: "PY", calling_code: "595"
            },
            Peru: {short_name: "Peru", iso3: "PER", iso2: "PE", calling_code: "51"},
            Philippines: {short_name: "Philippines", iso3: "PHL", iso2: "PH", calling_code: "63"},
            "Pitcairn Islands": {short_name: "Pitcairn Islands", iso3: "PCN", iso2: "PN", calling_code: "64"},
            Poland: {short_name: "Poland", iso3: "POL", iso2: "PL", calling_code: "48"},
            Portugal: {short_name: "Portugal", iso3: "PRT", iso2: "PT", calling_code: "351"},
            "Puerto Rico": {short_name: "Puerto Rico", iso3: "PRI", iso2: "PR", calling_code: "1787"},
            Qatar: {
                short_name: "Qatar",
                iso3: "QAT", iso2: "QA", calling_code: "974"
            },
            "Republic of the Congo": {
                short_name: "Republic of the Congo",
                iso3: "COG",
                iso2: "CG",
                calling_code: "242"
            },
            Romania: {short_name: "Romania", iso3: "ROU", iso2: "RO", calling_code: "40"},
            Russia: {short_name: "Russia", iso3: "RUS", iso2: "RU", calling_code: "7"},
            Rwanda: {short_name: "Rwanda", iso3: "RWA", iso2: "RW", calling_code: "250"},
            "R\u00e9union": {short_name: "R\u00e9union", iso3: "REU", iso2: "RE", calling_code: "262"},
            "Saint Barth\u00e9lemy": {
                short_name: "Saint Barth\u00e9lemy", iso3: "BLM",
                iso2: "BL", calling_code: "590"
            },
            "Saint Helena, Ascension and Tristan da Cunha": {
                short_name: "Saint Helena, Ascension and Tristan da Cunha",
                iso3: "SHN",
                iso2: "SH",
                calling_code: "290"
            },
            "Saint Kitts and Nevis": {
                short_name: "Saint Kitts and Nevis",
                iso3: "KNA",
                iso2: "KN",
                calling_code: "1869"
            },
            "Saint Lucia": {short_name: "Saint Lucia", iso3: "LCA", iso2: "LC", calling_code: "1758"},
            "Saint Martin": {short_name: "Saint Martin", iso3: "MAF", iso2: "MF", calling_code: "590"},
            "Saint Pierre and Miquelon": {
                short_name: "Saint Pierre and Miquelon",
                iso3: "SPM", iso2: "PM", calling_code: "508"
            },
            "Saint Vincent and the Grenadines": {
                short_name: "Saint Vincent and the Grenadines",
                iso3: "VCT",
                iso2: "VC",
                calling_code: "1784"
            },
            Samoa: {short_name: "Samoa", iso3: "WSM", iso2: "WS", calling_code: "685"},
            "San Marino": {short_name: "San Marino", iso3: "SMR", iso2: "SM", calling_code: "378"},
            "Saudi Arabia": {short_name: "Saudi Arabia", iso3: "SAU", iso2: "SA", calling_code: "966"},
            Senegal: {short_name: "Senegal", iso3: "SEN", iso2: "SN", calling_code: "221"},
            Serbia: {
                short_name: "Serbia", iso3: "SRB",
                iso2: "RS", calling_code: "381"
            },
            Seychelles: {short_name: "Seychelles", iso3: "SYC", iso2: "SC", calling_code: "248"},
            "Sierra Leone": {short_name: "Sierra Leone", iso3: "SLE", iso2: "SL", calling_code: "232"},
            Singapore: {short_name: "Singapore", iso3: "SGP", iso2: "SG", calling_code: "65"},
            "Sint Maarten": {short_name: "Sint Maarten", iso3: "SXM", iso2: "SX", calling_code: "1721"},
            Slovakia: {short_name: "Slovakia", iso3: "SVK", iso2: "SK", calling_code: "421"},
            Slovenia: {short_name: "Slovenia", iso3: "SVN", iso2: "SI", calling_code: "386"},
            "Solomon Islands": {
                short_name: "Solomon Islands",
                iso3: "SLB", iso2: "SB", calling_code: "677"
            },
            Somalia: {short_name: "Somalia", iso3: "SOM", iso2: "SO", calling_code: "252"},
            "South Africa": {short_name: "South Africa", iso3: "ZAF", iso2: "ZA", calling_code: "27"},
            "South Georgia": {short_name: "South Georgia", iso3: "SGS", iso2: "GS", calling_code: "500"},
            "South Korea": {short_name: "South Korea", iso3: "KOR", iso2: "KR", calling_code: "82"},
            "South Sudan": {short_name: "South Sudan", iso3: "SSD", iso2: "SS", calling_code: "211"},
            Spain: {short_name: "Spain", iso3: "ESP", iso2: "ES", calling_code: "34"},
            "Sri Lanka": {short_name: "Sri Lanka", iso3: "LKA", iso2: "LK", calling_code: "94"},
            Sudan: {short_name: "Sudan", iso3: "SDN", iso2: "SD", calling_code: "249"},
            Suriname: {short_name: "Suriname", iso3: "SUR", iso2: "SR", calling_code: "597"},
            "Svalbard and Jan Mayen": {
                short_name: "Svalbard and Jan Mayen",
                iso3: "SJM",
                iso2: "SJ",
                calling_code: "4779"
            },
            Swaziland: {short_name: "Swaziland", iso3: "SWZ", iso2: "SZ", calling_code: "268"},
            Sweden: {short_name: "Sweden", iso3: "SWE", iso2: "SE", calling_code: "46"},
            Switzerland: {
                short_name: "Switzerland",
                iso3: "CHE", iso2: "CH", calling_code: "41"
            },
            Syria: {short_name: "Syria", iso3: "SYR", iso2: "SY", calling_code: "963"},
            "S\u00e3o Tom\u00e9 and Pr\u00edncipe": {
                short_name: "S\u00e3o Tom\u00e9 and Pr\u00edncipe",
                iso3: "STP",
                iso2: "ST",
                calling_code: "239"
            },
            Taiwan: {short_name: "Taiwan", iso3: "TWN", iso2: "TW", calling_code: "886"},
            Tajikistan: {short_name: "Tajikistan", iso3: "TJK", iso2: "TJ", calling_code: "992"},
            Tanzania: {short_name: "Tanzania", iso3: "TZA", iso2: "TZ", calling_code: "255"},
            Thailand: {
                short_name: "Thailand", iso3: "THA", iso2: "TH",
                calling_code: "66"
            },
            "Timor-Leste": {short_name: "Timor-Leste", iso3: "TLS", iso2: "TL", calling_code: "670"},
            Togo: {short_name: "Togo", iso3: "TGO", iso2: "TG", calling_code: "228"},
            Tokelau: {short_name: "Tokelau", iso3: "TKL", iso2: "TK", calling_code: "690"},
            Tonga: {short_name: "Tonga", iso3: "TON", iso2: "TO", calling_code: "676"},
            "Trinidad and Tobago": {short_name: "Trinidad and Tobago", iso3: "TTO", iso2: "TT", calling_code: "1868"},
            Tunisia: {short_name: "Tunisia", iso3: "TUN", iso2: "TN", calling_code: "216"},
            Turkey: {
                short_name: "Turkey", iso3: "TUR",
                iso2: "TR", calling_code: "90"
            },
            Turkmenistan: {short_name: "Turkmenistan", iso3: "TKM", iso2: "TM", calling_code: "993"},
            "Turks and Caicos Islands": {
                short_name: "Turks and Caicos Islands",
                iso3: "TCA",
                iso2: "TC",
                calling_code: "1649"
            },
            Tuvalu: {short_name: "Tuvalu", iso3: "TUV", iso2: "TV", calling_code: "688"},
            Uganda: {short_name: "Uganda", iso3: "UGA", iso2: "UG", calling_code: "256"},
            Ukraine: {short_name: "Ukraine", iso3: "UKR", iso2: "UA", calling_code: "380"},
            "United Arab Emirates": {
                short_name: "United Arab Emirates", iso3: "ARE", iso2: "AE",
                calling_code: "971"
            },
            "United Kingdom": {short_name: "United Kingdom", iso3: "GBR", iso2: "GB", calling_code: "44"},
            "United States": {short_name: "United States", iso3: "USA", iso2: "US", calling_code: "1"},
            "United States Minor Outlying Islands": {
                short_name: "United States Minor Outlying Islands",
                iso3: "UMI",
                iso2: "UM"
            },
            "United States Virgin Islands": {
                short_name: "United States Virgin Islands",
                iso3: "VIR",
                iso2: "VI",
                calling_code: "1340"
            },
            Uruguay: {short_name: "Uruguay", iso3: "URY", iso2: "UY", calling_code: "598"},
            Uzbekistan: {
                short_name: "Uzbekistan",
                iso3: "UZB", iso2: "UZ", calling_code: "998"
            },
            Vanuatu: {short_name: "Vanuatu", iso3: "VUT", iso2: "VU", calling_code: "678"},
            "Vatican City": {short_name: "Vatican City", iso3: "VAT", iso2: "VA", calling_code: "379"},
            Venezuela: {short_name: "Venezuela", iso3: "VEN", iso2: "VE", calling_code: "58"},
            Vietnam: {short_name: "Vietnam", iso3: "VNM", iso2: "VN", calling_code: "84"},
            "Wallis and Futuna": {short_name: "Wallis and Futuna", iso3: "WLF", iso2: "WF", calling_code: "681"},
            "Western Sahara": {short_name: "Western Sahara", iso3: "ESH", iso2: "EH", calling_code: "212"},
            Yemen: {short_name: "Yemen", iso3: "YEM", iso2: "YE", calling_code: "967"},
            Zambia: {short_name: "Zambia", iso3: "ZMB", iso2: "ZM", calling_code: "260"},
            Zimbabwe: {short_name: "Zimbabwe", iso3: "ZWE", iso2: "ZW", calling_code: "263"},
            "\u00c5land Islands": {short_name: "\u00c5land Islands", iso3: "ALA", iso2: "AX", calling_code: "358"}
        };
    k.country = {calling_code: "", short_name: ""};
    k.getCountryFromCookie = function () {
        var a = {calling_code: "", short_name: ""}, c = getCookie("country");
        "" == c ? f.get("/get-country").then(function (c) {
            c = c.data.country_name;
            a = k.countries_common[c];
            void 0 == a && (a = k.countries_official[c]);
            void 0 != a && (k.country = a)
        }) : (a = k.countries_common[c], void 0 == a && (a = k.countries_official[c]), void 0 == a && (a = {
            calling_code: "",
            short_name: ""
        }), k.country = a)
    };
    k.getCountryFromCookie();
    k.getLocationFromCookie = function () {
        var a = getCookie("location_ref");
        "" != a && (a = search("location_ref", a, k.locations), void 0 == a && (a = {location_ref: ""}), k.location = a)
    };
    k.fullname = getCookie("fullname");
    k.email = getCookie("email");
    k.phone = getCookie("phone");
    k.address = getCookie("address");
    k.comment = "";
    k.form_title = "Selling property in ";
    k.getFormElementValue = function (a, c) {
        var d = "";
        void 0 != a && void 0 != a[c] && void 0 != a[c].value && (d = a[c].value);
        return d
    };
    document.getElementById("bsform") && "home-valuation" === k.getFormElementValue(bsform, "type").toLowerCase() && n(function () {
        k.getLocationFromCookie()
    });
    k.setFormValueToCookie = function (a, c) {
        a = k.getFormElementValue(a, c);
        "" != a && (setCookie(c, a, gl_cookies_duration), "phone" === c && setCookie("country", k.country.short_name, gl_cookies_duration))
    };
    k.setLocationToCookie =
        function () {
            setCookie("location_ref", k.location.location_ref, gl_cookies_duration)
        };
    a.formValidation = function (c) {
        c = !0;
        a.bsform.$valid ? (k.setFormValueToCookie(bsform, "fullname"), k.setFormValueToCookie(bsform, "email"), k.setFormValueToCookie(bsform, "phone"), k.setFormValueToCookie(bsform, "address"), k.setLocationToCookie(), "cookies" === k.getFormElementValue(bsform, "type").toLowerCase() && (c = setCookieEmail(!1)), c ? grecaptcha.execute() : a.bsform.submitted = !0) : a.bsform.submitted = !0
    };
    k.goBack = function (a, c) {
        c = document.getElementById(c);
        void 0 != c && void 0 != c.type && void 0 != c.type.value && "cookies" === c.type.value.toLowerCase() && setCookie("rejectcookies", "1", 45);
        c = getCookie("cookiesprevurl");
        "" != c ? window.location.href = c + "?" : a ? window.history.go(-a) : window.history.back()
    }
}]);
"use strict";
myApp.filter("nearestK", function () {
    return function (a, c) {
        "undefined" === typeof c && (c = !1);
        if ("undefined" !== typeof a) {
            a += "";
            if (1E3 > a) return a;
            a = (a / 1E3).toFixed(0 !== a % 1E3);
            var d = "";
            c && (d = "\u20ac");
            return d + (a + "K")
        }
    }
});
myApp.filter("wordsStartsWith", function () {
    return function (a, c) {
        var d = [];
        if (void 0 != a) {
            var f = 0;
            a.forEach(function (a) {
                if (void 0 == a.name || void 0 == c.name) return d;
                var k = a.name.toLowerCase().startsWith(c.name.toLowerCase());
                k || void 0 == a.keywords || (k = a.keywords.toLowerCase().startsWith(c.name.toLowerCase()));
                if (k && (f++, d.push(a), 10 === f)) return d
            })
        }
        return d
    }
});
(function () {
    angular.module("angularScreenfull", [])
})();
(function () {
    function a(a) {
        return {
            restrict: "A", require: "ngsfFullscreen", controller: c, link: function (c, d, k, m) {
                k.ngsfFullscreen && "" !== k.ngsfFullscreen && a(k.ngsfFullscreen).assign(c, m)
            }
        }
    }

    function c(a, c, n, k) {
        function d() {
            var d = function () {
                k[f.isFullscreen() ? "addClass" : "removeClass"](n, "fullscreen").then(function () {
                    a.$emit("fullscreenchangecomplete")
                });
                a.$emit("fullscreenchange");
                a.$apply()
            };
            c[0].addEventListener(screenfull.raw.fullscreenchange, d);
            a.$on("$destroy", function () {
                c[0].removeEventListener(screenfull.raw.fullscreenchange,
                    d)
            })
        }

        var f = this;
        f.onFullscreenChange = function (c) {
            return a.$on("fullscreenchange", c)
        };
        f.onFullscreenChangeComplete = function (c) {
            return a.$on("fullscreenchangecomplete", c)
        };
        f.requestFullscreen = function () {
            return f.fullscreenEnabled() ? (screenfull.request(n[0]), a.$emit("fullscreenEnabled"), !0) : !1
        };
        f.removeFullscreen = function () {
            f.fullscreenEnabled() && f.isFullscreen() && f.toggleFullscreen()
        };
        f.toggleFullscreen = function () {
            if (f.fullscreenEnabled()) {
                var c = screenfull.isFullscreen;
                screenfull.toggle(n[0]);
                c ? a.$emit("fullscreenDisabled") :
                    a.$emit("fullscreenEnabled");
                return !0
            }
            return !1
        };
        f.isFullscreen = function () {
            return f.fullscreenEnabled() ? screenfull.isFullscreen : !1
        };
        f.fullscreenEnabled = function () {
            return "undefined" !== typeof screenfull ? screenfull.enabled : !1
        };
        f.fullscreenEnabled() && d()
    }

    angular.module("angularScreenfull").directive("ngsfFullscreen", a);
    a.$inject = ["$parse"];
    c.$inject = ["$scope", "$document", "$element", "$animate"]
})();
(function () {
    function a(a) {
        return {
            restrict: "A", require: "^ngsfFullscreen", link: function (c, f, n, k) {
                k.fullscreenEnabled() ? a.removeClass(f, "ng-hide") : a.addClass(f, "ng-hide")
            }
        }
    }

    angular.module("angularScreenfull").directive("showIfFullscreenEnabled", a);
    a.$inject = ["$animate"]
})();
(function () {
    function a(a) {
        return {
            restrict: "A", require: "^ngsfFullscreen", link: function (c, f, n, k) {
                var d = function () {
                    var c = k.isFullscreen();
                    if ("false" === n.showIfFullscreen || !1 === n.showIfFullscreen) c = !c;
                    c ? a.removeClass(f, "ng-hide") : a.addClass(f, "ng-hide")
                };
                d();
                d = k.onFullscreenChange(d);
                c.$on("$destroy", d)
            }
        }
    }

    angular.module("angularScreenfull").directive("showIfFullscreen", a);
    a.$inject = ["$animate"]
})();
(function () {
    angular.module("angularScreenfull").directive("ngsfToggleFullscreen", function () {
        return {
            restrict: "A", require: "^ngsfFullscreen", link: function (a, c, d, f) {
                c.on("click", function () {
                    f.toggleFullscreen()
                })
            }
        }
    })
})();
myApp.directive("bsMenu", ["$timeout", function (a) {
    return {
        restrict: "E",
        transclude: !0,
        scope: {
            value: "\x3d",
            direction: "\x3d",
            name: "\x3d",
            itemCount: "\x3d",
            cascade: "\x3d",
            scrollCount: "\x3dscrollCount",
            width: "\x3d",
            useSmallCase: "\x3d",
            noHoverHighlight: "\x3d",
            isVisible: "\x3d",
            useScrollBar: "\x3d",
            isFullWidth: "\x3d"
        },
        link: function (a, d) {
            var c = function () {
                var c = void 0 == a.itemCount || 0 == a.itemCount ? 1 : a.itemCount;
                void 0 != a.itemCount ? c = 0 < a.itemCount ? a.itemCount : 1 : (a.menu = d.children()[4].children[1], void 0 != a.menu &&
                (c = a.menu.children.length));
                void 0 != a.scrollCount && 0 < a.scrollCount && (c = c < a.scrollCount ? c : a.scrollCount);
                a.menuHeight = c * (a.cascade ? 32 : 40)
            };
            c();
            a.hideMenu = function (a) {
                n()
            };
            a.checkedChanged = function () {
                n()
            };
            var n = function () {
                c();
                var d = document.getElementById("button" + a.name);
                d.checked = !d.checked;
                a.isVisible = d.checked
            }
        },
        controller: ["$scope", function (a) {
            a.buttonWidth = 100 < a.width ? "" : "width: 100%;"
        }],
        template: '\x3cstyle\x3e#{{name}} {position: absolute;z-index: 25;box-shadow: 0px 6px 12px rgba(0,0,0,0.25);-webkit-box-shadow: 0px 6px 12px rgba(0,0,0,0.25);background-color: rgba(255,255,255,1);padding:0; min-width:{{width}}px;display: block; left: {{(isFullWidth \x3d\x3d true) ? \'15px\' : none}}; right: {{(isFullWidth \x3d\x3d true) ? \'15px\' : none}}; } #button{{name}}:checked ~ #{{name}}  {height: auto;} #{{name}} {height: 0; transition: height 200ms ease-in;-webkit-transition: height 200ms ease-in; overflow: auto;} #button{{name}} { padding: 0 35px 0 10px; {{ buttonWidth }}; margin: 6px 0; } .md-button.bs-menu-button-no-highlight:not([disabled]):hover { background-color: #E2EFFC; }#button{{name}} i {position: absolute; right:11px; top: 28%;} \x3c/style\x3e\x3cspan id\x3d"bsmenu{{name}}" ng-show\x3d"isVisible" ng-click\x3d"hideMenu();" class\x3d"md-menu-bg"\x3e\x3c/span\x3e\x3cinput type\x3d"checkbox" id\x3d"button{{name}}" class\x3d"bs-hide" \x3e\x3cbutton ng-click\x3d"checkedChanged()" id\x3d"button{{name}}" class\x3d"bs-md-button bs-menu-button {{useSmallCase \x3d\x3d true ? \'text-capitalize\' : \'\'}} {{noHoverHighlight \x3d\x3d true ? \'bs-menu-button-no-highlight\' : \'\'}}" aria-label\x3d"{{name}}"\x3e\t\t{{value}}\t\t\x3ci class\x3d"fa fa-chevron-down" aria-hidden\x3d"true" ng-show\x3d"!isVisible"\x3e\x3c/i\x3e\t\t\x3ci class\x3d"fa fa-chevron-up" aria-hidden\x3d"true" ng-show\x3d"isVisible"\x3e\x3c/i\x3e\x3c/button\x3e\x3cdiv id\x3d"{{name}}" class\x3d"md-menu" ng-transclude\x3e\x3c/div\x3e'
    }
}]);
myApp.directive("numbersOnly", function () {
    return {
        require: "ngModel", link: function (a, c, d, f) {
            f.$parsers.push(function (a) {
                if (a) {
                    var c = _.replace(a, /[^0-9]/g, "");
                    c !== a && (f.$setViewValue(c), f.$render());
                    return c
                }
                return null
            })
        }
    }
});
(function () {
    var a = "undefined" !== typeof module && module.exports,
        c = "undefined" !== typeof Element && "ALLOW_KEYBOARD_INPUT" in Element, d = function () {
            var a,
                c = ["requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror".split(" "), "webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror".split(" "), "webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror".split(" "),
                    "mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror".split(" "), "msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError".split(" ")],
                d = 0;
            var f = c.length;
            for (var e = {}; d < f; d++) if ((a = c[d]) && a[1] in document) {
                d = 0;
                for (f = a.length; d < f; d++) e[c[0][d]] = a[d];
                return e
            }
            return !1
        }(), f = {
            request: function (a) {
                var f = d.requestFullscreen;
                a = a || document.documentElement;
                if (/5\.1[\.\d]* Safari/.test(navigator.userAgent)) a[f]();
                else a[f](c && Element.ALLOW_KEYBOARD_INPUT)
            }, exit: function () {
                document[d.exitFullscreen]()
            }, toggle: function (a) {
                this.isFullscreen ? this.exit() : this.request(a)
            }, raw: d
        };
    d ? (Object.defineProperties(f, {
        isFullscreen: {
            get: function () {
                return !!document[d.fullscreenElement]
            }
        }, element: {
            enumerable: !0, get: function () {
                return document[d.fullscreenElement]
            }
        }, enabled: {
            enumerable: !0, get: function () {
                return !!document[d.fullscreenEnabled]
            }
        }
    }), a ? module.exports = f : window.screenfull = f) : a ? module.exports = !1 : window.screenfull = !1
})();
myApp.directive("realTimeCurrency", ["$filter", function (a) {
    function c(a) {
        if (!a) return 0;
        if (void 0 !== a.selectionStart) return a.selectionStart;
        if (document.selection) {
            a.focus();
            var c = document.selection.createRange();
            c.moveStart("character", a.value ? -a.value.length : 0);
            return c.text.length
        }
        return 0
    }

    function d(a, c) {
        if (!a) return 0;
        if (0 !== a.offsetWidth && 0 !== a.offsetHeight) if (a.setSelectionRange) a.focus(), setTimeout(function () {
            a.setSelectionRange(c, c)
        }, 0); else if (a.createTextRange) {
            var d = a.createTextRange();
            d.collapse(!0);
            d.moveEnd("character", c);
            d.moveStart("character", c);
            d.select()
        }
    }

    var f = /[^0-9]/g, n = "\u20ac", k = function (c) {
        return a("currency")(c, n, 0)
    };
    return {
        restrict: "A", require: "ngModel", scope: {currencySymbol: "@"}, link: function (a, l, e, h) {
            n = e.currencySymbol;
            h.$formatters.push(k);
            h.$parsers.push(function (a) {
                10 < a.length && (a = a.substr(0, 10));
                var e = h.$modelValue, g = parseFloat(a.replace(f, ""), 10);
                h.$viewValue = k(g);
                var m = c(l[0]);
                l.val(h.$viewValue);
                a = m + h.$viewValue.length - a.length;
                void 0 === e || isNaN(e);
                d(l[0],
                    a);
                return g
            })
        }
    }
}]);
myApp.directive("bsSubheader", function () {
    return {
        restrict: "E",
        scope: {text: "\x3d"},
        template: '\x3cstyle\x3e\t.bs-dir-subheader { display: block; font-size: 14px; font-weight: 500; line-height: 1em; margin: 0; } \t.bs-dir-subheader { background-color: rgb(250, 250, 250); color: rgba(0, 0, 0, 0.54); } \t.bs-dir-subheader .bs-dir-subheader-inner { display: block; padding: 16px; } \t.bs-dir-subheader .bs-dir-subheader-content { display: block; } \x3c/style\x3e\x3cdiv class\x3d"bs-dir-subheader _md"\x3e\t\x3cdiv class\x3d"bs-dir-subheader-inner"\x3e\t\t\x3cdiv class\x3d"bs-dir-subheader-content"\x3e\t\t\t\x3cspan\x3e{{ text }}\x3c/span\x3e\t\t\x3c/div\x3e\t\x3c/div\x3e\x3c/div\x3e'
    }
});
myApp.directive("autofocus", ["$timeout", function (a) {
    return function (c, d, f) {
        var n = d.find("input");
        a(function () {
            n[0].focus()
        }, 100)
    }
}]);
myApp.directive("typeahead", ["$filter", function (a) {
    return {
        scope: {items: "\x3d", selectedItems: "\x3d", control: "\x3d", controlid: "\x3d"},
        require: "ngModel",
        link: function (c, d, f, n) {
            function k(a) {
                void 0 == a && (a = !0);
                c.placeholder = 0 < c.list.length ? getLanguageText("TXT_TYPE_TO_ADD_MORE", "Type to add more") : c.defaultPlaceholder;
                a && c.$emit("regions-selected", {regions: c.list})
            }

            c.internalControl = c.control || {};
            var m = !1;
            c.focused = !1;
            c.list = [];
            n.$modelValue = [];
            c.filteredItems = c.items;
            c.selPos = 0;
            c.defaultPlaceholder = getLanguageText("TXT_REGION_PLACEHOLDER",
                "e.g. 'Coral Bay' or 'Paphos' or 'Ayia Napa' or property ID");
            c.placeholder = c.defaultPlaceholder;
            c.lastItemSearch = "";
            c.internalControl.setFocus = function () {
                var a = document.getElementById("typeahead");
                null === a.offsetParent && (a = document.getElementById("typeahead2"));
                a && setTimeout(function () {
                    a.focus()
                }, 0)
            };
            c.internalControl.getItemSearch = function () {
                return c.itemsearch
            };
            c.internalControl.resetItemSearch = function () {
                c.itemsearch = ""
            };
            c.focusIn = function (a) {
                void 0 == a && (a = 27);
                switch (a) {
                    case 8:
                    case 9:
                    case 13:
                    case 27:
                    case 38:
                    case 40:
                        c.focused =
                            void 0 == c.itemsearch || void 0 != c.itemsearch && ("" == c.itemsearch || 1 == c.itemsearch.length) ? !0 : !1;
                        break;
                    default:
                        c.focused = !1
                }
                c.focused ? c.focusOut() : (c.focused = !0, m = !1, c.selPos = 0)
            };
            c.focusOut = function () {
                m ? (angular.element(d).find("input")[0].focus(), m = !1) : c.focused = !1
            };
            c.getDisplayItemFirst = function (a) {
                var d = "";
                void 0 != a[f.displayitem] && (d = a[f.displayitem].toLowerCase().search("\\b" + c.itemsearch.toLowerCase()), d = 1 > d ? "" : a[f.displayitem].substring(0, d));
                return d
            };
            c.getDisplayItemInput = function (a) {
                var d = "";
                if (void 0 != a[f.displayitem]) {
                    d = void 0 == c.itemsearch ? 0 : c.itemsearch.length;
                    var h = a[f.displayitem].toLowerCase().search("\\b" + c.itemsearch.toLowerCase());
                    d = a[f.displayitem].substring(h, h + d)
                }
                return d
            };
            c.getDisplayItemRest = function (a) {
                var d = "";
                if (void 0 != a[f.displayitem]) {
                    d = void 0 == c.itemsearch ? 0 : c.itemsearch.length;
                    var h = a[f.displayitem].length,
                        l = a[f.displayitem].toLowerCase().search("\\b" + c.itemsearch.toLowerCase());
                    d = a[f.displayitem].substring(l + d, h)
                }
                return d
            };
            c.getDisplayTag = function (a) {
                if (void 0 ==
                    a) displayLocationModalAlert(c.lastItemSearch), c.removeItem(a); else return a[f.displaytag]
            };
            c.addItem = function (a) {
                c.list.push(a);
                c.lastItemSearch = c.itemsearch;
                c.itemsearch = "";
                c.selPos >= c.filteredItems.length - 1 && c.selPos--;
                n.$setViewValue(c.list);
                k()
            };
            c.removeItem = function (a, d) {
                void 0 == d && (d = !0);
                c.list.splice(c.list.indexOf(a), 1);
                d && (n.$setViewValue(c.list), k())
            };
            c.hover = function (a) {
                c.selPos = a
            };
            c.keyUp = function (a) {
                27 == a.keyCode && (c.lastItemSearch = c.itemsearch, c.itemsearch = "")
            };
            c.keyPress = function (a) {
                switch (a.keyCode) {
                    case 13:
                        -1 <
                        c.selPos && (c.addItem(c.filteredItems[c.selPos]), c.focusIn(a.keyCode));
                        break;
                    case 8:
                        (!c.itemsearch || 0 == c.itemsearch.length) && 0 < c.list.length && (c.list.pop(), k());
                        c.focusIn(a.keyCode);
                        break;
                    case 38:
                        0 < c.selPos && c.selPos--;
                        break;
                    case 40:
                        c.selPos < c.filteredItems.length - 1 && c.selPos++;
                        break;
                    default:
                        c.selPos = 0, c.focusIn(a.keyCode)
                }
            };
            c.$watch("items", function (a, c) {
            });
            c.$watch("selectedItems", function (d, e) {
                if (void 0 != d && void 0 != c.items && 0 < c.items.length && void 0 != c.selectedItems) {
                    c.list = [];
                    for (d = 0; d < c.selectedItems.length; d++) {
                        e =
                            c.selectedItems[d];
                        var f = a("filter")(c.items, {name: e.name, subname: e.subname, type: e.type});
                        if (0 < f.length) for (var l = 0; l < f.length; l++) if (f[l].name.toLowerCase() === e.name.toLowerCase() && f[l].subname.toLowerCase() === e.subname.toLowerCase()) {
                            c.list.push(f[l]);
                            break
                        }
                    }
                    n.$setViewValue(c.list);
                    k(!1)
                }
            })
        },
        template: '\x3cdiv class\x3d"typeahead"\x3e\t\t\t\x3cul data-ng-class\x3d"{\'focused\': focused}" \t\t\tclass\x3d"tags" data-ng-click\x3d"focusIn()"\x3e\t\t\t\x3cli class\x3d"tag" data-ng-repeat\x3d"s in list track by $index"\x3e\t\t\t{{getDisplayTag(s)}} \x3cspan data-ng-click\x3d"removeItem(s)"\x3ex\x3c/span\x3e\t\t\t\x3c/li\x3e \t\t\t\x3cli class\x3d"inputtag"\x3e\t\t\t\x3cinput data-ng-blur\x3d"focusOut()" focus\x3d"{{focused}}" type\x3d"text" data-ng-model\x3d"itemsearch" data-ng-keydown\x3d"keyPress($event)" data-ng-keyup\x3d"keyUp($event)" placeholder\x3d"{{placeholder}}" id\x3d"{{controlid}}" \x3e\t\t\t\x3c/li\x3e\t\t\t\x3c/ul\x3e\t\t\t\x3cul class\x3d"list" data-ng-show\x3d"focused"\x3e\t\t\t\x3cli data-ng-class\x3d"{\'active\': selPos \x3d\x3d $index}" data-ng-repeat\x3d"item in (filteredItems \x3d (items | wordsStartsWith: {name:itemsearch} | notin: list | limitTo: 10)) track by $index" data-ng-mousedown\x3d"addItem(item)" data-ng-mouseover\x3d"hover($index)"\x3e\t\t\t\x3cb\x3e{{getDisplayItemFirst(item)}}\x3c/b\x3e{{getDisplayItemInput(item)}}\x3cb\x3e{{getDisplayItemRest(item)}}\x3c/b\x3e\x3c/li\x3e\t\t\t\x3c/ul\x3e\t\t\t\x3c/div\x3e'
    }
}]).directive("focus",
    function () {
        return {
            restrict: "A", link: function (a, c, d) {
                d.$observe("focus", function (a) {
                    "true" == a && c[0].focus()
                })
            }
        }
    }).filter("notin", function () {
    return function (a, c) {
        return a.filter(function (a) {
            return -1 == c.indexOf(a)
        })
    }
});