import { Observer } from 'mobx-react'
import React from 'react'
import { View, StyleSheet, Button } from 'react-native'
import { OutlinedTextField } from 'rn-material-ui-textfield'
import EditPicture from '../../components/EditPicture'
import SignOutButton from '../../components/SignOutButton'
import { StoreContext } from '../../StoreContext'

export default class ProfileScreen extends React.Component {
  state = {
    userInfo: null
  }

  componentDidMount = () => {
    // eslint-disable-next-line no-unused-vars
    let { store, ...info } = this.context.user.currentUser
    this.setState({ userInfo: info })
  }

  render () {
    return <View style={styles.container}>
      <Observer>{ () => <>
        <EditPicture
          uri={this.state.userInfo?.picture }
          onSelect={this.context.user.uploadPictureAsync}
          containerStyle={ styles.picture }
        />
        <View style={ styles.formContainer }>
          <OutlinedTextField
            value={this.state.userInfo?.name}
            onChangeText={(val) => this.setState({ userInfo: { ...this.state.userInfo, name: val } })}
            label='Name'
            textContentType='name'
          />
          <OutlinedTextField
            value={this.state.userInfo?.email}
            onChangeText={(val) => this.setState({ userInfo: { ...this.state.userInfo, email: val } })}
            label='E-Mail'
            textContentType='emailAddress'
          />
          <OutlinedTextField
            value={this.state.userInfo?.hometown}
            onChangeText={(val) => this.setState({ userInfo: { ...this.state.userInfo, hometown: val } })}
            label='Home town'
            textContentType='addressCityAndState'
          />
        </View>
      </>}</Observer>
      <Button title='Save' onPress={() => this.context.user.updateUserAsync(this.state.userInfo)} />
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
