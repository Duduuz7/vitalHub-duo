import { BlockedButton, ButtonNormal } from "../../components/Button/Button"
import { BoxAgeEmail, Container, ScrollContainer } from "../../components/Container/StyleContainer"
import { DescriptionPassword, RecordsCancelButton } from "../../components/Descriptions/Descriptions"
import { CancelButtonRecords } from "../../components/Descriptions/StyledDescriptions"
import { HighInputBox, LargeInputTextBox } from "../../components/InputBox/InputBox"
import { ImagemPerfilPaciente } from "../../components/Images/StyleImages"
import { TitleProfile } from "../../components/Title/StyleTitle"
import { useEffect, useState } from "react"
import moment from "moment"



export const MedicalRecords = ({ navigation, route }) => {

    const [consulta, setConsulta] = useState([])

    useEffect(() => {
        setConsulta(route.params)
    }, [route.params])

    useEffect(() => {
        console.log(route);
    }, [route.params])

    return (
        <ScrollContainer>

            {
                consulta != null && (

                    <>

                        <ImagemPerfilPaciente source={require('../../assets/ney.webp')} />

                        <Container>


                            <TitleProfile>
                                {consulta.route.paciente.idNavigation.nome}
                            </TitleProfile>

                            <BoxAgeEmail>

                                <DescriptionPassword
                                    description={
                                        `${moment().year() - moment(consulta.route.paciente.dataNascimento).format("YYYY")} anos`
                                    }
                                />
                                <DescriptionPassword description={consulta.route.paciente.idNavigation.email} />

                            </BoxAgeEmail>



                            <HighInputBox
                                fieldHeight={350}
                                placeholderTextColor={"#34898F"}
                                textLabel={"Descrição da consulta"}
                                placeholder={"Descrição"}
                                editable={true}
                                fieldWidth={90}
                            />

                            <LargeInputTextBox
                                placeholderTextColor={"#34898F"}
                                textLabel={"Diagnóstico do paciente"}
                                placeholder={"Diagnóstico"}
                                editable={true}
                                fieldWidth={90}
                            />

                            <HighInputBox
                                fieldHeight={350}
                                placeholderTextColor={"#34898F"}
                                textLabel={"Prescrição médica"}
                                placeholder={"Prescriçao médica"}
                                editable={true}
                                fieldWidth={90}
                            />

                            <ButtonNormal text={"Salvar"} />

                            <BlockedButton text={"Editar"} />

                            <RecordsCancelButton onPress={() => {
                                navigation.replace("DoctorMain");
                            }}
                                text={"Cancelar"}
                            />

                        </Container>

                    </>

                )}
        </ScrollContainer>

    )
}