from django.contrib import admin
from .models import Testimonial


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display  = ['customer_name', 'city', 'rating', 'is_featured', 'created_at']
    list_filter   = ['rating', 'is_featured', 'city']
    search_fields = ['customer_name', 'review_text']
    list_editable = ['is_featured']
