'use client'
import HoverRepel from "./effects/hoverRepel";
import Image from "next/image";
import { useState } from "react";
const path = "/globe.svg";
function navbar(){
  function OptionBar(){
      const [isOpen , setOpen] = useState(false);
      const toggleMenu = ()=>{
        setOpen(prev => !prev);
        console.log("Nishant");
      };
    return(
        <>
          <Image
          width={20}
          style={{zIndex:40,marginRight:"20px"}}
           className={`${isOpen? "bttr":"btt"}`}
          onClick={toggleMenu}
          height={20}
          alt="Option Button"
          src={path}
          >
          </Image>
      <div className={`${isOpen? "toggle":"untoggle"}`}>
          <div className="menuhead">
            <Image
          width={20}
          style={{zIndex:40, rotate:"180deg"}}
          onClick={toggleMenu}
          height={20}
          alt="Option Button"
          src={"/back.png"}
          >
          </Image>
          </div>
          <li>SERVICES</li>
          <li>PROJECTS</li>
          <li>CONTACTS</li>
      </div>
      </>
    );
  }
  return(
    <>
      <div className="navBar">
        <div className="instrument-sans-120 navright" style={{fontSize:"1.5rem"}}>
          <HoverRepel>
            <ul>XnUnknown</ul>
          </HoverRepel>
        </div>
        <div className="instrument-sans-50 navleft">
          <HoverRepel>
            <ul>SERVICES</ul>
          </HoverRepel>
          <HoverRepel>
            <ul>PROJECTS</ul>
          </HoverRepel>
          <HoverRepel>
            <ul>CONTACTS</ul>
          </HoverRepel>
        </div>
        <div className="option">
          <OptionBar></OptionBar>
        </div>
      </div>
    </>
  );
}
export default navbar;