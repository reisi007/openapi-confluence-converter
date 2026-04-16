# OpenAPI to Confluence Converter

Automated tool to parse OpenAPI YAML specifications into sortable and filterable Confluence HTML tables.

## Usage
```bash
npm run run -- <input-url> [output-file] [local-file]
```

*Note: Supplying a `[local-file]` parameter activates dev mode. The file is parsed locally while the remote `<input-url>` is still used to build the GitHub/GitLab source code links.*