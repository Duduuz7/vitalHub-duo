import { BlockedButton, ButtonNormal } from "../../components/Button/Button"
import { BoxAgeEmail, Container, ScrollContainer } from "../../components/Container/StyleContainer"
import { DescriptionPassword, RecordsCancelButton } from "../../components/Descriptions/Descriptions"
import { CancelButtonRecords } from "../../components/Descriptions/StyledDescriptions"
import { HighInputBox, LargeInputTextBox } from "../../components/InputBox/InputBox"
import { ImagemPerfilPaciente } from "../../components/Images/StyleImages"
import { TitleProfile } from "../../components/Title/StyleTitle"
import { useEffect, useState } from "react"
import moment from "moment"
import { ActivityIndicator } from "react-native"



export const MedicalRecords = ({ navigation, route }) => {

    const [consulta, setConsulta] = useState(null)

    const [editable, setEditable] = useState(false)

    useEffect(() => {
        if (route.params) {
            setConsulta(route.params.consulta)
        }
    }, [route])

    return (
        <ScrollContainer>

                {consulta != null ? (

                    <>

                        <ImagemPerfilPaciente source={require('../../assets/ney.webp')} />

                        <Container>


                            <TitleProfile>
                                {consulta.paciente.idNavigation.nome}
                            </TitleProfile>

                            <BoxAgeEmail>

                                <DescriptionPassword
                                    description={
                                        `${moment().year() - moment(consulta.paciente.dataNascimento).format("YYYY")} anos`
                                    }
                                />
                                <DescriptionPassword description={consulta.paciente.idNavigation.email} />

                            </BoxAgeEmail>



                            <HighInputBox
                                fieldHeight={350}
                                placeholderTextColor={"#34898F"}
                                textLabel={"Descrição da consulta"}
                                placeholder={consulta.descricao}
                                editable={editable}
                                fieldWidth={90}
                            />

                            <LargeInputTextBox
                                placeholderTextColor={"#34898F"}
                                textLabel={"Diagnóstico do paciente"}
                                placeholder={consulta.diagnostico}
                                editable={editable}
                                fieldWidth={90}
                            />

                            <HighInputBox
                                fieldHeight={350}
                                placeholderTextColor={"#34898F"}
                                textLabel={"Prescrição médica"}
                                placeholder={"Prescriçao médica"}
                                editable={editable}
                                fieldWidth={90}
                            />

                            <ButtonNormal onPress={() => {setEditable(false)}} text={"Salvar"} />

                            <BlockedButton onPress={() => {setEditable(true ? false : true)}} text={"Editar"} />

                            <RecordsCancelButton onPress={() => {
                                navigation.replace("DoctorMain");
                            }}
                                text={"Cancelar"}
                            />

                        </Container>

                    </>
                    
                    ) : (
                        <ActivityIndicator style={{marginTop: '100%'}} />
                    )}

        </ScrollContainer>

    )
}