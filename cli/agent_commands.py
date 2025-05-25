# agent_commands.py

import typer
from core.agent_manager import AgentManager

agent_app = typer.Typer()
manager = AgentManager()

@agent_app.command("start")
def start(name: str):
    """Start an MCP agent"""
    manager.start_agent(name)

@agent_app.command("list")
def list_agents():
    """List all running agents"""
    for agent in manager.list_agents():
        typer.echo(f"- {agent}")

@agent_app.command("stop")
def stop(name: str):
    """Stop an MCP agent"""
    manager.stop_agent(name)