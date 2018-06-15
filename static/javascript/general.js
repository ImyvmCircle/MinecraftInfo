/**
 * Created by gsj82 on 2018-6-12 0012.
 */

function getCookie(name) {
    var c = document.cookie.match("\\b" + name + "=([^;]*)\\b");
    return c ? c[1] : undefined;
}