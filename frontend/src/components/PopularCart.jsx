import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./styles/slider.css";

// import required modules
import { EffectCoverflow, Pagination, Autoplay } from "swiper";
const PopularCart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const res = await axios.get("https://127.0.0.1:8000/api/products", {
        params: {
          "order[click]": "DESC",
          itemsPerPage: 10,
        },
      });

      console.log(res.data["hydra:member"]);
      setData(res.data["hydra:member"]);
      // (res.data)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="products">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        {data &&
          data?.map((product, index) => (
            <SwiperSlide>
              <div key={index}>
                <h3>{product.name}</h3>
                {product.image && (
                  <img
                    src={`https://localhost:8000${product.image.contentUrl}`}
                    alt={product.name}
                  />
                )}
                <div className="details">
                  <span>{product.desc}</span>
                  <span className="price">${product.price}</span>
                </div>

                <NavLink className="button" to={`/product/${product.id}`}>
                  Voir plus
                </NavLink>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default PopularCart;
