import React, { useReducer, useRef, useEffect } from "react";
import styled from "styled-components";
import { FlexRow, FlexColumn } from "../flex";
import moment from "moment";
import "moment/locale/hr";
import { ReactComponent as DownArrowSvg } from "./icons/down-arrow.svg";
import { ReactComponent as UpArrowSvg } from "./icons/up-arrow.svg";
moment.locale("hr");
const dayNames = moment.weekdaysShort();
const months = moment.months();
const weekDaysStripped = dayNames.map((name) => name.substring(0, 2));

//swap first and last day name in the array is we need to start week with monday
weekDaysStripped.push(...weekDaysStripped.splice(0, 1));

const getCalendarPageMatrix = (month: number, year: number) => {
  const monthMatrix = [
    new Array(7),
    new Array(7),
    new Array(7),
    new Array(7),
    new Array(7),
    new Array(7),
  ];
  const startDate = new Date(year, month - 1, 1);

  let startDayOfWeek = startDate.getDay();
  if (startDayOfWeek > 0) {
    startDayOfWeek = startDayOfWeek - 1;
  } else {
    startDayOfWeek = startDayOfWeek + 6;
  }
  let weekIndex = 0;
  let weekDayIndex = 0;

  // there are 42 days in the 6*7 calednar month matrix
  for (let i = 0; i < 42; i++) {
    monthMatrix[weekIndex][weekDayIndex] = moment(startDate)
      .add(i - startDayOfWeek, "day")
      .toDate();

    if (weekDayIndex === 6) {
      weekDayIndex = 0;
      weekIndex++;
    } else {
      weekDayIndex++;
    }
  }
  return monthMatrix as Date[][];
};
const StyledUpArrow = styled(UpArrowSvg)`
  path {
    fill: ${(props) => props.theme.palette.primary140};
  }
`;
const StyledDownArrow = styled(DownArrowSvg)`
  path {
    fill: ${(props) => props.theme.palette.primary140};
  }
`;
type TDayProps = {
  isActiveDay: boolean;
  isCurrent: boolean;
  isSunday: boolean;
  isToday: boolean;
};
const StyledDay = styled.div<TDayProps>`
  flex: 1;
  display: flex;
  cursor: pointer;
  margin: 2px;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 2px;

  box-shadow: ${(props) =>
    props.isActiveDay ? props.theme.borderFocusBoxShadow : "none"};
  font-weight: ${(props) => (props.isSunday ? "bold" : "initial")};
  opacity: ${(props) => (props.isCurrent ? 1 : 0.5)};
  background: ${(props) =>
    props.isToday ? props.theme.palette.primary60 : "transparent"};
  :hover {
    background: ${(props) => props.theme.palette.accent55};
  }
`;
const StyledDropDown = styled.div`
  z-index: 100000;
  height: 100%;
  border: 1px solid ${(props) => props.theme.popUpborderColor};
  box-shadow: ${(props) => props.theme.popUpBoxShadow};
  padding: 3px;
  background: white;
  width: 240px;
  height: 240px;
`;

const StyledDayName = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  opacity: 0.6;
  text-align: center;
`;
const StyledMonthChangeButton = styled.button`
  outline: none;
  border: none;
  margin: 3px;
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 3px;
  cursor: pointer;
  background: none;
  font-size: 1.3rem;
  :hover {
    background: ${(props) => props.theme.buttonHoverBackgroundColor};
  }
`;
const StyledYearMonthName = styled.div`
  flex: 1;
  align-items: baseline;
  display: flex;
  font-size: 1.1rem;
  padding-left: 6px;
