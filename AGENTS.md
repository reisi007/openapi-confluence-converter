# AI Agent Configuration & Architecture Directives

## 1. THE SINGLE SOURCE OF TRUTH (STRICT)
The script `import_gemini.mjs` is the definitive architect of this repository. **All** project files—including run configurations, package scripts, source modules (`src/*`), and documentation—MUST be generated and mutated exclusively by modifying and running this file.

## 2. Technical Directives
- **Runtime Paradigm:** Node.js native ECMAScript Modules (ESM) only.
- **OpenAPI Extensions:** The canonical tag for Agile user stories is `x-story`.
- **I/O Operations:** Input relies on remote URLs, with an optional local file override for development (Dev Mode).
- **Confluence Output:** Generated tables must integrate sorting and filtering capabilities (via `table-filter` and `table-sorter` macros). **User Stories must be rendered as clean, comma-separated text** to ensure perfect compatibility with Confluence's multi-value column filtering.
- **Automation:** GitHub/GitLab raw URLs must automatically resolve to their interactive blob equivalents for source code referencing.