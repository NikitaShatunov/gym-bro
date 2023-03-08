import React from 'react';
import { HomePage } from './pages/HomePage';
import { Header } from './components/Header';
import { Exercises } from './pages/Exercises';
import { Route, Routes, useLocation } from 'react-router';
import './app.scss';
import { GroupChose } from './pages/GroupChoose';
import { Result } from './pages/Result';
import { Account } from './pages/Account';
import { SignUp } from './pages/SignUp';
import { AccountSettings } from './pages/account/AccountSettings';
import { Water } from './pages/account/Water';
import { Pararms } from './pages/account/Params';
import { Fat } from './pages/account/Fat';
import { Height } from './pages/account/Height';
import { Weight } from './pages/account/Weight';

function App() {
  const location = useLocation();
  return (
    <div >
        {location.pathname !== '/' && <Header />}
      <Routes>
        <Route path='/home' element={<HomePage />}/>
        <Route path='/exercises' element={<Exercises />}/>
        <Route path='/group' element={<GroupChose /> } />
        <Route path='/result' element={<Result /> } />
        <Route path='/account' element={<Account /> } />
        <Route path='/' element={<SignUp />} />
        <Route path='/settings' element={<AccountSettings />} />
        <Route path='/weight' element={<Weight />} />
        <Route path='/height' element={<Height />} />
        <Route path='/params' element={<Pararms />} />
        <Route path='/fat' element={<Fat />} />
        <Route path='/water' element={<Water />} />
      </Routes>
    </div>
  );
}

export default App;
