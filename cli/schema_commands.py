# schema_commands.py

import typer
from core.schema_builder import Schema

schema_app = typer.Typer()

@schema_app.command("validate")
def validate(value: str):
    """Validate input using a sample schema"""
    schema = Schema()
    schema.transform(str.strip).assert_that(lambda v: len(v) > 0)
    result = schema.validate(value)
    typer.echo("✅ Valid" if result else "❌ Invalid")
