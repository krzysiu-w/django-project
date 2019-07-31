from django.shortcuts import render
from candidates.models import Skills
from candidates.models import Person
from candidates.serializers import PersonSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from django.contrib.auth.models import User

class addPerson(APIView):

    serializer_class = PersonSerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
