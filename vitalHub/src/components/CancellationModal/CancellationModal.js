import { ActivityIndicator, Modal } from "react-native"
import { TitleModal, TitleModalRecord } from "../Title/StyleTitle"
import { DescriptionCancel } from "../Descriptions/StyledDescriptions"
import { ButtonLargeSelect } from "../Button/Button"
import { CardCancelLess } from "../Descriptions/Descriptions"
import { ModalContent, PatientModal } from "./StyleCancelationModal"
import { handleCallNotifications } from "../Notifications/Notifications"
import { ButtonModal } from "../Button/StyleButton"
import { ButtonText } from "../ButtonText/StyleButtonText"
import { useState } from "react"
import api from "../../services/Services"


export const CancellationModal = ({
    navigation,
    visible,
    consultaCancel,
    setShowModalCancel = null,
    ...rest
}) => {

    const [loading, setLoading] = useState(false)

    async function CancelarConsulta() {
        setLoading(true)


        //Chamando o metodo da api
        //Consultas/Status?idConsulta=57b9816a-4168-418f-9cce-151e6d573ce8&status=Cancelada
        await api.put(`/Consultas/Status?idConsulta=${consultaCancel.id}&status=${"Cancelada"}`
            // { id: consultaCancel.id, status: consultaCancel.situacaoId }
        ).then(response => {

            handleCallNotifications({
                title: "Consulta Cancelada",
                body: "Sua consulta foi cancelada com sucesso !"
            })

            setShowModalCancel(false)

            setLoading(false)

        }).catch(error => {
            console.log(error)
            setLoading(false)
        })

    }

    return (

        <Modal
            {...rest}
            visible={visible}
            transparent={true}
            animationType="fade"
        >

            {/* container */}
            <PatientModal>

                <ModalContent>

                    <TitleModal>Cancelar Consulta</TitleModal>

                    <DescriptionCancel>Ao cancelar essa consulta, abrirá uma possível disponibilidade no seu horário, deseja mesmo cancelar essa consulta?</DescriptionCancel>

                   <ButtonModal disabled={loading} onPress={() =>
                        CancelarConsulta()
                        // console.log(consultaCancel)
                    }>
                        {loading ? <ActivityIndicator /> : <ButtonText>Confirmar</ButtonText>}
                   </ButtonModal>

                    <CardCancelLess onPressCancel={() => setShowModalCancel(false)} text={"Cancelar"} />

                </ModalContent>

            </PatientModal>



        </Modal>

    )
}