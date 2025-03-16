import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import store from "./redux/store"

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation/>
      <StatusBar style="auto" />
    </Provider>
  );
}