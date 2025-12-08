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
router.get('/deck/:deck_id/show', [CardsController, 'show']).as('cards.show').use(middleware.auth())

// Route permettant de supprimer les decks d'un user
router
  .delete('/deck/:deck_id/destroy', [DecksController, 'destroy'])
  .as('deck.destroy')
  .use(middleware.auth())

// Route permettant d'afficher le formulaire permettant l'ajout d'un deck
router.get('/deck/add', [DecksController, 'create']).as('deck.create').use(middleware.auth())
// Route permettant l'ajout d'un deck
router.post('/deck/add', [DecksController, 'store']).as('deck.store').use(middleware.auth())

// Route permettant d'afficher le formulaire permettant la mise à jour d'un deck
router.get('/deck/:deck_id/edit', [DecksController, 'edit']).as('deck.edit').use(middleware.auth())
// Route permettant la modification d'un deck
router
  .post('/deck/:deck_id/update', [DecksController, 'update'])
  .as('deck.update')
  .use(middleware.auth())

// Route permettant de jouer un deck
router.get('/deck/:deck_id/play', [DecksController, 'play']).as('deck.play').use(middleware.auth())

// Route permettant de publish un deck
router
  .post('/deck/:deck_id/publish', [DecksController, 'publish'])
  .as('deck.publish')
  .use(middleware.auth())

/**
 * ROUTES pour les CARDS
 */

// Route permettant de voir une carte d'un deck
router
  .get('/deck/:deck_id/cards/:card_id/showCard', [CardsController, 'showCard'])
  .as('card.show')
  .use(middleware.auth())

// Route permettant de supprimer une carte d'un deck
router
  .delete('/decks/:deck_id/cards/:card_id/destroy', [CardsController, 'destroy'])
  .as('card.destroy')
  .use(middleware.auth())

// Route permettant d'afficher le formulaire permettant l'ajout d'une carte
router
  .get('/decks/:deck_id/card/add', [CardsController, 'create'])
  .as('card.create')
  .use(middleware.auth())
// Route permettant l'ajout d'une carte
router
  .post('/decks/:deck_id/card/add', [CardsController, 'store'])
  .as('card.store')
  .use(middleware.auth())

// Route permettant de modifier une carte d'un deck
router
  .get('/decks/:deck_id/card/:card_id/edit', [CardsController, 'edit'])
  .as('card.edit')
  .use(middleware.auth())
// Route permettant la modification d'une carte
router
  .post('/decks/:deck_id/card/:card_id/update', [CardsController, 'update'])
  .as('card.update')
  .use(middleware.auth())

// Route permettant de se connecter
router.post('/login', [AuthController, 'handleLogin']).as('auth.handleLogin')
// Route permettant de se déconnecter
router
  .post('/logout', [AuthController, 'handleLogout'])
  .as('auth.handleLogout')
  .use(middleware.auth())
