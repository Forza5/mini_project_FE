import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { __addPost } from '../../redux/modules/postsSlice';
import AddPhoto from './AddPhoto';

const AddList = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [categories, setCategories] = useState([]);
   const [stuffs, setStuffs] = useState([]);
   const [typeofpet, setTypeofpet] = useState();
   const [category, setCategory] = useState();
   const [subcategory, setSubcategory] = useState();
   const [url, setUrl] = useState('');

   const [post, setPost] = useState({
      maker: '',
      product: '',
      title: '',
      content: '',
   });

   const onSubmitHandler = (post, typeofpet, category, subcategory, url) => {
      dispatch(
         __addPost({
            typeofpet: typeofpet,
            category: category,
            subcategory: subcategory,
            title: post.title,
            maker: post.maker,
            product: post.product,
            content: post.content,
            photo: "https://team1-catdog-bucket.s3.amazonaws.com"+url
         })
      );
      navigate('/');
   };

   const onPetChangeHandler = (e) => {
      setTypeofpet(e.target.value);
      const petSelected = e.target.value;
      if (petSelected === '강아지') {
         setCategories(['강아지 냠냠', '강아지 장난감', '강아지 용품']);
         setStuffs([]);
      } else if (petSelected === '고양이') {
         setCategories(['고양이 냠냠', '고양이 장난감', '고양이 용품']);
         setStuffs([]);
      } else {
         setCategories([]);
         setStuffs([]);
      }
   };

   const onCategoryChangeHandler = (e) => {
      setCategory(e.target.value);
      const categorySelected = e.target.value;
      if (categorySelected === '강아지 냠냠') {
         setStuffs(['습식', '건식', '간식']);
      } else if (categorySelected === '강아지 장난감') {
         setStuffs(['인형', '노즐워크', '공']);
      } else if (categorySelected === '강아지 용품') {
         setStuffs(['의류', '하네스', '쿠션']);
      } else if (categorySelected === '고양이 냠냠') {
         setStuffs(['습식', '건식', '간식']);
      } else if (categorySelected === '고양이 장난감') {
         setStuffs(['카샤카샤', '마다따비', '인형']);
      } else if (categorySelected === '고양이 용품') {
         setStuffs(['화장실', '숨숨집', '스크래처']);
      } else {
         setStuffs([]);
      }
   };

   const onStuffChangeHandler = (e) => {
      setSubcategory(e.target.value);
   };

   return (
      <>
         <form
            onSubmit={(e) => {
               e.preventDefault();
               onSubmitHandler(post, typeofpet, category, subcategory, url);
            }}>
            <h2> 마음으로 낳고 지갑으로 기른 후기를 들려주세요!</h2>
            <SelectBoxes>
               <SelectBox onChange={onPetChangeHandler} value={typeofpet}>
                  {/* <option value="default" onChange={onPetChangeHandler} disabled>
                    선택하세요!
                </option> */}
                  <option>선택하세요!</option>
                  <option>강아지</option>
                  <option>고양이</option>
               </SelectBox>
               <SelectBox onChange={onCategoryChangeHandler} value={category}>
                  <option
                     value='default'
                     onChange={onCategoryChangeHandler}
                     disabled>
                     선택하세요!
                  </option>
                  {categories.map((category) => (
                     <option
                        key={category}
                        value={category}
                        onChange={onCategoryChangeHandler}>
                        {category}
                     </option>
                  ))}
               </SelectBox>
               <SelectBox onChange={onStuffChangeHandler} value={subcategory}>
                  <option
                     value='default'
                     onChange={onStuffChangeHandler}
                     disabled>
                     선택하세요!
                  </option>
                  {stuffs.map((stuff) => (
                     <option key={stuff}> {stuff} </option>
                  ))}
               </SelectBox>
            </SelectBoxes>
            <ProductInfo>
               <input
                  placeholder='제조사명'
                  type='text'
                  onChange={(e) => {
                     const { value } = e.target;
                     setPost({
                        ...post,
                        maker: value,
                     });
                  }}
               />
               <input
                  placeholder='제품명'
                  type='text'
                  onChange={(e) => {
                     const { value } = e.target;
                     setPost({
                        ...post,
                        product: value,
                     });
                  }}
               />
            </ProductInfo>
            <AddPhoto setUrl={setUrl}/>
            <PostBody>
               <input
                  type='text'
                  placeholder='제목'
                  onChange={(e) => {
                     const { value } = e.target;
                     setPost({
                        ...post,
                        title: value,
                     });
                  }}
               />
               <textarea
                  onChange={(e) => {
                     const { value } = e.target;
                     setPost({
                        ...post,
                        content: value,
                     });
                  }}
               />
            </PostBody>
            <SubmitBtn>추가하기</SubmitBtn>
         </form>
      </>
   );
};

export default AddList;

const SelectBoxes = styled.div``;

const SelectBox = styled.select`
   width: 150px;
   height: 30px;
   border-radius: 10px;
   margin-right: 10px;
   cursor: pointer;

   > option {
      text-align: center;
   }
`;

const ProductInfo = styled.div`
   margin-top: 20px;

   > input {
      margin-right: 10px;
      height: 30px;
      width: 175px;
      border-radius: 10px;
      border: none;
      background-color: #e3e0e1;
      text-align: center;
   }
`;

const PostBody = styled.div`
   display: flex;
   flex-direction: column;
   margin: 20px 0px 20px 0px;
   max-width: 600px;
   gap: 20px;

   > input {
      border-radius: 10px;
      height: 40px;
      border: none;
      background-color: #e3e0e1;
      padding-left: 10px;
   }

   > textarea {
      border-radius: 10px;
      border: none;
      background-color: #e3e0e1;
      height: 200px;
      resize: none;
   }
`;

const Photo = styled.input`
   width: 365px;
   height: 35px;
   margin-top: 20px;
   border: none;
   border-radius: 10px;
   background-color: #e3e0e1;
   padding-left: 5px;
   padding-top: 5px;
`;

const SubmitBtn = styled.button`
   border: none;
   height: 40px;
   width: 300px;
   border-radius: 10px;
   cursor: pointer;
   margin: auto;
   display: block;
   background-color: #63a86b;
`;
