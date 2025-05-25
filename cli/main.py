# main.py
import typer
from .agent_commands import app as agent_app
from .schema_commands import app as schema_app
from .trending import app as trending_app

app = typer.Typer()

app.add_typer(agent_app, name="agent")
app.add_typer(schema_app, name="schema")
app.add_typer(trending_app, name="trending")

if __name__ == "__main__":
    app()