export function generateConfluenceHTML(rows, config) {
    const isSnippet = config?.snippet === true;
    
    let customHeaders = '';
    if (config && config.customColumns) {
        for (const col of config.customColumns) {
            customHeaders += `              <th class="confluenceTh">${col.header}</th>\n`;
        }
    }

    let html = `<ac:structured-macro ac:name="table-filter" ac:schema-version="1">\n  <ac:rich-text-body>\n    <ac:structured-macro ac:name="table-sorter" ac:schema-version="1">\n      <ac:rich-text-body>\n        <table class="confluenceTable" data-sortable="true">\n          <thead>\n            <tr>\n              <th class="confluenceTh" data-sortable="true">Endpoint / Route</th>\n              <th class="confluenceTh" data-sortable="true">Operation ID</th>\n${customHeaders}            </tr>\n          </thead>\n          <tbody>\n`;

    for (const row of rows) {
        let customCells = '';
        if (row.customFields) {
            for (const fieldVal of row.customFields) {
                customCells += `              <td class="confluenceTd">${fieldVal}</td>\n`;
            }
        }

        html += `            <tr>\n              <td class="confluenceTd"><b>[${row.method}]</b> ${row.path}</td>\n              <td class="confluenceTd"><code>${row.operationId}</code></td>\n${customCells}            </tr>\n`;
    }
    
    html += `          </tbody>\n        </table>\n      </ac:rich-text-body>\n    </ac:structured-macro>\n  </ac:rich-text-body>\n</ac:structured-macro>`;

    if (!isSnippet) {
        html = `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="utf-8">
    <title>OpenAPI Confluence Export</title>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; 
            padding: 20px; 
            color: #333;
        }
        table.confluenceTable { 
            border-collapse: collapse; 
            width: 100%; 
            margin-top: 10px; 
            font-size: 14px;
        }
        th.confluenceTh, td.confluenceTd { 
            border: 1px solid #dfe1e6; 
            padding: 10px; 
            text-align: left; 
        }
        th.confluenceTh { 
            background-color: #f4f5f7; 
            font-weight: 600; 
        }
        tr:hover { 
            background-color: #fafbfc; 
        }
        code { 
            background-color: #ebecf0; 
            padding: 2px 5px; 
            border-radius: 3px; 
            font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
            font-size: 0.9em;
        }
    </style>
</head>
<body>
${html}
</body>
</html>`;
    }

    return html;
}
