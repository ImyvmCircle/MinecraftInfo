$(function(){
    $.post("/pages/main/index/userinfo", {
        userid:$("#userid").val(),
        _xsrf: getCookie("_xsrf"),
    },function(datas){
        $("#userinfo").html(datas.user.uname);
        var str = ''
        for(o in datas.action){
            aaa = datas.action[o];
            str += aaa.lx + "=" + aaa.cs + "<br>"
        }
        // $("#actioninfo").html(str);
    },"json")
});


j = {"stat.useItem.minecraft.quartz_block": "石英块"
}