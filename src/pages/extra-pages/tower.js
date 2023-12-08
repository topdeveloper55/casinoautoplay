import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { TextField } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
// ==============================|| WalletList PAGE ||============================== //
const AirdopPage = () => {
  const [randomCode, setRandomCode] = useState('');
  const [tokenNum, setTokenNum] = useState('');
  const [userNum, setUserNum] = useState('');
  const [comunity, setComunityName] = useState('');
  const generateCode = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 30; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setRandomCode(result);
  };
  const [deadline, setDeadLine] = useState('');
  const handleDeadLine = async (newValue) => {
    setDeadLine(newValue.target.value);
    console.log(deadline);
  };
  const createCode = () => {
    console.log(tokenNum, userNum, comunity, randomCode, deadline);
  };

  return (
    <div className="w-screen">
      <div className="text-[23px] mb-3">Create code</div>
      <div className="inline-flex w-full mb-3">
        <div className="flex items-center mr-[20px]">
          <div className="text-[20px]">Token number available for purchase</div>
        </div>
        <input
          className="items-center text-sm leading-6 text-slate-400 rounded-md ring-1 shadow-sm py-1.5 pl-2 pr-3 hover:ring-white bg-gray-300 dark:highlight-white/5 dark:hover:bg-gray-100"
          onChange={(event) => {
            setTokenNum(event.target.value);
          }}
        ></input>
      </div>
      <div className="inline-flex w-full mb-3">
        <div className="flex items-center mr-[20px]">
          <div className="text-[20px]">Users number available for purchase</div>
        </div>
        <input
          className="items-center text-sm leading-6 text-slate-400 rounded-md ring-1 shadow-sm py-1.5 pl-2 pr-3 hover:ring-white bg-gray-300 dark:highlight-white/5 dark:hover:bg-gray-100"
          onChange={(event) => {
            setUserNum(event.target.value);
          }}
        ></input>
      </div>
      <div className="inline-flex w-full mb-3">
        <div className="flex items-center mr-[210px]">
          <div className="text-[20px]">Comunity Name</div>
        </div>
        <input
          className="items-center text-sm leading-6 text-slate-400 rounded-md ring-1 shadow-sm py-1.5 pl-2 pr-3 hover:ring-white bg-gray-300 dark:highlight-white/5 dark:hover:bg-gray-100"
          onChange={(event) => {
            setComunityName(event.target.value);
          }}
        ></input>
      </div>
      <div className="inline-flex w-full mb-[30px]">
        <input
          disabled={true}
          value={randomCode}
          className="items-center w-[346px] text-sm leading-6 text-black rounded-md ring-1 shadow-sm py-1.5 pl-2 pr-3 hover:text-black bg-gray-300 dark:highlight-white/5 dark:hover:bg-gray-100"
        ></input>
        <button className="rounded-full bg-gray-300 hover:bg-gray-500 ml-[30px]" onClick={generateCode}>
          <div className="mx-[20px]">Generate Code</div>
        </button>
      </div>
      <div className="inline-flex w-full mb-3">
        <div className="flex items-center mr-[20px]">
          <div className="text-[20px]">Deadline</div>
        </div>
        <TextField
          id="datetime-local"
          placeholder="Next Appointment"
          type="datetime-local"
          defaultValue="2023-09-02T00:00"
          sx={{ width: 250 }}
          InputLabelProps={{
            shrink: true
          }}
          onChange={(newValue) => handleDeadLine(newValue)}
        />
        <button className="rounded-full bg-gray-300 hover:bg-gray-500 ml-[30px]" onClick={createCode}>
          <div className="mx-[20px]">Create Code</div>
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AirdopPage;
