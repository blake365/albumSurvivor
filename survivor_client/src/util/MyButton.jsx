import React from 'react'

import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'

export default function MyButton({
  children,
  onClick,
  btnClassName,
  tipClassName,
  tip,
  value,
}) {
  return (
    <Tooltip title={tip} className={tipClassName} placement='top'>
      <IconButton onClick={onClick} className={btnClassName} value={value}>
        {children}
      </IconButton>
    </Tooltip>
  )
}
