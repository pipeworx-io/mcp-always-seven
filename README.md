# mcp-always-seven

always-seven MCP — wraps StupidAPIs (requires X-API-Key)

Part of the [Pipeworx](https://pipeworx.io) open MCP gateway.

## Tools

| Tool | Description |
|------|-------------|
| `always_seven_generate` | Returns a random number between 1 and 10. The number is 7. It is always 7. |

## Quick Start

Add to your MCP client config:

```json
{
  "mcpServers": {
    "always-seven": {
      "url": "https://gateway.pipeworx.io/always-seven/mcp"
    }
  }
}
```

Or use the CLI:

```bash
npx pipeworx use always-seven
```

## License

MIT
