import { Call, CallControls, SpeakerLayout } from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import SetupComponent from "./SetupComponent";

const MeetingPage = ({ call }: { call: Call }) => {
    const [setupComplete, setSetupComplete] = useState(false);

    return setupComplete ? (
        <div>
            <SpeakerLayout />
            <CallControls />
        </div>
    ) : (
        <SetupComponent
            onSetUpComplete={async () => {
                setSetupComplete(true);
                await call.join();
            }}
        />
    );
};

export default MeetingPage;
