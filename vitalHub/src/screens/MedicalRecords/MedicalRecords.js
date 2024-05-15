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
import api from "../../services/Services"
import { handleCallNotifications } from "../../components/Notifications/Notifications"
import { ButtonText } from "../../components/ButtonText/StyleButtonText"
import { Button } from "../../components/Button/StyleButton"



export const MedicalRecords = ({ navigation, route }) => {

    const [consulta, setConsulta] = useState(null)

    const [editable, setEditable] = useState(true)


    //PROPS PARA MÉTODO DE ATUALIZAR

    const [descricao, setDescricao] = useState('')

    const [diagnostico, setDiagnostico] = useState('')

    const [medicamento, setMedicamento] = useState('')


    async function HandleUpdate() {

        await api.put(`/Consultas/Prontuario`,

            { consultaId: consulta.id, descricao: descricao, diagnostico: diagnostico, medicamento: medicamento }

        ).then(response => {

            console.log('Prontuário atualizado com sucesso !', response);

        }).catch(error => {
            console.log(error)
            setLoading(false)
        })

    }



    useEffect(() => {
        if (route.params) {
            setConsulta(route.params.consulta)
        }
    }, [route])

    return (
        <ScrollContainer>

            {consulta != null ? (

                <>

                    <ImagemPerfilPaciente source={{ uri: consulta.paciente.idNavigation.foto }} />

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
                            fieldValue={descricao}
                            fieldWidth={90}

                            multiline={true}

                            onChangeText={x => setDescricao(x)}
                        />

                        <LargeInputTextBox
                            placeholderTextColor={"#34898F"}
                            textLabel={"Diagnóstico do paciente"}
                            placeholder={consulta.diagnostico}
                            fieldValue={diagnostico}
                            editable={editable}
                            fieldWidth={90}

                            onChangeText={x => setDiagnostico(x)}
                        />

                        <HighInputBox
                            multiline={true}
                            fieldHeight={350}
                            placeholderTextColor={"#34898F"}
                            textLabel={"Prescrição médica"}
                            placeholder={medicamento ? medicamento : 'Prescrição médica'}
                            fieldValue={medicamento}
                            onChangeText={x => setMedicamento(x)}
                            editable={editable}
                            fieldWidth={90}
                        />

                        {/* <ButtonNormal onPress={() => { setEditable(false), HandleUpdate() }}>
                                <ButtonText>Salvar</ButtonText>
                        </ButtonNormal> */}

                        <Button onPress={() => { setEditable(false), HandleUpdate() }}>
                            <ButtonText>Salvar</ButtonText>
                        </Button>

                        {editable == false ?

                            (<BlockedButton onPress={() => { editable == false ? (setEditable(true)) : (setEditable(false)) }}
                                text={"Editar"}
                            />)
                            :
                            <Button onPress={() => { setEditable(false) }}>
                                <ButtonText>Editar</ButtonText>
                            </Button>

                            // <ButtonNormal onPress={() => { setEditable(false) }}
                            //     text={"Editar"}
                            // />

                        }


                        {/* <BlockedButton onPress={() => {setEditable(true ? false : true)}} text={"Editar"} /> */}

                        <RecordsCancelButton onPress={() => {
                            navigation.replace("DoctorMain");
                        }}
                            text={"Cancelar"}
                        />

                    </Container>

                </>

            ) : (
                <ActivityIndicator style={{ marginTop: '100%' }} />
            )}

        </ScrollContainer>

    )
}