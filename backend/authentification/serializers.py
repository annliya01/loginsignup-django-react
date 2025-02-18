from rest_framework import serializers
from django.contrib.auth.models import User
import bcrypt

class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2']

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "Passwords do not match"})
        if len(data['password']) < 8:
            raise serializers.ValidationError({"password": "Password must be at least 8 characters"})
        return data

    def create(self, validated_data):
        password = validated_data['password']
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            password=hashed_password
        )
        return user
