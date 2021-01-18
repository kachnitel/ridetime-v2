import { Observer } from 'mobx-react'
import React, { useContext } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import SignOutButton from '../../components/SignOutButton'
import { StoreContext } from '../../StoreContext'

function ProfileScreen () {
  let stores = useContext(StoreContext)
  return (
    <View style={styles.container}>
      <Text> ProfileScreen </Text>
      <Observer>{ () =>
        <Text>{ stores.user.currentUser.id }</Text>
      }</Observer>
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
