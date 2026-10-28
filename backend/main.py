from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import random
import time
from datetime import datetime, timezone

app = FastAPI(
    title="TrustShield AI API",
    description="AI-Powered Digital Scam & Deepfake Detection Platform",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ScanResult(BaseModel):
    id: str
    scan_type: str
    trust_score: int
    risk_level: str
    confidence: float
    explanation: str
    recommendations: List[str]
    timestamp: str
    details: dict


def generate_trust_score(scan_type: str) -> tuple[int, str, float]:
    """Generate realistic mock trust score based on scan type."""
    if scan_type in ["email", "sms", "url", "qr"]:
        score = random.randint(18, 92)
    else:
        score = random.randint(35, 96)

    if score >= 75:
        risk = "Low"
    elif score >= 50:
        risk = "Medium"
    else:
        risk = "High"

    confidence = round(random.uniform(0.84, 0.98), 2)
    return score, risk, confidence


EXPLANATIONS = {
    "image": (
        "Visual artifact analysis, lighting consistency, facial landmark geometry, "
        "and metadata inspection completed. Potential deepfake indicators evaluated "
        "in compression patterns and frequency domain."
    ),
    "video": (
        "Frame-by-frame temporal consistency analysis + audio-visual synchronization check. "
        "Lip-sync anomalies, unnatural motion blur, and frame interpolation artifacts assessed."
    ),
    "voice": (
        "Spectral analysis, prosody patterns, and deepfake voice cloning signatures examined. "
        "Background noise consistency and emotional valence checked against known TTS models."
    ),
    "url": (
        "Domain age, WHOIS data, SSL certificate validity, redirect chain analysis, "
        "phishing pattern matching, and multi-source reputation databases queried."
    ),
    "email": (
        "Header analysis, sender reputation, urgency & fear language detection, "
        "link safety scoring, attachment risk, and emotional manipulation patterns evaluated."
    ),
    "sms": (
        "Sender ID validation, URL extraction & reputation, social engineering phrase detection, "
        "and matching against known scam template libraries completed."
    ),
    "qr": (
        "QR payload decoding, destination URL reputation check, multi-hop redirect analysis, "
        "and malicious payload / phishing kit detection performed."
    ),
}

RECOMMENDATIONS = {
    "High": [
        "Do not interact with this content",
        "Report to your security team or platform",
        "Block the sender / domain immediately",
        "Enable additional MFA on related accounts",
        "Scan any devices that may have interacted with it"
    ],
    "Medium": [
        "Verify the request through an alternative trusted channel",
        "Hover over all links before clicking",
        "Cross-check with official sources",
        "Proceed only if you fully trust the source",
        "Consider enabling extra monitoring"
    ],
    "Low": [
        "Content appears legitimate based on current signals",
        "Still verify any high-value or unusual requests",
        "Keep monitoring for future changes",
        "Maintain good security hygiene"
    ],
}


@app.get("/")
def root():
    return {
        "message": "TrustShield AI API is running",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/api/stats")
def get_stats():
    return {
        "total_scans": 12847,
        "threats_detected": 2143,
        "safe_files": 10704,
        "high_risk_alerts": 387,
        "avg_trust_score": 71.4,
        "scans_today": 342,
        "blocked_today": 47
    }


@app.get("/api/recent")
def get_recent():
    types = ["email", "url", "image", "voice", "sms", "qr", "video"]
    results = []
    for i in range(10):
        t = random.choice(types)
        score, risk, _ = generate_trust_score(t)
        results.append({
            "id": f"scan_{int(time.time())}_{i}",
            "scan_type": t,
            "trust_score": score,
            "risk_level": risk,
            "timestamp": datetime.now(timezone.utc).isoformat()
        })
    return results


@app.get("/api/charts/threat-distribution")
def threat_distribution():
    return [
        {"name": "Email", "value": 34},
        {"name": "URL", "value": 22},
        {"name": "SMS", "value": 15},
        {"name": "QR", "value": 11},
        {"name": "Image", "value": 9},
        {"name": "Voice", "value": 6},
        {"name": "Video", "value": 3},
    ]


@app.get("/api/charts/risk-trend")
def risk_trend():
    days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    return [
        {
            "day": day,
            "high": random.randint(8, 28),
            "medium": random.randint(15, 40),
            "low": random.randint(40, 80)
        }
        for day in days
    ]


@app.post("/api/scan", response_model=ScanResult)
async def perform_scan(
    scan_type: str = Form(...),
    content: Optional[str] = Form(None),
    url: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None)
):
    # Simulate realistic processing time
    time.sleep(random.uniform(0.9, 2.1))

    score, risk, confidence = generate_trust_score(scan_type)

    explanation = EXPLANATIONS.get(
        scan_type,
        "Multi-signal analysis completed across available intelligence layers."
    )

    if content:
        explanation += f" Analyzed {len(content)} characters of input content."
    if url:
        explanation += f" Target analyzed: {url[:70]}{'...' if len(url) > 70 else ''}"
    if file:
        explanation += f" File received: {file.filename} ({file.content_type})."

    return ScanResult(
        id=f"ts_{int(time.time() * 1000)}",
        scan_type=scan_type,
        trust_score=score,
        risk_level=risk,
        confidence=confidence,
        explanation=explanation,
        recommendations=RECOMMENDATIONS[risk],
        timestamp=datetime.now(timezone.utc).isoformat(),
        details={
            "signals_checked": random.randint(7, 15),
            "model_version": "trustshield-v0.9-mock",
            "processing_ms": random.randint(480, 1950),
            "engines": ["artifact", "reputation", "nlp", "behavioral"]
        }
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
