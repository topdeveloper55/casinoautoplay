import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Mines = () => {
  const [userId, setUserID] = useState('');
  const [amount, setAmount] = useState(0);
  const [mines, setMines] = useState(0);
  const [playNumber, setPlayNumber] = useState(1);
  const [userToken, setUserToken] = useState('');
  const socketRef = useRef(null);
  const [playData, setPlayData] = useState([]);
  let playId = '';
  let randomPlay = [];
  let miningCounter = 0;
  let username = '';
  let playCounter = 0;
  let counter = 0;
  function handleChangeUserId(event) {
    setUserID(event.target.value);
  }
  function handleChangeAmount(event) {
    setAmount(event.target.value);
  }
  function handleChangeMines(event) {
    setMines(event.target.value);
  }
  function handleChangePlayNumber(event) {
    setPlayNumber(parseInt(event.target.value));
  }
  const getRandomArray = () => {
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    function generateRandomNumbers(min, max, count) {
      const numbers = Array.from({ length: max - min + 1 }, (_, i) => i + min);
      const shuffled = shuffleArray(numbers);
      return shuffled.slice(0, count);
    }

    const randomNumbers = generateRandomNumbers(0, 24, 25);
    return randomNumbers;
  };
  const handlePlay = async () => {
    if (userId === '') {
      toast('Please input UserID', { hideProgressBar: false, autoClose: 2000, type: 'error' });
    } else if (amount === 0) {
      toast('Please input Amount', { hideProgressBar: false, autoClose: 2000, type: 'error' });
    } else if (mines === 0) {
      toast('Please input Dividing', { hideProgressBar: false, autoClose: 2000, type: 'error' });
    } else if (userToken === '') {
      toast('Please input userToken', { hideProgressBar: false, autoClose: 2000, type: 'error' });
    } else {
      counter = 0;
      if (socketRef.current) {
        setTimeout(() => {
          socketRef.current.send(
            JSON.stringify({
              id: '0d7d8090-9791-11ee-b9d1-0242ac120002',
              payload: {
                query:
                  '{\n  authenticate(\n    authToken: \n"' +
                  userToken +
                  '"\n  ) {\n    _id\n    username\n    authToken\n    email\n    twoFactorEnabled\n    role\n    countryBlock\n    __typename\n  }\n}',
                variables: {}
              },
              type: 'subscribe'
            })
          );
        }, 1000);

        setTimeout(() => {
          socketRef.current.send(
            JSON.stringify({
              id: '3f2c35f1-dad2-4651-aac8-89f2fe69cc45',
              payload: {
                query:
                  'mutation ($amount: Float!, $autoCashout: Boolean, $clientSeed: String!, $mines: Int!, $tilesToUncover: [Int!]) {\n  playMines(\n    amount: $amount\n    autoCashout: $autoCashout\n    clientSeed: $clientSeed\n    mines: $mines\n    tilesToUncover: $tilesToUncover\n  ) {\n    __typename\n    ... on SinglePlayerGameBet {\n      id\n      isWin\n      multiplier\n      profit\n      amount\n      details {\n        ... on MinesGameDetails {\n          __typename\n          mines\n          uncovered\n          minesCount\n        }\n        ... on TowerGameDetails {\n          __typename\n        }\n        ... on DiceGameDetails {\n          __typename\n        }\n        ... on TargetGameDetails {\n          __typename\n        }\n        ... on HiloGameDetails {\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    ... on SinglePlayerGameBetInProgress {\n      _id\n      amount\n      details {\n        ... on MinesGameDetails {\n          __typename\n          mines\n          uncovered\n          minesCount\n        }\n        ... on TowerGameDetails {\n          __typename\n        }\n        ... on DiceGameDetails {\n          __typename\n        }\n        ... on TargetGameDetails {\n          __typename\n        }\n        ... on HiloGameDetails {\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n  }\n}',
                variables: { mines: parseInt(mines), amount: parseInt(amount), clientSeed: userId }
              },
              type: 'subscribe'
            })
          );
        }, 2000);
      }
    }
  };

  function handleChangeUserToken(event) {
    setUserToken(event.target.value);
  }

  const autoPlay = (data) => {
    console.log('random----->', data.random);
    console.log('miningCounter---->', miningCounter);
    console.log('playid---->', data.playId);
    socketRef.current.send(
      JSON.stringify({
        id: '08ed3549-b044-438f-99c6-acd355d070f1',
        payload: {
          query:
            'mutation ($_id: ID!, $tilesToUncover: [Int!]!) {\n  minesUncoverTiles(_id: $_id, tilesToUncover: $tilesToUncover) {\n    __typename\n    ... on SinglePlayerGameBet {\n      id\n      isWin\n      multiplier\n      profit\n      amount\n      details {\n        ... on MinesGameDetails {\n          __typename\n          mines\n          uncovered\n          minesCount\n        }\n        ... on TowerGameDetails {\n          __typename\n        }\n        ... on DiceGameDetails {\n          __typename\n        }\n        ... on TargetGameDetails {\n          __typename\n        }\n        ... on HiloGameDetails {\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    ... on SinglePlayerGameBetInProgress {\n      _id\n      amount\n      details {\n        ... on MinesGameDetails {\n          __typename\n          mines\n          uncovered\n          minesCount\n        }\n        ... on TowerGameDetails {\n          __typename\n        }\n        ... on DiceGameDetails {\n          __typename\n        }\n        ... on TargetGameDetails {\n          __typename\n        }\n        ... on HiloGameDetails {\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n  }\n}',
          variables: { tilesToUncover: [parseInt(data.random[miningCounter])], _id: data.playId }
        },
        type: 'subscribe'
      })
    );
  };
  const getString = (array) => {
    let string = '';
    for (let i = 0; i < array.length; i++) {
      string = string + array[i] + ',';
    }
    return string;
  };

  useEffect(() => {
    socketRef.current = new WebSocket('wss://bch.games/api/graphql', 'graphql-transport-ws');

    socketRef.current.onopen = () => {
      // Once the WebSocket connection is open, you can send your GraphQL request
      socketRef.current.send(JSON.stringify({ type: 'connection_init' }));
    };

    socketRef.current.onmessage = (event) => {
      // Handle incoming messages from the WebSocket server
      const response = JSON.parse(event.data);
      if (response.id === '0d7d8090-9791-11ee-b9d1-0242ac120002' && response.payload) {
        username = response.payload.data.authenticate.username;
      } else if (response.id === '3f2c35f1-dad2-4651-aac8-89f2fe69cc45' && response.payload) {
        if (response.payload.errors && response.payload.errors[0].message === 'INSUFFICIENT_FUNDS_ERROR')
          toast('Not enough BCH', { hideProgressBar: false, autoClose: 2000, type: 'error' });
        else if (response.payload.data.playMines) {
          playId = response.payload.data.playMines._id;
          const random = getRandomArray();
          randomPlay = random;
          autoPlay({ random: random, playId: response.payload.data.playMines._id });
        }
      } else if (response.id === '08ed3549-b044-438f-99c6-acd355d070f1') {
        console.log('------>', response);
        if (response.payload) {
          if (response.payload.data.minesUncoverTiles.details.mines === null) {
            miningCounter++;
            autoPlay({ random: randomPlay, playId: playId });
          } else if (response.payload.data.minesUncoverTiles.details.mines !== null) {
            playCounter++;
            setPlayData((prevPlayData) => [...prevPlayData, { username: username, data: response.payload.data.minesUncoverTiles }]);
            console.log('array---->', response.payload.data.minesUncoverTiles.details.uncovered);
            console.log('array---->', response.payload.data.minesUncoverTiles.details.mines);
          }
        }
        // if (response.payload) {
        //   if (response.payload.data.minesUncoverTiles.multiplier) {
        //     console.log('response.payload.data.minesUncoverTiles------->', response);
        //     setPlayData((prevPlayData) => [...prevPlayData, { username: username, data: response.payload.data.minesUncoverTiles }]);
        //   }
        // }
      } else {
      }
    };
    console.log('random---->', randomPlay, 'playid---->', playId);
    return () => {
      // Clean up the WebSocket connection when the component is unmounted
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);
  useEffect(() => {
    if (counter <= playNumber && playCounter !==0) {
      console.log("playcounter---->", playCounter)
      counter++;
      miningCounter = 0;
      socketRef.current.send(
        JSON.stringify({
          id: '3f2c35f1-dad2-4651-aac8-89f2fe69cc45',
          payload: {
            query:
              'mutation ($amount: Float!, $autoCashout: Boolean, $clientSeed: String!, $mines: Int!, $tilesToUncover: [Int!]) {\n  playMines(\n    amount: $amount\n    autoCashout: $autoCashout\n    clientSeed: $clientSeed\n    mines: $mines\n    tilesToUncover: $tilesToUncover\n  ) {\n    __typename\n    ... on SinglePlayerGameBet {\n      id\n      isWin\n      multiplier\n      profit\n      amount\n      details {\n        ... on MinesGameDetails {\n          __typename\n          mines\n          uncovered\n          minesCount\n        }\n        ... on TowerGameDetails {\n          __typename\n        }\n        ... on DiceGameDetails {\n          __typename\n        }\n        ... on TargetGameDetails {\n          __typename\n        }\n        ... on HiloGameDetails {\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    ... on SinglePlayerGameBetInProgress {\n      _id\n      amount\n      details {\n        ... on MinesGameDetails {\n          __typename\n          mines\n          uncovered\n          minesCount\n        }\n        ... on TowerGameDetails {\n          __typename\n        }\n        ... on DiceGameDetails {\n          __typename\n        }\n        ... on TargetGameDetails {\n          __typename\n        }\n        ... on HiloGameDetails {\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n  }\n}',
            variables: { mines: parseInt(mines), amount: parseInt(amount), clientSeed: userId }
          },
          type: 'subscribe'
        })
      );
    }
  }, [playCounter]);

  return (
    <div className="w-screen">
      <div className="inline-flex mb-3">
        <div className="flex items-center justify-center mr-[70px]">
          <div className="text-[20px]">UserId</div>
        </div>
        <input
          className="items-center text-sm leading-6 text-black rounded-md ring-1 shadow-sm py-1.5 pl-2 pr-3 hover:ring-white bg-gray-300 dark:highlight-white/5 dark:hover:bg-gray-100"
          onChange={handleChangeUserId}
        ></input>
      </div>

      <div className="inline-flex w-full mb-3">
        <div className="flex items-center justify-center mr-[32px]">
          <div className="text-[20px]">UserToken</div>
        </div>
        <input
          className="items-center text-sm leading-6 text-black rounded-md ring-1 shadow-sm py-1.5 pl-2 pr-3 hover:ring-white bg-gray-300 dark:highlight-white/5 dark:hover:bg-gray-100"
          onChange={handleChangeUserToken}
        ></input>
      </div>

      <div className="inline-flex w-full mb-5">
        <div className="flex items-center mr-[58px]">
          <div className="text-[20px]">Amount</div>
        </div>
        <input
          className="items-center text-sm leading-6 text-black rounded-md ring-1 shadow-sm py-1.5 pl-2 pr-3 hover:ring-white bg-gray-300 dark:highlight-white/5 dark:hover:bg-gray-100"
          onChange={handleChangeAmount}
        ></input>
      </div>

      <div className="inline-flex w-full mb-5">
        <div className="flex items-center mr-[11px]">
          <div className="text-[20px]">Play Number</div>
        </div>
        <input
          className="items-center text-sm leading-6 text-black rounded-md ring-1 shadow-sm py-1.5 pl-2 pr-3 hover:ring-white bg-gray-300 dark:highlight-white/5 dark:hover:bg-gray-100"
          onChange={handleChangePlayNumber}
        ></input>
      </div>

      <div className="inline-flex w-full mb-5">
        <div className="flex items-center mr-[20px]">
          <div className="text-[20px]">Mines</div>
        </div>
        <input
          className="items-center text-sm leading-6 text-black rounded-md ring-1 shadow-sm py-1.5 pl-2 pr-3 hover:ring-white bg-gray-300 dark:highlight-white/5 dark:hover:bg-gray-100"
          onChange={handleChangeMines}
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
      {playData.length != 0 ? (
        <>
          <div className="table text-[15px] w-full">
            <div className="table-header-group">
              <div className="table-row">
                <div className="table-cell text-left">No</div>
                <div className="table-cell text-left">User</div>
                <div className="table-cell text-left">Profit</div>
                <div className="table-cell text-left">Mines</div>
                <div className="table-cell text-left">Uncovered</div>
                <div className="table-cell text-left">Multiplier</div>
                <div className="table-cell text-left">Id</div>
              </div>
            </div>

            <div className="table-row-group">
              {playData.map((item, index) => (
                <div className="table-row" key={index}>
                  <div className="table-cell">{index + 1}</div>
                  <div className="table-cell">{item.username}</div>
                  <div className="table-cell">{item.data.profit}</div>
                  <div className="table-cell">
                    <div>{getString(item.data.details.mines)}</div>
                  </div>
                  <div className="table-cell">
                    <div>{getString(item.data.details.uncovered)}</div>
                  </div>
                  <div className="table-cell">{item.data.multiplier}</div>
                  <div className="table-cell">{item.data.id}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : null}

      <ToastContainer />
    </div>
  );
};

export default Mines;
