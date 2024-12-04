import { TinaNodeBackend, LocalBackendAuthProvider } from '@tinacms/datalayer'
import { TinaAuthJSOptions, AuthJsBackendAuthProvider } from 'tinacms-authjs'
import databaseClient from '../../../tina/__generated__/databaseClient'
import { createClient } from '@vercel/kv'

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true'

const handler = TinaNodeBackend({
  authProvider: isLocal 
    ? LocalBackendAuthProvider() 
    : AuthJsBackendAuthProvider({
        authOptions: TinaAuthJSOptions({
          databaseClient: databaseClient,
          secret: process.env.NEXTAUTH_SECRET,
          // Optional: customize providers
          providers: [
            // Add any additional auth providers if needed
          ],
        }),
      }),
  databaseClient,
})

export default (req, res) => {
  return handler(req, res)
}