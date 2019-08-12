from rest_framework import serializers
from candidates.models import Person


# class SkillsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Skills
#         fields = ['person','recruiter' ,'python', 'cpp', 'english', 'django', 'creativity', 'comunication']

    # def create(self, validated_data):
    #     return Skills.objects.create(**validated_data)

#     def update(self, instance, validated_data):

#         instance.python = validated_data.get('python', instance.python)
#         instance.cpp = validated_data.get('cpp', instance.cpp)
#         instance.english = validated_data.get('english', instance.english)
#         instance.django = validated_data.get('django', instance.django)
#         instance.creativity = validated_data.get('creativity', instance.creativity)
#         instance.comunication = validated_data.get('comunication', instance.comunication)
#         instance.save()
#         return instance

class PersonSerializer(serializers.Serializer):
    model = Person
    first_name = serializers.CharField(max_length = 20)
    last_name = serializers.CharField(max_length = 20)


    def create(self, validated_data):
        return Person.objects.create(**validated_data)
        
    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.save()
        return instance

class SkillsSerializer(serializers.Serializer):
    python = serializers.IntegerField()
    cpp = serializers.IntegerField()
    javascript = serializers.IntegerField()
    english = serializers.IntegerField()
    comunication = serializers.IntegerField()
    creativity = serializers.IntegerField()