import { NavLink } from 'react-router-dom';
import {
    Bars3Icon as MenuIcon,
    XMarkIcon as XIcon,
    MagnifyingGlassIcon as SearchIcon,
    HeartIcon,
    UserIcon,
    ShoppingBagIcon
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user } = useAuth()
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [cartItemsCount] = useState(0);

    // ... rest of your component remains exactly the same ...

    return (
        <nav className="fixed top-0 left-0 right-0 border-b border-gray-200 bg-white z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-">
                <div className="flex justify-between h-16 items-center">
                    {/* Brand Logo and Mobile Menu Button */}
                    <div className="flex items-center">
                        {/* Mobile menu button */}
                        <button
                            type="button"
                            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <span className="sr-only">Open main menu</span>
                            {mobileMenuOpen ? (
                                <XIcon className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>

                        {/* Brand Logo */}
                        <div className="flex-shrink-0 flex items-center ml-4 md:ml-0">
                            <span className="text-xl font-light tracking-widest">JEANO|GRAM</span>
                        </div>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:ml-6 md:flex md:space-x-8">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive
                                    ? 'border-red-500 text-gray-900'
                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                }`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/products"
                            className={({ isActive }) =>
                                `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive
                                    ? 'border-red-500 text-gray-900'
                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                }`
                            }
                        >
                            Products
                        </NavLink>
                        <NavLink
                            to="/collections"
                            className={({ isActive }) =>
                                `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive
                                    ? 'border-red-500 text-gray-900'
                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                }`
                            }
                        >
                            Collections
                        </NavLink>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive
                                    ? 'border-red-500 text-gray-900'
                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                }`
                            }
                        >
                            About
                        </NavLink>
                    </div>

                    {/* Right side icons */}
                    <div className="flex items-center space-x-4">
                       

                        <button
                         onClick={() => navigate('/wishlist')}
                            className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            aria-label="Wishlist"
                        >
                            <HeartIcon className="h-5 w-5" aria-hidden="true" />
                        </button>

                        {/* Shopping Cart with Badge */}
                        <div className="relative">
                            <button
                                onClick={() => navigate('/cart')}
                                className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                aria-label="Cart"
                            >
                                <ShoppingBagIcon className="h-5 w-5" aria-hidden="true" />
                                {cartItemsCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                        {cartItemsCount}
                                    </span>
                                )}
                            </button>
                        </div>

                        <button
                            onClick={() => navigate('/login')}
                            className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            aria-label="Account"
                        >
                            <UserIcon className="h-5 w-5" aria-hidden="true" />
                        </button>

                        <h2 >{user.name}</h2>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
                <div className="pt-2 pb-4 space-y-1 bg-white shadow-lg">
                    <NavLink
                        to="/"
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                            `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${isActive
                                ? 'border-red-500 bg-red-50 text-red-700'
                                : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                            }`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/products"
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                            `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${isActive
                                ? 'border-red-500 bg-red-50 text-red-700'
                                : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                            }`
                        }
                    >
                        Products
                    </NavLink>
                    <NavLink
                        to="/collections"
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                            `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${isActive
                                ? 'border-red-500 bg-red-50 text-red-700'
                                : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                            }`
                        }
                    >
                        Collections
                    </NavLink>
                    <NavLink
                        to="/about"
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                            `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${isActive
                                ? 'border-red-500 bg-red-50 text-red-700'
                                : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                            }`
                        }
                    >
                        About
                    </NavLink>
                    <div className="pt-4 pb-2 border-t border-gray-200">
                        <div className="flex items-center px-4 space-x-3">
                            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500">
                                <SearchIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                            <button
                                onClick={() => {
                                        setMobileMenuOpen(false);
                                        navigate('/wishlist');
                                    }}
                                className="p-1 rounded-full text-gray-400 hover:text-gray-500"
                            >
                                <HeartIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                            <div className="relative">
                                <button
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        navigate('/cart');
                                    }}
                                    className="p-1 rounded-full text-gray-400 hover:text-gray-500"
                                >
                                    <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
                                    {cartItemsCount > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                            {cartItemsCount}
                                        </span>
                                    )}
                                </button>
                            </div>
                            <button
                                onClick={() => {
                                    setMobileMenuOpen(false);
                                    navigate('/login');
                                }}
                                className="p-1 rounded-full text-gray-400 hover:text-gray-500"
                            >
                                <UserIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                            {/* <span className="text-xs font-light tracking-widest">Callus ©</span> */}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;