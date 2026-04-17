import fs from 'node:fs';
import path from 'node:path';
import yaml from 'yaml';
import { parseOpenAPI } from './parser.mjs';
import { generateConfluenceHTML } from './generator.mjs';

async function main() {
    const args = process.argv.slice(2);
    if (args.length === 0) { 
        console.error("❌ Input (URL or local file path) is required!"); 
        process.exit(1); 
    }
    
    const input = args[0];
    const out = args[1];

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
        // Determine if input is URL or local file
        if (input.startsWith('http://') || input.startsWith('https://')) {
            console.log(`🌐 Fetching OpenAPI spec from URL: ${input}`);
            const res = await fetch(input);
            content = await res.text();
        } else {
            console.log(`📁 Loading OpenAPI spec from local file: ${input}`);
            content = fs.readFileSync(path.resolve(input), 'utf8');
        }
        
        const rows = parseOpenAPI(content, yaml, config);
        const html = generateConfluenceHTML(rows, config);
        
        if (out) { 
            fs.writeFileSync(path.resolve(out), html); 
            console.log(`✅ Exported successfully to ${path.resolve(out)}`);
        } else {
            console.log('\n' + html + '\n');
        }
    } catch (e) { 
        console.error(e); 
    }
}

main();
