import styled from "styled-components";


export const ButtonCamera = styled.TouchableOpacity.attrs({
    activeOpacity : 0.8
})`
    padding: 12px;
    border-radius: 10px;
    border: 1px solid #fbfbfb;
    background-color:#496bba;

    position: absolute;
    bottom: -15px;
    right: 15px;
`;

export const ImageView = styled.SafeAreaView`
    width: 100%;
    height: 310px;
    margin-bottom: 15px;
`
