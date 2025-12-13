import vine from '@vinejs/vine'
import { validatorsInFrench } from './french_validator.js'

vine.messagesProvider = validatorsInFrench

const cardValidator = vine.compile(
  vine.object({
    question: vine.string().minLength(5),
    answer: vine.string().minLength(2),
  })
)
export { cardValidator }
