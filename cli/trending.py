# trending.py

import typer
from core.telemetry import Telemetry

trending_app = typer.Typer()
telemetry = Telemetry()

@trending_app.command("show")
def show():
    """Show trending events in the last 7 days"""
    events = telemetry.recent_events()
    typer.echo("📊 Trending events:")
    for e in events:
        typer.echo(f"- {e['time']}: {e['event']}")