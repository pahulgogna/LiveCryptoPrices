import './App.css'
import Tracker from './components/PriceTracker'


function App() {
  let streams = ["btcusdt@miniTicker", "ethusdt@miniTicker", "bnbusdt@miniTicker", "solusdt@miniTicker"]
  return (
    <>
      <h1>Live Crypto Prices</h1>
      {streams.map((stream, index) => {
        return <Tracker watch={stream} key={index}/>
      })}
    </>
  )
}

export default App
