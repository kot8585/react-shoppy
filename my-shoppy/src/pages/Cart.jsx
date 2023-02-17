import React, { useContext, useEffect } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function Cart() {
  const {user} = useContext(UserContext);
  const navigate = useNavigate();

  //TODO: 로그인하고 나서 새로고침 하면 안됌 
  useEffect(() => {
    if(!user) {
      //TODO: redirect로???? 
      navigate("/"); //permission deny 안보내줘도 되나?
    }
  },[])
  
  return (
    <div>
      카트 페이지
    </div>
  );
}

