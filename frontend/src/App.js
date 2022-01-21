import {Routes, Route} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
// import {Container} from 'react-bootstrap'
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Header from './components/Header';
import Footer from './components/Footer';
import DashboardScreen from './screens/DashboardScreen';
import DashboardSellerScreen from './screens/DashboardSellerScreen';
import NewHotelScreen from './screens/NewHotelScreen';
import StripePaymentScreen from './screens/StripePaymentScreen'
import StripeDetailsScreen from './screens/StripeDetailsScreen';
import PersonalDetailsScreen from './screens/PersonalDetailsScreen';
import StripeCallbackScreen from './screens/StripeCallbackScreen';


function App() {
  return (
    <div className='body1'>
    <Header />
    <div className='fluid body'>
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={<RegisterScreen />} />
        <Route path='/dashboard' element={<DashboardScreen />} />
        <Route path='/dashboard/seller' element={<DashboardSellerScreen/>} />
        <Route path='/hotels/new' element={<NewHotelScreen/>} />
        <Route path='/user/stripe-account/:id' element={<StripePaymentScreen/>} />
        <Route path='/user/stripe-account/details/:id' element={<StripeDetailsScreen/>} />
        <Route path='/user/personal/details/:id' element={<PersonalDetailsScreen/>} />
        <Route path='/stripe-callback/:id' element={<StripeCallbackScreen/>} />
      </Routes>
    </div>
    <Footer />
    </div>
  );
}

export default App;
