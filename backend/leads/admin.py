from django.contrib import admin
from .models import CustomerLead


@admin.register(CustomerLead)
class CustomerLeadAdmin(admin.ModelAdmin):
    list_display  = ['name', 'user', 'phone', 'email', 'city', 'bhk_type', 'status', 'created_at']
    list_filter   = ['status', 'city', 'bhk_type', 'budget_range']
    search_fields = ['name', 'phone', 'email', 'city', 'user__email']
    list_editable = ['status']
    readonly_fields = ['created_at', 'updated_at']
    date_hierarchy = 'created_at'

    fieldsets = (
        ('User Association', {
            'fields': ('user',)
        }),
        ('Contact Info', {
            'fields': ('name', 'phone', 'email')
        }),
        ('Project Details', {
            'fields': ('city', 'bhk_type', 'budget_range', 'message')
        }),
        ('Lead Management', {
            'fields': ('status', 'source_page', 'created_at', 'updated_at')
        }),
    )
