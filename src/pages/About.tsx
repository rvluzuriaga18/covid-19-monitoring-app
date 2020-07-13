import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import {
  informationCircleOutline,
  logoAndroid,
  logoGithub,
  logoIonic,
  logoReact,
  logoCapacitor,
} from "ionicons/icons";
import "./About.css";
import { Capacitor } from "@capacitor/core";

const About: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>About</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonIcon icon={informationCircleOutline} slot="start" />
            <IonLabel>
              COVID-19 Info by:{" "}
              <a href="https://www.worldometers.info/coronavirus/">
                Worldometers
              </a>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={logoGithub} slot="start" />
            <IonLabel>
              COVID-19 API by:{" "}
              <a href="https://github.com/javieraviles/covidAPI">
                Javier Aviles
              </a>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={logoAndroid} slot="start" />
            <IonLabel>
              Mobile App by:{" "}
              <a href="https://github.com/rvluzuriaga18">Ralf Von Luzuriaga</a>
            </IonLabel>
          </IonItem>
          <IonItem lines="none"></IonItem>
          <IonItem className="ion-text-center">
            <IonLabel>
              <h6>Development Tools:</h6>
            </IonLabel>
          </IonItem>
          <IonItem>
          <IonGrid>
            <IonRow>
              <IonCol className="ion-text-center">
                <IonIcon icon={logoIonic} color="medium" />
                <IonLabel>
                  <h6>Ionic</h6>
                </IonLabel>
              </IonCol>
              <IonCol className="ion-text-center">
                <IonIcon icon={logoReact} color="medium" />
                <IonLabel>
                  <h6>React</h6>
                </IonLabel>
              </IonCol>
              <IonCol className="ion-text-center">
                <IonIcon icon={logoCapacitor} color="medium" />
                <IonLabel>
                  <h6>Capacitor</h6>
                </IonLabel>
              </IonCol >
              <IonCol className="ion-text-center">
                <IonIcon icon={logoAndroid}  color="medium"/>
                <IonLabel>
                  <h6>Android</h6>
                </IonLabel>
              </IonCol>
            </IonRow>
          </IonGrid>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default About;
