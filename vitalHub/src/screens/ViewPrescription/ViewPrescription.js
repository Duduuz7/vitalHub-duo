import { useEffect, useState } from "react"
import { SendButton } from "../../components/Button/Button"
import { ButtonSend } from "../../components/Button/StyleButton"
import { BoxAgeEmail, BoxBtn, BoxDescription, BoxViewImageImport, Container, ScrollContainer, ViewImageImport } from "../../components/Container/StyleContainer"
import { CardBackLess, CardCancel, CardCancelLess, DescriptionDoc, DescriptionPassword } from "../../components/Descriptions/Descriptions"
import { ImagePrescription, ImagePrescriptionNull, ViewImage } from "../../components/Images/StyleImages"
import { HighInputBox, HighInputBoxGrey, InputBox, LargeInputTextBox } from "../../components/InputBox/InputBox"
import { Label } from "../../components/Label/Label"
import { TitleProfile } from "../../components/Title/StyleTitle"
import { ImportImages, Line, TitleImage } from "./Style"

import * as MediaLibrary from "expo-media-library"
import { ActivityIndicator } from "react-native"
import api from "../../services/Services"
import { userDecodeToken } from "../../utils/Auth"

// import { useRoute } from '@react-navigation/native';

export const ViewPrescription = ({ navigation, route }) => {

    // const { photoUri } = route.params;
    const [consultaSelecionada, setConsultaSelecionada] = useState(null)
    const [descricaoExame, setDescricaoExame] = useState("")

    async function BuscarExame() {
        await api.get(`/Exames/BuscarPorId?id=${route.params.consulta.id}`)
            .then(response => {

                setDescricaoExame(...descricaoExame, response.data.descricao)

            })
            .catch(error => {
                console.log(error);
            })
    }

    async function BuscarProntuario() {


        await api.get(`/Consultas/BuscarPorId?id=${route.params.consulta.id}`)
            .then(response => {

                setConsultaSelecionada(response.data)

            })
            .catch(error => {
                console.log(error);
            })

    }



    async function InserirExame() {
        try {
            // Criação do FormData e adição dos parâmetros
            const formData = new FormData();
            formData.append('ConsultaId', route.params.idConsulta);
            formData.append('Imagem', {
                uri: route.params.photoUri,
                name: `image.${route.params.photoUri.split('.').pop()}`,
                type: `image/${route.params.photoUri.split('.').pop()}`
            });

            // Chamada para a API para enviar o exame
            const response = await api.post(`/Exame/Cadastrar`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Lógica para lidar com a resposta da API em caso de sucesso
            console.log("Entrou na requisição da OCR");
            console.log(`response`);
            console.log(response.data);


            setDescricaoExame(descricaoExame + "\n" + response.data.descricao);
        } catch (error) {
            // Lógica para lidar com o erro em caso de falha na requisição
            console.log("Entrou no catch da OCR");
            console.log(error);
        }
    }


    useEffect(() => {
        if (consultaSelecionada == null) {
            BuscarProntuario()
        }
    }, [route])

    useEffect(() => {
        if (consultaSelecionada == null) {
            BuscarProntuario();
        }
    }, [consultaSelecionada])

    useEffect(() => {
        if (descricaoExame == null) {
            BuscarExame();
        }
    }, [descricaoExame])




    useEffect(() => {
        if (route.params.photoUri) {
            InserirExame();
            BuscarProntuario();
        }else{
            console.log("é, nn tem msm");
        }
    }, [route])

    return (
        <>
            <ScrollContainer>

                {consultaSelecionada != null ? (

                    <Container>

                        <ViewImage source={{ uri: consultaSelecionada.medicoClinica.medico.idNavigation.foto }} />

                        <TitleProfile>{consultaSelecionada.medicoClinica.medico.idNavigation.nome}</TitleProfile>

                        <BoxDescription>
                            <DescriptionDoc description={consultaSelecionada.medicoClinica.medico.especialidade.especialidade1} />
                            <DescriptionDoc description={`CRM-${consultaSelecionada.medicoClinica.medico.crm}`} />
                        </BoxDescription>

                        <HighInputBoxGrey
                            fieldHeight={350}
                            placeholderTextColor={"#A1A1A1"}
                            textLabel={"Descrição da consulta"}
                            placeholder={"Descrição"}
                            editable={false}
                            fieldWidth={90}
                            multiline={true}


                            fieldValue={consultaSelecionada.descricao}
                        />

                        <InputBox
                            placeholderTextColor={"#A1A1A1"}
                            textLabel={"Diagnóstico do paciente"}
                            placeholder={"Diagnóstico"}
                            editable={false}
                            fieldWidth={90}

                            fieldValue={consultaSelecionada.diagnostico}
                        />

                        <HighInputBoxGrey
                            // fieldHeight={350}
                            placeholderTextColor={"#A1A1A1"}
                            textLabel={"Prescrição médica"}
                            placeholder={"Prescrição"}
                            editable={false}
                            fieldWidth={90}
                            multiline={true}

                            fieldValue={consultaSelecionada.receita.medicamento}
                        />

                        <BoxViewImageImport>

                            <Label textLabel={"Exames médicos"} />

                            <ImportImages>
                                {route.params.photoUri ? <ImagePrescription source={{ uri: route.params.photoUri }} /> : <TitleImage>{"[ ! ] Nenhuma foto informada"}</TitleImage>}
                            </ImportImages>

                        </BoxViewImageImport>

                        <BoxBtn>
                            <SendButton onPress={() => { navigation.navigate("Camera", { id: consultaSelecionada.id }) }} text={"Enviar"} />
                            <CardCancel onPressCancel={() => { navigation.replace("Main") }} text={"Cancelar"} />
                        </BoxBtn>

                        <Line />

                        <HighInputBoxGrey
                            // fieldHeight={350}
                            numberOfLines={5}
                            placeholderTextColor={"#A1A1A1"}
                            placeholder={"Resultado do exame"}
                            editable={false}
                            fieldWidth={90}
                            fieldValue={descricaoExame}
                            multiline={true}
                        />

                        <CardBackLess onPressCancel={() => { navigation.navigate("Main") }} text={"Voltar"} />

                    </Container>

                ) : (
                    <ActivityIndicator style={{ marginTop: '100%' }} />
                )}

            </ScrollContainer>
        </>
    )
}