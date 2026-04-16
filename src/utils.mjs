export function getGitViewUrl(rawUrl) {
    if (rawUrl.includes('raw.githubusercontent.com')) {
        const parts = rawUrl.split('/');
        if (parts.length >= 6) return `https://github.com/${parts[3]}/${parts[4]}/blob/${parts.slice(5).join('/')}`;
    } else if (rawUrl.includes('/-/raw/')) {
        return rawUrl.replace('/-/raw/', '/-/blob/');
    }
    return rawUrl;
}

export function findLineNumber(rawYaml, operationId) {
    const lines = rawYaml.split('\n');
    const index = lines.findIndex(line => line.includes(`operationId: ${operationId}`) || line.includes(`operationId: "${operationId}"`));
    return index !== -1 ? index + 1 : 1;
}

export function getValueByPath(obj, path) {
    if (!obj || !path) return undefined;
    return path.split('.').reduce((acc, part) => acc && acc[part] !== undefined ? acc[part] : undefined, obj);
}