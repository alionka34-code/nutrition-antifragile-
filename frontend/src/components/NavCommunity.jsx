import React from 'react';
import { NavLink } from 'react-router-dom';

function NavCommunity() {
    const links = [
        { to: '/community', label: 'Communauté' },
        { to: '/themes', label: 'Dossiers' },
        { to: '/annexes', label: 'Guides' },
        { to: '/articles', label: 'Analyses' },

    ];

    return (
        <nav className="flex justify-center gap-2 md:gap-6 px-4 py-4 border-b-1 border-t-1 border-gray-300 dark:border-neutral-700">
            {links.map((link) => (
                <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                        `font-SF text-sm md:text-lg px-3 md:px-5 py-2 rounded-lg transition-all ${
                            isActive
                                ? 'bg-marron text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-600'
                        }`
                    }
                >
                    {link.label}
                </NavLink>
            ))}
        </nav>
    );
}

export default NavCommunity;
