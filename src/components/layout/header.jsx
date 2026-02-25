import { Star, Sun, TrendingUp } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container">
        <div className="flex justify-between items-center py-4">
          {/*  Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 dark:bg-blue-500 p-2 rounded-lg">
              <TrendingUp />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Crypto <span className="text-amber-300">&</span> Coins
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Kropti Para Takip
              </p>
            </div>
          </div>

          {/*  İconlar */}
          <div className="flex items-center space-x-4">
            {/*  Favoriler */}
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <Star className="size-5" />
              <span className="text-sm">1</span>
            </div>

            {/*  Tema Butonu */}
            <button className="p-2 rounded-lg bg-gray-700 hover:bg-gray-100  dark:hover:bg-gray-600 transition">
              <Sun className="size-5 text-yellow-500" />
            </button>

            <div className="flex items-center space-x-2">
              <div className="size-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Canlı
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
