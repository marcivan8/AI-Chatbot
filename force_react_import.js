
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
        if (content.includes('React.createElement') || content.includes('React.Fragment') || content.includes('React.')) {

            // Check if 'React' is already imported as a default or named import (specifically 'React')
            // Regex detects: import React from... or import ..., React, ... from ...
            const hasDefaultReact = /import\s+React\s+from/.test(content);
            const hasNamedReact = /import\s+.*(\bReact\b).+from/.test(content);
            const hasNamespaceReact = /import\s+\*\s+as\s+React\s+from/.test(content);

            if (!hasDefaultReact && !hasNamespaceReact) {
                // It might have { useState } from "react" but not Default React.

                // We will PREPEND 'import React from "react";' to the file.
                // If there is already 'import { useState } from "react";', having 'import React from "react";' is valid (duplicate import from same package is allowed by bundlers).

                // Note: If the file alreayd has 'import React, { useState } ...' my regex 'import\s+React\s+from' might fail if it's 'import React, ...'
                // Let's refine regex:
                const reallyHasReact = /import\s+React\W/.test(content) || /import\s+\*\s+as\s+React/.test(content);

                if (!reallyHasReact) {
                    content = 'import React from "react";\n' + content;
                    fs.writeFileSync(file, content);
                    console.log(`Fixed: ${path.basename(file)}`);
                    count++;
                }
            }
        }
    }
});

console.log(`Force fix complete. Modified ${count} files.`);
