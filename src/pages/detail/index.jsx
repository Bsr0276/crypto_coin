import { useCallback, useEffect, useState } from "react";
import { coinApi } from "../../services/coinApi";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader";
import Error from "../../components/error";
import CoinHeader from "./coin-header";
import CoinPrice from "./coin-price";
import CoinChartSection from "./coin-chart-section";
import CoinStatsGrid from "./coin-stats-grid";
import CoinDescription from "./coin-description";

const Detail = () => {
  const { id } = useParams();
  const [selectedPeriod, setSelectedPeriod] = useState(7);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [coin, setCoin] = useState(null);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [priceHistory, setPriceHistory] = useState([]);

  // fiyat geçmişini çeken fonksiyon
  const fetchPriceHistory = useCallback(
    async (days = selectedPeriod) => {
      try {
        setHistoryLoading(true);
        const data = await coinApi.getPriceHistory(id, selectedPeriod);
        setPriceHistory(data);
      } catch (error) {
        setPriceHistory([]);
      } finally {
        setHistoryLoading(false);
      }
    },
    [id, selectedPeriod],
  );

  // coin detaylarını çeken fonksiyon
  const fetchCoinDetail = useCallback(
    async (isRefresh = false) => {
      try {
        if (isRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        const data = await coinApi.getCoinDetail(id);

        setCoin(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [id],
  );

  // ilk yüklenme anında coin detay verisini ve fiyat geçmişini çek
  useEffect(() => {
    fetchCoinDetail();
    fetchPriceHistory();
  }, []);

  // seçili peryot her değiştiğinde güncel verileri al
  useEffect(() => {
    if (coin) {
      fetchPriceHistory(selectedPeriod); // seçili peryoda göre fiyat geçmişini al
      fetchCoinDetail(true); // coin detay verilerini çek
    }
  }, [selectedPeriod]);

  // verileri yenile
  const handleRefresh = () => {
    fetchCoinDetail(true);
    fetchPriceHistory();
  };

  if (loading) return <Loader />;

  if (error)
    return (
      <Error
        message={error.message}
        refetch={() => {
          fetchCoinDetail();
          fetchPriceHistory();
        }}
      />
    );

  return (
    <div className="space-y-6">
      <CoinHeader
        coin={coin}
        handleRefresh={handleRefresh}
        refreshing={refreshing}
      />
      <CoinPrice coin={coin} />
      <CoinChartSection
        coin={coin}
        priceHistory={priceHistory}
        historyLoading={historyLoading}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
      />
      <CoinStatsGrid coin={coin} />
      <CoinDescription coin={coin} />
    </div>
  );
};

export default Detail;
