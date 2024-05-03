import { ActivityIndicator, StatusBar } from "react-native"
import { BoxDataHome, BoxHome, ButtonHomeContainer, Container, FlatContainer, MoveIconBell } from "../../components/Container/StyleContainer"
import { Header } from "../../components/Header/StyledHeader"
import { ImagemHome } from "../../components/Images/StyleImages"
import { NameTitle, WelcomeTitle } from "../../components/Title/Title"
import { Ionicons } from '@expo/vector-icons';
import Calendar from "../../components/Calendar/Calendar"

import { FilterButton } from "../../components/Button/Button"
import { useEffect, useState } from "react"
import { Card } from "../../components/Cards/Cards"
import { CancellationModal } from "../../components/CancellationModal/CancellationModal"

import { FontAwesome6 } from '@expo/vector-icons';
import { Stethoscope } from "../../components/Stethoscope/StyleSthetoscope"
import { ModalStethoscope } from "../../components/Stethoscope/ModalStethoscope"
import { PatientAppointmentModal } from "../../components/PatientAppointmentModal/PatientAppointmentModal"
import { tokenClean, userDecodeToken } from "../../utils/Auth"

import api from "../../services/Services";
import moment from "moment"


export const PatientConsultation = ({ navigation, route }) => {

    // Criar o state para receber a lista de consultas (Array)
    const [consultaLista, setConsultaLista] = useState([]) // vazio no inicio

    const [dataConsulta, setDataConsulta] = useState('') // vazio no inicio

    const [token, setToken] = useState([]);

    const [consultaSelecionada, setConsultaSelecionada] = useState(null)

    const [fotoPerfil, setFotoPerfil] = useState(null)


    //STATE PARA CANCELAR CONSULTA 
    const [consultaCancel, setConsultaCancel] = useState({
        id: '',
        //ID DE CONSULTAS CANCELADAS, PEGAR NO BANCO -----------------------------
        situacaoId: ''
    })


    //Criar a função para obter a lista de consultas da api e setar no state

    function MostrarModal(modal, consulta) {
        setConsultaSelecionada(consulta)

        console.log(consulta);

        if (modal == 'cancelar') {
            setShowModalCancel(true)
        } else if (modal == 'localization') {
            setShowModal(selected === 'Agendada' ? true : false)
        } else {
            console.log('asdas');
        }
    }


    async function ListarConsultas() {

        console.log(`/Pacientes/BuscarPorData?data=${dataConsulta}&id=${token.idUsuario}`);
        await api.get(`/Pacientes/BuscarPorData?data=${dataConsulta}&id=${token.idUsuario}`).then(response => {

            setConsultaLista(response.data)
            console.log(consultaLista);

        }).catch(error => {
            console.log(error);
        })

    }

    async function profileLoad() {

        const token = await userDecodeToken();

        if (token) {
            console.log(token)
            setToken(token)

            setDataConsulta(moment().format('YYYY-MM-DD'));
        }

    }

    async function BuscarFotoDePerfil() {

        const tokenB = await userDecodeToken();

        await api.get(`/Usuario/BuscarPorId?&id=${tokenB.idUsuario}`).then(response => {

            console.log(response.data.foto);
            setFotoPerfil(response.data.foto)
            console.log(fotoPerfil);

        }).catch(error => {
            console.log(error);
        })

    }

    //STATE PARA O ESTADO DOS CARDS FLATLIST, BOTOES FILTRO
    const [selected, setSelected] = useState({
        agendadas: "Agendada",
        realizadas: "Realizada",
        canceladas: "Cancelada",
    });

    // const image = require("../../assets/CardDoctorImage.png");

    // STATES PARA OS MODAIS

    const [showModalCancel, setShowModalCancel] = useState(false);
    // const [showModalAppointment, setShowModalAppointment] = useState(false);
    const [showModalStethoscope, setShowModalStethoscope] = useState(false);

    const [showModal, setShowModal] = useState(false);

    // RETURN

    useEffect(() => {
        profileLoad()
        setSelected("Agendada")

        // GetConsultas()
    }, [])

    useEffect(() => {
        if (dataConsulta != '') {
            ListarConsultas()
        }
        // console.log(dataConsulta);
    }, [dataConsulta, showModalCancel])

    useEffect(() => {
        BuscarFotoDePerfil()
    })

    return (

        <Container>

            <Header>

                <StatusBar translucent backgroundColor="transparent" />

                <BoxHome>

                    <ImagemHome source={{ uri: fotoPerfil }} />

                    <BoxDataHome>
                        <WelcomeTitle textTitle={"Bem vindo"} />

                        <NameTitle textTitle={token.name} />
                    </BoxDataHome>

                </BoxHome>


                <MoveIconBell>
                    <Ionicons name="notifications" size={25} color="white" />
                </MoveIconBell>

            </Header>

            <Calendar setDataConsulta={setDataConsulta} />

            <ButtonHomeContainer>

                <FilterButton onPress={() => { setSelected("Agendada") }} selected={selected === 'Agendada' ? true : false} text={'Agendadas'} />
                {/* <FilterButton onPress={() => { setSelected({ agendadas: true }) }} selected={selected.agendadas} text={'Agendadas'} /> */}

                <FilterButton onPress={() => { setSelected("Realizada") }} selected={selected === 'Realizada' ? true : false} text={'Realizadas'} />

                <FilterButton onPress={() => { setSelected("Cancelada") }} selected={selected === 'Cancelada' ? true : false} text={'Canceladas'} />

            </ButtonHomeContainer>

            <FlatContainer
                data={consultaLista}
                renderItem={({ item }) => {
                    console.log("item", item);
                    const situacao = item.situacao?.situacao; // Aqui acessamos a propriedade situacao corretamente

                    // Verifica se a situação da consulta é a mesma que a selecionada
                    if (situacao === selected) {
                        return (
                            <Card
                                navigation={navigation}
                                dataConsulta={item.dataConsulta}
                                hour={"14:00"}
                                name={item.medicoClinica.medico.idNavigation.nome}
                                age={`CRM: ${item.medicoClinica.medico.crm}  .  `}
                                routine={item.prioridade.prioridade == '1' ? "Rotina" : item.prioridade.prioridade == "2" ? "Exame" : "Urgência"}
                                url={item.medicoClinica.medico.idNavigation.foto}
                                status={situacao} // Adiciona a situação da consulta como valor da prop status
                                onPressCancel={() => { MostrarModal('cancelar', item), setConsultaCancel(() => ({ situacaoId: 'B8256AE1-AED5-47D1-9E8F-858435620AB5', id: item.id })), ListarConsultas() }}
                                onPressAppointmentCard={() => { MostrarModal('localization', item) }}
                                onPressAppointment={() => { navigation.navigate("ViewPrescription", { consulta: item }) }}
                                
                            />
                        );
                    } else {
                        // Se a situação não corresponder à selecionada, retornamos null
                        return null;
                    }
                }}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />


            <Stethoscope onPress={() => {
                setShowModalStethoscope(true)
                // console.log(consultaLista);
            }}>

                <FontAwesome6
                    name="stethoscope"
                    size={32}
                    color={"white"}
                />

            </Stethoscope>

            <CancellationModal
                consultaCancel={consultaCancel}
                visible={showModalCancel}
                setShowModalCancel={setShowModalCancel}
            />

            <ModalStethoscope
                navigation={navigation}
                visible={showModalStethoscope}
                setShowModalStethoscope={setShowModalStethoscope}
            />

            <PatientAppointmentModal
                consulta={consultaSelecionada}

                navigation={navigation}
                visible={showModal}
                setShowModal={setShowModal}
            />

        </Container>

    )
}