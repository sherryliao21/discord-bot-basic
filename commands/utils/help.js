module.exports = {
  name: 'help',
  description: 'shows all commands',
  usage: '[command name]',
  execute(message, args) {
    const data = [];
    const { commands } = message.client
    if (message.author.bot) return
    if (!args.length) {
      data.push('Here\'s a list of all my commands:');
      data.push(commands.map(command => (command.name)).join(`\n`));
      data.push(`\nYou can send \`${process.env.PREFIX}help [command name]\` to get info on a specific command!`);

      return message.channel.send(data, { split: true });

      // send DM 
      // return message.author.send(data, { split: true })
      //   .then(() => {
      //     if (message.channel.type === 'dm') return;
      //     message.reply('I\'ve sent you a DM with all my commands!');
      //   })
      //   .catch(error => {
      //     console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
      //     message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
      //   });
      // }

      // message.channel.send(data, { split: true });
    }

    const command = commands.get(args[0].toLowerCase())

    if (!command) {
      return message.reply('that\'s not a valid command!');
    }

    data.push(`**Name:** ${command.name}`);
    data.push(`**Description:** ${command.description}`);
    data.push(`**Usage:** ${process.env.PREFIX}${command.name} ${command.usage}`);
    data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

    return message.channel.send(data, { split: true });
  }
}