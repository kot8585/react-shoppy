import React, { useEffect, useState } from 'react';
import { uploadImage } from '../api/uploader';
import useProducts from '../hooks/useProducts';

//π CUSTOM HOOK μ¬μ©ν΄μ USEQueryλͺ¨μΌκΈ°!!!
export default function AddProduct() {
  const [disabled, setDisabled] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [product, setProduct] = useState({});
  const { addProduct } = useProducts();

  const handleChange = (name, value) => {
    setProduct((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleFileChange = (e) => {
    setProduct((prev) => {
      if (!e.target.files || e.target.files.length === 0) {
        return { ...prev, imageUrl: null };
      }
      return { ...prev, imageUrl: e.target.files[0] };
    });
  };

  const handleSubmit = async (e) => {
    try {
      setDisabled(true);
      e.preventDefault();

      if (!validateProduct(product)) {
        setDisabled(false);
        return;
      }
      const data = await uploadImage(product.imageUrl);
      addProduct.mutate({ product, url: data.url });
      setCompleted(true);
      // window.alert('μ ν μλ‘λ μλ£');
    } catch (e) {
      console.log('error λ°μ!', e);
    } finally {
      setDisabled(false);
    }
  };

  useEffect(() => {
    if (completed) {
      setTimeout(() => {
        setCompleted(false);
      }, '3000');
    }
  }, [completed]);

  return (
    <main>
      <h1 className="text-center p-2 text-xl font-bold">μλ‘μ΄ μ ν λ±λ‘</h1>
      <div
        className={`p-2 text-zinc-400 text-center ${
          completed ? 'visible' : 'hidden'
        }`}
      >
        β μλ‘μ΄ μ νμ΄ λ±λ‘λμμ΅λλ€.
      </div>
      <form className="flex flex-col gap-2 px-4 py-2" onSubmit={handleSubmit}>
        {product?.imageUrl && (
          <img
            className="w-1/6 h-1/3 mx-auto"
            src={URL.createObjectURL(product.imageUrl)}
            alt="μ νμ¬μ§"
          />
        )}
        <input
          className="border border-grey p-3"
          type="file"
          name="imageUrl"
          accept="image/*"
          required
          onChange={handleFileChange}
        />
        <input
          className="border border-grey p-3"
          type="text"
          name="name"
          placeholder="μ νλͺ"
          min="0"
          value={product.name ?? ''}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          required
        />
        <input
          className="border border-grey p-3"
          type="number"
          name="price"
          placeholder="κ°κ²©"
          value={product.price ?? 0}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          required
        />
        <input
          className="border border-grey p-3"
          type="text"
          name="category"
          placeholder="μΉ΄νκ³ λ¦¬"
          value={product.category ?? ''}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          required
        />
        <input
          className="border border-grey p-3"
          type="text"
          name="description"
          placeholder="μ ν μ€λͺ"
          value={product.description ?? ''}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          required
        />
        <input
          className="border border-grey p-3"
          type="text"
          name="option"
          placeholder="μ΅μλ€(μ½€λ§(,)λ‘ κ΅¬λΆ)"
          value={product.option ?? ''}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          required
        />
        <button
          className="bg-main text-white p-3 font-bold text-lg"
          type="submit"
          disabled={disabled}
        >
          {disabled ? 'μλ‘λ μ€...' : 'μ ν λ±λ‘νκΈ°'}
        </button>
      </form>
    </main>
  );
}

function validateProduct(product) {
  if (product.name.trim().length <= 0) {
    alert('μνλͺμ μλ ₯ν΄μ£ΌμΈμ');
    return false;
  }
  if (!product.price || product.price < 0) {
    alert('κ°κ²©μ λ€μ μλ ₯ν΄μ£ΌμΈμ');
    return false;
  }
  if (product.category.trim().length <= 0) {
    alert('μΉ΄νκ³ λ¦¬ μλ ₯ν΄μ£ΌμΈμ');
    return false;
  }
  if (product.description.trim().length <= 0) {
    alert('μνμ€λͺμ μλ ₯ν΄μ£ΌμΈμ');
    return false;
  }
  if (product.option.trim().length <= 0) {
    alert('μ΅μμ μλ ₯ν΄μ£ΌμΈμ');
    return false;
  }
  if (!product.imageUrl) {
    alert('μ΄λ―Έμ§ νμΌμ μλ ₯ν΄μ£ΌμΈμ');
    return false;
  }
  return true;
}
