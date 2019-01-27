# -*- coding: utf-8 -*-
from general.project_general import get_serial, JsonEncoder
from site_config.dblink import saveData, sqlread, sqlreadone
import sys
import time
import json
import datetime
import os
from site_config.BaseHandler import RequestHandler
from site_config.setting import STATS_DIR, PLAYERDATA_DIR, ADV_DIR
from nbtlib import nbt


class JXHandler(RequestHandler):
    def setpost(self, *args, **kwargs):
        datas = loaduser(self)
        return self.write(json.dumps(datas, cls=JsonEncoder))

    def setget(self, *args, **kwargs):
        datas = loaduser(self)
        return self.write(json.dumps(datas, cls=JsonEncoder))


def loaduser(self=None):
    def timestr(obj):
        objfloat = float(str(obj)[:10] + '.' + str(obj)[10:-1])
        timeobj = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(objfloat))
        return timeobj
    
    webhook = "https://discordapp.com/api/webhooks/538778171991130122/Rpud1WNgU4Ygteg78TRAHiHJB_D1B6RcZgDh9Lzfippv8c0JW1ZBFvHVebSTwqFeFv5w"
    items = []
    dailyname = []
    newname = []
    activeuser = {}
    if os.path.isdir(PLAYERDATA_DIR):
        dt = datetime.datetime.now()
        users = {}
        [users.setdefault(d["uuid"], d) for d in sqlread("select * from t_user")]
        total = len(os.listdir(PLAYERDATA_DIR))
        for nn, fp in enumerate(os.listdir(PLAYERDATA_DIR)):
            uuid = str(fp.split(".")[0])
            file = nbt.load(os.path.join(PLAYERDATA_DIR, fp))
            userobj = file.root["bukkit"]
            firstLogout = timestr(userobj["lastPlayed"])
            if uuid in users:
                if str(users[uuid]["lastplayed"]) != firstLogout:
                    uname = sqlreadone("select player from inventory.eco_accounts where player_uuid='%s'" % uuid)
                    if "player" not in uname:
                        uname = userobj["lastKnownName"]
                        newname.append(uname)
                    else:
                        uname = uname["player"]
                    item = [{"tablename": "t_user", "type": "update", "itemid": "uuid", "value": uuid},
                            {"name": "lastplayed", "value": firstLogout},
                            {"name": "uname", "value": uname},
                            {"name": "updatetime", "value": dt},
                            ]
                    activeuser.setdefault(uuid, "")
                    dailyname.append(uname)
                else:
                    continue
            else:
                uname = sqlreadone("select player from inventory.eco_accounts where player_uuid='%s'" % uuid)

                if "player" not in uname:
                    uname = userobj["lastKnownName"]
                else:
                    uname = uname["player"]
                firstLogin = timestr(userobj["firstPlayed"])
                item = [{"tablename": "t_user", "type": "insert", "name": "id", "value": get_serial()},
                        {"name": "uuid", "value": str(fp.split(".")[0])},
                        {"name": "uname", "value": uname},
                        {"name": "nameinfo", "value": str([])},
                        {"name": "firstplayed", "value": firstLogin},
                        {"name": "lastplayed", "value": firstLogout},
                        {"name": "updatetime", "value": dt},
                        ]
                activeuser.setdefault(uuid, "")
            items.append(item)
            sys.stdout.write("\r共" + str(total) + "个用户, 当前读取第" + str(nn) + "个用户,用户名" + str(uname))
            sys.stdout.flush()
        if len(items) <=0:
            message = "昨日暂无统计信息！"
            send(message, webhook)
            return {"state": "400", "message": "无更新数据！"}
        value = saveData(items)
        if value:
            saveuser(activeuser, self)
            if len(newname)==0:
                message = "昨日活跃玩家: "+", ".join(str(x) for x in dailyname)+", 暂无新玩家加入。"
            else:
                message = "昨日活跃玩家: "+", ".join(str(x) for x in dailyname)+", 其中新玩家为："+", ".join(str(x) for x in newname)
            send(message, webhook)
        else:
            if self is not None:
                return {"state": "300", "message": "保存失败！"}


