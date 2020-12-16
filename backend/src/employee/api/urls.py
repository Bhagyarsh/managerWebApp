# api/urls.py
from django.urls import include, path
from .views import EmployeeCreateAPIView, EmployeeListView, EmployeeRetriveUpdateDestroyAPIView

urlpatterns = [
    path('employee/create', EmployeeCreateAPIView.as_view()),
    path('employees/', EmployeeListView.as_view()),
    path('employee/<int:emp_id>', EmployeeRetriveUpdateDestroyAPIView.as_view()),

]
