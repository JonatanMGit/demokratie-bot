import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageSelectMenu } from 'discord.js';

const row = new MessageActionRow().addComponents(
	new MessageSelectMenu()
		.setCustomId('select')
		.setPlaceholder('Nothing selected')
		.addOptions([
			{
				label: 'Ban User',
				description: 'This is a description',
				value: 'first_option',
			},
			{
				label: 'Kick User',
				description: 'This is also a description',
				value: 'second_option',
			},
		]),
);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('vote')
		.setDescription('Create a vote')
		.addSubcommand((subcommand) => subcommand.setName('text').setDescription('Create a vote with text inputs'))
		.addSubcommand((subcommand) =>
			subcommand.setName('administrative').setDescription('Create a vote with administrative options'),
		),
	async execute(interaction) {
		return interaction.reply({ content: 'Select an option to vote for!', components: [row] });
	},
	name: 'vote',
};
