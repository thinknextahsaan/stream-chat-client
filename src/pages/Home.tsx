import Navbar from "../components/Navbar";

const Home = () => {


    const createMeeting = () => {
        
    }

    return (
        <div>
            <Navbar />
            <div className="mt-5 flex items-center justify-center">
                <button onClick={createMeeting} className="bg-black text-white py-2 px-4">Create Meeting</button>
            </div>
        </div>
    );
};

export default Home;
