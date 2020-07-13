import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonAlert,
  IonLoading,
  IonText
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { Plugins, Capacitor } from "@capacitor/core";
import "./Global.css";

const Global: React.FC = () => {
  const [covid19Cases, setCovid19Cases] = useState("");
  const [deaths, setDeathValues] = useState("");
  const [recovered, setRecoveredValues] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);

  const [showAlertBox, setAlertBoxValue] = useState(false);
  const [showAlertMsg, setAlertMsg] = useState("");
  const [showLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!dataLoaded) {
      getGlobalInfo();
      getCountries();
      setDataLoaded(true);
    }
  });

  function getGlobalInfo() {
    setLoading(true);
    fetch("https://coronavirus-19-api.herokuapp.com/all")
      .then((result) => result.json())
      .then((result: any) => {
        setCovid19Cases(
          result != null && result.cases != null
            ? Number(result.cases).toLocaleString()
            : ""
        );
        setDeathValues(
          result != null && result.deaths != null
            ? Number(result.deaths).toLocaleString()
            : ""
        );
        setRecoveredValues(
          result != null && result.recovered != null
            ? Number(result.recovered).toLocaleString()
            : ""
        );
      })
      .finally(() => processSuccessResponse())
      .catch(() => processFailedRequest());
  }

  function processSuccessResponse() {
    setLoading(false);
  }

  function processFailedRequest() {
    setLoading(false);
    setAlertMsg(
      "Unable to fetch data from World Meters Info. Please check your internet connection."
    );
    setAlertBoxValue(true);
  }

  function getCountries(){
    fetch("../assets/countries.json")
      .then((result) => result.json())
      .then((result) => {
        window.localStorage.setItem("countries", JSON.stringify(result));
    });
  }

  useEffect(() => {
    if (Capacitor.isNative) {
      Plugins.App.addListener("backButton", (e) => {
        if (window.location.pathname === "/global") Plugins.App.exitApp();
      });
    }
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Global COVID-19 Updates</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonListHeader>
            <IonText color="secondary"><h5>Coronavirus Cases:</h5> </IonText>
          </IonListHeader>
          <IonItem>
            <IonLabel>{covid19Cases}</IonLabel>
          </IonItem>
        </IonList>
        <IonList>
          <IonListHeader>
            <IonText color="danger"><h5>Deaths:</h5></IonText>
          </IonListHeader>
          <IonItem>
            <IonLabel>{deaths}</IonLabel>
          </IonItem>
        </IonList>
        <IonList>
          <IonListHeader>
            <IonText color="success"><h5>Recovered:</h5></IonText>
          </IonListHeader>
          <IonItem>
            <IonLabel>{recovered}</IonLabel>
          </IonItem>
        </IonList>
        <IonAlert
          isOpen={showAlertBox}
          onDidDismiss={() => setAlertBoxValue(false)}
          header={"Message"}
          message={showAlertMsg}
          buttons={["Ok"]}
          cssClass="ion-text-center ion-alert-custom-class"
        />
        <IonLoading
          cssClass="ion-text-center"
          isOpen={showLoading}
          message={"Fetching data from World Meters Info..."}
        />
      </IonContent>
    </IonPage>
  );
};

export default Global;
