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
import { Link, useNavigate } from 'react-router-dom';
import { checkNullTaskData } from '../checkNullTaskData';

const List = () => {
  const [data, setData] = useState<EmployeeType[]>([]);

  useEffect(() => {
    const getEmployeesData = async () => {
      const res = await axiosRepuest.get('/join/leftjoin');
      setData(res.data);
    };

    getEmployeesData();
  }, []);

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'name',
      headerName: 'NAME',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'age',
      headerName: 'AGE',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'country',
      headerName: 'COUNTRY',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'position',
      headerName: 'POSITION',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'wage',
      headerName: 'WAGE',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'taskName',
      headerName: 'TASK',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'hour',
      headerName: 'HOUR',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: '',
      headerName: 'EDIT',
      flex: 1,
      headerAlign: 'center',
      align: 'center',

      renderCell: (params) => {
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
    <div className='list'>
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row.id}
        pageSize={8}
        // checkboxSelection
      />
    </div>
  );
};

export default List;
