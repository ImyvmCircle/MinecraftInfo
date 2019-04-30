$(function(){
    $.post("/pages/main/index/userinfo", {
        userid:$("#userid").val(),
        _xsrf: getCookie("_xsrf"),
    },function(datas){
        $("#userinfo").html(datas.user.uname);

        var generalstr = ''
        for(o in datas.action){
            aaa = datas.action[o];
            generalstr += aaa.lx + "=" + aaa.cs + "<br>"
        }
        $("#general").html(generalstr);

        var entitystr = ''
        var entitybystr = ''
        for(p in datas.action){
            aaa = datas.action[p];
            if(aaa.lx.startsWith('stat.killEntity')){
                entitystr += aaa.lx + "=" + aaa.cs + "<br>"
            }else if(aaa.lx.startsWith('stat.entityKilledBy')){
                entitybystr += aaa.lx + "=" + aaa.cs + "<br>"
            }
        }
        $("#entity").html(entitystr+"<br>"+entitybystr);

    },"json")
});


j = {"stat.useItem.minecraft.quartz_block": "石英块",
    "stat.killEntity.Bat": "你杀死了x只蝙蝠",
    "stat.entityKilledBy.Bat": "蝙蝠杀死了你x次"
}