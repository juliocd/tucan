from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed

class CookieTokenAuthentication(TokenAuthentication):
    def authenticate(self, request):
        # Get the token from the cookie
        token = request.COOKIES.get('auth_token')

        if not token:
            return None

        try:
            # This is the part that does the actual authentication
            return self.authenticate_credentials(token)
        except AuthenticationFailed as e:
            # You can log the error here if you want
            raise e
