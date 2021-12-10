const jsmarkov = require('js-markov');
import { SlashCommandBuilder } from '@discordjs/builders';
import { Message, Permissions, TextChannel } from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('simulator')
		.setDescription('Simulates a given user')
		.addUserOption((option) => option.setName('target').setDescription('The user').setRequired(true))
		.addChannelOption((option) => option.setName('channel').setDescription('The channel').setRequired(true)),
	async execute(interaction) {
		const target = interaction.options.getUser('target');
		const channel = interaction.options.getChannel('channel');
		const markov = new jsmarkov();

		//check if the channel is a text channel
		if (!(channel instanceof TextChannel)) {
			return interaction.reply('This command can only be used in a text channel');
		}
		if (
			!interaction.guild.me.permissionsIn(channel).has(Permissions.FLAGS.VIEW_CHANNEL) &&
			!interaction.guild.me.permissionsIn(channel).has(Permissions.FLAGS.READ_MESSAGE_HISTORY)
		)
			return interaction.reply('I do not have permission to view messages in this channel');

		const messages = await channel.messages.fetch({ limit: 100 }).catch((err) => console.error(err));
		if (messages == null) return interaction.reply('There are no messages in this channel');
		const result = (messages as unknown as Array<Message>).filter((m) => m.author.id === target.id);

		// add each array elemt to the markov chain

		markov.addStates(result.map((m) => m.content));

		markov.train();
		return interaction.reply(
			target.username +
				': ' +
				String(
					markov.generateRandom() +
						' ' +
						markov.generateRandom() +
						' ' +
						markov.generateRandom() +
						' ' +
						markov.generateRandom() +
						' ' +
						markov.generateRandom(),
				),
		);
	},
	name: 'simulator',
};
