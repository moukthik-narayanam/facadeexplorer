import logo from './logo.svg';
import './App.css';
import { timelinesConfig } from './slideConfig'
import TimelineIntroPage from './components/TimelineIntroPage';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Timeline from './components/Timeline'

function App() {
  return (
    <div className="App">
      <TimelineIntroPage />
      {/* {
        timelinesConfig.map((timeline)=><Timeline {...timeline}/>)
      } */}
    </div>
  );
}

export default App;
