import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Loader } from "lucide-react";
import { useGetCallById } from "../hooks/useGetCallById";
import { useUser } from "@clerk/clerk-react";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import MeetingPage from "../components/MeetingPage";

const Meeting = () => {
    const { callid } = useParams();
    const { call, callLoading } = useGetCallById(callid as string);
    const { user, isLoaded: userLoaded } = useUser();

    // if (!userLoaded || callLoading) {
    //     return <Loader className="animate-spin" />;
    // }

    // if (!call) {
    //     return (
    //         <div>
    //             <h2>Call Not Found?</h2>
    //         </div>
    //     );
    // }

    // return <div>Meeting Join Screen</div>;

    return (
        <StreamCall call={call}>
            <StreamTheme>
                <Navbar />
                <div>
                    {!userLoaded || callLoading ? (
                        <div className="h-screen flex items-center justify-center">
                            <Loader className="animate-spin" />
                        </div>
                    ) : !call ? (
                        <div>
                            <h2>Call Not Found?</h2>
                        </div>
                    ) : (
                        <MeetingPage call={call} />
                    )}
                </div>
            </StreamTheme>
        </StreamCall>
    );
};

export default Meeting;
