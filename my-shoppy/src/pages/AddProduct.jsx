import React, { useEffect, useState } from 'react';
import { writeProductData } from '../api/database';
import { uploadImage } from '../api/uploader';

export default function AddProduct() {
  const [disabled, setDisabled] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [product, setProduct] = useState({});

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
      return {...prev, imageUrl: e.target.files[0]};
    });
  }
 
  const handleSubmit = async (e) => {
    try {
    setDisabled(true);
    e.preventDefault();
    
    if(!validateProduct(product)){
      setDisabled(false);
      return;
    };
    const data = await uploadImage(product.imageUrl);
    await writeProductData(product, data.url);
    setCompleted(true);
    window.alert('제품 업로드 완료');
  } catch (e){
    console.log('error 발생!', e);
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
      <h1 className='text-center p-2 text-xl font-bold'>새로운 제품 등록</h1>
      <div className={`p-2 text-zinc-400 text-center ${completed? "visible" : "hidden"}`}>✅ 새로운 제품이 등록되었습니다.</div>
      <form className='flex flex-col gap-2 px-4 py-2' onSubmit={handleSubmit} >
        {product?.imageUrl && 
        (<img 
          className='w-1/6 h-1/3 mx-auto' 
          src={URL.createObjectURL(product.imageUrl)} 
          alt="제품사진"/>
        )}
        <input className='border border-grey p-3' type="file" name='imageUrl' accept='image/*' required onChange={handleFileChange}/>
        <input className='border border-grey p-3' type="text" name="name" placeholder='제품명' min='0' value={product.name ?? ''} onChange={e => handleChange(e.target.name, e.target.value)} required/>
        <input className='border border-grey p-3' type="number" name="price" placeholder='가격' value={product.price ?? 0} onChange={e => handleChange(e.target.name, e.target.value)} required/>
        <input className='border border-grey p-3' type="text" name="category" placeholder='카테고리' value={product.category ?? ''} onChange={e => handleChange(e.target.name, e.target.value)} required/>
        <input className='border border-grey p-3' type="text" name="description" placeholder='제품 설명' value={product.description ?? ''} onChange={e => handleChange(e.target.name, e.target.value)} required/>
        <input className='border border-grey p-3' type="text" name="option" placeholder='옵션들(콤마(,)로 구분)' value={product.option ?? ''} onChange={e => handleChange(e.target.name, e.target.value)} required/>
        <button className='bg-main text-white p-3 font-bold text-lg' type='submit' disabled={disabled}>{disabled ? '업로드 중...' : '제품 등록하기'}</button>
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


