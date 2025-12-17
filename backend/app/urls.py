from django.urls import path
from .views import (
    DocumentUploadView,
    DocumentListView,
    DocumentDetailView,
)

urlpatterns = [
    path("analyze/", DocumentUploadView.as_view()),
    path("documents/", DocumentListView.as_view()),
    path("documents/<int:doc_id>/", DocumentDetailView.as_view()),
]
