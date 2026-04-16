import fs from 'node:fs';
import path from 'node:path';
import yaml from 'yaml';
import { getGitViewUrl } from './utils.mjs';
import { parseOpenAPI } from './parser.mjs';
import { generateConfluenceHTML } from './generator.mjs';

async function main() {
    const args = process.argv.slice(2);
    if (args.length === 0) { console.error("URL is required!"); process.exit(1); }
    const url = args[0];
    const out = args[1];
    const localFile = args[2];

    try {
        // Load dynamic configuration
        const configPath = path.resolve('src/config.json');
        let config = {};
        if (fs.existsSync(configPath)) {
            config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        } else {
            console.warn("⚠️  src/config.json not found. Generating without custom columns.");
        }

        let content;
        if (localFile && fs.existsSync(localFile)) {
            content = fs.readFileSync(localFile, 'utf8');
            console.log(`🛠️ Dev Mode: Loaded local file '${localFile}'`);
        } else {
            const res = await fetch(url);
            content = await res.text();
            fs.writeFileSync('sample.yaml', content);
        }
        
        const rows = parseOpenAPI(content, yaml, getGitViewUrl(url), config);
        const html = generateConfluenceHTML(rows, config);
        
        if (out) { 
            fs.writeFileSync(path.resolve(out), html); 
            console.log(`✅ Exported successfully to ${path.resolve(out)}`);
        } else {
            console.log('\n' + html + '\n');
        }
    } catch (e) { console.error(e); }
}
main();