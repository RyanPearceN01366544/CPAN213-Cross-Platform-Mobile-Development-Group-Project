import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import store from "./redux/store"
import AppNavigator from './AppNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator/>
      <StatusBar style="auto" />
    </Provider>
  );
}