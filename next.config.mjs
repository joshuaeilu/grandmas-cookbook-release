/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['www.themealdb.com','flagsapi.com'],
      },
      exportPathMap: async function (
        defaultPathMap,
        { dev, dir, outDir, distDir, buildId }
      ) {
        return {
          '/': { page: '/' },
          '/all_meals/selected_all_meals': { page: '/all_meals/selected_all_meals' },
          '/categories/selected_all_categories': { page: '/categories/selected_all_categories' },
          '/meal_maker': { page: '/meal_maker' },
          '/nations/selected_all_nations': { page: '/nations/selected_all_nations' }
        };
      }
};

export default nextConfig;
