import { Calendar, LoaderCircle } from "lucide-react";
import PriceChart from "./price-chart";

const CoinChartSection = ({
  coin,
  priceHistory,
  historyLoading,
  selectedPeriod,
  setSelectedPeriod,
}) => {
  const periodOptions = [
    { days: 1, label: "1G" },
    { days: 7, label: "7G" },
    { days: 30, label: "30G" },
    { days: 90, label: "90G" },
    { days: 365, label: "1Y" },
  ];

  return (
    <div className="detail-container">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Calendar className="size-5 text-gray-600 dark:text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Fiyat Geçmişi{" "}
          </h2>
        </div>
        <div className="flex space-x-2">
          {periodOptions.map(({ days, label }) => (
            <button
              onClick={() => setSelectedPeriod(days)}
              className={`px-3 py-1 text-sm rounded-md transition ${selectedPeriod === days ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"} `}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Fiyat grafiği */}
      {historyLoading ? (
        <div className="h-80 flex items-center justify-between">
          <div className="flex flex-col items-center justify-center w-full gap-1">
            <LoaderCircle className="text-blue-600 animate-spin size-8"/>
            <p className="text-gray-600 dark:text-gray-400">Grafik yükleniyor...</p>
          </div>
        </div>
      ) : (
        <PriceChart priceHistory={priceHistory} symbol={coin.symbol} days={selectedPeriod} />
      )}
    </div>
  );
};

export default CoinChartSection;
