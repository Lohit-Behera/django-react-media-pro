from django.contrib import admin

from .models import RemovedBg, Upscale, BlurBg, FilteredImage, Convert, DownScale
# Register your models here.

admin.site.register(RemovedBg)
admin.site.register(Upscale)
admin.site.register(BlurBg)
admin.site.register(FilteredImage)
admin.site.register(Convert)
admin.site.register(DownScale)