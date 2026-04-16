export function generateConfluenceHTML(rows, config) {
    let customHeaders = '';
    if (config && config.customColumns) {
        for (const col of config.customColumns) {
            customHeaders += `              <th class="confluenceTh">${col.header}</th>\n`;
        }
    }

    let html = `<ac:structured-macro ac:name="table-filter" ac:schema-version="1">\n  <ac:rich-text-body>\n    <ac:structured-macro ac:name="table-sorter" ac:schema-version="1">\n      <ac:rich-text-body>\n        <table class="confluenceTable" data-sortable="true">\n          <thead>\n            <tr>\n              <th class="confluenceTh" data-sortable="true">Endpoint / Route</th>\n              <th class="confluenceTh" data-sortable="true">Operation ID</th>\n              <th class="confluenceTh">Beschreibung</th>\n${customHeaders}              <th class="confluenceTh">Quellcode</th>\n            </tr>\n          </thead>\n          <tbody>\n`;

    for (const row of rows) {
        let customCells = '';
        if (row.customFields) {
            for (const fieldVal of row.customFields) {
                customCells += `              <td class="confluenceTd">${fieldVal}</td>\n`;
            }
        }

        html += `            <tr>\n              <td class="confluenceTd"><b>[${row.method}]</b> ${row.path}</td>\n              <td class="confluenceTd"><code>${row.operationId}</code></td>\n              <td class="confluenceTd">${row.description}</td>\n${customCells}              <td class="confluenceTd"><a href="${row.sourceCodeUrl}" target="_blank">View Code</a></td>\n            </tr>\n`;
    }
    
    return html + `          </tbody>\n        </table>\n      </ac:rich-text-body>\n    </ac:structured-macro>\n  </ac:rich-text-body>\n</ac:structured-macro>`;
}