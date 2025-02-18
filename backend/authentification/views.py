from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers
from django.contrib.auth import authenticate
import logging

class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2']

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "Passwords do not match"})
        if len(data['password']) < 8:
            raise serializers.ValidationError({"password": "Password must be at least 8 characters "})
        return data

    def create(self, validated_data):
        validated_data.pop('password2') 
        validated_data['password'] = make_password(validated_data['password'])
        return User.objects.create(**validated_data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def home_view(request):
    return Response({"message": "Welcome!"})

logger = logging.getLogger(__name__)


@api_view(['POST'])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")

    logger.info(f"Attempting login for username: {username}")

    if not username or not password:
        logger.warning("Missing username or password.")
        return Response({"error": "Username and password are required."}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(username=username, password=password)

    if user is not None:
        logger.info(f"User {username} authenticated successfully.")
        refresh = RefreshToken.for_user(user)
        return Response({
            "message": "Login successful",
            "access_token": str(refresh.access_token),
            "refresh_token": str(refresh),
        })
    else:
        logger.warning(f"Failed login attempt for {username}. Invalid credentials.")
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def register_view(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            "message": "Registration successful",
            "access_token": str(refresh.access_token),
            "refresh_token": str(refresh),
            "user": {
                "username": user.username,
                "email": user.email
            }
        }, status=status.HTTP_201_CREATED)
    print("Validation errors:", serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

