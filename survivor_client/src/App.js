import React, { Component } from 'react'
import { PersistGate } from 'redux-persist/integration/react'
//redux
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'
import { SET_AUTHENTICATED } from './redux/types'
import { logoutUser, getUserData } from './redux/actions/userActions'

import './App.css'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

import jwtDecode from 'jwt-decode'
import themeFile from './util/theme'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import home from './pages/home'
// import user from './pages/user'
import login from './pages/login'
import archive from './pages/archive'
import signup from './pages/signup'
import admin from './pages/admin'
import albumPage from './pages/albumPage'
import Navbar from './components/layout/Navbar'
import AuthRoute from './util/AuthRoute'
import axios from 'axios'
import AuthRoute2 from './util/AuthRoute2'
import Footer from './components/layout/Footer'

// axios.defaults.baseURL =
//   'https://us-central1-albumsurvivor.cloudfunctions.net/api'

const theme = createMuiTheme(themeFile)

const token = localStorage.FBIdToken

if (token) {
  const decodedToken = jwtDecode(token)
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser())
    window.location.href = '/login'
  } else {
    store.dispatch({ type: SET_AUTHENTICATED })
    axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getUserData())
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <PersistGate persistor={persistor}>
              <Navbar />
              <div className='container'>
                <Switch>
                  <Route exact path='/' component={home} />
                  <Route exact path='/archive' component={archive} />
                  <AuthRoute exact path='/login' component={login} />
                  <AuthRoute exact path='/signup' component={signup} />
                  <AuthRoute2 exact path='/admin' component={admin} />
                  <AuthRoute2
                    exact
                    path='/albums/:albumId'
                    component={albumPage}
                  />
                </Switch>
              </div>
              <Footer />
            </PersistGate>
          </Router>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

export default App
