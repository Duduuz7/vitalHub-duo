import styled, { css } from "styled-components";

export const CardContainer = styled.TouchableOpacity`
  /* box-shadow: 0px 0px 1px black; */
  elevation: 4; 
  margin-top: 12px;
  margin-bottom: 5px;
  align-self: center;
  align-items: center;
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
  width: 90%;
  height: 105px;
  flex-direction: row;

  ${props => props.selecionada && css`
    border: 2px solid #49B3BA;
  `}

`;

export const CardContainerClinic = styled(CardContainer)`
  height: 85px;
  ${props => props.selecionada && css`
    border: 2px solid #49B3BA;
  `}
`;

export const AgeCard = styled.SafeAreaView`
  margin-bottom: 0px;
  margin-left: 14px;
  margin-right: 0px;
  padding-left: 10px;
  flex-direction: row;
  width: 250px;
  height: 30px;
  border-radius: 5px;
  align-items: center;
  justify-content: flex-start;
  gap: 2px;
`;


export const BoxRate = styled.SafeAreaView`
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  margin-left: 65px;
  height: 22px;
  width: 45px;
`;

// export const CardSelectDoctorContainer = styled(CardContainer)`

// `
