import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import fs from 'fs';

const commands = [];
export function updateCommands() {
	return fs.readdirSync(__dirname + '/commands').filter((file) => file.endsWith('.js') || file.endsWith('.ts'));
}
export const commandFiles = updateCommands();

console.log(`Loading ${commandFiles.length} commands.`);

for (const file of commandFiles) {
	const command = require(__dirname + `/commands/${file}`);
	commands.push(command.data.toJSON());
}

// Refresh guild slash commands
// weird type declaration
const clientId = process.env.client_id as unknown as `${bigint}`;
const guildId = process.env.guild_Id as unknown as `${bigint}`;
const rest = new REST({ version: '9' }).setToken(process.env.discord_token);

rest
	.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log(`Successfully registered ${commandFiles.length} application commands.`))
	.catch(console.error);
