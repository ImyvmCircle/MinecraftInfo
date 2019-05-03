$(function () {
    $.post("/pages/main/index/userinfo", {
        userid: $("#userid").val(),
        _xsrf: getCookie("_xsrf"),
    }, function (datas) {
        $("#userinfo").html(datas.user.uname + " " + datas.user.uuid);

        // var generalstr = ''
        // for(o in datas.action){
        //     aaa = datas.action[o];
        //     generalstr += aaa.lx + "=" + aaa.cs + "<br>"
        // }
        infos = JSON.parse(datas.stats[0].stats);

        custom = infos.stats['minecraft:custom'];

        var generalstr = "<div class=\"row\"><div class=\"col\"><div class=\"rank\"><ol style='margin-top: 10px; background: url(\"/static/images/bg.png\") repeat center;padding-top: 20px;padding-bottom: 20px;'>"


        for (i in custom) {
            generalstr += "<li style='list-style-type: square;'><div style=\"float: left;\">" + general_json.lang_cn["minecraft:custom"][i] + "</div><div style=\"float: right;\">" + custom[i] + "</div></li>"
        }
        generalstr += "</ol></div></div>"
        $("#general").html(generalstr);



        $("#items").html("<h5>Broken</h5> <br>" +
            JSON.stringify(infos.stats['minecraft:broken']).replace(/,/g, '<br>') +
            "<br> <h5>Crafted</h5> <br>" +
            JSON.stringify(infos.stats['minecraft:crafted']).replace(/,/g, '<br>') +
            "<br> <h5>Dropped</h5> <br>" +
            JSON.stringify(infos.stats['minecraft:dropped']).replace(/,/g, '<br>') +
            "<br> <h5>Mined</h5> <br>" +
            JSON.stringify(infos.stats['minecraft:mined']).replace(/,/g, '<br>') +
            "<br> <h5>Picked_up</h5> <br>" +
            JSON.stringify(infos.stats['minecraft:picked_up']).replace(/,/g, '<br>') +
            "<br> <h5>Used</h5> <br>" +
            JSON.stringify(infos.stats['minecraft:crafted']).replace(/,/g, '<br>'));

        $("#entity").html("<h5>Killed</h5> <br>" +
            JSON.stringify(infos.stats['minecraft:killed']).replace(/,/g, '<br>') +
            "<br> <h5>Killed_by</h5> <br>" +
            JSON.stringify(infos.stats['minecraft:killed_by']).replace(/,/g, '<br>'));

    }, "json")
});


