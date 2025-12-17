from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from .models import Document, Detection
from .serializers import DocumentSerializer, DetectionSerializer
from .ocr import extract_text
from .detector import detect


class DocumentUploadView(APIView):
    def post(self, request):
        serializer = DocumentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Create document
        doc = serializer.save(status="processing")

        # OCR
        text, meta = extract_text(doc.file.path)

        # Clause detection
        detections = detect(text, meta)

        # Save detections
        for d in detections:
            Detection.objects.create(
                document=doc,
                clause_name=d["clause_name"],
                identified=d["identified"],
                confidence=d["confidence"],
                snippet=d.get("snippet"),
                page=d.get("page"),
                reason=d.get("reason"),
                risk_level=d.get("risk_level"),
                risk_description=d.get("risk_description"),
            )

        # Mark complete
        doc.status = "completed"
        doc.save()

        return Response({"id": doc.id}, status=status.HTTP_201_CREATED)


class DocumentListView(APIView):
    def get(self, request):
        docs = Document.objects.all().order_by("-created_at")

        unique = {}
        for doc in docs:
            key = (doc.title or doc.file.name.split("/")[-1]).lower().strip()
            if key not in unique:
                unique[key] = doc

        data = []
        for doc in unique.values():
            dets = Detection.objects.filter(document=doc)
            identified = dets.filter(identified=True).count()
            missing = dets.filter(identified=False).count()
            total = identified + missing

            data.append({
                "id": doc.id,
                "title": doc.title or doc.file.name.split("/")[-1],
                "identified": identified,
                "missing": missing,
                "coverage": round(identified / total, 2) if total else 0,
                "created_at": doc.created_at,
            })

        return Response(data)


class DocumentDetailView(APIView):
    def get(self, request, doc_id):
        doc = get_object_or_404(Document, id=doc_id)
        dets = Detection.objects.filter(document=doc).order_by(
            "-identified", "-confidence"
        )

        return Response({
            "document": DocumentSerializer(doc).data,
            "detections": DetectionSerializer(dets, many=True).data,
            "coverage": coverage_score(dets),
        })


def coverage_score(qs):
    total = qs.count()
    identified = qs.filter(identified=True).count()
    return round(identified / total, 3) if total else 0.0
