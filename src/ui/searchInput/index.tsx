import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { useDebounce } from "..";

const SearchIconStyled = styled(SearchIcon)`
  display: block;
  height: auto;
  width: 16px;
  fill: ${(props) => props.theme.borderColor};
  cursor: pointer;
  :hover {
    fill: ${(props) => props.theme.borderHoverColor};
  }
`;
const IconContainer = styled.div`
  display: inline-block;
  height: 100%;
`;

//
const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 3px;
  background-color: ${(props) => props.theme.inputBackgroundColor};
  border-radius: ${(props) => props.theme.borderRadius};
  border: 1px solid ${(props) => props.theme.borderColor};
  padding: ${(props) => props.theme.inputPadding};

  color: inherit;
  :hover {
    border: 1px solid ${(props) => props.theme.borderHoverColor};
  }
  :focus-within {
    outline: none;
    border-color: ${(props) => props.theme.borderFocusColor};
    box-shadow: ${(props) => props.theme.borderFocusBoxShadow};
  }
`;

const Input = styled.input`
  border: none;
  flex: 1;
  margin: 0px;
  padding: 0px;
  color: inherit;
  outline: none;
  ::placeholder {
    color: ${(props) => props.theme.placeholderColor};
  }
  :hover {
    outline: none;
  }
`;

type TProps = React.HTMLProps<HTMLInputElement> & {
  onSearch?: (searchTerm: string) => any;
  autoSearch: boolean;
};

/***
 * The component
 */
export const SearchInput = (props: TProps) => {
  const {
    style,
    className,
    autoFocus,
    autoComplete,
    autoCorrect,
    autoSave,
    placeholder,
    onChange,
    onSearch,
  } = props;
  const [state, setState] = useState({ isPristine: true, value: props.value });

  const debouncedSearchTerm = useDebounce(state.value, 300);

  const { value, isPristine } = state;
  const latestOnSearch = useRef(onSearch);
  useEffect(() => {
    if (isPristine) return;

    latestOnSearch.current &&
      latestOnSearch.current(debouncedSearchTerm as string);
  }, [debouncedSearchTerm, isPristine]);

  const handleChange = (event) => {
    const { value } = event.target;
    setState((state) => ({ isPristine: false, value }));
    onChange && onChange(event);
  };

  return (
    <InputContainer style={style} className={className}>
      <Input
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        autoCorrect={autoCorrect}
        autoSave={autoSave}
        placeholder={placeholder}
        onChange={handleChange}
        value={value ? value : ""}
        onKeyDown={(e) =>
          e.key === "Enter" && onSearch && onSearch(value as string)
        }
      />
      {/*</InputContainer><IconContainer onClick={() => onSearch(value as string)}>*/}
      <IconContainer onClick={() => onSearch}>
        <SearchIconStyled />
      </IconContainer>
    </InputContainer>
  );
};
SearchInput.defaultProps = {
  autoSearch: true,
};
