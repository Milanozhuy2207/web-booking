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

        const numericPrice = Number(formData.price);
        const newItem = {
            ...formData,
            price: numericPrice,
            bookingPrice: `${numericPrice.toLocaleString('vi-VN')} ₫`
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

    const stats = [
        { label: 'Tổng số kênh', value: marketplaceData.length, icon: <FiGlobe className="text-blue-500" />, color: 'blue' },
        { label: 'Kênh Facebook', value: marketplaceData.filter(i => i.platform === 'Facebook').length, icon: <FiFacebook className="text-indigo-500" />, color: 'indigo' },
        { label: 'Ngành nghề', value: new Set(marketplaceData.map(i => i.category)).size, icon: <FiGrid className="text-purple-500" />, color: 'purple' },
        { label: 'Hoạt động', value: 'Live', icon: <FiActivity className="text-green-500" />, color: 'green' },
    ];

    return (
        <div className="max-w-[1600px] mx-auto p-4 md:p-8 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 font-sans">
            
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-theme pb-8">
                <div>
                    <h1 className="text-theme-primary text-4xl font-black italic tracking-tighter uppercase">
                        Hệ quản trị <span className="text-[#E10600]">VenKheo</span>
                    </h1>
                    <p className="text-theme-muted text-sm font-medium mt-1">Quản lý nội dung và dữ liệu Marketplace thời gian thực.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-4 py-2 bg-theme-secondary rounded-full border border-theme flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-theme-primary">Firebase Connected</span>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-theme-card p-5 md:p-8 rounded-[32px] border border-theme shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-2xl bg-theme-secondary group-hover:scale-110 transition-transform`}>
                                {stat.icon}
                            </div>
                            <FiZap className="text-theme-muted opacity-20" />
                        </div>
                        <p className="text-theme-muted text-[10px] font-black uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                        <p className="text-2xl md:text-4xl font-black text-theme-primary tracking-tighter">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid xl:grid-cols-12 gap-8 items-start">
                
                {/* Form Section - Sidebar Style on Large Screens */}
                <div className="xl:col-span-4 sticky top-8">
                    <div className="bg-theme-card rounded-[40px] border border-theme shadow-2xl overflow-hidden">
                        <div className={`p-8 border-b border-theme transition-colors ${editingId ? 'bg-amber-500/10' : 'bg-[#E10600]'}`}>
                            <h2 className={`font-black text-lg uppercase flex items-center gap-3 ${editingId ? 'text-amber-500' : 'text-white'}`}>
                                {editingId ? (
                                    <>
                                        <div className="p-2 bg-amber-500/20 rounded-xl"><FiEdit2 /></div>
                                        Cập nhật thông tin
                                    </>
                                ) : (
                                    <>
                                        <div className="p-2 bg-white/20 rounded-xl"><FiPlus /></div>
                                        Thêm Kênh Mới
                                    </>
                                )}
                            </h2>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="space-y-4">
                                <div className="group">
                                    <label className="block text-theme-muted text-[10px] font-black uppercase tracking-widest mb-2 ml-1 opacity-60 group-focus-within:opacity-100 transition-opacity">Tên kênh truyền thông *</label>
                                    <input
                                        type="text" name="name" value={formData.name} onChange={handleChange}
                                        placeholder="Ví dụ: Vén Khéo"
                                        className="w-full bg-theme-secondary border border-theme rounded-2xl px-5 py-4 text-sm font-bold text-theme-primary focus:ring-4 focus:ring-[#E10600]/10 focus:border-[#E10600] outline-none transition-all placeholder:text-theme-muted/20"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-1">
                                        <label className="block text-theme-muted text-[10px] font-black uppercase tracking-widest mb-2 ml-1 opacity-60">Ngành nghề</label>
                                        <div className="flex gap-2">
                                            {isNewCategory ? (
                                                <div className="relative flex-1">
                                                    <input
                                                        type="text" name="category" value={formData.category} onChange={handleChange}
                                                        className="w-full bg-theme-secondary border border-[#E10600] rounded-2xl px-4 py-4 text-xs font-bold text-theme-primary outline-none"
                                                        autoFocus
                                                    />
                                                    <button type="button" onClick={() => setIsNewCategory(false)} className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500"><FiX size={14} /></button>
                                                </div>
                                            ) : (
                                                <select
                                                    name="category" value={formData.category} onChange={handleChange}
                                                    className="w-full bg-theme-secondary border border-theme rounded-2xl px-3 py-4 text-xs font-bold text-theme-primary outline-none focus:border-[#E10600]"
                                                >
                                                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                                </select>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-span-1 flex items-end">
                                        <button
                                            type="button"
                                            onClick={() => { setIsNewCategory(!isNewCategory); if(!isNewCategory) setFormData(p => ({...p, category: ''})) }}
                                            className={`w-full py-4 rounded-2xl border flex items-center justify-center transition-all ${isNewCategory ? 'bg-theme-secondary border-theme text-theme-muted' : 'bg-[#E10600]/10 border-[#E10600]/20 text-[#E10600] hover:bg-[#E10600] hover:text-white'}`}
                                        >
                                            {isNewCategory ? <FiGrid size={18} /> : <FiPlus size={18} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-theme-muted text-[10px] font-black uppercase tracking-widest mb-2 ml-1 opacity-60">Lượt Follow</label>
                                        <div className="relative">
                                            <FiUsers className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted opacity-30" />
                                            <input
                                                type="text" name="followers" value={formData.followers} onChange={handleChange}
                                                placeholder="1.7M"
                                                className="w-full bg-theme-secondary border border-theme rounded-2xl pl-11 pr-4 py-4 text-sm font-bold text-theme-primary outline-none focus:border-[#E10600]"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-theme-muted text-[10px] font-black uppercase tracking-widest mb-2 ml-1 opacity-60">Giá niêm yết</label>
                                        <div className="relative">
                                            <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted opacity-30" />
                                            <input
                                                type="number" name="price" value={formData.price} onChange={handleChange}
                                                placeholder="8000000"
                                                className="w-full bg-theme-secondary border border-theme rounded-2xl pl-11 pr-4 py-4 text-sm font-bold text-theme-primary outline-none focus:border-[#E10600]"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-theme-muted text-[10px] font-black uppercase tracking-widest mb-2 ml-1 opacity-60">Link liên kết *</label>
                                    <input
                                        type="url" name="link" value={formData.link} onChange={handleChange}
                                        placeholder="https://facebook.com/groups/..."
                                        className="w-full bg-theme-secondary border border-theme rounded-2xl px-5 py-4 text-sm font-bold text-theme-primary outline-none focus:border-[#E10600]"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-theme-muted text-[10px] font-black uppercase tracking-widest mb-2 ml-1 opacity-60">Hình ảnh đại diện</label>
                                    <div className="flex items-center gap-4">
                                        <div 
                                            onClick={() => document.getElementById('image-upload').click()}
                                            className="h-24 w-24 rounded-3xl bg-theme-secondary border-2 border-dashed border-theme flex flex-col items-center justify-center cursor-pointer hover:border-[#E10600] hover:text-[#E10600] transition-all overflow-hidden bg-center bg-cover bg-no-repeat group relative shrink-0"
                                            style={formData.image ? { backgroundImage: `url(${formData.image})` } : {}}
                                        >
                                            {!formData.image && <FiImage size={24} className="opacity-20" />}
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                <span className="text-[8px] font-black text-white uppercase">Đổi ảnh</span>
                                            </div>
                                        </div>
                                        <input id="image-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                                        <div className="flex-1">
                                            <input
                                                type="text" name="image" value={formData.image} onChange={handleChange}
                                                placeholder="Dán URL ảnh..."
                                                className="w-full bg-theme-secondary border border-theme rounded-2xl px-4 py-4 text-xs font-bold text-theme-primary outline-none focus:border-[#E10600]"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-theme-muted text-[10px] font-black uppercase tracking-widest mb-2 ml-1 opacity-60">Mô tả tóm tắt</label>
                                    <textarea
                                        name="description" value={formData.description} onChange={handleChange}
                                        rows="3"
                                        placeholder="Nhập giới thiệu ngắn về kênh..."
                                        className="w-full bg-theme-secondary border border-theme rounded-2xl px-5 py-4 text-sm font-bold text-theme-primary outline-none focus:border-[#E10600] resize-none transition-all"
                                    ></textarea>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                {editingId && (
                                    <button
                                        type="button" onClick={handleCancel}
                                        className="flex-1 bg-theme-secondary text-theme-primary font-black py-5 rounded-2xl hover:bg-theme-secondary/80 transition-all uppercase tracking-widest text-[10px] border border-theme"
                                    >
                                        Hủy bỏ
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    className={`flex-[2] text-white font-black py-5 rounded-2xl transition-all shadow-xl uppercase tracking-widest text-[10px] active:scale-95 ${
                                        editingId ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/20' : 'bg-[#E10600] hover:bg-red-700 shadow-[#E10600]/20'
                                    }`}
                                >
                                    {editingId ? 'Lưu Thay Đổi' : 'Tạo Kênh Mới'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Table Section */}
                <div className="xl:col-span-8 space-y-6">
                    {/* Toolbar */}
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-theme-card p-4 rounded-[30px] border border-theme shadow-sm">
                        <div className="relative w-full md:w-96">
                            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-[#E10600]" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm theo tên hoặc ngành nghề..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-theme-secondary border border-theme rounded-2xl pl-14 pr-6 py-4 text-sm font-bold text-theme-primary outline-none focus:border-[#E10600] transition-all"
                            />
                        </div>
                        <div className="flex gap-3 w-full md:w-auto">
                            <button className="flex-1 md:flex-none px-6 py-4 bg-theme-secondary border border-theme rounded-2xl text-theme-primary text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-theme-secondary/80">
                                <FiFilter /> Lọc
                            </button>
                            <div className="px-6 py-4 bg-[#E10600]/5 text-[#E10600] rounded-2xl text-xs font-black uppercase tracking-widest hidden md:flex items-center">
                                {filteredList.length} Kênh
                            </div>
                        </div>
                    </div>

                    {/* Data List (Modern Table) */}
                    <div className="bg-theme-card rounded-[40px] border border-theme shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-theme-secondary/30 border-b border-theme">
                                    <tr className="text-theme-muted text-[10px] font-black uppercase tracking-[0.2em]">
                                        <th className="px-8 py-6">Kênh Truyền Thông</th>
                                        <th className="px-8 py-6">Chỉ số</th>
                                        <th className="px-8 py-6 text-right">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-theme">
                                    {filteredList.length === 0 ? (
                                        <tr>
                                            <td colSpan="3" className="px-8 py-20 text-center">
                                                <div className="flex flex-col items-center gap-4 opacity-30">
                                                    <FiGrid size={48} />
                                                    <p className="text-theme-primary font-black uppercase tracking-widest text-xs">Không tìm thấy dữ liệu</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        [...filteredList].reverse().map((item) => (
                                            <tr key={item.id} className="hover:bg-theme-secondary/10 transition-colors group">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-5">
                                                        <div className="h-16 w-16 rounded-[20px] bg-theme-secondary overflow-hidden border border-theme group-hover:border-[#E10600]/30 transition-all shrink-0">
                                                            {item.image ? (
                                                                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                                            ) : (
                                                                <div className="h-full w-full flex items-center justify-center text-theme-muted opacity-20">
                                                                    <FiImage size={24} />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="space-y-1">
                                                            <div className="flex items-center gap-2">
                                                                <p className="text-theme-primary font-black text-base uppercase leading-tight tracking-tight">{item.name}</p>
                                                                <span className="px-2 py-0.5 bg-blue-500/10 text-blue-500 rounded text-[8px] font-black uppercase tracking-tighter">
                                                                    {item.platform}
                                                                </span>
                                                            </div>
                                                            <span className="inline-block px-3 py-1 bg-theme-secondary text-[#E10600] rounded-full text-[9px] font-black uppercase tracking-widest border border-theme">
                                                                {item.category}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="space-y-1">
                                                        <p className="text-[#E10600] font-black text-lg tracking-tighter italic">{item.bookingPrice}</p>
                                                        <div className="flex items-center gap-1.5 text-theme-muted">
                                                            <FiUsers size={12} className="opacity-50" />
                                                            <span className="text-[10px] font-black uppercase tracking-widest">{item.followers}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <a 
                                                            href={item.link} target="_blank" rel="noopener noreferrer" 
                                                            className="p-3 bg-theme-secondary text-theme-primary rounded-xl hover:bg-[#E10600] hover:text-white transition-all shadow-sm"
                                                            title="Xem trực tiếp"
                                                        >
                                                            <FiExternalLink size={16} />
                                                        </a>
                                                        <button 
                                                            onClick={() => handleEdit(item)}
                                                            className="p-3 bg-theme-secondary text-theme-primary rounded-xl hover:bg-amber-500 hover:text-white transition-all shadow-sm"
                                                            title="Chỉnh sửa"
                                                        >
                                                            <FiEdit2 size={16} />
                                                        </button>
                                                        <button 
                                                            onClick={() => window.confirm('Xóa vĩnh viễn kênh này?') && removeMarketplaceItem(item.id)}
                                                            className="p-3 bg-theme-secondary text-theme-primary rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                                            title="Xóa kênh"
                                                        >
                                                            <FiTrash2 size={16} />
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