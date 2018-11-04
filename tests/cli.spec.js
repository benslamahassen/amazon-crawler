const cli = require('../utils/cli');
const inquirer = require('inquirer');

describe('saveFileInq', () => {
	it('should return an object containing EXTENTION property', async () => {
        inquirer.prompt = () => Promise.resolve({ EXTENTION: null });
        const userInput = await cli.saveFileInq();
		await expect(userInput.EXTENTION).toBeDefined();
	});
});
