import { ActivityIndicator, Alert, StatusBar } from "react-native";
import { ButtonNormal } from "../../components/Button/Button";
import { Button, NormalButton } from "../../components/Button/StyleButton";
import { ButtonText } from "../../components/ButtonText/StyleButtonText";
import { Container } from "../../components/Container/StyleContainer";
import { DescriptionPassword } from "../../components/Descriptions/Descriptions";
import { Input } from "../../components/Input/Input";
import { Close, Logo } from "../../components/Images/StyleImages";
import { Title } from "../../components/Title/StyleTitle";
import { useState } from "react";
import api from "../../services/Services";

export const RedefinePassword = ({ navigation, route }) => {
  // const { email } = route.params.emailRecuperacao;

  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function indicator() {
    setLoading(true);
  }

  async function changePassword() {
    if (novaSenha !== confirmarSenha) {

      Alert.alert(
        'Erro ao prosseguir !!',
        'A senha e sua confirmação não são iguais !!!',
        [
          { text: 'Ok'},
        ]
      );

      setLoading(false)
    } 
    else {
      await api
        .put(`/Usuario/AlterarSenha?email=${route.params.emailRecuperacao}`, {
          senhaNova: novaSenha,
        })
        .then(() => {
          navigation.replace("Login");
          setLoading(false)
        })
        .catch((error) => {
          console.log(error);

          Alert.alert(
            'Erro ao prosseguir !!',
            'Por favor preencha o campo !!!',
            [
              { text: 'Ok'},
            ]
          );

          setLoading(false)
          // console.log(
          //   `$/Usuario/AlterarSenha?email=${route.params.emailRecuperacao}`
          // );
        });
    }



  }

  return (
    <Container>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      {/* <Close source={require('../../assets/x-top-screen.png')}/> */}

      <Logo source={require("../../assets/VitalHub_Logo1.png")} />

      <Title>Redefinir Senha</Title>

      <DescriptionPassword description={"Insira e confirme a sua nova senha"} />

      <Input
        placeholder={"Nova Senha"}
        placeholderTextColor={"#49B3BA"}
        secureTextEntry={true}
        fieldValue={novaSenha}
        onChangeText={(x) => setNovaSenha(x)}
      />

      <Input
        placeholder={"Confirmar nova senha"}
        placeholderTextColor={"#49B3BA"}
        secureTextEntry={true}
        fieldValue={confirmarSenha}
        onChangeText={(x) => setConfirmarSenha(x)}
      />

      {/* <ButtonNormal
                onPress={() => changePassword()}
                text={"Confirmar nova senha"}
            /> */}

      <Button
        disabled={loading}
        onPress={() => {
          indicator();
          changePassword();
          novaSenha, confirmarSenha != null
            ? changePassword()
            :  Alert.alert(
              'Erro ao prosseguir !!',
              'Por favor preencha o campo !!!',
              [
                { text: 'Ok'},
              ]
            );
        }}
      >
        {loading ? (
          <ActivityIndicator />
        ) : (
          <ButtonText>Confirmar nova Senha</ButtonText>
        )}
      </Button>
    </Container>
  );
};
