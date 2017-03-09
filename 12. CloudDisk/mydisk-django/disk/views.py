#-*- coding: utf-8 -*-
from django.shortcuts import render, render_to_response
from django import forms
from django.http import HttpResponse
from disk.models import User
import os, datetime, json

# Create your views here.
# class UserForm(forms.Form):
#     headImg = forms.FileField()

def home(request):
    if request.method == "POST":
        myFile = request.FILES.get('file', None)
        if not myFile:
            return HttpResponse("no files for upload!")
        destination = open(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))+"\\upload",myFile.name), 'wb+')
        for chunk in myFile.chunks():
            destination.write(chunk)
        destination.close()
        # print myFile.size   # ========= Files Size
        response_data = {}
        
        response_data['result'] = 'ok'
        response_data['message'] = 'success'
        response_data['filename'] = myFile.name
        response_data['size'] = myFile.size
        response_data['date'] = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        res = HttpResponse(json.dumps(response_data), content_type="application/json")
        res.set_cookie('addr', "1", 3600)
        return res
        # if uf.is_valid():
        #     headImg = uf.cleaned_data['headImg']
        #     # 写入数据库
        #     user = User()
        #     user.headImg = headImg
        #     user.save()
        #     return HttpResponse('upload ok!');
    else:
        # uf = request.POST
        return render(request, "index.html", {"success":"first home/upload Defeated"})
    return render(request, "index.html", {})
