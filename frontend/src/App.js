import {Routes, Route} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import {Container} from 'react-bootstrap'
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Header from './components/Header';
import Footer from './components/Footer';


function App() {
  return (
    <div className='body1'>
    <Header />
    <Container fluid className='body'>
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={<RegisterScreen />} />
      </Routes>
    </Container>
    <Footer />
    </div>
  );
}

export default App;
