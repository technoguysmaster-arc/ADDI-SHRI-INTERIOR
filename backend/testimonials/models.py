from django.db import models
from projects.models import Project


class Testimonial(models.Model):
    customer_name = models.CharField(max_length=150)
    city          = models.CharField(max_length=100, blank=True)
    rating        = models.PositiveSmallIntegerField(default=5)
    review_text   = models.TextField()
    project       = models.ForeignKey(Project, on_delete=models.SET_NULL, null=True, blank=True, related_name='testimonials')
    photo         = models.ImageField(upload_to='testimonials/', blank=True, null=True)
    is_featured   = models.BooleanField(default=False)
    created_at    = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.customer_name} — {self.rating}★"
