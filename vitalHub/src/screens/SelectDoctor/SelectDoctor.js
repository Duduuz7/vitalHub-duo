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

export const SelectDoctor = ({ navigation }) => {
  const [medico, setMedico] = useState([]);

  const image = require("../../assets/ImageCard.png");
  const dataItens = [
    {
      id: "fsdfsfsdf",
      doctorArea: "Dermatóloga, Esteticista",
      image: image,
      name: "Dr Alessandra",
    },
    {
      id: "fsdfsf",
      doctorArea: "Cirurgião, Cardiologista",
      image: image,
      name: "Dr Kumushiro",
    },
    {
      id: "fsdf",
      doctorArea: "Clínico, Pediatra",
      image: image,
      name: "Dr Rodrigo Santos",
    },
  ];

  const ListarMedico = async () => {
    // await api.get("/Medicos").then(response => {
    //     setMedico(response.data)
        
    //     console.log(medico)
        
    // }).catch(error => {
    //     console.log(error);
    // })
     try {
      const returnApi = await api.get("/Medicos")

      setMedico(returnApi.data);
    } catch (erro) {
      console.log(erro);
    }
  };

  useEffect(() => {
    ListarMedico();
  }, []);

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
            doctorArea={item.especialidade.especialidade1}
            name={item.idNavigation.nome}
            url={image}
          />
        )}
        showsVerticalScrollIndicator={false}
      />

      <ButtonLargeSelect
        onPress={() => {
          navigation.navigate("SelectDate");
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
