/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Thêm các màu sắc và font chữ từ thiết kế Figma
      colors: {
        'primary': '#054C73',
        'secondary': '#DBA362',
        // Thêm các màu khác nếu cần
      },
      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
        // Thêm các font khác nếu cần
      },
    },
  },
  plugins: [],
}

