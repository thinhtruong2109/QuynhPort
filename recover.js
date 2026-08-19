const fs = require('fs');
const path = require('path');
const readline = require('readline');

const transcriptPath = '/Users/thinh/.gemini/antigravity/brain/ab8271dd-1a1c-40dc-ba6e-11e8547e6a47/.system_generated/logs/transcript.jsonl';

const fileContents = {};

const rl = readline.createInterface({
    input: fs.createReadStream(transcriptPath),
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    try {
        const data = JSON.parse(line);
        if (data.type === 'PLANNER_RESPONSE' && data.tool_calls) {
            for (const call of data.tool_calls) {
                if (call.name === 'write_to_file' || call.name === 'replace_file_content' || call.name === 'multi_replace_file_content') {
                    const file = call.args.TargetFile;
                    if (file && (file.includes('NarrativeTimeline') || file.includes('SectionTransition'))) {
                        // For write_to_file, we take the CodeContent
                        if (call.name === 'write_to_file') {
                            fileContents[file] = call.args.CodeContent;
                        } 
                    }
                }
            }
        }
    } catch (e) {}
});

rl.on('close', () => {
    for (const [filePath, content] of Object.entries(fileContents)) {
        const cleanPath = filePath.replace(/"/g, ''); // remove quotes if any
        console.log("Recovering:", cleanPath);
        fs.mkdirSync(path.dirname(cleanPath), { recursive: true });
        fs.writeFileSync(cleanPath, content);
    }
});
