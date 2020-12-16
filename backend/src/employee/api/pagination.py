from rest_framework.pagination import LimitOffsetPagination,PageNumberPagination

class EmployeeListOffsetPagination(LimitOffsetPagination):
    default_limit = 2
    max_limit = 3
