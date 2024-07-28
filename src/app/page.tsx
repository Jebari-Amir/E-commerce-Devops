"use client";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n/init";
import CategoriesPage from "./categ/page";
import Footer from "./components/footer";
import Newsletter from "./components/newsletter";
import Product from "./components/products";
import Stronavigation from "./components/storenavigation";
import Categories from "./categoryoverview/page";
import { CartProvider } from './CartContext/page';
import HelpComponent from './helpcomponent/page';
import Impression from "./components/impression";
import Image from "./components/image";
import React from 'react';
import ChatBot from 'react-simple-chatbot';
import { Segment } from 'semantic-ui-react';
import Loading from '@/app/loading/loading'; 
import SearchBar from './SearchBar/page'; 
import LogoCarousel from "./components/caroussellogo";


export default function AcceuilPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [loading, setLoading] = useState(true); 

  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3800); 
    return () => clearInterval(interval); 
  }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const images = [
    "//contentful.helloprint.com/wm1n7oady8a5/1zMqHITsobE8IzfPMaQQcs/f1817dca462f05a918e81d477180b527/special_materials_flyer_PLP_horizontal.png",
    "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-05.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",

     // "ss.png",
    // "image4.jpg",
    // "qq.png",
  ];

  const changeLanguage = (lang: any) => {
    i18n.changeLanguage(lang);
  };


  const LinkImage = () => {
    return (
      <div>
        <a href="http://localhost:3000/ReceiveProduct?productKey=tricorppoloshirt180gram" target="_blank" rel="noopener noreferrer">
          <img src="//contentful.helloprint.com/wm1n7oady8a5/1PcxlxdLAw4gkvkkPXfCEX/4c494ec1172ab48a24f484c32b18bacf/tricorpfittedpoloshirt_PDP.png" alt="Product" style={{ width: '40%' }} />
        </a>
        <p>
          Patterned shirt Slim Fit<br />
          130 EGP<br />
          <a href="http://localhost:3000/ReceiveProduct?productKey=tricorppoloshirt180gram" target="_blank" rel="noopener noreferrer">
            Show Details
          </a>
        </p>
      </div>
    );
  };

  const LinkImagePolo2 = () => {
    return (
      <div>
        <a href="http://localhost:3000/ReceiveProduct?productKey=tricorppoloshirtuvblockcooldry" target="_blank" rel="noopener noreferrer">
          <img src="//contentful.helloprint.com/wm1n7oady8a5/7pJDLPk2x5oh6YvSY8xRoo/6c33a5bca606a4d7b28964f3ee8aa8b7/tricorppoloshirtuvblockcooldry_PDP.png" alt="Product" style={{ width: '40%' }} />
        </a>
        <p>
          Patterned shirt Slim Fit<br />
          130 EGP<br />
          <a href="http://localhost:3000/ReceiveProduct?productKey=tricorppoloshirtuvblockcooldry" target="_blank" rel="noopener noreferrer">
            Show Details
          </a>
        </p>
      </div>
    );
  };

  const LinkImagee = () => {
    return (
      <div>
        <a href="http://localhost:3000/ReceiveProductsSpCategory?category=clothing-textiles_all-workwear_workwear-overalls" target="_blank" rel="noopener noreferrer">
          <img src="https://contentful.helloprint.com/wm1n7oady8a5/271XaFe1SITlVeVsgiV7nb/c7ff53a84e00e747e4751ea069c05eaa/overalls_PLP.png" alt="Product" style={{ width: '40%' }} />
        </a>
        <p>
          Patterned shirt Slim Fit<br />
          130 EGP<br />
          <a href="http://localhost:3000/ReceiveProductsSpCategory?category=clothing-textiles_all-workwear_workwear-overalls" target="_blank" rel="noopener noreferrer">
            Show Details
          </a>
        </p>
      </div>
    );
  };


  const steps = [
    {
      id: 'Greet',
      message: 'Hello, welcome to our site Wuemela!',
      trigger: 'Done',
    },

    {
      id: 'Done',
      user: true,
      trigger: 'Name',
    },

    {
      id: 'Name',
      message: 'How can help you',
      trigger: 'issues',
    },

    {
      id: 'issues',
      options: [
        {
          value: 'Services',
          label: 'Shop Now',
          trigger: 'Services',
        },
        {
          value: 'Jobs',
          label: 'More Informations',
          trigger: 'Jobs',
        },
      ],
    },



    {
      id: 'Services',
      message: 'IT S SHOPPING TIME.',
      trigger: 'shop',
    },
    {
      id: 'shop',
      message: 'Shop our wide range of clothes for every age and gender.',
      trigger: 'shopping',
    },




    {
      id: 'shopping',
      options: [
        {
          value: 'WorkOveralls',
          label: 'Overalls',
          trigger: 'WorkOveralls',
        },
        {
          value: 'WorkPolo',
          label: 'Polo',
          trigger: 'WorkPolo',
        },
      ],
    },


    {
      id: 'WorkPolo',
      component: <LinkImage />,
      trigger: 'zid',
    },
    {
      id: 'zid',
      component: <LinkImagePolo2 />,
      trigger: 'ReturnToName',
    },
    {
      id: 'WorkOveralls',
      component: <LinkImagee />,
      trigger: 'ReturnToName',
    },






    {
      id: 'Jobs',
      message: 'What is your question about?',
      trigger: 'info',
    },


    {
      id: 'info',
      options: [
        {
          value: 'Delivery',
          label: 'Delivery',
          trigger: 'Delivery',
        },
        {
          value: 'Care',
          label: 'Customer Care',
          trigger: 'Care',
        },
        // {
        //   value: 'Orders',
        //   label: 'Orders',
        //   trigger: 'Orders',
        // },
      ],
    },


    {
      id: 'Delivery',
      message: 'What delivery options do you offer?',
      trigger: 'dev',
    },
    {
      id: 'dev',
      message: 'We offer a home Delivery option as well as a click and collect  service for selected stores.',
      trigger: 'devv',
    },

    {
      id: 'devv',
      message: 'Times and cost for deliveries will verry depending on the location ',
      trigger: 'Jobs',
    },





    {
      id: 'Care',
      message: 'Answer the following questions and you will be contacted.',
      trigger: 'Caree',
    },

    {
      id: 'Caree',
      message: 'What s your name?',
      trigger: 'Careee',
    },


    {
      id: 'Careee',
      user: true,
      trigger: 'Careeee',
    },

    {
      id: 'Careeee',
      message: 'Hi {previousValue}, please enter Phone Number:',
      trigger: 'Careeeee',
    },

    {
      id: 'Careeeee',
      user: true,
      trigger: 'Careeeeee',
    },

    {
      id: 'Careeeeee',
      message: 'Email?',
      trigger: 'Careeeeeee',
    },

    {
      id: 'Careeeeeee',
      user: true,
      trigger: 'Careeeeeeee',
    },

    {
      id: 'Careeeeee',
      message: 'Email?',
      trigger: 'Careeeeeee',
    },

    
    {
      id: 'Careeeeeee',
      user: true,      
      trigger: 'Careeeeeeee',
    },
    

    {
      id: 'Careeeeeeee',
      message: 'Thank you, you will be contacted by customer service represntative',
      trigger: 'Jobs',
    },




    {
      id: 'ReturnToName',
      message: 'Would you like to ask something else?',
      trigger: 'Name',
    },
  ];



  

  const chatbotStyle = {
    minWidth: '400px',
    maxWidth: '800px',
    margin: 'auto',
  };

  return (
    <div className="bg-white">
      {loading && <Loading />} 

      <CartProvider>    
        <Stronavigation />
        {/* <SearchBar /> */}

        <div className="mx-auto max-w-8xl py-4 sm:py-6 lg:py-14">
          <div className="flex h-[60vh] justify-center items-center relative">
            <button
              type="button"
              title="prevSlide"
              className="absolute left-[14%] z-[30]"
              onClick={prevSlide}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            <div id="gallery" className="overflow-hidden h-[400px] w-[70%]">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`${
                    index === currentIndex ? "block" : "hidden"
                  } transition-opacity duration-1000 ease-in-out`}
                >
                  <img
                    src={image}
                    alt={`product preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              title="nextSlide"
              className="absolute right-[14%] z-[30]"
              onClick={nextSlide}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>

        <Categories />
        <Image />
        <Product />

        <section className="py-8 max-w-6xl " style={{ marginLeft: '200px' }}>

        <LogoCarousel />
        </section>


        <Newsletter />
        <Impression />
        <HelpComponent />
        <Footer />
      </CartProvider>
      
      <Segment style={chatbotStyle}>
        <ChatBot
          steps={steps}
          userAvatar={'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png'}
          botAvatar={'https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png'}
          botDelay={1000}
          floating={true}
          headerTitle="Chatbot"
          width={'40%'}
          style={{ boxShadow: '0px 0px 15px #9E9E9E' }}
        />
      </Segment>
    </div>
  );
}
