import PropTypes from 'prop-types'
import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Authentication from '../../Authentication'
import { StoreContext } from '../../StoreContext'
import EditBasicUserInfo from '../../components/EditBasicUserInfo'

export default class SignUpScreen extends React.Component {
  state = {
    userInfo: null
  }

  componentDidMount () {
    this.getInfo()
  }

  getInfo = async () => {
    let auth = new Authentication()
    let userInfo = await auth.getUserInfo(this.props.route.params.token.access_token)
    this.setState({ userInfo: userInfo })
  }

  _signUpAsync = async (userInfo) => {
    let AppStore = this.context.application
    return AppStore.signUpAsync(this.props.route.params.token, userInfo)
  }

  render() {
    let userInfo = this.state.userInfo
    return <View style={styles.container}>
      { userInfo === null
        ? <Text>Loading user information</Text>
        : <EditBasicUserInfo
          submitAction={this._signUpAsync}
          submitTitle='Sign up'
          userInfo={userInfo}
          style={ styles.formContainer }
        />
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
    justifyContent: 'center'
  },
  formContainer: {
    width: '75%',
    alignContent: 'stretch'
  }
})
