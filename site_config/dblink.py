# -*- coding: utf-8 -*-
# !/usr/bin/env python
from __future__ import print_function
import gridfs
import mysql.connector

from site_config.setting import dbconfig

__author__ = 'Jian'


# 数据库链接
def mysqlConn():
    try:
        conn = mysql.connector.connect(**dbconfig)
        cursor = conn.cursor()
    except mysql.connector.Error as e:
        print(e)
        conn = None
        cursor = None
    return conn, cursor


# 数据库链接关闭
def mysqlClose(cursor, conn):
    cursor.close()
    conn.close()


# 数据库链接关闭
def descriptionList(index):
    tblist = [m[0].lower() for m in index]
    return tblist


# 安全的多数据查询
def sqldefenseread(sql, params):
    """
    安全的多数据查询,防止sql注入攻击的方法
    :param sql:查询语句
    :param params:列表参数
    :return:字典
    """
    assert isinstance(params, list)
    try:
        conn, cursor = mysqlConn()
        cursor.execute(sql, tuple(params))
        # print(sql % tuple(params))
        datas = cursor.fetchall()
        if len(datas) <= 0:
            return []
        tblist = descriptionList(cursor.description)
        mysqlClose(cursor, conn)
        items = [dict(zip(tblist, data)) for data in datas]
        return items
    except mysql.connector.Error as e:
        print(e)
        print(sql % tuple(params))
        return []


# 安全的单数据查询
def sqldefensereadone(sql, params):
    """
    安全的单数据查询
    :param sql:查询语句
    :param params:列表参数
    :return:字典
    """
    assert isinstance(params, list)
    try:
        conn, cursor = mysqlConn()
        cursor.execute(sql, tuple(params))
        data = cursor.fetchone()
        if data is None:
            return {}
        # print(sql % tuple(params))
        tblist = descriptionList(cursor.description)
        mysqlClose(cursor, conn)
        item = dict(zip(tblist, data))
        return item
    except mysql.connector.Error as e:
        print(e)
        print(sql % tuple(params))
        return []


def sqlread(sql):
    """
    查询
    :param sql:查询语句
    :return:字典
    """
    try:
        conn, cursor = mysqlConn()
        cursor.execute(sql)
        print(sql)
        datas = cursor.fetchall()
        if len(datas) <= 0:
            return []
        tblist = descriptionList(cursor.description)
        mysqlClose(cursor, conn)
        items = [dict(zip(tblist, data)) for data in datas]
        return items
    except mysql.connector.Error as e:
        print(e)
        print(sql)
        return []


def sqlreadforcol(sql):
    """
    查询
    :param sql:查询语句
    :return:字典,表头
    """
    try:
        conn, cursor = mysqlConn()
        cursor.execute(sql)
        # print(sql)
        datas = cursor.fetchall()
        if len(datas) <= 0:
            return []
        tblist = descriptionList(cursor.description)
        mysqlClose(cursor, conn)
        items = [dict(zip(tblist, data)) for data in datas]
        return items, tblist
    except mysql.connector.Error as e:
        print(e)
        print(sql)
        return [], []


def sqlreadone(sql):
    """
    单个查询
    :param sql:查询语句
    :return:字典
    """
    try:
        conn, cursor = mysqlConn()
        cursor.execute(sql)
        print(sql)
        data = cursor.fetchone()
        if data is None:
            return {}
        tblist = descriptionList(cursor.description)
        mysqlClose(cursor, conn)
        item = dict(zip(tblist, data))
        return item
    except mysql.connector.Error as e:
        print(e)
        print(sql)
        return {}


# 安全的sql运行语句
def sqldefenserun(sql, params):
    """
    sql运行
    :param sql:语句
    :param params:参数
    :return:bool
    """
    conn, cursor = mysqlConn()
    try:
        cursor.execute(sql, tuple(params))
        conn.commit()
        mysqlClose(cursor, conn)
        # print(sql % tuple(params))
        return True
    except mysql.connector.Error as e:
        print(e)
        print(sql % tuple(params))
        conn.rollback()
        return False


def sqlrun(sql):
    """
    sql运行
    :param sql:语句
    :return:bool
    """
    conn, cursor = mysqlConn()
    try:
        cursor.execute(sql)
        conn.commit()
        mysqlClose(cursor, conn)
        # print(sql)
        return True
    except mysql.connector.Error as e:
        print(e)
        print(sql)
        conn.rollback()
        return False


