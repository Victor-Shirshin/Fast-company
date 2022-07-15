import Qualitie from "./qualitie";

const User = ({ users }) => {
  return users.map((user) => (
    <tr key={user._id}>
      <Qualitie name={user.name} color={user.qualities} />
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate}/5</td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(user._id)}
        >
          delete
        </button>
      </td>
    </tr>
  ));
};

export default User;
