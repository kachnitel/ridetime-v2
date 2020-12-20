import * as AuthSession from 'expo-auth-session'
import QueryString from 'qs'
import randomatic from 'randomatic'
import { auth0 } from '../secrets'
import { Connection } from '@kachnitel/efetch'

export default class Authentication {
  constructor () {
    this.connection = new Connection(auth0.domain)
  }

  /**
   * @return Promise
   * {
   *   "access_token":"eyJz93a...k4laUWw",
   *   "refresh_token":"GEbRxBN...edjnXbL",
   *   "id_token":"eyJ0XAi...4faeEoQ",
   *   "token_type":"Bearer",
   *   "expires_in":86400
   * }
   */
  login = async () => {
    let redirectUrl = AuthSession.makeRedirectUri({ useProxy: true })
    let oAuthState = randomatic('Aa0', 7)
    let codeVerifier = randomatic('Aa0', 50)

    let authUrl = `${auth0.domain}/authorize?` + QueryString.stringify({
      client_id: auth0.clientId,
      response_type: 'code',
      scope: 'openid profile email offline_access',
      redirect_uri: redirectUrl,
      code_challenge_method: 'S256',
      code_verifier: codeVerifier,
      state: oAuthState,
      audience: auth0.audience
    })

    let result = await AuthSession.startAsync({
      authUrl: authUrl
    })

    if (result.type === 'success') {
      if (oAuthState !== result.params.state) {
        throw new Error('OAuth state mismatch')
      }

      return this.getOAuthToken(codeVerifier, result.params.code)
    } else if (
      result.type === 'dismiss' ||
      (result.type === 'error' && result.errorCode === 'login-declined')
    ) {
      return false
    }
    // logger.error('Login failed', result) // TODO:
    throw new Error('Error signing in')
  }

  logout = async () => {
    let logoutUrl = AuthSession.makeRedirectUri({ useProxy: true })

    let result = await AuthSession.startAsync({
      authUrl: `${auth0.domain}/v2/logout?` + QueryString.stringify({
        client_id: auth0.clientId,
        returnTo: logoutUrl
      })
    })

    if (result.type !== 'success') {
      // logger.error('Error logging out', result) TODO:
      return false
    }

    return true
  }

  /**
   * POST /oauth/token (JSON)
   *
   * @return Promise | token
   */
  getOAuthToken = (codeVerifier, code) => this.connection.post(
    'oauth/token',
    {
      grant_type: 'authorization_code',
      client_id: auth0.clientId,
      code_verifier: codeVerifier,
      code: code,
      redirect_uri: auth0.redirectUri
    }
  )

  /**
   * Exchange refresh_token for access_token
   *
   * POST https://YOUR_AUTH0_DOMAIN/oauth/token
   * @return Promise
   * {
   *   "access_token": "eyJ...MoQ",
   *   "expires_in": 86400,
   *   "scope": "openid offline_access",
   *   "id_token": "eyJ...0NE",
   *   "token_type": "Bearer"
   * }
   */
  refreshToken = (refreshToken: String) => this.connection.post(
    'oauth/token',
    {
      grant_type: 'refresh_token',
      client_id: auth0.clientId,
      refresh_token: refreshToken
    }
  )

  /**
   * GET /userinfo (JSON)
   * Used for new user sign up
   * {
   *  "sub": "google-oauth2|123",
   *  "given_name": "Kach",
   *  "family_name": "Na",
   *  "nickname": "kachnitel",
   *  "name": "Kach Na",
   *  "picture": "https://lh6.googleusercontent.com/.../photo.jpg",
   *  "locale": "en-GB",
   *  "updated_at": "2020-11-24T05:42:11.141Z",
   *  "email": "person@place.ca",
   *  "email_verified": true
   * }
   *
   * @return Promise | user object
   */
  getUserInfo = (apiToken: String) => {
    this.connection.addHeaders({
      'Authorization': 'Bearer ' + apiToken
    })
    return this.connection.get('userinfo')
  }
}