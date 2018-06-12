# -*- coding: utf-8 -*-
import urllib.request

from general.project_general import get_serial, JsonEncoder
from site_config.dblink import saveData, sqlread
import sys
import time
__author__ = 'Jian'
import json
import datetime
import os
from site_config.BaseHandler import RequestHandler
from site_config.setting import PAGES_DIR, STATS_DIR

tablename = ""


class IndexHandler(RequestHandler):
    def setget(self, *args, **kwargs):
        return self.render(os.path.join(PAGES_DIR, 'index\\main.html').replace('\\', '/'))


class JXHandler(RequestHandler):
    def setpost(self, *args, **kwargs):
        flag = False
        while not flag:
            flag = self.saveuser()

    def saveuser(self):
        items = []
        if os.path.isdir(STATS_DIR):
            dt = datetime.datetime.now()
            # users = [sqlread("select * from t_user where updatetime<'%s'" % dt.date())]
            total = len(os.listdir(STATS_DIR))
            for nn, fp in enumerate(os.listdir(STATS_DIR)):
                name_url = "https://api.mojang.com/user/profiles/{}/names".format(str(fp.split(".")[0]).replace("-", ''))  # This server can be pinged as many times as needed.
                name_request = urllib.request.Request(name_url)
                name_opened = urllib.request.urlopen(name_request).read()
                userinfo = json.loads(name_opened.decode("utf8"))
                name = userinfo[0]["name"]
                userid = get_serial()
                item = [{"tablename": "t_user", "type": "insert", "name": "id", "value": userid},
                        {"name": "uuid", "value": str(fp.split(".")[0])},
                        {"name": "name", "value": name},
                        {"name": "nameinfo", "value": str(userinfo[1:])},
                        {"name": "updatetime", "value": dt},
                        ]
                items.append(item)
                with open(os.path.join(STATS_DIR, fp)) as file:
                    infos = json.loads(file.read())
                    for num, i in enumerate(infos):
                        item = [{"tablename": "t_user_action", "type": "insert", "name": "id", "value": get_serial()},
                                {"name": "pid", "value": userid},
                                {"name": "lx", "value": i},
                                {"name": "cs", "value": infos[i]},
                                ]
                        items.append(item)
                    sys.stdout.write("\r共"+str(total)+"个用户, 当前读取第" + str(nn) + "个用户,用户名"+str(name)+", 共" + str(len(infos)) + "条属性")
                    sys.stdout.flush()
                    value = saveData(items)
                    if not value:
                        return False
            else:
                return True
        else:
            return True



urls = [
    (r"/main/index/jx", JXHandler),
]