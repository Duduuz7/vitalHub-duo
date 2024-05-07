import { ActivityIndicator, StatusBar } from "react-native";
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

  // const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)]

  // function focusNextInput( index ){
  //     //Verificar se o index é menor do que a quantidade de campos

  //     if (index < inputs.length - 1) {
  //         inputs[index + 1].current.focus()
  //     }
  // }

  // function focusPrevInput( index ){
  //     if (index > 0) {
  //         inputs[index - 1].current.focus()
  //     }
  // }

  async function validateRecoveryCode() {
    try {
      await api.post(
        `/RecuperarSenha/ValidateRecoveryCode?email=${route.params.emailRecuperacao}&codigo=${code}`
      );

      navigation.navigate("RedefinePassword", {
        emailRecuperacao: route.params.emailRecuperacao,
      });
    } catch (error) {
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

      {/* <BoxNumeric>
                {
                    [0, 1, 2, 3].map((index) => (
                        <NumericInput
                            key={index}

                            ref={inputs[index]}

                            placeholder={"0"}
                            placeholderTextColor={"#34898F"}

                            onChangeText={(x) => {
                                //Verificar se o campo é vazio

                                if (x == "") {

                                    focusPrevInput( index )

                                } else {
                                    //Verificar se o campo foi preenchido

                                    const codigoInformado = [...codigo]
                                    codigoInformado[index] = x

                                    setCodigo(codigoInformado.join)

                                    focusNextInput( index )
                                }

                            }}
                        />
                    ))
                }

            </BoxNumeric> */}

      <CodeInput code={code} setCode={setCode} />

      {/* <ButtonNormal text={"Confirmar"} onPress={() => {validateRecoveryCode(), navigation.navigate("RedefinePassword", email) }} /> */}

      {/* <ButtonNormal text={"Confirmar"} onPress={() =>  validateRecoveryCode() } /> */}

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
