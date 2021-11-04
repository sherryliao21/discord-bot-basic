const validate = require('validate.js')

module.exports = {
    name: 'qrcode',
    description: 'Generates a QRcode for your URL',
    usage: '[url]',
    execute(message, args) {
        if (message.author.bot) return
        if (!args.length) {
            message.channel.send(`Please provide an URL in the arguments\nEx:   #qrcode https://example.com`)
        }

        const url = args[0]
        const validateResult = validate({ website: url }, {
            website: {
              url: true
            }
        }) // returns 'undefined' if url is valid

        if (typeof validateResult !== 'undefined') {
            return message.reply('that\'s not a valid URL!');
        } else {

            return message.reply(`here is your QRcode, you\'re good to go`)
        }

    }
}