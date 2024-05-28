from django.db import models

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)
    class Meta:
        # Specify the custom table name here
        db_table = 'category'

class Book(models.Model):
    title = models.CharField(max_length=100, blank=False, null=False)
    author = models.CharField(max_length=100, blank=False, null=False, default='Armstro')
    price = models.FloatField(null=False,blank=False)
    description = models.CharField(max_length=100, blank=False, null=False)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    photo = models.ImageField(upload_to='book_photos/')  # Updated to ImageField

    class Meta:
        # Specify the custom table name here
        db_table = 'book'