import HoverRepel from "./effects/hoverRepel";
import Image from "next/image";
const path = "/globe.svg"
function navbar(){
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
          <Image
          width={20}
          height={20}
          alt="Option Button"
          src={path}
          >  
          </Image>
        </div>
      </div>
    </>
  );
}
export default navbar;