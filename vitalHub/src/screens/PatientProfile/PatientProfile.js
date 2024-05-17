import React, { useEffect, useState } from "react";
import {
  Container,
  ContainerCepCidade,
  ScrollContainer,
} from "../../components/Container/StyleContainer";
import { DescriptionPassword } from "../../components/Descriptions/Descriptions";
import { InputBox, InputBoxB } from "../../components/InputBox/InputBox";
import { ImagemPerfilPaciente } from "../../components/Images/StyleImages";
import { TitleProfile } from "../../components/Title/StyleTitle";
import {
  ButtonLarge,
  BlockedSmallButton,
} from "../../components/Button/Button";
import { userDecodeToken, userLogoutToken } from "../../utils/Auth";
import api from "../../services/Services";
import moment from "moment/moment";
import { Alert, Text, View } from "react-native";

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { ButtonCamera, ImageView } from "./Style";

import { mask, unMask } from "remask";

import { LogBox } from 'react-native';



export const PatientProfile = ({ navigation, route }) => {

  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message

  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [cidade, setCidade] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [editable, setEditable] = useState(true);
  const [token, setToken] = useState({});
  const [pacienteData, setPacienteData] = useState({});


  const [photo, setPhoto] = useState(null)


  //USEEFFECT PRINCIPAL

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

          console.log("Azulllll");

          setPhoto(response.data.idNavigation.foto)

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

  //USEEFFECT FOTO DE PERFIL

  useEffect(() => {

    console.log(route);

    if (route.params != null) {
      console.log(route.params);
      AlterarFotoPerfil()
    }


  }, [route.params])

  useEffect(() => {
  }, [photo])

  //FUNCAO PARA ALTERAR A IMAGEM DE PERFIL

  async function AlterarFotoPerfil() {

    const userToken = await userDecodeToken();

    console.log("asasasasasasas", route.params);
    console.log(`/Usuario/AlterarFotoPerfil?id=${userToken.idUsuario}`);

    const formData = new FormData();

    formData.append('Arquivo', {
      uri: route.params.photoUri,
      name: `image.${route.params.photoUri.split(".")[1]}`,
      type: `image/${route.params.photoUri.split(".")[1]}`
    });


    await api.put(`/Usuario/AlterarFotoPerfil?id=${userToken.idUsuario}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }

    }).then(response => {
      console.log(response);
      setPhoto(route.params.photoUri)
    }).catch(error => {
      console.log(error);
    })
  }


  const handleLogout = () => {
    userLogoutToken();
    navigation.replace("Login");
  };

  const handleCepChange = async (newCep) => {

    setCep(unMask(newCep));

    if (newCep.length === 9) {
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

    if (cpf.length == 14) {

      if (cep.length == 8) {

        try {

          await api.put(
            `/Pacientes?idUsuario=${token.idUsuario}`,
            {
              logradouro: logradouro,
              cep: unMask(cep),
              cidade: cidade,
              dataNascimento: dataNascimento,
              cpf: unMask(cpf),
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
          console.error("Erro ao atualizar paciente:", error);

          Alert.alert(
            'Erro ao prosseguir !!',
            'Erro ao atualizar os dados !!!',
            [
              { text: 'Ok' },
            ]
          );
        }

      }
      else {
        Alert.alert(
          'Erro ao atualizar !!',
          'O CEP precisa ter 9 digitos !!!',
          [
            { text: 'Ok' },
          ]
        );
      }

    } else {

      Alert.alert(
        'Erro ao atualizar !!',
        'O CPF precisa ter 11 digitos !!!',
        [
          { text: 'Ok' },
        ]
      );
    }

  };

  return (
    <ScrollContainer>
      <Container>

        <ImageView>

          <ImagemPerfilPaciente
            // source={require("../../assets/LimaCorinthians.png")}
            source={{ uri: photo }}
          />

          <ButtonCamera onPress={() => { navigation.navigate("PatientCamera") }}>
            <MaterialCommunityIcons name="camera-plus" size={20} color={"#fbfbfb"} />
          </ButtonCamera>
        </ImageView>

        <TitleProfile>{token.name}</TitleProfile>
        <DescriptionPassword description={token.email} />
        <InputBox
          placeholderTextColor="#A1A1A1"
          textLabel="Data de nascimento:"
          placeholder="Ex. 04/05/1999"
          // keyboardType="numeric"
          fieldValue={moment(dataNascimento).format("DD/MM/YYYY")}
          // fieldValue={dataNascimento}
          editable={false}
          onChangeText={setDataNascimento}
          fieldWidth={90}
        />
        <InputBox
          placeholderTextColor="#A1A1A1"
          textLabel="CPF"
          placeholder="CPF..."
          keyboardType="numeric"
          maxLength={14}
          // fieldValue={cpf ? `${cpf.slice(0,3)}.${cpf.slice(3,6)}.${cpf.slice(6,9)}` : ""}
          fieldValue={mask(cpf, "999.999.999-99")}
          editable={editable}
          onChangeText={setCpf}
          fieldWidth={90}
        />

        <ContainerCepCidade>
          <InputBox
            placeholderTextColor="#A1A1A1"
            textLabel="CEP"
            placeholder="CEP..."
            maxLength={9}
            keyboardType="numeric"
            fieldValue={mask(cep, "99999-999")} // Exibir o CEP cadastrado
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

        <InputBoxB
          placeholderTextColor="#A1A1A1"
          textLabel="Endereço"
          placeholder="Endereço..."
          editable={false}
          fieldValue={logradouro}
          fieldWidth={90}
        />




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

export default PatientProfile;