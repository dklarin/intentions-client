import React, { ButtonHTMLAttributes } from 'react'
import { styled } from '../theme'
import { lighten } from 'polished'
const StyledPrimaryButton = styled.button`
  padding: 12px;
  min-width: 90px;
  margin-top: 6px;
  margin-right: 6px;
  margin-left: 6px;
  background-color: ${props => props.theme.palette.primary100};
  outline: none;
  border: none;
  color: white;
  cursor: ${props => (props.disabled ? 'initial' : 'pointer')};
  border-radius: 4px;
  :disabled {
    background-color: ${props => lighten(0.25, props.theme.palette.primary100)};
  }
  :hover:not([disabled]) {
    background-color: ${props => props.theme.palette.primary80};
  }
  :focus {
    box-shadow: ${props => props.theme.borderFocusBoxShadow};
  }
`

const StyledSecondaryButton = styled.button`
  background: none;
  min-width: 60px;
  border: none;
  outline: none;
  color: ${props => props.theme.palette.primary80};
  cursor: pointer;
  padding: 12px;
  margin-top: 6px;
  margin-right: 6px;
  border-radius: 8px;

  :hover {
    color: ${props => props.theme.palette.primary140};
  }

  :focus {
    box-shadow: ${props => props.theme.borderFocusBoxShadow};
  }
`

type TProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  level?: 'primary' | 'secondary'
  ref?: any
}

export const Button = React.forwardRef((props: TProps, ref) => {
  const { children } = props
  const level = props.level ? props.level : 'primary'
  if (level === 'primary')
    return (
      <StyledPrimaryButton ref={ref} {...props}>
        {children}
      </StyledPrimaryButton>
    )
  else
    return (
      <StyledSecondaryButton ref={ref} {...props}>
        {children}
      </StyledSecondaryButton>
    )
})
Button.defaultProps = {
  level: 'primary',
}
