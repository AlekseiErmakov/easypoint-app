import { Button } from 'antd'
import React from 'react'

export interface ButtonProps {
  onClick: () => void
  icon: React.ReactNode
}

const EpButton = (props: ButtonProps): JSX.Element => {
  return <Button type="primary" shape="round" icon={props.icon} size={'large'}
                 onClick={props.onClick}
                 style={{ position: 'relative', float: 'right', marginBottom: '20px' }}/>
}

export default EpButton
