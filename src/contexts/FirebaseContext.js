//* Account context
import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { firebaseConfig } from '../config';

// ----------------------------------------------------------------------

const ADMIN_EMAILS = ['demo@minimals.cc'];

if (!firebase.apps.length) {
  console.log(
    'THIS 🔨🔨🔨🔨🔨🔨🔨🔨 IS FIREBASE CONFIG from FirebaseContext.js :',
    firebaseConfig
  );
  firebase.initializeApp(firebaseConfig);
  firebase.firestore();
}

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

//! Below is similar to src/__gatsby/auth/SignUp
export const setUser = (user) => ({
  type: 'SET_USER',
  payload: { user },
});
//! Above is similar to src/__gatsby/auth/SignUp

const reducer = (state, action) => {
  if (action.type === 'INITIALISE') {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  }

  return state;
};

const AuthContext = createContext({
  ...initialState,
  method: 'firebase',
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  loginWithGoogle: () => Promise.resolve(),
  loginWithFaceBook: () => Promise.resolve(),
  loginWithTwitter: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(
    () =>
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const docRef = firebase.firestore().collection('users').doc(user.uid);
          console.log(
            ' 🚬🚬🚬🚬🚬🚬🚬🚬 docRef from FirebaseContext.js is as follows: ',
            docRef
          );
          docRef
            .get()
            .then((doc) => {
              if (doc.exists) {
                setProfile(doc.data());
              }
            })
            .catch((error) => {
              console.error(error);
            });

          dispatch({
            type: 'INITIALISE',
            payload: { isAuthenticated: true, user },
          }),
            console.log(
              ' 🚬🚬🚬🚬🚬🚬🚬🚬 This IS THE ALL IMPORTANT user from FirebaseContext.js inside the AuthProvider payload is as follows: ',
              user
            );
        } else {
          dispatch({
            type: 'INITIALISE',
            payload: { isAuthenticated: false, user: null },
          });
        }
      }),
    [dispatch]
  );

  const login = (email, password) =>
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(
          ' 🪜🪜🪜🪜🪜🪜🪜🪜🪜🪜🪜🪜🪜🪜🪜 The result.user.uid from FirebaseContext.js is as follows: ',
          result.user.uid
        );
        console.log(
          ' 🪜🪜🪜🪜🪜🪜🪜🪜🪜🪜🪜🪜🪜🪜🪜 The result.user.getIdTokenResult from FirebaseContext.js is as follows: ',
          result.user.getIdTokenResult(true)
        );
        console.log(
          ' 🪜🪜🪜🪜🪜🪜🪜🪜🪜🪜🪜🪜🪜🪜🪜 The result.user.IdTokenResult from FirebaseContext.js is as follows: ',
          result.user.IdTokenResult
        );
        console.log(
          ' 🪜🪜🪜🪜🪜🪜🪜🪜🪜🪜🪜🪜🪜🪜🪜 The result.user.token from FirebaseContext.js is as follows: ',
          result.user.token
        );
        console.log(
          ' 🪜🪜🪜🪜🪜🪜🪜🪜🪜🪜🪜🪜🪜🪜🪜 The result.user.token from FirebaseContext.js is as follows: ',
          result.user.token
        );
      })
      .catch((error) => {
        console.log('the error is as follows: ', error);
      });

  const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };

  const loginWithFaceBook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };

  const loginWithTwitter = () => {
    const provider = new firebase.auth.TwitterAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };

  const register = (email, password, firstName, lastName) => {
    console.log('got here');
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        firebase
          .firestore()
          .collection('users')
          .doc(res.user.uid)
          .set({
            uid: res.user.uid,
            email,
            displayName: `${firstName} ${lastName}`,
          });
      });
    console.log(
      'This 💣💣💣💣💣💣💣💣💣 is register functions uid from "src/contexts/FirebaseContext.js : "',
      uid
    );
  };

  const logout = async () => {
    await firebase.auth().signOut();
  };

  const resetPassword = async (email) => {
    await firebase.auth().sendPasswordResetEmail(email);
  };

  const auth = { ...state.user };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'firebase',
        user: {
          id: auth.uid,
          email: auth.email,
          photoURL: auth.photoURL || profile?.photoURL,
          displayName: auth.displayName || profile?.displayName,
          role: ADMIN_EMAILS.includes(auth.email) ? 'admin' : 'user',
          phoneNumber: auth.phoneNumber || profile?.phoneNumber || '',
          country: profile?.country || '',
          address: profile?.address || '',
          state: profile?.state || '',
          city: profile?.city || '',
          zipCode: profile?.zipCode || '',
          about: profile?.about || '',
          isPublic: profile?.isPublic || false,
        },
        login,
        register,
        loginWithGoogle,
        loginWithFaceBook,
        loginWithTwitter,
        logout,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
