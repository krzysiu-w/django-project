from django.shortcuts import render
import json
import sys
from os import path
sys.path.append( "..")
from candidates.models import Person
def index(request):
    data=Person.objects.values('id', 'first_name', 'last_name', 'skills')
    data=json.dumps(list(data))
    return render(request, 'frontend/index.html', {'data': data})