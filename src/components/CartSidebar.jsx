import { useCart } from "./CartContext"
import { FiX, FiTrash2, FiShoppingCart } from 'react-icons/fi';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const CartSidebar = () => {
    const { cartItems, isCartOpen, setIsCartOpen, removeFromCart } = useCart()

    const subTotal = cartItems.reduce((total, item) => total + (item.price || 0), 0)
    const vat = subTotal * 0.08
    const grandTotal = subTotal + vat

    const formatMoney = (amount) => {
        return amount.toLocaleString('vi-VN') + ' ₫'
    }

    const generatePDF = () => {
        const doc = new jsPDF();
        
        // Header
        doc.setFontSize(22);
        doc.setTextColor(220, 38, 38); // Vén Khéo Green
        doc.text("VÉN KHÉO", 105, 20, { align: "center" });
        
        doc.setFontSize(14);
        doc.setTextColor(100);
        doc.text("BÁO GIÁ DỊCH VỤ BOOKING", 105, 30, { align: "center" });
        
        doc.setFontSize(10);
        doc.text(`Ngày: ${new Date().toLocaleDateString('vi-VN')}`, 105, 38, { align: "center" });
        
        // Table Items
        const tableColumn = ["STT", "Tên Kênh", "Nền Tảng", "Đơn Giá (VND)"];
        const tableRows = [];

        cartItems.forEach((item, index) => {
            const rowData = [
                index + 1,
                item.name,
                item.platform,
                item.price.toLocaleString('vi-VN')
            ];
            tableRows.push(rowData);
        });

        // Generate Table
        doc.autoTable({
            startY: 50,
            head: [tableColumn],
            body: tableRows,
            theme: 'grid',
            headStyles: { fillColor: [220, 38, 38], textColor: [255, 255, 255], fontStyle: 'bold' },
            styles: { fontSize: 9, cellPadding: 3 },
            columnStyles: {
                0: { halign: 'center', cellWidth: 15 },
                1: { cellWidth: 80 },
                2: { halign: 'center', cellWidth: 35 },
                3: { halign: 'right', cellWidth: 40 }
            }
        });

        // Summary Calculations
        const finalY = doc.lastAutoTable.finalY + 10;
        
        doc.setFontSize(10);
        doc.setTextColor(80);
        
        const summaryX = 140;
        doc.text("Tạm tính:", summaryX, finalY);
        doc.text(subTotal.toLocaleString('vi-VN') + " VND", 200, finalY, { align: "right" });
        
        doc.text("VAT (8%):", summaryX, finalY + 7);
        doc.text(vat.toLocaleString('vi-VN') + " VND", 200, finalY + 7, { align: "right" });
        
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(220, 38, 38);
        doc.text("TỔNG CỘNG:", summaryX, finalY + 16);
        doc.text(grandTotal.toLocaleString('vi-VN') + " VND", 200, finalY + 16, { align: "right" });
        
        // Footer
        const pageHeight = doc.internal.pageSize.height;
        doc.setFontSize(9);
        doc.setFont(undefined, 'italic');
        doc.setTextColor(150);
        doc.text("Cảm ơn bạn đã tin tưởng dịch vụ của Vén Khéo!", 105, pageHeight - 20, { align: "center" });
        doc.text("Website: venkheo.com | Email: contact@venkheo.com", 105, pageHeight - 14, { align: "center" });

        // Save PDF
        doc.save(`Bao_Gia_Ven_Kheo_${new Date().getTime()}.pdf`);
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
                <div className="flex justify-between items-center p-5 border-b border-theme bg-theme-secondary transition-colors">
                    <h2 className="text-theme-primary text-xl font-black uppercase tracking-tight">Báo Giá Của Bạn</h2>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="p-2 text-theme-muted hover:text-theme-primary hover:bg-theme-secondary rounded-full transition-colors cursor-pointer"
                    >
                        <FiX size={24} />
                    </button>
                </div>

                {/* Danh sách items */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-theme-muted">
                            <FiShoppingCart size={48} className="mb-4 opacity-20" />
                            <p className="text-center font-medium">Giỏ hàng đang trống.</p>
                        </div>
                    ) : (
                        cartItems.map(item => (
                            <div key={item.id} className="flex justify-between items-center bg-theme-secondary p-4 rounded-xl border border-theme transition-colors">
                                <div className="flex-1 pr-4">
                                    <span className="text-[#E10600] text-[10px] font-bold uppercase tracking-wider">{item.platform}</span>
                                    <h4 className="text-theme-primary font-bold text-sm line-clamp-1">{item.name}</h4>
                                    <p className="text-theme-muted text-xs mt-1">{formatMoney(item.price)}</p>
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

                {cartItems.length > 0 && (
                    <div className="p-5 bg-theme-secondary border-t border-theme transition-colors">
                        <div className="space-y-3 mb-5">
                            <div className="flex justify-between text-theme-secondary text-sm">
                                <span>Tạm tính</span>
                                <span className="text-theme-primary font-bold">{formatMoney(subTotal)}</span>
                            </div>
                            <div className="flex justify-between text-theme-secondary text-sm">
                                <span>VAT (8%)</span>
                                <span className="text-theme-primary font-bold">{formatMoney(vat)}</span>
                            </div>
                            <div className="flex justify-between text-theme-primary font-black text-xl pt-4 border-t border-theme">
                                <span>TỔNG CỘNG</span>
                                <span className="text-[#E10600]">{formatMoney(grandTotal)}</span>
                            </div>
                        </div>

                        <button 
                            onClick={generatePDF}
                            className="w-full bg-[#E10600] hover:bg-red-700 text-white font-black py-4 rounded-xl uppercase tracking-[0.1em] transition-all shadow-lg shadow-[#E10600]/20 active:scale-95 cursor-pointer"
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