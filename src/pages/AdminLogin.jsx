import React, { useState } from 'react';
import { useCart } from '../components/CartContextInstance';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiUser, FiAlertCircle } from 'react-icons/fi';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { adminLogin } = useCart();
    const navigate = useNavigate();

    const sendLoginNotification = async () => {
        // NOTE: Replace these with your actual EmailJS credentials
        const serviceId = 'service_iu0t7ff';
        const templateId = 'template_u09cuoi';
        const publicKey = 'gmKWh7gSS8oFTBU-v';

        const data = {
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: {
                to_name: 'Admin',
                message: `Thông báo: Quản trị viên đã đăng nhập vào hệ thống lúc ${new Date().toLocaleString('vi-VN')}.`,
                time: new Date().toLocaleString('vi-VN')
            }
        };

        try {
            await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            console.log('Thông báo đăng nhập đã được gửi qua Email.');
        } catch (error) {
            console.error('Lỗi khi gửi thông báo email:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (adminLogin(username, password)) {
            await sendLoginNotification();
            navigate('/admin');
        } else {
            setError('Tên đăng nhập hoặc mật khẩu không đúng');
        }
    };

    return (
        <div className="min-h-screen bg-theme-primary flex items-center justify-center p-4 font-sans transition-colors duration-300">
            <div className="max-w-md w-full">
                <div className="bg-theme-card rounded-[32px] shadow-2xl overflow-hidden border border-theme">
                    <div className="p-8 md:p-12">
                        <div className="flex justify-center mb-8">
                            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-200 dark:shadow-none">
                                <FiLock size={32} />
                            </div>
                        </div>
                        
                        <div className="text-center mb-10">
                            <h1 className="text-2xl font-black text-theme-primary uppercase tracking-tight">Admin Portal</h1>
                            <p className="text-theme-secondary text-sm mt-2">Vui lòng đăng nhập để quản trị hệ thống</p>
                        </div>

                        {error && (
                            <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl text-sm flex items-center gap-3">
                                <FiAlertCircle size={18} />
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-theme-secondary text-xs font-bold uppercase tracking-wider mb-2 ml-1">Tài khoản</label>
                                <div className="relative">
                                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted" />
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="admin"
                                        className="w-full bg-theme-secondary border border-theme rounded-xl px-11 py-4 text-theme-primary focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-theme-muted/50"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-theme-secondary text-xs font-bold uppercase tracking-wider mb-2 ml-1">Mật khẩu</label>
                                <div className="relative">
                                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-theme-secondary border border-theme rounded-xl px-11 py-4 text-theme-primary focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-theme-muted/50"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98] uppercase tracking-widest text-xs"
                            >
                                Đăng nhập hệ thống
                            </button>
                        </form>
                    </div>
                    <div className="bg-theme-secondary/30 px-8 py-6 border-t border-theme text-center">
                        <p className="text-theme-muted text-xs">© 2024 VenKheo LLC • Admin Panel</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;