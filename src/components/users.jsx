import User from "./user";

const Users = ({ users, handleDelete }) => {
  return (
    <>
      {/* <SearchStatus length={users.length} /> */}
      {users.length !== 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Имя</th>
              <th>Качества</th>
              <th>Профессия</th>
              <th>Встретился,раз</th>
              <th>Оценка</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <User users={users} handleDelete={handleDelete} />
          </tbody>
        </table>
      )}
    </>
  );
};

export default Users;
