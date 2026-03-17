import axios from "axios";
import { data } from "react-router-dom";

// axios öneği
const apiClient = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    "x-cg-demo-api-key": import.meta.env.VITE_API_KEY,
  },
});

// API isteğini atan fonksiyonları bir arada toplayalı
// Yönetim kolaylığı sağlar
// Conponent içerisisndeki kod karışıklığını azltır
export const coinApi = {
  // Top coinleri getir market cap e göre sırala

  async getTopCoins() {
    try {
      const res = await apiClient.get("/coins/markets", {
        params: { vs_currency: "usd" },
      });

      return res.data;
    } catch (error) {
      throw new Error(`Coin verisi çekilemdi: ${error.message}`);
    }
  },

  //coin detay verisi çek
  async getCoinDetail(id) {
    try {
      const res = await apiClient.get(`/coins/${id}`);
      return res.data;
    } catch (err) {
      throw new Error(`Coin detay verisi çekilemedi: ${err.message}`);
    }
  },
  // coin geçmiş verisini çek

  async getPriceHistory(id, days = 7) {
    try {
      const res = await apiClient.get(`/coins/${id}/market_chart`, {
        params: {
          vs_currency: "usd",
          days: days,
          interval: days <= 1 ? undefined : "daily",
        },
      });

      // api den gel fiyat verisini daha kullanılabilir formata çevr
      return res.data.prices.map(([timestamp, price]) => ({
        timestamp,
        price,
        data: new Date(timestamp).toISOString(),
      }));
    } catch (err) {
      throw new Error(`Coin geçmiş verisi çekilemedi: ${err.message}`);
    }
  },
};
