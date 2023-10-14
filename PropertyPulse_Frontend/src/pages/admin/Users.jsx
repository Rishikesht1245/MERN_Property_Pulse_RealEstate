import { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { getAllUsers, blockOrUnblockUser } from "../../apiRoutes/adminRoutes";
import Loading from "../../components/subcomponents/Loading";
import toast from "react-hot-toast";

const Users = () => {
  const [users, setUsers] = useState(null);
  const [blocked, setBlocked] = useState(false);

  const handleBlock = async (user) => {
    const action = user.isBlocked ? "unblock" : "block";
    try {
      const { data } = await blockOrUnblockUser(user._id, action);
      setUsers((prev) =>
        prev.map((user) => {
          if (user._id === data.updatedUser._id) return data.updatedUser;
          return user;
        })
      );
      toast.success(data.message, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      console.log("Error in User Actions : ", error);
      toast.error("Something went wrong!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  const columns = [
    {
      name: "SI No",
      selector: (row, index) => index + 1,
    },
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <button
          className={`${
            row.isBlocked ? "bg-green-600" : "bg-red-600"
          } text-white w-full p-2 rounded-lg text-lg font-semibold`}
          onClick={() => handleBlock(row)}
        >
          {row.isBlocked ? "Unblock" : "Block"}
        </button>
      ),
    },
  ];

  const customStyles = {
    rows: {
      style: {
        fontWeight: "semi-bold",
        fontSize: "16px",
        minHeight: "72px", // override the row height
      },
    },
    headCells: {
      style: {
        fontWeight: "bold", // override the cell padding for head cells
        fontSize: "18px",
      },
    },
  };

  createTheme(
    "solarized",
    {
      text: {
        primary: "#100c08",
        secondary: "#2aa198",
      },
      background: {
        default: "#ebebea",
      },
      context: {
        background: "#cb4b16",
        text: "#100c08",
      },
      divider: {
        default: "#073642",
      },
      action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)",
      },
    },
    "dark"
  );

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await getAllUsers();
      setUsers(data);
    };
    getUsers();
  }, []);
  return (
    <div className="flex flex-col gap-6 p-14 px-5 max-w-6xl mx-auto">
      <h1 className="text-xl sm:text-3xl tracking-widest text-center font-bold mb-5 uppercase">
        All Users
      </h1>
      {users !== null ? (
        <DataTable
          theme="solarized"
          columns={columns}
          data={users}
          selectableRows
          fixedHeader
          pagination
          customStyles={customStyles}
        ></DataTable>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default Users;
