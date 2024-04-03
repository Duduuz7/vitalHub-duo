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

export const PatientAppointmentModal = ({
  consulta,
  navigation,
  visible,
  doctorData = {
    doctorName: '',
    doctorArea: '',
    doctorCRM: '',
    latitude: '', 
    longitude: ''
},
  setShowModal = null,
  ...rest
}) => {


  function handlePress( rota ) {

    navigation.replace(rota, {clinicaId : consulta.medicoClinica.clinicaId})
    
  }


  return (
    <Modal {...rest} visible={visible} transparent={true} animationType="fade">
      <PatientModal>
        <ModalContent>
          <ImageModalRecord
            source={require("../../assets/CardRecordPatient(doctorImage).png")}
          />

          <TitleModalRecord>{doctorData.doctorName}</TitleModalRecord>

          <BoxAgeEmailModal>
            <DescriptionModalRecord>{doctorData.doctorArea}</DescriptionModalRecord>
            <DescriptionModalRecord>{`CRM-${doctorData.doctorCRM}`}</DescriptionModalRecord>
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
    </Modal>
  );
};
