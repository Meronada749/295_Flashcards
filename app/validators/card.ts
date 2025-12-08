import vine from '@vinejs/vine'

const cardValidator = vine.compile(
  vine.object({
    question: vine.string().minLength(5),
    answer: vine.string().minLength(2),
  })
)
export { cardValidator }
