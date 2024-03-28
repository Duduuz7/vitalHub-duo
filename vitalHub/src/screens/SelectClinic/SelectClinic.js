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

export const SelectCLinic = ({ navigation }) => {
  const [clinicas, setClinicas] = useState([]);

  async function ListarClinicas() {
    await api.get("/Clinica/ListarTodas").then(async (response) => {
      const dados = response.data;
      // console.log(dados);

      setClinicas(dados);
      console.log(clinicas);
    });
  }

  useEffect(() => {
    ListarClinicas();
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
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />

      <ButtonLargeSelect
        onPress={() => {
          navigation.navigate("SelectDoctor");
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