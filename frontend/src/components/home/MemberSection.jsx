import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../../styles/swiper-custom.css";
import avis1 from  '../../assets/images/avis1.jpg'
import avis2 from  '../../assets/images/avis2.jpg'
import avis3 from  '../../assets/images/avis3.jpg'
import avis4 from  '../../assets/images/avis4.jpg'
import avis5 from  '../../assets/images/avis5.jpg'
import avis6 from  '../../assets/images/avis6.jpg'
import avis7 from  '../../assets/images/avis7.jpg'
import avis8 from  '../../assets/images/avis8.jpg'
import avis9 from  '../../assets/images/avis9.jpg'
import avis10 from  '../../assets/images/avis10.jpg'
import avis11 from  '../../assets/images/avis11.jpg'
import avis12 from  '../../assets/images/avis12.jpg'
import avis13 from  '../../assets/images/avis13.jpg'
import avis14 from  '../../assets/images/avis14.jpg'
import avis15 from  '../../assets/images/avis15.jpg'
import { useNavigate, Link } from 'react-router-dom';
import { fetchArticles } from '../../utils/api';
import { useEffect, useState } from 'react';

function MemberSection() { 
    const navigate = useNavigate();
    const handleSubscribeClick = () => { 
        navigate('/abonnement');
    };

     const [articles, setArticles] = useState([]);
            const [error, setError] = useState(null);
        
           useEffect(() => {
                fetchArticles()
                    .then(data => {
                        setArticles(data);
                    })
                    .catch(err => setError(err.message));
            }, []);
            if (error) return <p>{error}</p>

    return (
        <section className="mt-20">
            <h2 className="text-center mt-10 font-SFBold text-4xl md:text-8xl  dark:text-white">DEVENIR MEMBRE</h2>
            <p className='text-center font-SFBold md:text-2xl text-xl text-marron mt-4'>La vérité sur ton assiette</p>
            <p className="text-center  font-SFBold md:text-lg text-marron border-2 rounded-4xl mx-4  md:max-w-100 md:block md:mx-auto">DEJA + DE 1000 MEMBRES ANTIFRAGILES</p>
            <h3 className="text-center font-SFBold
            text-marron mt-8 text-lg md:text-xl">0 FILTRE . 0 DOGME. 0 BULLSHIT</h3>
                   <div id="article" className="mx-4 mt-4 md:mx-40">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        rewind={true}
        pagination={{ clickable: true,
           dynamicBullets: true,
         }}
        autoplay={{ delay: 5000 }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="pb-10"
      >
        {articles.map((article) => (
          <SwiperSlide key={article.id}>
            <Link
              to={`/articles/${article.slug}`}
              className="bg-white shadow-lg rounded-4xl border border-gray-300 overflow-hidden hover:shadow-xl transition-shadow block my-10 dark:bg-neutral-800 dark:border-neutral-500"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-SFBold dark:text-marron">{article.title}</h2>
                <p className="font-SF text-gray-600  dark:text-white">
                  {new Date(article.published_at).toLocaleDateString("fr-FR")}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
             
            
            <button onClick= {handleSubscribeClick} className=" mt-10 block mx-auto  md:text-2xl font-SFBold rounded-full text-white px-4 py-4 bg-gradient-to-tr from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-black transition-colors duration-300 md:px-8">DEVENIR MEMBRE ANTIFRAGILE</button>
            <div className=" mx-4 md:mx-40" >
            <Swiper
        rewind={true}
        slidesPerView={1}
        grid={{
          rows: 2,
        }}
        spaceBetween={50}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
         autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        breakpoints={{
            768: {
                slidesPerView: 3,
                spaceBetween: 20, // Tablette et grands écrans
            }
        }}
        modules={[Grid, Pagination, Autoplay]}
        className="mySwiper mt-10"
      >
        <SwiperSlide><img src={avis1} className="rounded-4xl"/></SwiperSlide>
        <SwiperSlide><img src={avis2} className="rounded-4xl" /></SwiperSlide>
        <SwiperSlide><img src={avis3} className="rounded-4xl"/></SwiperSlide>
        <SwiperSlide><img src={avis4} className="rounded-4xl"/></SwiperSlide>
        <SwiperSlide><img src={avis5} className="rounded-4xl"/></SwiperSlide>
        <SwiperSlide><img src={avis6} className="rounded-4xl"/></SwiperSlide>
        <SwiperSlide><img src={avis7} className="rounded-4xl"/></SwiperSlide>
        <SwiperSlide><img src={avis8} className="rounded-4xl"/></SwiperSlide>
        <SwiperSlide><img src={avis9} className="rounded-4xl"/></SwiperSlide>
        <SwiperSlide><img src={avis10} className="rounded-4xl"/></SwiperSlide>
        <SwiperSlide><img src={avis11} className="rounded-4xl"/></SwiperSlide>
        <SwiperSlide><img src={avis12} className="rounded-4xl"/></SwiperSlide>
        <SwiperSlide><img src={avis13} className="rounded-4xl"/></SwiperSlide>
         <SwiperSlide><img src={avis14} className="rounded-4xl"/></SwiperSlide>
          <SwiperSlide><img src={avis15} className="rounded-4xl"/></SwiperSlide>
         <SwiperSlide><img src={avis1} className="rounded-4xl"/></SwiperSlide>
        <SwiperSlide><img src={avis2} className="rounded-4xl" /></SwiperSlide>
        <SwiperSlide><img src={avis3} className="rounded-4xl"/></SwiperSlide>
        <SwiperSlide><img src={avis4} className="rounded-4xl"/></SwiperSlide>
        <SwiperSlide><img src={avis5} className="rounded-4xl"/></SwiperSlide>
        <SwiperSlide><img src={avis6} className="rounded-4xl"/></SwiperSlide>
        <SwiperSlide><img src={avis7} className="rounded-4xl"/></SwiperSlide>
        <SwiperSlide><img src={avis8} className="rounded-4xl"/></SwiperSlide>
        <SwiperSlide><img src={avis9} className="rounded-4xl"/></SwiperSlide>
        <SwiperSlide><img src={avis10} className="rounded-4xl"/></SwiperSlide>
        <SwiperSlide><img src={avis11} className="rounded-4xl"/></SwiperSlide>
        <SwiperSlide><img src={avis12} className="rounded-4xl"/></SwiperSlide>
        <SwiperSlide><img src={avis13} className="rounded-4xl"/></SwiperSlide>
         <SwiperSlide><img src={avis14} className="rounded-4xl"/></SwiperSlide>
          <SwiperSlide><img src={avis15} className="rounded-4xl"/></SwiperSlide>
        
      
      </Swiper>
      </div>

        </section>

    );
}

export default MemberSection;