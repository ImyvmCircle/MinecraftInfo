# -*- coding: utf-8 -*-
from site_config.BaseHandler import url_wrapper, include
from site_config.setting import settings
import tornado.web
__author__ = 'Jian'

application = tornado.web.Application(handlers=url_wrapper([
    (r"/", 'pages.index.main.IndexHandler'),
    (r"/pages", include('pages')),
]), **settings)

# 主页面调用
# application = tornado.web.Application(, **settings)
