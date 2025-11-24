/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import DecksController from '#controllers/decks_controller'
import router from '@adonisjs/core/services/router'

//router.on('/').render('pages/home')
router.get('/', [DecksController, 'index']).as('home')

// Route permettant de voir les decks d'un user
router.get('/deck/:id/show', [DecksController, 'show']).as('deck.show')

router.delete('/deck/:id/destroy', [DecksController, 'destroy']).as('deck.destroy')

router.get('/deck/add', [DecksController, 'create']).as('teacher.create')
