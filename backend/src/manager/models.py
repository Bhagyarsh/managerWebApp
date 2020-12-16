from django.db import models
from accounts.models import User
# Create your models here.


class Manager(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    dob = models.DateField()
    address = models.TextField()
    company = models.CharField(max_length=250)

    def __str__(self):
        return self.user.first_name +  "  " + self.company