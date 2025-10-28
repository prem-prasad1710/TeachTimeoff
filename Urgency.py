"""Simple keyword-based urgency detector used by `urgent.py`.

This module provides a small, deterministic `detect_urgency(reason)`
helper so the project can run without external AI models. It returns one
of: "High", "Normal", "Low".

The rules are intentionally simple and easy to extend.
"""

from typing import Optional


HIGH_KEYWORDS = {"emergency", "hospital", "sick", "death", "urgent", "asap", "immediately", "critical"}
MEDIUM_KEYWORDS = {"family", "personal", "appointment", "care", "doctor", "bereavement"}


def detect_urgency(reason: Optional[str]) -> str:
    """Return a simple urgency label for a free-text reason.

    - Returns "High" if any high-severity keyword appears.
    - Returns "Normal" if any medium-severity keyword appears.
    - Otherwise returns "Low".
    """
    if not reason:
        return "Low"

    text = reason.lower()
    words = set(text.split())

    if any(k in text for k in HIGH_KEYWORDS):
        return "High"

    if any(k in text for k in MEDIUM_KEYWORDS):
        return "Normal"

    return "Low"


if __name__ == "__main__":
    # quick manual test
    examples = [
        "I have a medical emergency and need leave immediately",
        "Going to a family function next week",
        "Vacation"
    ]
    for e in examples:
        print(e, "->", detect_urgency(e))
