$(function () {
    var body = (document.compatMode && document.compatMode == 'CSS1Compat') ? document.documentElement : document.body;
    var heigth = body.clientHeight - 186 - 50;

    $.post("/pages/main/index/userinfo", {
        userid: $("#userid").val(),
        _xsrf: getCookie("_xsrf"),
    }, function (datas) {
        $("#userinfo").html(datas.user.uname + " " + datas.user.uuid);

        infos = JSON.parse(datas.stats[0].stats);

        custom = infos.stats['minecraft:custom'];
        var generalstr = "<div class=\"table-responsive\" id='tablehead'><h4  style=\"text-align: center;color:#fff;\">通用</h4><div class=\"stats_content\"><div class= \"scrollbar\" style='overflow-y: scroll;height: " + (heigth) + "px;' id=\"style-scroll\"><table class=\"table\"><tbody>";
        for (i in custom) {
            generalstr += "<tr><td id =\"general_td\">" + general_json.lang_cn["minecraft:custom"][i] + "</td><td>" + custom[i] + "</td></tr>";
        }
        generalstr += "</tbody></table></div></div></div>";
        $("#general").html(generalstr);

        stats_icon.lang_cn[0].texture

        var itemsstr = "<div class\"table-responsive\" id='tablehead'><h4 style=\"text-align: center;color:#fff;\">物品</h4><div class=\"stats_content\"><div class= \"scrollbar\" style='overflow-y: scroll;height: " + (heigth) + "px;' id=\"style-scroll\"><table class=\"table\"><thead><tr><th scope=\"col\" style='word-break:break-word;'></th>" +
            "<th scope=\"col\" style='word-break:break-word;text-align: end;'><img src=" + stats_icon.lang_cn[0].texture + " class=\"icon-img\" title=\"" + stats_icon.lang_cn[0].name + "\" draggable=\"true\"></th>" +
            "<th scope=\"col\" style='word-break:break-word;text-align: end;'><img src=" + stats_icon.lang_cn[1].texture + " class=\"icon-img\" title=\"" + stats_icon.lang_cn[1].name + "\" draggable=\"true\"></th>" +
            "<th scope=\"col\" style='word-break:break-word;text-align: end;'><img src=" + stats_icon.lang_cn[2].texture + " class=\"icon-img\" title=\"" + stats_icon.lang_cn[2].name + "\" draggable=\"true\"></th>" +
            "<th scope=\"col\" style='word-break:break-word;text-align: end;'><img src=" + stats_icon.lang_cn[3].texture + " class=\"icon-img\" title=\"" + stats_icon.lang_cn[3].name + "\" draggable=\"true\"></th>" +
            "<th scope=\"col\" style='word-break:break-word;text-align: end;'><img src=" + stats_icon.lang_cn[4].texture + " class=\"icon-img\" title=\"" + stats_icon.lang_cn[4].name + "\" draggable=\"true\"></th>" +
            "<th scope=\"col\" style='word-break:break-word;text-align: end;'><img src=" + stats_icon.lang_cn[5].texture + " class=\"icon-img\" title=\"" + stats_icon.lang_cn[5].name + "\" draggable=\"true\"></th>" +
            "</tr></thead><tbody>";

        $.getJSON("/static/json/items.json", function (items_data) {
            var items = items_data.lang_en["minecraft:items"];

            for (i in items) {
                var item = items[i];
                var name = item.readable;
                var texture = item.texture;
                var icon_0 = infos.stats[stats_icon.lang_cn[0].id][item.id] || "-";
                var icon_1 = infos.stats[stats_icon.lang_cn[1].id][item.id] || "0";
                var icon_2 = infos.stats[stats_icon.lang_cn[2].id][item.id] || "0";
                var icon_3 = infos.stats[stats_icon.lang_cn[3].id][item.id] || "0";
                var icon_4 = infos.stats[stats_icon.lang_cn[4].id][item.id] || "0";
                var icon_5 = infos.stats[stats_icon.lang_cn[5].id][item.id] || "0";
                var mc_tip = "<div class=\"mc-tooltip\"><div class=\"mc-tooltip-title\">" + name + "</div><div class=\"mc-tooltip-description\" style='color: #aaaaaa;'>" + item.id + "</div></div>";
                itemsstr += "<tr><td scope=\"row\" style='width: 10%;'>" +
                    "<div class=\"mc-container\" style='position: relative;width: 32px;'><img src=" + texture + " class=\"ingredient-img\" draggable=\"true\">" + mc_tip + "</div>" +
                    "</td><td style='width: 15%;'>" + icon_0 +
                    "</td><td style='width: 15%;'>" + icon_1 +
                    "</td><td style='width: 15%;'>" + icon_2 +
                    "</td><td style='width: 15%;'>" + icon_3 +
                    "</td><td style='width: 15%;'>" + icon_4 +
                    "</td><td style='width: 15%;'>" + icon_5 + "</td></tr>";
            }
            itemsstr += "</tbody></table></div></div></div>";
            $("#items").html(itemsstr);
        });

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

stats_icon = {
    lang_en: [
        {
            'name': 'Mined',
            'id': 'minecraft:mined',
            'texture': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAF+mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTA1LTA3VDE3OjE4OjU5KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTA1LTA3VDE3OjE4OjU5KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wNS0wN1QxNzoxODo1OSswODowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozYjE1MDY1Yy0zYzcxLWE3NGEtYWVkYy03MWVjMzQ0MTdmYTkiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo1NzgxN2I2ZS03ZjBhLWY4NGUtYWFjMi1lYTlkMDQxYTI0MGYiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpiOTc5ZGIxMC1kMTc1LWZmNGYtODFjYi1jNGU5NTBiODRhYWUiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmI5NzlkYjEwLWQxNzUtZmY0Zi04MWNiLWM0ZTk1MGI4NGFhZSIgc3RFdnQ6d2hlbj0iMjAxOS0wNS0wN1QxNzoxODo1OSswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDozYjE1MDY1Yy0zYzcxLWE3NGEtYWVkYy03MWVjMzQ0MTdmYTkiIHN0RXZ0OndoZW49IjIwMTktMDUtMDdUMTc6MTg6NTkrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz694CGgAAAA10lEQVQokZWRIQ+CQBTH/+dmYDY3diSIWJ0b2fDmRnF+CjXwFUgkO8Fm8wNYDBCkGbUdlVkIFjfymXDAHVP/7d3b737v3TF0QkSye5amKWvWrYKIZJIkyPMcZVkCADjnCIIAw9cdjmVgfypYC9KZwjAEAFyPaxzOD4iiUhglvmdKIYTMskzWFw6+AY5lYLWYAQDiOAYRyV7I90w5n45xuT0hiopFUfTZUwvVhr4dFKhraPY45yr0zeC6rmrYbVw5sUfK59apX481DbqRtPnFoGS7tP8DALwBNT1kNy20U5wAAAAASUVORK5CYII='
        },
        {
            'name': 'Broken',
            'id': 'minecraft:broken',
            'texture': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAALCAYAAACgR9dcAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF+mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTA1LTA3VDE3OjE4OjIzKzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTA1LTA3VDE3OjE4OjIzKzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wNS0wN1QxNzoxODoyMyswODowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3NjJlMGE5MC0xMDE3LTExNDYtODY0Ni00MTVjYjhmZGE2ZDEiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDplOGM1MzhmYi03ZjliLWZlNDEtODM1Mi04MGYxOTQ1ODA5MDgiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphNmI3M2FmMS03YWY2LWZkNDktYWJjZC1jOTQzNDI5MTMyYjMiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmE2YjczYWYxLTdhZjYtZmQ0OS1hYmNkLWM5NDM0MjkxMzJiMyIgc3RFdnQ6d2hlbj0iMjAxOS0wNS0wN1QxNzoxODoyMyswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo3NjJlMGE5MC0xMDE3LTExNDYtODY0Ni00MTVjYjhmZGE2ZDEiIHN0RXZ0OndoZW49IjIwMTktMDUtMDdUMTc6MTg6MjMrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5r0mHqAAAApElEQVQokaWQsQ2DMBBF7bSuEZ1bewImOAoa1oBVmCgNRdymSesVrEhZ4aVyZAgIkfzupP/f/TulCo29pWsq8jwNDnVG3hp+Cv6tXHvsLeszDoNlXW8N0+DIp4jINqhrKsbefoxbAIAFwFtD3rgOlp4QAjHGJeAoKCIAxBi/AJfr/alvj9fuH+Z51m3bKuecqutapZR2vbvKDQBCCIgI+iygbPQGRSl2QkZdn4AAAAAASUVORK5CYII='
        },
        {
            'name': 'Crafted',
            'id': 'minecraft:crafted',
            'texture': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAOCAYAAAAbvf3sAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF+mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTA1LTA3VDE3OjIwOjIwKzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTA1LTA3VDE3OjIwOjIwKzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wNS0wN1QxNzoyMDoyMCswODowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozODdhNTdkMS04NTgzLTFmNDQtYTI4OC02MzRmZmIwYzdlZTQiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDozNWE2ZjM0NC1lOTQyLTdjNGUtOTgyYS05MjE0Yjc3M2JhN2EiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxZWU0ZWQ1YS04YWYwLTBkNGQtYjM0OC1kMDViNjZhNjIxZGIiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjFlZTRlZDVhLThhZjAtMGQ0ZC1iMzQ4LWQwNWI2NmE2MjFkYiIgc3RFdnQ6d2hlbj0iMjAxOS0wNS0wN1QxNzoyMDoyMCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDozODdhNTdkMS04NTgzLTFmNDQtYTI4OC02MzRmZmIwYzdlZTQiIHN0RXZ0OndoZW49IjIwMTktMDUtMDdUMTc6MjA6MjArMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5zZyFVAAAAq0lEQVQokWNgYGBg+A8FH96++M9AALDAGB/fvWR4/OQxQ5ABw399XXYMhRcv/2RYd4GBkQVd4tFDBoZHD3/itwFmOgMDA8OZ9wyMhJxFEmCsKCsg6FEUJ33++Jnhy/cveBW9ePYKoYEYhTv37If7iwXdBGSArBAGMAT0dbXhfrp4+SqGPBMu5ygpKaBoRnESDGSnJ/9/9uIFLjNQnYRL8b17D1CcxoIuSQgAAIfqTxb8ejqaAAAAAElFTkSuQmCC'
        },
        {
            'name': 'Used',
            'id': 'minecraft:used',
            'texture': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAANCAYAAACZ3F9/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAF+mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTA1LTA3VDE3OjE5OjMyKzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTA1LTA3VDE3OjE5OjMyKzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wNS0wN1QxNzoxOTozMiswODowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozMjBlNWU5MS1lYTgxLTg0NDMtYjhmYi1hNDJlNGU1NTZkMzEiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoxOGE3YzU2Ni1lN2NjLWMyNGQtYWJjNS0wYjRhNTQ1NjM1MGEiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1NWVjYTY1MC03MTIyLWQ3NGEtOWUxZi03ZDFjMTkyMjFlZTciIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjU1ZWNhNjUwLTcxMjItZDc0YS05ZTFmLTdkMWMxOTIyMWVlNyIgc3RFdnQ6d2hlbj0iMjAxOS0wNS0wN1QxNzoxOTozMiswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDozMjBlNWU5MS1lYTgxLTg0NDMtYjhmYi1hNDJlNGU1NTZkMzEiIHN0RXZ0OndoZW49IjIwMTktMDUtMDdUMTc6MTk6MzIrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4tkzI1AAABXklEQVQokX2RvW4TQRRGz8zO7NpOKqOkIpQIjESBI9HRonQpU/ImiIbHyUOQCmuNDAjHtQmNI28T1ll7fz6K3UVG0XKk0dXMnTu65475cBGp7HkMBZYIyoxCh/TNhtxZSgVgtwSFxShjWw24/pHiggq+zn5TkzVxSxfPX+4AcPfNweUM03l7j/djr3kSYgNbASBJ69WNJCn+/En7lyWpjTavUy7wFfPk4MHLz54c6OSox8/b7O8eIHC2LnQMGA3vSG5/EU9jTsewThIWy9QslikA08mVFsvUTCdXIsuAHm7TDOTR8eNOx9PXb0wbP74LBWD7Re3Y5deyXt0IINs0jjnmgWPr17LvWfq8LpQPGA3TTr+WeBprsUxNWEQCcCV1q2/Pzv/7j21etmk13FlePY0Yv6hU2B6wxVQ5Uh8JisOCaGeoZKlyy7frFPA4ecOX77XDPAkB36wWz7/U8/gDtW+3uNMQXOEAAAAASUVORK5CYII='
        },
        {
            'name': 'Picked up',
            'id': 'minecraft:picked_up',
            'texture': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF+mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTA1LTA3VDE3OjE3OjI0KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTA1LTA3VDE3OjE3OjI0KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wNS0wN1QxNzoxNzoyNCswODowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpjYTNhMDYxYy0xOWQ0LThlNGEtOWZhYS04ZjMzYTYxZmE2MWEiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpkMDM4NmZkNy1hYTAzLWY4NGItYTc1ZS0wZjFlMGY4MzY1YjAiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpmNTE0NzIxNC1jOTljLWMyNDEtOTQ0MS0wMDFjYWY5ZGI5ZDQiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmY1MTQ3MjE0LWM5OWMtYzI0MS05NDQxLTAwMWNhZjlkYjlkNCIgc3RFdnQ6d2hlbj0iMjAxOS0wNS0wN1QxNzoxNzoyNCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpjYTNhMDYxYy0xOWQ0LThlNGEtOWZhYS04ZjMzYTYxZmE2MWEiIHN0RXZ0OndoZW49IjIwMTktMDUtMDdUMTc6MTc6MjQrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6GDoTxAAABAUlEQVQokX1SMW6EQAwc7x1INBeJJlwVbRPaUIZq23wiUj6QT+QL6fOMtFSkpCbNiQquQUqFxClymvPiRSiuvLbHHo+XAICZUeYx42qn4QKbRdBvALBZhLqdiYhAAPB4H7Er0qWwn2CPyabfDRO+vi9kmNkHxbZAVTP6PDPDrIu1adBdlgS0SSaWecyStMckYCDWDRPqdiYA2AvIFSk+Ps++QIskU16eblHmMdftTHspcADcw8ED355/cXPY4fV9iQdURdGqGaGVFTG21K6aEUY6+OWvu7kiDUDrFYzNokB2fQot0Kmf4IrUx4zuKPQk2Q0LeH0uku+mv9l/PgD0P0x/gI6jFUhsQmUAAAAASUVORK5CYII='
        },
        {
            'name': 'Dropped',
            'id': 'minecraft:dropped',
            'texture': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAANCAYAAACZ3F9/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAF+mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTA1LTA3VDE3OjE2OjQ0KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTA1LTA3VDE3OjE2OjQ0KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wNS0wN1QxNzoxNjo0NCswODowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDplZTI1OGIyYi1kMDk1LTBhNGQtYWM1OS01Njg1MWM0ZmZlYmYiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpkMTFiYzY4Ni01ODIxLTBhNGEtOTgyNi1jNTQ0MTZlYmFhNWMiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxNTJjMWEwZi0zZDYxLTA2NDMtYjlkZi04N2NkYTVhM2Y3YWYiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjE1MmMxYTBmLTNkNjEtMDY0My1iOWRmLTg3Y2RhNWEzZjdhZiIgc3RFdnQ6d2hlbj0iMjAxOS0wNS0wN1QxNzoxNjo0NCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDplZTI1OGIyYi1kMDk1LTBhNGQtYWM1OS01Njg1MWM0ZmZlYmYiIHN0RXZ0OndoZW49IjIwMTktMDUtMDdUMTc6MTY6NDQrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4nGRosAAABiklEQVQokW2SwWoTYRSFvzudZFd0kplJiynYUCRYLEIXhbhzUYr0BVwprn0k932BLFSydRYFRRTK0IW4sWGS2CizcOgUjovfmUylZ3fu5f73nPNfA5BEE6090/U6+Dlcf8W4BT6AmdXD9sTEAxgG0BlAso70QWZ2c95rbmztmUbHq6HLbzB86Or/b/SapJuFJGNIl46nS0jPYCvvs9ELJWmlrLlxsxfpcbRg4kHl8RB4z4qXX5xsa8qsmi8jeJdG7AZz3t4BNmG0D8lHYAokmF8FMnruPKVLeDOFQbvNxHMeKwwD6OzDaY7Mf4R2DlyjCqQzgNMT5znbWTA6Xj3KFLYv+vjdLCQ9Wzg5/wJhDNt5nz8UHP2GyclNzynCM+D1XQ//HJIx+OfwLAdDXJUl4DxvfY94EcFGCEVR4F+VJZLqQA6HcyT4PC/4efnLelFHsKTVbvMjg0+zgGy2cNcQh4FePUWD+/d0tIviKKg/XBJhN1Ach+rFUV2v7yjsBvLW1jCMbDa/9T6b+At2dqksipqKzgAAAABJRU5ErkJggg=='
        }
    ],
    lang_cn: [
        {
            'name': '开采次数',
            'id': 'minecraft:mined',
            'texture': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF+mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTA1LTA3VDE3OjA4OjU4KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wNS0wN1QyMjoyNToyOCswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOS0wNS0wN1QyMjoyNToyOCswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDphYTRkNTNkMC01NzEzLTE2NGItOWUyMy1lMzhiOWI4OTZhZGMiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo0NmIyMzhlZS0xOTUxLWY4NDUtODI5NS00ZDJjNmVhYjE0NDAiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0MWZhMThhOS05OThkLWFkNGUtYjc5Zi00MzJjNDM4OTc4YmMiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjQxZmExOGE5LTk5OGQtYWQ0ZS1iNzlmLTQzMmM0Mzg5NzhiYyIgc3RFdnQ6d2hlbj0iMjAxOS0wNS0wN1QxNzowODo1OCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDphYTRkNTNkMC01NzEzLTE2NGItOWUyMy1lMzhiOWI4OTZhZGMiIHN0RXZ0OndoZW49IjIwMTktMDUtMDdUMjI6MjU6MjgrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5pAVNbAAABEUlEQVQ4ja2UIU/EQBCF35JDXHCXNHvqThZLSKoRDUkN4VcAon+hqgpfcQ7HDziDaAV1SHBb22AqMCSnH2ou3bbXbkJHNdmZb99706wiiTnqbBYKgIV8KKWsgzAMe1KLorCa2m4W3WaB5HmOqqrQNA0AQGuNOI55/vuF7XqJ3b62oEqoU4qSJAEAfLw+4OXtG6Y+KCtfknAJPAo8GmNYliXlEpkl6RZ2FHjcrpe4v70GAGRZ1lM8CYoCjzdXK7x//sDUB5Wm6TE3Z5AokUzGek+CukraZ1prN9CUEt/3+0PdrUWBx+dHn5ebi5OrHNqa9R+JkiE7Q9UWcLQ2lolTibSnu82onbFZy9p/a7ZnZDbQH7T4qVdn2xdgAAAAAElFTkSuQmCC'
        },
        {
            'name': '损坏次数',
            'id': 'minecraft:broken',
            'texture': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAASCAYAAAC9+TVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF+mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTA1LTA3VDE3OjA4OjU4KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wNS0wN1QyMjoyOTo1MSswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOS0wNS0wN1QyMjoyOTo1MSswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpkZmJmYTU2My1jYTY4LTUwNGEtYThjZS0xNDhkM2FjZjMyNDEiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo3OWVjMDczNy1lYjNmLWY5NDUtOTEzOC1kY2U2YmY5ZTIyY2QiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyNjA1ZGM1NS00NDY1LWFiNDctOTExOC00NTJmZGI2MDNjMzAiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjI2MDVkYzU1LTQ0NjUtYWI0Ny05MTE4LTQ1MmZkYjYwM2MzMCIgc3RFdnQ6d2hlbj0iMjAxOS0wNS0wN1QxNzowODo1OCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpkZmJmYTU2My1jYTY4LTUwNGEtYThjZS0xNDhkM2FjZjMyNDEiIHN0RXZ0OndoZW49IjIwMTktMDUtMDdUMjI6Mjk6NTErMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4ifd4SAAAA5UlEQVQ4jc2TIW7DMBhGf5eaVYrCTG1aElzggJBco7lKb9BzjIwE1HSkhcZl0bRd4Q3FSps0WRXSD1r20/c9yQqQtdmsJrwVRB6dNLWhKrJ0eDzYWWnAGCIi4ozmP4BZyCsBpp30c5ra8DhvKiNIVWTsd1sRETl93NT5+iP73TZN9N6PgcM5VZHR1Ib+QR9nNMeDxRkNwBCUnDijqYosXZyq7IwmhECM8Q6UIEsA7z0AMcYRKIn9/PpW58vvU3Ft26qyLMVaK3meS9d1z50spW8EEEJITRQgSqmXQMOGCbI27/OL/wCpAKxTmfKrkwAAAABJRU5ErkJggg=='
        },
        {
            'name': '合成次数',
            'id': 'minecraft:crafted',
            'texture': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF+mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTA1LTA3VDE3OjA4OjU4KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wNS0wN1QyMjoyMDo0NyswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOS0wNS0wN1QyMjoyMDo0NyswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpkNGMwZTIzOS1jZGQ0LWU0NDEtOWE4OC0zYmE1MjM0N2YyZmIiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDphMGUwNjIzNy02NDE4LWYwNGEtODU1ZC04YTExOTQ4ZjA1N2YiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4NTJkMDM4Yi02OWIyLWNmNDMtOTQyZi1jOGQ3OTljNTBhYzYiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjg1MmQwMzhiLTY5YjItY2Y0My05NDJmLWM4ZDc5OWM1MGFjNiIgc3RFdnQ6d2hlbj0iMjAxOS0wNS0wN1QxNzowODo1OCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpkNGMwZTIzOS1jZGQ0LWU0NDEtOWE4OC0zYmE1MjM0N2YyZmIiIHN0RXZ0OndoZW49IjIwMTktMDUtMDdUMjI6MjA6NDcrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6OeXTYAAAA4klEQVQ4ja2UvQrCMBSFT0TwNaSrlPosvoKDg4uT+FTuguALOFiKa7GtlCj4U1qQTtfFlsQmacQeyNCk57snN20YEaEL9TqhAAAR1ePzTEREzxtvjSp6+6oXsvsFyTnBZAzy3EFj3Q9KrA9g4pwSVCmOgDgq24KpQVUaANg/5KomMfHUGLP2AQBEr5RotVz8+i3UlSVQnuUoXoXRydOrct7YbBVgs90p998A6SrqAJWMzfbcUb3oB8cGSPRa/SKOM5SgKml7NJ9NKeXcpo4+kQrSlkqbKAxP1mmAr2b/o87uozep62/YVT0N9wAAAABJRU5ErkJggg=='
        },
        {
            'name': '使用次数',
            'id': 'minecraft:used',
            'texture': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF+mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTA1LTA3VDE3OjA4OjU4KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wNS0wN1QyMjoyNDowOCswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOS0wNS0wN1QyMjoyNDowOCswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4MjM4ZjNlZC0xOTFiLTU3NDItYTQ0OS1iZjA0OTkxYzAyZmEiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoyMGMzZDdkZi0zNjMwLTk2NGMtODQzMC0zZTlhMDZiYjg5N2YiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4YzY1ZjJjMC1hYjE3LTUwNDctYTdiZi1mNWE1NzE4YWRiNzciPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjhjNjVmMmMwLWFiMTctNTA0Ny1hN2JmLWY1YTU3MThhZGI3NyIgc3RFdnQ6d2hlbj0iMjAxOS0wNS0wN1QxNzowODo1OCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo4MjM4ZjNlZC0xOTFiLTU3NDItYTQ0OS1iZjA0OTkxYzAyZmEiIHN0RXZ0OndoZW49IjIwMTktMDUtMDdUMjI6MjQ6MDgrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5jB+kwAAABh0lEQVQ4jc2UPU/bUBiFn3sdJw4wUcEEHSsKUgeC1K1rxcbKxj9BYuDf0B9RpiKHTxUyB7qA4qU4OPHHYYiNcI3DAlLP8uq17z16z7nnXiOJt4R9U7b3IGw8b/a2PaWeiyHB0oI0ItEcbTMkblhSOWBHOInFKGKUzXD1O+TgROZFQieDs9P7vIvyOqqd5vOX8fQJH/L64xRTWfkCdjuuLoNm6VvJQ8dmAEjS4PZGkuT/+lmKgfJYSJKNqwkpS3YzLoPZyqKVj7NaXvC4voueegCnUT3TRrmZYXX+L8HdH/yuz0YHBkFArx+aXj8EoHt0qF4/NN2jQxFFgFdPOMwP4sPiUq2HG1+/maLu7zQrmkszt5OJh3X+FRjc3gggGr7iYYypeFj4V+C5j6kbTyeU67A6H9b6V8Dv+ur1Q9NMWpURS4QpE8nfN7em5rD4L/uK5ObYsv6pRWctU2I9YITJYqQ2EiRzCa2xIZMliy3nVyHgTpNsOL6YeDS5Ae4/G8qboZpZ89+/h496TMA8PhxPaAAAAABJRU5ErkJggg=='
        },
        {
            'name': '拾起个数',
            'id': 'minecraft:picked_up',
            'texture': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF+mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTA1LTA3VDE3OjA4OjU4KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wNS0wN1QyMjoyNzo1MiswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOS0wNS0wN1QyMjoyNzo1MiswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpmZTZhNDcyNS0zMWZhLTEzNDUtOTVlYy01OWRiZGEwMDNmM2EiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpjYWY5NjNkNy04ZjcwLWYwNDgtYWJmNS02MDFmMWI1NTAwM2MiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozMzIwMTBmYi1mNmQ4LWEyNDEtODliMC05NzFiN2QyYzUzZTEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjMzMjAxMGZiLWY2ZDgtYTI0MS04OWIwLTk3MWI3ZDJjNTNlMSIgc3RFdnQ6d2hlbj0iMjAxOS0wNS0wN1QxNzowODo1OCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpmZTZhNDcyNS0zMWZhLTEzNDUtOTVlYy01OWRiZGEwMDNmM2EiIHN0RXZ0OndoZW49IjIwMTktMDUtMDdUMjI6Mjc6NTIrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6iIlYlAAABKklEQVQ4jc2UsU7DMBCGfwOJlKVIXXCnypPXdvWUlZdA4gV4CV6BncdgzdQ1c6eok8MSiclSK3QMcFfbWF3IwE32xffZ/392FBFhjriahTIn6IYHSikQEZytReswnmB0hXgOAEZX2O2PimsSEAA4W1O7Xcp87QPMqvmG+AD+NvjAG6pf0pg8+CCgGMLjrp+Q1ySgvLiU6/oJa90kMjlU3n5na+LFZtUkJ+Q4jAG7/VHFuaJHr2/vUsC7G13JKR7v7+BsTTEsAQ3jCS2AdrMQ0PPDJ24X13h6OecvSuPTdP2EuHNsbpxj87t+EoliNu8gZv54026XCSSXzCEgo6ukzXHrY8P5PuVNKD4RlsOLD+MZVroeQNZ+Z2uKn8WlMQD4D1JF0F/i//1GvgAzJK1GfFidtAAAAABJRU5ErkJggg=='
        },
        {
            'name': '丢弃个数',
            'id': 'minecraft:dropped',
            'texture': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF+mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTA1LTA3VDE3OjA4OjU4KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wNS0wN1QyMjoyODo0NiswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOS0wNS0wN1QyMjoyODo0NiswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpiM2RmOTAyMC02YjI1LTgzNGYtYjc1OC03ZGU1NjQ2ZjNhNTMiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo0NWQ1ODIwOS04NzU3LWUzNGYtYTZhOS1mZDkwMWFiZTFiZjAiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyMmRlMGRjMS1kY2ZkLWJiNGQtOGNjNC04ZGMwOGViMDYzMjAiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjIyZGUwZGMxLWRjZmQtYmI0ZC04Y2M0LThkYzA4ZWIwNjMyMCIgc3RFdnQ6d2hlbj0iMjAxOS0wNS0wN1QxNzowODo1OCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpiM2RmOTAyMC02YjI1LTgzNGYtYjc1OC03ZGU1NjQ2ZjNhNTMiIHN0RXZ0OndoZW49IjIwMTktMDUtMDdUMjI6Mjg6NDYrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4mqPybAAABsklEQVQ4ja2UsWrbUBSGv6PIXoJpJUtxQpOhHoJIwRSyOXsoxS/QqX2APFL2voCHtnjoUg2FhtJCEBlCKZggyY1aNFREgdPhVpJdOxmKz6R7OOe/5//uQaKqrCOstaisU8iuPkSEf222BqK3HbBzuP2KrBKoeuz55LyYHImyD4EDbh/CDqofVERW6i1aq0RaA9HhqBG5voTgwOTvsraSUTf2CMcQZeYcZRCdw16+y3bPU1VdwiC1lTlbOz1fn/ozJhZUjI6BdzTn8ouxWfffB/iVD28jnydOypsHwA4MDyH8BFwBYdO/CPtIdPjCMIkyOL2CfrvNxDKMqggccA/hY46Cec2aUWsgGhwYEbdviocj+N6Z0o09ovMGfJRBODbMqqgnMsUzM/5fwIzhcb7Lbwqe/YLJ60VmEQ2WeiIBTh5a2BfmNvsCnucgKDdlCRhme998Xvqw7UFRFMsT3ZQlqloDPg5SVOFzWvDj+qf0fFcho9VuM43hLHGIk1m9nQvPv+U5OhpkvL98xP7mlLPEIUkzAbOsvueqtbGBIMRJWueXhAC8rrNUfF/cuUf/G2v7jfwBkSfLdRaSag0AAAAASUVORK5CYII='
        }
    ]
}
