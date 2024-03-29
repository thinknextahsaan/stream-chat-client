import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import Navbar from "../components/Navbar";
import { v4 as uuid } from "uuid";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CopyIcon } from "lucide-react";

const Home = () => {
    const client = useStreamVideoClient();
    const [call, setCall] = useState<undefined | Call>();

    const createMeeting = async () => {
        if (!client) return;

        try {
            let callId = uuid();
            let callType = "default";

            let call = client.call(callType, callId);

            const starts_at = new Date(Date.now()).toISOString();
            console.log(starts_at);

            await call.getOrCreate({
                data: {
                    starts_at,
                    custom: {
                        description: "This is a test meeting.",
                    },
                },
            });

            setCall(call);
        } catch (error: any) {
            console.log("Error while creating a call", error.message);
            setCall(undefined);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="mt-5 flex flex-col gap-10 items-center justify-center">
                <button
                    onClick={createMeeting}
                    className="bg-black text-white py-2 px-4"
                >
                    Create Meeting
                </button>
                {call && (
                    <div className="max-w-[350px] text-center shadow-lg p-5 rounded-md bg-gray-100">
                        <p className="font-bold mb-3">Invitation Link : </p>
                        <Link
                            to={"/"}
                            className="bg-white p-3 rounded-md block overflow-hidden w-full break-words"
                        >
                            {`http://localhost:5173/meetings/${call.id}`}
                        </Link>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    `http://localhost:5173/meetings/${call.id}`
                                );
                                alert("Link copied to clipboard successfully");
                            }}
                            className=" mt-3 flex gap-3 bg-black text-white py-2 px-3 w-full items-center justify-center"
                        >
                            Click to Copy Link <CopyIcon size={20} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
