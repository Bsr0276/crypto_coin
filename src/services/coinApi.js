import axios from "axios";

// axios öneği
const apiClient = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    "x-cg-demo-api-key": import.meta.env.VITE_API_KEY,
  },
});

//API isteğini atan fonksiyonları bir arada toplayalı
// Yönetim kolaylığı sağlar
// Conponent içerisisndeki kod karışıklığını azltır
export const coinApi= {
  // Top coinleri getir market cap e göre sırala

  async getTopCoins() {
    try {
      const res = await apiClient.get("/coins/markets", {
        params: {vs_currency : "usd"},
      });

      return res.data;
    } catch (error) {
        throw new Error (`Coin verisi çekilemdi: ${error.message}`)
    }
  },
};
