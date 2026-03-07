const fs = require('fs');

const mdContent = fs.readFileSync('../premium_articles.md', 'utf-8');

const modulesMap = {
  1: 'web',
  2: 'html',
  3: 'css',
  4: 'js',
  5: 'ts'
};

const lines = mdContent.split('\n');

let currentModuleId = null;
let currentTopicTitle = null;
let currentTopicContent = [];
let moduleDescriptionContent = [];
let inModule = false;

const customData = {};

function saveCurrentTopic() {
  if (currentModuleId && currentTopicTitle) {
    if (!customData[currentModuleId]) {
      customData[currentModuleId] = { topics: [], description: '' };
    }
    
    // Generate an ID from title
    const topicId = currentTopicTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    customData[currentModuleId].topics.push({
      id: topicId,
      title: currentTopicTitle,
      article: {
        timeToRead: Math.max(2, Math.ceil(currentTopicContent.join('\n').split(' ').length / 200)),
        content: currentTopicContent.join('\n').trim()
      },
      challenges: [] // Keep empty or generate dummy
    });
  }
}

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  const modMatch = line.match(/^# Module (\d+): (.*)/);
  if (modMatch) {
    saveCurrentTopic();
    
    const modNum = parseInt(modMatch[1], 10);
    currentModuleId = modulesMap[modNum];
    currentTopicTitle = null;
    currentTopicContent = [];
    moduleDescriptionContent = [];
    inModule = true;
    continue;
  }
  
  if (inModule) {
    const topicMatch = line.match(/^## (.*)/);
    // Be careful not to match ### or ####
    if (topicMatch && !line.startsWith('###')) {
      saveCurrentTopic();
      currentTopicTitle = topicMatch[1].trim();
      currentTopicContent = [];
      continue;
    }
    
    if (currentTopicTitle) {
      currentTopicContent.push(line);
    } else {
      moduleDescriptionContent.push(line);
    }
  }
}

// Save the last topic
saveCurrentTopic();

// Print out a summary to see if parsing works
for (const [modId, modData] of Object.entries(customData)) {
  console.log(`Module ID: ${modId}`);
  console.log(`  Description lines: ${modData.description.length}`);
  console.log(`  Topics: ${modData.topics.length}`);
  for (const t of modData.topics) {
    console.log(`    - ${t.title} (${t.article.timeToRead} min)`);
  }
}

fs.writeFileSync('parsed_premium_data.json', JSON.stringify(customData, null, 2));
console.log('Saved to parsed_premium_data.json');
