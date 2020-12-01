import styled from "styled-components";

export const StyledPage = styled.div`
  display: flex;
  overflow: hidden;
  flex-direction: column;
  width: 21cm;
  height: 29.7cm;
  page-break-after: always;
`;

export const StyledSectionTitle = styled.div`
  background: #76933c;
  color: #f5f5f5;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  padding: 3px;
  margin-top: 24px;
`;

export const StyledTitleCard = styled(StyledSectionTitle)`
  background: #808080;
  font-size: 12px;
  text-align: left;
  margin-top: 12px;
`;

export const StyledTextValue = styled.div`
  text-align: center;
`;

export const StyledHeaderContainer = styled.div`
  display: flex;
`;

export const StyledTitleText = styled.h2`
  padding-left: 20px;
  line-height: 2.5;
  text-align: center;
  color: green;
`;

export const StyledGridContainer = styled.div`
  display: grid;

  grid-template-columns: repeat(4, 5cm);
  grid-column-gap: 10px;
  font-size: 14px;
  margin-top: 12px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
`;

export const StyledGridContainerTop = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 5cm);
  grid-column-gap: 10px;
  font-size: 14px;
  margin-top: 12px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
`;

export const StyledOrderdListContainer = styled.div`
  display: grid;
  grid-template-columns: 0.01fr 1fr;
  grid-column-gap: 1px;
  font-size: 11px;
  margin-top: 4px;
`;

export const StyledSignaturesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 12px;
  font-size: 11px;
  margin-top: 4px;
`;

export const StyledBenefitGridContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
`;

export const StyledBenefitItems = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 5cm);
  margin-bottom: 1px;
`;

export const StyledFinePrint = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  margin-top: 5px;
`;

export const StyledTableContainer = styled(StyledFinePrint)`
  justify-content: space-evenly;
`;

export const StyledSignatureBox = styled.div`
  height: 1.5cm;
  width: 8cm;
  border: 1px solid #000;
  margin-top: 5px;
`;

export const StyledRequiredMedicalsBox = styled.div`
  height: 5cm;
  width: 100%;
  border: 1px solid #000;
  margin-top: 5px;
`;

export const StyledPlainTextContainer = styled.div`
  font-size: 12px;
`;
