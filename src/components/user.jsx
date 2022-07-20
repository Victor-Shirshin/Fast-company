import Qualitie from "./qualitie";
import BookMark from "./bookmark";

const User = ({ users, handleDelete, userCrop }) => {
  return userCrop.map((user) => (
    <tr key={user._id}>
      <Qualitie name={user.name} arrQualitie={user.qualities} />
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate}/5</td>
      <td>
        <BookMark />
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
