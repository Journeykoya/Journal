from django.contrib import admin
from django.urls import path, include
from .views import logout


urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    path('auth/', include('djoser.social.urls')),
    # Your other URL patterns
    path('auth/logout/', logout, name='logout'),
]
