from django.db import models
from customuser.models import CustomUser
import uuid

from PIL import Image
from rembg import remove 
# Create your models here.

class UploadImage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/')

class RemovedBg(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    result = models.ImageField(upload_to='removedbg/')

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        if self.result:
            img = Image.open(self.result.path)
            bgremoved = remove(img)
            bgremoved.save(self.result.path, format='PNG')