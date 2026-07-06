from django.db import models
from django.contrib.auth.models import User


class CustomerLead(models.Model):
    STATUS_CHOICES = [
        ('new', 'New'),
        ('contacted', 'Contacted'),
        ('qualified', 'Qualified'),
        ('converted', 'Converted'),
        ('lost', 'Lost'),
    ]

    BHK_CHOICES = [
        ('1bhk', '1 BHK'),
        ('2bhk', '2 BHK'),
        ('3bhk', '3 BHK'),
        ('4bhk', '4 BHK'),
        ('villa', 'Villa / Independent House'),
        ('office', 'Office Space'),
        ('other', 'Other'),
    ]

    BUDGET_CHOICES = [
        ('under_5l', 'Under ₹5 Lakhs'),
        ('5l_10l', '₹5L – ₹10L'),
        ('10l_20l', '₹10L – ₹20L'),
        ('20l_50l', '₹20L – ₹50L'),
        ('above_50l', 'Above ₹50 Lakhs'),
    ]

    user         = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name='leads')
    name         = models.CharField(max_length=150)
    phone        = models.CharField(max_length=15)
    email        = models.EmailField(blank=True)
    city         = models.CharField(max_length=100, blank=True)
    bhk_type     = models.CharField(max_length=20, choices=BHK_CHOICES, blank=True)
    budget_range = models.CharField(max_length=20, choices=BUDGET_CHOICES, blank=True)
    message      = models.TextField(blank=True)
    source_page  = models.CharField(max_length=200, blank=True, help_text='URL or page name where lead came from')
    status       = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    created_at   = models.DateTimeField(auto_now_add=True)
    updated_at   = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} ({self.phone}) — {self.status}"
