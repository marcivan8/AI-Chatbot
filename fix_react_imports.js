
import fs from 'fs';
import path from 'path';

function getFiles(dir) {
    const subdirs = fs.readdirSync(dir);
    const files = subdirs.map((subdir) => {
        const res = path.resolve(dir, subdir);
        return fs.statSync(res).isDirectory() ? getFiles(res) : res;
    });
    return files.reduce((a, f) => a.concat(f), []);
}

const srcDir = path.resolve('./src');
const files = getFiles(srcDir);
let count = 0;

files.forEach((file) => {
    if (path.extname(file) === '.jsx') {
        let content = fs.readFileSync(file, 'utf8');

        // Check if file uses React.createElement or React.Fragment
        if (content.includes('React.createElement') || content.includes('React.Fragment')) {
            // Check if React is imported
            if (!content.match(/import\s+React\s+from/ && !content.match(/import\s+\*\s+as\s+React\s+from/))) {

                // Add import React from 'react';
                // Try to insert after the last import, or at the top
                if (content.includes('import ')) {
                    // Simple approach: Prepend to the file logic validation is hard, 
                    // but generic partial imports like { useState } might exist.
                    // Let's check if 'react' is already imported partially
                    if (content.includes('from "react"')) {
                        // Replace 'from "react"' with ', React from "react"' is risky if it's default import
                        // Safest: Just add a new line at top. Deduplication isn't fatal in most bundlers or simple verify
                    }
                }

                // Better strategy: Prepend to the top.
                // If there are other imports, it's fine.
                content = 'import React from "react";\n' + content;
                fs.writeFileSync(file, content);
                console.log(`Fixed: ${path.basename(file)}`);
                count++;
            }
        }
    }
});

console.log(`Fix complete. Modified ${count} files.`);