def insertFunc(items):
    """
    :param items: 列表
    :return: 数据插入字段和表名
    """

    tabName = ""
    tn = ""
    tv = ""
    sqlItem = []
    for i in items:
        if "tablename" in i:
            tabName = i["tablename"]
        tn += i["name"] + ","
        if i["value"] is not None:
            sqlItem.append(str(i["value"]))
            tv += "%s,"
        else:
            tv += "Null,"
    sql = "insert into {tablename} (" + tn[:-1] + ") values (" + tv[:-1] + ");"
    return sql, sqlItem, tabName


def insertData(tabName=None, valueList=[]):
    """
    插入
    :param tabName: 表名
    :param valueList: 字典
    :return:布尔值
    """
    conn, cursor = mysqlConn()
    try:
        if tabName is not None:
            if not len(valueList):
                return False
            for item in valueList:
                sqlItem = []
                if item == []:
                    continue
                sql = ""
                tn = ""
                tv = ""
                for i in item:
                    tn += i["name"] + ","
                    if i["value"] is not None:
                        sqlItem.append(str(i["value"]))
                        tv += "%s,"
                    else:
                        tv += "Null,"
                sql += "insert into " + tabName + "(" + tn[:-1] + ") values (" + tv[:-1] + "); "
                assert isinstance(sqlItem, list)
                cursor.execute(sql, tuple(sqlItem))
                conn.commit()
            conn.commit()
            mysqlClose(cursor, conn)
            return True
        else:
            if not len(valueList):
                return False
            cursor = conn.cursor()
            for item in valueList:
                sqlItem = []
                if item == []:
                    continue
                sql = ""
                tn = ""
                tv = ""
                for i in item:
                    try:
                        tabName = i["tablename"]
                    except KeyError as e:
                        pass
                    try:
                        if i["value"] is not None:
                            tn += i["name"] + ","
                            sqlItem.append(str(i["value"]))
                            tv += "%s,"
                        else:
                            tn += i["name"] + ","
                            tv += "Null,"
                    except:
                        pass
                sql += "insert into " + tabName + "(" + tn[:-1] + ") values (" + tv[:-1] + "); "
                assert isinstance(sqlItem, list)
                cursor.execute(sql, tuple(sqlItem))
            conn.commit()
            mysqlClose(cursor, conn)
            return True
    except mysql.connector.Error as e:
        print(e)
        print(sql % tuple(sqlItem))
        conn.rollback()
        return False


def insertManyData(tabName, valueList):
    """
    插入
    :param tabName: 表名
    :param valueList: 字典
    :return:布尔值
    """
    conn, cursor = mysqlConn()
    try:
        sql = ""
        colName = ""
        colValue = ""
        if not len(valueList):
            return False
        for item in valueList:
            if item == []:
                continue
            if tabName is not None:
                colName = ",".join([v["name"] for v in item])
                colValue = ('%s,' * len([v["name"] for v in item]))[:-1]
                break
            else:
                for i in item:
                    if "tablename" in i:
                        tabName = i["tablename"]
                        break
        params = []
        sql = """insert into %s (%s) values (%s)""" % (tabName, colName, colValue)
        for value in valueList:
            ta = tuple([v["value"] for v in value])
            params.append(ta)
        cursor.executemany(sql, params)
        conn.commit()
        mysqlClose(cursor, conn)
        return True
    except mysql.connector.Error as e:
        print(e)
        print(sql % params)
        conn.rollback()
        return False


def updateData(tabName=None, valueList=[]):
    """
    更新
    :param tabName: 表名
    :param valueList: 字典
    :return:布尔值
    """
    conn, cursor = mysqlConn()
    try:
        if not len(valueList):
            return False
        for item in valueList:
            if item == []:
                continue
            sql = ""
            sqlWhere = ""
            sqlSet = ""
            sqlItem = []
            sqlWitem = []
            for i in item:
                if i["value"] is not None:
                    try:
                        if i["itemid"] != "":
                            if tabName is None:
                                tabName1 = i["tablename"]
                            sqlWitem.append(str(i["value"]))
                            sqlWhere += " and " + i["itemid"] + "=%s"
                    except KeyError as e:
                        sqlItem.append(str(i["value"]))
                        sqlSet += i["name"] + "=%s,"
                else:
                    sqlSet += i["name"] + "=Null,"
            if tabName is None:
                sql += "update " + tabName1 + " set " + sqlSet[:-1] + " where 1=1 " + sqlWhere + ";"
            else:
                sql += "update " + tabName + " set " + sqlSet[:-1] + " where 1=1 " + sqlWhere + ";"
            assert isinstance(sqlItem + sqlWitem, list)
            cursor.execute(sql, tuple(sqlItem + sqlWitem))
        conn.commit()
        mysqlClose(cursor, conn)
        return True
    except mysql.connector.Error as e:
        print(e)
        print(sql % tuple(sqlItem + sqlWitem))
        conn.rollback()
        return False


