# -*- coding: utf-8 -*-
#!/usr/bin/env python
from __future__ import print_function, unicode_literals
from importlib import import_module
import hashlib
import os
import logging

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
PAGES_DIR = os.path.join(os.path.dirname(__file__), '../pages/').replace('\\', '/')
ADV_DIR = os.path.join(os.path.dirname(__file__), '../advancements/').replace('\\', '/')
STATS_DIR = os.path.join(os.path.dirname(__file__), '../stats/').replace('\\', '/')
PLAYERDATA_DIR = os.path.join(os.path.dirname(__file__), '../playerdata/').replace('\\', '/')
STATIC_DIR = os.path.join(os.path.dirname(__file__), '../static/').replace('\\', '/')
LOG_ROOT = os.path.join(os.path.dirname(__file__), '../log/').replace('\\', '/')


# 日志配置
log_format = '[%(asctime)s] [%(levelname)s] %(message)s'
logging.basicConfig(format=log_format, datefmt='%Y-%m-%d %H:%M:%S', level=logging.DEBUG)  # 设置日志输出格式和级别


settings = {
    "cookie_secret": hashlib.md5("glxm".encode("utf-8")).hexdigest().upper(),
    "static_path": STATIC_DIR,
    "login_url": "/login",
    "xsrf_cookies": True,
    'debug': True,
    'compress_response': True,
    'autoreload': True
}


portsandlink = {
    'httpport': 9999,
    "ThreadPoolExecutor": 200,
}

# mysql 数据库连接
dbconfig = {
    'user': 'root',
    'password': 'Imyvm@2018',
    'host': '222.186.134.251',
    'database': 'userinfo',
    'port': '3306',
}

SYSNAME = '我的世界信息平台'
