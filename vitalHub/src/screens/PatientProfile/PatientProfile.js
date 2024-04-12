import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  Container,
  ContainerCepCidade,
  ScrollContainer,
} from "../../components/Container/StyleContainer";
import { DescriptionPassword } from "../../components/Descriptions/Descriptions";
import {
  DescripritionEmail,
  DescripritionForgot,
} from "../../components/Descriptions/StyledDescriptions";
import { InputBox } from "../../components/InputBox/InputBox";
import { ImagemPerfilPaciente } from "../../components/Images/StyleImages";
import { TitleProfile } from "../../components/Title/StyleTitle";
import { LargeButton, NormalButton } from "../../components/Button/StyleButton";
import { ButtonText } from "../../components/ButtonText/StyleButtonText";

import api from "../../services/Services";
import {
  BlockedSmallButton,
  ButtonLarge,
} from "../../components/Button/Button";
import { userDecodeToken, userLogoutToken } from "../../utils/Auth";

export const PatientProfile = ({ navigation }) => {
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [cidade, setCidade] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [token, setToken] = useState({});
  const [editable, setEditable] = useState(false);
  const [pacienteData, setPacienteData] = useState("");
  const [userId, setUserId] = useState();

  async function profileLoad() {
    const token = await userDecodeToken();
    setToken(token);
    if (token) {
      getPaciente(token.idUsuario);

      setUserId(token.idUsuario);
    }
  }

  async function getPaciente(user) {
    // console.log(`/Pacientes/BuscarPorId?id=${user}`);
    await api
      .get(`/Pacientes/BuscarPorId?id=${user}`)
      .then((response) => {
        setPacienteData(response.data);
        console.log("saasss", response.data);

        setLogradouro(response.data.endereco.logradouro);
        setCep(response.data.endereco.cep);
        setCidade(response.data.endereco.cidade);
        setDataNascimento(response.data.dataNascimento);
        setCpf(response.data.cpf);
      })
      .catch((error) => {
        console.error("Error NESTE AQUI :", error);
      });
  }

  async function updatePaciente() {
    try {
      console.log({
        cpf: cpf,
        dataNascimento: dataNascimento,
        cep: cep,
        logradouro: logradouro,
        cidade: cidade,
      });
      console.log(`/Pacientes/AtualizarDados?id=${userId}`);
      await api.put(`/Pacientes/AtualizarPerfil?id=${userId}`, {
        rg: "string",
        cpf: cpf,
        dataNascimento: dataNascimento,
        numero: 0,
        cep: cep,
        logradouro: logradouro,
        cidade: cidade,
        nome: "string",
        email: "string",
        senha: "string",
        idTipoUsuario: "F5856CC9-9922-433E-8297-C1A788D92D9F",
        foto: "string"
        
      });
      Alert.alert("Success", "Data successfully updated!");
      setEditable(false);
    } catch (error) {
      console.error("Erro ao atualizar paciente:", error);
      Alert.alert("Erro", "Falha ao atualizar os dados.");
    }
  }

  useEffect(() => {
    profileLoad();
  }, []);

  return (
    <ScrollContainer>
      <Container>
        <ImagemPerfilPaciente
          source={require("../../assets/LimaCorinthians.png")}
        />
        <TitleProfile>{token.name}</TitleProfile>
        <DescriptionPassword description={token.email} />
        <InputBox
          placeholderTextColor={"#A1A1A1"}
          textLabel={"Data de nascimento:"}
          placeholder={pacienteData.dataNascimento}
          keyboardType="numeric"
          editable={editable}
          onChangeText={(text) => setDataNascimento(text)}
          fieldWidth={90}
        />
        <InputBox
          placeholderTextColor={"#A1A1A1"}
          textLabel={"CPF"}
          placeholder={pacienteData.cpf}
          keyboardType="numeric"
          maxLength={11}
          editable={editable}
          onChangeText={(text) => setCpf(text)}
          fieldWidth={90}
        />
        <InputBox
          placeholderTextColor={"#A1A1A1"}
          textLabel={"Endereço"}
          placeholder={
            !editable ? logradouro : pacienteData?.endereco?.logradouro
          }
          editable={editable}
          onChangeText={(text) => setLogradouro(text)}
          fieldWidth={90}
        />
        <ContainerCepCidade>
          <InputBox
            placeholderTextColor={"#A1A1A1"}
            textLabel={"CEP"}
            placeholder={!editable ? cep : pacienteData?.endereco?.cep}
            maxLength={8}
            onChangeText={(text) => setCep(text)}
            keyboardType="numeric"
            editable={editable}
            fieldWidth={40}
          />
          <InputBox
            placeholderTextColor={"#A1A1A1"}
            textLabel={"Cidade"}
            editable={editable}
            onChangeText={(text) => setCidade(text)}
            fieldWidth={40}
            placeholder={!editable ? cidade : pacienteData?.endereco?.cidade}
          />
        </ContainerCepCidade>
        <ButtonLarge
          onPress={() => {
            updatePaciente();
          }}
          text={"Salvar"}
        />
        <ButtonLarge
          onPress={() => {
            setEditable(true);
          }}
          text={"Editar"}
        />
        <BlockedSmallButton
          onPress={() => {
            userLogoutToken();
            navigation.replace("Login");
          }}
          text={"Sair do app"}
        />
      </Container>
    </ScrollContainer>
  );
};

export default PatientProfile;
