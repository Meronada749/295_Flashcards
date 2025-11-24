import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'cards'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('question')
      table.string('response')

      table
        .integer('deck_id') // Clé étrangère
        .unsigned() // La clé ne doit pas être négative
        .references('id') // Référence la colonne `id` de la table `decks`
        .inTable('decks') // Nom de la table de référence
        .onDelete('CASCADE') // Supprime les cards si la deck est supprimée
        .onUpdate('CASCADE') // Met à jour la clé étrangère si l'id change

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
