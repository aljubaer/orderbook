import useWebSocket from "react-use-websocket";
import { WSS_FEED_URL } from "../../constants";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { updateAsks, updateBids, updateOrderbook } from "./orderbookSlice";
import { Orders } from "./OrderbookTypes";
import BidsTable from "../../components/BidsTable";
import AsksTable from "../../components/AsksTable";

const PRODUCT_IDS = ["PI_ETHUSD", "PI_XBTUSD"];

let currBids: Orders = [];
let currAsks: Orders = [];

export default function OrderBook() {
  const [shouldKill, setShouldKill] = useState<boolean>(false);
  const [toggle, setToggle] = useState<number>(0);

  const dispatch = useAppDispatch();

  const { sendJsonMessage, getWebSocket } = useWebSocket(WSS_FEED_URL, {
    onOpen: () => console.log("WebSocket connection opened."),
    onClose: () => console.log("WebSocket connection closed."),
    shouldReconnect: () => true,
    onMessage: (event: WebSocketEventMap["message"]) => processMessages(event),
  });

  const processMessages = (event: { data: string }) => {
    const response = JSON.parse(event.data);

    if (response.numLevels === 25) {
      dispatch(updateOrderbook(response));
    } else {
        currBids = [...currBids, ...response.bids];
        currAsks = [...currAsks, ...response.asks];
        if (currBids.length > 25) {
            dispatch(updateBids(currBids.slice(0, 25)));
            currBids = [];
        }
        if (currAsks.length > 25) {
            dispatch(updateAsks(currAsks.slice(0, 25)));
            currAsks = [];
        }
    }
  };

  useEffect(() => {
    function connect() {
      const unSubscribeMessage = {
        event: "unsubscribe",
        feed: "book_ui_1",
        product_ids: [PRODUCT_IDS[1 - toggle]],
      };
      sendJsonMessage(unSubscribeMessage);

      const subscribeMessage = {
        event: "subscribe",
        feed: "book_ui_1",
        product_ids: [PRODUCT_IDS[toggle]],
      };
      sendJsonMessage(subscribeMessage);
    }

    if (shouldKill) {
      getWebSocket()?.close();
    } else {
      connect();
    }
  }, [toggle, shouldKill]);

  const handleToggle = () => {
    setToggle((currToggle) => 1 - currToggle);
  };

  const killProcess = () => {
    setShouldKill(!shouldKill);
  }

  return (
    <div className="bg-table-bg text-white p-2">
      <div className="text-left">Order Book</div>
      <div className="Market: ">{PRODUCT_IDS[toggle]}</div>
      <div className="flex flex-wrap w-[800px] border justify-center items-center font-light">
        <BidsTable />
        <AsksTable />
        <div className="flex">
          <div className="bg-blue-700 p-2 mx-2 rounded border-2 border-blue-700 cursor-pointer" onClick={handleToggle}>
            Toggle Feed
          </div>
          <div className="bg-red-700 p-2 mx-2 rounded border-2 border-red-700 cursor-pointer" onClick={killProcess}>
            { shouldKill ? "Start Feed" : "Kill Feed" }
          </div>
        </div>
      </div>
    </div>
  );
}
