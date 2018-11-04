const utils = require('../utils/utils');

describe('mapDataToScrape', () => {
	it('should return a mapped object of the data that will be scraped', () => {
		const userInputData = ['title', 'price'];
		const mappedData = {
			title: '.s-access-title',
			price: '.sx-price | trimPrice'
		};
		expect(utils.mapDataToScrape(userInputData)).toEqual(mappedData);
	});
});
