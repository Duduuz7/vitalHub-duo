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



export const DoctorConsultation = ({ navigation }) => {

    const [dataConsulta, setDataConsulta] = useState('') // vazio no inicio

    // Criar o state para receber a lista de consultas (Array)
    const [consultaLista, setConsultaLista] = useState([]) // vazio no inicio

    const [token, setToken] = useState({});

    const [consultaSelecionada, setConsultaSelecionada] = useState(null)

    function MostrarModal( modal, consulta) {
        setConsultaSelecionada(consulta)
        if (modal == 'cancelar') {
            setShowModalCancel(true)
        }else if (modal == 'prontuario') {
            setShowModalAppointment((selected === 'Agendada' ? true : false))
        }else{
            console.log("asa");
        }
    }



    async function ListarConsultas(){
        
        // console.log(`/Medicos/BuscarPorData?data=${dataConsulta}&id=${token.idUsuario}`);
        await api.get(`/Medicos/BuscarPorData?data=${dataConsulta}&id=${token.idUsuario}`).then(response => {

            setConsultaLista(response.data)
            console.log(response.data);

        }).catch( error => {
            console.log(error);
        })

    }

    async function profileLoad() {

        const token = await userDecodeToken();

        if (token) {
            console.log(token)
            setToken(token)

            setDataConsulta( moment().format("YYYY-MM-DD") ) 
        }
    }

    // async function GetConsultas() {
    //     try {

    //         const token = await tokenClean();

    //         if (token) {

    //             const response = await api.get('/Consultas', {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`
    //                 }
    //             });

    //             setConsultaLista(response.data);

    //             console.log("asdas", response.data);

    //         } else {
    //             console.log("Token não encontrado.");
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }



    //STATE PARA O ESTADO DOS CARDS FLATLIST, BOTOES FILTRO
    const [selected, setSelected] = useState({
        agendadas: "Agendada",
        realizadas: "Realizada",
        canceladas: "Cancelada",
    });

    useEffect(() => {
        // GetConsultas()
        // ListarConsultas()
        setSelected("Agendada")
        profileLoad()
    }, [])

    useEffect(() => {
        if( dataConsulta != '' ){
            ListarConsultas()
        }
        console.log(dataConsulta);
    }, [dataConsulta])

    const image = require("../../assets/ImageCard.png");

    // CARD MOCADOS

    // const dataItens = [
    //     {
    //         id: 1,
    //         hour: '14:00',
    //         image: image,
    //         name: 'Niccole Sarga',
    //         age: '22 anos',
    //         routine: 'Rotina',
    //         status: "r"
    //     },
    //     {
    //         id: 2,
    //         hour: '15:00',
    //         image: image,
    //         name: 'Richard Kosta',
    //         age: '28 anos',
    //         routine: 'Urgência',
    //         status: "a"
    //     },
    //     {
    //         id: 3,
    //         hour: '17:00',
    //         image: image,
    //         name: 'Neymar Jr',
    //         age: '28 anos',
    //         routine: 'Rotina',
    //         status: "c"
    //     }
    // ]

    // //FILTRO PARA CARD

    // const Check = (data) => {
    //     if (data.status === "a" && selected.agendadas) {
    //         return true;
    //     }
    //     if (data.status === "r" && selected.realizadas) {
    //         return true;
    //     }
    //     if (data.status === "c" && selected.canceladas) {
    //         return true;
    //     }
    //     return false;
    // }

    // const data = consultaLista.filter(Check);

    // STATES PARA OS MODAIS

    const [showModalCancel, setShowModalCancel] = useState(false);
    const [showModalAppointment, setShowModalAppointment] = useState(false);

    // RETURN

    return (
        <Container>
            <StatusBar translucent backgroundColor="transparent" />
            <Header>


                <BoxHome>

                    <ImagemHome source={require('../../assets/DoctorImage.png')} />

                    <BoxDataHome>
                        <WelcomeTitle textTitle={"Bem vindo"} />

                        <NameTitle textTitle={token.name} />
                    </BoxDataHome>

                </BoxHome>


                <MoveIconBell>
                    <Ionicons name="notifications" size={25} color="white" />
                </MoveIconBell>

            </Header>

            <Calendar setDataConsulta={setDataConsulta}/>

            <ButtonHomeContainer>

                <FilterButton onPress={() => { setSelected("Agendada")}} selected={selected === 'Agendada' ? true : false} text={'Agendadas'} />
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
                        age={`${
                            moment().year() -
                            moment(item.paciente.dataNascimento).format("YYYY")
                          } anos      .`}
                        routine={item.prioridade == "1" ? 'Rotina' : item.prioridade == '2' ? 'Exame' : 'Urgência'}
                        url={image}
                        status={item.situacao.situacao}
                        // onPressCancel={() => setShowModalCancel(true)}
                        // onPressAppointment={() => { navigation.navigate("ViewPrescription") }}
                        // onPressAppointmentCard={() => setShowModalAppointment(item.situacao.situacao === 'Agendada' ? true : false)}

                        onPressCancel={() => {MostrarModal('cancelar', item)}}
                        onPressAppointmentCard={() => {MostrarModal('prontuario', item)}}
                        />}

                keyExtractor={item => item.id}

                showsVerticalScrollIndicator={false}

            />

            <CancellationModal
                visible={showModalCancel}
                setShowModalCancel={setShowModalCancel}
            />

            <AppointmentModal
                consulta={consultaSelecionada}
                navigation={navigation}
                visible={showModalAppointment}
                setShowModalAppointment={setShowModalAppointment}
            />


            {/* <Card url={require('../../assets/ImageCard.png')} name={"Niccole Sarge"} age={"22 anos"} routine={"Rotina"} hour={"14:00"}/>

                <Card url={require('../../assets/ImageCardMale.png')} name={"Richard Kosta"} age={"28 anos"} routine={"Urgência"} hour={"15:00"}/>

                <Card url={require('../../assets/ney.webp')} name={"Neymar Jr"} age={"33 anos"} routine={"Rotina"} hour={"17:00"}/> */}

        </Container>


    )
}