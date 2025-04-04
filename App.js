import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import store from "./redux/store"
import AppNavigator from './AppNavigator';
import { notificationsSetup } from './components/NotificationsHandler';

export default function App() {
  notificationsSetup();
  return (
    <Provider store={store}>
      <AppNavigator/>
      <StatusBar style="auto" />
    </Provider>
  );
}