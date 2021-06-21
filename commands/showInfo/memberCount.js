module.exports = {
  name: 'membercount',
  description: 'Replies the member count of your guild',
  cooldown: 5,
  execute(message, args) {
    message.channel.send(`Total members: ${message.guild.memberCount}`)
  }
}