
from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from django.contrib.auth import views as auth_views
from candidates import views
from django.conf.urls import url

urlpatterns = [
    path('candidates/', views.get_name),
    path('candidates/list', views.candidatesList),
    path('candidates/skills/<int:pk>/', views.get_skills),
    path('candidates/delete/<int:pk>/', views.delete_person),
    path('login/', auth_views.LoginView),
    # url(r'^login/$', auth_views.LoginView, {'template_name': 'logform/login.html'}),
    # url(r'^logout/$', auth_views.logout, name='logout'),
]



urlpatterns = format_suffix_patterns(urlpatterns)