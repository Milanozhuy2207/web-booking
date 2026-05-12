import React, { useState } from 'react';
import { useCart } from '../components/CartContextInstance';
import { 
    FiPlus, FiTrash2, FiExternalLink, FiImage, 
    FiSearch, FiFilter, FiEdit2, FiX, FiActivity,
    FiFacebook, FiZap, FiGrid, FiDollarSign, FiUsers, FiGlobe
} from 'react-icons/fi';

const AdminPage = () => {
    const { 
        addMarketplaceItem, 
        updateMarketplaceItem, 
        marketplaceData, 
        removeMarketplaceItem,
        categories: contextCategories,
        isDarkMode
    } = useCart();

    const categories = contextCategories.filter(c => c !== 'All');
    const [activeTab, setActiveTab] = useState('marketplace'); // 'marketplace' or 'analytics'
    const [searchTerm, setSearchTerm] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [isNewCategory, setIsNewCategory] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [formData, setFormData] = useState({
        name: '',
        category: categories[0] || 'Tài chính',
        platform: 'Facebook',
        link: '',
        description: '',
        bookingPrice: '',
        price: '',
        followers: '',
        image: '',
        views: 0,
        bookings: 0,
        revenue: 0
    });

    const handleEdit = (item) => {
        setEditingId(item.id);
        setIsNewCategory(false);
        setFormData({
            name: item.name,
            category: item.category,
            platform: item.platform,
            link: item.link,
            description: item.description || '',
            bookingPrice: item.bookingPrice,
            price: item.price,
            followers: item.followers,
            image: item.image || '',
            views: item.views || 0,
            bookings: item.bookings || 0,
            revenue: item.revenue || 0
        });
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setEditingId(null);
        setIsNewCategory(false);
        setFormData({ 
            name: '', category: categories[0] || 'Tài chính', platform: 'Facebook', link: '', description: '', bookingPrice: '', price: '', followers: '', image: '',
            views: 0, bookings: 0, revenue: 0
        });
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setEditingId(null);
        setIsNewCategory(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.link || !formData.price) {
            alert('Vui lòng điền các trường bắt buộc (Tên, Link, Giá)');
            return;
        }

        const numericPrice = Number(formData.price);
        const newItem = {
            ...formData,
            price: numericPrice,
            bookingPrice: `${numericPrice.toLocaleString('vi-VN')} ₫`,
            views: Number(formData.views) || 0,
            bookings: Number(formData.bookings) || 0,
            revenue: Number(formData.revenue) || 0
        };

        if (editingId) {
            updateMarketplaceItem(editingId, newItem);
        } else {
            addMarketplaceItem(newItem);
        }
        
        setIsModalOpen(false);
        setEditingId(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setFormData(prev => ({ ...prev, image: event.target.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const filteredList = marketplaceData.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const stats = [
        { label: 'Tổng số kênh', value: marketplaceData.length, icon: <FiGlobe className="text-blue-500" /> },
        { label: 'Tổng lượt truy cập', value: marketplaceData.reduce((acc, curr) => acc + (Number(curr.views) || 0), 0).toLocaleString(), icon: <FiActivity className="text-indigo-500" /> },
        { label: 'Tổng Booking', value: marketplaceData.reduce((acc, curr) => acc + (Number(curr.bookings) || 0), 0), icon: <FiZap className="text-purple-500" /> },
        { label: 'Tổng doanh thu', value: marketplaceData.reduce((acc, curr) => acc + (Number(curr.revenue) || 0), 0).toLocaleString('vi-VN') + ' ₫', icon: <FiDollarSign className="text-green-500" /> },
    ];

    return (
        <div className="max-w-[1600px] mx-auto p-4 md:p-8 space-y-10 animate-in fade-in duration-700 font-sans relative">
            
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-theme pb-8">
                <div>
                    <h1 className="text-theme-primary text-4xl font-black italic tracking-tighter uppercase">
                        Hệ quản trị <span className="text-[#E10600]">VenKheo</span>
                    </h1>
                    <p className="text-theme-muted text-sm font-medium mt-1">Quản lý nội dung và dữ liệu Marketplace thời gian thực.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={handleAddNew}
                        className="bg-[#E10600] text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-red-700 transition-all shadow-xl shadow-red-600/20 active:scale-95"
                    >
                        <FiPlus size={18} /> Thêm Kênh Mới
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-theme-card p-5 md:p-8 rounded-[32px] border border-theme shadow-sm hover:shadow-xl transition-all duration-300 group">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-2xl bg-theme-secondary group-hover:scale-110 transition-transform`}>
                                {stat.icon}
                            </div>
                            <FiZap className="text-theme-muted opacity-20" />
                        </div>
                        <p className="text-theme-muted text-[10px] font-black uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                        <p className="text-2xl md:text-3xl font-black text-theme-primary tracking-tighter">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Tab System */}
            <div className="space-y-6">
                <div className="flex items-center gap-2 bg-theme-secondary/30 p-1.5 rounded-2xl w-fit border border-theme">
                    <button 
                        onClick={() => setActiveTab('marketplace')}
                        className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'marketplace' ? 'bg-[#E10600] text-white shadow-lg' : 'text-theme-muted hover:text-theme-primary'}`}
                    >
                        <FiGrid className="inline mr-2" /> Marketplace
                    </button>
                    <button 
                        onClick={() => setActiveTab('analytics')}
                        className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'analytics' ? 'bg-[#E10600] text-white shadow-lg' : 'text-theme-muted hover:text-theme-primary'}`}
                    >
                        <FiActivity className="inline mr-2" /> Phân tích & Doanh thu
                    </button>
                </div>

                {/* Toolbar */}
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-theme-card p-4 rounded-[30px] border border-theme shadow-sm sticky top-[72px] z-30">
                    <div className="relative w-full md:w-96">
                        <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-[#E10600]" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm kênh truyền thông..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-theme-secondary border border-theme rounded-2xl pl-14 pr-6 py-4 text-sm font-bold text-theme-primary outline-none focus:border-[#E10600] transition-all"
                        />
                    </div>
                    <div className="px-6 py-4 bg-[#E10600]/5 text-[#E10600] rounded-2xl text-xs font-black uppercase tracking-widest flex items-center">
                        {filteredList.length} {activeTab === 'marketplace' ? 'Kênh' : 'Bản ghi'}
                    </div>
                </div>

                {activeTab === 'marketplace' ? (
                    /* Marketplace Table */
                    <div className="bg-theme-card rounded-[40px] border border-theme shadow-sm overflow-hidden animate-in fade-in slide-in-from-left-4 duration-500">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-theme-secondary/30 border-b border-theme">
                                    <tr className="text-theme-muted text-[10px] font-black uppercase tracking-[0.2em]">
                                        <th className="px-8 py-6">Kênh Truyền Thông</th>
                                        <th className="px-8 py-6">Ngành nghề</th>
                                        <th className="px-8 py-6">Giá & Follow</th>
                                        <th className="px-8 py-6 text-right">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-theme">
                                    {filteredList.length === 0 ? (
                                        <tr><td colSpan="4" className="px-8 py-20 text-center opacity-30 font-black uppercase text-xs">Không có dữ liệu</td></tr>
                                    ) : (
                                        [...filteredList].reverse().map((item) => (
                                            <tr key={item.id} className="hover:bg-theme-secondary/10 transition-colors group">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-5">
                                                        <div className="h-14 w-14 rounded-2xl bg-theme-secondary overflow-hidden border border-theme shrink-0">
                                                            {item.image ? <img src={item.image} className="h-full w-full object-cover" /> : <FiImage className="m-auto h-full opacity-10" size={20} />}
                                                        </div>
                                                        <div>
                                                            <p className="text-theme-primary font-black text-base uppercase tracking-tight">{item.name}</p>
                                                            <span className="text-[10px] text-blue-500 font-bold uppercase">{item.platform}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="px-3 py-1 bg-theme-secondary text-[#E10600] rounded-full text-[9px] font-black uppercase border border-theme">
                                                        {item.category}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <p className="text-[#E10600] font-black text-lg italic">{item.bookingPrice}</p>
                                                    <p className="text-[10px] text-theme-muted font-black uppercase tracking-widest">{item.followers} Follow</p>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button onClick={() => handleEdit(item)} className="p-3 bg-theme-secondary text-theme-primary rounded-xl hover:bg-amber-500 hover:text-white transition-all"><FiEdit2 size={16} /></button>
                                                        <button onClick={() => window.confirm('Xóa kênh này?') && removeMarketplaceItem(item.id)} className="p-3 bg-theme-secondary text-theme-primary rounded-xl hover:bg-red-600 hover:text-white transition-all"><FiTrash2 size={16} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    /* Analytics & Revenue Table */
                    <div className="bg-theme-card rounded-[40px] border border-theme shadow-sm overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="p-6 bg-blue-500/5 border-b border-theme flex items-center gap-3">
                            <FiActivity className="text-blue-500" />
                            <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest">Dữ liệu được cập nhật tự động theo thời gian thực từ tương tác người dùng</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-theme-secondary/30 border-b border-theme">
                                    <tr className="text-theme-muted text-[10px] font-black uppercase tracking-[0.2em]">
                                        <th className="px-8 py-6">Kênh</th>
                                        <th className="px-8 py-6">Lượt truy cập</th>
                                        <th className="px-8 py-6">Số Bookings</th>
                                        <th className="px-8 py-6">Doanh thu</th>
                                        <th className="px-8 py-6 text-right">Tình trạng</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-theme">
                                    {filteredList.map((item) => (
                                        <tr key={item.id} className="hover:bg-theme-secondary/10 transition-colors group">
                                            <td className="px-8 py-6">
                                                <p className="text-theme-primary font-black text-sm uppercase">{item.name}</p>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2">
                                                    <FiActivity className="text-blue-500" />
                                                    <span className="font-black text-lg">{(item.views || 0).toLocaleString()}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2">
                                                    <FiZap className="text-purple-500" />
                                                    <span className="font-black text-lg">{(item.bookings || 0).toLocaleString()}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2">
                                                    <FiDollarSign className="text-green-500" />
                                                    <span className="font-black text-lg text-theme-primary">{(item.revenue || 0).toLocaleString('vi-VN')} ₫</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-[8px] font-black uppercase tracking-widest border border-green-500/20">Đang tracking</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Form Modal */}
            {isModalOpen && (
                /* Standard Content Modal (Analytics modal removed) */
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={handleCancel}></div>
                    <div className="relative bg-theme-card w-full max-w-2xl rounded-[40px] border border-theme shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className={`p-6 border-b border-theme flex justify-between items-center ${editingId ? 'bg-amber-500/10' : 'bg-[#E10600]'}`}>
                            <h2 className="font-black text-lg uppercase text-white flex items-center gap-3">
                                {editingId ? <FiEdit2 /> : <FiPlus />} {editingId ? 'Chỉnh sửa thông tin' : 'Thêm kênh mới'}
                            </h2>
                            <button onClick={handleCancel} className="text-white/50 hover:text-white"><FiX size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-5 max-h-[80vh] overflow-y-auto">
                            <div className="grid md:grid-cols-2 gap-5">
                                <div className="md:col-span-2">
                                    <label className="block text-theme-muted text-[10px] font-black uppercase mb-2">Tên kênh *</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-theme-secondary border border-theme rounded-2xl px-5 py-4 text-sm font-bold text-theme-primary outline-none focus:border-[#E10600]" />
                                </div>
                                <div>
                                    <label className="block text-theme-muted text-[10px] font-black uppercase mb-2">Ngành nghề</label>
                                    <div className="flex gap-2">
                                        <select name="category" value={formData.category} onChange={handleChange} className="flex-1 bg-theme-secondary border border-theme rounded-2xl px-4 py-4 text-xs font-bold text-theme-primary outline-none focus:border-[#E10600]">
                                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-theme-muted text-[10px] font-black uppercase mb-2">Nền tảng</label>
                                    <select name="platform" value={formData.platform} onChange={handleChange} className="w-full bg-theme-secondary border border-theme rounded-2xl px-4 py-4 text-xs font-bold text-theme-primary outline-none focus:border-[#E10600]">
                                        <option value="Facebook">Facebook</option>
                                        <option value="TikTok">TikTok</option>
                                        <option value="Instagram">Instagram</option>
                                        <option value="YouTube">YouTube</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-theme-muted text-[10px] font-black uppercase mb-2">Followers</label>
                                    <input type="text" name="followers" value={formData.followers} onChange={handleChange} placeholder="1.7M" className="w-full bg-theme-secondary border border-theme rounded-2xl px-5 py-4 text-sm font-bold text-theme-primary outline-none focus:border-[#E10600]" />
                                </div>
                                <div>
                                    <label className="block text-theme-muted text-[10px] font-black uppercase mb-2">Giá niêm yết (VNĐ) *</label>
                                    <input type="number" name="price" value={formData.price} onChange={handleChange} required className="w-full bg-theme-secondary border border-theme rounded-2xl px-5 py-4 text-sm font-bold text-theme-primary outline-none focus:border-[#E10600]" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-theme-muted text-[10px] font-black uppercase mb-2">Link liên kết *</label>
                                    <input type="url" name="link" value={formData.link} onChange={handleChange} required className="w-full bg-theme-secondary border border-theme rounded-2xl px-5 py-4 text-sm font-bold text-theme-primary outline-none focus:border-[#E10600]" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-theme-muted text-[10px] font-black uppercase mb-2">Mô tả</label>
                                    <textarea name="description" value={formData.description} onChange={handleChange} rows="2" className="w-full bg-theme-secondary border border-theme rounded-2xl px-5 py-4 text-sm font-bold text-theme-primary outline-none focus:border-[#E10600] resize-none"></textarea>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-theme-muted text-[10px] font-black uppercase mb-2">Ảnh đại diện</label>
                                    <div className="flex gap-4">
                                        <div onClick={() => document.getElementById('img-up').click()} className="w-20 h-20 rounded-2xl bg-theme-secondary border-2 border-dashed border-theme flex items-center justify-center cursor-pointer hover:border-[#E10600] overflow-hidden bg-cover bg-center" style={formData.image ? {backgroundImage: `url(${formData.image})`} : {}}>
                                            {!formData.image && <FiImage className="opacity-20" size={24} />}
                                        </div>
                                        <input id="img-up" type="file" className="hidden" onChange={handleFileChange} />
                                        <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Hoặc dán URL ảnh..." className="flex-1 bg-theme-secondary border border-theme rounded-2xl px-5 py-4 text-xs font-bold text-theme-primary outline-none focus:border-[#E10600]" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={handleCancel} className="flex-1 py-4 bg-theme-secondary text-theme-primary font-black rounded-2xl text-[10px] uppercase border border-theme">Hủy</button>
                                <button type="submit" className="flex-[2] py-4 bg-[#E10600] text-white font-black rounded-2xl text-[10px] uppercase shadow-lg shadow-red-600/20">{editingId ? 'Cập nhật' : 'Thêm mới'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPage;