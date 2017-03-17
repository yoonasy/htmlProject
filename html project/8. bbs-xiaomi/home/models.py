# !/usr/bin/env python
# -*- coding: utf-8 -*-
# @Author: sy
# @Date:   2016-12-20 02:52:42
# @Last Modified by:   sy
# @Last Modified time: 2016-12-20 03:10:35
from __future__ import unicode_literals

from django.db import models

# Create your models here.

class xiaomi_Models(models.Model):
    id = models.AutoField(primary_key= True)
    title = models.CharField(null=False,max_length=30)
    author = models.CharField(null=False,max_length=30)
    content = models.TextField(null=False)
    level = models.IntegerField(default=0)
    now = models.DateTimeField(auto_now_add=True)
    comm = models.CharField(null=False,default=u"首版块",max_length=20)