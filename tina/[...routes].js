import { TinaNodeBackend, LocalBackendAuthProvider } from '@tinacms/datalayer'

import { TinaAuthJSOptions, AuthJsBackendAuthProvider } from 'tinacms-authjs'

import databaseClient from '../../../tina/__generated__/databaseClient'

const HARD_CODED_USERNAME = 'r';
const HARD_CODED_PASSWORD = '123';

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true'

const handler = TinaNodeBackend({
  authProvider: AuthJsBackendAuthProvider({
        authOptions: TinaAuthJSOptions({
          databaseClient: databaseClient,
          secret: process.env.NEXTAUTH_SECRET,
          checkCredentials: (username, password) => {
            // Hardcoded validation logic for username and password
            return username === HARD_CODED_USERNAME && password === HARD_CODED_PASSWORD;
          },
        }),
      }),
  databaseClient,
})

export default (req, res) => {
  // Modify the request here if you need to
  return handler(req, res)
}