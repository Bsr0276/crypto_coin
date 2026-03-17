import { useCallback, useEffect, useMemo, useState } from "react";
import { coinApi } from "../../services/coinApi";
import Error from "../../components/error/index";
import Searchbar from "../../components/home/searchbar";
import { RefreshCw, TrendingUp } from "lucide-react";
import InfoCard from "../../components/home/info-card";
import Loader from "../../components/loader/index";
import CoinCard from "../../components/home/coin-card";
import Refresh from "./refresh";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [coins, setCoins] = useState([]);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  // ilk yüklenme anında verileri çek
  useEffect(() => {
    fetchCoins();
  }, []);

  // otomatik yenileme - her 30sn de bir
  useEffect(() => {
    const id = setInterval(() => {
      fetchCoins(true);
    }, 30000);

    // component'ın ekrandan ayrılma anında sayacı durdur
    return () => {
      clearInterval(id);
    };
  }, []);

  // coin veya aratılan kelime her değiştiğinde filtrele
  const filtredCoins = useMemo(() => {
    if (!searchTerm.trim()) return coins;

    const term = searchTerm.toLowerCase();

    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(term) ||
        coin.symbol.toLowerCase().includes(term),
    );
  }, [coins, searchTerm]);

  // arama durumunda çalışıcak fonksiyon
  const onSearch = useCallback((text) => {
    setSearchTerm(text);
  }, []);

  //  Hata Durumu
  if (error) return <Error message={error} refetch={fetchCoins} />;

  return (
    <div className="space-y-6">
      {/* Başlık */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Kripto Para Piyasası
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            En popüler kripto para birimleri
          </p>
        </div>

        {/* Arama ve Yenileme */}
        <div className="flex items-center gap-5">
          <Searchbar onSearch={onSearch} />

          <button
            onClick={() => fetchCoins(true)}
            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <RefreshCw
              className={`size-5  ${refreshing ? "animate-spin" : ""}}`}
            />
          </button>
        </div>
      </div>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InfoCard
          label="Toplam Coin"
          value={coins.length}
          icon={<TrendingUp className="size-8 text-blue-500" />}
        />

        <InfoCard
          label="Son Güncelleme"
          value={
            lastUpdated ? lastUpdated.toLocaleTimeString("tr") : "Yükleniyor.."
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

      {/* Listeleme */}
      {loading && coins.length < 1 ? (
        <Loader />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtredCoins.map((coin) => (
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </div>
      )}

      {/* Yenilenme durumu */}
      <Refresh show={refreshing} />
    </div>
  );
};

export default Home;
