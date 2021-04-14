import logo from './logo.svg';
import './App.css';
import { store } from './actions/store';
import { Provider } from 'react-redux';
import ProjectSet from './components/Project/ProjectSet';
import ProjectSetList from './components/Project/ProjectSetList';

function App() {
  return (
    <Provider store={store}>
      <ProjectSetList></ProjectSetList>
    </Provider>

  );
}

export default App;
