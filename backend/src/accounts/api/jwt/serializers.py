# users/serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.conf import settings
from rest_framework_jwt.settings import api_settings
import datetime
from django.utils import timezone
from rest_framework.views import exception_handler
from manager.models import Manager

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

# payload = jwt_payload_handler(user)
# token = jwt_encode_handler(payload)


expire_delta = settings.JWT_AUTH['JWT_REFRESH_EXPIRATION_DELTA']
User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name')


class ManagerUserRegisterSerializer(serializers.ModelSerializer):
    expires = serializers.SerializerMethodField(read_only=True)
    token = serializers.SerializerMethodField(read_only=True)
    company = serializers.CharField(

        write_only=True
    )
    password = serializers.CharField(
        style={'input_type': 'password'},
        write_only=True
    )
    address = serializers.CharField(
        style={'input_type': 'textarea'},
        write_only=True
    )
    dob = serializers.DateField(
        write_only=True
    )

    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name',
                  'password', 'token', 'expires', 'address', 'dob', 'company')
        extra_kwargs = {'password': {'write_only': True}, 'address': {'write_only': True},
                        'dob': {'write_only': True}, 'company': {'write_only': True}}

    def get_token(self, obj):
        user = obj
        payload = jwt_payload_handler(user)
        token = jwt_encode_handler(payload)
        return token

    def get_expires(self, obj):
        return timezone.now() + expire_delta - datetime.timedelta(seconds=200)

    def create(self, validated_data):
        print(validated_data)
        new_user = User.objects.create_user(
            email=validated_data.get("email"),
            first_name=validated_data.get("first_name"),
            last_name=validated_data.get("last_name"),
            password=validated_data.get("password"))

    #             user = models.ForeignKey(User, on_delete=models.CASCADE)
    # dob = models.DateField()
    # address = models.TextField()
    # company = models.CharField(max_length=250)
        if new_user:
            Manager.objects.create(
                user=new_user,
                address=validated_data.get("address"),
                company=validated_data.get("company"),
                dob=validated_data.get("dob")
            )
        return new_user


class UserUpdateSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        style={'input_type': 'password'},
        write_only=True
    )

    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name',
                  'password', 'token', 'expires')
        extra_kwargs = {'password': {'write_only': True}}
