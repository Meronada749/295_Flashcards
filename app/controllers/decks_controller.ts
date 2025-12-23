import Card from '#models/card'
import Deck from '#models/deck'
import { deckValidator } from '#validators/deck'
import type { HttpContext } from '@adonisjs/core/http'

export default class DecksController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    // Récupère tous les decks où (published = 1) depuis le backend
    const publishedDecks = await Deck.query().where('published', 1)

    // Rend la vue et on passe les decks publiés à la vue
    return view.render('pages/home.edge', { publishedDecks })
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    // Rend la vue pour afficher le formulaire de création d’un nouveau deck
    return view.render('pages/decks/create.edge')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, session, response, auth }: HttpContext) {
    // Validation des données envoyées par le formulaire
    // deckValidator définit les règles pour les champs name et description
    const { name, description } = await request.validateUsing(deckValidator)

    // Création d'un nouveau deck dans la base de données
    // UserId est le nom de la colonne dans models deck et lie le deck à l'utilisateur connecté
    await Deck.create({ name, description, userId: auth.user!.id })

    // Message flash pour informer l'utilisateur que l'ajout a réussi
    session.flash('success', 'Le nouveau deck a été ajouté avec succès !')

    // Redirection vers la liste des decks de l’utilisateur
    return response.redirect().toRoute('decks.show')
  }

  /**
   * Show all records
   */
  async decksByUser({ view, auth }: HttpContext) {
    // Récupère l’utilisateur connecté
    const user = auth.user!

    // Récupère tous les decks appartenant à l’utilisateur
    const decks = await Deck.query().where('user_id', user.id)

    // Rend la vue avec les decks de l’utilisateur
    return view.render('pages/decks/show.edge', { decks })
  }

  /**
   * Edit individual record
   */
  async edit({ params, view }: HttpContext) {
    // Prend l’ID du deck depuis l’URL et récupère le deck depuis le backend
    const deck = await Deck.findOrFail(params.deck_id)

    // Rend la vue pour afficher le formulaire de modifier un deck
    // On passe le deck à la vue pour modifier le deck
    return view.render('pages/decks/edit.edge', { deck })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, session, response }: HttpContext) {
    // Validation des données envoyées par le formulaire
    // deckValidator définit les règles pour les champs name et description
    const { name, description } = await request.validateUsing(deckValidator)

    // Prend l’ID du deck depuis l’URL et récupère le deck depuis le backend
    const deck = await Deck.findOrFail(params.deck_id)

    // Mise à jour des champs du deck
    // merge() met à jour les champs spécifiés, save() enregistre en base de données
    // Si un deck correspond à l'id
    if (deck) {
      await deck.merge({ name, description }).save()
    }

    // Message flash pour informer l'utilisateur que la mise à jour a réussi
    session.flash('success', 'Le deck a été mis à jour avec succès !')

    // Redirection vers la liste des decks de l’utilisateur
    return response.redirect().toRoute('decks.show')
  }

  /**
   * Delete record
   */
  async destroy({ params, session, response }: HttpContext) {
    // Prend l’ID du deck depuis l’URL et récupère le deck depuis le backend
    const deck = await Deck.findOrFail(params.deck_id)

    // Suppression du deck dans la base de données
    await deck.delete()

    // Message flash pour informer l'utilisateur que la suppression a réussi
    session.flash('success', 'Le deck a été supprimé avec succès !')

    // Redirection vers la liste des decks de l’utilisateur
    return response.redirect().toRoute('decks.show')
  }

  /**
   * Play a deck
   */
  async play({ params, view }: HttpContext) {
    // Prend l’ID du deck depuis l’URL et récupère le deck depuis le backend
    const deck = await Deck.findOrFail(params.deck_id)

    // Récupère toutes les cartes du deck correspondant à l’ID fourni dans l’URL
    const cards = await Card.query().where('deck_id', params.deck_id)

    // Rend la vue et on passe le deck et ses cartes à la vue
    return view.render('pages/decks/play.edge', { deck, cards })
  }

  /**
   * Publish a deck
   */
  async publish({ params, response, session }: HttpContext) {
    // Prend l’ID du deck depuis l’URL et récupère le deck depuis le backend
    // et compte ses cartes
    const deck = await Deck.query().where('id', params.deck_id).withCount('cards').firstOrFail()

    // Vérifie qu'il y a au moins une carte
    if (deck.$extras.cards_count === 0) {
      session.flash('error', 'Impossible de publier un deck sans cartes !')
      return response.redirect().toRoute('decks.show')
    }

    // Publie le deck
    // merge() met à jour les champs spécifiés
    deck.merge({ published: true })
    // save() enregistre en base de données
    await deck.save()

    // Message flash pour informer l'utilisateur que la publication a réussi
    session.flash('success', 'Le deck a été publié avec succès !')

    // Redirection vers la liste des decks de l’utilisateur
    return response.redirect().toRoute('decks.show')
  }

  /**
   * Unpublish a deck
   */
  async unPublish({ params, response, session }: HttpContext) {
    // Prend l’ID du deck depuis l’URL et récupère le deck depuis le backend
    const deck = await Deck.findOrFail(params.deck_id)

    // Dépublie le deck
    // merge() met à jour les champs spécifiés
    deck.merge({ published: false })
    // save() enregistre en base de données
    await deck.save()

    // Message flash pour informer l'utilisateur que la dépublication a réussi
    session.flash('success', 'Le deck a été dépublié avec succès !')

    // Redirection vers la liste des decks de l’utilisateur
    return response.redirect().toRoute('decks.show')
  }
}
