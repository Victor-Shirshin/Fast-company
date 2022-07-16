import Qualitie from "./qualitie";
import BookMark from "./bookmark";

const User = ({ users, handleDelete, handleToggleBookMark }) => {
  return users.map((user) => (
    <tr key={user._id}>
      <Qualitie name={user.name} arrQualitie={user.qualities} />
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate}/5</td>
      <td>
        <BookMark handleToggleBookMark={handleToggleBookMark} users={users} />
      </td>
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
