/*!
 * Last Source
 * https://github.com/loevgaard/last-source
 *
 * Copyright 2017 Joachim Loevgaard
 * Released under the MIT license
 */
;(function(window, document){
    "use strict";

    var settings = {
        sources: [
            {queryParameter: 'utm_source', 'value': 'self'},
            {queryParameter: 'gclid', 'value': 'adwords'}
        ],
        cookie: {
            name: 'last_source',
            expires: 30
        }
    };

    function lastSource(){
        var obj = {};

        /**
         * @param {String} value
         * @return {{}}
         */
        obj.setLastSource = function (value) {
            var date = new Date();
            date.setTime(date.getTime() + (settings.cookie.expires * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toUTCString();
            document.cookie = settings.cookie.name + "=" + value + expires + "; path=/";

            return obj;
        };

        /**
         * @return {String|*}
         */
        obj.getLastSource = function () {
            var nameEQ = settings.cookie.name + "=";
            var cookies = document.cookie.split(';');

            for(var i=0; i < cookies.length; i++) {
                var cookie = cookies[i];
                while (cookie.charAt(0) == ' ') {
                    cookie = cookie.substring(1, cookie.length);
                }
                if (cookie.indexOf(nameEQ) == 0) {
                    return cookie.substring(nameEQ.length, cookie.length);
                }
            }
            return null;
        };

        /**
         * @return {{}}
         */
        obj.checkSource = function () {
            var source;

            for(var i = 0; i < settings.sources.length; i++) {
                source = settings.sources[i];

                var val = getQueryParameterByName(source.queryParameter);
                if(val) {
                    if(source.value != 'self') {
                        if(typeof(source.value) === 'function') {
                            val = source.value.apply(val);
                        } else {
                            val = source.value;
                        }
                    }
                    obj.setLastSource(val);
                }
            }

            return obj;
        };

        /**
         * @param {String} name
         * @return {{}}
         */
        obj.setCookieName = function (name) {
            settings.cookie.name = name;
            return obj;
        };

        /**
         * @param {Number} expires
         * @return {{}}
         */
        obj.setExpires = function (expires) {
            settings.cookie.expires = parseInt(expires);
            return obj;
        };

        /**
         * @param {String} queryParameter
         * @param {String|function|undefined} value
         * @return {{}}
         */
        obj.addSource = function (queryParameter, value) {
            for(var i = 0; i < settings.sources.length; i++) {
                if(settings.sources[i].queryParameter == queryParameter) {
                    return obj;
                }
            }
            settings.sources.push({
                queryParameter: queryParameter,
                value: value ? value : 'self'
            });

            return obj;
        };

        obj.checkSource();
        return obj;
    }

    if(typeof(window.lastSource) === 'undefined'){
        window.lastSource = lastSource();
    }

    function getQueryParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
})(window, document);