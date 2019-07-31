
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from candidates import views

urlpatterns = [
    path('candidates/', views.get_name),
    path('candidates/list', views.candidatesList),

]

urlpatterns = format_suffix_patterns(urlpatterns)