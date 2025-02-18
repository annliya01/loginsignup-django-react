from django.urls import path
from . import views
urlpatterns = [
    path('home/', views.home_view, name ='home'),
    path('token/', views.login_view, name='token_obtain_pair'),
    path('login/', views.login_view, name ='login'),
    path('register/', views.register_view, name='register'),
]