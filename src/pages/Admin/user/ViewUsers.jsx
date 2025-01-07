import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import SpinnerTailwind from "../../../components/spinner/SpinnerTailwind";

const ViewUsers = () => {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(false);
  console.log(users);
  useEffect(() => {
    const socket = io("http://localhost:3500/admin", {
      transports: ["websocket"],
    });
    socket.on("connection", () => {
      console.log("connected");
    });
    socket.on("allUser", (data) => {
      setLoading(true);
      console.log("fromalluser", data);
      setUsers(data);
      setLoading(false);
    });

    socket.on("userStatusChanged", (userStatus) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userStatus.userId
            ? { ...user, isOnline: userStatus.isOnline }
            : user
        )
      );
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="px-6 h-5/6 relative">
      {/* <SerchNav handleSearch={handleSearch} nav="songs" /> */}
      {loading ? (
        <div class="flex  items-center justify-center h-96">
          <SpinnerTailwind />
        </div>
      ) : !users?.length ? (
        <div class="flex  items-center justify-center h-96">
          <p className="text-gray-400 text-lg">empty result...</p>
        </div>
      ) : (
        <>
          <table className="w-full">
            <thead>
              <tr className="py-44 border-spacing-0 border-b">
                <th className="w-2/12 py-4 text-center">#</th>
                <th className="w-5/12  text-start">Title</th>
                {/* <th className="w-3/12 text-start">Artist</th>
                <th className="w-2/12 text-start"></th> */}
              </tr>
            </thead>
            <tbody>
              {users?.map((i, index) => (
                <tr key={index} className=" border-spacing-0 border-b">
                  <td className="w-2/12 text-center">{index + 1}</td>
                  <td className="w-5/12 py-3">
                    <div className="flex items-center">
                      <div className="relative inline-flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
                        <span
                          className={`top-0 left-7 absolute  w-3.5 h-3.5 ${
                            i.isOnline ? "bg-green-400" : "bg-red-400"
                          }  border-2 border-white dark:border-gray-800 rounded-full`}
                        ></span>
                        <span className="font-medium text-gray-600 dark:text-gray-300">
                          {i.username.slice(0, 1)}
                        </span>
                      </div>
                      {/* <Link
                        to={`/admin/artist/${i._id}`}
                        className="hover:underline"
                      > */}
                      {i.username}
                      {/* </Link> */}
                    </div>
                  </td>
                  <td className="w-2/12 text-center">edit</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <PaginationBar
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          /> */}
        </>
      )}
    </div>
  );
};

export default ViewUsers;
