/**
 * Created by gsj82 on 2018-6-12 0012.
 */

var rows, page, pager, menoypager, mrows, mpage;
$(function () {
    $('#myTabs a').click(function (e) {
        e.preventDefault();
        $(this).tab('show')
    });

    //分页控件
    pager = new PagerView('pageination', "userlist");
    rows = pager.size;
    page = pager.index;
    pager.onclick = function (index, size) {
        page = index;
        loaddata();
    };

    menoypager = new PagerView('menoypageination', "menoyuserlist");
    mrows = menoypager.size;
    mpage = menoypager.index;
    menoypager.onclick = function (index, size) {
        mpage = index;
        loaddatamenoy();
    };

    loaddata();
    loaddatamenoy();
});

function jx() {
    $.post("/pages/main/index/jx", {
        _xsrf: getCookie("_xsrf")
    }, function (datas) {
        alert(datas.message)
    }, "json")
}

function loaddata(value) {
    $.post("/pages/main/index/loaduserlist", {
        _xsrf: getCookie("_xsrf"),
        rows: rows,
        page: page,
        value: value
    }, function (datas) {
        pager.loaddata(datas);
        pager.render();
    }, "json")
}


function loaddatamenoy(value, lx, fx) {
    $.post("/pages/main/index/loadmenoyuserlist", {
        _xsrf: getCookie("_xsrf"),
        rows: mrows,
        page: mpage,
        lx: lx,
        fx: fx,
        value: value
    }, function (datas) {
        menoypager.loaddata(datas);
        menoypager.render();
    }, "json")
}


function SearchuUser(value) {
    loaddata(value);
    loaddatamenoy(value);
}

function lookinfo(objid) {
    alert(objid)
}


function lookmenoy(uuid) {
    window.location = '/pages/main/index/moneyinfo?uuid=' + uuid;
}


var pxobj = {"money": "", "monout": "", "monin": ""};

function px(lx, obj) {
    pxobj[lx] = pxobj[lx] === "" ? 'desc' : "";
    loaddatamenoy($("#input-none").val(),lx, pxobj[lx]);
    $(obj).parents().find('th>span').each(function (i, e) {
        $(e).html("");
    });
    $(obj).find("span").html('&nbsp;' + (pxobj[lx]===""? "▲":"▼"));
}


function test() {
    $.post("/pages/main/input/test", {_xsrf: getCookie("_xsrf")}, function (datas) {
        alert(datas.message);
    },"json")
}