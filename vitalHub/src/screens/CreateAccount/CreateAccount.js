import { ActivityIndicator, Alert, StatusBar } from 'react-native'
import { ButtonNormal } from '../../components/Button/Button'
import { Button, NormalButton } from '../../components/Button/StyleButton'
import { ButtonText } from '../../components/ButtonText/StyleButtonText'
import { Container, ScrollContainer, ScrollContainerB } from '../../components/Container/StyleContainer'
import { DescriptionPassword } from '../../components/Descriptions/Descriptions'
import { Input, InputSecure } from '../../components/Input/Input'
import { Cancel } from '../../components/Link/Link'
import { Title } from '../../components/Title/StyleTitle'
import { LogoCreateAccount } from '../../components/Images/StyleImages'
import { useState } from 'react'
import axios from 'axios'
import api from '../../services/Services'
import moment from 'moment'

import { mask, unMask } from "remask";

import { LogBox } from 'react-native';


export const CreateAccount = ({ navigation }) => {

    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [dataNascimento, setDataNascimento] = useState("");
    const [nome, setNome] = useState('');

    const [loading, setLoading] = useState(false);

    const [secureSenha, setSecureSenha] = useState(true);


    const handleCadastro = async () => {

        setLoading(true);

        const arrayDataNascimento = dataNascimento.split("/")

        const dataNascimentoFormatada = `${arrayDataNascimento[2]}-${arrayDataNascimento[1]}-${arrayDataNascimento[0]}`

        try {

            if (senha === confirmarSenha && senha.length >= 4) {

                const form = new FormData()

                form.append("nome", `${nome}`);
                form.append("email", `${email}`);
                // form.append("dataNascimento", `${moment(dataNascimento).format("YYYY-MM-DD")}`);
                form.append("senha", `${senha}`);
                form.append("idTipoUsuario", `9850203C-3FEF-4824-A75C-D446187B7A5D`);
                form.append("dataNascimento", `${dataNascimentoFormatada}`);

                const response = await api.post('/Pacientes', form, {

                    headers: {
                        "Content-Type": "multipart/form-data"
                    }

                }

                );

                if (response.data.success) {
                    throw new Error('Yeah');
                }

                //Após o cadastro, vai redirecionar para a tela de Login ( Se Deus quiser )

                setLoading(false)

                navigation.replace("Login");


            } else {

                Alert.alert(
                    'Erro ao efetuar o cadastro !!',
                    'As senhas não coincidem, a senha precisa ter 4 digitos ou mais !!!',
                    [
                      { text: 'Ok'},
                    ]
                  );

                setLoading(false)

            }
        } catch (error) {
            if (error.response) {
                setLoading(false)
                console.error('Erro ao cadastrar:', error.response.data);
            } else if (error.request) {
                console.error('Erro de requisição:', error.request);
                setLoading(false)
            } else {
                console.error('Erro ao configurar:', error.message);
                setLoading(false)
            }
        }
    };

    return (


        <ScrollContainerB>
            <Container>

                <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

                <LogoCreateAccount source={require('../../assets/VitalHub_Logo1.png')} />

                <Title>Criar Conta</Title>

                <DescriptionPassword description={"Preencha os campos para realizar seu cadastro."} />

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
                    placeholder={"Data de Nascimento"}
                    placeholderTextColor={'#49B3BA'}
                    onChangeText={text => setDataNascimento(text)}
                    keyboardType={'numeric'}
                    fieldValue={mask(dataNascimento, "99/99/9999")}

                />

                <InputSecure
                    onPress={() => { secureSenha ? setSecureSenha(false) : setSecureSenha(true) }}
                    placeholder={"Senha"}
                    placeholderTextColor={"#49B3BA"}
                    secureTextEntry={secureSenha}
                    fieldValue={senha}
                    onChangeText={(txt) => setSenha(txt)}
                />

                <InputSecure
                    onPress={() => { secureSenha ? setSecureSenha(false) : setSecureSenha(true) }}
                    placeholder={"Confirmar Senha"}
                    placeholderTextColor={"#49B3BA"}
                    secureTextEntry={secureSenha}
                    fieldValue={confirmarSenha}
                    onChangeText={(txt) => setConfirmarSenha(txt)}
                />

                <Button disabled={loading}
                    onPress={
                        () => {
                            if (nome && email && senha && dataNascimento != null) {
                                if (dataNascimento.length < 10) {
                                    Alert.alert(
                                        'Erro ao efetuar o cadastro !!',
                                        'A data de nascimento inserida é inválida !',
                                        [
                                          { text: 'Ok'},
                                        ]
                                      );
                                }
                                else {
                                    handleCadastro()
                                }
                            } else {
                                Alert.alert(
                                    'Erro ao efetuar o cadastro !!',
                                    'Preencha todos os campos !',
                                    [
                                      { text: 'Ok'},
                                    ]
                                  );
                            }
                        }
                    }>
                    {loading ? <ActivityIndicator /> : <ButtonText>Cadastrar</ButtonText>}
                </Button>

                <Cancel onPress={() => { navigation.navigate("Login", {email : email, senha: senha}) }} />
            </Container>
        </ScrollContainerB>


    )

}