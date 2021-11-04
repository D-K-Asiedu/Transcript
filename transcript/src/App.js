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
import AdminPrivateRoute from './routes/AdminPrivateRoutes';

import useLocalStorage from './CustomHooks/useLocalStorage';

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
  // const [login, setLogin] = useState(false)
  // const [token, setToken] = useState(null)
  // const [adminLogin, setAdminLogin] = useState(false)
  // const [admin, setAdmin] = useState(null)
  
  const [login, setLogin] = useLocalStorage("login", false)
  const [token, setToken] = useLocalStorage("token",null)
  const [admin, setAdmin] = useLocalStorage("admin",null)
  const [adminLogin, setAdminLogin] = useLocalStorage("adminLogin",false)
  const url = 'http://127.0.0.1:5000'

  return (
    <AuthContext.Provider value={{url,login, setLogin, token, setToken, admin, setAdmin, adminLogin, setAdminLogin}}>
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
              <Route exact path="/set-password/:id">
                <AdminConfirmPassword />
              </Route>
              <Route exact path="/admin/register">
                <AdminRegister />
              </Route>

              <AdminPrivateRoute path='/admin/dashboard/:type' exact component={() => (<AdminDashboard />)} />


            </Switch>
          </Layout>
        </div>
    </Router>
    </AuthContext.Provider>
  );
}

export default App;
