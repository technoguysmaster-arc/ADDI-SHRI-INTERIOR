from rest_framework import generics
from .models import Testimonial
from .serializers import TestimonialSerializer


class TestimonialListView(generics.ListAPIView):
    """GET /api/testimonials/?featured=true"""
    serializer_class = TestimonialSerializer

    def get_queryset(self):
        qs = Testimonial.objects.all()
        featured = self.request.query_params.get('featured')
        if featured and featured.lower() == 'true':
            qs = qs.filter(is_featured=True)
        return qs
