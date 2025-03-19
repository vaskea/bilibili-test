/**
 * @return {boolean}
 */
function Jv(e) {
    return typeof e == "string"
}

function fr(e, t) {
    var n = typeof e == "number";
    return t ? n : n && !Number.isNaN(e) && Number.isFinite(e)
}

/**
 * @return {boolean}
 */
function Xl(e) {
    return e instanceof Array
}

function rg(e) {
    return e === void 0
}

/**
 * @return {boolean}
 */
function E8(e) {
    return typeof e == "boolean"
}

/**
 * @return {number}
 */
function T8(e, t, n) {
    var r = Math.random();
    if (!fr(e))
        return r;
    E8(t) && (n = t);
    var a;
    return !fr(t) || t === e ? a = r * e : a = r * (t - e) + e,
        n ? a : Math.floor(a)
}

function O8(e, t) {
    var n = Jv(e);
    n && (e = e.split("")),
    Xl(e) || (e = []);
    for (var r = e.slice(), a = -1; ++a < r.length; )
        for (var o = a, i = function() {
            var l = r[a]
                , u = r[o]
                , c = Xl(t)
                , f = !c && (t ? l == u : l === u) || c && t.some(function(d) {
                return l && u && !rg(l[d]) && l[d] === u[d]
            });
            f && r.splice(o--, 1)
        }; ++o < r.length; )
            i();
    return n ? r.join("") : r
}

function hee(e, t) {
    Jv(e) && (t = e),
    fr(e) || (e = 12);
    var n = "";
    !t || !Jv(t) ? n = zp + Xp : t === "[*]" ? n = zp + Zv + Xp + Xw : t.match(/0-9|a-z|A-Z|\[s\]/) ? (/0-9/.test(t) && (n += zp),
    /a-z/.test(t) && (n += Zv),
    /A-Z/.test(t) && (n += Xp),
    /\[s\]/.test(t) && (n += Xw),
        n += O8(t.replace(/0-9|a-z|A-Z|\[s\]/g, ""))) : n = t;
    for (var r = "", a = -1; ++a < e; )
        r += n[T8(n.length)];
    return r
}

module.exports = {
    zp : "0123456789",
    Zv : "abcdefghijklmnopqrstuvwxyz",
    Xp : "abcdefghijklmnopqrstuvwxyz".toUpperCase(),
    Xw : "~`!@#$%^&*()-_+=[]{};:\"',<.>/?",

    hee : function (e, t) {
        Jv(e) && (t = e),
        fr(e) || (e = 12);
        var n = "";
        !t || !Jv(t) ? n = zp + Xp : t === "[*]" ? n = zp + Zv + Xp + Xw : t.match(/0-9|a-z|A-Z|\[s\]/) ? (/0-9/.test(t) && (n += this.zp),
        /a-z/.test(t) && (n += this.Zv),
        /A-Z/.test(t) && (n += this.Xp),
        /\[s\]/.test(t) && (n += this.Xw),
            n += O8(t.replace(/0-9|a-z|A-Z|\[s\]/g, ""))) : n = t;
        for (var r = "", a = -1; ++a < e; )
            r += n[T8(n.length)];
        return r
    },

    O8 : function(e, t) {
        var n = Jv(e);
        n && (e = e.split("")),
        Xl(e) || (e = []);
        for (var r = e.slice(), a = -1; ++a < r.length; )
            for (var o = a, i = function() {
                var l = r[a]
                    , u = r[o]
                    , c = Xl(t)
                    , f = !c && (t ? l == u : l === u) || c && t.some(function(d) {
                    return l && u && !rg(l[d]) && l[d] === u[d]
                });
                f && r.splice(o--, 1)
            }; ++o < r.length; )
                i();
        return n ? r.join("") : r
    },
    /**
     * @return {number}
     */
    T8 : function(e, t, n) {
        var r = Math.random();
        if (!fr(e))
            return r;
        E8(t) && (n = t);
        var a;
        return !fr(t) || t === e ? a = r * e : a = r * (t - e) + e,
            n ? a : Math.floor(a)
    },

    /**
     * @return {boolean}
     */
    E8 : function (e) {
        return typeof e == "boolean"
    },

    rg: function (e) {
        return e === void 0
    },

    /**
     * @return {boolean}
     */
    Xl : function (e) {
        return e instanceof Array
    },

    fr : function(e, t) {
        var n = typeof e == "number";
        return t ? n : n && !Number.isNaN(e) && Number.isFinite(e)
    },

    /**
     * @return {boolean}
     */
    Jv : function (e) {
        return typeof e == "string"
    }
};
