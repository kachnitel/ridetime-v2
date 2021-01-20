import PropTypes from 'prop-types'
import React from 'react'
import { Alert } from 'react-native'
import ProfilePicture from './ProfilePicture'
import * as ImageManipulator from 'expo-image-manipulator'
import * as ImagePicker from 'expo-image-picker'
import { TouchableOpacity } from 'react-native-gesture-handler'

const EditPicture = (props) => {
  let selectPictureAsync = async () => {
    let picture = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1]
    })

    if (picture.cancelled) {
      return
    }
    if (picture.height < props.minSize) {
      Alert.alert('Sorry! That picture is too small! Minimum size is 300x300 px')
      return
    }
    if (picture.height > props.maxSize) {
      picture = await ImageManipulator.manipulateAsync(
        picture.uri,
        [
          { resize: { width: props.maxSize, height: props.maxSize } }
        ],
        {
          compress: props.jpegCompression,
          format: 'jpeg'
        }
      )
    }

    props.onSelect(picture)
  }

  return <TouchableOpacity onPress={selectPictureAsync}>
    <ProfilePicture {...props} />
  </TouchableOpacity>
}

EditPicture.propTypes = {
  onSelect: PropTypes.func.isRequired,
  maxSize: PropTypes.number,
  minSize: PropTypes.number,
  jpegCompression: PropTypes.number
}

EditPicture.defaultProps = {
  maxSize: 600,
  minSize: 300,
  jpegCompression: 0.85
}

export default EditPicture
