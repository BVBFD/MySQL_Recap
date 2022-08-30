import React, { FormEvent, useEffect, useState } from 'react';
import './List.css';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import { EmployeeType } from '../App';
import axiosRepuest from '../config';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { checkNullTaskData } from '../checkNullTaskData';
import { CircularProgress } from '@mui/material';

const List = () => {
  const [data, setData] = useState<EmployeeType[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    setIsFetching(true);
    const getEmployeesData = async () => {
      const res = await axiosRepuest.get('/join/leftjoin');
      setData(res.data);
      setIsFetching(false);
    };

    getEmployeesData();

    return () => {
      setIsFetching(false);
    };
  }, []);

  const bodyWidth = document.querySelector('body')?.clientWidth;

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      headerClassName: 'tableId',
      cellClassName: 'tableId',
      width:
        (bodyWidth as number) <= 600
          ? (bodyWidth as number) / 2
          : (bodyWidth as number) / 8,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'name',
      headerName: 'NAME',
      headerClassName: 'tableName',
      cellClassName: 'tableName',
      width:
        (bodyWidth as number) <= 600
          ? (bodyWidth as number) / 2
          : (bodyWidth as number) / 8,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'age',
      headerName: 'AGE',
      headerClassName: 'tableAge',
      cellClassName: 'tableAge',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'country',
      headerName: 'COUNTRY',
      headerClassName: 'tableCountry',
      cellClassName: 'tableCountry',
      width:
        (bodyWidth as number) <= 600
          ? (bodyWidth as number) / 2
          : (bodyWidth as number) / 8,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'position',
      headerName: 'POSITION',
      headerClassName: 'tablePosition',
      cellClassName: 'tablePosition',
      width:
        (bodyWidth as number) <= 600
          ? (bodyWidth as number) / 2
          : (bodyWidth as number) / 8,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'wage',
      headerName: 'WAGE',
      headerClassName: 'tableWage',
      cellClassName: 'tableWage',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'taskName',
      headerName: 'TASK',
      headerClassName: 'tableTask',
      cellClassName: 'tableTask',
      width:
        (bodyWidth as number) <= 600
          ? (bodyWidth as number) / 2
          : (bodyWidth as number) / 8,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'hour',
      headerName: 'HOUR',
      headerClassName: 'tableHour',
      cellClassName: 'tableHour',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: '',
      headerName: 'EDIT',
      headerClassName: 'tableEdit',
      cellClassName: 'tableEdit',
      width:
        (bodyWidth as number) <= 600
          ? (bodyWidth as number) / 2
          : (bodyWidth as number) / 8,
      headerAlign: 'center',
      align: 'center',

      renderCell: (params: GridRenderCellParams<any, any, any>) => {
        return (
          <div>
            <Link to={`/employees/${params.row.id}`}>
              <EditOutlined className='edit' />
            </Link>
            <DeleteOutline
              className='delete'
              onClick={() => handleDelete(params)}
            />
          </div>
        );
      },
    },
  ];

  const handleDelete = async (params: GridRenderCellParams<any, any, any>) => {
    if (!checkNullTaskData(params.row)) {
      try {
        await axiosRepuest.delete(`/employees/delete/${params.row.id}`);
        setData(data.filter((d) => d.id !== params.row.id));
      } catch (error) {
        window.alert(error);
      }
    } else {
      try {
        (await axiosRepuest.delete(`/tasks/delete/${params.row.taskId}`)) &&
          (await axiosRepuest.delete(`/employees/delete/${params.row.id}`));
        setData(data.filter((d) => d.id !== params.row.id));
      } catch (error) {
        window.alert(error);
      }
    }
  };

  return (
    <>
      {!isFetching ? (
        <div className='list'>
          <DataGrid
            rows={data}
            columns={columns}
            getRowId={(row) => row.id}
            pageSize={8}
            // checkboxSelection
          />
        </div>
      ) : (
        <div className='progressBox'>
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default List;
