# create_schema.py

from pathlib import Path
from mcpgen.utils import prompt_user, write_file

def create_schema():
    name = prompt_user("Enter schema name")
    schema_template = {
        "name": name,
        "transforms": [],
        "assertions": []
    }
    path = Path(f"data/schemas/{name}.json")
    write_file(path, schema_template)
    print(f"✅ Created schema: {path}")
