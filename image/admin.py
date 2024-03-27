from django.contrib import admin

from .models import RemovedBg, Upscale, BlurBg
# Register your models here.

admin.site.register(RemovedBg)
admin.site.register(Upscale)
admin.site.register(BlurBg)