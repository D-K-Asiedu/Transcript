import './App.css';
import Dashboard from './User/DashBoard/DashBoard';
import { Layout } from 'antd';
import EnterContactCard from './User/EnterContactCard';
import EnterCodeCard from './User/EnterCodeCard';
import RequestFormCard from './User/RequestFormCard';
import AdminLogin from './Admin/AdminLogin';
import AdminConfirmPassword from './Admin/AdminConfirmPassword';
import AdminRegister from './Admin/AdminRegister';
import AdminDashboard from './Admin/DashBoard/AdminDashboard';

import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';

import { AuthContext } from './AuthContext';
import { useState } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const { Header } = Layout;

function App() {
  const [login, setLogin] = useState(false)
  const [token, setToken] = useState(null)
  const url = ''

  return (
    <AuthContext.Provider value={{login, setLogin, token, setToken}}>
    <Router>
        <div className="App">
          <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
              <h1 style={{ color: "white" }}>Transcripts</h1>
            </Header>
            <Switch>
              <Route exact path="/">
                <EnterContactCard />
              </Route>
              <Route exact path="/otp/:contact">
                <EnterCodeCard />
              </Route>

              <PrivateRoute path='/dashboard' exact component={() => (<Dashboard />)} />
              <PrivateRoute path='/request-transcript' exact component={() => (<RequestFormCard />)} />


              <Route exact path="/admin">
                <AdminLogin />
              </Route>
              <Route exact path="/confirm-password">
                <AdminConfirmPassword />
              </Route>
              <Route exact path="/admin/register">
                <AdminRegister />
              </Route>
              <Route exact path="/admin/dashboard/:type">
                <AdminDashboard />
              </Route>


            </Switch>
          </Layout>
        </div>
    </Router>
    </AuthContext.Provider>
  );
}

export default App;
