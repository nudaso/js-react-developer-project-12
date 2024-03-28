import { useEffect } from "react";

function App() {

  useEffect(() => {
    fetch(`/api/v1/channels`)
    .then(console.dir)
    .catch(console.dir)
  }, [])
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
