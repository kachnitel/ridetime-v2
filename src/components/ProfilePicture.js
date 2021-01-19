import PropTypes from 'prop-types'
import React from 'react'
import {
  Dimensions,
  Image,
  // ImagePropTypes,
  StyleSheet
} from 'react-native'

const ProfilePicture = ({ uri, style }) => (
  <Image source={{ uri: uri }} style={{ ...styles.image, ...style }} />
)

ProfilePicture.propTypes = {
  style: PropTypes.any, // style: ImagePropTypes.style /FIXME: ImagePropTypes undefined
  uri: PropTypes.string
}

export default ProfilePicture

const styles=StyleSheet.create({
  image: {
    aspectRatio: 1,
    borderRadius: Dimensions.get('window').height // Defaults to 50% of size
  }
})
