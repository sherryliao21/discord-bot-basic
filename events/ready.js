module.exports = {
  name: 'ready',
  description: 'once server is ready',
  once: true,
  execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`)
  }
}