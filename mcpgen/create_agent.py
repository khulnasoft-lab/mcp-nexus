# create_agent.py


from pathlib import Path
from mcpgen.utils import prompt_user, write_file

def create_agent():
    name = prompt_user("Enter agent name")
    config = {
        "name": name,
        "version": "0.1.0",
        "description": f"Agent for {name}"
    }
    path = Path(f"data/agents/{name}.json")
    write_file(path, config)
    print(f"✅ Created agent config: {path}")