import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import { useSelector } from "react-redux";
import { getAuthStatus } from './store/users';

export function App() {
  const isAuthenticated = useSelector(getAuthStatus());

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Main /> : <Navigate to='/login' />}
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to='/' /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to='/' /> : <Register />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </Router>
  )
}