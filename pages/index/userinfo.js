$(function(){
    $.post("/pages/main/index/userinfo", {
        userid:$("#userid").val(),
        _xsrf: getCookie("_xsrf"),
    },function(datas){
        $("#userinfo").html(datas.user.uname+" "+datas.user.uuid);

        // var generalstr = ''
        // for(o in datas.action){
        //     aaa = datas.action[o];
        //     generalstr += aaa.lx + "=" + aaa.cs + "<br>"
        // }
        infos = JSON.parse(datas.stats[0].stats);
        $("#general").html("<h5>Custom</h5> <br>"+
        JSON.stringify(infos.stats['minecraft:custom']).replace(/,/g, '<br>'));
        $("#items").html("<h5>Broken</h5> <br>"+
        JSON.stringify(infos.stats['minecraft:broken']).replace(/,/g, '<br>')+
        "<br> <h5>Crafted</h5> <br>"+
        JSON.stringify(infos.stats['minecraft:crafted']).replace(/,/g, '<br>')+
        "<br> <h5>Dropped</h5> <br>"+
        JSON.stringify(infos.stats['minecraft:dropped']).replace(/,/g, '<br>')+
        "<br> <h5>Mined</h5> <br>"+
        JSON.stringify(infos.stats['minecraft:mined']).replace(/,/g, '<br>')+
        "<br> <h5>Picked_up</h5> <br>"+
        JSON.stringify(infos.stats['minecraft:picked_up']).replace(/,/g, '<br>')+
        "<br> <h5>Used</h5> <br>"+
        JSON.stringify(infos.stats['minecraft:crafted']).replace(/,/g, '<br>'));

        $("#entity").html("<h5>Killed</h5> <br>"+
        JSON.stringify(infos.stats['minecraft:killed']).replace(/,/g, '<br>')+
        "<br> <h5>Killed_by</h5> <br>"+
        JSON.stringify(infos.stats['minecraft:killed_by']).replace(/,/g, '<br>'));

    },"json")
});


j = {"stat.useItem.minecraft.quartz_block": "石英块",
    "stat.killEntity.Bat": "你杀死了x只蝙蝠",
    "stat.entityKilledBy.Bat": "蝙蝠杀死了你x次"
}