// SmokeLevelDisplay.js

import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import firebaseConfig from '../config/firebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const SmokeLevelDisplay = () => {
  const [smokeLevel, setSmokeLevel] = useState(null);

  useEffect(() => {
    const database = firebase.database();
    const smokeRef = database.ref('MQ135/Smoke');

    // Listen for changes in smoke level
    const handleData = (snapshot) => {
      const data = snapshot.val();
      setSmokeLevel(data);
      if (data !== null && data >= 1800) {
        alert('Smoke detected! Please take necessary actions.');
      }
    };

    smokeRef.on('value', handleData);

    // Clean up listener when component unmounts
    return () => {
      smokeRef.off('value', handleData);
    };
  }, []);

  return (
    <div>
      <h2>Smoke Level</h2>
      {smokeLevel !== null ? (
        <div>
          <p>Current smoke level: {smokeLevel}</p>
        </div>
      ) : (
        <p>Loading smoke level...</p>
      )}
    </div>
  );
};

export default SmokeLevelDisplay;
