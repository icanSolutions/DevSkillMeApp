import React from 'react';
import WorkDomainsList from './components/WorkDomainsList';
import FetchDomain from './components/DomainFetcher';
import Header from './components/Header';
import { Box, Stack } from '@mui/material';
import Activate from './pages/Activate';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import ResetPasswordConfirmation from './pages/ResetPasswordConfirmation';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';


function App() {

  return (
    <Provider store={store}>
      <Router>
        <Routes>
        {/* <Stack direction={'column'} sx={{m:'0', p:'0'}} > */}
          {/* <Header /> */}
          <Route exact path='/' element={<WorkDomainsList />} />
          <Route exact path='/activate/:uid/:token' element={<Activate />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/reset-password' element={<ResetPassword />} />
          <Route exact path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirmation />} />
          {/* <WorkDomainsList /> */}
        {/* </Stack> */}
        </Routes>
      </Router>
    </Provider>
  )
}

export default App;
