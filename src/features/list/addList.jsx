import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __addPost } from "../../redux/modules/postsSlice";
import AddPhoto from "./AddPhoto";

const AddList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [stuffs, setStuffs] = useState([]);
  const [typeofpet, setTypeofpet] = useState();
  const [category, setCategory] = useState();
  const [subcategory, setSubcategory] = useState();
  const [url, setUrl] = useState("");

  const [post, setPost] = useState({
    maker: "",
    product: "",
    title: "",
    content: "",
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
        photo: "https://team1-catdog-bucket.s3.amazonaws.com" + url,
      })
    );
    navigate("/");
  };

  const onPetChangeHandler = (e) => {
    setTypeofpet(e.target.value);
    const petSelected = e.target.value;
    if (petSelected === "강아지") {
      setCategories(["강아지 냠냠", "강아지 장난감", "강아지 용품"]);
      setStuffs([]);
    } else if (petSelected === "고양이") {
      setCategories(["고양이 냠냠", "고양이 장난감", "고양이 용품"]);
      setStuffs([]);
    } else {
      setCategories([]);
      setStuffs([]);
    }
  };

  const onCategoryChangeHandler = (e) => {
    setCategory(e.target.value);
    const categorySelected = e.target.value;
    if (categorySelected === "강아지 냠냠") {
      setStuffs(["습식", "건식", "간식"]);
    } else if (categorySelected === "강아지 장난감") {
      setStuffs(["인형", "노즐워크", "공"]);
    } else if (categorySelected === "강아지 용품") {
      setStuffs(["의류", "하네스", "쿠션"]);
    } else if (categorySelected === "고양이 냠냠") {
      setStuffs(["습식", "건식", "간식"]);
    } else if (categorySelected === "고양이 장난감") {
      setStuffs(["카샤카샤", "마다따비", "인형"]);
    } else if (categorySelected === "고양이 용품") {
      setStuffs(["화장실", "숨숨집", "스크래처"]);
    } else {
      setStuffs([]);
    }
  };

  const onStuffChangeHandler = (e) => {
    setSubcategory(e.target.value);
  };

  return (
    <>
      <FormBox
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitHandler(post, typeofpet, category, subcategory, url);
        }}
      >
        <h2
          style={{
            marginBottom: "45px",
            textAlign: "center",
            fontSize: "30px",
          }}
        >
          {" "}
          마음으로 낳고 지갑으로 기른 후기를 들려주세요!
        </h2>
        <SelectBoxes>
          <LabelBox htmlFor="mains">메인 카테고리 선택</LabelBox>
          <div>
            <SelectBox
              id="mains"
              onChange={onPetChangeHandler}
              value={typeofpet}
            >
              <option>선택하세요!</option>
              <option>강아지</option>
              <option>고양이</option>
            </SelectBox>
            &nbsp;&gt;&nbsp;&nbsp;&nbsp;
            <SelectBox onChange={onCategoryChangeHandler} value={category}>
              <option
                value="default"
                onChange={onCategoryChangeHandler}
                disabled
              >
                선택하세요!
              </option>
              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                  onChange={onCategoryChangeHandler}
                >
                  {category}
                </option>
              ))}
            </SelectBox>
            &nbsp;&gt;&nbsp;&nbsp;&nbsp;
            <SelectBox onChange={onStuffChangeHandler} value={subcategory}>
              <option value="default" onChange={onStuffChangeHandler} disabled>
                선택하세요!
              </option>
              {stuffs.map((stuff) => (
                <option key={stuff}> {stuff} </option>
              ))}
            </SelectBox>
          </div>
        </SelectBoxes>
        <ProductInfo>
          <LabelBox>서브 카테고리 선택</LabelBox>
          <div>
            <input
              placeholder="제조사명"
              type="text"
              onChange={(e) => {
                const { value } = e.target;
                setPost({
                  ...post,
                  maker: value,
                });
              }}
            />
            <input
              placeholder="제품명"
              type="text"
              onChange={(e) => {
                const { value } = e.target;
                setPost({
                  ...post,
                  product: value,
                });
              }}
            />
          </div>
        </ProductInfo>
        <PostBody>
          <WriteBox>
            <LabelBox>제목</LabelBox>
            <input
              type="text"
              placeholder="15자 이내로 제목을 입력해주세요"
              maxLength={15}
              onChange={(e) => {
                const { value } = e.target;
                setPost({
                  ...post,
                  title: value,
                });
              }}
            />
          </WriteBox>
          <WriteBox>
            <LabelBox>내용</LabelBox>
            <textarea
              maxLength={150}
              placeholder="150자 이내로 글을 작성해주세요"
              onChange={(e) => {
                const { value } = e.target;
                setPost({
                  ...post,
                  content: value,
                });
              }}
            />
          </WriteBox>
        </PostBody>
        <AddPhoto setUrl={setUrl} />
        <SubmitBtn>추가하기</SubmitBtn>
      </FormBox>
    </>
  );
};

export default AddList;

const SelectBoxes = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormBox = styled.form`
  width: 70%;
  margin: 0 auto;
`;

const SelectBox = styled.select`
  width: 200px;
  height: 35px;
  border-radius: 6px;
  border: 2px solid #ddd;
  margin-right: 10px;
  cursor: pointer;
  background: transparent;
  padding-left: 10px;

  > option {
    text-align: center;
    padding-left: 10px;
  }
`;

const LabelBox = styled.label`
  margin-bottom: 10px;
  font-weight: 400;
  font-size: 18px;
`;

const ProductInfo = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;

  input {
    margin-right: 10px;
    height: 30px;
    width: 175px;
    border-radius: 10px;
    border: 2px solid #ddd;
    text-align: center;
  }
`;

const PostBody = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px 0px 10px 0px;
  max-width: 100%;
  gap: 20px;

  input {
    border-radius: 10px;
    height: 40px;
    border: 2px solid #ddd;
    outline: none;
    padding-left: 10px;
    :focus {
      outline: 2px solid #000;
    }
  }

  textarea {
    border-radius: 10px;
    border: 2px solid #ddd;
    height: 200px;
    resize: none;
    padding: 10px;
    font-size: 14px;
    :focus {
      outline: 2px solid #000;
    }
  }
`;

// const Photo = styled.input`
//   width: 365px;
//   height: 35px;
//   margin-top: 20px;
//   border: none;
//   border-radius: 10px;
//   background-color: #e3e0e1;
//   padding-left: 5px;
//   padding-top: 5px;
// `;

const WriteBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubmitBtn = styled.button`
  border: none;
  height: 40px;
  line-height: 40px;
  width: 300px;
  border-radius: 10px;
  border: 2px solid #ddd;
  cursor: pointer;
  background: transparent;
  font-size: 18px;
  font-weight: bold;
`;
