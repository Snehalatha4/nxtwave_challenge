/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
          950: '#2E1065',
        },
        cute: {
          pink: '#FB7185',
          rose: '#F43F5E',
          softpink: '#FFF1F2',
          pastelpink: '#FFE4E6',
          lavender: '#EDE9FE',
          lilac: '#A78BFA',
          mint: '#10B981',
          softmint: '#ECFDF5',
          sky: '#38BDF8',
          softsky: '#F0F9FF',
          peach: '#FDBA74',
          softpeach: '#FFF7ED',
          banana: '#FDE68A',
        },
        surface: {
          50: '#FFFFFF',
          100: '#FAFAFD',
          150: '#F4F5FB',
          200: '#ECEFF8',
          300: '#DFE4F2',
          400: '#CBD2E4',
          700: '#475569',
          750: '#334155',
          800: '#1E293B',
          850: '#172033',
          900: '#0F172A',
          950: '#07090E',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'cute-sm': '0 2px 8px -1px rgba(99, 102, 241, 0.06), 0 1px 3px 0 rgba(0, 0, 0, 0.03)',
        'cute': '0 8px 24px -4px rgba(124, 58, 237, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
        'cute-lg': '0 16px 40px -6px rgba(124, 58, 237, 0.12), 0 4px 12px -2px rgba(244, 63, 94, 0.06)',
        'cute-pink': '0 10px 28px -4px rgba(244, 63, 94, 0.18)',
        'cute-card': '0 4px 20px -2px rgba(100, 116, 139, 0.08), 0 1px 4px 0 rgba(0, 0, 0, 0.02)',
        'cute-card-hover': '0 16px 36px -4px rgba(124, 58, 237, 0.14), 0 4px 10px -2px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
