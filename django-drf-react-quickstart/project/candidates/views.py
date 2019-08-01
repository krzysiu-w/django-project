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
        c = Person.objects.values('id', 'first_name', 'last_name', 'skils')
        c=json.dumps(list(c))
        # c=json.loads(c)
        # c=c+request.user.id
        return render(request, 'list/index.html', {"list" : c})

def get_skills(request):
    if request.method == 'POST':
        form = AddSkills(request.POST)
        if form.is_valid():
            person=Person.objects.get(id=request.POST.get('person'))
            skills=person.skils
            if skills!='':
                skills=json.loads(skills)
            else:
                skills={}
            temp = {}
            for i in form.fields:
                if i!='person' and i!='recruter':
                    temp.update({i: request.POST.get(i)})
            skills[request.POST.get('recruter')]=temp
            person.skils=json.dumps(skills)
            person.save()
            return HttpResponseRedirect('list')
    else:
        form = AddSkills()
    return render(request, 'addskills/index.html', {'form':form})