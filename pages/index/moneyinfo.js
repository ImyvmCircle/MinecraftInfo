var rows, page, pager;

$(function () {
    //分页控件
    pager = new PagerView('pageination', "userlist");
    rows = pager.size;
    page = pager.index;
    pager.onclick = function (index, size) {
        page = index;
        loaddata();
    };

    loaddata();
});


function loaddata() {
    $.post("/pages/main/index/moneyinfo", {
        _xsrf: getCookie("_xsrf"),
        uuid: $("#uuid").val(),
        rows: rows,
        page: page
    }, function (datas) {
        pager.loaddata(datas);
        pager.render();
    }, "json")
}

