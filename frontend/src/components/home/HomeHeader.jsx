import React from 'react';
import livre from '../../assets/images/livre.png';
import { useEffect, useState } from 'react';

function HomeHeader() { 
    const [visible, setVisible] = useState(false);
    
    useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);
    return (
        <header className="px-4">
                    <div className={`text-center transition-transform duration-1500 ease-out ${visible ? 'translate-y-0' : 'translate-y-50'}`}>
                        <h1 className="font-SF text-gray-600 dark:text-white">ALIONKA HOUL - NOURRIR AVEC L'INSTINCT</h1>
                               
                </header>

    );
}

export default HomeHeader;
