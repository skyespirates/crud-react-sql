import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const UserList = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  // GET all users
  const getUsers = async () => {
    const response = await axios.get("http://localhost:4000/users");
    setUsers(response.data);
  };
  // DELETE an user
  const handleDelete = async (userId) => {
    try {
      await axios.delete("http://localhost:4000/users/" + userId);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex flex-col max-w-4xl mx-auto mt-12">
      <Link
        to="add"
        className="w-32 px-4 py-2 font-bold text-center text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Add User
      </Link>
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-sm font-medium text-left text-gray-900"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-sm font-medium text-left text-gray-900"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-sm font-medium text-left text-gray-900"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-sm font-medium text-left text-gray-900"
                  >
                    Gender
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-sm font-medium text-left text-gray-900"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                      {user.gender}
                    </td>
                    <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                      <Link
                        to={`edit/${user.id}`}
                        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                      >
                        Edit
                      </Link>
                      <button
                        className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
