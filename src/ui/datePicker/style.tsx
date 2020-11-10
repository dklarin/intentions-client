import { styled } from '../theme'

export const StyledDatePicker = styled.div<any>`
  display: flex;
  flex-direction: row;
  background-color: ${props => props.theme.inputBackgroundColor};
  border-radius: ${props => props.theme.borderRadius};
  border: 1px solid ${props => props.theme.borderColor};
  padding: ${props => props.theme.inputPadding};
  margin: ${props => props.margin || 'none'};
  color: ${props => props.theme.color};
  &:focus-within {
    outline: none;
    border-color: ${props => props.theme.borderFocusColor};
    box-shadow: ${props => props.theme.borderFocusBoxShadow};
  }
  &:hover {
    border-color: ${props => props.theme.borderHoverColor};
  }
`

export const StyledInput = styled.input`
  color: inherit;
  flex: 1;
  min-width: 0;
  width: 87%;
  outline: none;
  border: 0px;
  background-color: ${props => props.theme.inputBackgroundColor};
  font-size: 0.8rem;
  ::placeholder {
    color: ${props => props.theme.placeholderColor};
  }
`

export const StyledButton = styled.div<{ disabled?: boolean }>`
  display: flex;
  flex-grow: 0;
  color: inherit;
  text-align: center;
  background-color: ${props => props.theme.inputBackgroundColor};
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
`
