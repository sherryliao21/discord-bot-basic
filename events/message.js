const Discord = require('discord.js')

module.exports = {
  name: 'message',
  description: 'message events',
  execute(message, client) {
    if (message.author.bot) return

    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/)
    const commandName = args.shift().toLowerCase()
    const command = client.commands.get(commandName)

    if (message.content.startsWith(process.env.PREFIX)) {
      if (!client.commands.has(commandName)) return message.reply(`Please provide a command name`)
      if (command.args && !args.length) return message.reply(`You need to provide arguments for this command!\nThe proper usage will be ${process.env.PREFIX}${command.name} ${command.usage}`)
      if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('I can\'t execute that command inside DMs!');
      }
      const { cooldowns } = client;

      if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection())
      }

      const now = Date.now()
      const timestamps = cooldowns.get(command.name)
      const cooldownAmount = (command.cooldown || 3) * 1000

      if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount

        if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1000
          return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`)
        }
      }

      timestamps.set(message.author.id, now);
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)

      command.execute(message, args)
    }
  }
}