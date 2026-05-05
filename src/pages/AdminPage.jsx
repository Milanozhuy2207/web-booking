import React, { useState } from 'react';
import { useCart } from '../components/CartContextInstance';
import { FiPlus, FiTrash2, FiExternalLink, FiImage, FiSearch, FiFilter, FiEdit2, FiX } from 'react-icons/fi';

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
                {/* Form Section */}
                <div className="lg:col-span-1">
                    <div className="bg-theme-card rounded-3xl border border-theme shadow-sm overflow-hidden">
                        <div className={`p-6 border-b border-theme transition-colors ${editingId ? 'bg-amber-500/10' : 'bg-theme-secondary/30'}`}>
                            <h2 className="text-theme-primary font-black text-lg uppercase flex items-center gap-2">
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
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-theme-muted text-[10px] font-black uppercase tracking-wider mb-1.5 ml-1">Tên kênh *</label>
                                <input
                                    type="text" name="name" value={formData.name} onChange={handleChange}
                                    className="w-full bg-theme-secondary border border-theme rounded-xl px-4 py-3 text-sm text-theme-primary focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-theme-muted/30"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-1">
                                    <label className="block text-theme-muted text-[10px] font-black uppercase tracking-wider mb-1.5 ml-1">Danh mục</label>
                                    <div className="flex gap-2">
                                        {isNewCategory ? (
                                            <div className="relative flex-1">
                                                <input
                                                    type="text"
                                                    name="category"
                                                    value={formData.category}
                                                    onChange={handleChange}
                                                    placeholder="Tên mới..."
                                                    className="w-full bg-theme-secondary border border-theme rounded-xl px-3 py-3 text-sm text-theme-primary outline-none focus:border-blue-500 transition-all"
                                                    autoFocus
                                                />
                                                <button 
                                                    type="button"
                                                    onClick={() => setIsNewCategory(false)}
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-theme-muted hover:text-red-500"
                                                >
                                                    <FiX size={14} />
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <select
                                                    name="category"
                                                    value={formData.category}
                                                    onChange={handleChange}
                                                    className="flex-1 bg-theme-secondary border border-theme rounded-xl px-2 py-3 text-xs md:text-sm text-theme-primary outline-none focus:border-blue-500"
                                                >
                                                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                                </select>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setIsNewCategory(true);
                                                        setFormData(prev => ({ ...prev, category: '' }));
                                                    }}
                                                    className="p-3 bg-theme-secondary border border-theme rounded-xl text-blue-600 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center"
                                                    title="Thêm danh mục mới"
                                                >
                                                    <FiPlus size={16} />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="col-span-1">
                                    <label className="block text-theme-muted text-[10px] font-black uppercase tracking-wider mb-1.5 ml-1">Nền tảng</label>
                                    <input
                                        type="text" name="platform" value={formData.platform} onChange={handleChange}
                                        className="w-full bg-theme-secondary border border-theme rounded-xl px-4 py-3 text-sm text-theme-primary outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-theme-muted text-[10px] font-black uppercase tracking-wider mb-1.5 ml-1">Link nhóm/kênh *</label>
                                <input
                                    type="url" name="link" value={formData.link} onChange={handleChange}
                                    className="w-full bg-theme-secondary border border-theme rounded-xl px-4 py-3 text-sm text-theme-primary outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-theme-muted text-[10px] font-black uppercase tracking-wider mb-1.5 ml-1">Giá (VNĐ) *</label>
                                    <input
                                        type="number" name="price" value={formData.price} onChange={handleChange}
                                        className="w-full bg-theme-secondary border border-theme rounded-xl px-4 py-3 text-sm text-theme-primary outline-none focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-theme-muted text-[10px] font-black uppercase tracking-wider mb-1.5 ml-1">Followers</label>
                                    <input
                                        type="text" name="followers" value={formData.followers} onChange={handleChange}
                                        className="w-full bg-theme-secondary border border-theme rounded-xl px-4 py-3 text-sm text-theme-primary outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-theme-muted text-[10px] font-black uppercase tracking-wider mb-1.5 ml-1">Ảnh đại diện</label>
                                <div className="flex items-center gap-4">
                                    <div 
                                        onClick={() => document.getElementById('image-upload').click()}
                                        className="h-20 w-20 rounded-2xl bg-theme-secondary border-2 border-dashed border-theme flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:text-blue-500 transition-all overflow-hidden bg-center bg-cover bg-no-repeat group relative"
                                        style={formData.image ? { backgroundImage: `url(${formData.image})` } : {}}
                                    >
                                        {!formData.image && (
                                            <>
                                                <FiPlus size={20} />
                                                <span className="text-[8px] font-black uppercase mt-1">Tải ảnh</span>
                                            </>
                                        )}
                                        {formData.image && (
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                <FiImage className="text-white" size={20} />
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
                                            placeholder="Hoặc dán URL ảnh..."
                                            className="w-full bg-theme-secondary border border-theme rounded-xl px-4 py-3 text-sm text-theme-primary outline-none focus:border-blue-500 transition-all placeholder:text-theme-muted/30"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-theme-muted text-[10px] font-black uppercase tracking-wider mb-1.5 ml-1">Mô tả ngắn</label>
                                <textarea
                                    name="description" value={formData.description} onChange={handleChange}
                                    rows="3"
                                    className="w-full bg-theme-secondary border border-theme rounded-xl px-4 py-3 text-sm text-theme-primary outline-none focus:border-blue-500 resize-none"
                                ></textarea>
                            </div>
                            <div className="flex gap-3">
                                {editingId && (
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="flex-1 bg-theme-secondary text-theme-primary font-black py-4 rounded-xl hover:bg-theme-secondary/80 transition-all uppercase tracking-widest text-[10px]"
                                    >
                                        Hủy
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    className={`flex-[2] text-white font-black py-4 rounded-xl transition-all shadow-lg uppercase tracking-widest text-[10px] ${
                                        editingId 
                                        ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/20' 
                                        : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'
                                    }`}
                                >
                                    {editingId ? 'Xác nhận cập nhật' : 'Lưu thông tin kênh'}
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
                                                            <p className="text-blue-600 text-[10px] font-bold uppercase tracking-wider">{item.platform}</p>
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