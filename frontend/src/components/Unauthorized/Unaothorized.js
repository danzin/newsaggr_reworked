import React from 'react';
import { useNavigate } from 'react-router-dom';
const Unaothorized = () => {
  const navigate = useNavigate(false);
  const back = () => navigate(-1);
  return (
    <section>
      <h1>Unaothorized.</h1>
      <br />
      <div>You do not have permission to view this page.</div>
      <div>
        <button onClick={back}>Go back</button>
      </div>
    </section>
  );
};

export default Unaothorized;
