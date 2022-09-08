import axios from 'axios';
import React, { createContext, useState, useEffect, useCallback } from 'react'
import { toast } from 'react-toastify';
import useAuth from './component/API/AuthApi';
import ProductApi from './component/API/ProductApi';
import CategoryApi from './component/API/CategoryAPi';

export const GlobalContext = createContext();

function DataProvider(props) {

  const [token,setToken] = useState(null)

  // to read access token after login
  const initToken = useCallback(() => {
    if(localStorage.getItem('loginToken')){
      axios.get(`/api/v1/auth/refreshToken`)
    .then(res => {
      setToken(res.data.accessToken)
    }).catch(err => toast.error(err.response.data.msg))
      }
  },[])

  useEffect(() => {
    initToken()
  },[initToken])

  const data = {
    token:[token,setToken],
    authApi: useAuth(token),
    productApi:ProductApi(),
    categoryApi:CategoryApi(token)
  }
  return (
    <GlobalContext.Provider value={data}>
      {props.children}
    </GlobalContext.Provider>
  )
}

export default DataProvider