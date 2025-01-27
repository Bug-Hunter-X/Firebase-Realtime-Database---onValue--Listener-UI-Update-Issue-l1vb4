The solution involves ensuring that the UI update happens within a reaction to the database changes. Here's the corrected code using React's `useState` hook for managing the UI state:

```javascript
import React, { useState, useEffect } from 'react';
import { db } from './firebase'; // Import your Firebase config

function MyComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const unsubscribe = db.ref('myData').on('value', (snapshot) => {
      setData(snapshot.val());
    });
    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  if (data === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>My Data:</h1>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}

export default MyComponent;
```

This updated code uses `useState` to track the data from the database.  The `useEffect` hook ensures that the `onValue` listener is attached, and the data updates are correctly reflected in the component's state, causing the UI to automatically re-render with the new data. The `return () => unsubscribe();` line cleans up the listener when the component is unmounted, which is crucial for preventing memory leaks.