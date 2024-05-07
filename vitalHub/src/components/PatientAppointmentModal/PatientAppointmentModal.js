import { Modal } from "react-native";
import {
  ButtonLargeConfirmModal,
  ButtonLargeModal,
  ButtonLargeSelect,
} from "../Button/Button";
import {
  ModalContent,
  PatientModal,
} from "../CancellationModal/StyleCancelationModal";
import { CardCancelLess } from "../Descriptions/Descriptions";
import { DescriptionModalRecord } from "../Descriptions/StyledDescriptions";
import { ImageModalRecord } from "../Images/StyleImages";
import { TitleModal, TitleModalRecord } from "../Title/StyleTitle";
import { BoxAgeEmailModal } from "./StylePatientAppointmentModal";
import { useEffect } from "react";

export const PatientAppointmentModal = ({
  consulta = null,
  navigation,
  visible,
  setShowModal = null,
  ...rest
}) => {


  function handlePress(rota) {
    
    navigation.replace(rota, { clinicaId: consulta.medicoClinica.clinicaId })
  }

  useEffect(() => {
    console.log('consulta');
    if( consulta ){
      console.log(consulta.medicoClinica.clinicaId);
    }
  }, [visible])


  return (
    <Modal {...rest} visible={visible} transparent={true} animationType="fade">
      {
        consulta != null && (
          <PatientModal>
            <ModalContent>
              <ImageModalRecord
                source={{uri : consulta.medicoClinica.medico.idNavigation.foto}}
              />

              <TitleModalRecord>{consulta.medicoClinica.medico.idNavigation.nome}</TitleModalRecord>

               <BoxAgeEmailModal>
            <DescriptionModalRecord>{consulta.medicoClinica.medico.especialidade.especialidade1}</DescriptionModalRecord>
            <DescriptionModalRecord>{`CRM-${consulta.medicoClinica.medico.crm}`}</DescriptionModalRecord>
          </BoxAgeEmailModal> 

              <ButtonLargeConfirmModal
                onPress={() => {
                  // navigation.navigate("ConsultLocalization", { latitude: doctorData.latitude , longitude: doctorData.longitude } ),
                  handlePress("ConsultLocalization")
                  setShowModal(false);
                }}
                text={"Ver Local da Consulta"}
              />

              <CardCancelLess
                onPressCancel={() => setShowModal(false)}
                text={"Cancelar"}
              />
            </ModalContent>
          </PatientModal>
        )
      }

    </Modal>
  );
};
