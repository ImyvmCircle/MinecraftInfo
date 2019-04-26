# -*- coding: utf-8 -*-
from general.project_general import JsonEncoder
from site_config.dblink import sqlread, sqlreadone, sqldefenseread, sqldefensereadone
import json
import datetime
import os
from site_config.BaseHandler import RequestHandler
from site_config.setting import PAGES_DIR


__author__ = 'Jian'


tablename = ""


class IndexHandler(RequestHandler):
    def setget(self, *args, **kwargs):
        zxsc = sqlread("SELECT a.cs,b.uname,b.id from t_user_action a LEFT JOIN t_user b on a.pid=b.id where a.lx='stat.playOneMinute' ORDER BY a.cs desc LIMIT 10")
        [z.setdefault("sc", str(datetime.timedelta(seconds=z["cs"] / 20)).replace(" days,", 'd').split(".")[0].replace(':', 'h ', 1).replace(':', 'm ', 1) + "s") for z in zxsc]

        zskkc = sqlread("SELECT cs, b.* from t_user_action a LEFT JOIN t_user b on a.pid=b.id where a.lx='stat.mineBlock.minecraft.diamond_ore' ORDER BY a.cs desc LIMIT 10")

        stkc = sqlread(
            "SELECT cs, b.* from t_user_action a LEFT JOIN t_user b on a.pid=b.id where a.lx='stat.mineBlock.minecraft.stone' ORDER BY a.cs desc LIMIT 10")

        qcfx = sqlread(
            "SELECT cs, b.* from t_user_action a LEFT JOIN t_user b on a.pid=b.id where a.lx='stat.aviateOneCm' ORDER BY a.cs desc LIMIT 10")

        walk = sqlread(
            "SELECT cs, b.* from t_user_action a LEFT JOIN t_user b on a.pid=b.id where a.lx='stat.walkOneCm' ORDER BY a.cs desc LIMIT 10")

        horseOneCm = sqlread(
            "SELECT cs, b.* from t_user_action a LEFT JOIN t_user b on a.pid=b.id where a.lx='stat.horseOneCm' ORDER BY a.cs desc LIMIT 10")

        mobKills = sqlread(
            "SELECT cs, b.* from t_user_action a LEFT JOIN t_user b on a.pid=b.id where a.lx='stat.mobKills' ORDER BY a.cs desc LIMIT 10")

        pigOneCm = sqlread(
            "SELECT cs, b.* from t_user_action a LEFT JOIN t_user b on a.pid=b.id where a.lx='stat.pigOneCm' ORDER BY a.cs desc LIMIT 10")

        minequartz_ore = sqlread(
            "SELECT cs, b.* from t_user_action a LEFT JOIN t_user b on a.pid=b.id where a.lx='stat.mineBlock.minecraft.quartz_ore' ORDER BY a.cs desc LIMIT 10")

        mineclay = sqlread(
            "SELECT cs, b.* from t_user_action a LEFT JOIN t_user b on a.pid=b.id where a.lx='stat.mineBlock.minecraft.clay' ORDER BY a.cs desc LIMIT 10")

        return self.render(os.path.join(PAGES_DIR, 'index\\main.html').replace('\\', '/'),
                           zxsc=zxsc, zskkc=zskkc, stkc=stkc, qcfx=qcfx, walk=walk, horseOneCm=horseOneCm, mobKills=mobKills, pigOneCm=pigOneCm,
                           minequartz_ore=minequartz_ore, mineclay=mineclay
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
        params = []

        sql = "select * from t_user where 1=1"
        tsql = "select count(*) as num from t_user where 1=1"

        if value != "":
            params.extend(["%" + value + "%","%" + value + "%","%" + value + "%"])
            sqlwhere += " and (uname like %s or nameinfo like %s or uuid like %s)"

        total = sqldefensereadone(tsql + sqlwhere, params)["num"]
        
        sql += sqlwhere + " order by updatetime desc limit %s, %s"
        params.extend([(page - 1) * rows, rows])
        items = sqldefenseread(sql, params)
        return self.write(json.dumps({"rows": items, "total": total}, cls=JsonEncoder))


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
        params = []

        orderbylx = ' order by money desc'

        sql = """select *,player_uuid as uuid,
                ifnull((select sum(oldevent - newevent) from inventory.eventlog where newevent<oldevent and uuid=a.player_uuid ),0) as monout,
                ifnull((select sum(newevent - oldevent) from inventory.eventlog where newevent>=oldevent and uuid=a.player_uuid),0) as monin
                from inventory.eco_accounts a where 1=1"""
        tsql = "select count(*) as num from inventory.eco_accounts where 1=1"

        if value != "":
            params.extend(["%" + value + "%", "%" + value + "%"])
            sqlwhere += " and (player like %s or player_uuid like %s)"

        if lx != "":
            orderbylx = ' order by %s %s'
            params.extend([lx, fx])
        total = sqldefensereadone(tsql + sqlwhere, params)["num"]
        sql += sqlwhere + orderbylx + " limit %s, %s"
        params.extend([(page - 1) * rows, rows])
        items = sqldefenseread(sql, params)
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
        sql = """select *,newevent - oldevent as je from inventory.eventlog a where newevent!=oldevent and uuid='%s'""" % uuid
        tsql = "select count(*) as num from inventory.eventlog where newevent!=oldevent and uuid='%s'" % uuid

        total = sqlreadone(tsql + sqlwhere)["num"]
        sql += sqlwhere + " order by eventtime desc limit %s, %s" % ((page - 1) * rows, rows)
        items = sqlread(sql)
        return self.write(json.dumps({"rows": items, "total": total}, cls=JsonEncoder))

urls = [
    (r"/main/index/loaduserlist", loadUserListHandler),
    (r"/main/index/loadmenoyuserlist", loadMenoyUserListHandler),
    (r"/main/index/moneyinfo", moneyInfoHandler),
]