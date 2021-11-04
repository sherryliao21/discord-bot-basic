const validate = require('validate.js')

module.exports = {
    name: 'qrcode',
    description: 'Generates a QRcode for your URL',
    usage: '<url> <size in px>',
    execute(message, args) {
        if (message.author.bot) return
        if (!args.length) {
            message.channel.send(`Please provide an URL in the arguments\nEx:   #qrcode https://example.com`)
        }

        const url = args[0]
        const size = args[1] || 180

        const validateResult = validate({ website: url }, {
            website: {
              url: true
            }
        }) // returns 'undefined' if url is valid

        if (typeof validateResult !== 'undefined') {
            return message.reply('that\'s not a valid URL!');
        } else {
            const RootUrl = `https://chart.googleapis.com/chart?cht=qr&chs=${size}x${size}&chl=`
            message.reply(`You\'re good to go!\nHere is your QRcode: `)
            message.reply('\n' + RootUrl + url + '&choe=UTF-8')
            return
        }
    }
}