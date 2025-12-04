/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller'
import CardsController from '#controllers/cards_controller'
import DecksController from '#controllers/decks_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

//router.on('/').render('pages/home')
router.get('/', [DecksController, 'index']).as('home')

/**
 * ROUTES pour les DECKS
 */

// Route permettant de voir les decks d'un user
router.get('/decks-by-user/show', [DecksController, 'show']).as('decks.show').use(middleware.auth())

// Route permettant de voir les cards d'un deck
router.get('/deck/:deck_id/show', [CardsController, 'show']).as('cards.show')

// Route permettant de supprimer les decks d'un user
router.delete('/deck/:deck_id/destroy', [DecksController, 'destroy']).as('deck.destroy')

// Route permettant d'afficher le formulaire permettant l'ajout d'un deck
router.get('/deck/add', [DecksController, 'create']).as('deck.create')
// Route permettant l'ajout d'un deck
router.post('/deck/add', [DecksController, 'store']).as('deck.store')

// Route permettant d'afficher le formulaire permettant la mise à jour d'un deck
router.get('/deck/:deck_id/edit', [DecksController, 'edit']).as('deck.edit')
// Route permettant la modification d'un deck
router.post('/deck/:deck_id/update', [DecksController, 'update']).as('deck.update')

//router.get('/deck/:deck_id/play', [DecksController, 'play']).as('deck.play')
router.get('/deck/:deck_id/play/:index', [CardsController, 'play']).as('deck.play')

/**
 * ROUTES pour les CARDS
 */

// Route permettant de voir une carte d'un deck
router.get('/deck/:deck_id/cards/:card_id/show', [CardsController, 'showCard']).as('card.show')

// Route permettant de supprimer une carte d'un deck
router
  .delete('/decks/:deck_id/cards/:card_id/destroy', [CardsController, 'destroy'])
  .as('card.destroy')

// Route permettant d'afficher le formulaire permettant l'ajout d'une carte
router.get('/decks/:deck_id/card/add', [CardsController, 'create']).as('card.create')
// Route permettant l'ajout d'une carte
router.post('/decks/:deck_id/card/add', [CardsController, 'store']).as('card.store')

// Route permettant de modifier une carte d'un deck
router.get('/decks/:deck_id/card/:card_id/edit', [CardsController, 'edit']).as('card.edit')
// Route permettant la modification d'une carte
router.post('/decks/:deck_id/card/:card_id/update', [CardsController, 'update']).as('card.update')

// Route permettant de se connecter
router.post('/login', [AuthController, 'handleLogin']).as('auth.handleLogin')
// Route permettant de se déconnecter
router.post('/logout', [AuthController, 'handleLogout']).as('auth.handleLogout')
