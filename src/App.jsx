import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Main from './pages/main';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import { useSelector } from "react-redux";
import { getAuthStatus } from './store/session';
import FinalTest from './pages/FinalTest';

export function App() {
  const isAuthenticated = useSelector(getAuthStatus());

  return (
    <div className="m-auto max-w-screen-2xl flex-auto w-full items-center">

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
            path="/exam"
            element={<FinalTest />}
          />
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </Router>
    </div>
  )
}