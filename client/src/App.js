import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router';
import './App.css';
import { setCompaniesThunk } from './company/redux/company-thunk';
import AuthPage from './pages/AuthPage/AuthPage';
import MainPage from './pages/MainPage/MainPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import { getUserThunk } from './user/redux/user-thunk';
import './common/popup/Popup.css'
import 'reactjs-popup/dist/index.css';


function App(props) {
  
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getUserThunk())
    dispatch(setCompaniesThunk())
    // eslint-disable-next-line
  },[])

  return (
    <div>
     
    <Switch>
      <Route path='/profile' render={()=>  <div><ProfilePage/> </div> }/>
      <Route path='/auth' render={()=>  <AuthPage/>}/>
      <Route path='/' render={()=>  <div><MainPage/></div> }/>

    </Switch>

    </div>
  );
}

export default App;
