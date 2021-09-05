import { Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'
import { embed, enableMaintenance, disableMaintenance } from '../bot'
var maintenanceEnabled = false

export default class MaintenanceCommand extends Command {
  constructor() {
    super('maintenance', {
      aliases: ['maintenance'],
      description: '(For admins) Toggle bot maintenance mode.',
      channel: 'guild',
      userPermissions: 'ADMINISTRATOR'
    })
  }

  exec(message: any, args: any) {
    if (maintenanceEnabled) {
      disableMaintenance()
      maintenanceEnabled = false
      message.channel.send({
        embeds: [
          new MessageEmbed(embed)
            .setTitle('Maintenance is now disabled.')
            .setTimestamp(new Date())
        ]
      })
    } else {
      enableMaintenance()
      maintenanceEnabled = true
      message.channel.send({
        embeds: [
          new MessageEmbed(embed)
            .setTitle('Maintenance is now enabled.')
            .setTimestamp(new Date())
        ]
      })
    }
  }
}
