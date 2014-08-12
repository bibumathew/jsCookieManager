(function ($, document) {
    var defaultOptions = {
        expires: 0,
        path: '/',
        domain: document.location,
        secure: false
    };

    var setCookie = function (name, value, options, type) {
        if (!$.trim(value).length && type !== 'remove') {
            throw new Error("Cookie value cannot be empty" + type);
        }
        options = getOptions(type, options);
        var cookieValue = encodeURIComponent(value)
        if (options.expires > 0) {
            var toDay = new Date();
            var expire = new Date(toDay.getTime() + options.expires * 1000)
            console.log(expire)
            options.expires = expire.toGMTString();
        }

        document.cookie = name + "=" + cookieValue + ((options.expires == 0) ? "" : ("; expires=" + options.expires)) ;

        return name;

    };

    var getOptions = function (type, options) {
        options = $.extend({}, defaultOptions, options || {});
        switch (type) {
            case 'sensitive':
                options.secure = true;
                break;
            case 'session':
                options.expires = 0;
                break;
            case 'remove':
                options.expires = 'Thu, 01 Jan 1970 00:00:01 GMT';
                break;
        }
        return options;
    };
    $.cookieManager = {
        setPublicCookie: function (name, value, options) {
            setCookie(name, value, options, 'public');
        },
        setSensitiveCookie: function (name, value, options) {
            setCookie(name, value, options, 'sensitive');
        },

        setSessionCookie: function (name, value, options) {
            setCookie(name, value, options, 'session');

        },
        removeCookie: function (name, options) {
            setCookie(name, '', options, 'remove');
        },
        getCookie: function (name) {
            var re = new RegExp(name + "=([^;]+)");
            var value = re.exec(document.cookie);
            console.log(value);
            return (value != null) ? decodeURIComponent(value[1]) : null;
        },
        getAllCookies: function () {
            var pairs = document.cookie.split(";");
            var cookies = {};
            for (var i = 0; i < pairs.length; i++) {
                var pair = pairs[i].split("=");
                cookies[pair[0]] = decodeURIComponent(pair[1]);
            }
            return cookies;
        },
        getCookieCount: function () {
            return Object.keys(this.getAllCookies()).length;
        }
    }
})(jQuery, document);