module.exports = {
  name: 'avatar',
  description: 'replies avatar of user tagged',
  args: true,
  usage: `<@username>`,
  cooldown: 5,
  execute(message, args) {
    const avatarList = message.mentions.users.map(user => {
      return `${user.username}'s avatar: ${user.displayAvatarURL({ format: 'png', dynamic: false })}`
    })
    message.reply(avatarList)
  }
}