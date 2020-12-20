import { StatusBar } from 'expo-status-bar'
import { Observer } from 'mobx-react'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SignInButton from './src/components/SignInButton'
import SignOutButton from './src/components/SignOutButton'
import ApplicationStore from './src/stores/ApplicationStore'

export default function App() {
  return (
    <View style={styles.container}>
      <Observer>{() => <>
        <Text>User: { ApplicationStore.userId }</Text>
        <Text>Token: { ApplicationStore.refreshToken }</Text>
        { ApplicationStore.refreshToken ? <SignOutButton /> : <SignInButton /> }
      </>}</Observer>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
