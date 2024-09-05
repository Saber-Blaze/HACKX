from django.db import models
from datetime import timedelta

# Create your models here.

class PatientRecord(models.Model):
    uid = models.CharField(primary_key=True)
    full_name = models.CharField(max_length=255)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField()
    address = models.TextField()
    emergency_contact_number = models.CharField(max_length=15)
    chronic_conditions = models.JSONField(null=True, blank=True)
    blood_type = models.CharField(max_length=3)
    height = models.FloatField()
    weight = models.FloatField()
    body_temperature = models.FloatField()
    heart_rate = models.IntegerField()
    respiratory_rate = models.IntegerField()

class DoctorRecord(models.Model):
    uid = models.CharField(primary_key=True)
    full_name = models.CharField(max_length=255)
    gender = models.CharField(max_length=10)
    specialization = models.CharField()

class Medication(models.Model):
    patient = models.ForeignKey(PatientRecord, on_delete=models.CASCADE, related_name='medications')
    medication_name = models.CharField(max_length=255)
    dosage = models.IntegerField()
    frequency = models.IntegerField()
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    instruction = models.CharField()

    def save(self, *args, **kwargs):
        if self.dosage and self.start_date:
            self.end_date = self.start_date + timedelta(days=self.dosage)
        super().save(*args, **kwargs)

class DPR(models.Model):
    doc = models.ForeignKey(DoctorRecord, on_delete=models.CASCADE, related_name='DPR')
    uid = models.CharField()
