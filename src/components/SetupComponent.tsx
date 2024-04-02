import {
    DeviceSettings,
    VideoPreview,
    useCall,
    useCallStateHooks,
    useCalls,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import PermissionPrompt from "./PermissionPrompt";

const SetupComponent = ({
    onSetUpComplete,
}: {
    onSetUpComplete: () => void;
}) => {
    const [micCamEnabled, setMicCamEnabled] = useState(false);
    const call = useCall();
    const { useMicrophoneState, useCameraState } = useCallStateHooks();
    const { hasBrowserPermission: isMicEnabled } = useMicrophoneState();
    const { hasBrowserPermission: isCamEnabled } = useCameraState();

    useEffect(() => {
        if (micCamEnabled) {
            call?.camera.disable();
            call?.microphone.disable();
        } else {
            call?.camera.enable();
            call?.microphone.enable();
        }
    }, [micCamEnabled]);

    if (!isMicEnabled || !isCamEnabled) {
        return <PermissionPrompt />;
    }

    return (
        <div className="container mx-auto mt-20">
            <div className="w-full flex flex-col items-center">
                <VideoPreview />
                <div className="mt-5 flex gap-5 items-center ">
                    <label
                        htmlFor="micCamDisabled"
                        className="flex gap-2 select-none"
                    >
                        <input
                            id="micCamDisabled"
                            type="checkbox"
                            onChange={(e) => setMicCamEnabled(e.target.checked)}
                        />
                        <span> Join With Camera and Mic Off</span>
                    </label>
                    <DeviceSettings />
                </div>
                <button
                    className="bg-black text-white py-2 px-4 mt-5"
                    onClick={() => onSetUpComplete()}
                >
                    Join Meeting
                </button>
            </div>
        </div>
    );
};

export default SetupComponent;
