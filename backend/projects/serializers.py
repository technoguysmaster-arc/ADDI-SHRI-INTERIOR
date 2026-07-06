from rest_framework import serializers
from .models import Project, ProjectImage


class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectImage
        fields = ['id', 'image', 'caption', 'order']


class ProjectListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for list/grid views."""
    class Meta:
        model = Project
        fields = ['id', 'title', 'slug', 'city', 'style', 'room_type',
                  'budget_range', 'cover_image', 'is_featured', 'created_at']


class ProjectDetailSerializer(serializers.ModelSerializer):
    """Full serializer including gallery images."""
    images = ProjectImageSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = '__all__'
