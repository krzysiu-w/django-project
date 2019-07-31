from django import forms

class AddPerson(forms.Form):
    first_name = forms.CharField(label = 'First name', max_length=30)
    last_name = forms.CharField(label = 'Last name', max_length=30)
