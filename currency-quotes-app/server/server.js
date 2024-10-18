const express = require('express');
const WebSocket = require('ws');
const app = express();
const PORT = 3000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const wss = new WebSocket.Server({server});

// Функция для генерации случайных котировок
function generateRandomRate(symbol) {
  const ask = +(Math.random() * (1.2 - 1.1) + 1.1).toFixed(4);
  let bid = +(Math.random() * (1.2 - 1.1) + 1.1).toFixed(4);

  if (bid > ask) {
    bid = ask;
  }

  return {
    time: new Date().toISOString(),
    symbol,
    bid,
    ask,
  };
}

// Частота обновлений
const updateInterval = 1000 / 20; // 20 обновлений в секунду

// Отправляем данные котировок всем подключенным клиентам
wss.on('connection', (ws) => {
  console.log('New client connected');

  // Генерация данных с заданной частотой
  const intervalId = setInterval(() => {
    const symbols = ['EURUSD', 'GBPUSD', 'USDJPY', 'AUDUSD', 'USDT', 'NFT', 'RUB', 'BTC', 'ETH'];
    const rates = symbols.map(symbol => generateRandomRate(symbol));

    // Сериализуем данные в JSON перед отправкой
    const jsonData = JSON.stringify(rates);
    ws.send(jsonData);
  }, updateInterval);

  // Закрытие соединения
  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(intervalId);
  });
});

// Endpoint для проверки работы сервера
app.get('/', (req, res) => {
  res.send('WebSocket server is running');
});
