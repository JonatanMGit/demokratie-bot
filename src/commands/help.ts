import { SlashCommandBuilder, bold } from '@discordjs/builders';
import { commandFiles } from './../deploy-commands';

module.exports = {
	data: new SlashCommandBuilder().setName('help').setDescription('Get Help for a Command'),
	async execute(interaction) {
		const help = [];
		let helptext = '';

		console.log(commandFiles);
		// read the Description for each command
		// send the description to the user
		for (const command of commandFiles) {
			const cmd = require(__dirname + `/${command}`);
			help[cmd.data.name] = cmd.data.description;
		}

		for (const command in help) {
			helptext += `${bold(command)}: ${help[command]} \n`;
		}

		return interaction.reply(String(helptext));
	},
	name: 'help',
};
