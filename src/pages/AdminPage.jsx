import React, { useState, useMemo } from 'react';
import { useCart } from '../components/CartContextInstance';
import { FiPlus, FiTrash2, FiExternalLink, FiImage, FiSearch, FiFilter, FiEdit2, FiX, FiUsers, FiTrendingUp } from 'react-icons/fi';
import { FaFacebook, FaTiktok, FaInstagram, FaYoutube } from 'react-icons/fa';

const AdminPage = () => {
    const { 
        addMarketplaceItem, 
        updateMarketplaceItem, 
        marketplaceData, 
        removeMarketplaceItem,
        categories: contextCategories
    } = useCart();

    const categories = contextCategories.filter(c => c !== 'All');
    const [searchTerm, setSearchTerm] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [isNewCategory, setIsNewCategory] = useState(false);
    
    const [formData, setFormData] = useState({
        name: '',
        category: categories[0] || 'Tài chính',
        platform: 'Facebook',
        link: '',
        description: '',
        bookingPrice: '',
        price: '',
        followers: '',
        image: ''
    });

    const platforms = [
        { name: 'Facebook', icon: <FaFacebook className="text-blue-600" /> },
        { name: 'TikTok', icon: <FaTiktok className="text-theme-primary" /> },
        { name: 'Instagram', icon: <FaInstagram className="text-pink-600" /> },
        { name: 'YouTube', icon: <FaYoutube className="text-red-600" /> }
    ];

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
            image: item.image || ''
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancel = () => {
        setEditingId(null);
        setIsNewCategory(false);
        setFormData({ name: '', category: categories[0] || 'Tài chính', platform: 'Facebook', link: '', description: '', bookingPrice: '', price: '', followers: '', image: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.link || !formData.price) {
            alert('Vui lòng điền các trường bắt buộc (Tên, Link, Giá)');
            return;
        }
        const newItem = {
            ...formData,
            price: Number(formData.price),
            bookingPrice: formData.bookingPrice || `${Number(formData.price).toLocaleString()} ₫`
        };

        if (editingId) {
            updateMarketplaceItem(editingId, newItem);
            setEditingId(null);
        } else {
            addMarketplaceItem(newItem);
        }
        
        setIsNewCategory(false);
        setFormData({ name: '', category: categories[0] || 'Tài chính', platform: 'Facebook', link: '', description: '', bookingPrice: '', price: '', followers: '', image: '' });
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

    return (
        <div className="space-y-8 animate-in fade-in duration-500 text-theme-primary transition-colors duration-300">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-theme-card p-6 rounded-2xl border border-theme shadow-sm">
                    <p className="text-theme-muted text-xs font-black uppercase tracking-widest mb-1">Tổng số kênh</p>
                    <p className="text-3xl font-black text-theme-primary">{marketplaceData.length}</p>
                </div>
                <div className="bg-theme-card p-6 rounded-2xl border border-theme shadow-sm">
                    <p className="text-theme-muted text-xs font-black uppercase tracking-widest mb-1">Kênh Facebook</p>
                    <p className="text-3xl font-black text-blue-600">{marketplaceData.filter(i => i.platform === 'Facebook').length}</p>
                </div>
                <div className="bg-theme-card p-6 rounded-2xl border border-theme shadow-sm">
                    <p className="text-theme-muted text-xs font-black uppercase tracking-widest mb-1">Kênh TikTok</p>
                    <p className="text-3xl font-black text-pink-600">{marketplaceData.filter(i => i.platform === 'TikTok').length}</p>
                </div>
                <div className="bg-theme-card p-6 rounded-2xl border border-theme shadow-sm">
                    <p className="text-theme-muted text-xs font-black uppercase tracking-widest mb-1">Danh mục</p>
                    <p className="text-3xl font-black text-theme-primary">{new Set(marketplaceData.map(i => i.category)).size}</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 items-start">
                {/* Form & Preview Section - STICKY CONTAINER */}
                <div className="lg:col-span-1 lg:sticky lg:top-24 max-h-[calc(100vh-120px)] flex flex-col gap-4">
                    
                    {/* LIVE PREVIEW CARD - PINNED AT TOP */}
                    <div className="bg-theme-card rounded-3xl border-2 border-dashed border-blue-500/30 p-3 relative overflow-hidden flex-shrink-0 shadow-lg">
                        <div className="absolute top-1.5 right-3 bg-blue-500 text-white text-[7px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-tighter z-10">
                            Xem trước trực tiếp
                        </div>
                        
                        <div className="flex gap-4 items-center">
                            {/* Compact Image Preview */}
                            <div className="h-20 w-20 rounded-2xl bg-theme-secondary overflow-hidden border border-theme flex-shrink-0">
                                <img
                                    src={formData.image || '/favicon.svg'}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            
                            {/* Quick Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="bg-[#E10600] text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase">
                                        {formData.platform}
                                    </span>
                                    <span className="text-theme-muted text-[8px] font-black uppercase tracking-wider truncate">
                                        {formData.category}
                                    </span>
                                </div>
                                <h3 className="text-theme-primary font-black text-xs uppercase leading-tight truncate mb-1">
                                    {formData.name || 'Tên kênh mới...'}
                                </h3>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1 text-theme-muted text-[9px] font-bold">
                                        <FiUsers size={10} className="text-[#E10600]" />
                                        {formData.followers || '0'}
                                    </div>
                                    <div className="text-theme-primary font-black text-xs">
                                        {formData.price ? Number(formData.price).toLocaleString() + ' ₫' : '0 ₫'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FORM CARD - SCROLLABLE IF NEEDED */}
                    <div className="bg-theme-card rounded-3xl border border-theme shadow-xl overflow-y-auto flex-1 custom-scrollbar">
                        <div className={`p-4 border-b border-theme sticky top-0 z-10 transition-colors ${editingId ? 'bg-amber-500/10' : 'bg-theme-secondary/30'}`}>
                            <h2 className="text-theme-primary font-black text-sm uppercase flex items-center gap-2">
                                {editingId ? (
                                    <>
                                        <FiEdit2 className="text-amber-500" /> Cập nhật kênh
                                    </>
                                ) : (
                                    <>
                                        <FiPlus className="text-blue-600" /> Thêm kênh mới
                                    </>
                                )}
                            </h2>
                        </div>
                        <form onSubmit={handleSubmit} className="p-5 space-y-4">
                            <div>
                                <label className="block text-theme-muted text-[9px] font-black uppercase tracking-wider mb-1 ml-1">Tên kênh *</label>
                                <input
                                    type="text" name="name" value={formData.name} onChange={handleChange}
                                    placeholder="Ví dụ: Vén Khéo, Anh Thám Tử..."
                                    className="w-full bg-theme-secondary border border-theme rounded-xl px-3 py-2.5 text-xs text-theme-primary focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-theme-muted/30"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="col-span-1">
                                    <label className="block text-theme-muted text-[9px] font-black uppercase tracking-wider mb-1 ml-1">Nền tảng</label>
                                    <div className="grid grid-cols-2 gap-1.5">
                                        {platforms.map(p => (
                                            <button
                                                key={p.name}
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, platform: p.name }))}
                                                className={`flex items-center justify-center gap-1.5 p-1.5 rounded-lg border transition-all ${
                                                    formData.platform === p.name 
                                                    ? 'border-blue-500 bg-blue-500/10' 
                                                    : 'border-theme bg-theme-secondary hover:border-theme-muted'
                                                }`}
                                            >
                                                {p.icon}
                                                <span className="text-[9px] font-bold">{p.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="col-span-1">
                                    <label className="block text-theme-muted text-[9px] font-black uppercase tracking-wider mb-1 ml-1">Danh mục</label>
                                    <div className="flex gap-1.5">
                                        {isNewCategory ? (
                                            <div className="relative flex-1">
                                                <input
                                                    type="text"
                                                    name="category"
                                                    value={formData.category}
                                                    onChange={handleChange}
                                                    placeholder="Tên mới..."
                                                    className="w-full bg-theme-secondary border border-theme rounded-lg px-2 py-2 text-xs text-theme-primary outline-none focus:border-blue-500 transition-all"
                                                    autoFocus
                                                />
                                                <button 
                                                    type="button"
                                                    onClick={() => setIsNewCategory(false)}
                                                    className="absolute right-1.5 top-1/2 -translate-y-1/2 text-theme-muted hover:text-red-500"
                                                >
                                                    <FiX size={12} />
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <select
                                                    name="category"
                                                    value={formData.category}
                                                    onChange={handleChange}
                                                    className="flex-1 bg-theme-secondary border border-theme rounded-lg px-2 py-2 text-[10px] text-theme-primary outline-none focus:border-blue-500"
                                                >
                                                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                                </select>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setIsNewCategory(true);
                                                        setFormData(prev => ({ ...prev, category: '' }));
                                                    }}
                                                    className="p-2 bg-theme-secondary border border-theme rounded-lg text-blue-600 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center"
                                                >
                                                    <FiPlus size={14} />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-theme-muted text-[9px] font-black uppercase tracking-wider mb-1 ml-1">Link nhóm/kênh *</label>
                                <input
                                    type="url" name="link" value={formData.link} onChange={handleChange}
                                    placeholder="https://facebook.com/groups/..."
                                    className="w-full bg-theme-secondary border border-theme rounded-xl px-3 py-2.5 text-xs text-theme-primary outline-none focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-theme-muted text-[9px] font-black uppercase tracking-wider mb-1 ml-1">Giá (VNĐ) *</label>
                                    <input
                                        type="number" name="price" value={formData.price} onChange={handleChange}
                                        className="w-full bg-theme-secondary border border-theme rounded-xl px-3 py-2.5 text-xs text-theme-primary outline-none focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-theme-muted text-[9px] font-black uppercase tracking-wider mb-1 ml-1">Followers</label>
                                    <input
                                        type="text" name="followers" value={formData.followers} onChange={handleChange}
                                        placeholder="1.2M, 500K..."
                                        className="w-full bg-theme-secondary border border-theme rounded-xl px-3 py-2.5 text-xs text-theme-primary outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-theme-muted text-[9px] font-black uppercase tracking-wider mb-1 ml-1">Ảnh đại diện</label>
                                <div className="flex items-center gap-3">
                                    <div 
                                        onClick={() => document.getElementById('image-upload').click()}
                                        className="h-14 w-14 rounded-xl bg-theme-secondary border border-dashed border-theme flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:text-blue-500 transition-all overflow-hidden bg-center bg-cover bg-no-repeat group relative"
                                        style={formData.image ? { backgroundImage: `url(${formData.image})` } : {}}
                                    >
                                        {!formData.image && <FiPlus size={16} />}
                                        {formData.image && (
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                <FiImage className="text-white" size={16} />
                                            </div>
                                        )}
                                    </div>
                                    <input
                                        id="image-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            name="image"
                                            value={formData.image}
                                            onChange={handleChange}
                                            placeholder="URL ảnh..."
                                            className="w-full bg-theme-secondary border border-theme rounded-xl px-3 py-2.5 text-[10px] text-theme-primary outline-none focus:border-blue-500 transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-theme-muted text-[9px] font-black uppercase tracking-wider mb-1 ml-1">Mô tả ngắn</label>
                                <textarea
                                    name="description" value={formData.description} onChange={handleChange}
                                    rows="2"
                                    placeholder="Nội dung giới thiệu về kênh..."
                                    className="w-full bg-theme-secondary border border-theme rounded-xl px-3 py-2 text-xs text-theme-primary outline-none focus:border-blue-500 resize-none"
                                ></textarea>
                            </div>

                            <div className="flex gap-2 pt-2 sticky bottom-0 bg-theme-card py-2">
                                {editingId && (
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="flex-1 bg-theme-secondary text-theme-primary font-black py-3 rounded-xl hover:bg-theme-secondary/80 transition-all uppercase tracking-widest text-[9px]"
                                    >
                                        Hủy
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    className={`flex-[2] text-white font-black py-3 rounded-xl transition-all shadow-lg uppercase tracking-widest text-[9px] ${
                                        editingId 
                                        ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/20' 
                                        : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'
                                    }`}
                                >
                                    {editingId ? 'Cập nhật' : 'Lưu kênh'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Table Section */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-2">
                        <div className="relative w-full sm:w-72">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm kênh..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-theme-card border border-theme rounded-xl pl-11 pr-4 py-2.5 text-sm text-theme-primary outline-none focus:border-blue-500 shadow-sm transition-colors"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button className="px-4 py-2.5 bg-theme-card border border-theme rounded-xl text-theme-primary text-sm font-bold flex items-center gap-2 hover:bg-theme-secondary transition-all">
                                <FiFilter /> Lọc
                            </button>
                        </div>
                    </div>

                    <div className="bg-theme-card rounded-3xl border border-theme shadow-sm overflow-hidden transition-colors">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-theme-secondary/50 border-b border-theme">
                                    <tr className="text-theme-muted text-[10px] font-black uppercase tracking-widest">
                                        <th className="px-6 py-4">Kênh & Nền tảng</th>
                                        <th className="px-6 py-4">Danh mục</th>
                                        <th className="px-6 py-4">Chi phí</th>
                                        <th className="px-6 py-4 text-right">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-theme">
                                    {filteredList.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 text-center text-theme-muted text-sm italic">
                                                Không tìm thấy kênh nào...
                                            </td>
                                        </tr>
                                    ) : (
                                        [...filteredList].reverse().map((item) => (
                                            <tr key={item.id} className="hover:bg-theme-secondary/20 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-12 w-12 rounded-xl bg-theme-secondary overflow-hidden border border-theme flex-shrink-0">
                                                            {item.image ? (
                                                                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                                            ) : (
                                                                <div className="h-full w-full flex items-center justify-center text-theme-muted">
                                                                    <FiImage size={20} />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="text-theme-primary font-black text-sm uppercase leading-tight">{item.name}</p>
                                                            <div className="flex items-center gap-2 mt-0.5">
                                                                {platforms.find(p => p.name === item.platform)?.icon || <FiPlus size={10} />}
                                                                <p className="text-theme-muted text-[10px] font-bold uppercase tracking-wider">{item.platform}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="px-2.5 py-1 bg-theme-secondary text-theme-primary rounded-lg text-[10px] font-black uppercase tracking-wide">
                                                        {item.category}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-theme-primary font-black text-sm">{item.bookingPrice}</p>
                                                    <p className="text-theme-muted text-[10px] font-bold uppercase">{item.followers} followers</p>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="p-2 text-theme-muted hover:text-blue-600 transition-colors">
                                                            <FiExternalLink size={18} />
                                                        </a>
                                                        <button 
                                                            onClick={() => handleEdit(item)}
                                                            className="p-2 text-theme-muted hover:text-amber-600 transition-colors"
                                                        >
                                                            <FiEdit2 size={18} />
                                                        </button>
                                                        <button 
                                                            onClick={() => window.confirm('Xóa kênh này?') && removeMarketplaceItem(item.id)}
                                                            className="p-2 text-theme-muted hover:text-red-600 transition-colors"
                                                        >
                                                            <FiTrash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;