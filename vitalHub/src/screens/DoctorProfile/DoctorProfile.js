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
import { Text } from "react-native";

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { ButtonCamera, ImageView } from "./Style";

import { mask, unMask } from "remask";


import { LogBox } from 'react-native';



export const DoctorProfile = ({ navigation, route }) => {


    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message

    const [cep, setCep] = useState("");
    const [logradouro, setLogradouro] = useState("");
    const [cidade, setCidade] = useState("");
    const [crm, setCrm] = useState("");
    const [editable, setEditable] = useState(false);
    const [token, setToken] = useState({});
    const [medicoData, setMedicoData] = useState({});

    const [photo, setPhoto] = useState(null)


    //USEEFFECT PRINCIPAL

    useEffect(() => {
        const fetchData = async () => {
            const userToken = await userDecodeToken();

            if (userToken && userToken.idUsuario) {
                setToken(userToken);
                try {
                    const response = await api.get(
                        `/Medicos/BuscarPorId?id=${userToken.idUsuario}`
                    );
                    const { endereco, crm } = response.data;
                    setMedicoData(response.data);
                    setLogradouro(endereco.logradouro);
                    setPhoto(response.data.idNavigation.foto)
                    setCidade(endereco.cidade);
                    setCrm(crm);
                    // Definir o estado `cep` com o CEP do paciente
                    setCep(endereco.cep);
                } catch (error) {
                    console.error("Erro ao buscar dados do medico:", error);
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

        if (route.params !== null) {
            AlterarFotoPerfil()
        }


    }, [route.params])



    useEffect(() => {

    }, [photo])

    //FUNCAO PARA ALTERAR A IMAGEM DE PERFIL

    async function AlterarFotoPerfil() {

        const userToken = await userDecodeToken();

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
        
        try {

            const userToken = await userDecodeToken();

            await api.put(
                `/Medicos`,
                {

                    id: userToken.idUsuario,
                    logradouro: logradouro,
                    cep: cep,
                    cidade: cidade,
                    crm: crm,
                },
                {
                    headers: {
                        Authorization: "Bearer " + JSON.parse(token.token).token,
                    },
                }
            );

            console.log("Dados do Médico atualizados com sucesso.");
            setEditable(false);
            setLogradouro(logradouro); // Atualize o estado com o novo logradouro
            setCep(unMask(cep)); // Atualize o estado com o novo CEP
            setCidade(cidade); // Atualize o estado com a nova cidade
            console.log(logradouro, cep, cidade);
        } catch (error) {
            console.error("Erro ao atualizar dados do paciente:", error);
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

                    <ButtonCamera onPress={() => { navigation.navigate("DoctorCamera") }}>
                        <MaterialCommunityIcons name="camera-plus" size={20} color={"#fbfbfb"} />
                    </ButtonCamera>
                </ImageView>


                <TitleProfile>{token.name}</TitleProfile>

                <DescriptionPassword description={token.email} />

                <InputBox
                    placeholderTextColor="#A1A1A1"
                    textLabel="CRM"
                    placeholder="CRM..."
                    keyboardType="numeric"
                    maxLength={6}
                    fieldValue={crm}
                    editable={editable}
                    onChangeText={setCrm}
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

export default DoctorProfile;