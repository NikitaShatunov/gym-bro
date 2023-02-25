import React from 'react';
import { HomePage } from './pages/HomePage';
import { Header } from './components/Header';
import { Exercises } from './pages/Exercises';
import { Route, Routes } from 'react-router';
import './app.scss';
import { GroupChose } from './pages/GroupChoose';
import { Result } from './pages/Result';
import { Account } from './pages/Account';
function App() {
  return (
    <div >
        <Header />
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/exercises' element={<Exercises />}/>
        <Route path='/group' element={<GroupChose /> } />
        <Route path='/result' element={<Result /> } />
        <Route path='/account' element={<Account /> } />
      </Routes>
    </div>
  );
}

export default App;
