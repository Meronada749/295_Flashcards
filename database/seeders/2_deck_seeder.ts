import Deck from '#models/deck'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Deck.createMany([
      {
        name: 'General Knowledge',
        description: 'Learn about various subjects',
        published: false,
        userId: 1,
      },
    ])
  }
}
