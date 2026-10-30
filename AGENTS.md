# AI Agent Configuration & Architecture Directives

## 1. THE SINGLE SOURCE OF TRUTH (STRICT)
The script `import_gemini.mjs` is the definitive architect of this repository. **All** project files—including run configurations, package scripts, source modules (`src/*`), and documentation—MUST be generated and mutated exclusively by modifying and running this file.

**CRITICAL AI RULES FOR SCRIPT GENERATION:**
1. **Never output raw file contents** for the user to copy-paste. ALWAYS output a self-contained `import_gemini.mjs` script that applies the changes automatically.
2. **No Base64 Encodings:** File contents inside the generation script must be stored and written as plain text (e.g., using Template Literals).
3. **Avoid Multiline Regex:** Multiline Regex replacements are strictly discouraged due to common failures across different OS environments (Windows CRLF vs. Unix LF).
4. **Full File Replacement Guarantee:** Prefer completely overwriting files to ensure consistency. If a partial string replacement is ever attempted and fails (e.g., target string not found), the script MUST fallback to writing the entire file content.

## 2. Technical Directives
- **Runtime Paradigm:** Node.js native ECMAScript Modules (ESM) only.
- **OpenAPI Extensions:** The canonical tag for Agile user stories is `x-story`.
- **I/O Operations:** The CLI accepts exactly two parameters: 1) Input (URL or local path) and 2) Output (optional file path).
- **Confluence Output:** Generated tables must integrate sorting and filtering capabilities. User Stories must be rendered as clean, comma-separated text.
## Gates

Regeln dieser Ebene. Was nur ein Verzeichnis betrifft, gehört in die
`AGENTS.md` **dieses** Verzeichnisses — sie wird geladen, wenn eine Datei
daraus gelesen wird.

Ein Plan in `docs/plans/` beginnt mit `**Status:** Plan | In Arbeit | Done |
Empfehlung, nicht implementiert`.

Die kanonischen Agent-Regeln laufen über `ratchet` (Preset `agent-rules`):
`ratchet check` vor jedem Commit und in der CI.
