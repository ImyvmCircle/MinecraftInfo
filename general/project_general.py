# -*- coding: utf-8 -*-
import logging
import datetime
import platform
from decimal import Decimal
import json
import os
import os.path
import time
import random
import hashlib
import math
import tornado.gen
from site_config.setting import LOG_ROOT, SYSNAME, SYSCOLOR


def get_systemname():
    value = SYSNAME
    return value


# 颜色配置
def get_syscolor():
    return SYSCOLOR


# 取得copyright
def get_copyright():
    value = ""
    # value = "Copyright 2014 ~ " + str(datetime.datetime.now().year) + " " + "湖南省交通科学研究院"
    return value


# 取得系统代码 SysCode
def get_syscode():
    value = "ssprj"
    return value


# 取得自定义增长序列
def get_serial(num=None):
    s = time.strftime("%Y%m%d%H%M%S", time.localtime()) + str(datetime.datetime.now().microsecond)
    if num:
        s += ("%06d" % num) + (str(random.random()).split(".")[1][:4])
    else:
        s += (str(random.random()).split(".")[1][:10])
    return s


# md5加密
def get_md5(username, h, pwd):
    value = hashlib.md5(username.encode("utf-8") + h.encode("utf-8") + pwd.encode("utf-8")).hexdigest().upper()
    return value

# md5加密
def get_strmd5(str):
    value = hashlib.md5(str.encode("utf-8")).hexdigest().upper()
    return value


# 生成100000到999999的随机整数
def get_rnd_num():
    value = random.randint(100000, 999999)
    return value


def format_byte(value):
    if str(value) != "None":
        if int(str(value)) >= 1000000:
            return "%.2fM" % (float(str(value)) / 1024 / 1024)
        elif int(value) < 1000000:
            return "%.2fK" % (float(str(value)) / 1024)
    else:
        return "0"


# models转集合遇到json转换类扩展格式时转换失败调用这个类
class JsonEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj)
        if isinstance(obj, datetime.datetime):
            return obj.strftime('%Y-%m-%d %H:%M:%S')
        elif isinstance(obj, datetime.date):
            return obj.strftime('%Y-%m-%d')
        else:
            return json.JSONEncoder.default(self, obj)


class cnumber:
    """
    #算法说明：要求字符串输入，现将字符串差费为整数部分和小数部分生成list[整数部分,小数部分]
    #将整数部分拆分为：[亿，万，仟]三组字符串组成的List:['0000','0000','0000']（根据实际输入生成阶梯List）
    #例如：600190000010.70整数部分拆分为：['600','1900','0010']
    #然后对list中每个字符串分组进行大写化再合并
    #最后处理小数部分的大写化
    """
    cdict = {}
    gdict = {}
    xdict = {}

    def __init__(self):
        self.cdict = {1: u'', 2: u'拾', 3: u'佰', 4: u'仟'}
        self.xdict = {1: u'元', 2: u'万', 3: u'亿', 4: u'兆'}  # 数字标识符
        self.gdict = {0: u'零', 1: u'壹', 2: u'贰', 3: u'叁', 4: u'肆', 5: u'伍', 6: u'陆', 7: u'柒', 8: u'捌', 9: u'玖'}

    def csplit(self, cdata):  # 拆分函数，将整数字符串拆分成[亿，万，仟]的list
        g = len(cdata) % 4
        csdata = []
        lx = len(cdata) - 1
        if g > 0:
            csdata.append(cdata[0:g])
        k = g
        while k <= lx:
            csdata.append(cdata[k:k + 4])
            k += 4
        return csdata

    def cschange(self, cki):  # 对[亿，万，仟]的list中每个字符串分组进行大写化再合并
        lenki = len(cki)
        i = 0
        lk = lenki
        chk = u''
        for i in range(lenki):
            if int(cki[i]) == 0:
                if i < lenki - 1:
                    if int(cki[i + 1]) != 0:
                        chk = chk + self.gdict[int(cki[i])]
            else:
                chk = chk + self.gdict[int(cki[i])] + self.cdict[lk]
            lk -= 1
        return chk

    def cwchange(self, data):
        cdata = str(data).split('.')
        cki = cdata[0]
        if len(cdata) == 1:
            i = 0
            chk = u''
            cski = self.csplit(cki)  # 分解字符数组[亿，万，仟]三组List:['0000','0000','0000']
            ikl = len(cski)  # 获取拆分后的List长度
            # 大写合并
            for i in range(ikl):
                if self.cschange(cski[i]) == '':  # 有可能一个字符串全是0的情况
                    chk = chk + self.cschange(cski[i])  # 此时不需要将数字标识符引入
                else:
                    chk = chk + self.cschange(cski[i]) + self.xdict[ikl - i]  # 合并：前字符串大写+当前字符串大写+标识符
            chk = chk + u'整'
        else:
            i = 0
            chk = u''
            cski = self.csplit(cki)  # 分解字符数组[亿，万，仟]三组List:['0000','0000','0000']
            ikl = len(cski)  # 获取拆分后的List长度
            # 大写合并
            for i in range(ikl):
                if self.cschange(cski[i]) == '':  # 有可能一个字符串全是0的情况
                    chk = chk + self.cschange(cski[i])  # 此时不需要将数字标识符引入
                else:
                    chk = chk + self.cschange(cski[i]) + self.xdict[ikl - i]  # 合并：前字符串大写+当前字符串大写+标识符
            # 处理小数部分
            ckj = cdata[1]
            lenkj = len(ckj)
            if lenkj == 1:  # 若小数只有1位
                if int(ckj[0]) == 0:
                    chk = chk + u'整'
                else:
                    chk = chk + self.gdict[int(ckj[0])] + u'角整'
            else:  # 若小数有两位的四种情况
                if int(ckj[0]) == 0 and int(ckj[1]) != 0:
                    chk = chk + u'零' + self.gdict[int(ckj[1])] + u'分'
                elif int(ckj[0]) == 0 and int(ckj[1]) == 0:
                    chk = chk + u'整'
                elif int(ckj[0]) != 0 and int(ckj[1]) != 0:
                    chk = chk + self.gdict[int(ckj[0])] + u'角' + self.gdict[int(ckj[1])] + u'分'
                else:
                    chk = chk + self.gdict[int(ckj[0])] + u'角整'
        return chk


