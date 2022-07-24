import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EmployeeType } from '../App';
import axiosRepuest from '../config';
import './EmployeesInfo.css';

type EmployTableType = {
  id?: string;
  name?: string;
  age?: number;
  country?: string;
  position?: string;
  wage?: number;
};

type TasksTableType = {
  taskName?: string;
  hour?: number;
  wage?: number;
  userId?: string;
};

const EmployeesInfo = () => {
  const [infoData, setInfoData] = useState<EmployeeType>();
  const [newEmployInfoData, setNewEmployInfoData] = useState<EmployTableType>();
  const [newTaskInfoData, setNewTaskInfoData] = useState<TasksTableType>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getInfoData = async () => {
      const res = await axiosRepuest.get(`/join/leftjoin/${id}`);
      setInfoData(res.data[0]);
    };

    getInfoData();
  }, [id]);

  const handleUpdate = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      newEmployInfoData !== undefined &&
        (await axiosRepuest.put('/employees/update', newEmployInfoData));
      newTaskInfoData !== undefined &&
        (await axiosRepuest.put('/tasks/update', newTaskInfoData));
      window.alert('update success!!');
      navigate('/list');
    } catch (error) {
      window.alert(error);
    }
  };

  const onEmployUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmployInfoData({
      ...newEmployInfoData,
      id: infoData?.id,
      [e.target.name]:
        e.target.value === ''
          ? // @ts-ignore
            infoData[e.target.name]
          : e.target.type === 'number'
          ? (parseInt(e.target.value) as unknown as number)
          : (e.target.value as string),
    });
  };

  const onTaskUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskInfoData({
      ...newTaskInfoData,
      userId: infoData?.id,
      [e.target.name]:
        e.target.value === ''
          ? // @ts-ignore
            infoData[e.target.name]
          : e.target.type === 'number'
          ? (parseInt(e.target.value) as unknown as number)
          : (e.target.value as string),
    });
  };

  return (
    <div className='employeesInfo'>
      <div className='wrapper'>
        <p>
          <span>name</span>{' '}
          <input
            type='text'
            name='name'
            onChange={onEmployUpdate}
            defaultValue={infoData?.name}
          />
        </p>
        <p>
          <span>age</span>{' '}
          <input
            type='number'
            name='age'
            onChange={onEmployUpdate}
            defaultValue={infoData?.age}
          />
        </p>
        <p>
          <span>position</span>
          <input
            type='text'
            name='position'
            onChange={onEmployUpdate}
            defaultValue={infoData?.position}
          />
        </p>
        <p>
          <span>country</span>
          <input
            type='text'
            name='country'
            onChange={onEmployUpdate}
            defaultValue={infoData?.country}
          />
        </p>
        <p>
          <span>taskName</span>
          <input
            type='text'
            name='taskName'
            onChange={onTaskUpdate}
            defaultValue={infoData?.taskName}
          />
        </p>
        <p>
          <span>hour</span>
          <input
            type='number'
            name='hour'
            onChange={onTaskUpdate}
            defaultValue={infoData?.hour}
          />
        </p>
        <p>
          <span>wage</span>
          <input
            type='number'
            name='wage'
            onChange={onEmployUpdate}
            defaultValue={infoData?.wage}
          />
        </p>
        <button onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
};

export default EmployeesInfo;
