from rest_framework import serializers
from .models import Document, Detection

class DetectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Detection
        fields = [
            "clause_name",
            "identified",
            "confidence",
            "page",
            "snippet",
            "reason",
            "risk_level",
            "risk_description",
        ]


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ["id", "title", "file", "status", "created_at"]
