import Card from '#models/card'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Card.createMany([
      {
        question: 'What is the capital of France?',
        answer: 'Paris',
        deckId: 1,
      },
      {
        question: 'What does HTTP stand for?',
        answer: 'HyperText Transfer Protocol',
        deckId: 1,
      },
      {
        question: 'What is the chemical symbol for gold?',
        answer: 'Au',
        deckId: 1,
      },
      {
        question: 'What is the largest planet in our solar system?',
        answer: 'Jupiter',
        deckId: 2,
      },
      {
        question: 'Who wrote "Romeo and Juliet"?',
        answer: 'William Shakespeare',
        deckId: 2,
      },
      {
        question: 'What does CSS stand for?',
        answer: 'Cascading Style Sheets',
        deckId: 2,
      },
      {
        question: 'What is the fastest land animal?',
        answer: 'Cheetah',
        deckId: 2,
      },
    ])
  }
}
