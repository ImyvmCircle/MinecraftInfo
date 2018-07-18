# -*- coding: utf-8 -*-
from general.project_general import get_serial, JsonEncoder
from site_config.dblink import saveData, sqlread, sqlreadone
import sys
import time
import json
import datetime
import os
from site_config.BaseHandler import RequestHandler
from site_config.setting import PAGES_DIR, STATS_DIR, PLAYERDATA_DIR, ADV_DIR
from nbtlib import nbt


__author__ = 'Jian'


tablename = ""


class IndexHandler(RequestHandler):
    def setget(self, *args, **kwargs):
        zxsc = sqlread("SELECT a.cs,b.uname,b.id from t_user_action a LEFT JOIN t_user b on a.pid=b.id where a.lx='stat.playOneMinute' ORDER BY a.cs desc LIMIT 10")
        [z.setdefault("sc", str(datetime.timedelta(seconds=z["cs"] / 20)).replace(" days,", 'd').split(".")[0].replace(':', 'h ', 1).replace(':', 'm ', 1) + "s") for z in zxsc]

        zskkc = sqlread("SELECT cs, b.* from t_user_action a LEFT JOIN t_user b on a.pid=b.id where a.lx='stat.mineBlock.minecraft.diamond_ore' ORDER BY a.cs desc LIMIT 10")

        return self.render(os.path.join(PAGES_DIR, 'index\\main.html').replace('\\', '/'),
                           zxsc=zxsc, zskkc=zskkc
                           )


class PcJsHandler(RequestHandler):
    def get(self, *args, **kwargs):
        self.relse()

    def relse(self):
        urltype = self.request.path.split("/")[1]
        url = '/'.join(self.request.path.split("/")[2:])
        pathurl = ""
        if urltype == "pages":
            pathurl = os.path.join(PAGES_DIR, url).replace('\\', '/')
        return self.render(pathurl)


class loadUserListHandler(RequestHandler):
    def setpost(self, *args, **kwargs):
        page = int(self.get_argument('page'))
        rows = int(self.get_argument('rows'))
        value = self.get_argument("value", '')
        sqlwhere = ""

        sql = "select * from t_user where 1=1"
        tsql = "select count(*) as num from t_user where 1=1"

        if value != "":
            sqlwhere += " and (uname like '%" + value + "%' or nameinfo like '%" + value + "%' or uuid like '%" + value + "%')"

        total = sqlreadone(tsql + sqlwhere)["num"]
        sql += sqlwhere + " order by updatetime desc limit %s, %s" % ((page - 1) * rows, rows)
        items = sqlread(sql)
        return self.write(json.dumps({"rows": items, "total": total}, cls=JsonEncoder))


class JXHandler(RequestHandler):
    def setpost(self, *args, **kwargs):
        # flag = False
        # while not flag:
        #     flag = self.saveuser()
        # self.loaduser()
        self.saveuser()

    def loaduser(self):
        def timestr(obj):
            objfloat = float(str(obj)[:10] + '.' + str(obj)[10:-1])
            timeobj = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(objfloat))
            return timeobj
        items = []
        if os.path.isdir(PLAYERDATA_DIR):
            dt = datetime.datetime.now()
            users = {}
            [users.setdefault(d["uuid"], d) for d in sqlread("select * from t_user")]
            total = len(os.listdir(PLAYERDATA_DIR))
            for nn, fp in enumerate(os.listdir(PLAYERDATA_DIR)):
                uuid = str(fp.split(".")[0])
                if uuid in users:
                    continue
                file = nbt.load(os.path.join(PLAYERDATA_DIR, fp))
                userobj = file.root["bukkit"]
                uname = userobj["lastKnownName"]
                firstLogin = timestr(userobj["firstPlayed"])
                firstLogout = timestr(userobj["lastPlayed"])
                item = [{"tablename": "t_user", "type": "insert", "name": "id", "value": get_serial()},
                        {"name": "uuid", "value": str(fp.split(".")[0])},
                        {"name": "uname", "value": uname},
                        {"name": "nameinfo", "value": str([])},
                        {"name": "firstplayed", "value": firstLogin},
                        {"name": "lastplayed", "value": firstLogout},
                        ]
                items.append(item)
                sys.stdout.write("\r共" + str(total) + "个用户, 当前读取第" + str(nn) + "个用户,用户名" + str(uname))
                sys.stdout.flush()
            value = saveData(items)
            if value:
                self.saveuser()
            else:
                return self.write(json.dumps({"state": "300", "message": "保存失败！"}, cls=JsonEncoder))

    def saveuser(self):
        items = []
        dt = datetime.datetime.now()
        users = {}
        [users.setdefault(d["uuid"], d) for d in sqlread("select * from t_user")]
        if os.path.isdir(ADV_DIR):
            total = len(os.listdir(ADV_DIR))
            for nn, fp in enumerate(os.listdir(ADV_DIR)):
                uuid = str(fp.split(".")[0])
                if uuid not in users:
                    print('\n' + uuid + "进度无用户资料")
                    continue
                uname = users[uuid]["uname"]
                userid = users[uuid]["id"]
                with open(os.path.join(ADV_DIR, fp)) as file:
                    infos = json.loads(file.read())
                    for num, i in enumerate(infos):
                        ssid = get_serial()
                        item = [{"tablename": "t_user_success", "type": "insert", "name": "id", "value": ssid},
                                {"name": "pid", "value": userid},
                                {"name": "lx", "value": i},
                                {"name": "zt", "value": int(infos[i]["done"])},
                                ]
                        items.append(item)
                        criteria = infos[i]["criteria"]
                        for j in criteria:
                            item = [
                                {"tablename": "t_user_success_criteria", "type": "insert", "name": "id", "value": get_serial()},
                                {"name": "pid", "value": ssid},
                                {"name": "tj", "value": j},
                                {"name": "sj", "value": criteria[j]},
                                ]
                            items.append(item)
                    sys.stdout.write("\r共"+str(total)+"个用户, 当前读取第" + str(nn) + "个用户,用户名"+str(uname)+", 共" + str(len(infos)) + "条成就")
                    sys.stdout.flush()

        if os.path.isdir(STATS_DIR):
            total = len(os.listdir(STATS_DIR))
            for nn, fp in enumerate(os.listdir(STATS_DIR)):
                uuid = str(fp.split(".")[0])
                if uuid not in users:
                    print('\n' + uuid + "属性无用户资料")
                    continue
                uname = users[uuid]["uname"]
                userid = users[uuid]["id"]
                with open(os.path.join(STATS_DIR, fp)) as file:
                    infos = json.loads(file.read())
                    for num, i in enumerate(infos):
                        item = [{"tablename": "t_user_action", "type": "insert", "name": "id", "value": get_serial()},
                                {"name": "pid", "value": userid},
                                {"name": "lx", "value": i},
                                {"name": "cs", "value": infos[i]},
                                ]
                        items.append(item)
                    sys.stdout.write("\r共"+str(total)+"个用户, 当前读取第" + str(nn) + "个用户,用户名"+str(uname)+", 共" + str(len(infos)) + "条属性")
                    sys.stdout.flush()
        value = saveData(items)
        if value:
            return self.write(json.dumps({"state": "200", "message": "保存成功！"}, cls=JsonEncoder))
        else:
            return self.write(json.dumps({"state": "300", "message": "保存失败！"}, cls=JsonEncoder))

