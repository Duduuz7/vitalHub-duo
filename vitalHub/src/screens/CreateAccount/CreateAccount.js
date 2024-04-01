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


export const CreateAccount = ({ navigation }) => {

    return (

        <Container>

            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

            <LogoCreateAccount source={require('../../assets/VitalHub_Logo1.png')} />

            <Title>Criar Conta</Title>

            <DescriptionPassword description={"Insira seu endereço de e-mail e senha para realizar seu cadastro."} />

            <Input
                placeholder={"Nome"}
                placeholderTextColor={'#49B3BA'}
            />
             <Input
                placeholder={"CPF"}
                placeholderTextColor={'#49B3BA'}
            />
            <Input
                placeholder={"RG"}
                placeholderTextColor={'#49B3BA'}
            />
            <Input
                placeholder={"Data de Nascimento"}
                placeholderTextColor={'#49B3BA'}
            />
            <Input
                placeholder={"CEP"}
                placeholderTextColor={'#49B3BA'}
            />
            <Input
                placeholder={"Endereço"}
                placeholderTextColor={'#49B3BA'}
            />
            <Input
                placeholder={"Cidade"}
                placeholderTextColor={'#49B3BA'}
            />
            <Input
                placeholder={"Email"}
                placeholderTextColor={'#49B3BA'}
            />
            <Input
                placeholder={"Senha"}
                placeholderTextColor={'#49B3BA'}
                secureTextEntry={true}
            />

            <ButtonNormal text={"Cadastrar"} />

            <Cancel onPress={() => { navigation.navigate("Login") }} />

        </Container>
    )

}