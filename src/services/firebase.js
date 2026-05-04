import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Fen thay thế các thông tin bên dưới bằng cấu hình từ Firebase Console của fen nhé:
// 1. Vào Firebase Console -> Project Settings -> General
// 2. Kéo xuống dưới phần 'Your apps' -> Chọn biểu tượng Web (</>)
// 3. Đăng ký app và copy đoạn firebaseConfig dán vào đây:

const firebaseConfig = {
  apiKey: "AIzaSyCuPngG3YJ4qQZPA8xD1RC8dUUEvSVcdfQ",
  authDomain: "booking-9b08d.firebaseapp.com",
  databaseURL: "https://booking-9b08d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "booking-9b08d",
  storageBucket: "booking-9b08d.firebasestorage.app",
  messagingSenderId: "536781371517",
  appId: "1:536781371517:web:3a502dde813d5a284f5914",
  measurementId: "G-0R3PW4CXBR"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Realtime Database
export const db = getDatabase(app);
