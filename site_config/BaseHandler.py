# -*- coding: utf-8 -*-
#!/usr/bin/env python
import re
from concurrent.futures import ThreadPoolExecutor
import tornado.web
import tornado.gen
from tornado.concurrent import run_on_executor
import os
from site_config.setting import portsandlink, PAGES_DIR
import os
from importlib import import_module

executors = ThreadPoolExecutor(portsandlink["ThreadPoolExecutor"])


class RequestHandler(tornado.web.RequestHandler):
    executor = executors

    def write_error(self, status_code, **kwargs):
        if status_code == 404:
            data = {

            }
            return self.render(os.path.join(PAGES_DIR, 'page\\main\\404.html').replace('\\', '/'), data=data)
        elif status_code == 500:
            data = {

            }
            return self.render(os.path.join(PAGES_DIR, 'page\\main\\logout.html').replace('\\', '/'), data=data)
        else:
            super(RequestHandler, self).write_error(status_code, **kwargs)

    def prepare(self):
        if 'X-Forwarded-Proto' in self.request.headers and self.request.headers['X-Forwarded-Proto'] != 'https':
            self.redirect(re.sub(r'^([^:]+)', 'https', self.request.full_url()))

    @tornado.gen.coroutine
    def post(self, *args, **kwargs):
        yield self.relsepost()

    @run_on_executor
    def relsepost(self, *args, **kwargs):
        self.setpost()

    def setpost(self, *args, **kwargs):
        pass

    @tornado.gen.coroutine
    def get(self, *args, **kwargs):
        yield self.relseget()

    @run_on_executor
    def relseget(self, *args, **kwargs):
        self.setget()

    def setget(self, *args, **kwargs):
        pass


def include(module):
    urls = get_urls(module)
    # res = import_module(module)
    # urls = getattr(res, 'urls', res)
    # urls.extend(res.get_urls())
    return urls


def url_wrapper(urls):
    wrapper_list = []
    for url in urls:
        path, handles = url
        if isinstance(handles, (tuple, list)):
            for handle in handles:
                pattern, handle_class = handle
                wrap = ('{0}{1}'.format(path, pattern), handle_class)
                wrapper_list.append(wrap)
        else:
            wrapper_list.append((path, handles))
    return wrapper_list


def searchFile(filepath):
    us = []
    for f in os.listdir(filepath):
        if os.path.isdir(os.path.join(filepath, f).replace('\\', '/')):
            us.extend(searchFile(os.path.join(filepath, f).replace('\\', '/')))
        if os.path.isfile(os.path.join(filepath, f).replace('\\', '/')) and os.path.splitext(f)[0].find("__init__") < 0 \
               and os.path.splitext(f)[0].find("__pycache__") < 0 and (os.path.splitext(f)[1].lower() == ".py"):
            filename = os.path.splitext(f)
            lj = filepath.split("..")[1][1:].split("/")
            file = import_module(".".join(lj)+'.'+filename[0])
            try:
                us.extend(file.urls)
            except AttributeError as e:
                us.extend([])
    return us


def get_urls(module):
    us = []
    for dir in os.listdir(module):
        if os.path.isdir(os.path.join(PAGES_DIR, dir)):
            us.extend(searchFile(os.path.join(PAGES_DIR, dir).replace('\\', '/')))
    return us