def getdxsz(num):
    """
    阿拉伯数字转为中文数字方法
    """
    sz = [u"零", u"一", u"二", u"三", u"四", u"五", u"六", u"七", u"八", u"九"]
    jw = [u"十", u"百"]
    if num < 20:
        mc = float(num) / 10 > 1 and jw[0] + sz[int(str(num)[1])] or sz[int(str(num)[0])]
    elif num < 100:
        mc = num % 10 != 0 and sz[int(str(num)[0])] + jw[0] + sz[int(str(num)[1])] or sz[int(str(num)[0])] + jw[0]
    else:
        mc = num % 100 != 0 and (
            int(str(num)[1:]) > 10 and sz[int(str(num)[0])] + jw[1] + getdxsz(int(str(num)[1:])) or sz[
                int(str(num)[0])] +
            jw[1] + sz[0] + getdxsz(int(str(num)[1:]))) or sz[int(str(num)[0])] + jw[1]
    return mc


def convertBytes(bytes):
    lst = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB']
    # 舍弃小数点，取小
    # 求对数(对数：若 a**b = N 则 b 叫做以 a 为底 N 的对数)
    i = int(math.floor(math.log(bytes, 1024)))

    if i >= len(lst):
        i = len(lst) - 1
    return ('%.2f' + " " + lst[i]) % (bytes / math.pow(1024, i))


# 删除单个文件 异步方法
@tornado.gen.coroutine
def dellocfile(filename):
    if os.path.exists(filename):
        os.remove(filename)


def UsePlatform():
    sysstr = platform.system()
    if sysstr == "Windows":
        return "Windows"
    elif sysstr == "Linux":
        return "Linux"
    else:
        return "Other System"


class Logger:
    def __init__(self, path, clevel=logging.DEBUG, Flevel=logging.DEBUG):
        self.logger = logging.getLogger(os.path.join(LOG_ROOT, path + ".log"))
        self.logger.setLevel(logging.DEBUG)
        fmt = logging.Formatter('[%(asctime)s] [%(levelname)s] %(message)s', '%Y-%m-%d %H:%M:%S')
        # 设置CMD日志
        sh = logging.StreamHandler()
        sh.setFormatter(fmt)
        sh.setLevel(clevel)
        # 设置文件日志
        fh = logging.FileHandler(path)
        fh.setFormatter(fmt)
        fh.setLevel(Flevel)
        self.logger.addHandler(sh)
        self.logger.addHandler(fh)

    def debug(self, message):
        self.logger.debug(message)

    def info(self, message):
        self.logger.info(message)

    def war(self, message):
        self.logger.warn(message)

    def error(self, message):
        self.logger.error(message)

    def cri(self, message):
        self.logger.critical(message)


