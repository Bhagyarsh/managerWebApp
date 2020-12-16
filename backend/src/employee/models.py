from django.db import models
from manager.models import Manager
# Create your models here.


class Employee(models.Model):
    created_by_manager = models.ForeignKey(Manager, on_delete=models.CASCADE)
    emp_id = models.IntegerField(unique=True)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=250)
    last_name = models.CharField(max_length=250)
    password = models.CharField(max_length=250)
    address = models.TextField()
    dob = models.DateField()
    company = models.CharField(max_length=250)
    mobile = models.IntegerField()
    city = models.CharField(max_length=250)

    def __str__(self):
        return str(self.emp_id) + " "+self.first_name + " " + self.last_name
