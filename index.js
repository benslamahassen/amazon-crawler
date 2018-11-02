const cli = require('./utils/cli');
const utils = require('./utils/utils');
const chalk = require('chalk');
const cTable = require('console.table');

const run = async () => {
  // intro
  cli.init();
  // get config for scraper
  const config = await cli.getConfigInq();
  const { KEYWORDS, DATA, PAGES } = config;
  const fileConfig = await cli.saveFileInq();
  const ext = fileConfig.EXTENTION;
  if (ext && ext === 'json') {
    // crawl...
    // and save in json
    const res = await utils
      .scrape(KEYWORDS, DATA, PAGES)
      .write('results.' + ext);
    console.log(chalk.blue(`You got ${res.products.length} products`));
  }
  if (ext && ext === 'csv') {
    // crawl...
    // and save to csv
    const res = await utils.scrape(KEYWORDS, DATA, PAGES);
    console.log(chalk.blue(`You got ${res.products.length} products`));
    utils.exportToCsv(res.products, DATA);
  }
  // crawl...
  // and log result
  const res = await utils.scrape(KEYWORDS, DATA, PAGES);
  console.log(chalk.blue(`You got ${res.products.length} products`));
  console.log(chalk.blue(`Printing the first 20 Products...`));
  console.table(res.products.slice(0, 20));
};

run();
