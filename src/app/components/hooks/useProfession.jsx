import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import professionService from "../../services/professions.service";
import { toast } from "react-toastify";

const ProfessionContext = React.createContext();

export const useProfessions = () => {
  return useContext(ProfessionContext);
};

// Почему-то нельзя экспортировать эти HOC по default ?
export const ProfessionProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [professions, setProfessions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProfessionsList();
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, []);

  function getProfessionById(id) {
    return professions.find((item) => item._id === id);
  }

  async function getProfessionsList() {
    try {
      const { content } = await professionService.get();
      setProfessions(content);
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  return (
    <ProfessionContext.Provider
      value={{ isLoading, professions, getProfessionById }}
    >
      {children}
    </ProfessionContext.Provider>
  );
};

ProfessionProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
