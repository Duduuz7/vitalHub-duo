import { useEffect, useState } from "react";
import {
  Container,
  ContainerCepCidade,
} from "../../components/Container/StyleContainer";
import { CardCancelLessLocal, CardCancelLessLocalB } from "../../components/Descriptions/Descriptions";
import { AgeTextCard, CityText } from "../../components/Descriptions/StyledDescriptions";
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

  useEffect(() => {
    console.log(route)
  }, [route.params])
  
  async function BuscarClinica() {
    console.log(`/Clinica/BuscarPorId?id=${route.params.clinicaId}`)
    await api.get(`/Clinica/BuscarPorId?id=${route.params.clinicaId}`)
      .then(response => {
        setClinica(response.data);
        console.log( response.data )
        
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
              latitude={clinica.endereco.latitude} longitude={clinica.endereco.longitude}
            />

            <TitleLocalization>{clinica.nomeFantasia}</TitleLocalization>

            <CityText>{clinica.endereco.cidade}</CityText>

            <InputBox
              placeholderTextColor={"#33303E"}
              textLabel={"Endereço"}
              placeholder={"Ex. Rua Vicenso Silva, 58"}
              fieldValue={clinica.endereco.logradouro}
              // keyboardType="numeric"
              editable={false}
              fieldWidth={90}
            />

            <ContainerCepCidade>
              <InputBox
                placeholderTextColor={"#33303E"}
                textLabel={"Número"}
                placeholder={"Ex. 570"}
                keyboardType="numeric"
                editable={false}
                fieldWidth={40}
                fieldValue={`${clinica.endereco.numero}`}
              />
              <InputBox
                placeholderTextColor={"#33303E"}
                textLabel={"Cidade"}
                placeholder={"Ex. São Paulo"}
                editable={false}
                fieldWidth={40}
                fieldValue={clinica.endereco.cidade}
              />
            </ContainerCepCidade>

            <CardCancelLessLocalB
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
