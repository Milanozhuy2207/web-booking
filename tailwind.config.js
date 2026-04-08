/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                theme: {
                    primary: 'var(--bg-primary)',
                    secondary: 'var(--bg-secondary)',
                    card: 'var(--card-bg)',
                    accent: 'var(--accent)',
                }
            }
        },
    },
    plugins: [],
}