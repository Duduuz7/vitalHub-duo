import { StatusBar } from "react-native"
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



export const PatientConsultation = ({ navigation }) => {

    // Criar o state para receber a lista de consultas (Array)
    const [consultaLista, setConsultaLista] = useState([]) // vazio no inicio

    const [dataConsulta, setDataConsulta] = useState('') // vazio no inicio

    const [token, setToken] = useState([]);

    //Criar a função para obter a lista de consultas da api e setar no state




    async function ListarConsultas(){
        
        console.log(`/Pacientes/BuscarPorData?data=${dataConsulta}&id=${token.idUsuario}`);
        await api.get(`/Pacientes/BuscarPorData?data=${dataConsulta}&id=${token.idUsuario}`).then(response => {

            setConsultaLista(response.data)
            console.log(consultaLista);

        }).catch( error => {
            console.log(error);
        })

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

    //             // console.log(response.data);

    //         } else {
    //             console.log("Token não encontrado.");
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


    async function profileLoad() {

        const token = await userDecodeToken();

        if (token) {
            console.log(token)
            setToken(token)

            setDataConsulta( moment().format('YYYY-MM-DD') );
        }

    }

    //STATE PARA O ESTADO DOS CARDS FLATLIST, BOTOES FILTRO
    const [selected, setSelected] = useState({
        agendadas: "Agendada",
        realizadas: "Realizada",
        canceladas: "Cancelada",
    });


    const image = require("../../assets/CardDoctorImage.png");

    // CARD MOCADOS

    // const dataItens = [
    //     {
    //         id: 1,
    //         hour: '14:00',
    //         image: image,
    //         name: 'Dr Claudio',
    //         age: '22 anos',
    //         routine: 'Urgência',
    //         status: "a"
    //     },
    //     {
    //         id: 1,
    //         hour: '14:00',
    //         image: image,
    //         name: 'Dr josé',
    //         age: '23 anos',
    //         routine: 'Urgência',
    //         status: "r"
    //     }
    // ]

    //FILTRO PARA CARD

    const Check = (consultaLista) => {
        if (consultaLista.situacao.situacao === "Agendada" && selected.agendadas) {
            return true;
        }
        if (consultaLista.situacao.situacao === "Realizada" && selected.realizadas) {
            return true;
        }
        if (consultaLista.situacao.situacao === "Cancelada" && selected.canceladas) {
            return true;
        }
        return false;
    }

    const data = consultaLista.filter(Check);

    // STATES PARA OS MODAIS

    const [showModalCancel, setShowModalCancel] = useState(false);
    const [showModalAppointment, setShowModalAppointment] = useState(false);
    const [showModalStethoscope, setShowModalStethoscope] = useState(false);

    const [showModal, setShowModal] = useState(false);

    // RETURN

    useEffect(() => {
        profileLoad()
        setSelected("Agendada")
        // GetConsultas()
    }, [])

    useEffect(() => {
        if( dataConsulta != '' ){
            ListarConsultas()
        }
        console.log(dataConsulta);
    }, [dataConsulta])

    return (

        <Container>
            <Header>

                <StatusBar translucent backgroundColor="transparent" />

                <BoxHome>

                    <ImagemHome source={require('../../assets/PatientHomeImage.png')} />

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
                        name={item.medicoClinica.medico.idNavigation.nome} 
                        age={`CRM: ${item.medicoClinica.medico.crm}`} 
                        routine={item.prioridade == "1" ? 'Rotina' : item.prioridade == '2' ? 'Exame' : 'Urgência'} 
                        url={image} 
                        status={item.situacao.situacao} 
                        onPressCancel={() => setShowModalCancel(true)} 
                        onPressAppointment={() => { navigation.navigate("ViewPrescription") }} 
                        onPressAppointmentCard={() => setShowModal(item.situacao.situacao === 'Agendada' ? true : false)} />}
                    
                    keyExtractor={item => item.id}
    
                    showsVerticalScrollIndicator={false}
    
                />

                    

            <Stethoscope onPress={() => {setShowModalStethoscope(true)}}>

                <FontAwesome6
                    name="stethoscope"
                    size={32}
                    color={"white"}
                />

            </Stethoscope>

            <CancellationModal
                visible={showModalCancel}
                setShowModalCancel={setShowModalCancel}
            />

            <ModalStethoscope
                navigation={navigation}
                visible={showModalStethoscope}
                setShowModalStethoscope={setShowModalStethoscope}
            />

            <PatientAppointmentModal
                navigation={navigation}
                visible={showModal}
                setShowModal={setShowModal}
            />

            {/* <Main />  */}

        </Container>

    )
}


