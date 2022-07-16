const Qualitie = ({ name, arrQualitie }) => {
  return (
    <>
      <td>{name}</td>
      <td>
        {arrQualitie.map((quality) => (
          <span key={quality._id} className={`badge bg-${quality.color} m-1`}>
            {quality.name}
          </span>
        ))}
      </td>
    </>
  );
};

export default Qualitie;
