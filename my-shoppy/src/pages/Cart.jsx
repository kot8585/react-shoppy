import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

export default function Cart() {
  const {user} = useUserContext;
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

