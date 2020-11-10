import React, { useState, useEffect, useRef } from "react";
import { StyledButton, StyledDatePicker, StyledInput } from "./style";
import calendarIcon from "./icons/calendar.svg";
import moment from "moment";
import TetherComponent from "react-tether";
import { useClickOutside } from "../";
import { CalendarDropDown } from "./CalendarDropDown";

// cast the TetherComponent to any as we have some typing problems with react-tether
const Tether = TetherComponent as any;

type TProps = {
  /**
   * The selected date
   */
  value?: Date;

  /**
   *called when the user changes selected date
   */
  onChange: (value?: Date) => any;

  /**
   * if true makes the input take focus when the component is mounted
   */
  autoFocus?: boolean;
  /**
   * additional class name to assigne to the input container
   */
  className?: string;

  /**
   * Short hint that describes expected value of an date input
   */
  placeholder?: string;

  /**
   * If true input is disabled
   */
  disabled?: boolean;

  width?: string | number;

  date: Date;
};

const formatDate = (date?: Date) => {
  if (!date) return;
  return moment(date).format("DD.MM.YYYY");
};

/**
 * The DatePicker component
 *
 * @param props DatePicker props
 */
export function DatePicker(props: TProps) {
  const { value, onChange, autoFocus, className, disabled, date } = props;

  const inputRef = useRef();
  const dropDownRef = useRef<HTMLDivElement>(null);

  const [inputText, setInputText] = useState(formatDate(value));

  const [isTextChanged, setIsTextChanged] = useState(false);

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const focusInput = () => {
    const input = inputRef.current as any;
    input && input.focus();
  };
  useEffect(() => {
    if (value) {
      setInputText(formatDate(value));
    } else {
      if (!isTextChanged) {
        setInputText(formatDate(undefined));
      }
    }
  }, [value, setInputText, setIsTextChanged, isTextChanged]);

  const handleClose = () => {
    setIsDropDownOpen(false);
    focusInput();
  };

  useClickOutside(dropDownRef, handleClose);

  const handleDateSelected = (date) => {
    onChange && onChange(date);
    setIsDropDownOpen(false);
    focusInput();
  };
  const handleInputChange = (event) => {
    setIsTextChanged(true);
    setInputText(event.target.value);
    const m = moment(
      event.target.value,
      [
        "DD MM YYYY",
        "D MM YYYY",
        "DD M YYYY",
        "D M YYYY",
        "DD.MM.YYYY",
        "D.MM.YYYY",
        "DD.M.YYYY",
        "D.M.YYYY",
      ],
      true
    );

    if (m.isValid()) {
      handleDateSelected(m.toDate());
    } else {
      handleDateSelected(undefined);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "F4") {
      setIsDropDownOpen(true);
    }
  };

  return (
    <Tether
      style={{ zIndex: 100000 }}
      attachment="top left"
      targetAttachment="bottom left"
      constraints={[
        {
          to: "window",
          attachment: "together",
        },
      ]}
      renderElement={(ref: any) => {
        return (
          isDropDownOpen && (
            <div ref={ref} style={{ zIndex: 10000 }}>
              <div ref={dropDownRef}>
                <CalendarDropDown
                  onDateSelected={handleDateSelected}
                  date={date}
                ></CalendarDropDown>
              </div>
            </div>
          )
        );
      }}
      renderTarget={(ref) => {
        return (
          <StyledDatePicker
            ref={ref}
            className={className}
            onKeyDown={handleKeyDown}
          >
            <StyledInput
              ref={inputRef}
              autoFocus={autoFocus}
              value={inputText || ""}
              placeholder={props.placeholder}
              onChange={handleInputChange}
              disabled={disabled}
              width="50px"
            />

            <StyledButton
              disabled={disabled}
              onClick={() => !disabled && setIsDropDownOpen(!isDropDownOpen)}
            >
              <img src={calendarIcon} width="16px" alt="" />
            </StyledButton>
          </StyledDatePicker>
        );
      }}
    />
  );
}

export default DatePicker;
