import { useCart } from "./CartContext"
import { FiX, FiTrash2, FiShoppingCart } from 'react-icons/fi';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const CartSidebar = () => {
    const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, clearCart } = useCart()

    const subTotal = cartItems.reduce((total, item) => total + (item.price || 0), 0)
    
    const getDiscountPercent = (count) => {
        if (count >= 2 && count <= 5) return 0.1;
        if (count >= 6 && count <= 10) return 0.15;
        if (count >= 11 && count <= 20) return 0.2;
        if (count > 20) return 0.25;
        return 0;
    }

    const discountPercent = getDiscountPercent(cartItems.length);
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
        // Some system encode Vietnamese combining accent as individual utf-8 characters
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Retaining for consistency
        return str;
    }

    const generatePDF = () => {
        const doc = new jsPDF();
        
        // Header Luxury Style
        doc.setFillColor(225, 6, 0); // Màu đỏ Vén Khéo
        doc.rect(0, 0, 210, 40, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(28);
        doc.setFont("helvetica", "bold");
        doc.text("VEN KHEO NETWORK", 105, 20, { align: "center" });
        
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text("HE THONG BOOKING KOLS & CONG DONG HANG DAU", 105, 30, { align: "center" });
        
        // Thông tin báo giá
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
        
        // Table Items
        const tableColumn = ["STT", "TEN KENH / DICH VU", "PLATFORM", "DON GIA (VND)"];
        const tableRows = [];

        cartItems.forEach((item, index) => {
            const rowData = [
                index + 1,
                removeVietnameseTones(item.name).toUpperCase(),
                removeVietnameseTones(item.platform).toUpperCase(),
                item.price.toLocaleString('vi-VN')
            ];
            tableRows.push(rowData);
        });

        // Generate Table với style chuyên nghiệp
        autoTable(doc, {
            startY: 80,
            head: [tableColumn],
            body: tableRows,
            theme: 'striped',
            headStyles: { 
                fillColor: [30, 41, 59], 
                textColor: [255, 255, 255], 
                fontSize: 10, 
                fontStyle: 'bold',
                halign: 'center'
            },
            bodyStyles: { fontSize: 9, cellPadding: 5 },
            columnStyles: {
                0: { halign: 'center', cellWidth: 15 },
                1: { cellWidth: 90 },
                2: { halign: 'center', cellWidth: 35 },
                3: { halign: 'right', cellWidth: 40 }
            },
            alternateRowStyles: { fillColor: [245, 245, 245] }
        });

        // Summary Calculations
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
            
            // Tổng cộng Highlight
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
            
            // Tổng cộng Highlight
            doc.setFillColor(225, 6, 0);
            doc.rect(summaryX - 5, finalY + 13, 70, 12, 'F');
            
            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(255, 255, 255);
            doc.text("TONG CONG:", summaryX, finalY + 21);
            doc.text(grandTotal.toLocaleString('vi-VN') + " VND", 190, finalY + 21, { align: "right" });
        }
        
        // Footer & Terms
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

        // Save PDF
        doc.save(`Bao_Gia_Ven_Kheo_${new Date().getTime().toString().slice(-6)}.pdf`);

        // Clear cart and close sidebar
        clearCart();
        setIsCartOpen(false);
    };

    return (
        <>
            {/* Lớp phủ đen mờ mờ khi mở giỏ hàng */}
            {isCartOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 transition-opacity backdrop-blur-sm"
                    onClick={() => setIsCartOpen(false)}
                ></div>
            )}

            {/* Giao diện chính của Sidebar */}
            <div className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-theme-primary border-l border-theme shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                {/* Header */}
                <div className="flex justify-between items-center p-4 md:p-5 border-b border-theme bg-theme-secondary transition-colors shrink-0">
                    <h2 className="text-theme-primary text-lg md:text-xl font-black uppercase tracking-tight">Báo Giá Của Bạn</h2>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="p-2 text-theme-muted hover:text-theme-primary hover:bg-theme-secondary rounded-full transition-colors cursor-pointer"
                    >
                        <FiX size={24} />
                    </button>
                </div>

                {/* Danh sách items */}
                <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-4 custom-scrollbar">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-theme-muted py-10">
                            <FiShoppingCart size={48} className="mb-4 opacity-20" />
                            <p className="text-center font-medium">Giỏ hàng đang trống.</p>
                        </div>
                    ) : (
                        cartItems.map(item => (
                            <div key={item.id} className="flex justify-between items-center bg-theme-secondary p-3 md:p-4 rounded-xl border border-theme transition-colors shadow-sm">
                                <div className="flex-1 pr-4">
                                    <span className="text-[#E10600] text-[9px] md:text-[10px] font-bold uppercase tracking-wider">{item.platform}</span>
                                    <h4 className="text-theme-primary font-bold text-xs md:text-sm line-clamp-1">{item.name}</h4>
                                    <p className="text-theme-muted text-[10px] md:text-xs mt-1">{formatMoney(item.price)}</p>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-theme-muted hover:text-red-500 p-2 transition-colors cursor-pointer"
                                >
                                    <FiTrash2 size={18} />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer Section - Shrink-0 ensures it stays at the bottom */}
                {cartItems.length > 0 && (
                    <div className="p-4 md:p-5 bg-theme-secondary border-t border-theme transition-colors shrink-0 mb-[env(safe-area-inset-bottom)]">
                        <div className="space-y-2 md:space-y-3 mb-4 md:mb-5">
                            <div className="flex justify-between text-theme-secondary text-[12px] md:text-sm">
                                <span>Tạm tính</span>
                                <span className="text-theme-primary font-bold">{formatMoney(subTotal)}</span>
                            </div>
                            {discountAmount > 0 && (
                                <div className="flex justify-between text-theme-secondary text-[12px] md:text-sm">
                                    <span>Chiết khấu ({discountPercent * 100}%)</span>
                                    <span className="text-green-500 font-bold">-{formatMoney(discountAmount)}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-theme-secondary text-[12px] md:text-sm">
                                <span>VAT (8%)</span>
                                <span className="text-theme-primary font-bold">{formatMoney(vat)}</span>
                            </div>
                            <div className="flex justify-between text-theme-primary font-black text-lg md:text-xl pt-3 md:pt-4 border-t border-theme">
                                <span>TỔNG CỘNG</span>
                                <span className="text-[#E10600]">{formatMoney(grandTotal)}</span>
                            </div>
                        </div>

                        <button 
                            onClick={generatePDF}
                            className="w-full bg-[#E10600] hover:bg-red-700 text-white font-black py-3.5 md:py-4 rounded-xl uppercase tracking-[0.1em] transition-all shadow-lg shadow-[#E10600]/20 active:scale-95 cursor-pointer text-xs md:text-sm"
                        >
                            Tải Xuống Báo Giá
                        </button>
                    </div>
                )}
            </div>
        </>
    );

}

export default CartSidebar;
