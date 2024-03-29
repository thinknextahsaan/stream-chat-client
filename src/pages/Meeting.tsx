import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
    Call,
    StreamCall,
    StreamTheme,
    StreamVideoClient,
    useCallStateHooks,
    useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import { Loader } from "lucide-react";

const Meeting = () => {
    const { callid } = useParams();
    const [call, setCall] = useState<undefined | Call>();
    const client = useStreamVideoClient();

    useEffect(() => {
        if (!client || !callid) return;

        async function getCallDetails(
            client: StreamVideoClient,
            callid: string
        ) {
            let call = client.call("default", callid);
            await call.get();
            console.log(call)
            setCall(call);
        }

        getCallDetails(client, callid);
    }, [callid]);



    if(!call){
        return <div className="h-screen flex items-center justify-center">
            <Loader className="animate-spin"/>
        </div>
    }

    return (
        <StreamTheme>
            <StreamCall call={call}>
                <Navbar />

                <div className="py-10"></div>
            </StreamCall>
        </StreamTheme>
    );
};

export default Meeting;
