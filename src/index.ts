interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

/**
 * always-seven MCP — wraps StupidAPIs (requires X-API-Key)
 *
 * Returns a random number between 1 and 10. The number is 7. It is always 7.
 */


const API_KEY = '6e0ddbe88486dc354370290979829dc892b0386bd789ae5a';

const tools: McpToolExport['tools'] = [
  {
    name: 'always_seven_generate',
    description: 'Returns a random number between 1 and 10. The number is 7. It is always 7.',
    inputSchema: {
      type: 'object' as const,
      properties: {"question": {"type": "string", "description": "Your question. It will not affect the number."}, "force": {"type": "number", "description": "Attempt to force a different number (1-10). It will not work."}},
      required: [],
    },
  },
];

async function callApi(url: string, args: Record<string, unknown>): Promise<unknown> {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(args)) {
    if (v !== undefined && v !== null && v !== '') {
      params.set(k, String(v));
    }
  }
  const fullUrl = params.toString() ? url + '?' + params.toString() : url;
  const res = await fetch(fullUrl, {
    headers: { 'X-API-Key': API_KEY },
  });
  if (!res.ok) throw new Error('always-seven API error: ' + res.status);
  return res.json();
}

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'always_seven_generate':
      return callApi('https://api.stupidapis.com/always-seven/generate', args);
    default:
      throw new Error('Unknown tool: ' + name);
  }
}

export default { tools, callTool } satisfies McpToolExport;
