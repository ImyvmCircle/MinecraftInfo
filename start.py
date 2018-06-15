# -*- coding: utf-8 -*-
__author__ = 'Jian'
from site_config.setting import settings, portsandlink
from tornado.options import define, options
from site_config.url import application
import tornado.web
import tornado.httpserver
import tornado.options
from tornadows import webservices
import tornado.ioloop
import os


define("port", default=portsandlink["httpport"], help="run on the given port", type=int)

if __name__ == "__main__":
    tornado.options.parse_command_line()
    http_server = tornado.httpserver.HTTPServer(application)
    http_server.listen(options.port)
    print("webport:" + str(options.port))
    tornado.ioloop.IOLoop.current().start()
