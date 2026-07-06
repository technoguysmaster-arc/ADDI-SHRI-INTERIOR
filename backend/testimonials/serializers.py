from rest_framework import serializers
from .models import Testimonial


class TestimonialSerializer(serializers.ModelSerializer):
    project_title = serializers.CharField(source='project.title', read_only=True, allow_null=True)

    class Meta:
        model = Testimonial
        fields = ['id', 'customer_name', 'city', 'rating', 'review_text',
                  'project_title', 'photo', 'is_featured', 'created_at']
