import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import { Navegacao } from "./src/screens/Navegacao/Navegacao";
import { Login } from "./src/screens/Login/Login";
import { ForgotPassword } from "./src/screens/ForgotPassword/ForgotPassword";
import * as MediaLibrary from "expo-media-library"

import {
  useFonts,
  MontserratAlternates_500Medium,
  MontserratAlternates_600SemiBold,
  MontserratAlternates_700Bold,
} from "@expo-google-fonts/montserrat-alternates";
import {
  Quicksand_500Medium,
  Quicksand_600SemiBold,
} from "@expo-google-fonts/quicksand";
import { CheckEmail } from "./src/screens/CheckEmail/ChekEmail";
import { RedefinePassword } from "./src/screens/RedefinePassword/RedefinePassword";
import { CreateAccount } from "./src/screens/CreateAccount/CreateAccount";
import { PatientProfile } from "./src/screens/PatientProfile/PatientProfile";
import { MedicalRecords } from "./src/screens/MedicalRecords/MedicalRecords";
import { DoctorConsultation } from "./src/screens/DoctorConsultation/DoctorConsultation";
import { SelectDoctor } from "./src/screens/SelectDoctor/SelectDoctor";
import { SelectCLinic } from "./src/screens/SelectClinic/SelectClinic";
import { PatientConsultation } from "./src/screens/PatientConsultation/PatientConsultation";
import { SelectDate } from "./src/screens/SelectDate/SelectDate";
import { ConsultLocalization } from "./src/screens/ConsultLocalization/ConsultLocalization";
import { ViewPrescription } from "./src/screens/ViewPrescription/ViewPrescription";
import Splash from "./src/screens/Splash/Splash";
import { DoctorMain, Main } from "./src/components/Main/Main";
import Camera from "./src/components/Camera/Camera";
import { ViewPrescriptionDoc } from "./src/screens/ViewPrescription/ViewPrescriptionDoc";
import DoctorProfile from "./src/screens/DoctorProfile/DoctorProfile";
import PatientCam from "./src/components/Camera/PatientCamera";
import DoctorCam from "./src/components/Camera/DoctorCamera";
import { useEffect } from "react";

import { LogBox } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {

  LogBox.ignoreLogs(['Warning: ...']);

  let [fontsLoaded, fontError] = useFonts({
    MontserratAlternates_500Medium,
    MontserratAlternates_600SemiBold,
    MontserratAlternates_700Bold,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
  });

  useEffect(() => {
    (async () => {
      const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
      if (mediaStatus !== 'granted') {
        console.log('Permissão de mídia não concedida');
      }
    })();
  }, []);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    //Container - envolve toda a estrutura de navegação
    //Navigator - componente para a navegação
    //Screen - tela
    //name: nome da tela
    //component: componente que será chamado
    //options(title): título da tela

    <NavigationContainer>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >

        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ title: "Splash" }}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login" }}
        />

        <Stack.Screen
          name="Main"
          component={Main}
        />

        <Stack.Screen
          name="DoctorMain"
          component={DoctorMain}
        />


        {/* <Stack.Screen
          name="Navegação"
          component={Navegacao}
          options={{ title: "Navegação" }}
        /> */}


        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ title: "ForgotPassword" }}
        />

        <Stack.Screen
          name="CheckEmail"
          component={CheckEmail}
          options={{ title: "CheckEmail" }}
        />

        <Stack.Screen
          name="RedefinePassword"
          component={RedefinePassword}
          options={{ title: "RedefinePassword" }}
        />

        <Stack.Screen
          name="CreateAccount"
          component={CreateAccount}
          options={{ title: "CreateAccount" }}
        />

        <Stack.Screen
          name="PatientProfile"
          component={PatientProfile}
          options={{ title: "PatientProfile" }}
        />

        <Stack.Screen
          name="DoctorProfile"
          component={DoctorProfile}
          options={{ title: "DoctorProfile" }}
        />

        <Stack.Screen
          name="MedicalRecords"
          component={MedicalRecords}
          options={{ title: "MedicalRecords" }}
        />

        <Stack.Screen
          name="DoctorConsultation"
          component={DoctorConsultation}
          options={{ title: "DoctorConsultation" }}
        />

        <Stack.Screen
          name="SelectDoctor"
          component={SelectDoctor}
          options={{ title: "SelectDoctor" }}
        />

        <Stack.Screen
          name="SelectClinic"
          component={SelectCLinic}
          options={{ title: "SelectClinic" }}
        />

        <Stack.Screen
          name="PatientConsultation"
          component={PatientConsultation}
          options={{ title: "PatientConsultation" }}
        />

        <Stack.Screen
          name="SelectDate"
          component={SelectDate}
          options={{ title: "SelectDate" }}
        />
        <Stack.Screen
          name="ConsultLocalization"
          component={ConsultLocalization}
          options={{ title: "ConsultLocalization" }}
        />
        <Stack.Screen
          name="ViewPrescription"
          component={ViewPrescription}
          options={{ title: "ViewPrescription" }}
        />
        <Stack.Screen
          name="ViewPrescriptionDoc"
          component={ViewPrescriptionDoc}
          options={{ title: "ViewPrescriptionDoc" }}
        />
        <Stack.Screen
          name="Camera"
          component={Camera}
          options={{ title: "Camera" }}
        />
        <Stack.Screen
          name="PatientCamera"
          component={PatientCam}
          options={{ title: "PatientCamera" }}
        />
        <Stack.Screen
          name="DoctorCamera"
          component={DoctorCam}
          options={{ title: "DoctorCamera" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
