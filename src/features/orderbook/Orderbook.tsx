import useWebSocket from "react-use-websocket";
import { WSS_FEED_URL } from "../../constants";
import { useEffect, useState } from "react";


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
            console.log(response);
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

    return <>

    </>
}