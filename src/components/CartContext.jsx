import React, { useState, useMemo, useEffect } from 'react';
import { groupsData } from '../data/mockData';
import { CartContext } from './CartContextInstance';
import { db } from '../services/firebase';
import { ref, onValue, set, push, remove, update } from "firebase/database";

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [marketplaceData, setMarketplaceData] = useState([]); // Khởi tạo mảng rỗng, sẽ load từ Firebase
    const [isLoading, setIsLoading] = useState(true);

    // Load dữ liệu từ Firebase Realtime Database
    useEffect(() => {
        const marketplaceRef = ref(db, 'marketplace');
        
        // Lắng nghe thay đổi thời gian thực
        const unsubscribe = onValue(marketplaceRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Chuyển đối tượng Firebase thành mảng
                const itemsArray = Object.keys(data).map(key => ({
                    ...data[key],
                    id: key // Dùng key của Firebase làm ID
                }));
                setMarketplaceData(itemsArray);
            } else {
                // Nếu DB trống, khởi tạo bằng dữ liệu mẫu (chỉ chạy lần đầu)
                setMarketplaceData(groupsData);
                // Lưu dữ liệu mẫu lên Firebase nếu muốn
                // groupsData.forEach(item => push(marketplaceRef, item));
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Admin Authentication state
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
        return localStorage.getItem('isAdminLoggedIn') === 'true';
    });

    // Theme state
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

    // Firebase CRUD Operations
    const addMarketplaceItem = (newItem) => {
        const marketplaceRef = ref(db, 'marketplace');
        push(marketplaceRef, newItem);
        setNotification(`Đã thêm "${newItem.name}" thành công!`);
        setTimeout(() => setNotification(null), 3000);
    };

    const updateMarketplaceItem = (id, updatedItem) => {
        const itemRef = ref(db, `marketplace/${id}`);
        update(itemRef, updatedItem);
        setNotification(`Đã cập nhật thông tin kênh thành công!`);
        setTimeout(() => setNotification(null), 3000);
    };

    const removeMarketplaceItem = (id) => {
        const itemRef = ref(db, `marketplace/${id}`);
        remove(itemRef);
        setNotification(`Đã xóa kênh thành công!`);
        setTimeout(() => setNotification(null), 3000);
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
            removeMarketplaceItem,
            isLoading
        }}>
            {children}
        </CartContext.Provider>
    );
};
