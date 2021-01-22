import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { OutlinedTextField } from 'rn-material-ui-textfield'
import Colors from '../Colors'

const MenuItem = ({
  icon,
  label,
  value,
  isSelected,
  onValueChange
}) => <TouchableOpacity onPress={() => onValueChange(value)}>
  <View
    style={ isSelected
      ? { ...styles.optionContainer, backgroundColor: Colors.highlightItem }
      : styles.optionContainer }
  >
    { icon({ size: heightPercentageToDP(6) }) }
    <Text>{ label }</Text>
  </View>
</TouchableOpacity>

MenuItem.propTypes = {
  icon: PropTypes.func,
  isSelected: PropTypes.bool,
  label: PropTypes.string,
  onValueChange: PropTypes.func,
  value: PropTypes.any
}

const SelectModal = ({
  menuVisible,
  hideMenu,
  options,
  selected,
  onValueChange,
  flatListProps
}) => <Modal
  isVisible={menuVisible}
  onBackButtonPress={hideMenu}
  onBackdropPress={hideMenu}
>
  <View style={ styles.modal }>
    <FlatList
      contentContainerStyle={{ width: widthPercentageToDP(80) }}
      data={options}
      renderItem={({ item }) => <MenuItem
        { ...item }
        isSelected={ selected == item.value }
        onValueChange={(val) => {
          onValueChange(val)
          hideMenu()
        }}
      /> }
      keyExtractor={ (item, index) => item.label + index }
      { ...flatListProps }
    />
  </View>
</Modal>

SelectModal.propTypes = {
  flatListProps: PropTypes.object,
  hideMenu: PropTypes.func,
  menuVisible: PropTypes.bool,
  onValueChange: PropTypes.func,
  options: PropTypes.array,
  selected: PropTypes.any
}

const OutlinedSelectWithIcon = ({
  label,
  options,
  selected,
  onValueChange,
  flatListProps,
  ...props
}) => {
  let [menuVisible, setMenuVisible] = useState(false)
  let hideMenu = () => setMenuVisible(false)
  let selectedOption = options.find(({ value }) => value === selected)

  return <View { ...props }>
    <TouchableOpacity onPress={() => setMenuVisible(true)}>
      <OutlinedTextField
        value={selectedOption?.label}
        label={label}
        labelOffset={{ x1: -(heightPercentageToDP(4) + widthPercentageToDP(1) + 10) }} // HACK:
        editable={false}
        renderLeftAccessory={() => selectedOption?.icon({ size: heightPercentageToDP(4), style: styles.icon })}
        renderRightAccessory={() => <Text style={ styles.dropdownArrow }>&#9660;</Text>}
      />
    </TouchableOpacity>
    <SelectModal
      menuVisible={menuVisible}
      hideMenu={hideMenu}
      options={options}
      selected={selected}
      onValueChange={onValueChange}
      flatListProps={flatListProps}
    />
  </View>
}

OutlinedSelectWithIcon.propTypes = {
  flatListProps: PropTypes.object,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    icon: PropTypes.func.isRequired, // Function that returns component to render
    value: PropTypes.any.isRequired
  })),
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onValueChange: PropTypes.func.isRequired
}

export default OutlinedSelectWithIcon

const styles = StyleSheet.create({
  icon: {
    marginRight: widthPercentageToDP(1)
  },
  modal: {
    backgroundColor: Colors.lightBackground,
    borderRadius: heightPercentageToDP(2),
    alignItems: 'center',
    paddingVertical: heightPercentageToDP(2)
  },
  optionContainer: {
    height: heightPercentageToDP(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  dropdownArrow: {
    opacity: 0.3,
    fontSize: heightPercentageToDP(3)
  }
})
