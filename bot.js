require('dotenv').config()
const { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } = require('discord-akairo')
const Discord = require('discord.js')
const version = require('./package.json').version
const config = require('./config.json')

const embed = new Discord.MessageEmbed()
  .setFooter(config.embeds.footer)
  .setColor(config.embeds.color)

module.exports = {
  embed
}

class MainClient extends AkairoClient {
  constructor() {
    super({
      ownerID: config.owners
    }, {
      fetchAllMembers: true,
      presence: {
        status: 'online',
        activity: {
          name: `${config.prefix}help | ${version}`,
          type: 'WATCHING'
        }
      }
    })
    this.commandHandler = new CommandHandler(this, {
      directory: './commands/',
      prefix: config.prefix,
      defaultCooldown: 5000,
      commandUtil: true
    })
    this.staffComandHandler = new CommandHandler(this, {
      directory: './staff_commands/',
      prefix: config.staffPrefix,
      defaultCooldown: 1000,
      commandUtil: true
    })

    this.staffInhibitorHandler = new InhibitorHandler(this, {
      directory: './staff_inhibitors/'
    })

    this.listenerHandler = new ListenerHandler(this, {
      directory: './listeners/'
    })

    // Main Handlers
    this.commandHandler.useListenerHandler(this.listenerHandler)
    this.listenerHandler.loadAll()
    this.commandHandler.loadAll()

    // Staff Handlers
    this.staffComandHandler.useInhibitorHandler(this.staffInhibitorHandler)
    this.staffComandHandler.loadAll()
    this.staffInhibitorHandler.loadAll()
  }
}
const client = new MainClient()

if (config.token) {
  console.log("Logging in via config token...")
  client.login(config.token)
} else {
  console.log("Logging in via environment token...")
  client.login(process.env.BOT_TOKEN)
}
