import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './css/App.css';
import { fetchAreas } from './redux/actions/dashboard';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAreas());
  }, []);

  return (
    <div className="App">
      hello
    </div>
  );
}

export default App;
