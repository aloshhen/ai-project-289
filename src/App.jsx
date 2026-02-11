import { SafeIcon } from './components/SafeIcon';
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  AlertCircle,
  CheckCircle,
  X,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  History,
  Shield,
  Zap,
  BarChart3,
  Droplets,
  Clock
} from 'lucide-react'

// Mock data for markets
const MARKETS_DATA = [
  {
    id: 'ton',
    name: 'TON',
    fullName: 'Toncoin',
    icon: 'Zap',
    supplyAPY: 8.42,
    borrowAPY: 12.85,
    totalSupplied: 45200000,
    totalBorrowed: 28500000,
    walletBalance: 1250.50,
    price: 5.23,
    collateralFactor: 0.75,
    liquidity: 16700000,
    color: '#0088CC'
  },
  {
    id: 'usdt',
    name: 'USDT',
    fullName: 'Tether USD',
    icon: 'DollarSign',
    supplyAPY: 4.25,
    borrowAPY: 7.82,
    totalSupplied: 78400000,
    totalBorrowed: 52300000,
    walletBalance: 5000.00,
    price: 1.00,
    collateralFactor: 0.85,
    liquidity: 26100000,
    color: '#26A17B'
  },
  {
    id: 'btc',
    name: 'BTC',
    fullName: 'Bitcoin',
    icon: 'Bitcoin',
    supplyAPY: 2.15,
    borrowAPY: 5.42,
    totalSupplied: 125000000,
    totalBorrowed: 48000000,
    walletBalance: 0.45,
    price: 67250.00,
    collateralFactor: 0.70,
    liquidity: 77000000,
    color: '#F7931A'
  },
  {
    id: 'eth',
    name: 'ETH',
    fullName: 'Ethereum',
    icon: 'Hexagon',
    supplyAPY: 3.85,
    borrowAPY: 6.92,
    totalSupplied: 89200000,
    totalBorrowed: 41200000,
    walletBalance: 3.20,
    price: 3520.00,
    collateralFactor: 0.75,
    liquidity: 48000000,
    color: '#627EEA'
  },
  {
    id: 'aether',
    name: 'AETHER',
    fullName: 'Aether Protocol',
    icon: 'Flame',
    supplyAPY: 15.75,
    borrowAPY: 22.40,
    totalSupplied: 28500000,
    totalBorrowed: 19800000,
    walletBalance: 2500.00,
    price: 4.20,
    collateralFactor: 0.65,
    liquidity: 8700000,
    color: '#FF4D00'
  }
]

// Transaction history mock data
const TRANSACTION_HISTORY = [
  { type: 'Supply', amount: '1,250.00 TON', date: '2 hours ago', status: 'completed' },
  { type: 'Borrow', amount: '500.00 USDT', date: '1 day ago', status: 'completed' },
  { type: 'Repay', amount: '200.00 USDT', date: '3 days ago', status: 'completed' },
  { type: 'Withdraw', amount: '0.1 BTC', date: '1 week ago', status: 'completed' },
]

// APY Chart Component
const APYChart = ({ data, color }) => {
  const maxVal = Math.max(...data)
  const minVal = Math.min(...data)
  const range = maxVal - minVal || 1

  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * 100
    const y = 100 - ((val - minVal) / range) * 80 - 10
    return `${x},${y}`
  }).join(' ')

  return (
    <div className="w-full h-32 relative">
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon
          points={`0,100 ${points} 100,100`}
          fill={`url(#gradient-${color})`}
        />
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {data.map((val, idx) => {
          const x = (idx / (data.length - 1)) * 100
          const y = 100 - ((val - minVal) / range) * 80 - 10
          return (
            <circle
              key={idx}
              cx={x}
              cy={y}
              r="2"
              fill={color}
              className="opacity-0 hover:opacity-100 transition-opacity"
            />
          )
        })}
      </svg>
      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 font-mono">
        <span>30d</span>
        <span>20d</span>
        <span>10d</span>
        <span>Now</span>
      </div>
    </div>
  )
}

