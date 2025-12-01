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
      {
        question: 'What is the largest planet in our solar system?',
        response: 'Jupiter',
        deckId: 2,
      },
      {
        question: 'Who wrote "Romeo and Juliet"?',
        response: 'William Shakespeare',
        deckId: 2,
      },
      {
        question: 'What does CSS stand for?',
        response: 'Cascading Style Sheets',
        deckId: 2,
      },
      {
        question: 'What is the fastest land animal?',
        response: 'Cheetah',
        deckId: 2,
      },
    ])
  }
}
