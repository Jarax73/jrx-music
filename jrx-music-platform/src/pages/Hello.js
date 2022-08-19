import React, {useEffect, useState} from 'react';
import axios from "axios";
import Menu from '../components/Menu';
import Player from '../components/Player';
import Playlists from '../components/Playlists';
import Aside from '../components/Aside';
import {RiSearch2Line} from 'react-icons/ri';


export default function Home() {
  return(
    <div className="container">
      <div className="categories" 
        style ={{
          border: '1px solid black',
          width: '100px',
          height: '100px',
          backgroundColor: 'black',
          borderRadius: '5px',
          }}>

      </div>
      <div className="categories" 
        style ={{
          border: '1px solid black',
          width: '100px',
          height: '100px',
          backgroundColor: 'black',
          borderRadius: '5px',
          }}>

      </div>
      <div className="categories" 
        style ={{
          border: '1px solid black',
          width: '100px',
          height: '100px',
          backgroundColor: 'black',
          borderRadius: '5px',
          }}>

      </div>
      <div className="categories" 
        style ={{
          border: '1px solid black',
          width: '100px',
          height: '100px',
          backgroundColor: 'black',
          borderRadius: '5px',
          }}>

      </div>
    </div>
  )
}