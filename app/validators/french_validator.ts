import { SimpleMessagesProvider } from '@vinejs/vine'

const validatorsInFrench = new SimpleMessagesProvider({
  required: 'Le champ {{ field }} est obligatoire',
  minLength: 'Le champ {{ field }} doit contenir au moins {{ min }} caractère(s)',
  maxLength: 'Le champ {{ field }} ne peut dépasser {{ max }} caractère(s)',
  number: 'Le champ {{ field }} doit être un nombre',
  string: 'Le champ {{ field }} doit être une chaîne de caractères',
})

export { validatorsInFrench }
