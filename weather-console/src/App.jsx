import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import {useMemo} from "react";

const CITIES=[
  {id: 'sf', name:"San Francisco", region:"California, US", lat:37.7749, lon:-122.4194},
  {id: 'tyo', name:"Tokyo", region:"Kanto, JP", lat:35.6762, lon:139.6503},
  {id: 'lon', name:"London", region:"England, UK", lat:51.5074, lon:-0.1278},
];

const toXY =(lat,lon)=>({
  x:((lon+180)/360)*1000,
  y:((90-lat)/180)*500,
});

const CONTINENTS = [

  "M120,40 C90,55 68,90 92,140 C70,182 112,222 140,262 C162,232 190,208 202,180 C232,150 220,98 190,68 C168,48 140,30 120,40 Z",

  "M202,300 C182,342 170,400 190,452 C212,472 232,440 242,400 C252,360 232,320 202,300 Z",

  "M470,80 C450,100 460,132 480,142 C500,152 522,130 512,100 C505,84 486,74 470,80 Z",

  "M472,160 C440,202 452,282 482,342 C512,362 542,320 532,258 C526,218 500,180 472,160 Z",

  "M560,58 C520,100 540,162 582,202 C650,222 752,182 822,140 C862,100 830,58 780,48 C700,38 610,44 560,58 Z",

  "M800,378 C780,398 790,430 820,440 C850,446 872,420 862,394 C852,374 820,368 800,378 Z",

];

function WorldMap(){
  return(
    <svg viewBox="0 0 1000 500" className='World-map' role="img" arial-label="World Map">
      <rect width="1000" height="500" fill="var(--panel)"/>
      {Array.from({length:9}).map((_,i)=>(
        <line key={"v"+i} x1={i*125} y1="0" x2={i*125} y2="500" stroke="var(--line)" opacity="0.35"/>
      ))}
      {Array.from({length:5}).map((_,i)=>(
        <line key={"h"+i} x1="0" y1={i*125} x2="1000" y2={i*125} stroke="var(--line)" opacity="0.35"/>
      ))}

      <line x1="500" y1="0" x2="500" y2="500" stroke="var(--line)" strokeWidth="1.5" opacity="0.55" />
      <line x1="0" y1="250" x2="1000" y2="250" stroke="var(--line)" strokeWidth="1.5" opacity="0.55" />

      {CONTINENTS.map((d,i)=>(
        <path key={i} d={d} fill="var(--land)" stroke="var(--lnd-line)" strokeWidth="1.5" />
      ))}

      {CITIES.map((city)=>{
        const{x,y}=toXY(city.lat, city.lon);
        return(

        
      <g key={city.id} transform={`translate(${x}, ${y})`}>
        <circle r="6.5" fill="var(--paper)" strokeWidth="1.5"/>
        <text y="-14" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="15" fill="var(--paper)">
          {city.name}
        </text>
      </g>
      );
      })}

    </svg>
  )
}

function App() {
  const [count, setCount] = useState(0)
  const coords=useMemo(()=>CITIES.map((c)=>({...c,...toXY(c.lat, c.lon) })), []);
  return (
    <>
    <div className="wx-app">
      <style>
        {`

        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

        :root {

          --void:#0B1220; --panel:#111A2C; --line:#28395C;

          --land:#1C2C4A; --land-line:#33487A;

          --paper:#EAEEF1; --muted:#7C8AA6; --amber:#E8A23A;

          --font-display:'Space Grotesk',sans-serif; --font-mono:'IBM Plex Mono',monospace;

        }

        .wx-app{ background:var(--void); color:var(--paper); font-family:var(--font-display);

          min-height:100vh; padding:28px; box-sizing:border-box; }

        h1{ font-size:20px; margin:0 0 4px; }

        p{ margin:0 0 18px; color:var(--muted); font-family:var(--font-mono); font-size:12.5px; }

        .map-wrap{ border:1px solid var(--line); border-radius:6px; overflow:hidden; }.world-map{ width:100%; display:block; }

        .debug{ margin-top:16px; font-family:var(--font-mono); font-size:12px; color:var(--muted); }

        .debug table{ border-collapse:collapse; width:100%; max-width:480px; }

        .debug td,.debug th{ text-align:left; padding:4px 10px 4px 0; border-bottom:1px solid var(--line); }

      `}
      </style>
      <h1> Шаг 1: Проект создан</h1>
      <p> список Городов + пересчет lat/lon -- x/y + статичная карта</p>
    
      <div className="map-wrap">
        <WorldMap />
      </div>
      <div className="debug">
        <table>
          <thread>
            <tr><th>Город</th><th>lat,lon</th><th>x,y на карте</th></tr>
          </thread>
          <tbody>
            {coords.map((c)=>(
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.lat.toFixed(2)}, {c.lon.toFixed(2)}</td>
                <td>{c.x.toFixed(0)}, {c.y.toFixed(0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </>
  )
}

export default App
