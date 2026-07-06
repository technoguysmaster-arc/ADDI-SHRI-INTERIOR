from rest_framework import generics, status, permissions
from rest_framework.response import Response
from .models import CustomerLead
from .serializers import CustomerLeadSerializer


class CustomerLeadCreateView(generics.CreateAPIView):
    """
    POST /api/leads/
    Submit a new customer enquiry / lead. Requires JWT authentication.
    """
    queryset = CustomerLead.objects.all()
    serializer_class = CustomerLeadSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {
                'success': True,
                'message': 'Thank you! Our team will contact you within 24 hours.',
                'data': serializer.data
            },
            status=status.HTTP_201_CREATED
        )
