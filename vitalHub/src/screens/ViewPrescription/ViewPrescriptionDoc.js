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
import moment from "moment"

// import { useRoute } from '@react-navigation/native';

export const ViewPrescriptionDoc = ({ navigation, route }) => {

    // const { photoUri } = route.params;
    const [consultaSelecionada, setConsultaSelecionada] = useState(null)


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


    useEffect(() => {
        // console.log(photoUri)
        console.log("sada")
        console.log(route.params)
        console.log('SDJAKSD', consultaSelecionada);
    }, [route])

    useEffect(() => {
        if (consultaSelecionada == null) {
            BuscarProntuario();
        }
    }, [consultaSelecionada])

    return (
        <>
            <ScrollContainer>

                {consultaSelecionada != null ? (

                    <Container>

                        <ViewImage source={{ uri : consultaSelecionada.paciente.idNavigation.foto}} />

                        <TitleProfile>{consultaSelecionada.paciente.idNavigation.nome}</TitleProfile>

                        <BoxDescription>
                            <DescriptionDoc description={
                                  `${moment().year() - moment(consultaSelecionada.paciente.dataNascimento).format("YYYY")} anos`
                                } />
                            <DescriptionDoc description={consultaSelecionada.paciente.idNavigation.email} />
                        </BoxDescription>

                        <HighInputBoxGrey
                            fieldHeight={350}
                            placeholderTextColor={"#A1A1A1"}
                            textLabel={"Descrição da consulta"}
                            placeholder={"Descrição"}
                            editable={false}
                            fieldWidth={90}
                            

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

                            fieldValue={consultaSelecionada.receita.medicamento}
                        />
{/* 
                        <BoxViewImageImport>

                            <Label textLabel={"Exames médicos"} />

                            <ImportImages>
                                {route.params.photoUri ? <ImagePrescription source={{ uri: route.params.photoUri }} /> : <TitleImage>{"[ ! ] Nenhuma foto informada"}</TitleImage>}
                            </ImportImages>

                        </BoxViewImageImport>

                        <BoxBtn>
                            <SendButton onPress={() => { navigation.navigate("Camera") }} text={"Enviar"} />
                            <CardCancel onPressCancel={() => { navigation.replace("Main") }} text={"Cancelar"} />
                        </BoxBtn>

                        <Line /> */}

                        {/* <HighInputBoxGrey
                            // fieldHeight={350}
                            placeholderTextColor={"#A1A1A1"}
                            placeholder={"Resultado do exame"}
                            editable={true}
                            fieldWidth={90}
                        /> */}

                        <CardBackLess onPressCancel={() => { navigation.replace("DoctorMain") }} text={"Voltar"} />

                    </Container>

                ) : (
                    <ActivityIndicator style={{marginTop: '100%'}} />
                )}

            </ScrollContainer>
        </>
    )
}