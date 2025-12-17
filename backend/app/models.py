from django.db import models


class Document(models.Model):
    title = models.CharField(max_length=255, null=True, blank=True)
    file = models.FileField(upload_to="uploads/")
    status = models.CharField(max_length=50, default="processing")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title or self.file.name


class Detection(models.Model):
    document = models.ForeignKey(
        Document,
        on_delete=models.CASCADE,
        related_name="detections"
    )

    clause_name = models.CharField(max_length=255)
    identified = models.BooleanField(default=False)
    confidence = models.FloatField(default=0.0)
    page = models.IntegerField(null=True, blank=True)
    snippet = models.TextField(null=True, blank=True)

    # Risk fields (already present before progress work)
    reason = models.CharField(max_length=255, null=True, blank=True)
    risk_level = models.CharField(max_length=50, null=True, blank=True)
    risk_description = models.TextField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.clause_name} ({'Found' if self.identified else 'Missing'})"
