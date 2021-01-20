import { Observer } from 'mobx-react'
import React, { useContext } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import EditPicture from '../../components/EditPicture'
import ProfilePicture from '../../components/ProfilePicture'
import SignOutButton from '../../components/SignOutButton'
import { StoreContext } from '../../StoreContext'
import { User } from '../../stores/UserStore'

function ProfileScreen () {
  let stores = useContext(StoreContext)
  let currentUser: User = stores.user.currentUser
  return (
    <View style={styles.container}>
      <Text> ProfileScreen </Text>
      <Observer>{ () => <>
        <Text>{ currentUser.name }</Text>
        <ProfilePicture uri={ currentUser.picture } style={ styles.picture } />
        <EditPicture uri={ currentUser.picture } style={ styles.picture } onSelect={console.log} />
      </>}</Observer>
      <SignOutButton />
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  picture: {
    width: '50%'
  }
})
