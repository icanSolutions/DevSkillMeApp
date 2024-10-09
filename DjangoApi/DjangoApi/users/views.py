from rest_framework_simplejwt.views import TokenObtainPairView
from django.conf import settings


class CustomTokenObtainPairView(TokenObtainPairView):

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            # Extract the tokens from the response data
            refresh_token = response.data['refresh']
            access_token = response.data['access']
            print(f'your in setting cookies - {access_token}')

            # Remove tokens from the response data (optional)
            # response.data.pop('refresh', None)
            # response.data.pop('access', None)

            # Set the tokens as HttpOnly cookies
            response.set_cookie(
                key=settings.SIMPLE_JWT['ACCESS_TOKEN_COOKIE_NAME'],
                value=access_token,
                httponly=True,
                secure=settings.SIMPLE_JWT.get('ACCESS_TOKEN_COOKIE_SECURE', False),
                max_age=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds(),
                samesite='Lax'
            )
            response.set_cookie(
                key=settings.SIMPLE_JWT['REFRESH_TOKEN_COOKIE_NAME'],
                value=refresh_token,
                httponly=True,
                secure=settings.SIMPLE_JWT.get('REFRESH_TOKEN_COOKIE_SECURE', False),
                max_age=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'].total_seconds(),
                samesite='Lax'
            )

        return response