import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View, ActivityIndicator, Button } from 'react-native'
import { OutlinedTextField } from 'rn-material-ui-textfield'

export default class EditBasicUserInfo extends Component {
  constructor (props) {
    super(props)

    this.state = {
      userInfo: props.userInfo,
      loading: false
    }
  }

  render() {
    return <View { ...this.props }>
      <OutlinedTextField
        value={this.state.userInfo?.name}
        onChangeText={(val) => this.setState({ userInfo: { ...this.state.userInfo, name: val } })}
        label='Name'
        textContentType='name'
        disabled={this.state.loading}
      />
      <OutlinedTextField
        value={this.state.userInfo?.email}
        onChangeText={(val) => this.setState({ userInfo: { ...this.state.userInfo, email: val } })}
        label='E-Mail'
        textContentType='emailAddress'
        disabled={this.state.loading}
      />
      <OutlinedTextField
        value={this.state.userInfo?.hometown}
        onChangeText={(val) => this.setState({ userInfo: { ...this.state.userInfo, hometown: val } })}
        label='Home town'
        textContentType='addressCityAndState'
        disabled={this.state.loading}
      />
      { this.state.loading
        ? <ActivityIndicator />
        : <Button
          title={this.props.submitTitle}
          onPress={async () => {
            this.setState({ loading: true })
            try {
              await this.props.submitAction(this.state.userInfo)
            } finally {
              this.setState({ loading: false })
            }
          }}
        />
      }
    </View>
  }
}

EditBasicUserInfo.propTypes = {
  submitAction: PropTypes.func.isRequired,
  submitTitle: PropTypes.string.isRequired,
  userInfo: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    hometown: PropTypes.string
  })
}
