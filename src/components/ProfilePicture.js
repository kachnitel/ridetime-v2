import PropTypes from 'prop-types'
import React from 'react'
import {
  Dimensions,
  Image,
  // ImagePropTypes,
  StyleSheet,
  View
} from 'react-native'

const ProfilePicture = ({ uri, style }) => {
  return (
    <View>
      <Image source={{ uri: uri }} style={{ ...styles.image, ...style }} />
    </View>
  )
}

ProfilePicture.propTypes = {
  style: PropTypes.any, // style: ImagePropTypes.style /FIXME: ImagePropTypes undefined
  uri: PropTypes.string
}

export default ProfilePicture

const styles=StyleSheet.create({
  image: {
    aspectRatio: 1,
    borderRadius: Dimensions.get('window').height
  }
})
