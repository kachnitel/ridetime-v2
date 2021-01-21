import { Observer } from 'mobx-react'
import React from 'react'
import { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import EditBasicUserInfo from '../../components/EditBasicUserInfo'
import EditPicture from '../../components/EditPicture'
import SignOutButton from '../../components/SignOutButton'
import { StoreContext } from '../../StoreContext'

const ProfileScreen = () => {
  let { user: userStore } = useContext(StoreContext)
  // eslint-disable-next-line no-unused-vars
  let { store, events, friends, ...userInfo } = userStore.currentUser

  return <View style={styles.container}>
    <Observer>{ () => <>
      <EditPicture
        uri={userInfo?.picture }
        onSelect={userStore.uploadPictureAsync}
        containerStyle={ styles.picture }
      />
      <EditBasicUserInfo
        submitAction={userStore.updateUserAsync}
        submitTitle='Save'
        userInfo={userInfo}
        style={ styles.formContainer }
      />
    </>}</Observer>
    <SignOutButton />
  </View>
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  picture: {
    width: '50%'
  },
  formContainer: {
    width: '70%'
  }
})
