import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux"
import store from "./redux/store"
import './index.css'

import CreateUser from "./pages/createUser"
import UserManagement from "./pages/userManagement";
import UserView from "./pages/userView"

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserManagement />} />
          <Route path="/:userId" element={<CreateUser />} />
          <Route path="/user/:userId" element={<UserView />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
