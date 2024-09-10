import { useState , useEffect, useRef} from "react"

function Tracker(props){
    const socketEndPoint = 'wss://stream.binance.com:9443/ws/' + props.watch
    const [data, setData] = useState({})
    const [currency, setCurrency] = useState('')
    const [open, setOpen] = useState(0)
    const [close, setClose] = useState(0)
    const [up, setUp] = useState(false)
    
    
    useEffect(() => {
        const socket = new WebSocket(socketEndPoint)
        // Listen for messages


        socket.addEventListener("ping", (e) => {
            socket.send("pong")
        })

        socket.addEventListener("message", (event) => {
            let sdata = JSON.parse(event.data)
            setData(sdata)
            setCurrency(sdata.s)
            setOpen(parseFloat(sdata.o))
            setClose(parseFloat(sdata.c))
            setUp(sdata.o <= sdata.c?true:false)
        })

        return () => socket.close()
      }, [])

    return (
        <>
            {currency
            ?<div className="card">
                <h2>Coin: {currency
                ?currency
                :'Loading...'} {currency
                    ? <span className={up?"green":"red"}>{up? '+':'-'}{
                             (Math.abs(100*(close - open)/open)).toFixed(3)
                        }%
                    </span>
                    :''}</h2>
                <h2>Open: ${open?parseFloat(open).toFixed(3):'Loading...'}</h2>
                <h2>Current: ${close?<span className={up?"green":"red"}>{parseFloat(close).toFixed(3)}</span>:'Loading...'}</h2>
            </div>:''}
        </>
    )
}

export default Tracker