const Xray = require('x-ray');
const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');

// x-ray config filters and request delay for anti-ban
const x = Xray({
  filters: {
    trimPrice: value => {
      return typeof value === 'string'
        ? value
            .replace(/\n/g, '.')
            .replace(/ /g, '')
            .replace('.$.', '$')
            .replace('-$.', '-$')
            .slice(0, -1)
        : value;
    },
    trimRating: value => {
      return typeof value === 'string'
        ? parseFloat(value.substring(0, 3))
        : value;
    }
  }
}).delay(100);

// data config for mapping data to css selectors
const dataConfig = {
  title: '.s-access-title',
  image: '.s-access-image@src',
  price: '.sx-price | trimPrice',
  rating: '.a-icon-alt | trimRating'
};

//scrape or crawl depending on page number...
const scrape = (_keywords, _data, _pagesNumber) => {
  const keywords = _keywords.replace(' ', '%20');
  const scrappingUrl = `https://www.amazon.com/s/field-keywords=${keywords}`;
  const dataToScrape = {};
  _data.map(elem => {
    if (dataConfig[elem]) {
      dataToScrape[elem] = dataConfig[elem];
    }
	});
	// init scraper with main container and data to get from
	const scraperConfig = x('.s-item-container', [dataToScrape]);
	// same for crawler except with pagination
  const crawlerConfig = scraperConfig
    .paginate('#pagnNextLink@href')
    .limit(_pagesNumber);

  return x(scrappingUrl, {
    products: _pagesNumber > 1 ? scraperConfig : crawlerConfig
  });
};

const exportToCsv = (data, fields) => {
	// init parser with headers
  const json2csvParser = new Json2csvParser({ fields });
	// convert data to csv format
	const csv = json2csvParser.parse(data);
	//write data using fs
  fs.writeFileSync('products.csv', csv);
};

module.exports = {
  scrape,
  exportToCsv
};
