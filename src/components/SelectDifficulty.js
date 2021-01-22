import React from 'react'
import OutlinedSelectWithIcon from './OutlinedSelectWithIcon'
import TrailDifficultyIcon, { icons } from './TrailDifficultyIcon'

const SelectDifficulty = (props) => {
  let options = Object.keys(icons)
    .map(Number)
    .filter((level) => level > 0) // Hide "Other"
    .map((level) => {
      let Icon = (props) => <TrailDifficultyIcon level={Number(level)} {...props} />
      return {
        ...icons[level],
        icon: Icon
      }
    })

  return <OutlinedSelectWithIcon
    { ...props }
    options={options}
  />
}

export default SelectDifficulty
