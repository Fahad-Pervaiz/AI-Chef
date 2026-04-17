import ReactDOM from 'react-dom/client';
import App from "./App"
import "./index.css"

console.log('index.jsx loaded');
console.log('root element:', document.getElementById('root'));

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log('React root created');
root.render(<App />);
console.log('App rendered');