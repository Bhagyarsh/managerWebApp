
from rest_framework import serializers
from ManagerModel.models import Manager
from employee.models import Employee

class EmployeeSerialize(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ("emp_id", 'email', 'first_name', 'last_name',
                  'password', 'address', 'dob', 'company', 'city', 'mobile')
   

class EmployeeListSerialize(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ("emp_id", 'email', 'first_name', 'last_name',
                  'company', 'city', 'mobile')
   
