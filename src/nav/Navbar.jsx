import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import { IconContext } from "react-icons";

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [isDogOpen, setIsDogOpen] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const onClickCatToggle = () => {
    setIsCatOpen(!isCatOpen);
  };

  const onClickDogToggle = () => {
    setIsDogOpen(!isDogOpen);
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-button">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
            <div className="nav-menu-itmes">
              <div className="navbar-toggle">
                <Link to="#" className="close-button">
                  <AiIcons.AiOutlineClose onClick={showSidebar} />
                </Link>
              </div>
              <div className="lists">
                <span className="FirstCtg" onClick={onClickCatToggle}>
                  CAT
                </span>
                {isCatOpen ? (
                  <>
                    <div className="SndCtg">
                      사료
                      <li>습식</li>
                      <li>건식</li>
                      <li>간식</li>
                    </div>
                    <div className="SndCtg">
                      장난감
                      <li>카샤카샤</li>
                      <li>캣닙스틱</li>
                      <li>쥐돌이</li>
                    </div>
                    <div className="SndCtg">
                      용품
                      <li>화장실</li>
                      <li>숨숨집</li>
                      <li>스크래처</li>
                    </div>
                  </>
                ) : null}
              </div>
              <div className="lists">
                <span className="FirstCtg" onClick={onClickDogToggle}>
                  {" "}
                  DOG
                </span>
                {isDogOpen ? (
                  <>
                    {" "}
                    <div className="SndCtg">
                      사료
                      <li>습식</li>
                      <li>건식</li>
                      <li>간식</li>
                    </div>
                    <div className="SndCtg">
                      장난감
                      <li>인형</li>
                      <li>노즐워크</li>
                      <li>공</li>
                    </div>
                    <div className="SndCtg">
                      용품
                      <li>의류</li>
                      <li>하네스</li>
                      <li>쿠션</li>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </nav>
        </div>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
