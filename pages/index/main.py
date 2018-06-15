# -*- coding: utf-8 -*-
import urllib.request

from general.project_general import get_serial, JsonEncoder
from site_config.dblink import saveData, sqlread, sqlreadone
import sys
import time
__author__ = 'Jian'
import json
import datetime
import os
from site_config.BaseHandler import RequestHandler
from site_config.setting import PAGES_DIR, STATS_DIR, PLAYERDATA_DIR, ADV_DIR
from nbtlib import nbt
import math
tablename = ""


class IndexHandler(RequestHandler):
    def setget(self, *args, **kwargs):
        return self.render(os.path.join(PAGES_DIR, 'index\\main.html').replace('\\', '/'))


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
        ssxm = self.get_argument("ssxm", '')
        ssuuid = self.get_argument("ssuuid", '')
        sqlwhere = ""

        sql = "select * from t_user"
        tsql = "select count(*) as num from t_user"

        if ssxm != "":
            sqlwhere += " and uname like '%" + ssxm + "%'"

        if ssuuid != "":
            sqlwhere += " and uuid like '%" + ssuuid + "%'"

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


urls = [
    (r"/main/index/jx", JXHandler),
    (r"/main/index/loaduserlist", loadUserListHandler),
]