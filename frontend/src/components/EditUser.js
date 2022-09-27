import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const EditUser = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");
  const { id } = useParams();

  // GET user data
  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:4000/users/" + id);
      const { name, email, gender } = response.data;
      setName(name);
      setEmail(email);
      setGender(gender);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = { name, email, gender };
    try {
      await axios.patch("http://localhost:4000/users/" + id, data);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <form className="max-w-xl mx-auto mt-12" onSubmit={handleUpdate}>
      <div className="mb-6">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Your email
        </label>
        <input
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@flowbite.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col items-start mb-6">
        <label
          htmlFor="gender"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Gender
        </label>
        <select
          className="form-select appearance-none
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          aria-label="Default select example"
          onChange={(e) => setGender(e.target.value)}
          value={gender}
        >
          <option>Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className="flex justify-between">
        <button
          type="submit"
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Update
        </button>
        <Link
          to={`/`}
          className="px-4 py-2 font-bold text-white bg-gray-500 rounded hover:bg-gray-700"
        >
          Back
        </Link>
      </div>
    </form>
  );
};

export default EditUser;
