import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import { useUser } from "@clerk/clerk-react";

const App = () => {
    const {user} = useUser()

    console.log(user)


    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/*" element={<PageNotFound />} />
            </Routes>
        </>
    );
};

export default App;
