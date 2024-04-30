import { StatusBar } from "react-native";
import {
  Container,
  FlatContainerSelect,
  ScrollContainer,
} from "../../components/Container/StyleContainer";
import { TitleSelect } from "../../components/Title/StyleTitle";
import { CardSelectDoctor } from "../../components/Cards/Cards";
import { ButtonLarge, ButtonLargeSelect } from "../../components/Button/Button";
import { CancelLessMargin } from "../../components/Descriptions/StyledDescriptions";
import { CardCancelLessLocal } from "../../components/Descriptions/Descriptions";
import api from "../../services/Services";
import { useEffect, useState } from "react";

export const SelectDoctor = ({ navigation, route }) => {


  const [medico, setMedico] = useState([]);

  const [selectMedico, setSelectMedico] = useState(null)

  const [selected, setSelected] = useState(false)

  function handleContinue() {
    navigation.navigate("SelectDate", { 
      agendamento : {
      ...route.params.agendamento,

      ...selectMedico
    }})
  }

  const ListarMedico = async () => {
    // await api.get("/Medicos").then(response => {
    //     setMedico(response.data)

    //     console.log(medico)

    // }).catch(error => {
    //     console.log(error);
    // })
    try {
      const returnApi = await api.get(`/Medicos/BuscarPorIdClinica?id=${route.params.agendamento.clinicaId}`)

      setMedico(returnApi.data);
    } catch (erro) {
      console.log(erro);
    }
  };


  useEffect(() => {
    ListarMedico();
  }, []);


  useEffect(() => {
    console.log(route);
  }, [route]);


  return (
    <Container>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <TitleSelect>Selecionar Médico</TitleSelect>

      <FlatContainerSelect
        data={medico}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardSelectDoctor
            onPress={() => 
              setSelectMedico({
                medicoClinicaId: item.id,

                medicoLabel: item.idNavigation.nome,

                medicoEspecialidade: item.especialidade.especialidade1
              })
            }
            doctorArea={item.especialidade.especialidade1}
            name={item.idNavigation.nome}
            url={item.idNavigation.foto}
          />
        )}
        showsVerticalScrollIndicator={false}
      />

      <ButtonLargeSelect
        onPress={() => {
          handleContinue();
        }}
        text={"Continuar"}
      />

      <CardCancelLessLocal
        onPressCancel={() => navigation.replace("Main")}
        text={"Cancelar"}
      />
    </Container>
  );
};
