from rest_framework import serializers
from .models import CustomerLead


class CustomerLeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerLead
        fields = ['id', 'user', 'name', 'phone', 'email', 'city',
                  'bhk_type', 'budget_range', 'message', 'source_page', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']

    def validate_phone(self, value):
        cleaned = value.replace(' ', '').replace('-', '')
        if not cleaned.lstrip('+').isdigit():
            raise serializers.ValidationError("Enter a valid phone number.")
        if len(cleaned) < 10:
            raise serializers.ValidationError("Phone number must be at least 10 digits.")
        return value
