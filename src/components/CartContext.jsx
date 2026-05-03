import React, { useState, useMemo, useEffect } from 'react';
import { groupsData } from '../data/mockData';
import { CartContext } from './CartContextInstance';

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    
    // Marketplace Data state with localStorage persistence
    const [marketplaceData, setMarketplaceData] = useState(() => {
        const savedData = localStorage.getItem('marketplaceData');
        return savedData ? JSON.parse(savedData) : groupsData;
    });

    // Admin Authentication state
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
        return localStorage.getItem('isAdminLoggedIn') === 'true';
    });

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
    const [notification, setNotification] = useState(null);

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

    // Sync marketplaceData to localStorage
    useEffect(() => {
        localStorage.setItem('marketplaceData', JSON.stringify(marketplaceData));
    }, [marketplaceData]);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    const adminLogin = (username, password) => {
        if (username === 'admin' && password === 'binh0962500719') {
            setIsAdminLoggedIn(true);
            localStorage.setItem('isAdminLoggedIn', 'true');
            return true;
        }
        return false;
    };

    const adminLogout = () => {
        setIsAdminLoggedIn(false);
        localStorage.removeItem('isAdminLoggedIn');
    };

    const addMarketplaceItem = (newItem) => {
        setMarketplaceData(prev => [...prev, { ...newItem, id: Date.now() }]);
        setNotification(`Đã thêm "${newItem.name}" thành công!`);
        setTimeout(() => setNotification(null), 3000);
    };

    const updateMarketplaceItem = (id, updatedItem) => {
        setMarketplaceData(prev => 
            prev.map(item => item.id === id ? { ...item, ...updatedItem } : item)
        );
        setNotification(`Đã cập nhật thông tin kênh thành công!`);
        setTimeout(() => setNotification(null), 3000);
    };

    const removeMarketplaceItem = (id) => {
        setMarketplaceData(prev => prev.filter(item => item.id !== id));
    };

    const addToCart = (group) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === group.id);
            if (existingItem) {
                setNotification(`Đã tăng số lượng "${group.name}" trong giỏ hàng!`);
                setTimeout(() => setNotification(null), 3000);
                return prevItems.map(item => 
                    item.id === group.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
                );
            }
            setNotification(`Đã thêm "${group.name}" vào giỏ hàng!`);
            setTimeout(() => setNotification(null), 3000);
            return [...prevItems, { ...group, quantity: 1 }];
        });
    };

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(prevItems => 
            prevItems.map(item => item.id === id ? { ...item, quantity: newQuantity } : item)
        );
    };

    const removeFromCart = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const parseFollowers = (val) => {
        if (typeof val !== 'string') return 0;
        const num = parseFloat(val);
        if (val.includes('M')) return num * 1000000;
        if (val.includes('K')) return num * 1000;
        return num;
    };

    const filteredData = useMemo(() => {
        return marketplaceData.filter(item => {
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
    }, [searchTerm, selectedCategory, followerRange, budgetRange, marketplaceData]);

    const categories = ['All', ...new Set(marketplaceData.map(item => item.category))];
    const followerOptions = ['All', '< 200K', '200K - 1M', '> 1M'];
    const budgetOptions = ['All', '< 2M', '2M - 5M', '> 5M'];

    return (
        <CartContext.Provider value={{ 
            cartItems, 
            isCartOpen, 
            setIsCartOpen, 
            addToCart, 
            removeFromCart,
            updateQuantity,
            clearCart,
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
            notification,
            setNotification,
            isDarkMode,
            toggleTheme,
            isAdminLoggedIn,
            adminLogin,
            adminLogout,
            marketplaceData,
            addMarketplaceItem,
            updateMarketplaceItem,
            removeMarketplaceItem
        }}>
            {children}
        </CartContext.Provider>
    );
};
