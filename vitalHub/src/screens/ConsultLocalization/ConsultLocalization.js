import { useEffect, useState } from "react";
import {
  Container,
  ContainerCepCidade,
} from "../../components/Container/StyleContainer";
import { CardCancelLessLocal } from "../../components/Descriptions/Descriptions";
import { AgeTextCard } from "../../components/Descriptions/StyledDescriptions";
import { MapImage } from "../../components/Images/StyleImages";
import { InputBox } from "../../components/InputBox/InputBox";
import Maps from "../../components/Maps/Maps";
import { Title, TitleLocalization } from "../../components/Title/StyleTitle";
import { ActivityIndicator } from "react-native";
import api from "../../services/Services";

export const ConsultLocalization = ({ navigation, route }) => {

  const [ clinica, setClinica ] = useState(null)

  useEffect(() => {

    if (clinica == null) {
      BuscarClinica()
    }
  }, [clinica])



  async function BuscarClinica() {
    await api.get(`/Clinica/BuscarPorId?id=${route.params.clinicaId}`)
      .then(response => {
        setClinica(response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  return (
    <Container>
      {
        clinica != null ? (
          <>

            <Maps
              latitude={clinica.latitude} longitude={clinica.longitude}
            />

            <TitleLocalization>{clinica.nomeFantasia}</TitleLocalization>

            <AgeTextCard>asda</AgeTextCard>

            <InputBox
              placeholderTextColor={"#33303E"}
              textLabel={"Endereço"}
              placeholder={"Ex. Rua Vicenso Silva, 58"}
              fieldValue={clinica.endereco.logradouro}
              // keyboardType="numeric"
              editable={true}
              fieldWidth={90}
            />

            <ContainerCepCidade>
              <InputBox
                placeholderTextColor={"#33303E"}
                textLabel={"Número"}
                placeholder={"Ex. 570"}
                keyboardType="numeric"
                editable={true}
                fieldWidth={40}
              />
              <InputBox
                placeholderTextColor={"#33303E"}
                textLabel={"Bairro"}
                placeholder={"Ex. Vila Ema"}
                editable={true}
                fieldWidth={40}
              />
            </ContainerCepCidade>

            <CardCancelLessLocal
              onPressCancel={() => {
                navigation.replace("Main");
              }}
              text={"Voltar"}
            />

          </>
        )

          :

          (
            <ActivityIndicator style={{marginTop: '100%'}} />
          )
      }



    </Container>
  );
};
