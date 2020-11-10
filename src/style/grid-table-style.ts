import styled from "styled-components";
import DatePicker from "../ui/datePicker";
import { Button } from "../ui/button";

export const Table = styled.div`
  grid-column: 2/6;
  grid-row: 5/10;
`;

export const DateFromPicker = styled(DatePicker)`
  grid-column: 1/2;
`;

export const DateToPicker = styled(DatePicker)`
  grid-column: 3/4;
  margin-left: 8px;
`;

export const SearchButton = styled(Button)`
  grid-column: 5/6;
  display: block;
  padding: 5px 0px;
  margin: 2px;
`;
