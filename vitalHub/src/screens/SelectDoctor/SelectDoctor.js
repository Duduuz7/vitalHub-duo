import { Alert, StatusBar, Text } from "react-native";
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

  const [selectMedico, setSelectMedico] = useState({})

  const [selected, setSelected] = useState(false)

  function handleContinue() {
    navigation.navigate("SelectDate", {
      agendamento: {
        ...route.params.agendamento,

        ...selectMedico
      }
    })
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

      {medico == "" ? (

        <Text
          style={{ textAlign: "center", fontSize: 19, marginBottom: "120%", marginTop: 10 }}
        >
          Nenhum médico encontrado, tente novamente procurando por outra clínica ou localização !!!
        </Text>
        
      ) : (
        <FlatContainerSelect
          data={medico}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CardSelectDoctor
              selecionado={item.id === selectMedico.medicoClinicaId ? true : false}
              onPress={() => {
                setSelectMedico({
                  medicoClinicaId: item.id,

                  medicoLabel: item.idNavigation.nome,

                  medicoEspecialidade: item.especialidade.especialidade1
                }),
                  setSelected(true)
              }}
              doctorArea={item.especialidade.especialidade1}
              name={item.idNavigation.nome}
              url={item.idNavigation.foto}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}




      <ButtonLargeSelect
        onPress={() => {
          selected == false ? Alert.alert(
            'Erro ao prosseguir !!',
            'Selecione um médico para prosseguir !!!',
            [
              { text: 'Ok' },
            ]
          ) :
            handleContinue()
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
