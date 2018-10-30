
const cli = require('./utils/cli')
// index.js

const run = async () => {
  // script introduction
  cli.init();
  // ask questions
  const answers = await cli.askQuestions();
  const { KEYWORDS, FILTERS, SAVE, EXTENTION } = answers;
  // crawl...
  console.log(KEYWORDS, FILTERS, SAVE, EXTENTION);
};

run();
