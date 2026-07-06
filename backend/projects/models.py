from django.db import models


class Project(models.Model):
    STYLE_CHOICES = [
        ('modern', 'Modern'),
        ('contemporary', 'Contemporary'),
        ('traditional', 'Traditional'),
        ('minimalist', 'Minimalist'),
        ('luxury', 'Luxury'),
        ('scandinavian', 'Scandinavian'),
        ('industrial', 'Industrial'),
    ]

    ROOM_CHOICES = [
        ('living_room', 'Living Room'),
        ('bedroom', 'Bedroom'),
        ('kitchen', 'Kitchen'),
        ('bathroom', 'Bathroom'),
        ('full_home', 'Full Home'),
        ('office', 'Office'),
        ('exterior', 'Exterior'),
    ]

    BUDGET_CHOICES = [
        ('under_5l', 'Under ₹5 Lakhs'),
        ('5l_10l', '₹5L – ₹10L'),
        ('10l_20l', '₹10L – ₹20L'),
        ('20l_50l', '₹20L – ₹50L'),
        ('above_50l', 'Above ₹50 Lakhs'),
    ]

    title        = models.CharField(max_length=200)
    slug         = models.SlugField(unique=True, max_length=220)
    city         = models.CharField(max_length=100)
    style        = models.CharField(max_length=50, choices=STYLE_CHOICES, default='modern')
    room_type    = models.CharField(max_length=50, choices=ROOM_CHOICES, default='full_home')
    budget_range = models.CharField(max_length=20, choices=BUDGET_CHOICES, blank=True)
    description  = models.TextField(blank=True)
    cover_image  = models.ImageField(upload_to='projects/covers/', blank=True, null=True)
    is_featured  = models.BooleanField(default=False)
    created_at   = models.DateTimeField(auto_now_add=True)
    updated_at   = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class ProjectImage(models.Model):
    project = models.ForeignKey(Project, related_name='images', on_delete=models.CASCADE)
    image   = models.ImageField(upload_to='projects/gallery/')
    caption = models.CharField(max_length=200, blank=True)
    order   = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.project.title} — Image {self.order}"
