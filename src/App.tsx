import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  IonIcon,
  IonLabel,
  IonTabBar,  
  IonTabButton,
} from '@ionic/react';
import React from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { globeOutline, flagOutline, informationCircleOutline} from 'ionicons/icons';
import Global from './pages/Global';
import Countries from './pages/Countries';
import About from './pages/About';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Flag */
import '../node_modules/flag-icon-css/css/flag-icon.css'

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/global" component={Global} exact={true} />
          <Route path="/countries" component={Countries} exact={true} />
          <Route path="/about" component={About} />
          <Route path="/" render={() => <Redirect to="/global" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="global" href="/global">
            <IonIcon icon={globeOutline} />
            <IonLabel>Global</IonLabel>
          </IonTabButton>
          <IonTabButton tab="countries" href="/countries">
            <IonIcon icon={flagOutline} />
            <IonLabel>Countries</IonLabel>
          </IonTabButton>
          <IonTabButton tab="about" href="/about">
            <IonIcon icon={informationCircleOutline} />
            <IonLabel>About</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