// Header Component
const Header = () => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                <SafeIcon name="Flame" size={20} className="text-white" />
              </div>
              <div className="absolute inset-0 rounded-xl bg-orange-500/50 blur-xl animate-pulse" />
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tight text-white">
              AETHER
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {['Dashboard', 'Liquidation', 'Governance'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF4D00] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Connect Wallet Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-4 md:px-6 py-2.5 md:py-3 bg-[#FF4D00] rounded-lg font-semibold text-white text-sm md:text-base overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF4D00] via-orange-400 to-[#FF4D00] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 animate-pulse-glow opacity-50" />
            <span className="relative flex items-center gap-2">
              <SafeIcon name="Wallet" size={18} />
              <span className="hidden sm:inline">Connect Wallet</span>
              <span className="sm:hidden">Connect</span>
            </span>
          </motion.button>
        </div>
      </div>
    </motion.header>
  )
}

// Market Stats Bar
const MarketStatsBar = () => {
  const stats = [
    { label: 'Total Market Size', value: '$142.5M', change: '+5.2%', positive: true },
    { label: 'Total Borrowed', value: '$84.2M', change: '+3.8%', positive: true },
    { label: 'Aether Price', value: '$4.20', change: '+12.5%', positive: true },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="mt-20 md:mt-24 mb-8"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="glass-card rounded-2xl p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex items-center justify-between md:justify-start md:gap-4">
                <div>
                  <p className="text-xs md:text-sm text-gray-500 mb-1">{stat.label}</p>
                  <p className="text-xl md:text-2xl font-mono font-bold text-white number-glow">
                    {stat.value}
                  </p>
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                  stat.positive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                }`}>
                  <SafeIcon
                    name={stat.positive ? 'TrendingUp' : 'TrendingDown'}
                    size={12}
                  />
                  {stat.change}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Toggle Switch Component
const DashboardToggle = ({ activeView, setActiveView }) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="relative p-1 glass-card rounded-xl inline-flex">
        <motion.div
          layoutId="activeTab"
          className="absolute inset-y-1 rounded-lg bg-[#FF4D00]"
          initial={false}
          animate={{
            left: activeView === 'market' ? '4px' : '50%',
            right: activeView === 'market' ? '50%' : '4px',
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
        <button
          onClick={() => setActiveView('market')}
          className={`relative z-10 px-6 py-2.5 text-sm font-medium transition-colors rounded-lg ${
            activeView === 'market' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Market View
        </button>
        <button
          onClick={() => setActiveView('dashboard')}
          className={`relative z-10 px-6 py-2.5 text-sm font-medium transition-colors rounded-lg ${
            activeView === 'dashboard' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Your Dashboard
        </button>
      </div>
    </div>
  )
}

// Asset Table Row (Desktop)
const AssetTableRow = ({ asset, onClick, isExpanded, onToggle }) => {
  const formatCurrency = (val) => {
    if (val >= 1e6) return `$${(val / 1e6).toFixed(1)}M`
    if (val >= 1e3) return `$${(val / 1e3).toFixed(1)}K`
    return `$${val.toFixed(2)}`
  }

  const formatNumber = (val) => {
    if (val >= 1e6) return `${(val / 1e6).toFixed(2)}M`
    if (val >= 1e3) return `${(val / 1e3).toFixed(2)}K`
    return val.toFixed(2)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ backgroundColor: 'rgba(229, 229, 229, 0.05)' }}
        onClick={onToggle}
        className="hidden md:grid grid-cols-12 gap-4 p-4 items-center cursor-pointer border-b border-white/5 hover:border-white/10 transition-colors group"
      >
        <div className="col-span-3 flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm"
            style={{ backgroundColor: `${asset.color}20`, color: asset.color }}
          >
            {asset.name.slice(0, 2)}
          </div>
          <div>
            <p className="font-bold text-white group-hover:text-[#FF4D00] transition-colors">
              {asset.name}
            </p>
            <p className="text-xs text-gray-500">{asset.fullName}</p>
          </div>
        </div>

        <div className="col-span-2">
          <div className="flex flex-col">
            <span className="text-green-400 font-mono font-medium text-sm">
              {asset.supplyAPY.toFixed(2)}%
            </span>
            <span className="text-orange-400 font-mono text-xs">
              {asset.borrowAPY.toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="col-span-3 font-mono text-sm text-gray-300">
          {formatCurrency(asset.totalSupplied)}
        </div>

        <div className="col-span-2 font-mono text-sm text-gray-300">
          {formatCurrency(asset.totalBorrowed)}
        </div>

        <div className="col-span-2 flex items-center justify-between">
          <span className="font-mono text-sm text-white">
            {formatNumber(asset.walletBalance)} {asset.name}
          </span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <SafeIcon name="ChevronDown" size={16} className="text-gray-500" />
          </motion.div>
        </div>
      </motion.div>

      {/* Accordion Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="hidden md:block overflow-hidden bg-white/[0.02]"
          >
            <div className="p-4 grid grid-cols-3 gap-4">
              <div className="glass-card rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-2">Available Liquidity</p>
                <p className="text-lg font-mono font-bold text-white">
                  {formatCurrency(asset.liquidity)}
                </p>
              </div>
              <div className="glass-card rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-2">Collateral Factor</p>
                <p className="text-lg font-mono font-bold text-white">
                  {(asset.collateralFactor * 100).toFixed(0)}%
                </p>
              </div>
              <div className="flex items-center justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    onClick(asset)
                  }}
                  className="px-6 py-3 bg-[#FF4D00] hover:bg-[#FF6D00] text-white font-semibold rounded-xl transition-colors"
                >
                  Manage Asset
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Mobile Asset Card
const MobileAssetCard = ({ asset, onClick, isExpanded, onToggle }) => {
  const formatCurrency = (val) => {
    if (val >= 1e6) return `$${(val / 1e6).toFixed(1)}M`
    if (val >= 1e3) return `$${(val / 1e3).toFixed(1)}K`
    return `$${val.toFixed(2)}`
  }

  return (
    <motion.div
      layout
      className="md:hidden glass-card rounded-xl overflow-hidden mb-3"
    >
      <div
        onClick={onToggle}
        className="p-4 flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center font-bold"
            style={{ backgroundColor: `${asset.color}20`, color: asset.color }}
          >
            {asset.name.slice(0, 2)}
          </div>
          <div>
            <p className="font-bold text-white">{asset.name}</p>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-green-400 font-mono">{asset.supplyAPY.toFixed(2)}% APY</span>
            </div>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <SafeIcon name="ChevronDown" size={20} className="text-gray-500" />
        </motion.div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Total Supplied</p>
                  <p className="font-mono text-sm text-white">{formatCurrency(asset.totalSupplied)}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Total Borrowed</p>
                  <p className="font-mono text-sm text-white">{formatCurrency(asset.totalBorrowed)}</p>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs text-gray-500">Wallet Balance</p>
                  <p className="font-mono text-sm text-white">{asset.walletBalance.toFixed(2)} {asset.name}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500">Borrow APY</p>
                  <p className="font-mono text-sm text-orange-400">{asset.borrowAPY.toFixed(2)}%</p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onClick(asset)}
                className="w-full py-3 bg-[#FF4D00] hover:bg-[#FF6D00] text-white font-semibold rounded-xl transition-colors"
              >
                Manage Asset
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Transaction Modal
const TransactionModal = ({ asset, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('supply')
  const [amount, setAmount] = useState('')
  const [healthFactor, setHealthFactor] = useState(1.85)

  const tabs = [
    { id: 'supply', label: 'Supply', icon: 'ArrowDownRight' },
    { id: 'borrow', label: 'Borrow', icon: 'ArrowUpRight' },
    { id: 'withdraw', label: 'Withdraw', icon: 'ArrowUpRight' },
    { id: 'repay', label: 'Repay', icon: 'ArrowDownRight' },
  ]

  const apyData = [4.2, 5.1, 4.8, 6.2, 5.9, 7.1, 6.8, 8.4, 7.9, 8.42]

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen || !asset) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto custom-scrollbar"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          >
            <SafeIcon name="X" size={20} className="text-gray-400" />
          </button>

          <div className="glass-card rounded-2xl overflow-hidden">
            {/* Asset Header */}
            <div className="p-6 border-b border-white/5">
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold"
                  style={{ backgroundColor: `${asset.color}20`, color: asset.color }}
                >
                  {asset.name.slice(0, 2)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{asset.name}</h2>
                  <p className="text-gray-500">{asset.fullName}</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-2xl font-mono font-bold text-white">${asset.price.toFixed(2)}</p>
                  <p className="text-xs text-green-400 flex items-center justify-end gap-1">
                    <SafeIcon name="TrendingUp" size={12} />
                    +2.4%
                  </p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/5">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-4 text-sm font-medium transition-colors relative ${
                    activeTab === tab.id ? 'text-[#FF4D00]' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <SafeIcon name={tab.icon} size={14} />
                    {tab.label}
                  </span>
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="modalTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF4D00]"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Amount Input */}
              <div>
                <label className="text-sm text-gray-500 mb-2 block">Amount</label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-2xl font-mono text-white placeholder-gray-600 focus:outline-none focus:border-[#FF4D00]/50 transition-colors"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <span className="text-gray-500 font-medium">{asset.name}</span>
                    <button
                      onClick={() => setAmount(asset.walletBalance.toString())}
                      className="px-2 py-1 text-xs font-medium text-[#FF4D00] hover:bg-[#FF4D00]/10 rounded transition-colors"
                    >
                      MAX
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Wallet Balance: <span className="font-mono text-gray-300">{asset.walletBalance.toFixed(4)} {asset.name}</span>
                </p>
              </div>

              {/* Health Factor */}
              <div className="glass-card rounded-xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-400 flex items-center gap-2">
                    <SafeIcon name="Shield" size={14} />
                    Health Factor
                  </span>
                  <span className={`font-mono font-bold ${
                    healthFactor > 1.5 ? 'text-green-400' : healthFactor > 1.1 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {healthFactor.toFixed(2)}
                  </span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${
                      healthFactor > 1.5 ? 'bg-green-500' : healthFactor > 1.1 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((healthFactor / 3) * 100, 100)}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {healthFactor > 1.5 ? 'Safe position. Low liquidation risk.' : 'Caution. Monitor your collateral.'}
                </p>
              </div>

              {/* APY Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Supply APY</p>
                  <p className="text-xl font-mono font-bold text-green-400">
                    {asset.supplyAPY.toFixed(2)}%
                  </p>
                </div>
                <div className="glass-card rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Borrow APY</p>
                  <p className="text-xl font-mono font-bold text-orange-400">
                    {asset.borrowAPY.toFixed(2)}%
                  </p>
                </div>
              </div>

              {/* APY Chart */}
              <div>
                <p className="text-sm text-gray-500 mb-3 flex items-center gap-2">
                  <SafeIcon name="BarChart3" size={14} />
                  APY History (30d)
                </p>
                <div className="glass-card rounded-xl p-4">
                  <APYChart data={apyData} color={asset.color} />
                </div>
              </div>

              {/* Risk Info */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                <SafeIcon name="AlertCircle" size={18} className="text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-yellow-500 font-medium mb-1">Collateral Risk</p>
                  <p className="text-xs text-gray-400">
                    {(asset.collateralFactor * 100).toFixed(0)}% of supplied {asset.name} can be used as collateral.
                    Liquidation occurs at 85% loan-to-value ratio.
                  </p>
                </div>
              </div>

              {/* Transaction History */}
              <div>
                <p className="text-sm text-gray-500 mb-3 flex items-center gap-2">
                  <SafeIcon name="History" size={14} />
                  Recent Transactions
                </p>
                <div className="space-y-2">
                  {TRANSACTION_HISTORY.slice(0, 3).map((tx, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          tx.type === 'Supply' || tx.type === 'Repay' ? 'bg-green-500/10 text-green-400' : 'bg-orange-500/10 text-orange-400'
                        }`}>
                          <SafeIcon
                            name={tx.type === 'Supply' || tx.type === 'Repay' ? 'ArrowDownRight' : 'ArrowUpRight'}
                            size={14}
                          />
                        </div>
                        <div>
                          <p className="text-sm text-white">{tx.type}</p>
                          <p className="text-xs text-gray-500">{tx.date}</p>
                        </div>
                      </div>
                      <span className="text-sm font-mono text-gray-300">{tx.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-[#FF4D00] hover:bg-[#FF6D00] text-white font-bold text-lg rounded-xl transition-colors shadow-lg shadow-orange-500/25"
              >
                CONFIRM TRANSACTION
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Liquidity Info Section
const LiquidityInfo = () => {
  const stats = [
    { label: 'Total Liquidity', value: '$58.3M', icon: 'Droplets', color: 'blue' },
    { label: 'Utilization Rate', value: '59.1%', icon: 'Activity', color: 'purple' },
    { label: 'Reserve Factor', value: '15%', icon: 'Shield', color: 'green' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto px-4 md:px-6 py-12"
    >
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <SafeIcon name="Droplets" size={20} className="text-[#FF4D00]" />
        Liquidity Overview
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="glass-card rounded-xl p-6 group hover:border-white/20 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${stat.color}-500/10`}>
                <SafeIcon name={stat.icon} size={20} className={`text-${stat.color}-400`} />
              </div>
              <SafeIcon name="ArrowUpRight" size={16} className="text-gray-600 group-hover:text-[#FF4D00] transition-colors" />
            </div>
            <p className="text-2xl font-mono font-bold text-white mb-1">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

// Main App Component
function App() {
  const [activeView, setActiveView] = useState('market')
  const [selectedAsset, setSelectedAsset] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [expandedRows, setExpandedRows] = useState({})

  const handleAssetClick = (asset) => {
    setSelectedAsset(asset)
    setIsModalOpen(true)
  }

  const toggleRow = (assetId) => {
    setExpandedRows(prev => ({
      ...prev,
      [assetId]: !prev[assetId]
    }))
  }

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 pb-20 safe-bottom">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF4D00]/5 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-[128px]" />
      </div>

      <Header />
      <MarketStatsBar />

      {/* Main Content */}
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <DashboardToggle activeView={activeView} setActiveView={setActiveView} />

            {/* Desktop Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 text-xs font-medium text-gray-500 border-b border-white/10">
              <div className="col-span-3">Asset</div>
              <div className="col-span-2">Net APY</div>
              <div className="col-span-3">Total Supplied</div>
              <div className="col-span-2">Total Borrowed</div>
              <div className="col-span-2">Wallet Balance</div>
            </div>

            {/* Assets List */}
            <div className="space-y-2 md:space-y-0">
              {MARKETS_DATA.map((asset, idx) => (
                <motion.div
                  key={asset.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx, duration: 0.4 }}
                >
                  {/* Desktop Row */}
                  <AssetTableRow
                    asset={asset}
                    onClick={handleAssetClick}
                    isExpanded={expandedRows[asset.id]}
                    onToggle={() => toggleRow(asset.id)}
                  />

                  {/* Mobile Card */}
                  <MobileAssetCard
                    asset={asset}
                    onClick={handleAssetClick}
                    isExpanded={expandedRows[asset.id]}
                    onToggle={() => toggleRow(asset.id)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <LiquidityInfo />

        {/* Info Section */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FF4D00]/10 flex items-center justify-center flex-shrink-0">
                <SafeIcon name="Info" size={24} className="text-[#FF4D00]" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">About Aether Protocol</h4>
                <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">
                  Aether is an institutional-grade lending protocol built for the future of DeFi.
                  Supply assets to earn competitive APY or borrow against your collateral with
                  industry-leading security and liquidity. All smart contracts are audited and
                  insured by leading security firms.
                </p>
                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <SafeIcon name="CheckCircle" size={14} className="text-green-400" />
                    Audited by CertiK
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <SafeIcon name="CheckCircle" size={14} className="text-green-400" />
                    $10M Insurance Coverage
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <SafeIcon name="CheckCircle" size={14} className="text-green-400" />
                    Real-time Risk Monitoring
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Transaction Modal */}
      {isModalOpen && (
        <TransactionModal
          asset={selectedAsset}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}

export default App