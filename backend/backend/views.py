from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    # Delete the user's authentication token
    request.user.auth_token.delete()
    # logout(request)
    return Response({"message": "Logged out successfully"})
