import { PeopleOutline } from "@mui/icons-material";
import { NextPage } from "next";
import { AdminLayout } from "../../components/layouts";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Grid, MenuItem, Select } from "@mui/material";
import useSWR from "swr";
import { IUser } from "../../interface";
import { shopApi } from "../../api";
import { useState, useEffect } from "react";


const UsersPage: NextPage = () => {
  const { data, error } = useSWR<IUser[]>("/api/admin/user");
  const [users, setUsers] =useState<IUser[]>([]);

  
  useEffect(() => {
    if(data){
        setUsers(data);
    }
  }, [data])
  


  if (!data && !error) return <></>;

  const onRoleUpdated = async (userId: string, newRole: string) => {

    const previosUsers = users.map(user => ({...user}));
     const updatedUsers = users.map(user =>({
            ...user,
            role: userId === user._id ? newRole : user.role,
     }));

     setUsers(updatedUsers);

    try {
      await shopApi.put("/admin/user", { userId, role: newRole });
    } catch (error) {
        setUsers(previosUsers);
        console.log(error);
        alert('nose pudo actualizar el role');
    }
  };

  const columns: GridColDef[] = [
    { field: "email", headerName: "Correo", width: 250 },
    { field: "name", headerName: "Nombre", width: 250 },
    {
      field: "role",
      headerName: "Role",
      width: 250,
      renderCell: ({ row }: GridValueGetterParams) => {
        return (
          <Select
            value={row.role}
            label="Rol"
            sx={{ width: 300 }}
            onChange={({ target }) => onRoleUpdated(row.id, target.value)}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="client">Client</MenuItem>
          </Select>
        );
      },
    },
  ];

  const rows = users.map((user) => ({
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  }));

  return (
    <AdminLayout
      title={"Usuarios"}
      subTitle={"Mantenimiento de usuarios"}
      icon={<PeopleOutline />}
    >
      <Grid container className="fadeIn" display="flex" justifyContent="center">
        <Grid
          item
          xs={12}
          sx={{
            height: 650,
            width: "100%",
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default UsersPage;
