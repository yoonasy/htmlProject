# !/usr/bin/env python
# -*- coding: utf-8 -*-
# @Author: sy
# @Date:   2016-12-20 02:29:34
# @Last Modified by:   sy
# @Last Modified time: 2016-12-20 03:46:15

from django.http import HttpResponse
from django.shortcuts import render
from home.models import xiaomi_Models

def index(request):
    xm = xiaomi_Models.objects.all()
    return render(request, "index.html", context={"models":xm[0]})

def add(request):
    xm = xiaomi_Models()
    xm.title=u"我是第二篇标题"
    xm.content=u"我是第二篇的内容！！！"
    xm.author=u"slice"
    xm.comm=u"主版块"
    xm.level=6
    xm.save()
    return HttpResponse(u"ok!")