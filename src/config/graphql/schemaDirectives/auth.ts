import { SchemaDirectiveVisitor, AuthenticationError} from 'apollo-server-express'
import { defaultFieldResolver } from 'graphql'

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = function(...args) {
      const { currentAccount } = args[2]
      if (!currentAccount) {
        return new AuthenticationError('Authentication token is invalid, please try again.')
      }
      return resolve.apply(this, args)
    }
  }
}

export default AuthDirective