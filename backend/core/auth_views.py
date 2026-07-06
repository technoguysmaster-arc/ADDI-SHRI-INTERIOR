import os
from django.contrib.auth.models import User
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework_simplejwt.tokens import RefreshToken
from google.oauth2 import id_token
from google.auth.transport import requests


class GoogleLoginView(APIView):
    """
    POST /api/auth/google/
    Accepts Google OAuth id_token (credential) from the React frontend,
    verifies it, gets/creates the Django User, and returns JWT tokens.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        token = request.data.get('token')
        if not token:
            return Response(
                {'error': 'Google token is required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Get Google Client ID from settings
        google_client_id = getattr(settings, 'GOOGLE_CLIENT_ID', None)
        if not google_client_id:
            # Fallback to env variable directly if settings is not fully set up
            google_client_id = os.environ.get('GOOGLE_CLIENT_ID')

        try:
            # Verify the Google OAuth token
            id_info = id_token.verify_oauth2_token(
                token,
                requests.Request(),
                google_client_id
            )

            # Check issuer
            if id_info['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
                raise ValueError('Wrong issuer.')

            email = id_info.get('email')
            first_name = id_info.get('given_name', '')
            last_name = id_info.get('family_name', '')
            username = email.split('@')[0]

            if not email:
                return Response(
                    {'error': 'Email not provided by Google.'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Get or create User
            user, created = User.objects.get_or_create(
                email=email,
                defaults={
                    'username': username,
                    'first_name': first_name,
                    'last_name': last_name,
                    'is_active': True
                }
            )

            # If user already existed, let's update names if they changed
            if not created:
                user.first_name = first_name
                user.last_name = last_name
                user.save()

            # Generate standard DRF SimpleJWT tokens
            refresh = RefreshToken.for_user(user)

            return Response({
                'success': True,
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'full_name': f"{user.first_name} {user.last_name}".strip() or user.username,
                },
                'access': str(refresh.access_token),
                'refresh': str(refresh)
            }, status=status.HTTP_200_OK)

        except ValueError as e:
            return Response(
                {'error': f'Invalid token verification: {str(e)}'},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {'error': f'Authentication failed: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
