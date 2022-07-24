import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EmployeeType } from '../App';
import axiosRepuest from '../config';
import './EmployeesInfo.css';

const EmployeesInfo = () => {
  const [infoData, setInfoData] = useState<EmployeeType>();
  const { id } = useParams();

  useEffect(() => {
    const getInfoData = async () => {
      const res = await axiosRepuest.get(`/join/leftjoin/${id}`);
      setInfoData(res.data[0]);
    };

    getInfoData();
  }, [id]);

  return (
    <div className='employeesInfo'>
      <div className='wrapper'>
        <p>
          <span>id</span> <input type='text' defaultValue={infoData?.id} />
        </p>
        <p>
          <span>name</span> <input type='text' defaultValue={infoData?.name} />
        </p>
        <p>
          <span>age</span> <input type='number' defaultValue={infoData?.age} />
        </p>
        <p>
          <span>position</span>
          <input type='text' defaultValue={infoData?.position} />
        </p>
        <p>
          <span>country</span>
          <input type='text' defaultValue={infoData?.country} />
        </p>
        <p>
          <span>taskName</span>
          <input type='text' defaultValue={infoData?.taskName} />
        </p>
        <p>
          <span>hour</span>
          <input type='number' defaultValue={infoData?.hour} />
        </p>
        <p>
          <span>wage</span>
          <input type='number' defaultValue={infoData?.wage} />
        </p>
        <button>Update</button>
      </div>
    </div>
  );
};

export default EmployeesInfo;
