import Card from '#models/card'
import Deck from '#models/deck'
import { cardValidator } from '#validators/card'
import type { HttpContext } from '@adonisjs/core/http'

export default class CardsController {
  /**
   * Display a list of resource
   */
  async index({ view, params }: HttpContext) {
    // Prend l’ID du deck depuis l’URL et récupère le deck depuis le backend
    const deck = await Deck.findOrFail(params.deck_id)

    // Récupère toutes les cartes du deck correspondant à l’ID fourni dans l’URL
    const cards = await Card.query().where('deck_id', params.deck_id)

    // Rend la vue et on passe le deck et ses cartes à la vue
    return view.render('pages/cards/home.edge', { deck, cards })
  }

  /**
   * Display form to create a new record
   */
  async create({ view, params }: HttpContext) {
    // Prend l’ID du deck depuis l’URL et récupère le deck depuis le backend
    const deck = await Deck.findOrFail(params.deck_id)

    // Rend la vue pour afficher le formulaire de création d'une nouvelle carte
    // On passe le deck à la vue pour que le formulaire sache à quel deck ajouter la carte
    return view.render('pages/cards/create.edge', { deck })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, session, response, params }: HttpContext) {
    // Validation des données envoyées par le formulaire
    // cardValidator définit les règles pour les champs question et answer
    const { question, answer } = await request.validateUsing(cardValidator)

    // Création d'une nouvelle carte dans la base de données
    // deckId est le nom de la colonne dans models card et lie la carte au deck correspondant
    await Card.create({ question, answer, deckId: params.deck_id })

    // Message flash pour informer l'utilisateur que l'ajout a réussi
    session.flash('success', 'La nouvelle carte a été ajouté avec succès !')

    // Redirection vers la liste des cartes du deck
    return response.redirect().toRoute('cards.home', { deck_id: params.deck_id })
  }

  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    // Récupère la carte uniquement si elle appartient au deck
    const card = await Card.query()
      .where({ id: params.card_id, deck_id: params.deck_id })
      .firstOrFail()

    // Rend la vue et on passe la carte à la vue
    return view.render('pages/cards/show.edge', { card })
  }

  /**
   * Edit individual record
   */
  async edit({ params, view }: HttpContext) {
    // Prend l’ID du deck depuis l’URL et récupère le deck depuis le backend
    const deck = await Deck.findOrFail(params.deck_id)

    // Prend l’ID de la carte depuis l’URL et récupère la carte à modifier depuis le backend
    const card = await Card.findOrFail(params.card_id)

    // Rend la vue pour afficher le formulaire de modifier une carte
    // On passe le deck et la carte à la vue pour modifier la carte
    return view.render('pages/cards/edit.edge', { deck, card })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, session, response }: HttpContext) {
    // Validation des données envoyées par le formulaire
    // cardValidator définit les règles pour les champs question et answer
    const { question, answer } = await request.validateUsing(cardValidator)

    // Prend l’ID de la carte depuis l’URL et récupère la carte à mettre à jour depuis le backend
    const card = await Card.findOrFail(params.card_id)

    // Mise à jour des champs de la carte
    // merge() met à jour les champs spécifiés, save() enregistre en base de données
    // Si une carte correspond à l'id
    if (card) {
      await card.merge({ question, answer }).save()
    }

    // Message flash pour informer l'utilisateur que la mise à jour a réussi
    session.flash('success', 'La carte a été mise à jour avec succès !')

    // Redirection vers la liste des cartes du deck
    return response.redirect().toRoute('cards.home', { deck_id: params.deck_id })
  }

  /**
   * Delete record
   */
  async destroy({ params, session, response }: HttpContext) {
    // Prend l’ID de la carte depuis l’URL et récupère la carte à supprimer depuis le backend
    const card = await Card.findOrFail(params.card_id)

    // Suppression de la carte dans la base de données
    await card.delete()

    // Message flash pour informer l'utilisateur que la suppression a réussi
    session.flash('success', 'La carte a été supprimé avec succès !')

    // Redirection vers la liste des cartes du deck
    return response.redirect().toRoute('cards.home', { deck_id: params.deck_id })
  }
}
