import useWebSocket from "react-use-websocket";
import { WSS_FEED_URL } from "../../constants";
import { useEffect, useState } from "react";

type Bids = number[][];
type Asks = number[][];

type Delta = {
    bids: Bids;
    asks: Asks;
}


let currentBids: Bids = []
let currentAsks: Asks = []

export default function OrderBook() {

    const [response, setResponse] = useState("Loading");

    const { sendJsonMessage, getWebSocket } = useWebSocket(WSS_FEED_URL, {
        onOpen: () => console.log('WebSocket connection opened.'),
        onClose: () => console.log('WebSocket connection closed.'),
        shouldReconnect: (closeEvent) => true,
        onMessage: (event: WebSocketEventMap['message']) => processMessages(event)
    })

    const processMessages = (event: { data: string; }) => {
        const _response = JSON.parse(event.data);

        setResponse(_response);

        if (_response.numLevels) {
            //   dispatch(addExistingState(response));
            console.log(response);
        } else {
            //   process(response);
            // console.log(response);
        }
    };

    const process = (data: Delta) => {
        if (data?.bids?.length > 0) {
            currentBids = [...currentBids, ...data.bids];

            if (currentBids.length > 25) {
                // dispatch(addBids(currentBids));
                currentBids = [];
                currentBids.length = 0;
            }
        }
        if (data?.asks?.length >= 0) {
            currentAsks = [...currentAsks, ...data.asks];

            if (currentAsks.length > 25) {
                // dispatch(addAsks(currentAsks));
                currentAsks = [];
                currentAsks.length = 0;
            }
        }
    };

    //   'PI_XBTUSD'

    useEffect(() => {
        function connect(product: string) {
            const unSubscribeMessage = {
                event: 'unsubscribe',
                feed: 'book_ui_1',
                product_ids: ['PI_XBTUSD']
            };
            // sendJsonMessage(unSubscribeMessage);

            const subscribeMessage = {
                event: 'subscribe',
                feed: 'book_ui_1',
                product_ids: ['PI_XBTUSD']
            };
            sendJsonMessage(subscribeMessage);
        }

        connect('PI_XBTUSD');

        //   if (isFeedKilled) {
        //     getWebSocket()?.close();
        //   } else {
        //     connect(productId);
        //   }
    });

    return (

        <div className="flex w-[800px] border bg-table-bg text-white justify-center items-center">

            <table className="border-none w-1/2">
                <thead>
                    <tr>
                        <th className="border-none">Total</th>
                        <th className="border-none">Size</th>
                        <th className="border-none">Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="">Indiana</td>
                        <td className="border border-slate-300 ...">Indianapolis</td>
                    </tr>
                    <tr>
                        <td className="border border-slate-300 ...">Ohio</td>
                        <td className="border border-slate-300 ...">Columbus</td>
                    </tr>
                    <tr>
                        <td className="border border-slate-300 ...">Michigan</td>
                        <td className="border border-slate-300 ...">Detroit</td>
                    </tr>
                </tbody>
            </table>
            <table className="border-none w-1/2">
                <thead>
                    <tr>
                        <th className="border-none">Total</th>
                        <th className="border-none">Size</th>
                        <th className="border-none">Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-slate-300 ...">Indiana</td>
                        <td className="border border-slate-300 ...">Indianapolis</td>
                    </tr>
                    <tr>
                        <td className="border border-slate-300 ...">Ohio</td>
                        <td className="border border-slate-300 ...">Columbus</td>
                    </tr>
                    <tr>
                        <td className="border border-slate-300 ...">Michigan</td>
                        <td className="border border-slate-300 ...">Detroit</td>
                    </tr>
                </tbody>
            </table>

        </div>);
}