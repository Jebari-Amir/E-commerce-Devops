'use client'
import { useEffect, useState } from 'react';
import Advertisement from '../components/pubacceuil';
import Stronavigation from "../components/storenavigation";
import Footer from "../components/footer";


const PubPage = () => {

return (
    <div className="bg-white">
    <Stronavigation />

    <Advertisement />

    <Footer />

    </div>
  );
};

export default PubPage;