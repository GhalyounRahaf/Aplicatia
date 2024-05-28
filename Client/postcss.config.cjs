// module.exports = ({ env }) => ({
//   plugins: [
//     require('tailwindcss')({
//       config: './src/tailwind.config.js'
//     }),
//     require('autoprefixer')()
//   ],
// })

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
};
