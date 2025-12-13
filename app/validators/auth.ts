import vine from '@vinejs/vine'
import { validatorsInFrench } from './french_validator.js'

vine.messagesProvider = validatorsInFrench

const loginUserValidator = vine.compile(
  vine.object({
    username: vine.string(),
    password: vine.string().minLength(4),
  })
)
export { loginUserValidator }
