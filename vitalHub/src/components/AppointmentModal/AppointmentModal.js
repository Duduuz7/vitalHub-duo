import { Modal } from "react-native"
import { ButtonLargeSelect } from "../Button/Button"
import { ModalContent, PatientModal } from "../CancellationModal/StyleCancelationModal"
import { CardCancelLess } from "../Descriptions/Descriptions"
import { DescriptionModalRecord } from "../Descriptions/StyledDescriptions"
import { ImageModalRecord } from "../Images/StyleImages"
import { TitleModal, TitleModalRecord } from "../Title/StyleTitle"
import { BoxAgeEmailModal } from "./StyleAppointmentModal"
import moment from "moment"
import { useEffect } from "react"


export const AppointmentModal = ({
    consulta = null,
    navigation,
    visible,
    setShowModalAppointment = null,
    ...rest
}) => {
    
    return (

        <Modal
            {...rest}
            visible={visible}
            transparent={true}
            animationType="fade">

            {
                consulta != null && (
                    <PatientModal>

                        <ModalContent>

                            <ImageModalRecord source={{uri : consulta.paciente.idNavigation.foto}} />

                            <TitleModalRecord>{consulta.paciente.idNavigation.nome}</TitleModalRecord>

                            <BoxAgeEmailModal>

                                <DescriptionModalRecord>
                                    {`${moment().year() - moment(consulta.paciente.dataNascimento).format("YYYY")} anos`}
                                </DescriptionModalRecord>
                                <DescriptionModalRecord>{consulta.paciente.idNavigation.email}</DescriptionModalRecord>

                            </BoxAgeEmailModal>

                            <ButtonLargeSelect
                                onPress={() => { navigation.replace("MedicalRecords",  { consulta : consulta })}}
                                text={"Inserir Prontuário"}
                            />

                            <CardCancelLess onPressCancel={() => setShowModalAppointment(false)} text={"Cancelar"} />

                        </ModalContent>

                    </PatientModal>
                )
            }

        </Modal>
    )
}