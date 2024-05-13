import { Alert, StatusBar } from "react-native"
import { BoxInputSelectLabel, Container } from "../../components/Container/StyleContainer"
import { TitleSelect } from "../../components/Title/StyleTitle"
import CalendarComponent from "../../components/CalendarComponent/CalendarComponent"
import { InputSelect } from "../../components/Input/Input"
import { Label, LabelSelect } from "../../components/Label/Label"
import { ButtonLarge, ButtonNormal } from "../../components/Button/Button"
import { CardCancelLess } from "../../components/Descriptions/Descriptions"
import { BoxButtons } from "../../components/Button/StyleButton"
import { useEffect, useState } from "react"
import { ConfirmAppointmentModal } from "../../components/ConfirmAppointmentModal/ConfirmAppointmentModal"


export const SelectDate = ({ navigation, route }) => {

    const [showModal, setShowModal] = useState(false);

    const [agendamento, setAgendamento] = useState(
        {
            dataSelecionada : ""
        }
    )

    const [dataSelecionada, setDataSelecionada] = useState("")

    const [horaSelecionada, setHoraSelecionada] = useState("")

    function handleContinue() {

        setAgendamento({
            ...route.params.agendamento,

            dataConsulta: `${dataSelecionada} ${horaSelecionada}`,
        });

        setShowModal(true)
    }

    useEffect(() => {
        console.log(route);
    }, [route]);

    useEffect(() => {
        console.log(dataSelecionada);
    }, [dataSelecionada]);


    return (

        <Container>

            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

            <TitleSelect>Selecionar Data</TitleSelect>

            <CalendarComponent
                setDataSelecionada={setDataSelecionada}
                dataSelecionada={dataSelecionada}
            />

            <BoxInputSelectLabel>

                <LabelSelect textLabel={'Selecione um horário disponível'} />

                <InputSelect
                    setHoraSelecionada={setHoraSelecionada}
                />

            </BoxInputSelectLabel>


            <BoxButtons>
                <ButtonLarge onPress={
                    () => horaSelecionada && dataSelecionada != null ? handleContinue() : Alert.alert(
                        'Erro ao prosseguir !!',
                        'Preencha todos os campos para prosseguir !!!',
                        [
                          { text: 'Ok'},
                        ]
                      )
                } 
                    text={'Confirmar'}
                />

                <CardCancelLess onPressCancel={() => {
                    navigation.replace("Main");
                }} text={"Cancelar"} />
            </BoxButtons>

            <ConfirmAppointmentModal
                agendamento={agendamento}
                navigation={navigation}
                visible={showModal}
                setShowModal={setShowModal}
            />

        </Container>

    )

}