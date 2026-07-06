from django.contrib import admin
from .models import Project, ProjectImage


class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 3
    fields = ['image', 'caption', 'order']


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display  = ['title', 'city', 'style', 'room_type', 'is_featured', 'created_at']
    list_filter   = ['style', 'room_type', 'city', 'is_featured']
    search_fields = ['title', 'city', 'description']
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ['is_featured']
    inlines = [ProjectImageInline]
    readonly_fields = ['created_at', 'updated_at']


@admin.register(ProjectImage)
class ProjectImageAdmin(admin.ModelAdmin):
    list_display = ['project', 'caption', 'order']
    list_filter  = ['project']
