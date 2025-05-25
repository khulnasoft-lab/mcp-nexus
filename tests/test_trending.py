# test_trending.py

from core.telemetry import Telemetry
import time

def test_log_and_recent_events():
    telemetry = Telemetry()
    telemetry.log("test_event")
    recent = telemetry.recent_events(days=1)
    assert any(event["event"] == "test_event" for event in recent)
