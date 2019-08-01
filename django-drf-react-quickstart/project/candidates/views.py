from django.http import HttpResponseRedirect
from django.shortcuts import render
import json
from .models import Person
from .serializers import SkillsSerializer
from .forms import AddPerson, AddSkills

def get_name(request):
    if request.method == 'POST':
        form = AddPerson(request.POST)
        if form.is_valid():
            temp = Person()
            temp.first_name=request.POST.get('first_name')
            temp.last_name=request.POST.get('last_name')
            temp.save()
            return HttpResponseRedirect('list')
    else:
        form = AddPerson()
    return render(request, 'addperson/index.html', {'form':form})

def candidatesList(request):
    if request.method == 'GET':
        c = Person.objects.values('id', 'first_name', 'last_name')
        c=list(c)
        return render(request, 'list/index.html', {"list" : json.dumps(c)})

def get_skills(request):
    if request.method == 'POST':
        form = AddSkills(request.POST)
        if form.is_valid():
            person=request.POST.get('person')
            temp=request.POST
            # temp.python=request.POST.get('python')
            # temp.cpp=request.POST.get('cpp')
            # temp.javascript=request.POST.get('javascript')
            # temp.english=request.POST.get('english')
            # temp.comunication=request.POST.get('comunication')
            # temp.creativity=request.POST.get('creativity')
            temp=list(temp)
            person.skils=json.dumps(temp)
            person.save()
            return HttpResponseRedirect('list')
    else:
        form = AddSkills()
    return render(request, 'addskills/index.html', {'form':form})