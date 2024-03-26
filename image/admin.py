from django.contrib import admin

from .models import UploadImage, RemovedBg
# Register your models here.


admin.site.register(UploadImage)
admin.site.register(RemovedBg)