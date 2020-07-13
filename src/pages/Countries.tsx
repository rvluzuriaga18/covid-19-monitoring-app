import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonAlert,
  IonLoading,
  IonList,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonFooter
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import "./Countries.css";

const Countries: React.FC = () => {

  const [filteredCountries, setFilteredCountries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [countryCodes, setCountryCodes] = useState([{ code: '', name: '' }]);
  const [dataLoaded, setDataLoaded] = useState(false);
 
  const [showAlertBox, setAlertBoxValue] = useState(false);
  const [showAlertMsg, setAlertMsg] = useState("");
  const [showLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!dataLoaded) {
      const tempCountryCode = window.localStorage.getItem("countries");
      const codes: [] = (tempCountryCode != null) ? JSON.parse(tempCountryCode) : [];
      setCountryCodes(codes);
      getCountriesInfo();
      setDataLoaded(true);
    }
  });

  function getCountriesInfo() {
    setLoading(true);
    fetch("https://coronavirus-19-api.herokuapp.com/countries")
      .then((result) => result.json())
      .then((result: any) => {
        setCountries(result.filter((data: any) => data.country !== "World"));
        setFilteredCountries(result.filter((data: any) => data.country !== "World"));
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

  function searchByCountryName(country: string) {
    const query = country.toLowerCase();
    let filteredValues = countries.filter(
      (c: any) => c.country.toLowerCase().indexOf(query) >= 0
    );
    setFilteredCountries(filteredValues);
  }

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>COVID-19 Updates by Country</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {filteredCountries.map((value: any, i: any) => (
            <IonItem key={i}>
              <IonLabel>
                <h2>{value.country}</h2>
                <p>Cases: {Number(value.cases).toLocaleString()}</p>
                <p>Active: {Number(value.active).toLocaleString()} </p>
                <p>New Cases: {Number(value.todayCases).toLocaleString()}</p>
                <p>Deaths: {Number(value.deaths).toLocaleString()}</p>
                <p>New Deaths: {Number(value.todayDeaths).toLocaleString()} </p>
                <p>Critical: {Number(value.critical).toLocaleString()}</p>
                <p>Recovered: {Number(value.recovered).toLocaleString()}</p>
              </IonLabel>
              <IonThumbnail>
                <div className={"flag flag-icon flag-icon-" + countryCodes.filter((data: any) => data.name === value.country)[0]?.code.toLowerCase()}></div>
              </IonThumbnail>
            </IonItem>
          ))}
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
          message="Fetching data from World Meters Info..."
        />
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonSearchbar
            placeholder="Search Country Name"
            onIonInput={(e: any) => searchByCountryName(e.target.value)}
          />
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Countries;
