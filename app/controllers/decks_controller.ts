import Card from '#models/card'
import Deck from '#models/deck'
import { deckValidator } from '#validators/deck'
import type { HttpContext } from '@adonisjs/core/http'

export default class DecksController {
  /**
   * Display a list of resource
   */
  async index({ view, auth }: HttpContext) {
    const publishedDecks = await Deck.query().where('published', 1)
    // Pass authentication status to the view
    const isAuthenticated = auth.user !== null
    return view.render('pages/home.edge', { publishedDecks, isAuthenticated })
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
  async store({ request, session, response, auth }: HttpContext) {
    const { name, description } = await request.validateUsing(deckValidator)

    await Deck.create({ name, description, userId: auth.user.id })

    session.flash('success', 'Le nouveau deck a été ajouté avec succès !')

    return response.redirect().toRoute('decks.show')
  }

  /**
   * Show individual record
   */
  async show({ view, auth }: HttpContext) {
    const user = auth.user!
    const decks = await Deck.query().where('user_id', user.id)
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
    const { name, description } = await request.validateUsing(deckValidator)

    const deck = await Deck.findOrFail(params.deck_id)

    deck.merge({ name, description }).save()

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

  /**
   * Play a deck
   */
  async play({ params, view }: HttpContext) {
    const deck = await Deck.findOrFail(params.deck_id)

    const cards = await Card.query().where('deck_id', params.deck_id)

    return view.render('pages/decks/play.edge', { deck, cards })
  }

  /**
   * Publish a deck
   */
  async publish({ params, response, session }: HttpContext) {
    const deck = await Deck.findOrFail(params.deck_id)

    deck.published = true
    await deck.save()

    session.flash('success', 'Le deck a été publié avec succès !')

    return response.redirect().toRoute('decks.show')
  }

  /**
   * Published decks
   */
  async getAllPublished({ view }: HttpContext) {
    const publishedDecks = await Deck.query().where('published', 1)

    return view.render('pages/home.edge', { publishedDecks })
  }
}
