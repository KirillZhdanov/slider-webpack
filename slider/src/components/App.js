import React from "react";
import Slider from "./Slider";
import "../styles/App.css";

const settings = {
  width: "100%",
  height: "100%",
  infiniteLoop: true,
  slidesPerView: 1,
  indicators: true,
};
export default function App() {
  return (
    <div className="App">
      <Slider settings={settings}>
        {
          //feel free filling the Slider component with any content
        }
        <div
          className="sub"
          style={{
            background: `url(https://kolyan.net/uploads/posts/2014-05/1401217017_1-66.jpg)`,
          }}
        >
          1
        </div>
        <div
          className="sub"
          style={{
            background: `url(https://www.zastavki.com/pictures/1920x1200/2011/Nature_Mountains_River_in_the_mountains_029248_.jpg)`,
          }}
        >
          2
        </div>
        <section
          className="sub"
          style={{
            background: `url(https://interesno-vse.ru/wp-content/uploads/norvegia_3.jpg)`,
          }}
        >
          3
        </section>
        4 empty slide
        <section
          className="sub"
          style={{
            background: `url(https://vuelaalavida.com/wp-content/uploads/2018/05/Ofertas-a-Tailandia-Phuket.jpg)`,
          }}
        >
          5
        </section>
      </Slider>
    </div>
  );
}
