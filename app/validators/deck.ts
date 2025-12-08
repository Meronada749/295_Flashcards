import vine from '@vinejs/vine'

const deckValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(5),
    description: vine.string().minLength(2),
  })
)
export { deckValidator }
