/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import CardsController from '#controllers/cards_controller'
import DecksController from '#controllers/decks_controller'
import router from '@adonisjs/core/services/router'

//router.on('/').render('pages/home')
router.get('/', [DecksController, 'index']).as('home')

/**
 * ROUTES pour les DECKS
 */

// Route permettant de voir les decks d'un user
router.get('/decks-by-user/show', [DecksController, 'show']).as('decks.show')

// Route permettant de supprimer les decks d'un user
router.delete('/deck/:deck_id/destroy', [DecksController, 'destroy']).as('deck.destroy')

// Route permettant de voir les cards d'un deck
router.get('/deck/:deck_id/show', [CardsController, 'show']).as('cards.show')

// Route permettant d'afficher le formulaire permettant la mise à jour d'un deck
router.get('/deck/:deck_id/edit', [DecksController, 'edit']).as('deck.edit')

// Route permettant la modification d'un deck
router.post('/deck/:deck_id/update', [DecksController, 'update']).as('deck.update')

/**
 * ROUTES pour les CARDS
 */

// Route permettant de modifier une carte d'un deck
router.put('/decks/:deck_id/cards/:card_id/edit', [CardsController, 'edit']).as('card.edit')

// Route permettant de supprimer une carte d'un deck
router
  .delete('/decks/:deck_id/cards/:card_id/destroy', [CardsController, 'destroy'])
  .as('card.destroy')
