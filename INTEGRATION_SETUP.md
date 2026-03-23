# Gliomax Integration Setup Guide

## Overview
The system now includes a 3-layer input validation pipeline with CLIP-based MRI verification integrated into the backend.

## Installation Requirements

### Backend Dependencies
Install these Python packages:

```bash
pip install fastapi uvicorn torch torchvision pillow numpy
pip install git+https://github.com/openai/CLIP.git --quiet
```

### What's New
1. **Layer 1**: Grayscale heuristic validation - ensures image looks like medical scan
2. **Layer 2**: CLIP MRI similarity check - verifies image resembles brain MRI
3. **Layer 3**: Confidence threshold validation - rejects uncertain predictions

## File Changes

### Backend (`inference_server.py`)
- ✅ Added 3-layer validation pipeline
- ✅ Integrated CLIP model loading (optional but recommended)
- ✅ Enhanced response format with validation details
- ✅ Better error handling and diagnostics

### Frontend (`geminiService.ts`)
- ✅ Updated `analyzeWithCustomModel()` to handle new response format
- ✅ Added support for validation rejection messages
- ✅ Improved error reporting

## Response Format

### Success Response
```json
{
  "status": "success",
  "diagnosis": "Glioma",
  "confidence": 0.95,
  "allProbabilities": {
    "Glioma": 0.95,
    "Meningioma": 0.04,
    "No Tumor": 0.005,
    "Pituitary": 0.005
  },
  "tumorLocation": "Requires clinical assessment",
  "clinicalSummary": "CNN-Transformer prediction: Glioma (95.0%)",
  "suggestedNextSteps": ["Consult with neuro-oncologist", "Schedule follow-up imaging"],
  "warnings": null,
  "validationDetails": {...}
}
```

### Validation Rejection (Layer 1 or 2)
```json
{
  "status": "rejected",
  "layer": 1,
  "reason": "Image too colorful (saturation: 0.25)",
  "details": {
    "mean_saturation": 0.25,
    "pixel_std": 0.12
  }
}
```

### Low Confidence (Layer 3)
```json
{
  "status": "rejected",
  "layer": 3,
  "reason": "Confidence critically low: 20.5%",
  "diagnosis": "Glioma",
  "confidence": 0.205
}
```

## Running the System

### Terminal 1: Backend Server
```bash
cd backend
py inference_server.py
```

Backend will output:
```
✅ CNN-Transformer loaded
✅ CLIP loaded (4 positive prompts)
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### Terminal 2: Frontend Dev Server
```bash
npm run dev
```

## Testing

### Health Check
```bash
curl http://localhost:8000/health
```

Should return:
```json
{"status": "ok", "model_loaded": true}
```

### Upload Test
```bash
curl -X POST http://localhost:8000/analyze \
  -F "file=@test_mri.jpg"
```

## Validation Thresholds

You can adjust these in `inference_server.py`:

```python
GRAYSCALE_SAT_THRESHOLD = 0.15        # Max image saturation (color)
GRAYSCALE_STD_THRESHOLD = 0.08        # Min pixel variation (to reject blank images)
CLIP_MRI_THRESHOLD = 0.40             # Min CLIP score for "brain MRI" classification
CONFIDENCE_WARN_THRESHOLD = 0.50      # Warn if model confidence below this
CONFIDENCE_REJECT_THRESHOLD = 0.25    # Reject if confidence below this
```

## Troubleshooting

### CLIP Import Error
If you see: `ModuleNotFoundError: No module named 'clip'`

```bash
pip install git+https://github.com/openai/CLIP.git --quiet
```

### Model Not Loading
Check that `model_full.pth` exists in the `backend/` directory and is accessible.

### CORS Issues
If frontend can't reach backend, ensure CORS middleware is enabled (it is by default).

### Validation Always Failing
- Check saturation threshold - lower it if rejecting valid MRIs
- Check CLIP threshold - lower if CLIP confidence is borderline
- Check image file quality - corrupted images will fail validation

## Next Steps

1. ✅ Install dependencies
2. ✅ Verify model file exists (`model_full.pth`)
3. ✅ Start backend server
4. ✅ Start frontend dev server
5. ✅ Test with a sample MRI image
6. ✅ Monitor backend console for validation details

## Notes

- CLIP validation is optional but recommended for production
- All validation happens before model inference for faster rejection
- Validation details are included in responses for debugging
- Low confidence warnings don't reject the prediction, only encourage caution
