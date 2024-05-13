import { ActivityIndicator, Alert, StatusBar } from "react-native";
import { ButtonNormal } from "../../components/Button/Button";
import {
  BoxNumeric,
  Container,
} from "../../components/Container/StyleContainer";
import {
  CodeResend,
  EmailDescription,
} from "../../components/Descriptions/Descriptions";
import { NumericInput } from "../../components/Input/Input";
import { Close, Logo } from "../../components/Images/StyleImages";
import { Title } from "../../components/Title/StyleTitle";
import CodeInput from "../../components/CodeInput/CodeInput";
import { useState, useRef } from "react";
import api from "../../services/Services";
import { Button } from "../../components/Button/StyleButton";
import { ButtonText } from "../../components/ButtonText/StyleButtonText";

export const CheckEmail = ({ navigation, route }) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  async function indicator() {
    setLoading(true);
  }

  async function validateRecoveryCode() {
    try {
      await api.post(
        `/RecuperarSenha/ValidateRecoveryCode?email=${route.params.emailRecuperacao}&codigo=${code}`
      );

      navigation.navigate("RedefinePassword", {
        emailRecuperacao: route.params.emailRecuperacao,
      });
      setLoading(false)
    } catch (error) {

      Alert.alert(
        'Erro ao prosseguir !!',
        'Código incorreto !!!',
        [
          { text: 'Ok'},
        ]
      );

      setLoading(false)
      console.log(error, email);
    }
  }

  async function resendCode() {
    try {
      await api.post(`/RecuperarSenha?email=${route.params.emailRecuperacao}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      {/* <Close source={require('../../assets/x-top-screen.png')} /> */}

      <Logo source={require("../../assets/VitalHub_Logo1.png")} />

      <Title>Verifique seu e-mail</Title>

      <EmailDescription email={route.params.emailRecuperacao} />

      <CodeInput value={code} setValue={setCode} />


      <Button
        disabled={loading}
        onPress={() => {
          indicator();
          validateRecoveryCode();
        }}
      >
        {loading ? <ActivityIndicator /> : <ButtonText>Confirmar</ButtonText>}
      </Button>

      <CodeResend onPress={() => resendCode()} text={"Reenviar Código"} />
      
    </Container>
  );
};
