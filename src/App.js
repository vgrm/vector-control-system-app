import './App.css';
import { store } from './actions/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import NavigationMenu from './components/Navigation/NavigationMenu';
import Body from './components/Navigation/Body';
import { ToastProvider } from "react-toast-notifications";
import { Container } from "@material-ui/core";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>

        <ToastProvider autoDismiss={true} placement='bottom-right'>
          <Container maxWidth="lg">
            <NavigationMenu />

            <Body />

          </Container>
        </ToastProvider>
      </BrowserRouter>
    </Provider>

  );
}

export default App;
