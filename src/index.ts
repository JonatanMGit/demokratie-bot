// Require the necessary discord.js classes
import { Client, Intents, TextChannel } from 'discord.js';
import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });
require('./deploy-commands');

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore Why is this needed?
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
	client.user.setActivity('mit Joe Biden', { type: 'PLAYING' });
	console.log(
		`Logged in as "${client.user.tag}" with the ID "${client.user.id}"\nCurrently in ${client.guilds.cache.size} servers:`,
	);
	client.guilds.cache.forEach((guild) => {
		console.log(`${guild.name} | ${guild.id}`);
	});
});

client.on('interactionCreate', async (interaction) => {
	console.log(
		`${interaction.user.tag} created an interaction in ${
			(client.channels.cache.get(interaction.channel.id) as TextChannel).name
		} with the id ${interaction.id}`,
	);
	if (!interaction.isCommand()) return;
	const command = require(__dirname + `/commands/${interaction.commandName}`);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Login to Discord with your client's token
client.login(process.env.discord_token);
