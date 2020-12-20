import { StatusBar } from 'expo-status-bar'
import { Observer } from 'mobx-react'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SignInButton from './src/components/SignInButton'
import SignOutButton from './src/components/SignOutButton'
import ApplicationStore from './src/stores/ApplicationStore'
import * as SecureStore from 'expo-secure-store'
import Authentication from './src/Authentication'

export default class App extends React.Component {
  state = {
    loading: true
  }

  componentDidMount () {
    this.loadAuthAsync()
  }

  loadAuthAsync = async () => {
    let refreshToken = await SecureStore.getItemAsync('refreshToken')
    if (!refreshToken) {
      console.log('No token')
      this.setState({ loading: false })
      return
    }

    let auth = new Authentication()
    let token = await auth.refreshToken(refreshToken)
    if (!token?.access_token) {
      console.log('Error refreshing token')
      return
    }

    await ApplicationStore.signIn(token)
    this.setState({ loading: false })
  }

  render () {
    return (
      <View style={styles.container}>
        <Observer>{() => <>
          <Text>User: { ApplicationStore.userId }</Text>
          { this.state.loading
            ? <Text>Loading...</Text>
            : ApplicationStore.userId ? <SignOutButton /> : <SignInButton /> }
        </>}</Observer>
        <StatusBar style="auto" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
