
from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from candidates import views

urlpatterns = [
    path('candidates/', views.get_name),
    path('candidates/list', views.candidatesList),
    path('candidates/skills', views.get_skills),
    path('accounts/', include('django.contrib.auth.urls')), # new
]



urlpatterns = format_suffix_patterns(urlpatterns)