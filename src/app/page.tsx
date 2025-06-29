"use client";
import "./lp.css"
import CustomCursor from "./components/effects/CustomCursor";
import WHR from "./components/effects/WordsHoverRepel";
import FadeIn from "./components/effects/FadeInOnView";
import Skills from "./components/skills";
import GLBViewer from "./components/3dviewer/GLBViewer";
import CoinChain from "./components/coins";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
export default function Home() {
  return (
  <>
  <CustomCursor/>
  <main>
    <div className="nish">
      <div className="WelcomeText instrument-sans-big text-2xl">
        <FadeIn duration={0.8} delay={0.2} distance={40}>
          <div style={{display:"flex",justifyContent:"center",alignItems:"center",zIndex:"20"}}>
            <h1 style={{zIndex:"10",mixBlendMode:"luminosity"}}>
           <WHR>
             Welcome, I m Nishant Vishwakarma, a tech enthusiast and a web developer with creative and productive edge.
            </WHR>
            </h1>
          </div>
      </FadeIn>
      <div className="inset-0 z-0" style={{position:"absolute"}}>
        <Suspense >
            <Canvas className="viewer">
              <CoinChain path="/models/Coins.glb" scale={1.0} position={[0.3, 0, 2]} />
            </Canvas>
        </Suspense>
      </div>
      </div>
      <div className="Scroll instrument-sans-big" style={{height:"400px"}}>
         <h3>
          <FadeIn>
          <WHR>
            SCROLL
          </WHR>
          </FadeIn>
        </h3>
      </div>
      <div>
        <FadeIn>
          <GLBViewer
          path="/models/perfume.glb"
          position={[0, 0, 0]}
          rotation={[0, Math.PI / 2, 0]}
          scale={1.5}
          >
          </GLBViewer>
          {/* <h3 style={{color:"black", justifyContent:"center", alignItems:"center"}}>Hehe</h3> */}
      </FadeIn>
      </div>
      <div>
        <Skills/>
      </div>
    </div>
  </main>
  </>
  );
}
