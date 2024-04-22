import { StatusBar } from "react-native"
import { ButtonNormal } from "../../components/Button/Button"
import { Container } from "../../components/Container/StyleContainer"
import { DescriptionPassword } from "../../components/Descriptions/Descriptions"
import { Input } from "../../components/Input/Input"
import { Logo, Seta } from "../../components/Images/StyleImages"
import { Title } from "../../components/Title/StyleTitle"
import { useState } from "react"
import api from "../../services/Services"


export const ForgotPassword = ({ navigation }) => {

    const [email, setEmail] = useState('edufeli2005@gmail.com');

    async function sendEmail() {
        try {
            await api.post(`/RecuperarSenha?email=${email}`);
    
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <Container>

            {/* <Seta source={require('../../assets/Seta.png')} /> */}

            <Logo source={require('../../assets/VitalHub_Logo1.png')} />

            <Title>Recuperar senha</Title>

            <DescriptionPassword description={"Digite abaixo seu email cadastrado que enviaremos um link para recuperação de senha"} />

            <Input
                placeholder={"E-mail"}
                fieldValue={email}
                onChangeText={x => {setEmail(x)}}
                placeholderTextColor={'#49B3BA'}
            />

            <ButtonNormal text={"Continuar"} onPress={() => {sendEmail(), navigation.navigate('CheckEmail', {emailRecuperacao : email})}} />


        </Container>

    )

}