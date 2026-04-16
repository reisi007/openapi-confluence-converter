import { findLineNumber, getValueByPath } from './utils.mjs';

export function parseOpenAPI(yamlContent, yamlModule, gitViewUrl, config) {
    const parsedData = yamlModule.parse(yamlContent);
    if (!parsedData || !parsedData.paths) throw new Error('Invalid OpenAPI schema: missing "paths" object');
    const rows = [];
    
    for (const [routePath, methods] of Object.entries(parsedData.paths)) {
        for (const [method, operation] of Object.entries(methods)) {
            if (['summary', 'description', 'parameters', 'servers'].includes(method.toLowerCase())) continue;
            const opId = operation.operationId || 'N/A';
            
            const row = {
                method: method.toUpperCase(),
                path: routePath,
                operationId: opId,
                description: operation.description || '',
                sourceCodeUrl: `${gitViewUrl}#L${findLineNumber(yamlContent, opId)}`,
                customFields: []
            };

            // Process dynamic columns based on config
            if (config && config.customColumns) {
                for (const col of config.customColumns) {
                    const val = getValueByPath(operation, col.path);
                    if (col.type === 'array') {
                        row.customFields.push(Array.isArray(val) ? val.join(', ') : (val || ''));
                    } else {
                        row.customFields.push(val !== undefined ? String(val) : '');
                    }
                }
            }

            rows.push(row);
        }
    }
    return rows;
}