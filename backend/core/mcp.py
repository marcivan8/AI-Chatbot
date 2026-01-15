from typing import Callable, Dict, List, Any
import inspect
from functools import wraps

class MCPTool:
    def __init__(self, name: str, description: str, func: Callable):
        self.name = name
        self.description = description
        self.func = func
        self.parameters = str(inspect.signature(func))

    def run(self, **kwargs):
        return self.func(**kwargs)

class MCPRegistry:
    def __init__(self):
        self.tools: Dict[str, MCPTool] = {}

    def register_tool(self, name: str, description: str):
        """Decorator to register a function as a tool."""
        def decorator(func):
            tool = MCPTool(name, description, func)
            self.tools[name] = tool
            return func
        return decorator

    def get_tools_description(self) -> str:
        """Returns a formatted string describing all available tools."""
        desc = "Available Tools:\n"
        for name, tool in self.tools.items():
            desc += f"- {name}: {tool.description} (Params: {tool.parameters})\n"
        return desc

    def execute_tool(self, tool_name: str, arguments: Dict[str, Any]):
        """Executes a tool by name with provided arguments."""
        if tool_name not in self.tools:
            return f"Error: Tool '{tool_name}' not found."
        
        try:
            return self.tools[tool_name].run(**arguments)
        except Exception as e:
            return f"Error executing tool '{tool_name}': {str(e)}"

# Singleton registry
mcp_registry = MCPRegistry()