`;
const actions = {
  PREVIOUS_MONTH: "PREVIOUS_MONTH",
  NEXT_MONTH: "NEXT_MONTH",
  PREVIOUS_DAY: "PREVIOUS_DAY",
  NEXT_DAY: "NEXT_DAY",
  PREVIOUS_WEEK: "PREVIOUS_WEEK",
  NEXT_WEEK: "NEXT_WEEK",
};
type TState = {
  month: number;
  year: number;
  activeDayIndex: { week: number; day: number };
};
const calendarReducer = (state: TState, action: keyof typeof actions) => {
  const { month, year } = state;
  const { day: activeDay, week: activeWeek } = state.activeDayIndex;

  switch (action) {
    case actions.PREVIOUS_MONTH: {
      return {
        month: state.month > 1 ? state.month - 1 : 12,
        year: state.month > 1 ? state.year : state.year - 1,
        activeDayIndex: { week: 0, day: 0 },
      };
    }
    case actions.NEXT_MONTH: {
      return {
        month: state.month < 12 ? state.month + 1 : 1,
        year: state.month < 12 ? state.year : state.year + 1,
        activeDayIndex: { week: 0, day: 0 },
      };
    }
    case actions.NEXT_DAY: {
      return {
        year:
          activeWeek === 5 && activeDay === 6
            ? month === 12
              ? year + 1
              : year
            : year,
        month:
          activeWeek === 5 && activeDay === 6
            ? month === 12
              ? 1
              : month + 1
            : month,
        activeDayIndex: {
          week:
            activeDay === 6
              ? activeWeek === 5
                ? 0
                : activeWeek + 1
              : activeWeek,
          day: activeDay === 6 ? 0 : activeDay + 1,
        },
      };
    }
    case actions.PREVIOUS_DAY: {
      return {
        month:
          activeWeek === 0 && activeDay === 0
            ? month === 1
              ? 12
              : month - 1
            : month,
        year:
          activeWeek === 0 && activeDay === 0
            ? month === 1
              ? year - 1
              : year
            : year,
        activeDayIndex: {
          week:
            activeDay === 0
              ? activeWeek === 0
                ? 5
                : activeWeek - 1
              : activeWeek,
          day: activeDay === 0 ? 6 : activeDay - 1,
        },
      };
    }
    case actions.PREVIOUS_WEEK: {
      return {
        year: activeWeek === 0 ? (month === 1 ? year - 1 : year) : year,
        month: activeWeek === 0 ? (month === 1 ? 12 : month - 1) : month,
        activeDayIndex: {
          week: activeWeek === 0 ? 5 : activeWeek - 1,
          day: activeDay,
        },
      };
    }
    case actions.NEXT_WEEK: {
      return {
        month: activeWeek === 5 ? (month === 12 ? 1 : month + 1) : month,
        year: activeWeek === 5 ? (month === 12 ? year + 1 : year) : year,
        activeDayIndex: {
          week: activeWeek === 5 ? 0 : activeWeek + 1,
          day: state.activeDayIndex.day,
        },
      };
    }
  }
  return state;
};
export const CalendarDropDown = (props) => {
  const dropDownRef = useRef<HTMLDivElement>();

  const [state, dispatch] = useReducer(calendarReducer, {
    month: parseInt(props.date.slice(5, 7)),
    year: parseInt(props.date.slice(0, 4)),
    activeDayIndex: { week: 0, day: 0 },
  });
  const { month, year } = state;

  const { onDateSelected } = props;
  const matrix = getCalendarPageMatrix(month, year);

  const previouseMonth = () => dispatch("PREVIOUS_MONTH");
  const nextMonth = () => dispatch("NEXT_MONTH");

  useEffect(() => {
    const dropDown = dropDownRef.current;

    if (dropDown) dropDown.focus();
  }, [dropDownRef]);
  const handleKeyDown = (event: React.KeyboardEvent<any>) => {
    event.stopPropagation();
    event.preventDefault();
    switch (event.key) {
      case "ArrowLeft": {
        dispatch("PREVIOUS_DAY");
        break;
      }
      case "ArrowRight": {
        dispatch("NEXT_DAY");
        break;
      }
      case "ArrowDown": {
        dispatch("NEXT_WEEK");
        break;
      }
      case "ArrowUp": {
        dispatch("PREVIOUS_WEEK");
        break;
      }
      case "Enter": {
        onDateSelected &&
          onDateSelected(
            matrix[state.activeDayIndex.week][state.activeDayIndex.day]
          );
      }
    }
  };
  return (
    <StyledDropDown ref={dropDownRef} onKeyDown={handleKeyDown} tabIndex={-1}>
      <FlexColumn style={{ display: "flex", height: "100%" }}>
        <FlexRow>
          <StyledYearMonthName>{`${
            months[month - 1]
          }, ${year}`}</StyledYearMonthName>
          <StyledMonthChangeButton onClick={previouseMonth}>
            <StyledUpArrow style={{ width: "20px", height: "20px" }} />
          </StyledMonthChangeButton>
          <StyledMonthChangeButton onClick={nextMonth}>
            <StyledDownArrow style={{ width: "20px", height: "20px" }} />
          </StyledMonthChangeButton>
        </FlexRow>
        <FlexRow style={{ marginBottom: "3px" }}>
          {weekDaysStripped.map((dn, index) => (
            <StyledDayName key={index}>{dn}</StyledDayName>
          ))}
        </FlexRow>
        {matrix.map((week, index) => (
          <Week
            key={index}
            weekIndex={index}
            days={week}
            month={month}
            year={year}
            onDateSelected={onDateSelected}
            activeDayIndex={state.activeDayIndex}
          />
        ))}
      </FlexColumn>
    </StyledDropDown>
  );
};
type TWeekProps = {
  days: Date[];
  month: number;
  year: number;
  weekIndex: number;
  activeDayIndex: { week: number; day: number };
  onDateSelected?: (date: Date) => any;
};
const Week = (props: TWeekProps) => {
  const today = moment(new Date());
  const {
    weekIndex,
    activeDayIndex,
    month,
    year,
    days,
    onDateSelected,
  } = props;
  const isCurrentMonthDate = (date: Date) => {
    return date.getMonth() === month - 1 && date.getFullYear() === year;
  };
  return (
    <FlexRow style={{ flex: 1 }}>
      {days.map((day, index) => (
        <StyledDay
          onClick={() => onDateSelected && onDateSelected(day)}
          key={`${day.getMonth()}${day.getDate()}`}
          isCurrent={isCurrentMonthDate(day)}
          isSunday={day.getDay() === 0}
          isToday={moment(day).isSame(today, "d")}
          isActiveDay={
            activeDayIndex.week === weekIndex && activeDayIndex.day === index
          }
        >
          {day.getDate()}
        </StyledDay>
      ))}
    </FlexRow>
  );
};
