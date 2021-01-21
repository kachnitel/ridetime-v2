import { Observer } from 'mobx-react'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import EditBasicUserInfo from '../../components/EditBasicUserInfo'
import EditPicture from '../../components/EditPicture'
import SignOutButton from '../../components/SignOutButton'
import { StoreContext } from '../../StoreContext'

export default class ProfileScreen extends React.Component {
  render () {
    // eslint-disable-next-line no-unused-vars
    let { store, events, friends, ...userInfo } = this.context.user.currentUser
    return <View style={styles.container}>
      <Observer>{ () => <>
        <EditPicture
          uri={userInfo?.picture }
          onSelect={this.context.user.uploadPictureAsync}
          containerStyle={ styles.picture }
        />
        <EditBasicUserInfo
          submitAction={this.context.user.updateUserAsync}
          submitTitle='Save'
          userInfo={userInfo}
          style={ styles.formContainer }
        />
      </>}</Observer>
      <SignOutButton />
    </View>
  }
}

ProfileScreen.contextType = StoreContext

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
