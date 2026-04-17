# OpenAPI to Confluence Converter

Automated tool to parse OpenAPI YAML specifications into sortable and filterable Confluence HTML tables.

## Usage
```bash
npm run run -- <input> [output-file]
```

* `<input>`: Can be a remote URL (e.g., `https://.../openapi.yaml`) or a local file path (e.g., `./sample.yaml`).
* `[output-file]`: (Optional) The path to save the generated HTML. If omitted, the HTML is printed to the console.
