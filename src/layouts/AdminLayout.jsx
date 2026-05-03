import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../components/CartContextInstance';
import { FiGrid, FiList, FiSettings, FiLogOut, FiMenu, FiX, FiExternalLink, FiSun, FiMoon } from 'react-icons/fi';

const AdminLayout = ({ children }) => {
    const { adminLogout, isDarkMode, toggleTheme } = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

    const menuItems = [
        { name: 'Dashboard', icon: <FiGrid />, path: '/admin' },
        { name: 'Marketplace', icon: <FiList />, path: '/admin/marketplace' },
        { name: 'Cài đặt', icon: <FiSettings />, path: '/admin/settings' },
    ];

    const handleLogout = () => {
        adminLogout();
        navigate('/admin');
    };

    return (
        <div className="min-h-screen bg-theme-primary flex font-sans transition-colors duration-300">
            {/* Sidebar */}
            <aside 
                className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 dark:bg-theme-card text-white transition-all duration-300 flex flex-col fixed inset-y-0 z-50`}
            >
                <div className="p-6 flex items-center justify-between">
                    {isSidebarOpen && (
                        <h2 className="font-black text-xl uppercase tracking-tighter">Admin Panel</h2>
                    )}
                    <button 
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        {isSidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                    </button>
                </div>

                <nav className="flex-1 mt-6 px-3 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                                location.pathname === item.path 
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <span className="text-xl">{item.icon}</span>
                            {isSidebarOpen && <span className="text-sm font-bold uppercase tracking-wider">{item.name}</span>}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/5 space-y-2">
                    <Link
                        to="/"
                        className="flex items-center gap-4 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                    >
                        <FiExternalLink className="text-xl" />
                        {isSidebarOpen && <span className="text-sm font-bold uppercase tracking-wider">Xem Website</span>}
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-400 hover:text-white hover:bg-red-600 transition-all"
                    >
                        <FiLogOut className="text-xl" />
                        {isSidebarOpen && <span className="text-sm font-bold uppercase tracking-wider">Đăng xuất</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
                <header className="bg-theme-card border-b border-theme h-16 flex items-center justify-between px-8 sticky top-0 z-40">
                    <div className="text-theme-secondary text-sm font-medium">
                        {location.pathname === '/admin' ? 'Dashboard Overview' : 'System Management'}
                    </div>
                    <div className="flex items-center gap-6">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-xl bg-theme-secondary text-theme-primary hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                        >
                            {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
                        </button>

                        <div className="h-8 w-px bg-theme-secondary hidden sm:block" />

                        <div className="flex items-center gap-4">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-black text-theme-primary uppercase">System Administrator</p>
                                <p className="text-[10px] text-theme-muted">admin@venkheo.com</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-theme-secondary border border-theme flex items-center justify-center font-black text-theme-secondary">
                                AD
                            </div>
                        </div>
                    </div>
                </header>
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;