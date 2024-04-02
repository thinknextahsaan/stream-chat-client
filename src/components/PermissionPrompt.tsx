import { Camera, Mic } from "lucide-react";

const PermissionPrompt = () => {
    return (
        <div className="max-w-xl mx-auto mt-20">
            <h1 className="text-center text-2xl font-semibold mb-3">
                Please Provide Microphone and Camera permissions in order to
                join a meeting.
            </h1>
            <div className="flex gap-5 items-center justify-center">
                <div>
                    <Mic />
                </div>
                <div>
                    <Camera />
                </div>
            </div>
        </div>
    );
};

export default PermissionPrompt;