################################# 得到本机环境 ######################################

def get_mac_address():
    import uuid
    mac = uuid.UUID(int=uuid.getnode()).hex[-12:].upper()
    return ":".join([mac[e:e + 2] for e in range(0, 11, 2)])


def get_local_host_info():
    import socket
    # 获取本机电脑名
    host_name = socket.getfqdn(socket.gethostname())
    # 获取本机ip
    host_ip = socket.gethostbyname(host_name)
    import collections
    return collections.OrderedDict((('host', host_name),
                                    ('mac', get_mac_address()),
                                    ('local_ip', host_ip),
                                    # ('ip', get_remote_ip_address())
                                    ))


def get_remote_ip_address():
    import urllib.request
    try:
        html = ''
        response = urllib.request.urlopen('http://www.net.cn/static/customercare/yourip.asp')
        html = response.read().decode('gb2312')
        start_tag = '您的本地上网IP是：'
        ipstart = html.index(start_tag)
        html = html[ipstart + len(start_tag):]
        ipstart = html.index('>')
        html = html[ipstart + 1:]
        ipend = html.index('<')
        ip_address = html[:ipend].replace(' ', '').split(',')
        return ip_address
    except:
        return ""


# 时间计算
def sleeptime(shi, fen, miao):
    """
    :param shi: 小时
    :param fen: 分钟
    :param miao: 秒钟
    :return: 毫秒
    """
    return (shi*3600 + fen*60 + miao) * 1000


# 字符串长度判断 用于pdf之类的列宽固定的地方
def strCount(t, num=36):
    temp = ""
    js = 0
    if len(t) > num:
        for s in t:
            if 127 > ord(s) > 31:
                js += 1
            else:
                js += 0.5
            if js >= num:
                pass
    else:
        return t


# 地球坐标转换国测局坐标
def transform(wgLon, wgLat):
    wgLon = float(wgLon)
    wgLat = float(wgLat)
    dLat = transformLat(wgLon - 105.0, wgLat - 35.0)
    dLon = transformLon(wgLon - 105.0, wgLat - 35.0)
    radLat = wgLat / 180.0 * pi
    magic = math.sin(radLat)
    magic = 1 - ee * magic * magic
    sqrtMagic = math.sqrt(magic)
    dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi)
    dLon = (dLon * 180.0) / (a / sqrtMagic * math.cos(radLat) * pi)
    mgLat = wgLat + dLat
    mgLon = wgLon + dLon
    return [mgLon, mgLat]


def transformLat(x, y):
    ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * math.sqrt(abs(x))
    ret += (20.0 * math.sin(6.0 * x * pi) + 20.0 * math.sin(2.0 * x * pi)) * 2.0 / 3.0
    ret += (20.0 * math.sin(y * pi) + 40.0 * math.sin(y / 3.0 * pi)) * 2.0 / 3.0
    ret += (160.0 * math.sin(y / 12.0 * pi) + 320 * math.sin(y * pi / 30.0)) * 2.0 / 3.0
    return ret


def transformLon(x, y):
    ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * math.sqrt(abs(x))
    ret += (20.0 * math.sin(6.0 * x * pi) + 20.0 * math.sin(2.0 * x * pi)) * 2.0 / 3.0
    ret += (20.0 * math.sin(x * pi) + 40.0 * math.sin(x / 3.0 * pi)) * 2.0 / 3.0
    ret += (150.0 * math.sin(x / 12.0 * pi) + 300.0 * math.sin(x / 30.0 * pi)) * 2.0 / 3.0
    return ret


pi = 3.14159265358979324
a = 6378245.0
ee = 0.00669342162296594323
x_pi = 3.14159265358979324 * 3000.0 / 180.0


# Python计算地图上两点经纬度间的距离
# 经度1，纬度1，经度2，纬度2 （十进制度数）
def haversine(lon1, lat1, lon2, lat2):
    from math import radians, cos, sin, asin, sqrt
    # 将十进制度数转化为弧度
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])

    # haversine公式
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    aa = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * asin(sqrt(aa))
    r = 6378.137473475351  # 赤道半径，单位为公里
    # r = 6378.245  # 赤道半径，单位为公里
    # r = 6371 #  地球平均半径，单位为公里
    return c * r * 1000