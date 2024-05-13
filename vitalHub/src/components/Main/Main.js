
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

import { Text } from "react-native";
import { BarContent, TextBar } from "./StyleMain";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { PatientProfile } from "../../screens/PatientProfile/PatientProfile";

import { PatientConsultation } from "../../screens/PatientConsultation/PatientConsultation";

import { DoctorConsultation } from "../../screens/DoctorConsultation/DoctorConsultation";
import { useEffect } from "react";
import { userDecodeToken } from "../../utils/Auth";
import DoctorProfile from "../../screens/DoctorProfile/DoctorProfile";

const bottomTab = createBottomTabNavigator();

export const Main = ({ navigation, route }) => {

  const routeParams = route.params

  async function ProfileLoad() {

    const token = await userDecodeToken();

    if (token) {
      // console.log(token)
    }
  }

  useEffect(() => {
    ProfileLoad()
  }, [])

  return (

    <bottomTab.Navigator
      initialRouteName="PatientConsultation"
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: "#FFFFFF", height: 60, elevation: 10, paddingTop: 3 },
        // tabBarInactiveBackgroundColor: "transparent",
        tabBarActiveBackgroundColor: "transparent",
        tabBarShowLabel: false,
        headerShown: false,

        tabBarIcon: ({ focused }) => {
          if (route.name === "PatientConsultation") {
            return (
              <BarContent
                tabBarActiveBackgroundColor={
                  focused ? "#ECF2FF" : "transparent"
                }
              >
                <FontAwesome name="calendar" size={18} color="#4E4B59" />
                {focused && <TextBar>Agenda</TextBar>}
              </BarContent>
            );
          }

          {
            return (
              <BarContent
                tabBarActiveBackgroundColor={
                  focused ? "#ECF2FF" : "transparent"
                }
              >
                <FontAwesome5 name="user-circle" size={22} color="#4E4B59" />
                {focused && <TextBar>Perfil</TextBar>}
              </BarContent>
            );
          }
        },
      })}
    >

      {/* Depois fazer ternário para levar para home doutor ou ImagemPerfilPaciente

    ? */}

      <bottomTab.Screen
        name="PatientConsultation"
        component={PatientConsultation}
      />

      {/* : */}

      <bottomTab.Screen
        name="PatientProfile"
      >

        {(props) => <PatientProfile navigation={navigation} route={route} />}

      </bottomTab.Screen>

    </bottomTab.Navigator>
  );
};

export const DoctorMain = ({ navigation, route }) => {

  return (

    <bottomTab.Navigator
      initialRouteName="DoctorConsultation"
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: "#FFFFFF", height: 60, elevation: 10, paddingTop: 3 },
        // tabBarInactiveBackgroundColor: "transparent",
        tabBarActiveBackgroundColor: "transparent",
        tabBarShowLabel: false,
        headerShown: false,

        tabBarIcon: ({ focused }) => {
          if (route.name === "DoctorConsultation") {
            return (
              <BarContent
                tabBarActiveBackgroundColor={
                  focused ? "#ECF2FF" : "transparent"
                }
              >
                <FontAwesome name="calendar" size={18} color="#4E4B59" />
                {focused && <TextBar>Agenda</TextBar>}
              </BarContent>
            );
          }

          {
            return (
              <BarContent
                tabBarActiveBackgroundColor={
                  focused ? "#ECF2FF" : "transparent"
                }
              >
                <FontAwesome5 name="user-circle" size={22} color="#4E4B59" />
                {focused && <TextBar>Perfil</TextBar>}
              </BarContent>
            );
          }
        },
      })}
    >

      {/* Depois fazer ternário para levar para home doutor ou ImagemPerfilPaciente

    ? */}

      <bottomTab.Screen
        name="DoctorConsultation"
        component={DoctorConsultation}
      />

      {/* : */}

      <bottomTab.Screen
        name="DoctorProfile">
        {(props) => <DoctorProfile
          route={route}
          navigation={navigation}
        />}
      </bottomTab.Screen>

    </bottomTab.Navigator>
  );
};

