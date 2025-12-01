import Card from '#models/card'
import Deck from '#models/deck'
import type { HttpContext } from '@adonisjs/core/http'

export default class CardsController {
  /**
   * Display a list of resource
   */
  public async index({ view }) {
    const cards = await Card.all()
    return view.render('pages/home.edge', { cards })
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    const cards = await Card.query().where('deck_id', params.deck_id)
    const deck = await Card.findOrFail(params.deck_id)
    return view.render('pages/cards/show.edge', { deck, cards })
  }

  /**
   * Edit individual record
   */
  async edit({ params, view }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

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
