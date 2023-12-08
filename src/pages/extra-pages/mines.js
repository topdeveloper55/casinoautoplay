import React, { useEffect, useState } from 'react';
import axios from 'utils/axios';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// ==============================|| AgreeRequestPage PAGE ||============================== //
const AgreeRequestList = () => {
  const [data, setData] = useState([]);
  const [push, setPush] = useState(0);

  const handleAgreeUser = async (item) => {
    const response = await axios.post('https://mariusjourney-server.onrender.com/api/wallet/agreeUser', {
      id: item.id,
      walletAddress: item.walletAddress
    });
    toast(response.data.message, { hideProgressBar: false, autoClose: 2000, type: 'success' });
    setPush(push + 1);
  };

  useEffect(() => {
    axios
      .get('https://mariusjourney-server.onrender.com/api/wallet/requestList')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [push]);

  return (
    <div className="w-full overflow-hidden">
      <div className="table w-full text-[15px]">
        {data.length != 0 && (
          <div className="table-header-group">
            <div className="table-row">
              <div className="table-cell text-center">No</div>
              <div className="table-cell text-center">Address</div>
              <div className="table-cell text-center">Date</div>
              <div className="table-cell text-center">Nickname</div>
              <div className="table-cell text-center">Delete</div>
            </div>
          </div>
        )}

        <div className="table-row-group">
          {data.map((item, index) => (
            <div className="table-row" key={index}>
              <div className="table-cell text-center">{index + 1}</div>
              <div className="table-cell text-center">{item.walletAddress}</div>
              <div className="table-cell text-center">{item.createdAt}</div>
              <div className="table-cell text-center">{item.nickName}</div>
              <div className="table-cell text-center p-2 mb-1">
                <button
                  className="rounded-lg bg-gray-500 p-1"
                  onClick={() => {
                    handleAgreeUser(item);
                  }}
                >
                  Agree
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AgreeRequestList;
