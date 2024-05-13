import { ActivityIndicator, Alert, StatusBar } from "react-native";
import { ButtonNormal } from "../../components/Button/Button";
import { Container } from "../../components/Container/StyleContainer";
import { DescriptionPassword } from "../../components/Descriptions/Descriptions";
import { Input } from "../../components/Input/Input";
import { Logo, Seta } from "../../components/Images/StyleImages";
import { Title } from "../../components/Title/StyleTitle";
import { useState } from "react";
import api from "../../services/Services";
import { Button } from "../../components/Button/StyleButton";
import { ButtonText } from "../../components/ButtonText/StyleButtonText";

export const ForgotPassword = ({ navigation }) => {
  
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function indicator() {
    setLoading(true);
  }

  async function sendEmail() {
    try {
      await api.post(`/RecuperarSenha?email=${email}`);
      navigation.navigate("CheckEmail", { emailRecuperacao: email });
      setLoading(false)
    } catch (error) {
      console.log(error);
    
      Alert.alert(
        'Erro ao prosseguir !!',
        'Preencha o campo de email com o seu email para prosseguir !!!',
        [
          { text: 'Ok'},
        ]
      );

      setLoading(false);
    }
  }

  return (
    <Container>
      {/* <Seta source={require('../../assets/Seta.png')} /> */}

      <Logo source={require("../../assets/VitalHub_Logo1.png")} />

      <Title>Recuperar senha</Title>

      <DescriptionPassword
        description={
          "Digite abaixo seu email cadastrado que enviaremos um link para recuperação de senha"
        }
      />

      <Input
        placeholder={"E-mail"}
        fieldValue={email}
        onChangeText={(x) => {
          setEmail(x);
        }}
        placeholderTextColor={"#49B3BA"}
      />

      {/* <ButtonNormal text={"Continuar"} onPress={() => {sendEmail(), navigation.navigate('CheckEmail', {emailRecuperacao : email})}} /> */}

      <Button
        disabled={loading}
        onPress={() => {
          indicator();
          email != null
            ? sendEmail()
            : Alert.alert(
              'Erro ao prosseguir !!',
              'Preencha o campo de email !!!',
              [
                { text: 'Ok'},
              ]
            );
        //   navigation.navigate("CheckEmail", { emailRecuperacao: email });
        }}
      >
        {loading ? <ActivityIndicator /> : <ButtonText>Continuar</ButtonText>}
      </Button>
    </Container>
  );
};
