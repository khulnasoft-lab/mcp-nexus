# MCP Nexus

MCP Nexus is a powerful hub for managing agents, schemas, telemetry, and plugins. It provides a centralized platform for monitoring and controlling distributed agents in your system.

## Features

- Agent Management: Monitor and control distributed agents
- Web Dashboard: Modern Next.js-based UI for system monitoring
- Plugin System: Extensible architecture for custom functionality
- CLI Interface: Command-line tools for system management
- Telemetry: Collect and analyze system metrics

## Installation

### Prerequisites

- Python 3.9 or higher
- Node.js 16 or higher (for web dashboard)
- Poetry (Python package manager)

### Setup

1. Install Python dependencies:

```bash
poetry install
```

1. Set up the web dashboard:

```bash
cd web_dashboard
pnpm install
```

## Usage

### CLI

The `mcp` command-line tool provides various commands for managing your system:

```bash
# Run the CLI tool
poetry run mcp
```

### Web Dashboard

To start the web dashboard:

```bash
cd web_dashboard
pnpm run dev
```

The dashboard will be available at [http://localhost:3000](http://localhost:3000)

## Project Structure

- `cli/`: Command-line interface implementation
- `core/`: Core functionality and business logic
- `data/`: Data models and storage
- `mcpgen/`: Code generation utilities
- `plugins/`: Plugin system implementation
- `tests/`: Test suite
- `web_dashboard/`: Next.js web interface

## Development

### Running Tests

```bash
poetry run pytest
```

## License

MIT License - see LICENSE file for details

## Authors

KhulnaSoft,Ltd <info@khulnasoft.com>
