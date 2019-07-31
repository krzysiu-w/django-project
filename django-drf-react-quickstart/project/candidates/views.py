from django.http import HttpResponseRedirect
from django.shortcuts import render
from .models import Person
from .forms import AddPerson

def get_name(request):
    if request.method == 'POST':
        form = AddPerson(request.POST)
        if form.is_valid():
            return HttpResponseRedirect('list')
    else:
        form = AddPerson()
    return render(request, 'addperson/index.html', {'form':form})

def candidatesList(request):
    if request.method == 'GET':
        c = Person.objects.all()
        return render(request, 'list/index.html', {'list':c})
