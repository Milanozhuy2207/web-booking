import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';
import { groupsData } from '../data/mockData';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    
    // Theme state with system preference fallback
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme === 'dark';
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    // Filter & Search states
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [followerRange, setFollowerRange] = useState('All');
    const [budgetRange, setBudgetRange] = useState('All');

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    const addToCart = (group) => {
        if (!cartItems.find(item => item.id === group.id)) {
            setCartItems([...cartItems, group]);
        }
        setIsCartOpen(true);
    };

    const removeFromCart = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const parseFollowers = (val) => {
        if (typeof val !== 'string') return 0;
        const num = parseFloat(val);
        if (val.includes('M')) return num * 1000000;
        if (val.includes('K')) return num * 1000;
        return num;
    };

    const filteredData = useMemo(() => {
        return groupsData.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                 item.description.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
            
            // Follower filtering
            const followers = parseFollowers(item.followers);
            let matchesFollowers = true;
            if (followerRange === '< 200K') matchesFollowers = followers < 200000;
            else if (followerRange === '200K - 1M') matchesFollowers = followers >= 200000 && followers <= 1000000;
            else if (followerRange === '> 1M') matchesFollowers = followers > 1000000;

            // Budget filtering
            let matchesBudget = true;
            if (budgetRange === '< 2M') matchesBudget = item.price < 2000000;
            else if (budgetRange === '2M - 5M') matchesBudget = item.price >= 2000000 && item.price <= 5000000;
            else if (budgetRange === '> 5M') matchesBudget = item.price > 5000000;

            return matchesSearch && matchesCategory && matchesFollowers && matchesBudget;
        });
    }, [searchTerm, selectedCategory, followerRange, budgetRange]);

    const categories = ['All', ...new Set(groupsData.map(item => item.category))];
    const followerOptions = ['All', '< 200K', '200K - 1M', '> 1M'];
    const budgetOptions = ['All', '< 2M', '2M - 5M', '> 5M'];

    return (
        <CartContext.Provider value={{ 
            cartItems, 
            isCartOpen, 
            setIsCartOpen, 
            addToCart, 
            removeFromCart,
            searchTerm,
            setSearchTerm,
            selectedCategory,
            setSelectedCategory,
            followerRange,
            setFollowerRange,
            budgetRange,
            setBudgetRange,
            filteredData,
            categories,
            followerOptions,
            budgetOptions,
            isDarkMode,
            toggleTheme
        }}>
            {children}
        </CartContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);