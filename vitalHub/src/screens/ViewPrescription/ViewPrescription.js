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

// import { useRoute } from '@react-navigation/native';

export const ViewPrescription = ({ navigation, route }) => {

    // const { photoUri } = route.params;
    const [consultaSelecionada, setConsultaSelecionada] = useState(null)
    const [descricaoExame, setDescricaoExame] = useState(null)


    async function BuscarProntuario() {
        await api.get(`/Consultas/BuscarPorId?id=${route.params.consulta.id}`)
            .then(response => {

                setConsultaSelecionada(response.data)

                console.log(response.data);

                console.log("IDDDD");

                console.log(consultaSelecionada);

            })
            .catch(error => {
                console.log(error);
            })
    }



    async function InserirExame(){

        const formData = new FormData();

        formData.append('ConsultaId', route.params.idConsulta);
        formData.append('Imagem', {
            uri: route.params.photoUri,
            type: `image.${route.params.photoUri.split('.').pop()}`,
            name: `image/${route.params.photoUri.split('.').pop()}`
        })

        await api.post(`/Exame/Cadastrar`, formData, {
            headers : {
                'Content-Type': 'multipart/form-data'
            }
        }).then( response => {

            console.log("asdasdasdas");
            console.log(response.data);
            setDescricaoExame( response.data.descricao)
            setDescricaoExame( descricaoExame + "\n" + response.data.descricao)
            console.log(descricaoExame);

        }).catch(error => {
            console.log(error);
        })



    }


    useEffect(() => {
        // console.log(photoUri)
        console.log("sada")
        console.log(route.params)
        console.log('SDJAKSD', consultaSelecionada);
        // console.log(`/Consultas/BuscaPorId?id=${route.params.consulta.id}`);
    }, [route])

    useEffect(() => {
        if (consultaSelecionada == null) {
            BuscarProntuario();
        }
    }, [consultaSelecionada])



    useEffect(() => {
        if (route.params.photoUri) {
            InserirExame();
        }
    }, [route.params.photoUri])

    return (
        <>
            <ScrollContainer>

                {consultaSelecionada != null ? (

                    <Container>

                        <ViewImage source={{ uri : consultaSelecionada.medicoClinica.medico.idNavigation.foto}} />

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
                            editable={true}
                            fieldWidth={90}
                            

                            fieldValue={consultaSelecionada.descricao}
                        />

                        <InputBox
                            placeholderTextColor={"#A1A1A1"}
                            textLabel={"Diagnóstico do paciente"}
                            placeholder={"Diagnóstico"}
                            editable={true}
                            fieldWidth={90}

                            fieldValue={consultaSelecionada.diagnostico}
                        />

                        <HighInputBoxGrey
                            // fieldHeight={350}
                            placeholderTextColor={"#A1A1A1"}
                            textLabel={"Prescrição médica"}
                            placeholder={"Prescrição"}
                            editable={true}
                            fieldWidth={90}

                            fieldValue={consultaSelecionada.receita.medicamento}
                        />

                        <BoxViewImageImport>

                            <Label textLabel={"Exames médicos"} />

                            <ImportImages>
                                {route.params.photoUri ? <ImagePrescription source={{ uri: route.params.photoUri }} /> : <TitleImage>{"[ ! ] Nenhuma foto informada"}</TitleImage>}
                            </ImportImages>

                        </BoxViewImageImport>

                        <BoxBtn>
                            <SendButton onPress={() => { navigation.navigate("Camera", {id : route.params.consulta.id}) }} text={"Enviar"} />
                            <CardCancel onPressCancel={() => { navigation.replace("Main") }} text={"Cancelar"} />
                        </BoxBtn>

                        <Line />

                        <HighInputBoxGrey
                            // fieldHeight={350}
                            placeholderTextColor={"#A1A1A1"}
                            placeholder={"Resultado do exame"}
                            editable={true}
                            fieldWidth={90}
                            fieldValue={descricaoExame}
                        />

                        <CardBackLess onPressCancel={() => { navigation.navigate("PatientConsultation") }} text={"Voltar"} />

                    </Container>

                ) : (
                    <ActivityIndicator style={{marginTop: '100%'}} />
                )}

            </ScrollContainer>
        </>
    )
}