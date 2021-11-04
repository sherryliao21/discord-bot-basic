const { MessageEmbed } = require('discord.js')
const validate = require('validate.js')

module.exports = {
    name: 'qrcode',
    description: 'Generates a QRcode for your URL',
    usage: '[url, size in px, color in HEX]',
    execute(message, args) {
        if (message.author.bot) return
        if (!args.length) {
            message.channel.send(`Please provide an URL in the arguments\nEx:   #qrcode https://example.com`)
        }

        let url, size, colorHex
        [url, size, colorHex] = [args[0], args[1] || 180, args[2] || 000000]
        const encodeMethod = '&choe=UTF-8'

        const validateResult = validate({ website: url }, {
            website: {
              url: true
            }
        }) // returns 'undefined' if url is valid

        if (typeof validateResult !== 'undefined') {
            return message.reply('that\'s not a valid URL!');
        } else {
            const rootUrl = `https://chart.googleapis.com/chart?cht=qr&chco=${colorHex}&chs=${size}x${size}&chl=`
            const finalUrl = rootUrl + url + encodeMethod

            const qrcodeEmbeded = new MessageEmbed()
                .setColor(colorHex || 'RANDOM')
                .setTitle('Your QRcode')
                .addFields({
                    name: 'Request by: ',
                    value: message.author.username
                }, {
                    name: 'Original url: ',
                    value: url
                })
                .setImage(finalUrl)
                .setTimestamp()
                
            message.reply(`You\'re good to go!\nHere is your QRcode: `)
            return message.channel.send(qrcodeEmbeded)
        }
    }
}