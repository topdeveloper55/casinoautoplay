import React, { useState, useEffect } from 'react';
// ==============================|| WalletList PAGE ||============================== //
const Dice = () => {
  const [userId, setUserID] = useState('');
  const [amount, setAmount] = useState(0);
  const [upDown, setUpDown] = useState('RollUnder');
  const [buttonColor1, setButtonColor1] = useState('bg-sky-600');
  const [buttonColor2, setButtonColor2] = useState('bg-gray-300');
  const [dividing, setDividingPoint] = useState(0);
  const [playNumber, setPlayNumber] = useState(1);
  const [websocket, setWebsocket] = useState(null);
  function handleChangeUserId(event) {
    setUserID(event.target.value);
  }
  function handleChangeAmount(event) {
    setAmount(event.target.value);
  }
  function handleChangeDividingPoint(event) {
    setDividingPoint(event.target.value);
  }
  function handleChangePlayNumber(event) {
    setPlayNumber(event.target.value);
  }
  function handleChangeUpdown(status) {
    if (status === 'up') {
      setUpDown('RollUnder');
      setButtonColor1('bg-sky-600');
      setButtonColor2('bg-gray-300');
    } else if (status === 'down') {
      setUpDown('RollOver');
      setButtonColor1('bg-gray-300');
      setButtonColor2('bg-sky-600');
    }
  }

  function handlePlay() {
    console.log(userId, amount, upDown, dividing, playNumber);
    const message = {
      clientSeed: userId,
      amount: amount,
      mode: upDown,
      dividingPoint: dividing
    };
    sendMessage(message);
  }
  const sendMessage = (message) => {
    if (websocket && websocket.readyState === WebSocket.OPEN) {
      websocket.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not open or initialized');
    }
  };

  useEffect(() => {
    const ws = new WebSocket('wss://bch.games/api/graphql');

    ws.onopen = () => {
      console.log('connected');
      setWebsocket(ws); // Store the websocket in the state
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Received data:', data);
    };

    // return () => {
    //   if (websocket) {
    //     websocket.close();
    //   }
    // };
  }, []);

  return (
    <div className="w-screen">
      <div className="inline-flex mb-3">
        <div className="flex items-center justify-center mr-[32px]">
          <div className="text-[20px]">UserId</div>
        </div>
        <input
          className="items-center text-sm leading-6 text-black rounded-md ring-1 shadow-sm py-1.5 pl-2 pr-3 hover:ring-white bg-gray-300 dark:highlight-white/5 dark:hover:bg-gray-100"
          onChange={handleChangeUserId}
        ></input>
      </div>

      <div className="inline-flex w-full mb-5">
        <div className="flex items-center mr-[20px]">
          <div className="text-[20px]">Amount</div>
        </div>
        <input
          className="items-center text-sm leading-6 text-black rounded-md ring-1 shadow-sm py-1.5 pl-2 pr-3 hover:ring-white bg-gray-300 dark:highlight-white/5 dark:hover:bg-gray-100"
          onChange={handleChangeAmount}
        ></input>
      </div>

      <div className="inline-flex w-full mb-5">
        <button
          className={`rounded-full ${buttonColor1} hover:bg-gray-500 ml-3`}
          onClick={() => {
            handleChangeUpdown('up');
          }}
        >
          <div className="mx-[20px]">UP</div>
        </button>
        <button
          className={`rounded-full ${buttonColor2} hover:bg-gray-500 ml-3`}
          onClick={() => {
            handleChangeUpdown('down');
          }}
        >
          <div className="mx-[20px]">Down</div>
        </button>
      </div>

      <div className="inline-flex w-full mb-5">
        <div className="flex items-center mr-[28px]">
          <div className="text-[20px]">Play Number</div>
        </div>
        <input
          className="items-center text-sm leading-6 text-black rounded-md ring-1 shadow-sm py-1.5 pl-2 pr-3 hover:ring-white bg-gray-300 dark:highlight-white/5 dark:hover:bg-gray-100"
          onChange={handleChangePlayNumber}
        ></input>
      </div>

      <div className="inline-flex w-full mb-5">
        <div className="flex items-center mr-[20px]">
          <div className="text-[20px]">Dividing Point</div>
        </div>
        <input
          className="items-center text-sm leading-6 text-black rounded-md ring-1 shadow-sm py-1.5 pl-2 pr-3 hover:ring-white bg-gray-300 dark:highlight-white/5 dark:hover:bg-gray-100"
          onChange={handleChangeDividingPoint}
        ></input>
        <button
          className={`rounded-full bg-gray-300 hover:bg-gray-500 ml-3`}
          onClick={() => {
            handlePlay();
          }}
        >
          <div className="mx-[20px]">Play</div>
        </button>
      </div>

      {/* <div className="table text-[15px] w-full">
        {filtered.length != 0 && (
          <div className="table-header-group">
            <div className="table-row">
              <div className="table-cell text-left">No</div>
              <div className="table-cell text-left">Address</div>
            </div>
          </div>
        )}

        <div className="table-row-group">
          {filtered.map((item, index) => (
            <div className="table-row" key={index}>
              <div className="table-cell">{index + 1}</div>
              <div className="table-cell">{item.walletAddress}</div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Dice;
