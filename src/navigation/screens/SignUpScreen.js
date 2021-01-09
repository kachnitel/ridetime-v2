import PropTypes from 'prop-types'
import React from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'
import Authentication from '../../Authentication'

export default class SignUpScreen extends React.Component {
  state = {
    userInfo: null
  }

  getInfo = async () => {
    let auth = new Authentication()
    let userInfo = await auth.getUserInfo(this.props.route.params.token.access_token)
    this.setState({ userInfo: userInfo })
  }

  componentDidMount () {
    this.getInfo()
  }

  render() {
    let userInfo = this.state.userInfo
    return <View style={styles.container}>
      <Text> SignUpScreen </Text>
      <Text>{ userInfo?.name ?? 'Loading user information' }</Text>
      <Text>{ JSON.stringify(userInfo) }</Text>
      <TextInput
        value={userInfo?.name}
        onChangeText={(val) => this.setState({ userInfo: {...userInfo, name: val}})}
        placeholder={'Name'}
      />
    </View>
  }
}

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
})