class loadMenoyUserListHandler(RequestHandler):
    def setget(self, *args, **kwargs):
        pass

    def setpost(self, *args, **kwargs):
        page = int(self.get_argument('page'))
        rows = int(self.get_argument('rows'))
        value = self.get_argument("value", '')
        lx = self.get_argument("lx", '')
        fx = self.get_argument("fx", '')
        sqlwhere = ""
        orderbylx = ' order by money desc'

        sql = """select *,player_uuid as uuid,
                ifnull((select sum(oldevent - newevent) from inventory.eventlog where newevent<oldevent and uuid=a.player_uuid ),0) as monout,
                ifnull((select sum(newevent - oldevent) from inventory.eventlog where newevent>=oldevent and uuid=a.player_uuid),0) as monin
                from inventory.eco_accounts a where 1=1"""
        tsql = "select count(*) as num from inventory.eco_accounts where 1=1"

        if value != "":
            sqlwhere += " and (player like '%" + value + "%' or player_uuid like '%" + value + "%')"

        if lx != "":
            orderbylx = ' order by ' + lx + " " + fx
        total = sqlreadone(tsql + sqlwhere)["num"]
        sql += sqlwhere + orderbylx + " limit %s, %s" % ((page - 1) * rows, rows)
        items = sqlread(sql)
        return self.write(json.dumps({"rows": items, "total": total}, cls=JsonEncoder))


class moneyInfoHandler(RequestHandler):
    def setget(self, *args, **kwargs):
        uuid = self.get_argument("uuid")
        uname = sqlreadone("select player from inventory.eco_accounts where player_uuid='%s'" % uuid)['player']
        return self.render(os.path.join(PAGES_DIR, 'index\\moneyinfo.html').replace('\\', '/'), uuid=uuid, uname=uname)

    def setpost(self, *args, **kwargs):
        page = int(self.get_argument('page'))
        rows = int(self.get_argument('rows'))
        uuid = self.get_argument("uuid")
        sqlwhere = ""
        sql = """select *,newevent - oldevent as je from inventory.eventlog a where uuid='%s'""" % uuid
        tsql = "select count(*) as num from inventory.eventlog where uuid='%s'" % uuid

        total = sqlreadone(tsql + sqlwhere)["num"]
        sql += sqlwhere + " order by eventtime desc limit %s, %s" % ((page - 1) * rows, rows)
        items = sqlread(sql)
        return self.write(json.dumps({"rows": items, "total": total}, cls=JsonEncoder))

urls = [
    (r"/main/index/jx", JXHandler),
    (r"/main/index/loaduserlist", loadUserListHandler),
    (r"/main/index/loadmenoyuserlist", loadMenoyUserListHandler),
    (r"/main/index/moneyinfo", moneyInfoHandler),
]