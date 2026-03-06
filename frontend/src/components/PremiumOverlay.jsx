import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContextDefinition';

function PremiumOverlay({ children }) {
    const { isSubscribed, isAdmin, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    if (loading) return children;

    if (isSubscribed || isAdmin) return children;

    return (
        <div className="relative">
            <div className="blur-sm pointer-events-none select-none">
                {children}
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-white/60 dark:bg-neutral-900/70 z-50">
                <div className="text-center p-6 md:p-10 bg-white rounded-xl shadow-2xl max-w-md mx-4 dark:bg-neutral-800">
                    <svg className="w-12 h-12 md:w-16 md:h-16 text-marron mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <h3 className="text-xl md:text-2xl font-SFBold text-marron mb-2">Contenu réservé aux membres</h3>
                    <p className="text-gray-600 font-SF mb-6 text-sm md:text-base dark:text-gray-300">
                        Rejoins la communauté pour accéder au contenu
                    </p>
                    <button
                        onClick={() => navigate('/abonnement')}
                        className="bg-marron text-white px-8 py-3 rounded-lg font-SFBold hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg"
                    >
                        S'abonner
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PremiumOverlay;
