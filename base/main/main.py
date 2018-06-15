# -*- coding: utf-8 -*-
from general.project_general import get_systemname
from site_config.BaseHandler import RequestHandler


class LoginHandler(RequestHandler):
    def setget(self, *args, **kwargs):
        data = {
            "SYSTEMNAME": get_systemname(),
            'syscolor': get_syscolor()
        }
        return self.render(os.path.join(BASE_ROOT, 'kernel\\templates\\main\\login.html').replace('\\', '/'),
                           data=data)


urls = [
    (r"/main/login", LoginHandler),
]