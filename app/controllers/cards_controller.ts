import Card from '#models/card'
import Deck from '#models/deck'
import type { HttpContext } from '@adonisjs/core/http'
// import { dd } from '@adonisjs/core/services/dumper'

export default class CardsController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const cards = await Card.all()
    return view.render('pages/home.edge', { cards })
  }

  /**
   * Display form to create a new record
   */
  async create({ view, params }: HttpContext) {
    const { deck_id } = params
    const deck = await Deck.findOrFail(deck_id)
    return view.render('pages/cards/create.edge', { deck })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, session, response, params }: HttpContext) {
    const { deck_id } = params // get deck_id from URL
    const { question, answer } = request.only(['question', 'answer'])
    await Card.create({ question, answer, deckId: Number(deck_id) }) // save question + answer
    session.flash('success', 'Le nouveau card a été ajouté avec succès !')
    return response.redirect().toRoute('cards.show', { deck_id })
  }

  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    const cards = await Card.query().where('deck_id', params.deck_id)
    const deck = await Deck.findOrFail(params.deck_id)
    return view.render('pages/cards/show.edge', { deck, cards })
  }

  /**
   * Edit individual record
   */
  async edit({ params, view }: HttpContext) {
    const { deck_id, card_id } = params
    const deck = await Deck.findOrFail(deck_id)
    const card = await Card.findOrFail(card_id)
    return view.render('pages/cards/edit.edge', { deck, card })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, session, response }: HttpContext) {
    const { deck_id, card_id } = params
    const { question, answer } = request.only(['question', 'answer'])
    const card = await Card.findOrFail(card_id)
    card.question = question
    card.answer = answer
    await card.save()
    session.flash('success', 'La carte a été mise à jour avec succès !')
    return response.redirect().toRoute('cards.show', { deck_id })
  }

  /**
   * Delete record
   */
  async destroy({ params, session, response }: HttpContext) {
    const card = await Card.findOrFail(params.card_id)
    await card.delete()
    session.flash('success', 'Le card a été supprimé avec succès !')
    return response.redirect().toRoute('cards.show', { deck_id: params.deck_id })
  }

  // NEW: show a single card
  async showCard({ params, view }: HttpContext) {
    const card = await Card.query()
      .where('deck_id', params.deck_id)
      .andWhere('id', params.card_id)
      .firstOrFail()

    return view.render('pages/cards/home.edge', { card })
  }
  async play({ params, view }: HttpContext) {
    const deck = await Deck.findOrFail(params.deck_id)
    const cards = await Card.query().where('deck_id', params.deck_id)

    const index = Number(params.index) || 0
    const card = cards[index]

    return view.render('pages/decks/play.edge', {
      card,
      index,
      total: cards.length,
      deck,
    })
  }
}
