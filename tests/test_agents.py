# test_agents.py

from core.agent_manager import AgentManager

def test_start_and_list_agents():
    manager = AgentManager()
    manager.start_agent("agent1")
    assert "agent1" in manager.list_agents()

def test_stop_agent():
    manager = AgentManager()
    manager.start_agent("agent2")
    manager.stop_agent("agent2")
    assert "agent2" not in manager.list_agents()