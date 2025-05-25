# registry.py

from typing import Dict

class Registry:
    def __init__(self):
        self.plugins: Dict[str, dict] = {}
        self.agents: Dict[str, dict] = {}

    def register_plugin(self, name: str, config: dict):
        self.plugins[name] = config
        print(f"✅ Plugin registered: {name}")

    def register_agent(self, name: str, config: dict):
        self.agents[name] = config
        print(f"✅ Agent registered: {name}")

    def list_plugins(self):
        return list(self.plugins.keys())

    def list_agents(self):
        return list(self.agents.keys())
