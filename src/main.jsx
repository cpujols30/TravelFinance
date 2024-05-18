import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import './styles.css'
import UserRouter from './routes/UserRouter.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
     <BrowserRouter>
      <Toaster  />
     <UserRouter />
     </BrowserRouter>

)
