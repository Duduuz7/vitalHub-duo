import { ActivityIndicator, Modal } from "react-native"
import { TitleModal, TitleModalRecord } from "../Title/StyleTitle"
import { DescriptionCancel } from "../Descriptions/StyledDescriptions"
import { ButtonLargeSelect } from "../Button/Button"
import { CardCancelLess } from "../Descriptions/Descriptions"

import { handleCallNotifications } from "../Notifications/Notifications"
import { ButtonModal } from "../Button/StyleButton"
import { ButtonText } from "../ButtonText/StyleButtonText"
import { useState } from "react"
import api from "../../services/Services"
import { ModalContent, PatientModal } from "../CancellationModal/StyleCancelationModal"


export const ErrorModal = ({
    navigation,
    visible,
    title,
    description,
    consultaCancel,
    setShowModalError = null,
    ...rest
}) => {

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

                    <TitleModal>{title}</TitleModal>

                    <DescriptionCancel>{description}</DescriptionCancel>

                   {/* <ButtonModal>
                         <ButtonText>Voltar</ButtonText>
                   </ButtonModal> */}

                    <CardCancelLess onPressCancel={() => setShowModalError(false)} text={"Voltar"} />

                </ModalContent>

            </PatientModal>
        </Modal>

    )
}