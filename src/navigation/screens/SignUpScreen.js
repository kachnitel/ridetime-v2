import PropTypes from 'prop-types'
import React from 'react'
import { Text, View, StyleSheet, Button, ActivityIndicator } from 'react-native'
import Authentication from '../../Authentication'
import { OutlinedTextField } from 'rn-material-ui-textfield'
import { StoreContext } from '../../StoreContext'
import { Observer } from 'mobx-react'

export default class SignUpScreen extends React.Component {
  state = {
    userInfo: null,
    loading: false
  }

  componentDidMount () {
    this.getInfo()
  }

  getInfo = async () => {
    let auth = new Authentication()
    let userInfo = await auth.getUserInfo(this.props.route.params.token.access_token)
    this.setState({ userInfo: userInfo })
  }

  _signUpAsync = async () => {
    this.setState({ loading: true })

    let AppStore = this.context.application
    return AppStore.signUpAsync(this.props.route.params.token, this.state.userInfo)
  }

  render() {
    let userInfo = this.state.userInfo
    return <View style={styles.container}>
      <Text> SignUpScreen </Text>
      <Text>{ JSON.stringify(userInfo) }</Text>
      <Observer>{() => <Text>ID: { this.context.application.userId }</Text>}</Observer>
      { userInfo === null
        ? <Text>Loading user information</Text>
        : <View style={styles.formContainer}>
          <OutlinedTextField
            value={userInfo?.name}
            onChangeText={(val) => this.setState({ userInfo: {...userInfo, name: val}})}
            label='Name'
            textContentType='name'
          />
          <OutlinedTextField
            value={userInfo?.email}
            onChangeText={(val) => this.setState({ userInfo: {...userInfo, email: val}})}
            label='E-Mail'
            textContentType='emailAddress'
          />
          <OutlinedTextField
            value={userInfo?.hometown}
            onChangeText={(val) => this.setState({ userInfo: {...userInfo, hometown: val}})}
            label='Home town'
            textContentType='addressCityAndState'
          />
          { this.state.loading
            ? <ActivityIndicator />
            : <Button
              title='Sign Up'
              onPress={this._signUpAsync}
            />
          }
        </View>
      }
    </View>
  }
}

SignUpScreen.contextType = StoreContext

SignUpScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.shape({
        access_token: PropTypes.string
      })
    })
  })
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '75%',
    alignContent: 'stretch'
  }
})
