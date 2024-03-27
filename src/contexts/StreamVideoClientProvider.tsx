import { useUser } from "@clerk/clerk-react";
import {
    StreamVideo,
    StreamVideoClient,
    User,
} from "@stream-io/video-react-sdk";
import { ReactNode, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { generateToken } from "../helpers/generateToken";
import { Loader } from "lucide-react";

const StreamVideoClientProvider = ({ children }: { children: ReactNode }) => {
    const [videoClient, setVideoClient] = useState<
        StreamVideoClient | undefined
    >();
    const { user, isLoaded: userLoaded } = useUser();

    useEffect(() => {
        if (!userLoaded) return;

        let streamUser: User;

        if (user?.id) {
            streamUser = {
                id: user.id,
                name: user.username || user.id,
                image: user.imageUrl,
            };
        } else {
            streamUser = {
                id: uuid(),
                name: "Guest",
            };
        }

        let apiKey = import.meta.env.VITE_STREAM_API_KEY;

        if (!apiKey) {
            throw new Error("Api key is missing!");
        }

        let tokenProvider = async () => {
            return await generateToken(streamUser.id as string);
        };

        let client = new StreamVideoClient({
            apiKey,
            user: streamUser,
            tokenProvider: tokenProvider,
        });

        setVideoClient(client);

        return () => {
            client.disconnectUser();
            setVideoClient(undefined);
        };
    }, [userLoaded, user?.id, user?.username, user?.imageUrl]);

    if (!videoClient) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Loader className="animate-spin" />
            </div>
        );
    }

    return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoClientProvider;
