module.exports = {
  name: 'region',
  description: 'Tells you your region',
  cooldown: 5,
  execute(message, args) {
    message.channel.send(`Server region: ${message.guild.region}`)
  }
}