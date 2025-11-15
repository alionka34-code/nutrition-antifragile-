import React from 'react';

import { useEffect, useState } from 'react';

function HomeHeader() { 
    const [visible, setVisible] = useState(false);
    
    useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);
    return (
        <header className="px-4">
                
        </header>

    );
}

export default HomeHeader;
