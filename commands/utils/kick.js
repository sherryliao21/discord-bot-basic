module.exports = {
  name: 'kick',
  description: 'print out the user you want to kick',
  args: true,
  usage: `<@username>`,
  guildOnly: true,
  cooldown: 5,
  execute(message, args) {
    const taggedUser = message.mentions.users.first()
    message.reply(`kicked ${taggedUser.username}`)
  }
}