def saveuser(activeuser, self=None):
    items = []
    dt = datetime.datetime.now()
    users = {}
    [users.setdefault(d["uuid"], d) for d in sqlread("select * from t_user")]
    if os.path.isdir(ADV_DIR):
        total = len(os.listdir(ADV_DIR))
        for nn, fp in enumerate(os.listdir(ADV_DIR)):
            uuid = str(fp.split(".")[0])
            if uuid not in activeuser:
                continue
            if uuid not in users:
                print('\n' + uuid + "进度无用户资料")
                continue
            uname = users[uuid]["uname"]
            userid = users[uuid]["id"]
            with open(os.path.join(ADV_DIR, fp)) as file:
                infos = json.loads(file.read())
                for num, i in enumerate(infos):
                    ss = sqlreadone("select * from t_user_success where pid='%s' and lx='%s'" % (userid, i))
                    if "id" not in ss:
                        ssid = get_serial()
                        item = [{"tablename": "t_user_success", "type": "insert", "name": "id", "value": ssid},
                                {"name": "pid", "value": userid},
                                {"name": "lx", "value": i},
                                {"name": "zt", "value": int(infos[i]["done"])},
                                ]
                    else:
                        ssid = ss["id"]
                        item = [{"tablename": "t_user_success", "type": "update", "itemid": "id", "value": ssid},
                                {"name": "zt", "value": int(infos[i]["done"])},
                                ]
                    items.append(item)
                    criteria = infos[i]["criteria"]
                    for j in criteria:
                        cc = sqlreadone("select * from t_user_success_criteria where pid='%s' and tj='%s'" % (ssid, j))
                        if "id" not in cc:
                            item = [
                                {"tablename": "t_user_success_criteria", "type": "insert", "name": "id",
                                 "value": get_serial()},
                                {"name": "pid", "value": ssid},
                                {"name": "tj", "value": j},
                                {"name": "sj", "value": criteria[j]},
                            ]
                        else:
                            item = [
                                {"tablename": "t_user_success_criteria", "type": "update", "itemid": "id", "value": cc["id"]},
                                {"name": "sj", "value": criteria[j]},
                                ]
                        items.append(item)
                sys.stdout.write("\r共" + str(total) + "个用户, 当前读取第" + str(nn) + "个用户,用户名" + str(uname) +
                                 ", 共" + str(len(infos)) + "条成就")
                sys.stdout.flush()

    if os.path.isdir(STATS_DIR):
        total = len(os.listdir(STATS_DIR))
        for nn, fp in enumerate(os.listdir(STATS_DIR)):
            uuid = str(fp.split(".")[0])
            if uuid not in activeuser:
                continue
            if uuid not in users:
                print('\n' + uuid + "属性无用户资料")
                continue
            uname = users[uuid]["uname"]
            userid = users[uuid]["id"]
            with open(os.path.join(STATS_DIR, fp)) as file:
                infos = json.loads(file.read())
                for num, i in enumerate(infos):
                    ss = sqlreadone("select * from t_user_action where pid='%s' and lx='%s'" % (userid, i))
                    if "id" not in ss:
                        item = [{"tablename": "t_user_action", "type": "insert", "name": "id", "value": get_serial()},
                                {"name": "pid", "value": userid},
                                {"name": "lx", "value": i},
                                {"name": "cs", "value": infos[i]},
                                ]
                    else:
                        item = [{"tablename": "t_user_action", "type": "update", "itemid": "id", "value": ss["id"]},
                                {"name": "cs", "value": infos[i]},
                                ]
                    items.append(item)
                sys.stdout.write("\r共" + str(total) + "个用户, 当前读取第" + str(nn) + "个用户,用户名" + str(uname)
                                 + ", 共" + str(len(infos)) + "条属性")
                sys.stdout.flush()
    value = saveData(items)
    if value:
        if self is not None:
            return {"state": "200", "message": "保存成功！"}
    else:
        if self is not None:
            return {"state": "300", "message": "保存失败！"}


def runReadData():
    loaduser()

def send(message, webhook):
    conn = http.client.HTTPSConnection("discordapp.com")
    payload = "------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"content\"\r\n\r\n" + message + "\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW--"
    headers = {
        'content-type': "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
        'cache-control': "no-cache",
        }
    conn.request("POST", webhook, payload, headers)
    res = conn.getresponse()
    data = res.read()

class TestHandler(RequestHandler):
    def setpost(self, *args, **kwargs):
        str = self.searchfile()
        return self.write({"message": str})

    def searchfile(self):
        str = ''
        curpath = PLAYERDATA_DIR
        L = os.listdir(curpath)
        for subpath in L:
            if os.path.isfile(os.path.join(curpath, subpath)):
                str += 'file:' + subpath + "\n"
        return str


urls = [
    (r"/main/input/jx", JXHandler),
]
