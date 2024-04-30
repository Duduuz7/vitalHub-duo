import { StatusBar } from "react-native";
import { ButtonLargeSelect } from "../../components/Button/Button";
import { LargeButtonSelect } from "../../components/Button/StyleButton";
import { CardSelectClinic } from "../../components/Cards/Cards";
import {
  Container,
  FlatContainerSelect,
  ScrollContainer,
} from "../../components/Container/StyleContainer";
import { TitleSelect } from "../../components/Title/StyleTitle";
import { CancelLessMargin } from "../../components/Descriptions/StyledDescriptions";
import { CardCancelLess } from "../../components/Descriptions/Descriptions";
import { useEffect, useState } from "react";
import api from "../../services/Services";

export const SelectCLinic = ({ navigation, route }) => {
  

  const [clinicas, setClinicas] = useState([]);


  const [selectClinica, setSelectClinica] = useState(null)

  const [selected, setSelected] = useState(false)


  function handleContinue() {
    navigation.navigate("SelectDoctor", { 
      agendamento : {
      ...route.params.agendamento,

      ...selectClinica
    }})
  }



  async function ListarClinicas() {
    await api.get(`/Clinica/BuscarPorCidade?cidade=${route.params.agendamento.localizacao}`).then(async (response) => {

      // if( response == '' ) {
      //   alert("Não foi possível encontrar clínicas na sua região")

      //   navigation.replace("Main")
      // }

      const dados = response.data;
      // console.log(dados);

      setClinicas(dados);
      console.log(clinicas);
    });
  }

  useEffect(() => {
    console.log(route);
  }, [route]);

  useEffect(() => {
    ListarClinicas()
  }, []);



  return (
    <Container>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <TitleSelect>Selecionar clínica</TitleSelect>

      <FlatContainerSelect
        data={clinicas}
        renderItem={({ item }) => (
          <CardSelectClinic
            // openTime={item.openTime}
            name={item.nomeFantasia}
            // rate={item.rate}
            localization={`${item.endereco.logradouro}, ${item.endereco.numero}, ${item.endereco.cidade}
            `}
            
            onPress={() => {
              setSelectClinica({
                clinicaId: item.id,

                clinicaLabel: item.nomeFantasia,
              })
            }}
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />

      <ButtonLargeSelect
        onPress={() => {
          handleContinue()
        }}
        text={"Continuar"}
      />

      <CardCancelLess
        onPressCancel={() => navigation.replace("Main")}
        text={"Cancelar"}
      />
    </Container>
  );
};