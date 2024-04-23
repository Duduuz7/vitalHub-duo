import React, { useEffect, useState } from "react";
import {
  Container,
  ContainerCepCidade,
  ScrollContainer,
} from "../../components/Container/StyleContainer";
import { DescriptionPassword } from "../../components/Descriptions/Descriptions";
import { InputBox } from "../../components/InputBox/InputBox";
import { ImagemPerfilPaciente } from "../../components/Images/StyleImages";
import { TitleProfile } from "../../components/Title/StyleTitle";
import {
  ButtonLarge,
  BlockedSmallButton,
} from "../../components/Button/Button";
import { userDecodeToken, userLogoutToken } from "../../utils/Auth";
import api from "../../services/Services";
import moment from "moment/moment";
import { Text } from "react-native";

export const DoctorProfile = ({ navigation }) => {
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [cidade, setCidade] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [editable, setEditable] = useState(false);
  const [token, setToken] = useState({});
  const [pacienteData, setPacienteData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const userToken = await userDecodeToken();
      if (userToken && userToken.idUsuario) {
        setToken(userToken);
        try {
          const response = await api.get(
            `/Pacientes/BuscarPorId?id=${userToken.idUsuario}`
          );
          const { endereco, dataNascimento, cpf } = response.data;
          setPacienteData(response.data);
          setLogradouro(endereco.logradouro);
          setCidade(endereco.cidade);
          setDataNascimento(dataNascimento);
          setCpf(cpf);
          // Definir o estado `cep` com o CEP do paciente
          setCep(endereco.cep);
          console.log(endereco);
        } catch (error) {
          console.error("Erro ao buscar dados do paciente:", error);
        }
      } else {
        console.error("Token is not valid or idUsuario is not present.");
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    userLogoutToken();
    navigation.replace("Login");
  };

  const handleCepChange = async (newCep) => {
    setCep(newCep);
    if (newCep.length === 8) {
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${newCep}/json/`
        );
        const data = await response.json();
        if (!data.erro) {
          setLogradouro(data.logradouro);
          setCidade(data.localidade);
        } else {
          console.error("CEP não encontrado");
        }
      } catch (error) {
        console.error("Erro ao consultar ViaCEP:", error);
      }
    }
  };

  const handleSave = async () => {
    try {
      await api.put(
        `/Pacientes?idUsuario=${token.idUsuario}`,
        {
          logradouro: logradouro,
          cep: cep,
          cidade: cidade,
          dataNascimento: dataNascimento,
          cpf: cpf,
        },
        {
          headers: {
            Authorization: "Bearer " + JSON.parse(token.token).token,
          },
        }
      );

      console.log("Dados do paciente atualizados com sucesso.");
      setEditable(false);
      setLogradouro(logradouro); // Atualize o estado com o novo logradouro
      setCep(cep); // Atualize o estado com o novo CEP
      setCidade(cidade); // Atualize o estado com a nova cidade
      console.log(logradouro, cep, cidade);
    } catch (error) {
      console.error("Erro ao atualizar dados do paciente:", error);
    }
  };

  return (
    <ScrollContainer>
      <Container>
        <ImagemPerfilPaciente
          source={require("../../assets/LimaCorinthians.png")}
        />
        <TitleProfile>{token.name}</TitleProfile>
        <DescriptionPassword description={token.email} />

        <InputBox
          placeholderTextColor="#A1A1A1"
          textLabel="Data de nascimento:"
          placeholder="Ex. 04/05/1999"
          keyboardType="numeric"
          fieldValue={moment(dataNascimento).format("DD/MM/YYYY")}
          editable={editable}
          onChangeText={setDataNascimento}
          fieldWidth={90}
        />
        <InputBox
          placeholderTextColor="#A1A1A1"
          textLabel="CPF"
          placeholder="CPF..."
          keyboardType="numeric"
          maxLength={11}
          fieldValue={cpf}
          editable={editable}
          onChangeText={setCpf}
          fieldWidth={90}
        />
        <InputBox
          placeholderTextColor="#A1A1A1"
          textLabel="Endereço"
          placeholder="Endereço..."
          editable={false}
          fieldValue={logradouro}
          fieldWidth={90}
        />

        {/* <Text>{cep}</Text>
        <Text>{cidade}</Text>
        <Text>{logradouro}</Text> */}

        <ContainerCepCidade>
          <InputBox
            placeholderTextColor="#A1A1A1"
            textLabel="CEP"
            placeholder="CEP..."
            maxLength={8}
            keyboardType="numeric"
            fieldValue={cep} // Exibir o CEP cadastrado
            editable={editable}
            onChangeText={handleCepChange}
            fieldWidth={40}
          />
          <InputBox
            placeholderTextColor="#A1A1A1"
            textLabel="Cidade"
            placeholder="Cidade..."
            editable={false}
            fieldValue={cidade}
            fieldWidth={40}
          />
        </ContainerCepCidade>

        {editable ? (
          <ButtonLarge text="Salvar" onPress={handleSave} />
        ) : (
          <ButtonLarge text="Editar" onPress={() => setEditable(true)} />
        )}

        <BlockedSmallButton onPress={handleLogout} text="Sair do app" />
      </Container>
    </ScrollContainer>
  );
};

export default DoctorProfile;