import Card from '#models/card'
import Deck from '#models/deck'
import { cardValidator } from '#validators/card'
import type { HttpContext } from '@adonisjs/core/http'

export default class CardsController {
  /**
   * Display a list of resource
   */
  async index({ view, params }: HttpContext) {
    // Fetches all cards for a deck (deck_id from URL params)
    const cards = await Card.query().where('deck_id', params.deck_id)

    // Fetches the deck itself.
    const deck = await Deck.findOrFail(params.deck_id)

    // Renders a view showing the deck and its cards.
    return view.render('pages/cards/show.edge', { deck, cards })
  }

  /**
   * Display form to create a new record
   */
  async create({ view, params }: HttpContext) {
    // Fetch the deck
    const deck = await Deck.findOrFail(params.deck_id)

    return view.render('pages/cards/create.edge', { deck })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, session, response, params }: HttpContext) {
    const { question, answer } = await request.validateUsing(cardValidator)

    await Card.create({ question, answer, deckId: params.deck_id })

    session.flash('success', 'Le nouveau card a été ajouté avec succès !')

    return response.redirect().toRoute('cards.show', { deck_id: params.deck_id })
  }

  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    const deck = await Deck.findOrFail(params.deck_id)

    // Fetch the card within that deck
    const card = await Card.query().where({ deck_id: deck.id, id: params.card_id }).firstOrFail()

    return view.render('pages/cards/home.edge', { deck, card })
  }

  /**
   * Edit individual record
   */
  async edit({ params, view }: HttpContext) {
    const deck = await Deck.findOrFail(params.deck_id)

    const card = await Card.findOrFail(params.card_id)

    return view.render('pages/cards/edit.edge', { deck, card })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, session, response }: HttpContext) {
    const { question, answer } = await request.validateUsing(cardValidator)

    const card = await Card.findOrFail(params.card_id)

    card.merge({ question, answer }).save()

    session.flash('success', 'La carte a été mise à jour avec succès !')

    return response.redirect().toRoute('cards.show', { deck_id: params.deck_id })
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
}
