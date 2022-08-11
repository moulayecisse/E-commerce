import React, { useEffect, useState } from "react";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import "./styles/slider.css";

// import required modules
import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper";

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
    <div className="container">
      <div className="out_team swiper-container">
        <div className="swiper-wrapper">
          <Swiper
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3}
            spaceBetween={30}
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            navigation={true}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            className="mySwiper"
          >
            {data &&
              data?.map((product, index) => (
                <SwiperSlide>
                  <div key={index} className="our_team__member swiper-slide">
                    <div className="otm_img">
                      {product.image && (
                        <img
                          src={`https://localhost:8000${product.image.contentUrl}`}
                          alt={product.name}
                        />
                      )}
                    </div>
                    <h3>{product.name}</h3>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default PopularCart;
