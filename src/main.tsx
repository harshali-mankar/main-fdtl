import {loadConfig} from "../configLoader"
import './index.css'
import App from './App'
import { createRoot } from 'react-dom/client';
const root = createRoot(
  document.getElementById("root") as HTMLElement
);

loadConfig().then(() => {
  root.render(  
    <App />  
  );
});
