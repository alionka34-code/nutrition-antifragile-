import React from 'react';

function SectionPrice() {
    return (
        <section className="mx-4 md:mx-auto md:max-w-[1400px] my-20">
            <h2 className='font-SFBold text-4xl text-center'>Comment on travail <span className='text-marron'>ensemble ?</span>🤝</h2>
            <p className='font-SF text-2xl text-gray-600 dark:text-gray-300 mt-4 text-center'>3 formules, du simple au complet. Toutes incluent des résultats mesurables.</p>
            <div className='flex flex-col md:flex-row mt-20 gap-10 md:items-stretch'>
                <div className='flex-1 p-8 rounded-3xl flex flex-col bg-degrade shadow-2xl'>
                    <div className=' flex justify-center my-4'>
                        <svg width="70" height="70" viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_173_10)">
                    <rect width="100" height="100" rx="20" fill="url(#paint0_linear_173_10)" fill-opacity="0.69" shape-rendering="crispEdges"/>
                    <path d="M25 62.5V59.7396C25 58.4003 25.7205 57.3104 27.1615 56.4698C28.6024 55.6288 30.4927 55.2083 32.8323 55.2083C33.2545 55.2083 33.6606 55.217 34.0505 55.2344C34.4405 55.2517 34.8264 55.2891 35.2083 55.3464C34.9306 55.9488 34.7222 56.5594 34.5833 57.1781C34.4444 57.7965 34.375 58.442 34.375 59.1146V62.5H25ZM37.5 62.5V59.1146C37.5 58.0035 37.8038 56.9878 38.4115 56.0677C39.0191 55.1476 39.8785 54.3403 40.9896 53.6458C42.1007 52.9514 43.4288 52.4306 44.974 52.0833C46.5191 51.7361 48.1944 51.5625 50 51.5625C51.8403 51.5625 53.533 51.7361 55.0781 52.0833C56.6233 52.4306 57.9514 52.9514 59.0625 53.6458C60.1736 54.3403 61.0243 55.1476 61.6146 56.0677C62.2049 56.9878 62.5 58.0035 62.5 59.1146V62.5H37.5ZM65.625 62.5V59.1146C65.625 58.425 65.5642 57.7752 65.4427 57.1651C65.3212 56.555 65.1215 55.9502 64.8437 55.3505C65.2257 55.2905 65.6106 55.2517 65.9984 55.2344C66.3863 55.217 66.7826 55.2083 67.1875 55.2083C69.5312 55.2083 71.4193 55.621 72.8516 56.4464C74.2839 57.2717 75 58.3694 75 59.7396V62.5H65.625ZM40.625 59.375H59.375V59.0625C59.375 57.7778 58.4983 56.7274 56.7448 55.9115C54.9913 55.0955 52.7431 54.6875 50 54.6875C47.2569 54.6875 45.0087 55.0955 43.2552 55.9115C41.5017 56.7274 40.625 57.7951 40.625 59.1146V59.375ZM32.7901 53.6458C31.7981 53.6458 30.9462 53.2889 30.2344 52.575C29.5226 51.8608 29.1667 51.0024 29.1667 50C29.1667 48.9931 29.5236 48.1337 30.2375 47.4219C30.9517 46.7101 31.8101 46.3542 32.8125 46.3542C33.8194 46.3542 34.6788 46.7101 35.3906 47.4219C36.1024 48.1337 36.4583 49.0005 36.4583 50.0224C36.4583 51.0144 36.1024 51.8663 35.3906 52.5781C34.6788 53.2899 33.812 53.6458 32.7901 53.6458ZM67.1651 53.6458C66.1731 53.6458 65.3212 53.2889 64.6094 52.575C63.8976 51.8608 63.5417 51.0024 63.5417 50C63.5417 48.9931 63.8986 48.1337 64.6125 47.4219C65.3267 46.7101 66.1851 46.3542 67.1875 46.3542C68.1944 46.3542 69.0538 46.7101 69.7656 47.4219C70.4774 48.1337 70.8333 49.0005 70.8333 50.0224C70.8333 51.0144 70.4774 51.8663 69.7656 52.5781C69.0538 53.2899 68.187 53.6458 67.1651 53.6458ZM50 50C48.2639 50 46.7882 49.3924 45.5729 48.1771C44.3576 46.9618 43.75 45.4861 43.75 43.75C43.75 41.9792 44.3576 40.4948 45.5729 39.2969C46.7882 38.099 48.2639 37.5 50 37.5C51.7708 37.5 53.2552 38.099 54.4531 39.2969C55.651 40.4948 56.25 41.9792 56.25 43.75C56.25 45.4861 55.651 46.9618 54.4531 48.1771C53.2552 49.3924 51.7708 50 50 50ZM50.0182 46.875C50.9089 46.875 51.6493 46.5738 52.2396 45.9714C52.8299 45.3689 53.125 44.6224 53.125 43.7318C53.125 42.8411 52.8273 42.1007 52.2318 41.5104C51.6363 40.9201 50.8984 40.625 50.0182 40.625C49.138 40.625 48.3941 40.9227 47.7865 41.5182C47.1788 42.1137 46.875 42.8516 46.875 43.7318C46.875 44.612 47.1762 45.3559 47.7786 45.9635C48.3811 46.5712 49.1276 46.875 50.0182 46.875Z" fill="#E3E3E3"/>
                    </g>
                    <defs>
                    <filter id="filter0_d_173_10" x="0" y="0" width="108" height="108" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dx="4" dy="4"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_173_10"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_173_10" result="shape"/>
                    </filter>
                    <linearGradient id="paint0_linear_173_10" x1="50" y1="0" x2="50" y2="100" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FF9500"/>
                    <stop offset="1" stop-color="#995900"/>
                    </linearGradient>
                    </defs>
                    </svg>

                    </div>
                   
                    <h3 className='font-SFBold text-center text-2xl'>Conférence impact</h3>
                    <p className='font-SF text-center text-lg text-gray-600 dark:text-gray-300'>le déclic pour vos équipes</p>
                    <p className='font-SFBold text-center text-4xl mt-10'>1 500€</p>
                    <div className="text-center">
                        <div className="bg-degrade-marron inline-block items-center justify-center rounded-2xl px-3 py-1 mt-2"><p className='text-center font-SF text-white'>offre de lancement</p></div>
                    </div>
                    <div className='my-10 space-y-2 font-SF text-xl flex-grow'>
                        <p><span className="text-marron">✓ </span><span className="font-SFBold">1h de conférence interactive</span> pour comprendre porquoi vos équipes ont des baisses d'énergie</p>
                        <p><span className="text-marron">✓ </span> 3 actions simples<span className='font-SFBold'> à appliquer dès demain</span></p>
                        <p><span className="text-marron">✓ </span>Q&R incluse</p>
                        <p><span className="text-marron">✓ </span>Mini-guide PDF récapitulatif</p>
                         <p><span className="text-marron">✓ </span>Présentiel ou visio (partout en France)</p>

                        <p className='text-gray-600 font-SF text-xl mt-6 dark:text-gray-300'><span className='font-SFBold'>Idéal pour: </span>Initier rapidement une démarche QVCT et améliorer engagement, énergie et performance des équipes</p>
                          <p className='text-gray-600 font-SF text-xl mt-6 dark:text-gray-300'><span className='font-SFBold'>Bénéfice clé: </span>prise de conscience + premières actions faciles à mettre en place</p>
                    </div>
                    <div className="text-center mt-auto">
                        <button onClick={() => {
                const element = document.getElementById('contact-form');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }} className="mt-8 text-xl font-SFBold rounded-full text-white py-2 px-8  bg-gradient-to-tr from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-black transition-colors duration-300">On en discute ?</button>
                    </div>
                </div>
                <div className='flex-1 shadow-2xl rounded-3xl border-1 border-marron  flex flex-col md:scale-110'>
                    <p className='font-SFBold text-md p-2 text-center'>⭐ Le plus choisi par les DRH</p>
                    <div className=' px-8 pt-8 pb-12 bg-degrade-marron rounded-b-3xl'>
                        <div className=' flex justify-center my-4'>
                        <svg width="70" height="70" viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_173_10)">
                    <rect width="100" height="100" rx="20" fill="url(#paint0_linear_173_10)" fill-opacity="0.69" shape-rendering="crispEdges"/>
                    <path d="M25 62.5V59.7396C25 58.4003 25.7205 57.3104 27.1615 56.4698C28.6024 55.6288 30.4927 55.2083 32.8323 55.2083C33.2545 55.2083 33.6606 55.217 34.0505 55.2344C34.4405 55.2517 34.8264 55.2891 35.2083 55.3464C34.9306 55.9488 34.7222 56.5594 34.5833 57.1781C34.4444 57.7965 34.375 58.442 34.375 59.1146V62.5H25ZM37.5 62.5V59.1146C37.5 58.0035 37.8038 56.9878 38.4115 56.0677C39.0191 55.1476 39.8785 54.3403 40.9896 53.6458C42.1007 52.9514 43.4288 52.4306 44.974 52.0833C46.5191 51.7361 48.1944 51.5625 50 51.5625C51.8403 51.5625 53.533 51.7361 55.0781 52.0833C56.6233 52.4306 57.9514 52.9514 59.0625 53.6458C60.1736 54.3403 61.0243 55.1476 61.6146 56.0677C62.2049 56.9878 62.5 58.0035 62.5 59.1146V62.5H37.5ZM65.625 62.5V59.1146C65.625 58.425 65.5642 57.7752 65.4427 57.1651C65.3212 56.555 65.1215 55.9502 64.8437 55.3505C65.2257 55.2905 65.6106 55.2517 65.9984 55.2344C66.3863 55.217 66.7826 55.2083 67.1875 55.2083C69.5312 55.2083 71.4193 55.621 72.8516 56.4464C74.2839 57.2717 75 58.3694 75 59.7396V62.5H65.625ZM40.625 59.375H59.375V59.0625C59.375 57.7778 58.4983 56.7274 56.7448 55.9115C54.9913 55.0955 52.7431 54.6875 50 54.6875C47.2569 54.6875 45.0087 55.0955 43.2552 55.9115C41.5017 56.7274 40.625 57.7951 40.625 59.1146V59.375ZM32.7901 53.6458C31.7981 53.6458 30.9462 53.2889 30.2344 52.575C29.5226 51.8608 29.1667 51.0024 29.1667 50C29.1667 48.9931 29.5236 48.1337 30.2375 47.4219C30.9517 46.7101 31.8101 46.3542 32.8125 46.3542C33.8194 46.3542 34.6788 46.7101 35.3906 47.4219C36.1024 48.1337 36.4583 49.0005 36.4583 50.0224C36.4583 51.0144 36.1024 51.8663 35.3906 52.5781C34.6788 53.2899 33.812 53.6458 32.7901 53.6458ZM67.1651 53.6458C66.1731 53.6458 65.3212 53.2889 64.6094 52.575C63.8976 51.8608 63.5417 51.0024 63.5417 50C63.5417 48.9931 63.8986 48.1337 64.6125 47.4219C65.3267 46.7101 66.1851 46.3542 67.1875 46.3542C68.1944 46.3542 69.0538 46.7101 69.7656 47.4219C70.4774 48.1337 70.8333 49.0005 70.8333 50.0224C70.8333 51.0144 70.4774 51.8663 69.7656 52.5781C69.0538 53.2899 68.187 53.6458 67.1651 53.6458ZM50 50C48.2639 50 46.7882 49.3924 45.5729 48.1771C44.3576 46.9618 43.75 45.4861 43.75 43.75C43.75 41.9792 44.3576 40.4948 45.5729 39.2969C46.7882 38.099 48.2639 37.5 50 37.5C51.7708 37.5 53.2552 38.099 54.4531 39.2969C55.651 40.4948 56.25 41.9792 56.25 43.75C56.25 45.4861 55.651 46.9618 54.4531 48.1771C53.2552 49.3924 51.7708 50 50 50ZM50.0182 46.875C50.9089 46.875 51.6493 46.5738 52.2396 45.9714C52.8299 45.3689 53.125 44.6224 53.125 43.7318C53.125 42.8411 52.8273 42.1007 52.2318 41.5104C51.6363 40.9201 50.8984 40.625 50.0182 40.625C49.138 40.625 48.3941 40.9227 47.7865 41.5182C47.1788 42.1137 46.875 42.8516 46.875 43.7318C46.875 44.612 47.1762 45.3559 47.7786 45.9635C48.3811 46.5712 49.1276 46.875 50.0182 46.875Z" fill="#E3E3E3"/>
                    </g>
                    <defs>
                    <filter id="filter0_d_173_10" x="0" y="0" width="108" height="108" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dx="4" dy="4"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_173_10"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_173_10" result="shape"/>
                    </filter>
                    <linearGradient id="paint0_linear_173_10" x1="50" y1="0" x2="50" y2="100" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FF9500"/>
                    <stop offset="1" stop-color="#995900"/>
                    </linearGradient>
                    </defs>
                    </svg>
                    </div>
                        <h3 className='font-SFBold text-center text-2xl text-white'>Conférence + Atelier </h3>
                    <p className='font-SF text-center text-lg text-gray-600 dark:text-gray-300'>Le format qui change vraiment les habitudes</p>
                    <p className='font-SFBold text-center text-4xl mt-10 text-white'>2 500€</p>
                    <div className="text-center">
                        <div className="bg-degrade-marron inline-block items-center justify-center rounded-2xl px-2 py-1 mt-2"><p className='text-center font-SF text-white'>🔥 78% de nos clients choisissent cette option</p></div>
                    </div>
                    <div className='my-10 space-y-2 text-white font-SF text-xl flex-grow'>
                        <p><span className="text-marron">✓ </span><span className='font-SFBold'>1h30: </span>conférence + atelier pratique pour passer de la théorie à l'action</p>
                        <p><span className="text-marron">✓ </span><span className='font-SFBold'>Atelier décryptage:</span> analyse d'étiquettes réelles, identification des pièges marketing </p>
                        <p><span className="text-marron">✓ </span>Jeux interactifs et défis nutrition pour favoriser l'engagment</p>
                        <p><span className="text-marron">✓ </span>Q&R incluse</p>
                        <p><span className="text-marron">✓ </span>Mini-guide PDF récapitulatif</p>
                         <p><span className="text-marron">✓ </span><span className='font-SFBold'>Webinaire de suivi </span>à J+30 offert pour prolonger la dynamique</p>
                        <p className='text-gray-600 dark:text-gray-300 font-SF text-xl mt-6'><span className='font-SFBold'>Pourquoi ce format marche :</span> L'atelier pratique DOUBLE l'adoption des bonnes habitudes. Vos équipes ne repartent pas avec de la théorie, mais avec des réflexes ancrés.</p>
                    </div>
                    <div className="text-center mt-auto">
                        <button onClick={() => {
                const element = document.getElementById('contact-form');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }} className="mt-8 text-xl font-SFBold rounded-full text-white py-2 px-8  bg-gradient-to-tr from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-black transition-colors duration-300">C'est parti !</button>
                    </div>
                    
                    </div>
                </div>
                <div className='flex-1  bg-degrade rounded-3xl p-8 flex flex-col shadow-2xl'>
                    <div className=' flex justify-center my-4'>
                        <svg width="70" height="70" viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_173_10)">
                    <rect width="100" height="100" rx="20" fill="url(#paint0_linear_173_10)" fill-opacity="0.69" shape-rendering="crispEdges"/>
                    <path d="M25 62.5V59.7396C25 58.4003 25.7205 57.3104 27.1615 56.4698C28.6024 55.6288 30.4927 55.2083 32.8323 55.2083C33.2545 55.2083 33.6606 55.217 34.0505 55.2344C34.4405 55.2517 34.8264 55.2891 35.2083 55.3464C34.9306 55.9488 34.7222 56.5594 34.5833 57.1781C34.4444 57.7965 34.375 58.442 34.375 59.1146V62.5H25ZM37.5 62.5V59.1146C37.5 58.0035 37.8038 56.9878 38.4115 56.0677C39.0191 55.1476 39.8785 54.3403 40.9896 53.6458C42.1007 52.9514 43.4288 52.4306 44.974 52.0833C46.5191 51.7361 48.1944 51.5625 50 51.5625C51.8403 51.5625 53.533 51.7361 55.0781 52.0833C56.6233 52.4306 57.9514 52.9514 59.0625 53.6458C60.1736 54.3403 61.0243 55.1476 61.6146 56.0677C62.2049 56.9878 62.5 58.0035 62.5 59.1146V62.5H37.5ZM65.625 62.5V59.1146C65.625 58.425 65.5642 57.7752 65.4427 57.1651C65.3212 56.555 65.1215 55.9502 64.8437 55.3505C65.2257 55.2905 65.6106 55.2517 65.9984 55.2344C66.3863 55.217 66.7826 55.2083 67.1875 55.2083C69.5312 55.2083 71.4193 55.621 72.8516 56.4464C74.2839 57.2717 75 58.3694 75 59.7396V62.5H65.625ZM40.625 59.375H59.375V59.0625C59.375 57.7778 58.4983 56.7274 56.7448 55.9115C54.9913 55.0955 52.7431 54.6875 50 54.6875C47.2569 54.6875 45.0087 55.0955 43.2552 55.9115C41.5017 56.7274 40.625 57.7951 40.625 59.1146V59.375ZM32.7901 53.6458C31.7981 53.6458 30.9462 53.2889 30.2344 52.575C29.5226 51.8608 29.1667 51.0024 29.1667 50C29.1667 48.9931 29.5236 48.1337 30.2375 47.4219C30.9517 46.7101 31.8101 46.3542 32.8125 46.3542C33.8194 46.3542 34.6788 46.7101 35.3906 47.4219C36.1024 48.1337 36.4583 49.0005 36.4583 50.0224C36.4583 51.0144 36.1024 51.8663 35.3906 52.5781C34.6788 53.2899 33.812 53.6458 32.7901 53.6458ZM67.1651 53.6458C66.1731 53.6458 65.3212 53.2889 64.6094 52.575C63.8976 51.8608 63.5417 51.0024 63.5417 50C63.5417 48.9931 63.8986 48.1337 64.6125 47.4219C65.3267 46.7101 66.1851 46.3542 67.1875 46.3542C68.1944 46.3542 69.0538 46.7101 69.7656 47.4219C70.4774 48.1337 70.8333 49.0005 70.8333 50.0224C70.8333 51.0144 70.4774 51.8663 69.7656 52.5781C69.0538 53.2899 68.187 53.6458 67.1651 53.6458ZM50 50C48.2639 50 46.7882 49.3924 45.5729 48.1771C44.3576 46.9618 43.75 45.4861 43.75 43.75C43.75 41.9792 44.3576 40.4948 45.5729 39.2969C46.7882 38.099 48.2639 37.5 50 37.5C51.7708 37.5 53.2552 38.099 54.4531 39.2969C55.651 40.4948 56.25 41.9792 56.25 43.75C56.25 45.4861 55.651 46.9618 54.4531 48.1771C53.2552 49.3924 51.7708 50 50 50ZM50.0182 46.875C50.9089 46.875 51.6493 46.5738 52.2396 45.9714C52.8299 45.3689 53.125 44.6224 53.125 43.7318C53.125 42.8411 52.8273 42.1007 52.2318 41.5104C51.6363 40.9201 50.8984 40.625 50.0182 40.625C49.138 40.625 48.3941 40.9227 47.7865 41.5182C47.1788 42.1137 46.875 42.8516 46.875 43.7318C46.875 44.612 47.1762 45.3559 47.7786 45.9635C48.3811 46.5712 49.1276 46.875 50.0182 46.875Z" fill="#E3E3E3"/>
                    </g>
                    <defs>
                    <filter id="filter0_d_173_10" x="0" y="0" width="108" height="108" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dx="4" dy="4"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_173_10"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_173_10" result="shape"/>
                    </filter>
                    <linearGradient id="paint0_linear_173_10" x1="50" y1="0" x2="50" y2="100" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FF9500"/>
                    <stop offset="1" stop-color="#995900"/>
                    </linearGradient>
                    </defs>
                    </svg>

                    </div>
                    <h3 className='font-SFBold text-center text-2xl'>Programme sur mesure</h3>
                    <p className='font-SF text-center text-lg dark:text-gray-300 text-gray-600'>Pour des résultats mesurables & durables</p>
                    <p className='font-SFBold text-center text-4xl mt-10'>Sur devis</p>
                    <div className="text-center">
                        <div className="bg-degrade-marron inline-block items-center justify-center rounded-2xl px-3 py-1 mt-2"><p className='text-center font-SF text-white'>selon vos besoin</p></div>
                    </div>
                    <div className='my-10 space-y-2 font-SF text-xl flex-grow'>
                        <p><span className="text-marron">✓ </span><span className='font-SFBold'>Programme personnalisé</span> après analyse approfondie de vos problématiques</p>
                        <p><span className="text-marron">✓ </span><span className='font-SFBold'>Demi-journée ou journée complète</span> avec alternance conférence, ateliers thématiques, cas pratiques sectoriels</p>
                        <p><span className="text-marron">✓ </span>Kit communication clé en main : 5 posters  impactants pour vos espaces communs + 5 fiches mémo prêtes à diffuser. Tout en format HD, personnalisable à vos couleurs</p>
                        <p><span className="text-marron">✓ </span>Mini-guide PDF récapitulatif</p>
                        <p><span className="text-marron">✓ </span><span className='font-SFBold'>Webinaire de suivi à J+30</span> offert pour prolonger la dynamique </p>
                        <p><span className="text-marron">✓ </span><span className='font-SFBold'>Mesure d'impact ROI:</span> Questionnaires avant/après pour quantifier les résultats (énergie, concentration, satisfaction) </p>
                        <p className='text-gray-600 font-SF text-xl mt-6 dark:text-gray-300'><span className='font-SFBold'>Pour qui : </span>Entreprises qui veulent un impact durable et un ROI justifiable sur leur budget QVCT/RSE</p>
                    </div>
                    <div className="text-center mt-auto">
                        <button onClick={() => {
                const element = document.getElementById('contact-form');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }} className="mt-8 text-xl font-SFBold rounded-full text-white py-2 px-4  bg-gradient-to-tr from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-black transition-colors duration-300">Demander un devis</button>
                    </div>
                </div>
                

            </div>


        </section>
    );
}

export default SectionPrice;