/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'gym': "url('/assets/pages/images/gym.jpg')",
      }),
      screens: {
        'xxs': '320px',
      },
    },
  },
  plugins: [],
}

