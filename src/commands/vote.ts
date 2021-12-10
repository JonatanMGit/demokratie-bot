import { SlashCommandBuilder } from '@discordjs/builders';

module.exports = {
	data: new SlashCommandBuilder().setName('vote').setDescription('Create a vote'),
	async execute(interaction) {
		return interaction.reply("This Command hasn't been implemented yet!");
	},
	name: 'vote',
};
