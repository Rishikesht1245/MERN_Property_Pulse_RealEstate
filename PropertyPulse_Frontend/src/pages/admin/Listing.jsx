import { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import {
  getAllListings,
  blockOrUnblockListing,
} from "../../apiRoutes/adminRoutes";
import Loading from "../../components/subcomponents/Loading";
import toast from "react-hot-toast";
import ShowConfirm from "../../components/subcomponents/ShowConfirm";

const Users = () => {
  const [listings, setListings] = useState(null);

  const handleBlock = async (listing) => {
    const action = listing.isBlocked ? "unblock" : "block";
    try {
      const { data } = await blockOrUnblockListing(listing._id, action);
      setListings((prev) =>
        prev.map((listing) => {
          if (listing._id === data.updatedListing._id)
            return data.updatedListing;
          return listing;
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
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.type.toUpperCase(),
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.regularPrice,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <ShowConfirm
          message={`Are you sure to block ${row.name} ?`}
          handleFunction={handleBlock}
          params={row}
        >
          <button
            className={`${
              row.isBlocked ? "bg-green-600" : "bg-red-600"
            } text-white w-[100px] p-2 rounded-lg text-lg font-semibold`}
          >
            {row.isBlocked ? "Unblock" : "Block"}
          </button>
        </ShowConfirm>
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
      const { data } = await getAllListings();
      setListings(data);
    };
    getUsers();
  }, []);
  return (
    <div className="flex flex-col gap-6 p-14 px-5 max-w-6xl mx-auto">
      <h1 className="text-xl sm:text-3xl tracking-widest text-center font-bold mb-5 uppercase">
        All Listings
      </h1>
      {listings !== null ? (
        <DataTable
          theme="solarized"
          columns={columns}
          data={listings}
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
