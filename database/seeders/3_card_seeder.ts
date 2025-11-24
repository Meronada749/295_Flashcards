import Card from '#models/card'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Card.createMany([
      {
        question: 'What is the capital of France?',
        response: 'Paris',
        deckId: 1,
      },
      {
        question: 'What does HTTP stand for?',
        response: 'HyperText Transfer Protocol',
        deckId: 1,
      },
      {
        question: 'What is the chemical symbol for gold?',
        response: 'Au',
        deckId: 1,
      },
    ])
  }
}
