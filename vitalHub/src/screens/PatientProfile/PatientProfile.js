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
  const [pacienteData, setPacienteData] = useState("");
  const [response, setResponse] = useState("")
 
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
          setPacienteData = response.data;

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

  async function updatePaciente() {
    try {
      const token1 = await userDecodeToken();
      if (token1 && token1.idUsuario) {
        await api.put(
          `/Pacientes/AtualizarDados?id=${token1.idUsuario}`,
          {
            endereco: {
              logradouro: logradouro,
              cep: cep,
              cidade: cidade,
            },
            dataNascimento: dataNascimento,
            cpf: cpf,
          },
          {
            headers: {
              Authorization: "Bearer " + token1.token, //vai ser trocado pelo token de autenticação
            },
          }
        );
        console.log("Dados do paciente atualizados com sucesso:");

        // setEditable(false);
      } else {
        console.error("Token is not valid or idUsuario is not present.");
      }
    } catch (error) {
      console.error("Erro ao atualizar dados do paciente:", error);
    }
  }

  useEffect(() => {
    profileLoad();
    GetPaciente();
    // console.log(editable);
  }); // Executa a função quando o valor de editable mudar

  setPacienteData(response.data)

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
          onChangeText={(text) => setData(text)}
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
          placeholder={pacienteData.endereco.logradouro}
          editable={editable}
          onChangeText={(text) => setLogradouro(text)}
          fieldWidth={90}
        />

        <ContainerCepCidade>
          <InputBox
            placeholderTextColor={"#A1A1A1"}
            textLabel={"CEP"}
            placeholder={pacienteData.endereco.cep}
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
            placeholder={pacienteData.endereco.cidade}
          />
        </ContainerCepCidade>

        <ButtonLarge
          onPress={() => {
            updatePaciente();
            setEditable(false);
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
