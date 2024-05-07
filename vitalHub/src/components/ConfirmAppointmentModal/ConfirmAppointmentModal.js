import { Modal } from "react-native"
import { ModalContent, PatientModal } from "../CancellationModal/StyleCancelationModal"
import { Title, TitleModalSchedule } from "../Title/StyleTitle"
import { DescriptionConfirmModal, SmallDescriptionModal } from "../Descriptions/StyledDescriptions"
import { BoxDescriptions, BoxMedicoConsulta } from "./StyleConfirmAppointmentModal"
import { Label } from "../Label/Label"
import { LabelDescription } from "../Label/StyleLabel"
import { CardCancelLess, DescripritionModalSmall, DescripritionModalSmall2 } from "../Descriptions/Descriptions"
import { ButtonLargeConfirmModal, ButtonLargeModal, ButtonLargeSelect } from "../Button/Button"
import moment from "moment"
import api from "../../services/Services"
import { userDecodeToken } from "../../utils/Auth"
import { useEffect, useState } from "react"


export const ConfirmAppointmentModal = ({
    agendamento,
    navigation,
    visible,
    setShowModal = null,
    ...rest
}) => {

    const [profile, setProfile] = useState(null)

    async function profileLoad() {
        const token = await userDecodeToken()

        setProfile(token)
    }


    async function handleConfirm() {

        await api.post(`/Consultas/Cadastrar`, {
            ...agendamento,

            pacienteId: profile.idUsuario,

            situacaoId: 'E2D4051A-33D5-4AE1-809F-357BD6AE3412'
        }).then(

            setShowModal(false),

            navigation.replace("Main")

        ).catch((error) => {
            console.log(error);
        })

    }

    useEffect(() => {
        profileLoad()
    }, [])


    return (

        <Modal
            {...rest}
            visible={visible}
            transparent={true}
            animationType="fade">


            <PatientModal>

                <ModalContent>

                    <Title>Agendar Consulta</Title>

                    <DescriptionConfirmModal>Consulte os dados selecionados para a sua consulta</DescriptionConfirmModal>

                    <BoxDescriptions>

                        <LabelDescription>Data da consulta</LabelDescription>

                        <DescripritionModalSmall text={moment(agendamento.dataConsulta).format("DD/MM/YYYY  ||  HH:mm")} />

                        <LabelDescription>Médico(a) da consulta</LabelDescription>

                        <DescripritionModalSmall2 text={agendamento.medicoLabel} />

                        <DescripritionModalSmall text={agendamento.medicoEspecialidade} />

                        <LabelDescription>Clínica da consulta</LabelDescription>

                        <DescripritionModalSmall text={agendamento.clinicaLabel} />

                        <LabelDescription>Local da consulta</LabelDescription>

                        <DescripritionModalSmall text={agendamento.localizacao} />

                        <LabelDescription>Tipo da consulta</LabelDescription>

                        <DescripritionModalSmall text={agendamento.prioridadeLabel} />

                    </BoxDescriptions>

                    <ButtonLargeConfirmModal
                        onPress={
                            () => {
                                handleConfirm()
                            }
                        }
                        text={"Confirmar"}
                    />

                    <CardCancelLess onPressCancel={() => setShowModal(false)} text={"Cancelar"} />

                </ModalContent>

            </PatientModal>

        </Modal>
    )
}
