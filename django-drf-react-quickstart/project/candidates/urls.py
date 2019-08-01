
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from candidates import views

urlpatterns = [
    path('candidates/', views.addPerson.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)