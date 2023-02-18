import React, { useContext, useEffect, useState } from 'react';
import { writeProductData } from '../firebase/database';
import {v4 as uuidv4} from 'uuid';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

//TODO: product를 객채로 관리하는 방법은 없으려나? 
export default function AddProduct() {
  const {user} = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(!user) {
      navigate("/");
    }
  },[])

  const [disabled, setDisabled] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [product, setProduct] = useState({
    imageUrl: "",
    name: "",
    price: "",
    category: "",
    description: "",
    option: "",
  });

  const handleChange = (name, value) => {
    setProduct((prev) => {
      return {...prev, [name]: value}
    })
  }

  const handleFileChange = (e) => {
    setProduct((prev) => {
      if(!e.target.files || e.target.files.length === 0) {
        return {...prev, imageUrl: null}
      }
      return {...prev, imageUrl: e.target.files[0]}
    });
  }

  const handleSubmit = async (e) => {
    try{
    const submitProduct = {...product};
    setDisabled(true);
    e.preventDefault();
    
    if(!validateProduct(submitProduct)){
      setDisabled(false);
      return;
    };
    //3. ✅ 전부 다 체크됐을경우 cloudinary에 요청 보내기 
    const data = await uploadImage(submitProduct.imageUrl);
    submitProduct.imageUrl = data.url;
    submitProduct.id = uuidv4();
    submitProduct.option = submitProduct.option.split(',');
    await writeProductData(submitProduct);

    setCompleted(true);
  } finally{
    setDisabled(false);
  }

  }

  useEffect(() => {
    if(completed) {
      setTimeout(() => {
        setCompleted(false);
      }, "3000");
    }
  }, [completed]);

  return (
    <main>
      <h1>새로운 제품 등록</h1>
      <div className={completed? "visible" : "hidden"}>✅ 새로운 제품이 등록되었습니다.</div>
      <form className='flex flex-col' onSubmit={handleSubmit} >
        {product.imageUrl && <img className='w-16 h-16' src={product.imageUrl && URL.createObjectURL(product.imageUrl)} alt="제품사진"></img>}
        <input type="file" name='imageUrl' onChange={handleFileChange}/>
        <input type="text" name="name" placeholder='제품명' min='0' value={product.name} onChange={e => handleChange(e.target.name, e.target.value)} required/>
        <input type="number" name="price" placeholder='가격' value={product.price} onChange={e => handleChange(e.target.name, e.target.value)} required/>
        <input type="text" name="category" placeholder='카테고리' value={product.category} onChange={e => handleChange(e.target.name, e.target.value)} required/>
        <input type="text" name="description" placeholder='제품 설명' value={product.description} onChange={e => handleChange(e.target.name, e.target.value)} required/>
        <input type="text" name="option" placeholder='옵션들(콤마(,)로 구분)' value={product.option} onChange={e => handleChange(e.target.name, e.target.value)} required/>
        <button type='submit' disabled={disabled}>제품 등록하기</button>
      </form>
    </main>
  );
}

function validateProduct(product){
    if(product.name.trim().length <= 0){
      alert('상품명을 입력해주세요');
      return false;
    }
    if(!product.price || product.price < 0){
      alert('가격을 다시 입력해주세요');
      return false;
    }
    if(product.category.trim().length <= 0){
      alert('카테고리 입력해주세요');
      return false;
    }
    if(product.description.trim().length <= 0){
      alert('상품설명을 입력해주세요');
      return false;
    }
    if(product.option.trim().length <= 0){
      alert('옵션을 입력해주세요');
      return false;
    }
    if(!product.imageUrl){
      alert('이미지 파일을 입력해주세요');
      return false;
    }
    return true;
    }

async function uploadImage(imageUrl) {
  const cloudName = 'dxy2ifpy4';
  const resourceType = 'image'; 
  const uploadPreset = 'cvei2irj';
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

  const formData = new FormData();
  formData.append('file', imageUrl);
  formData.append("upload_preset", uploadPreset);

  //TODO: axios로 바꾸기
  return fetch(url, {
    method: 'POST',
    body: formData
  })
  .then((response) => {
      return response.text();
    })
    .then((data) => {
      return JSON.parse(data);
    })
    .catch((error) => console.error(error));
}