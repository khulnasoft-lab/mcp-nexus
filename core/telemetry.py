# telemetry.py

import json
import datetime
from pathlib import Path

TELEMETRY_PATH = Path(".mcp/telemetry.json")

class Telemetry:
    def __init__(self):
        TELEMETRY_PATH.parent.mkdir(parents=True, exist_ok=True)
        if not TELEMETRY_PATH.exists():
            with open(TELEMETRY_PATH, 'w') as f:
                json.dump({"events": []}, f)

    def log(self, event: str):
        timestamp = datetime.datetime.utcnow().isoformat()
        data = self._read()
        data["events"].append({"event": event, "time": timestamp})
        self._write(data)

    def recent_events(self, days: int = 7):
        cutoff = datetime.datetime.utcnow() - datetime.timedelta(days=days)
        data = self._read()
        return [e for e in data["events"] if datetime.datetime.fromisoformat(e["time"]) > cutoff]

    def _read(self):
        with open(TELEMETRY_PATH) as f:
            return json.load(f)

    def _write(self, data):
        with open(TELEMETRY_PATH, 'w') as f:
            json.dump(data, f, indent=2)