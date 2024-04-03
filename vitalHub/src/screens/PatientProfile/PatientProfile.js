import { useEffect, useState } from "react";
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

  async function profileLoad() {
    const token = await userDecodeToken();

    if (token) {
      console.log(token);
      setToken(token);

      GetPaciente();
    }
  }

  async function GetPaciente() {
    try {
      console.log(token);
      console.log(`/Pacientes/BuscarPorId?id=${token.idUsuario}`);
      const response = await api.get(
        `/Pacientes/BuscarPorId?id=${token.idUsuario}`
      );

      const pacienteData = response.data;

      setLogradouro(pacienteData.logradouro);
      setCep(pacienteData.cep);
      setCidade(pacienteData.cidade);
      setDataNascimento(pacienteData.dataNascimento);
      setCpf(pacienteData.cpf);
    } catch (error) {
      console.error("Erro ao buscar dados do paciente:", error);
    }
  }

  //Função para atualizar os dados do Paciente
  //   async function handleUpdatePatient() {
  //     const data = {
  //       logradouro,
  //       cep,
  //       cidade,
  //       dataNascimento,
  //       cpf,
  //     };

  //     try {
  //       await api.put(`Pacientes/AtualizaDados/${token.id}`, data);

  //       alert("Os dados foram alterados com sucesso!");
  //     } catch (err) {
  //       alert("Ocorreu um erro na alteração dos dados.");
  //       } finally {
  //         history.push("/meus-dados");
  //       }
  //   }

  useEffect(() => {
    profileLoad();
    GetPaciente();
    // handleUpdatePatient();
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
          placeholder={"Ex. 04/05/1999"}
          keyboardType="numeric"
          editable={true}
          fieldWidth={90}
        />
        <InputBox
          placeholderTextColor={"#A1A1A1"}
          textLabel={"CPF"}
          placeholder={"CPF..."}
          keyboardType="numeric"
          maxLength={11}
          editable={true}
          fieldWidth={90}
        />
        <InputBox
          placeholderTextColor={"#A1A1A1"}
          textLabel={"Endereço"}
          placeholder={"Endereço..."}
          editable={false}
          fieldValue={logradouro}
          fieldWidth={90}
        />

        <ContainerCepCidade>
          <InputBox
            placeholderTextColor={"#A1A1A1"}
            textLabel={"CEP"}
            placeholder={"CEP..."}
            maxLength={8}
            onChangeText={(text) => setCep(text)}
            keyboardType="numeric"
            editable={true}
            fieldWidth={40}
            fieldValue={cep}
          />
          <InputBox
            placeholderTextColor={"#A1A1A1"}
            textLabel={"Cidade"}
            placeholder={"Cidade..."}
            editable={false}
            fieldWidth={40}
            fieldValue={cidade}
          />
        </ContainerCepCidade>

        <ButtonLarge text={"Salvar"} />

        <ButtonLarge text={"Editar"} />

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
