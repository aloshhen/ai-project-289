# WEBSITE Project

> 🤖 Этот проект был автоматически сгенерирован с помощью AI Constructor Bot

## 📝 Описание

<b>ИСХОДНЫЙ ЗАПРОС:</b>
Create a high-fidelity DeFi Lending Dashboard inspired by the structure of "evaa.finance" but designed in the "Aether Protocol" aesthetic (Liquid Chrome, Obsidian, Solar Flare Orange).

1. CORE CONCEPT:
Build a single-page React application that serves as the main interface for a lending protocol. Users can Supply assets to earn APY or Borrow assets against collateral.

2. VISUAL STYLE (THE AETHER VIBE):
* Background: #050505 (Deep Void).
* Surface: Glassmorphism with a metallic tint. Cards should look like dark smoked glass with a 1px border of faint white/chrome.
* Accents:
    * Primary Action: #FF4D00 (Solar Flare) for "Connect Wallet" and active toggles.
    * Secondary: #E5E5E5 (Liquid Chrome) for text and icons.
    * Positive Numbers: Use a subtle "Mint Green" or keep them White to maintain the monochrome/orange luxury feel.
* Typography:
    * Headlines/Assets: 'Inter' (Bold/Black).
    * Numbers/Data: 'JetBrains Mono' (for that technical precision).

3. PAGE STRUCTURE (Functionality similar to EVAA):

* Header:
    * Logo "AETHER".
    * Nav Items: Dashboard, Liquidation, Governance.
    * Right side: "Connect Wallet" button (Pulsing Solar Flare effect).

* Market Stats Bar (Top):
    * 3 Data Points: "Total Market Size" ($142.5M), "Total Borrowed" ($84.2M), "Aether Price" ($4.20).
    * Style: Monospace numbers, slight glow.

* Main Dashboard (The Core):
    * Toggle Switch: A large, liquid-animated switch between "Market View" and "Your Dashboard".
    * The Table: A responsive grid/table listing assets (TON, USDT, BTC, ETH, AETHER).
    * Columns: Asset Name, Net APY (Supply/Borrow), Total Supplied, Total Borrowed, Wallet Balance.
    * Interaction:
        * Rows must have a hover effect (highlight with a chrome gradient).
        * Clicking a row opens a "Transaction Modal" (Simulate this).

* The Interaction Modal (Critical):
    * When clicking "TON", a modal appears in the center (backdrop blur).
    * Tabs: Supply / Borrow / Withdraw / Repay.
    * Input field: "0.00" with a "MAX" button.
    * Info section: "Health Factor" meter (visualize it as a progress bar).
    * Action Button: "CONFIRM TRANSACTION".

4. TECHNICAL REQUIREMENTS:
* Stack: React (Vite) + Tailwind CSS + Framer Motion + Lucide React icons.
* Data: Create a robust const markets = [...] array with mock data for at least 5 assets so the UI looks populated.
* Animation: Use layoutId from Framer Motion for the Supply/Borrow toggle to make it slide smoothly like liquid.
* Responsive: The table must turn into a card view on mobile.

GOAL: The interface must feel faster and more expensive than evaa.finance. Less "cartoonish", more "institutional grade tool".

<b>УТОЧНЕНИЯ:</b>
🧩 Какие дополнительные блоки должны быть на странице?
→ График доходности APY
Информация о ликвидности

🎨 Какой тип анимаций предпочтителен для взаимодействия?
→ Сложные эффекты с жидкостью и светом

⚡ Какие данные должны быть отображены в модальном окне транзакции?
→ Текущие ставки APY для выбранного актива
• Информация о залоге и рисках
• История транзакций по активу

⚡ Какой тип адаптивности предпочтителен для таблицы на мобильных устройствах?
→ Аккордеон с раскрывающимися строками



## 🚀 Технологии

- React (Vite)  
- Tailwind CSS  
- Framer Motion (для анимаций)  
- Lucide React (иконки)  
- Chart.js или D3.js (для графиков APY)

## 📁 Структура проекта

- `package.json`
- `index.html`
- `vite.config.js`
- `tailwind.config.js`
- `postcss.config.js`
- `src/index.css`
- `src/main.jsx`
- `src/App.jsx`
- `src/components/IconRegistry.tsx`
- `src/components/SafeIcon.tsx`
- `vercel.json`
- `.gitignore`
- `README.md`

## 🛠️ Установка

```bash
npm install
```

## ▶️ Запуск

```bash
npm start
# или
npm run dev
```

## 📋 План разработки

1.

## 📄 Лицензия

MIT

## 🤖 Создано с помощью

[AI Constructor Bot](https://t.me/construct_ai_bot) - Telegram бот для автоматической генерации проектов с помощью AI
