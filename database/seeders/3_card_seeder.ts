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
        question: 'Who painted the Mona Lisa?',
        answer: 'Leonardo da Vinci',
        deckId: 1,
      },
      {
        question: 'What is the largest planet in our solar system?',
        answer: 'Jupiter',
        deckId: 1,
      },
      {
        question: 'What year did World War II end?',
        answer: '1945',
        deckId: 1,
      },
      {
        question: 'What is the chemical symbol for gold?',
        answer: 'Au',
        deckId: 1,
      },
      {
        question: 'Who wrote "Romeo and Juliet"?',
        answer: 'William Shakespeare',
        deckId: 1,
      },
      {
        question: 'What is the square root of 64?',
        answer: '8',
        deckId: 1,
      },
      {
        question: 'Which continent is the Sahara Desert located on?',
        answer: 'Africa',
        deckId: 1,
      },
      {
        question: 'What does CSS stand for?',
        answer: 'Cascading Style Sheets',
        deckId: 1,
      },
      {
        question: 'What is the chemical symbol for gold?',
        answer: 'Au',
        deckId: 2,
      },
      {
        question: 'What is the largest planet in our solar system?',
        answer: 'Jupiter',
        deckId: 2,
      },
      {
        question: 'Who wrote "Romeo and Juliet"?',
        answer: 'William Shakespeare',
        deckId: 3,
      },
      {
        question: 'What does CSS stand for?',
        answer: 'Cascading Style Sheets',
        deckId: 3,
      },
      {
        question: 'What is the fastest land animal?',
        answer: 'Cheetah',
        deckId: 4,
      },
      {
        question: 'What is the fastest?',
        answer: 'You',
        deckId: 4,
      },
      // ----- Deck 5 -----
      {
        question: 'What is the capital of Spain?',
        answer: 'Madrid',
        deckId: 5,
      },
      {
        question: 'Which river flows through Cairo?',
        answer: 'The Nile',
        deckId: 5,
      },

      // ----- Deck 6 -----
      {
        question: 'What is the capital of Germany?',
        answer: 'Berlin',
        deckId: 6,
      },
      {
        question: 'Which ocean borders Portugal?',
        answer: 'Atlantic Ocean',
        deckId: 6,
      },

      // ----- Deck 7 -----
      {
        question: 'What is the capital of Italy?',
        answer: 'Rome',
        deckId: 7,
      },
      {
        question: 'Which mountain range runs through Switzerland?',
        answer: 'The Alps',
        deckId: 7,
      },

      // ----- Deck 8 -----
      {
        question: 'What is the capital of Japan?',
        answer: 'Tokyo',
        deckId: 8,
      },
      {
        question: 'Which continent is Brazil located on?',
        answer: 'South America',
        deckId: 8,
      },

      // ----- Deck 9 -----
      {
        question: 'What is the capital of Canada?',
        answer: 'Ottawa',
        deckId: 9,
      },
      {
        question: 'Which large lake borders Tanzania?',
        answer: 'Lake Victoria',
        deckId: 9,
      },

      // ----- Deck 10 -----
      {
        question: 'What is the capital of Australia?',
        answer: 'Canberra',
        deckId: 10,
      },
      {
        question: 'Which desert covers much of northern Africa?',
        answer: 'The Sahara Desert',
        deckId: 10,
      },
    ])
  }
}
