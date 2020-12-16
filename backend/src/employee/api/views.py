# users/views.py
from rest_framework import generics
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate, get_user_model
from rest_framework.views import APIView
from .pagination import EmployeeListOffsetPagination
from .serializers import EmployeeSerialize, EmployeeListSerialize
from rest_framework import permissions
from employee.models import Employee
from manager.models import Manager


class EmployeeCreateAPIView(generics.CreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerialize
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        manager = Manager.objects.get(user=self.request.user)
        serializer.save(created_by_manager=manager)

class EmployeeRetriveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = EmployeeSerialize
    lookup_url_kwarg = 'emp_id'
    permission_classes = [permissions.IsAuthenticated]
    queryset = Employee.objects.all()

    def get_object(self, *arg, **kwargs):
        emp_id = self.kwargs.get(self.lookup_url_kwarg)
        user = self.request.user
        obj = get_object_or_404(
            Employee, created_by_manager__user=user, emp_id=emp_id)  # Lookup the object
        return obj


class EmployeeListView(generics.ListAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeListSerialize
    # pagination_class = EmployeeListOffsetPagination
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self, *arg, **kwargs):
        user = self.request.user
        return Employee.objects.filter(created_by_manager__user=user).order_by('first_name', 'last_name')
