import { ActivityIndicator, StyleSheet, View } from "react-native";
import { ContainerSecure, InputHigh, InputHighGrey, InputNumeric, InputProfile, InputText, InputTextLarge } from "./StyleInput";
import RNPickerSelect from 'react-native-picker-select';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import moment from "moment";

import { Entypo } from '@expo/vector-icons';
import { EyeContainer } from "../Container/StyleContainer";



// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
// import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

export function Input({
    placeholder,
    fieldValue,
    onChangeText,
    keyboardType,
    maxLength,
    placeholderTextColor,
    editable = true,
    secureTextEntry = false
}) {
    return (
        <InputText
            editable={editable}
            placeholder={placeholder}
            keyboardType={keyboardType}
            placeholderTextColor={placeholderTextColor}
            maxLength={maxLength}
            value={fieldValue}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
        />
    )
}

export function InputSecure({
    onPress,
    placeholder,
    fieldValue,
    onChangeText,
    keyboardType,
    maxLength,
    placeholderTextColor,
    editable = true,
    secureTextEntry = false
}) {
    return (
        <ContainerSecure>

            <EyeContainer onPress={onPress}>
                {secureTextEntry ? <Entypo name="eye" size={24} color="#49B3BA" /> : <Entypo name="eye-with-line" size={24} color="#49B3BA" />}
            </EyeContainer>

            <InputText
                editable={editable}
                placeholder={placeholder}
                keyboardType={keyboardType}
                placeholderTextColor={placeholderTextColor}
                maxLength={maxLength}
                value={fieldValue}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
            />
        </ContainerSecure>
    )
}




export const InputSelect = ({ setHoraSelecionada }) => {

    const pickerStyles = {
        inputIOS: style.pickerInput,
        inputAndroid: style.pickerInput,
        placeholder: { color: '#34898F', },
    };
    const placeholder = {
        label: 'Selecionar horário',
        value: null,
        color: '#34898F',
    };



    const dataAtual = moment().format('YYYY-MM-DD')

    const [arrayOptions, setArrayOptions] = useState(null)


    async function LoadOptions() {

        //Capturar a quantidade que faltam para 24h

        const horasRestantes = moment(dataAtual).add(24, 'hours').diff(moment(), "hours")

        // console.log(horasRestantes);

        //Criar um laço que rode a quantidade de horas

        const options = Array.from({ length: horasRestantes }, (_, index) => {
            let valor = new Date().getHours() + (index + 1)

            //Pra cada hora será uma nova option

            return {
                label: `${valor}:00`, value: `${valor}:00`
            }
        })

        setArrayOptions(options)

    }

    useEffect(() => {
        LoadOptions();
    }, [])


    return (
        <View style={{ width: 356 }}>

            {
                arrayOptions ? (

                    <RNPickerSelect
                        useNativeAndroidPickerStyle={false}
                        style={style}
                        Icon={() => {
                            return <FontAwesomeIcon icon={faCaretDown} color='#34898F' size={22} />
                        }}
                        placeholder={{
                            label: 'Selecione um valor',
                            value: null,
                            color: '#34898F'
                        }}
                        onValueChange={(value) => setHoraSelecionada(value)}
                        items={
                            arrayOptions
                        }
                    />

                ) :

                    <ActivityIndicator style={{ marginTop: 28 }} />
            }

        </View>
    )
}

const style = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        padding: 16,
        borderWidth: 2,
        borderColor: '#60BFC5',
        borderRadius: 5,
        color: '#34898F',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'MontserratAlternates_600SemiBold'
    },
    inputAndroid: {
        fontSize: 18,
        padding: 16,
        borderWidth: 2,
        borderColor: '#60BFC5',
        borderRadius: 5,
        color: '#34898F',
        alignItems: 'center',
        justifyContent: 'center',

        fontFamily: 'MontserratAlternates_600SemiBold'
    },
    iconContainer: {
        top: '31%',
        marginRight: 17
    },
    placeholder: {
        color: '#34898F',
    }
})


export function NumericInput({
    ref,
    caretHidden = true,
    placeholder,
    fieldValue,
    onChangeText,
    keyboardType = 'numeric',
    maxLength,
    placeholderTextColor,
    editable = true
}) {
    return (
        <InputNumeric
            ref={ref}
            caretHidden={caretHidden}
            editable={editable}
            placeholder={placeholder}
            keyboardType={keyboardType}
            placeholderTextColor={placeholderTextColor}
            maxLength={1}
            value={fieldValue}
            onChangeText={onChangeText}
        />
    )
}

export function ProfileInput({
    placeholder,
    fieldValue,
    onChangeText,
    keyboardType,
    maxLength,
    placeholderTextColor,
    editable = true
}) {
    return (
        <InputProfile
            editable={editable}
            placeholder={placeholder}
            keyboardType={keyboardType}
            placeholderTextColor={placeholderTextColor}
            maxLength={maxLength}
            value={fieldValue}
            onChangeText={onChangeText}
        />
    )
}

export function HighInput({
    placeholder,
    fieldValue,
    multiline,
    onChangeText,
    keyboardType,
    maxLength,
    placeholderTextColor,
    editable = true,
    secureTextEntry = false
}) {
    return (
        <InputHigh
            multiline={multiline}
            editable={editable}
            placeholder={placeholder}
            keyboardType={keyboardType}
            placeholderTextColor={placeholderTextColor}
            maxLength={maxLength}
            value={fieldValue}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
        />
    )
}

export function HighInputGrey({
    multiline,
    numberOfLines,
    placeholder,
    fieldValue,
    onChangeText,
    keyboardType,
    maxLength,
    placeholderTextColor,
    editable = true,
    secureTextEntry = false
}) {
    return (
        <InputHighGrey
            numberOfLines={numberOfLines}
            multiline={multiline}
            editable={editable}
            placeholder={placeholder}
            keyboardType={keyboardType}
            placeholderTextColor={placeholderTextColor}
            maxLength={maxLength}
            value={fieldValue}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
        />
    )
}

export function LargeInput({
    placeholder,
    fieldValue,
    onChangeText,
    keyboardType,
    maxLength,
    placeholderTextColor,
    editable = true,
    secureTextEntry = false
}) {
    return (
        <InputTextLarge
            editable={editable}
            placeholder={placeholder}
            keyboardType={keyboardType}
            placeholderTextColor={placeholderTextColor}
            maxLength={maxLength}
            value={fieldValue}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
        />
    )
}