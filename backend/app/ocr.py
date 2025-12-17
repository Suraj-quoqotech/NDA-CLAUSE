import pdfplumber
import pytesseract
from PIL import Image
import tempfile
import os


def extract_text(file_path):
    text_chunks = []
    pages_meta = []

    if file_path.lower().endswith(".pdf"):
        with pdfplumber.open(file_path) as pdf:
            for i, page in enumerate(pdf.pages, start=1):
                txt = page.extract_text() or ""
                if txt.strip():
                    text_chunks.append(txt)
                    pages_meta.append({"page": i, "mode": "text"})
                else:
                    img = page.to_image(resolution=200).original
                    img_path = _save_temp_image(img)
                    ocr_txt = pytesseract.image_to_string(Image.open(img_path))
                    text_chunks.append(ocr_txt)
                    pages_meta.append({"page": i, "mode": "ocr"})
                    os.remove(img_path)
    else:
        ocr_txt = pytesseract.image_to_string(Image.open(file_path))
        text_chunks.append(ocr_txt)
        pages_meta.append({"page": 1, "mode": "ocr"})

    return "\n\n".join(text_chunks), pages_meta


def _save_temp_image(img):
    fd, path = tempfile.mkstemp(suffix=".png")
    os.close(fd)
    img.save(path, format="PNG")
    return path
