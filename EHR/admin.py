from django.contrib import admin
from .models import PatientRecord
from .models import DoctorRecord
from .models import Medication
from .models import DPR
# Register your models here.
admin.site.register(PatientRecord)
admin.site.register(DoctorRecord)
admin.site.register(Medication)
admin.site.register(DPR)
