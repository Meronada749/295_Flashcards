import Deck from '#models/deck'
import type { HttpContext } from '@adonisjs/core/http'
// import { dd } from '@adonisjs/core/services/dumper'

export default class DecksController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const decks = await Deck.all()
    return view.render('pages/home.edge', { decks })
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    const deck = await Deck.all()
    return view.render('pages/decks/create.edge', { deck })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, session, response }: HttpContext) {
    const { name, description } = request.only(['name', 'description'])
    await Deck.create({ name, description })
    session.flash('success', 'Le nouveau deck a été ajouté avec succès !')
    return response.redirect().toRoute('decks.show')
  }

  /**
   * Show individual record
   */
  async show({ view }: HttpContext) {
    // TODO : Lorsque l'authentification sera en place
    // Je pourrai récupérer l'id de l'utilisateur
    // const user_id = auth.user.id
    const user_id = 1
    const decks = await Deck.query().where('user_id', user_id)
    return view.render('pages/decks/show.edge', { decks })
  }

  /**
   * Edit individual record
   */
  async edit({ params, view }: HttpContext) {
    const deck = await Deck.findOrFail(params.deck_id)
    return view.render('pages/decks/edit.edge', { deck })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, session, response }: HttpContext) {
    const deck = await Deck.findOrFail(params.deck_id)
    const data = request.only(['name', 'description'])
    deck.merge(data)
    await deck.save()
    session.flash('success', 'Le deck a été mis à jour avec succès !')
    return response.redirect().toRoute('decks.show')
  }

  /**
   * Delete record
   */
  async destroy({ params, session, response }: HttpContext) {
    const deck = await Deck.findOrFail(params.deck_id)
    await deck.delete() // Supprime le deck
    session.flash('success', 'Le deck a été supprimé avec succès !')
    return response.redirect().toRoute('decks.show')
  }
}
