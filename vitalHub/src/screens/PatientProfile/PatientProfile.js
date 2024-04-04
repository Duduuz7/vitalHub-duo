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
  const [editable, setEditable] = useState(false);

  //Função para o nome do paciente

  async function profileLoad() {
    const token1 = await userDecodeToken();
    if (token1) {
      // console.log(token);
      setToken(token1);
    }
  }

  //Função para chamar os dados do paciente no banco de dados

  async function GetPaciente() {
    try {
      const token1 = await userDecodeToken();
      if (token1 && token1.idUsuario) {
        const response = await api.get(
          `/Pacientes/BuscarPorId?id=${token1.idUsuario}`
        );
        const pacienteData = response.data;

        setLogradouro(pacienteData.endereco.logradouro);
        setCep(pacienteData.endereco.cep);
        setCidade(pacienteData.endereco.cidade);
        setDataNascimento(pacienteData.dataNascimento);
        setCpf(pacienteData.cpf);
      } else {
        console.error("Token is not valid or idUsuario is not present.");
      }
    } catch (error) {
      console.error("Erro ao buscar dados do paciente:", error);
    }
  }

  //Função para atualizar os dados do Paciente
  async function updatePaciente() {
    try {
      const token1 = await userDecodeToken();
      if (token1 && token1.idUsuario) {
        const response = await api.put(`/Pacientes`, {
          id: token1.idUsuario,
          endereco: {
            logradouro: logradouro,
            cep: cep,
            cidade: cidade,
          },
          dataNascimento: dataNascimento,
          cpf: cpf,
        });

        console.log(
          "Dados do paciente atualizados com sucesso:",
          response.data
        );

        setEditable(false);

        // Você pode fazer algo após a atualização, como exibir uma mensagem de sucesso
      } else {
        console.error("Token is not valid or idUsuario is not present.");
      }
    } catch (error) {
      console.error("Erro ao atualizar dados do paciente:", error);
      // Aqui você pode lidar com o erro de atualização, exibindo uma mensagem de erro, por exemplo
    }
  }

  useEffect(() => {
    profileLoad();
    GetPaciente();
    updatePaciente();
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
          editable={editable}
          fieldValue={dataNascimento}
          fieldWidth={90}
        />
        <InputBox
          placeholderTextColor={"#A1A1A1"}
          textLabel={"CPF"}
          placeholder={"CPF..."}
          keyboardType="numeric"
          maxLength={11}
          editable={editable}
          fieldValue={cpf}
          fieldWidth={90}
        />
        <InputBox
          placeholderTextColor={"#A1A1A1"}
          textLabel={"Endereço"}
          placeholder={"Endereço..."}
          editable={editable}
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
            editable={editable}
            fieldWidth={40}
            fieldValue={cep}
          />
          <InputBox
            placeholderTextColor={"#A1A1A1"}
            textLabel={"Cidade"}
            placeholder={"Cidade..."}
            editable={editable}
            fieldWidth={40}
            fieldValue={cidade}
          />
        </ContainerCepCidade>

        <ButtonLarge onPress={updatePaciente} text={"Salvar"} />

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
