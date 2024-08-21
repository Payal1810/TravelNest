import './App.css';
import {Link,Route,Routes} from 'react-router-dom'
import LoginComp from './Components/LoginComp';
import CustomerHome from './Components/CustomerHome';
import AdminHome from './Components/AdminHome';
import { useSelector } from 'react-redux';
import LogoutComp from './Components/LogoutComp';
import HomeComp from './Components/HomeComp';
import OwnerHome from './Components/OwnerHome';
import UserRegistration from './Components/UserRegistration';
import AddHotel from './Components/AddHotel';
import AddRoom from './Components/AddRoom';
import ViewCustomers from './Components/ViewCustomers';
import ViewOwners from './Components/ViewOwners';
import ApproveOwner from './Components/ApproveOwner';
import SearchHotel from './Components/SearchHotel';
import ViewHotel from './Components/ViewHotels';
import AddCar from './Components/AddCar';
import ViewBookings from './Components/ViewBookings';
import ViewRooms from './Components/ViewRooms';
import AddBookings from './Components/AddBookings';
import ApproveHotel from './Components/ApproveHotels';

function App() {

  const mystate=useSelector((state)=>state.logged)

  return(
    <div className='App'>
      <div style={{display:mystate.loggedIn?"none":"block"}}>
        <nav className="navbar navbar-expand-sm bg-light mb-3">
          <div className="container-fluid">
            <ul className="navbar-nav">
              <li className="navbar-item">
                <Link to="register" className="nav-link px-3">Register</Link>
              </li>
              <li className="navbar-item">
                <Link to="login" className="nav-link px-3">Login</Link>
              </li>
            </ul>
          </div>
        </nav>
      
      </div>
    

    <Routes>
      <Route path="/" element={<HomeComp/>}/>
      <Route path="/login" element={<LoginComp/>}/>
      <Route path="/register" element={<UserRegistration/>}/>
      <Route path="/customer_home" element={<CustomerHome/>}>
            <Route path="searchHotels" element={<SearchHotel/>}/>
            <Route path="viewRooms/:hid" element={<ViewRooms/>}/>
            <Route path="addBookings/:room_id" element={<AddBookings/>}/>
      </Route>
      <Route path="/owner_home" element={<OwnerHome/>} >
            <Route path="addHotel" element={<AddHotel/>}/>
            <Route path="addRoom" element={<AddRoom/>}/>
            <Route path="addCar" element={<AddCar/>}/>
            <Route path="viewHotels" element={<ViewHotel />}/>
      </Route>
      <Route path="/admin_home" element={<AdminHome/>}>
            <Route path="viewCustomers" element={<ViewCustomers/>}  />
            <Route path="viewOwners" element={<ViewOwners/>}/>
            <Route path="viewHotels" element={<ViewHotel/>}/>
            <Route path="approveHotels" element={<ApproveHotel/>}/>
            <Route path="approveOwner" element={<ApproveOwner/>}/>
            <Route path="viewBookings" element={<ViewBookings/>}/>
      </Route>
      <Route path="/logout" element={<LogoutComp/>}/>
      
    </Routes>
  </div>
  )
  
}

export default App;
