import { useCallback, useEffect, useState } from "react";
import { coinApi } from "../../services/coinApi";
import Error from "../../components/error/index";
import { Loader, RefreshCw, TrendingUp } from "lucide-react";

import Searchbar from "../../components/home/searchbar";
import InfoCard from "../../components/home/info-card";
import CoinCard from "../../components/home/coin-card";

const Home = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // api'dan coin verisini alıp state'i güncelle
  const fetchCoins = useCallback((isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    coinApi
      .getTopCoins()
      .then((data) => {
        setCoins(data);
        setLastUpdated(new Date());
      })
      .catch((error) => setError(error.message))
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  }, []);

  useEffect(() => {
    fetchCoins();
  }, []);
  // Hata durumu
  if (error) return <Error message={error} refetch={fetchCoins} />;

  return (
    <div className="space-y-6">
      {/*Başlık */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white ">
            Kripto Para Piyasası
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            En popüler kripto para birimleri
          </p>
        </div>
        {/*Arama ve Yenileme*/}
        <div className="flex items-center space-x-4">
          <Searchbar />

          <button
            onClick={() => fetchCoins(true)}
            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <RefreshCw className={`size-5`} />
          </button>
        </div>
      </div>
      {/*İstatislikler*/}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InfoCard
          label="Toplam Coin"
          value={coins.length}
          icon={<TrendingUp className="size-8 text-blue-500" />}
        />
        <InfoCard
          label="Son Güncelleme"
          value={
            lastUpdated ? lastUpdated.toLocaleTimeString("tr") : "Yükleniyor..."
          }
          icon={<RefreshCw className="size-8 text-green-500" />}
        />

        <InfoCard
          label="Durum"
          value={
            <div className="flex items-center space-x-2">
              <div className="size-2 bg-green-500 rounded-full animate-pulse" />
              <span>Canlı</span>
            </div>
          }
        />
      </div>
      {/*Listeleme*/}
      {loading && coins.length ? (
        <Loader />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {coins.map((coin) => (
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </div>
      )}
      {/*Yenilenme Durumu*/}
      {refreshing && (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <RefreshCw className="size-4 animate-spin" />
            <span>Güncelleniyor...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
