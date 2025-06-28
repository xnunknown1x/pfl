// Example in app/page.tsx or your own component
import Image from "next/image";
import "../lp.css";
import FadeIn from "./effects/FadeInOnView";
export default function skills() {
  return (<>
  <FadeIn>

    <div style={{color:"white", fontSize:"1.5rem"}} className="skills instrument-sans-big "> Skills</div>
    <div className="flex flex-wrap justify-center gap-40 p-6 rounded-xl skillimg">

        <Image
          src="/skill1.webp"
          alt={`Logo`}
          width={70}
          height={70}
          className="object-contain hover:scale-110 transition-transform duration-300"
          />
          <Image
            src="/skill3l.png"
            alt={`Logo`}
            width={100}
            height={100}
            className="object-contain hover:scale-110 transition-transform duration-300"
            />
        <Image
          src="/skill2.png"
          alt={`Logo`}
          width={140}
          height={140}
          className="object-contain hover:scale-110 transition-transform duration-300"
          />
          <Image
            src="/skill4.png"
            alt={`Logo`}
            width={70}
            height={70}
            className="object-contain hover:scale-110 transition-transform duration-300"
            />
    </div>
    </FadeIn>
    </>
  );
}
