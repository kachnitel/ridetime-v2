import PropTypes from 'prop-types'
import * as React from 'react'
import Svg, { G, Circle, Path } from 'react-native-svg'
import Colors from '../Colors'

const AllMountain = (props) => <Svg width='1em' height='1em' viewBox='0 0 20.5 17.2' {...props}>
  <G fill='none' stroke='currentColor'>
    <G transform='translate(-26.9 -43.9) scale(.92253)'>
      <Circle cx={33.9} cy={61.6} r={3.3} strokeWidth={0.9} />
      <Circle cx={33.9} cy={61.6} r={3.8} strokeDasharray='.4 .2 .1 .2' strokeWidth={0.2} />
    </G>
    <G transform='translate(-15.1 -43.9) scale(.92253)'>
      <Circle cx={33.9} cy={61.6} r={3.3} strokeWidth={0.9} />
      <Circle cx={33.9} cy={61.6} r={3.8} strokeDasharray='.4 .2 .1 .2' strokeWidth={0.2} />
    </G>
    <Path
      strokeWidth={0.6}
      d='M9.1 13.5l-.7-3.9 1.5.3c.5 0 2.8-.8 4.6-1.5l.3.8c-2 .4-4 4-5 4.1zm0 0l-4.8-.7 4.1-3.2z'
    />
    <Path strokeWidth={0.5} d='M16.2 13L14 7.5h0l.5-.2' />
    <Path strokeWidth={0.4} d='M8.4 9.6l-.2-1.4h1-1.8' />
  </G>
  <G transform='translate(-29.9 -49)'>
    <Path
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.4}
      d='M38.8 62.7l2.2-3.9-3.4-2.4 1.4-3.7 5.2 3.2v0'
    />
    <Circle cx={39.8} cy={50.7} r={1.2} fill='currentColor' />
  </G>
</Svg>

AllMountain.propTypes = {
  ...Svg.propTypes
}

export const MemoAllMountain = React.memo(AllMountain)

const CrossCountry = (props) => <Svg width='1em' height='1em' viewBox='0 0 19.1 20.3' {...props}>
  <G fill='none' stroke='currentColor'>
    <G transform='rotate(-18.746 -113.58 118.786) scale(.92254)'>
      <Circle cx={33.9} cy={61.6} r={3.3} strokeWidth={0.9} />
      <Circle cx={33.9} cy={61.6} r={3.8} strokeDasharray='.4 .2 .1 .2' strokeWidth={0.2} />
    </G>
    <G transform='rotate(-18.746 -119.54 83.263) scale(.92254)'>
      <Circle cx={33.9} cy={61.6} r={3.3} strokeWidth={0.9} />
      <Circle cx={33.9} cy={61.6} r={3.8} strokeDasharray='.4 .2 .1 .2' strokeWidth={0.2} />
    </G>
    <Path
      strokeWidth={0.6}
      d='M8.3 12.6L6.3 9h1.6c.5-.2 2.5-1.7 4-2.9l.4.6c-1.7 1.1-2.4 5-3.3 5.5zm0 0l-4.8.9L6.4 9z'
    />
    <Path strokeWidth={0.5} d='M14.9 9.8l-4-4.6h0l.5-.4' />
    <Path strokeWidth={0.4} d='M6.4 9.1l-.7-1.3h0l1-.3L5 8' />
  </G>
  <G transform='translate(-32.4 -50)'>
    <Path
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.4}
      d='M40.6 62.9l.8-4.4-4-1.3.2-3.9 5.8 1.4v0'
    />
    <Circle cx={19.2} cy={60.6} r={1.2} transform='rotate(-18.7)' fill='currentColor' />
  </G>
  <Path
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeWidth={0.9}
    d='M.4 19.9c2.1-.7 1.4-1.5 3.5-2.1 2-.5.8 0 3.7-.6 2.6-1.3 1.8-2.3 2.9-3 2-.6 3.9.5 5.6.6 1.7.1 1.8-.5 2.6-1.3'
  />
</Svg>

export const MemoCrossCountry = React.memo(CrossCountry)

const Downhill = (props) => <Svg width='1em' height='1em' viewBox='0 0 19.1 20.3' {...props}>
  <G fill='none' stroke='currentColor'>
    <G transform='rotate(24 128.693 -30.443) scale(.92253)'>
      <Circle cx={33.9} cy={61.6} r={3.3} strokeWidth={0.9} />
      <Circle
        cx={33.9}
        cy={61.6}
        r={3.8}
        strokeDasharray='.4 .2 .1 .2'
        strokeWidth={0.2}
      />
    </G>
    <G transform='rotate(24 122.881 -2.768) scale(.92253)'>
      <Circle cx={33.9} cy={61.6} r={3.3} strokeWidth={0.9} />
      <Circle
        cx={33.9}
        cy={61.6}
        r={3.8}
        strokeDasharray='.4 .2 .1 .2'
        strokeWidth={0.2}
      />
    </G>
    <Path
      strokeWidth={0.6}
      d='M8.3 12.2l1-4 1.2 1 4.8.5v.7c-2-.3-5.3 2-6.2 1.8zm0 0L4 9.5l5.1-1.2z'
    />
    <Path strokeWidth={0.5} d='M15 14.6l.2-6h.6' />
    <Path strokeWidth={0.4} d='M9.2 8.3l.4-1.4h0l.9.3-1.6-.6' />
  </G>
  <G transform='translate(-32.4 -50)'>
    <Path
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.4}
      d='M40.3 62.3l3-3.6-2.3-3.4 4-.8 3 3.7v0'
    />
    <Circle cx={63.8} cy={29.7} r={1.2} transform='rotate(24)' fill='currentColor' />
    <G stroke='currentColor' strokeLinecap='round' strokeWidth={0.273} fill='currentColor'>
      <Path
        strokeLinejoin='round'
        d='M46 54.5a1.4 1.4 0 01-1-1.5 1.4 1.4 0 011-1.4 1.4 1.4 0 011.6.6l-1.2.8z'
      />
      <Path fill='none' strokeLinejoin='bevel' d='M47.1 52l1.2 1-1.3-.7z' />
      <Path
        strokeLinejoin='bevel'
        d='M46.2 53.7c.5.2.8.4 1.3.4h.1l-.2.6-1.5-.3z'
      />
    </G>
  </G>
  <Path
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeWidth={0.9}
    d='M.7 12.2c2 1 2 2.2 4 3.2 1.7 1 1.8-1 3.9-.8 2.9.6 3.1 3.5 5.3 4 1.6.2 2.9.2 4 0'
  />
</Svg>

export const MemoDownhill = React.memo(Downhill)

export const icons = {
  trail: {
    icon: MemoAllMountain,
    label: 'All Mountain/Enduro',
    value: 'trail'
  },
  downhill: {
    icon: MemoDownhill,
    label: 'Downhill/Freeride',
    value: 'downhill'
  },
  xc: {
    icon: MemoCrossCountry,
    label: 'Cross Country',
    value: 'xc'
  }
}

const TrailTypeIcon = (props) => {
  let { type, size, style, ...svgProps } = props
  let SvgIcon = icons[type].icon

  return <SvgIcon
    width={ size }
    height={ size }
    { ...svgProps }
    style={{ color: Colors.icon, ...style }}
  />
}

TrailTypeIcon.propTypes = {
  type: PropTypes.oneOf(Object.keys(icons)).isRequired,
  size: PropTypes.number,
  ...Svg.propTypes
}

export default TrailTypeIcon
