from django.shortcuts import render
from .models import PatientRecord,Medication
# Create your views here.
def home(request):
    patient = PatientRecord.objects.get(uid='PA_1')
    return render(request,'profile.html',{'patient':patient})
