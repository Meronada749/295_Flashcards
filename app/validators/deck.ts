import vine from '@vinejs/vine'
import { validatorsInFrench } from './french_validator.js'

vine.messagesProvider = validatorsInFrench

const deckValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(5),
    description: vine.string().minLength(2),
  })
)
export { deckValidator }
