import Deck from '#models/deck'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Deck.createMany([
      // ----- userId: 1 -----
      {
        name: 'Capitales du monde',
        description: 'Learn about various subjects',
        published: false,
        userId: 1,
      },
      {
        name: "Vocabulaires d'allemand",
        description: 'Learn German vocabulary',
        published: false,
        userId: 1,
      },
      {
        name: 'Histoire européenne',
        description: 'Deck on European history',
        published: false,
        userId: 1,
      },
      {
        name: 'Mathématiques de base',
        description: 'Basic math practice',
        published: false,
        userId: 1,
      },
      {
        name: 'Sciences naturelles',
        description: 'Intro to natural sciences',
        published: false,
        userId: 1,
      },

      // ----- userId: 2 -----
      {
        name: 'Capitales de mars',
        description: 'Learn about imaginary capitals',
        published: false,
        userId: 2,
      },
      {
        name: "Vocabulaires d'anglais",
        description: 'Learn English vocabulary',
        published: false,
        userId: 2,
      },
      {
        name: 'Philosophie moderne',
        description: 'Deck on modern philosophy',
        published: false,
        userId: 2,
      },
      {
        name: 'Programmation JavaScript',
        description: 'JS basics and concepts',
        published: false,
        userId: 2,
      },
      {
        name: 'Art classique',
        description: 'Deck on classical art',
        published: false,
        userId: 2,
      },
    ])
  }
}
