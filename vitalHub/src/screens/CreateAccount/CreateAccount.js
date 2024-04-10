import { StatusBar } from 'react-native'
import { ButtonNormal } from '../../components/Button/Button'
import { NormalButton } from '../../components/Button/StyleButton'
import { ButtonText } from '../../components/ButtonText/StyleButtonText'
import { Container } from '../../components/Container/StyleContainer'
import { DescriptionPassword } from '../../components/Descriptions/Descriptions'
import { Input } from '../../components/Input/Input'
import { Cancel } from '../../components/Link/Link'
import { Title } from '../../components/Title/StyleTitle'
import { LogoCreateAccount } from '../../components/Images/StyleImages'
import { useState } from 'react'
import axios from 'axios'
import api from '../../services/Services'


export const CreateAccount = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');

    const handleCadastro = async () => {
        try {
            const response = await api.post('/Pacientes' , {
                email: email,
                senha: senha,
                nome: nome,
                idTipoUsuario: 'F5856CC9-9922-433E-8297-C1A788D92D9F'
            });

            if (response.data.success) {
                throw new Error('Yeah');
            }

            //Após o cadastro, vai redirecionar para a tela de Login ( Se Deus quiser )

            navigation.replace("Login");
        } catch (error) {
            if (error.response) {
                console.error('Erro ao cadastrar:', error.response.data);
            } else if (error.request) {
                console.error('Erro de requisição:', error.request);
            } else {
                console.error('Erro ao configurar:', error.message);
            }
        }
    };

    return (

        <Container>

            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

            <LogoCreateAccount source={require('../../assets/VitalHub_Logo1.png')} />

            <Title>Criar Conta</Title>

            <DescriptionPassword description={"Insira seu endereço de e-mail e senha para realizar seu cadastro."} />

            <Input
                placeholder={"Nome"}
                placeholderTextColor={'#49B3BA'}
                onChangeText={text => setNome(text)}
                value={nome}
            />
            <Input
                placeholder={"Email"}
                placeholderTextColor={'#49B3BA'}
                onChangeText={text => setEmail(text)}
                value={email}
            />
            <Input
                placeholder={"Senha"}
                placeholderTextColor={'#49B3BA'}
                secureTextEntry={true}
                onChangeText={text => setSenha(text)}
                value={senha}
            />
             {/* <Input
                placeholder={"Confirmar Senha"}
                placeholderTextColor={'#49B3BA'}
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                value={password}
            /> */}

            <ButtonNormal text={"Cadastrar"} onPress={() => handleCadastro()}/>

            <Cancel onPress={() => { navigation.navigate("Login") }} />

        </Container>
    )

}