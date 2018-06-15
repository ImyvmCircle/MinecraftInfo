# -*- coding: utf-8 -*-
from tornado.web import StaticFileHandler, URLSpec
from site_config.BaseHandler import url_wrapper, include
from site_config.setting import settings, PAGES_DIR
import tornado.web
__author__ = 'Jian'

application = tornado.web.Application(handlers=url_wrapper([
    (r"/", 'pages.index.main.IndexHandler'),
    # (r"/pages/(.*\.js)$", StaticFileHandler, {"path": PAGES_DIR}),
    (r"(.*\.js)$", 'pages.index.main.PcJsHandler'),  # 静态目录配置目录下配置
    (r"/pages", include('pages')),
    (r"/base", include('base')),
]), **settings)

# 主页面调用
# application = tornado.web.Application(, **settings)
