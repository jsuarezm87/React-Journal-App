import { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { firebase } from '../firebase/firebase-config';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {  

    firebase.auth().onAuthStateChanged( async (user) => {

      if (user?.uid) {
        dispatch( login( user.uid, user.displayName ) ); 
        setIsLoggedIn(true);        
        dispatch( startLoadingNotes(user.uid) );
      } else {
        setIsLoggedIn(false);
      }

      setChecking(false);
    });  
    
  }, [ dispatch, setChecking, setIsLoggedIn ]);

  if ( checking ) {
    return (
      <h1>Wait...</h1>
    )
  }
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/*" element={
              <PublicRoute isLoggedIn={isLoggedIn}>
                  <AuthRouter />              
              </PublicRoute>
            } 
        />

        <Route path="/*" element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                  <JournalScreen />              
              </PrivateRoute>
            } 
        />
        
      </Routes>
    </BrowserRouter>
  );
};