general_json = {
    lang_en: {
        "minecraft:custom": {
            "minecraft:drop": "Items Dropped",
            "minecraft:jump": "Jumps",
            "minecraft:deaths": "Number of Deaths",
            "minecraft:mob_kills": "Mob Kills",
            "minecraft:fly_one_cm": "Distance Flown",
            "minecraft:leave_game": "Games quit",
            "minecraft:clean_armor": "Armor Pieces Cleaned",
            "minecraft:clean_banner": "Banners Cleaned",
            "minecraft:open_chest": "Chests Opened",
            "minecraft:pig_one_cm": "Distance by Pig",
            "minecraft:pot_flower": "Plants potted",
            "minecraft:sneak_time": "Sneak Time",
            "minecraft:boat_one_cm": "Distance by Boat",
            "minecraft:fall_one_cm": "Distance Fallen",
            "minecraft:fish_caught": "Fish Caught",
            "minecraft:use_cauldron": "Water Taken from Cauldron",
            "minecraft:swim_one_cm": "Distance Swum",
            "minecraft:walk_one_cm": "Distance Walked",
            "minecraft:animals_bred": "Animals Bred",
            "minecraft:climb_one_cm": "Distance Climbed",
            "minecraft:damage_dealt": "Damage Dealt",
            "minecraft:damage_taken": "Damage Taken",
            "minecraft:damage_absorbed": "Damage Absorbed",
            "minecraft:enchant_item": "Items Enchanted",
            "minecraft:horse_one_cm": "Distance by Horse",
            "minecraft:player_kills": "Player Kills",
            "minecraft:sleep_in_bed": "Times Slept in a Bed",
            "minecraft:aviate_one_cm": "Distance by Elytra",
            "minecraft:crouch_one_cm": "Distance Crouched",
            "minecraft:fill_cauldron": "Cauldrons Filled",
            "minecraft:play_record": "Records Played",
            "minecraft:sprint_one_cm": "Distance Sprinted",
            "minecraft:eat_cake_slice": "Cake Slices Eaten",
            "minecraft:inspect_hopper": "Hoppers Searched",
            "minecraft:play_noteblock": "Note Blocks played",
            "minecraft:tune_noteblock": "Note Blocks tuned",
            "minecraft:damage_resisted": "Damage Resisted",
            "minecraft:inspect_dropper": "Droppers Searched",
            "minecraft:minecart_one_cm": "Distance by Minecart",
            "minecraft:open_enderchest": "Ender Chests Opened",
            "minecraft:play_one_minute": "Minutes Played",
            "minecraft:time_since_rest": "Since Last Rest",
            "minecraft:open_shulker_box": "Shulker Boxes Opened",
            "minecraft:clean_shulker_box": "Shulker Box Cleaned",
            "minecraft:time_since_death": "Since Last Death",
            "minecraft:inspect_dispenser": "Dispensers Searched",
            "minecraft:talked_to_villager": "Talked to Villagers",
            "minecraft:interact_with_beacon": "Interactions with Beacon",
            "minecraft:traded_with_villager": "Traded with Villagers",
            "minecraft:walk_on_water_one_cm": "Distance walked on water",
            "minecraft:damage_dealt_absorbed": "Damage Dealt (Absorbed)",
            "minecraft:damage_dealt_resisted": "Damage Dealt (Resisted)",
            "minecraft:damage_blocked_by_shield": "Damage Blocked By Shield",
            "minecraft:interact_with_furnace": "Interactions with Furnace",
            "minecraft:trigger_trapped_chest": "Trapped Chests Triggered",
            "minecraft:walk_under_water_one_cm": "Distance Dove",
            "minecraft:interact_with_brewingstand": "Interactions with Brewing Stand",
            "minecraft:interact_with_crafting_table": "Interactions with Crafting Table"
        }
    },
    lang_cn: {
        "minecraft:custom": {
            "minecraft:drop": "物品掉落",
            "minecraft:jump": "跳跃次数",
            "minecraft:deaths": "死亡次数",
            "minecraft:mob_kills": "生物击杀数",
            "minecraft:fly_one_cm": "飞行距离",
            "minecraft:leave_game": "游戏退出次数",
            "minecraft:clean_armor": "清洗盔甲架次数",
            "minecraft:clean_banner": "清洗旗帜次数",
            "minecraft:open_chest": "开箱次数",
            "minecraft:pig_one_cm": "骑猪移动距离",
            "minecraft:pot_flower": "盆栽种植数",
            "minecraft:sneak_time": "潜行时间",
            "minecraft:boat_one_cm": "坐船移动距离",
            "minecraft:fall_one_cm": "摔落高度",
            "minecraft:fish_caught": "捕鱼数",
            "minecraft:use_cauldron": "从炼药锅取水次数",
            "minecraft:swim_one_cm": "游泳距离",
            "minecraft:walk_one_cm": "行走距离",
            "minecraft:animals_bred": "繁殖动物次数",
            "minecraft:climb_one_cm": "已攀爬距离",
            "minecraft:damage_dealt": "造成伤害",
            "minecraft:damage_taken": "受到伤害",
            "minecraft:damage_absorbed": "吸收的伤害",
            "minecraft:enchant_item": "物品附魔次数",
            "minecraft:horse_one_cm": "骑马移动距离",
            "minecraft:player_kills": "玩家击杀次数",
            "minecraft:sleep_in_bed": "躺在床上的次数",
            "minecraft:aviate_one_cm": "鞘翅滑行距离",
            "minecraft:crouch_one_cm": "潜行距离",
            "minecraft:fill_cauldron": "炼药锅装水次数",
            "minecraft:play_record": "播放唱片数",
            "minecraft:sprint_one_cm": "疾跑距离",
            "minecraft:eat_cake_slice": "吃掉的蛋糕片数",
            "minecraft:inspect_hopper": "搜查漏斗次数",
            "minecraft:play_noteblock": "音符盒播放次数",
            "minecraft:tune_noteblock": "音符盒调音次数",
            "minecraft:damage_resisted": "抵挡的伤害",
            "minecraft:inspect_dropper": "搜查投掷器次数",
            "minecraft:minecart_one_cm": "坐矿车移动距离",
            "minecraft:open_enderchest": "末影箱打开次数",
            "minecraft:play_one_minute": "游戏时间（分钟）",
            "minecraft:time_since_rest": "距上次休息",
            "minecraft:open_shulker_box": "打开潜影盒的次数",
            "minecraft:clean_shulker_box": "潜影盒清洗次数",
            "minecraft:time_since_death": "自上次死亡",
            "minecraft:inspect_dispenser": "搜查发射器次数",
            "minecraft:talked_to_villager": "村民交互次数",
            "minecraft:interact_with_beacon": "与信标互动次数",
            "minecraft:traded_with_villager": "村民交易次数",
            "minecraft:walk_on_water_one_cm": "水面行走距离",
            "minecraft:damage_dealt_absorbed": "造成伤害（被吸收）",
            "minecraft:damage_dealt_resisted": "造成伤害（被抵挡）",
            "minecraft:damage_blocked_by_shield": "盾牌抵挡的伤害",
            "minecraft:interact_with_furnace": "与熔炉互动次数",
            "minecraft:trigger_trapped_chest": "陷阱箱触发次数",
            "minecraft:walk_under_water_one_cm": "水下行走距离",
            "minecraft:interact_with_brewingstand": "与酿造台互动次数",
            "minecraft:interact_with_crafting_table": "与工作台互动次数"
        }
    }
}