def deleteData(tabName=None, valueList=[]):
    """
    删除
    :param tabName: 表名
    :param valueList: 字典
    :return:布尔值
    """
    conn, cursor = mysqlConn()
    try:
        if not len(valueList):
            return False
        for item in valueList:
            if item == []:
                continue
            sql = ""
            sqlWhere = ""
            sqlItem = []
            for i in item:
                try:
                    if tabName is None:
                        tabName1 = i["tablename"]
                    if i["itemid"] != "":
                        sqlItem.append(str(i["value"]))
                        sqlWhere += " and " + i["itemid"] + "=%s"
                except KeyError as e:
                    sqlItem.append(str(i["value"]))
                    if i["itemid"] != "":
                        sqlWhere += " and " + i["itemid"] + "=%s"
            if sqlWhere != "":
                if tabName is None:
                    sql = "delete from " + tabName1 + " where 1=1 " + sqlWhere + ";"
                else:
                    sql = "delete from " + tabName + " where 1=1 " + sqlWhere + ";"
            else:
                if tabName is None:
                    sql = "delete from " + tabName1 + " where 1=1 " + sqlWhere + ";"
                else:
                    sql = "delete from " + tabName + " where 1=1 " + sqlWhere + ";"
            assert isinstance(sqlItem, list)
            cursor.execute(sql, tuple(sqlItem))
        conn.commit()
        mysqlClose(cursor, conn)
        return True
    except mysql.connector.Error as e:
        print(e)
        print(sql % tuple(sqlItem))
        conn.rollback()
        return False


def saveData(valueList):
    """
    批量执行sql语句
    :param sql:
    :return:
    """
    conn, cursor = mysqlConn()
    try:
        if not len(valueList):
            return False
        for item in valueList:
            if item == []:
                continue
            sql = ""
            type = ""
            itemid = ""
            itemvalue = ""
            tabName = ""
            tn = ""
            tv = ""
            sqlWhere = ""
            sqlSet = ""
            sqlItem = []
            sqlWitem = []
            for i in item:
                try:
                    type = i["type"]
                    tabName = i["tablename"]
                    if type != "insert":
                        itemid = i["itemid"]
                        itemvalue = i["value"]
                        sqlWitem.append(itemvalue)
                        sqlWhere += " and " + itemid + "=%s"
                    else:
                        if "name" in i:
                            tn += i["name"] + ","
                            sqlItem.append(str(i["value"]))
                            tv += "%s,"
                except KeyError as e:
                    if type == "insert":
                        tn += i["name"] + ","
                        if i["value"] is not None:
                            sqlItem.append(str(i["value"]))
                            tv += "%s,"
                        else:
                            tv += "Null,"
                    elif type == "update":
                        if i["value"] is not None:
                            if "itemid" in i:
                                itemid = i["itemid"]
                                itemvalue = i["value"]
                                sqlWitem.append(itemvalue)
                                sqlWhere += " and " + itemid + "=%s"
                            else:
                                sqlItem.append(str(i["value"]))
                                sqlSet += i["name"] + "=%s,"
                        else:
                            sqlSet += i["name"] + "=Null,"
                    elif type == "delete":
                        if i["value"] is not None:
                            if "itemid" in i:
                                itemid = i["itemid"]
                                itemvalue = i["value"]
                                sqlWitem.append(itemvalue)
                                sqlWhere += " and " + itemid + "=%s"
            if type == "insert":
                sql += "insert into " + tabName + "(" + tn[:-1] + ") values (" + tv[:-1] + "); "
            elif type == "update":
                sql += "update " + tabName + " set " + sqlSet[:-1] + " where 1=1 " + sqlWhere + ";"
            elif type == "delete":
                sql = "delete from " + tabName + " where 1=1 " + sqlWhere + ";"
            assert isinstance(sqlItem + sqlWitem, list)
            cursor.execute(sql, tuple(sqlItem + sqlWitem))
        conn.commit()
        mysqlClose(cursor, conn)
        return True
    except mysql.connector.Error as e:
        print(e)
        print(sql % tuple(sqlItem + sqlWitem))
        conn.rollback()
        return False
