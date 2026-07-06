from rest_framework import generics, filters
from .models import Project
from .serializers import ProjectListSerializer, ProjectDetailSerializer


class ProjectListView(generics.ListAPIView):
    """
    GET /api/projects/
    Filter by: ?city=Delhi&style=modern&room_type=kitchen&is_featured=true
    """
    queryset = Project.objects.all()
    serializer_class = ProjectListSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'city', 'style']
    ordering_fields = ['created_at', 'title']

    def get_queryset(self):
        qs = super().get_queryset()
        city = self.request.query_params.get('city')
        style = self.request.query_params.get('style')
        room_type = self.request.query_params.get('room_type')
        budget = self.request.query_params.get('budget_range')
        is_featured = self.request.query_params.get('is_featured')

        if city:
            qs = qs.filter(city__icontains=city)
        if style:
            qs = qs.filter(style=style)
        if room_type:
            qs = qs.filter(room_type=room_type)
        if budget:
            qs = qs.filter(budget_range=budget)
        if is_featured and is_featured.lower() == 'true':
            qs = qs.filter(is_featured=True)
        return qs


class ProjectDetailView(generics.RetrieveAPIView):
    """GET /api/projects/<slug>/"""
    queryset = Project.objects.all()
    serializer_class = ProjectDetailSerializer
    lookup_field = 'slug'
