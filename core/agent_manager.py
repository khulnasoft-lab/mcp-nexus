# agent_manager.py

from typing import List

class AgentManager:
    def __init__(self):
        self.running_agents = []

    def start_agent(self, name: str):
        print(f"🔄 Starting MCP Agent: {name}")
        self.running_agents.append(name)

    def list_agents(self) -> List[str]:
        return self.running_agents

    def stop_agent(self, name: str):
        if name in self.running_agents:
            print(f"🛑 Stopping MCP Agent: {name}")
            self.running_agents.remove(name)