/**
 * Created by gsj82 on 2018-6-12 0012.
 */

var rows, page, pager;
$(function () {
    //分页控件
    pager = new PagerView('pageination',"userlist");
    rows = pager.size;
    page = pager.index;
    pager.onclick = function (index,size) {
        page = index;
        loaddata();
    };
    loaddata();
});

function jx() {
    $.post("/pages/main/index/jx", {
        _xsrf: getCookie("_xsrf")
    }, function (datas) {
        alert(datas.message)
    }, "json")
}

function loaddata(value) {
    $.post("/pages/main/index/loaduserlist", {_xsrf: getCookie("_xsrf"), rows:rows, page:page, value:value}, function (datas) {
        pager.loaddata(datas);
        pager.render();
    },"json")
}

function SearchuUser(value) {
    loaddata(value)
}

function lookinfo(objid) {
    alert(objid)
}