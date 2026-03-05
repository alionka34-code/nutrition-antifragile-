<h3 className="font-SFBold text-xl md:text-2xl my-8 text-center  dark:text-white">Choisissez votre formule</h3>
             {errorMessage && (
                    <div ref={errorRef} className="mb-6 text-center text-red-700 bg-red-100 border border-red-400 rounded-2xl py-2 px-4 font-SF">
                        {errorMessage}
                    </div>
                )}

             
             {/* Formulaire de sélection des plans */}
            <div className='flex flex-col gap-10'>
               
                <div>
                    <input 
                    type="radio" 
                    id="launch" 
                    name="plan" 
                    value="launch" 
                    className="hidden"
                    onChange={(e) => setSelectedPlan(e.target.value)}
                />
                <label htmlFor="launch" className="block">
                     <div className={`border-2 border-solid rounded-2xl p-4 mt-4 shadow-lg relative cursor-pointer transition-all duration-300 ${
                         selectedPlan === 'launch' 
                         ? 'border-marron shadow-marron/30 bg-marron/5 scale-105 shadow-2xl' 
                         : 'border-gray-200 shadow-black/50 hover:border-marron/70 hover:scale-102'
                     }`}>
                        {/* Check badge when selected */}
                        {selectedPlan === 'launch' && (
                          <span
                            className="absolute top-3 right-3 w-6 h-6 md:w-7 md:h-7 rounded-full bg-marron text-white flex items-center justify-center shadow"
                            aria-label="Plan sélectionné"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7.5 7.5a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L8.5 12.086l6.793-6.793a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                        )}
                        <div className="relative bottom-7">
                        <span className="font-SFBold text-white border-2 rounded-2xl py-1 px-4 bg-red-400 animate-pulse" >OFFRE POPULAIRE</span>
                    </div>
                    <h4 className="font-SFBold text-2xl  dark:text-white">Abonnement annuel</h4>
                    <h5 className="font-SFBold text-2xl text-marron my-2">
                        100€<span className="text-xl font-SF text-gray-500">/an</span>
                        </h5>
                    
                    <div className="font-SF md:text-lg text-marron border-2 rounded-4xl py-1 px-2 md:w-70">Economisez 2 mois d'abonnement</div>
                    
                </div>
                </label>
            </div>
            
            <div>
                 <input 
                    type="radio" 
                    id="monthly" 
                    name="plan" 
                    value="monthly" 
                    className="hidden"
                    onChange={(e) => setSelectedPlan(e.target.value)}
                />
                <label htmlFor="monthly" className="block">
                     <div className={`border-2 border-solid rounded-2xl p-4 mt-4 shadow-lg relative cursor-pointer transition-all duration-300 ${
                         selectedPlan === 'monthly' 
                         ? 'border-marron shadow-marron/30 bg-marron/5 scale-105 shadow-2xl' 
                         : 'border-gray-200 shadow-black/50 hover:border-marron/70 hover:scale-102'
                     }`}>
                        {/* Check badge when selected */}
                        {selectedPlan === 'monthly' && (
                          <span
                            className="absolute top-3 right-3 w-6 h-6 md:w-7 md:h-7 rounded-full bg-marron text-white flex items-center justify-center shadow"
                            aria-label="Plan sélectionné"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7.5 7.5a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L8.5 12.086l6.793-6.793a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                        )}
                    <h4 className="font-SFBold text-2xl  dark:text-white">Abonnement mensuel</h4>
                    <h5 className="font-SFBold text-2xl text-marron my-2">10€<span className='text-xl font-SF text-gray-500'>/mois</span></h5>
                    <span className="font-SF md:text-lg text-marron border-2 rounded-2xl py-1 px-2">Flexibilité maximale</span>
                </div>
                </label>
            </div>      
            </div>
            <div className='mt-10 border-2 border-marron rounded-2xl p-4 shadow-lg shadow-black/50'>
            <h3 className='font-SFBold text-center  text-2xl md:text-4xl mb-4  dark:text-white'>Ce que vous obtenez</h3>
            <ul className='pl-6 text-lg md:text-xl font-SF mr-4'>
                <li className='mb-6'>
                    <strong className='text-marron font-SFBold'>✓ Accès illimité</strong>
                    <br/><span className='dark:text-white'>Consultez l’ensemble des articles et vidéos, passés et à venir, sans aucune restriction tant que vous êtes membre.</span>
                </li>
                <li className='mb-6'>
                    <strong className='text-marron font-SFBold'>✓ Analyses indépendantes et sourcées</strong>
                    <br/><span className='dark:text-white'>Des contenus rigoureux, sans filtre ni influence commerciale, pour comprendre les enjeux réels de l’alimentation et de la santé moderne.</span>
                </li>
                <li className='mb-6'>
                    <strong className='text-marron font-SFBold'>✓ Communauté privée</strong>
                    <br/><span className='dark:text-white'>Rejoignez un cercle de lecteurs engagés qui veulent reprendre le contrôle de leur santé, échanger, et approfondir leurs connaissances.</span>
                </li>
            </ul>
        </div>
        <button 
            className="mt-8 block mx-auto text-lg font-SFBold rounded-full text-white px-6 py-4 bg-gradient-to-tr from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-black transition-colors duration-300 md:text-xl" 
            type="submit"
            disabled={loading}
        >
            {loading ? "Redirection en cours..." : "COMMENCER MON ABONNEMENT"}
        </button>
        <p className='mt-10 font-SF md:text-xl text-center dark:text-white'> ✅ Paiement sécurisé • ✅ Accès immédiat • ✅ Résiliation à tout moment</p>