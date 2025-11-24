import Deck from '#models/deck'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Deck.createMany([
      {
        name: 'Capitales du monde',
        description: 'Learn about various subjects',
        published: false,
        userId: 1,
      },
      {
        name: "Vocabulaires d'allemand",
        description: 'Learn about various',
        published: false,
        userId: 1,
      },
    ])
  }
}
