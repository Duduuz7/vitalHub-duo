import { StatusBar } from "react-native"
import { BoxDataHome, BoxHome, ButtonHomeContainer, Container, FlatContainer, MoveIconBell, ScrollContainer } from "../../components/Container/StyleContainer"
import { Header } from "../../components/Header/StyledHeader"
import { ImagemHome } from "../../components/Images/StyleImages"
import { NameTitle, WelcomeTitle } from "../../components/Title/Title"
import { Ionicons } from '@expo/vector-icons';
import Calendar from "../../components/Calendar/Calendar"

import { FilterButton } from "../../components/Button/Button"
import { useEffect, useState } from "react"
import { Card } from "../../components/Cards/Cards"
import { CancellationModal } from "../../components/CancellationModal/CancellationModal"
import { AppointmentModal } from "../../components/AppointmentModal/AppointmentModal"
import { tokenClean, userDecodeToken } from "../../utils/Auth"
import api from "../../services/Services"
import moment from "moment"



import {MaterialCommunityIcons} from '@expo/vector-icons';




export const DoctorConsultation = ({ navigation }) => {

    const [dataConsulta, setDataConsulta] = useState('') // vazio no inicio

    // Criar o state para receber a lista de consultas (Array)
    const [consultaLista, setConsultaLista] = useState([]) // vazio no inicio

    const [token, setToken] = useState({});

    const [consultaSelecionada, setConsultaSelecionada] = useState(null)

    const [fotoPerfil, setFotoPerfil] = useState(null)




    //state para cancelar consulta
    const [consultaCancel, setConsultaCancel] = useState({
        id: '',
        //ID DE CONSULTAS CANCELADAS, PEGAR NO BANCO -----------------------------
        situacaoId: "B8256AE1-AED5-47D1-9E8F-858435620AB5"
    })



    function MostrarModal(modal, consulta) {
        setConsultaSelecionada(consulta)
        if (modal == 'cancelar') {
            setShowModalCancel(true)
        } else if (modal == 'prontuario') {
            setShowModalAppointment((selected === 'Agendada' ? true : false))
        } else {
            console.log("asa");
        }
    }



    async function ListarConsultas() {

        // console.log(`/Medicos/BuscarPorData?data=${dataConsulta}&id=${token.idUsuario}`);
        await api.get(`/Medicos/BuscarPorData?data=${dataConsulta}&id=${token.idUsuario}`).then(response => {

            setConsultaLista(response.data)
            console.log(response.data);

        }).catch(error => {
            console.log(error);
        })

    }

    async function profileLoad() {

        const token = await userDecodeToken();

        if (token) {
            console.log(token)
            setToken(token)

            setDataConsulta(moment().format("YYYY-MM-DD"))
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

    useEffect(() => {
        setSelected("Agendada")
        profileLoad()
    }, [])


    useEffect(() => {
        if (dataConsulta != '') {
            ListarConsultas()
        }
        console.log(dataConsulta);
    }, [dataConsulta, showModalCancel])


    useEffect(() => {
        BuscarFotoDePerfil()
    }, [fotoPerfil])


    // const image = require("../../assets/ImageCard.png");


    // STATES PARA OS MODAIS

    const [showModalCancel, setShowModalCancel] = useState(false);
    const [showModalAppointment, setShowModalAppointment] = useState(false);

    // RETURN

    return (
        
        <Container>
            <StatusBar translucent backgroundColor="transparent" />
            <Header>

                <BoxHome>

                    <ImagemHome source={{ uri : fotoPerfil}} />

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
                renderItem={({ item }) =>
                    // item.situacao == selected
                    item.situacao.situacao == selected &&
                    <Card
                        navigation={navigation}
                        dataConsulta={item.dataConsulta}
                        hour={"14:00"}
                        name={item.paciente.idNavigation.nome}
                        age={`${moment().year() -
                            moment(item.paciente.dataNascimento).format("YYYY")
                            } anos      .`}
                        routine={item.prioridade.prioridade == '1' ? "Rotina" : item.prioridade.prioridade == "2" ? "Exame" : "Urgência"}
                        url={item.paciente.idNavigation.foto}
                        status={item.situacao.situacao}
                        // onPressCancel={() => setShowModalCancel(true)}
                        onPressAppointment={() => { navigation.navigate("ViewPrescriptionDoc", { consulta: item }) }}
                        // onPressAppointmentCard={() => setShowModalAppointment(item.situacao.situacao === 'Agendada' ? true : false)}

                        onPressCancel={() => { MostrarModal('cancelar', item), setConsultaCancel(prevState => ({ ...prevState, id: item.id })), ListarConsultas() }}
                        onPressAppointmentCard={() => { MostrarModal('prontuario', item) }}
                    />}

                keyExtractor={item => item.id}

                showsVerticalScrollIndicator={false}

            />

            <CancellationModal
                consultaCancel={consultaCancel}
                visible={showModalCancel}
                setShowModalCancel={setShowModalCancel}
            />

            <AppointmentModal
                consulta={consultaSelecionada}
                navigation={navigation}
                visible={showModalAppointment}
                setShowModalAppointment={setShowModalAppointment}
            />

        </Container>

    )
}