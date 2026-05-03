import React from 'react';
import { useCart } from "../components/CartContext"
import { FiTrash2, FiShoppingCart, FiArrowLeft, FiPlus, FiMinus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const CartDetail = () => {
    const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart()

    const subTotal = cartItems.reduce((total, item) => total + ((item.price || 0) * (item.quantity || 1)), 0)
    
    const getDiscountPercent = (count) => {
        // count here could be total number of items or total quantity. 
        // Based on PromotionPage, it seems to be "BÀI" (posts/items).
        const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
        if (totalItems >= 2 && totalItems <= 5) return 0.1;
        if (totalItems >= 6 && totalItems <= 10) return 0.15;
        if (totalItems >= 11 && totalItems <= 20) return 0.2;
        if (totalItems > 20) return 0.25;
        return 0;
    }

    const discountPercent = getDiscountPercent();
    const discountAmount = subTotal * discountPercent;
    const discountedSubTotal = subTotal - discountAmount;
    const vat = discountedSubTotal * 0.08
    const grandTotal = discountedSubTotal + vat

    const formatMoney = (amount) => {
        return amount.toLocaleString('vi-VN') + ' ₫'
    }

    const removeVietnameseTones = (str) => {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|ã|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
        str = str.replace(/\u02C6|\u0306|\u031B/g, "");
        return str;
    }

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFillColor(225, 6, 0);
        doc.rect(0, 0, 210, 40, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(28);
        doc.setFont("helvetica", "bold");
        doc.text("VEN KHEO NETWORK", 105, 20, { align: "center" });
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text("HE THONG BOOKING KOLS & CONG DONG HANG DAU", 105, 30, { align: "center" });
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text("BAO GIA DICH VU", 20, 55);
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100);
        doc.text(`Ma bao gia: VK-${new Date().getTime().toString().slice(-6)}`, 20, 62);
        doc.text(`Ngay lap: ${new Date().toLocaleDateString('vi-VN')}`, 20, 67);
        doc.text(`Het han: ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('vi-VN')}`, 20, 72);
        
        const tableColumn = ["STT", "TEN KENH / DICH VU", "PLATFORM", "SL", "DON GIA", "THANH TIEN"];
        const tableRows = [];
        cartItems.forEach((item, index) => {
            const rowData = [
                index + 1,
                removeVietnameseTones(item.name).toUpperCase(),
                removeVietnameseTones(item.platform).toUpperCase(),
                item.quantity || 1,
                item.price.toLocaleString('vi-VN'),
                ((item.price || 0) * (item.quantity || 1)).toLocaleString('vi-VN')
            ];
            tableRows.push(rowData);
        });

        autoTable(doc, {
            startY: 80,
            head: [tableColumn],
            body: tableRows,
            theme: 'striped',
            headStyles: { fillColor: [30, 41, 59], textColor: [255, 255, 255], fontSize: 9, fontStyle: 'bold', halign: 'center' },
            bodyStyles: { fontSize: 8, cellPadding: 4 },
            columnStyles: { 
                0: { halign: 'center', cellWidth: 10 }, 
                1: { cellWidth: 70 }, 
                2: { halign: 'center', cellWidth: 25 }, 
                3: { halign: 'center', cellWidth: 10 },
                4: { halign: 'right', cellWidth: 35 },
                5: { halign: 'right', cellWidth: 35 }
            },
            alternateRowStyles: { fillColor: [245, 245, 245] }
        });

        const finalY = doc.lastAutoTable.finalY + 15;
        const summaryX = 130;
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100);
        doc.text("Tam tinh:", summaryX, finalY);
        doc.text(subTotal.toLocaleString('vi-VN') + " VND", 190, finalY, { align: "right" });
        
        if (discountAmount > 0) {
            doc.text(`Chiet khau (${discountPercent * 100}%):`, summaryX, finalY + 8);
            doc.text("-" + discountAmount.toLocaleString('vi-VN') + " VND", 190, finalY + 8, { align: "right" });
            doc.text("Thue VAT (8%):", summaryX, finalY + 16);
            doc.text(vat.toLocaleString('vi-VN') + " VND", 190, finalY + 16, { align: "right" });
            doc.setFillColor(225, 6, 0);
            doc.rect(summaryX - 5, finalY + 21, 70, 12, 'F');
            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(255, 255, 255);
            doc.text("TONG CONG:", summaryX, finalY + 29);
            doc.text(grandTotal.toLocaleString('vi-VN') + " VND", 190, finalY + 29, { align: "right" });
        } else {
            doc.text("Thue VAT (8%):", summaryX, finalY + 8);
            doc.text(vat.toLocaleString('vi-VN') + " VND", 190, finalY + 8, { align: "right" });
            doc.setFillColor(225, 6, 0);
            doc.rect(summaryX - 5, finalY + 13, 70, 12, 'F');
            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(255, 255, 255);
            doc.text("TONG CONG:", summaryX, finalY + 21);
            doc.text(grandTotal.toLocaleString('vi-VN') + " VND", 190, finalY + 21, { align: "right" });
        }
        
        const pageHeight = doc.internal.pageSize.height;
        doc.setFontSize(9);
        doc.setTextColor(100);
        doc.setFont("helvetica", "bold");
        doc.text("DIEU KHOAN THANH TOAN:", 20, pageHeight - 45);
        doc.setFont("helvetica", "normal");
        doc.text("- Bao gia co hieu luc trong vong 07 ngay ke tu ngay ky.", 20, pageHeight - 38);
        doc.text("- Quy khach vui long thanh toan 100% gia tri hop dong de trien khai.", 20, pageHeight - 33);
        doc.setDrawColor(225, 6, 0);
        doc.setLineWidth(1);
        doc.line(20, pageHeight - 25, 190, pageHeight - 25);
        doc.setFontSize(8);
        doc.text("VEN KHEO NETWORK - KET NOI THUONG HIEU VOI CONG DONG", 105, pageHeight - 15, { align: "center" });
        doc.text("Email: contact@venkheo.com | Hotline: 09xx xxx xxx | Website: venkheo.com", 105, pageHeight - 10, { align: "center" });
        doc.save(`Bao_Gia_Ven_Kheo_${new Date().getTime().toString().slice(-6)}.pdf`);
        clearCart();
    };

    return (
        <div className="min-h-screen bg-theme-primary pt-24 pb-12 px-4 md:px-8 font-sans transition-colors duration-300">
            <div className="max-w-[1200px] mx-auto">
                <div className="mb-8 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 text-theme-muted hover:text-[#E10600] transition-colors font-bold uppercase tracking-wider text-xs">
                        <FiArrowLeft size={16} /> Quay lại trang chủ
                    </Link>
                    {cartItems.length > 0 && (
                        <h1 className="text-theme-primary text-2xl md:text-4xl font-black uppercase tracking-tight">Chi Tiết Báo Giá</h1>
                    )}
                </div>

                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 px-4">
                        <div className="relative mb-8">
                            <div className="absolute inset-0 bg-[#E10600] blur-[100px] opacity-10 animate-pulse"></div>
                            <div className="relative bg-theme-secondary p-10 rounded-[40px] border border-theme shadow-2xl">
                                <FiShoppingCart size={80} className="text-[#E10600] opacity-20" />
                            </div>
                        </div>
                        <h2 className="text-theme-primary text-2xl md:text-3xl font-black uppercase tracking-tight mb-4 text-center">Giỏ hàng của bạn đang trống</h2>
                        <p className="text-theme-muted font-medium mb-10 text-center max-w-md">Hãy khám phá các kênh cộng đồng và dịch vụ của VenKheoLLC để bắt đầu chiến dịch truyền thông của bạn.</p>
                        <Link to="/" className="bg-[#E10600] hover:bg-red-700 text-white font-black px-10 py-5 rounded-2xl uppercase tracking-[0.2em] transition-all shadow-2xl shadow-red-500/40 active:scale-95 text-sm">
                            Bắt đầu ngay
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Items List */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map(item => (
                                <div key={item.id} className="bg-theme-secondary p-4 md:p-6 rounded-[24px] border border-theme flex flex-col md:flex-row justify-between items-center gap-4 transition-all hover:border-[#E10600]/30 shadow-sm group">
                                    <div className="flex items-center gap-4 w-full md:w-auto">
                                        <div className="h-16 w-16 rounded-xl overflow-hidden bg-theme-primary shrink-0">
                                            <img 
                                                src={item.image || '/favicon.svg'} 
                                                alt={item.name} 
                                                className="h-full w-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = '/favicon.svg';
                                                    e.target.className = "h-full w-full object-contain p-2 opacity-20";
                                                }}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <span className="text-[#E10600] text-[10px] font-black uppercase tracking-widest">{item.platform}</span>
                                            <h4 className="text-theme-primary font-black text-sm md:text-lg uppercase leading-tight group-hover:text-[#E10600] transition-colors">{item.name}</h4>
                                            <p className="text-theme-muted text-xs font-bold mt-1 uppercase tracking-wider">Tin tức & Giải trí</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4 md:gap-8">
                                        {/* Quantity Controls */}
                                        <div className="flex items-center bg-theme-primary rounded-xl border border-theme p-1">
                                            <button 
                                                onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                                                className="h-8 w-8 flex items-center justify-center text-theme-muted hover:text-[#E10600] transition-colors cursor-pointer"
                                            >
                                                <FiMinus size={14} />
                                            </button>
                                            <span className="w-10 text-center text-theme-primary font-black text-sm">
                                                {item.quantity || 1}
                                            </span>
                                            <button 
                                                onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                                                className="h-8 w-8 flex items-center justify-center text-theme-muted hover:text-[#E10600] transition-colors cursor-pointer"
                                            >
                                                <FiPlus size={14} />
                                            </button>
                                        </div>

                                        <div className="text-right min-w-[100px]">
                                            <p className="text-theme-muted text-[10px] font-black uppercase tracking-wider mb-1">Thành tiền</p>
                                            <p className="text-theme-primary font-black text-sm md:text-lg">{formatMoney((item.price || 0) * (item.quantity || 1))}</p>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="h-12 w-12 rounded-xl bg-theme-primary text-theme-muted hover:text-red-500 hover:bg-red-500/10 flex items-center justify-center transition-all cursor-pointer"
                                        >
                                            <FiTrash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary Card */}
                        <div className="lg:col-span-1">
                            <div className="bg-theme-secondary rounded-[32px] border border-theme p-6 md:p-8 sticky top-32 shadow-xl">
                                <h3 className="text-theme-primary font-black text-xl uppercase tracking-wider mb-6 pb-4 border-b border-theme">Tổng cộng</h3>
                                
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-theme-muted font-bold uppercase tracking-wider">Tạm tính</span>
                                        <span className="text-theme-primary font-black">{formatMoney(subTotal)}</span>
                                    </div>
                                    
                                    {discountAmount > 0 && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-theme-muted font-bold uppercase tracking-wider">Chiết khấu ({discountPercent * 100}%)</span>
                                            <span className="text-green-500 font-black">-{formatMoney(discountAmount)}</span>
                                        </div>
                                    )}
                                    
                                    <div className="flex justify-between text-sm">
                                        <span className="text-theme-muted font-bold uppercase tracking-wider">Thuế VAT (8%)</span>
                                        <span className="text-theme-primary font-black">{formatMoney(vat)}</span>
                                    </div>
                                    
                                    <div className="pt-6 border-t border-theme flex justify-between items-center">
                                        <span className="text-theme-primary font-black text-lg uppercase tracking-wider">Tổng cộng</span>
                                        <span className="text-[#E10600] font-black text-2xl">{formatMoney(grandTotal)}</span>
                                    </div>
                                </div>

                                <button 
                                    onClick={generatePDF}
                                    className="w-full bg-[#E10600] hover:bg-red-700 text-white font-black py-5 rounded-2xl uppercase tracking-[0.2em] transition-all shadow-xl shadow-red-500/20 active:scale-95 cursor-pointer text-sm mb-4"
                                >
                                    Tải Báo Giá (PDF)
                                </button>
                                
                                <p className="text-[10px] text-theme-muted text-center font-bold uppercase leading-relaxed opacity-60">
                                    * Báo giá có hiệu lực trong 07 ngày. <br />
                                    Vui lòng liên hệ hotline để được hỗ trợ tốt nhất.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartDetail;
