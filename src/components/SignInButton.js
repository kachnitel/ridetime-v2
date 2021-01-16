import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { ActivityIndicator, Button } from 'react-native'
import Authentication from '../Authentication'
import { StoreContext } from '../StoreContext'

export default class SignInButton extends Component {
  state = {
    loading: false
  }

  _signInAsync = async () => {
    this.setState({ loading: true })
    let auth = new Authentication()
    let tokenResult = await auth.login()
    if (!tokenResult?.access_token) {
      console.log('Error fetching authentication token', tokenResult)
      return
    }

    let AppStore = this.context.application
    let result = await AppStore.signInAsync(tokenResult)
    if (!result.success) {
      if (result.errorCode === 404) {
        // Navigate to SignUp if user is not found at API
        this.props.navigation.navigate('SignUp', {
          token: tokenResult
        })
      } else {
        console.log('signIn error', result)
      }

      this.setState({ loading: false })
    }
  }

  render() {
    return this.state.loading
      ? <ActivityIndicator />
      : <Button title='Sign in' onPress={this._signInAsync} />
  }
}

SignInButton.contextType = StoreContext

SignInButton.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
}
