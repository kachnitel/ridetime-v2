import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import SignOutButton from '../../components/SignOutButton'

function ProfileScreen () {
  return (
    <View style={styles.container}>
      <Text> ProfileScreen </Text>
      <SignOutButton />
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
