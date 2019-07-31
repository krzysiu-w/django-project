from django.db import models



class Person(models.Model):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    skils = models.TextField()
    


class Skills(models.Model):
    python = models.IntegerField(default=0)
    cpp = models.IntegerField(default=0)
    english = models.IntegerField(default=0)
    django = models.IntegerField(default=0)
    creativity = models.IntegerField(default=0) 
    comunication = models.IntegerField(default=0) 