import React, { useEffect } from 'react';
import Login from './components/Login';
import { reducerCases } from './apis/Constants';
import { useStateProvider } from './apis/StateProvider';
import Menu from './components/Menu';

export default function App() {
// const [{ token }, dispatch] = useStateProvider();
//   useEffect(() => {
//     const hash = window.location.hash;
//     if (hash) {
//       const token = hash.substring(1).split("&")[0].split("=")[1];
//       console.log(token);
//       dispatch({ action: reducerCases.SET_TOKEN, token});
//     } 
//   }, [token, dispatch]);
  return (
    <div>
      <Login />
      <Menu />
    </div>
  )
}