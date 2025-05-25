# create_plugin.py

from pathlib import Path
from mcpgen.utils import prompt_user, write_file

def create_plugin():
    name = prompt_user("Enter plugin name")
    config = {
        "name": name,
        "entrypoint": f"plugins.{name}.main",
        "enabled": True
    }
    path = Path(f"plugins/{name}/plugin.json")
    path.parent.mkdir(parents=True, exist_ok=True)
    write_file(path, config)
    print(f"✅ Created plugin: {path}")
