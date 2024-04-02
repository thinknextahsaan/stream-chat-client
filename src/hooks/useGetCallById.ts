import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCallById = (id: string) => {
    const [call, setCall] = useState<Call>();
    const [callLoading, setCallLoading] = useState(true);

    const client = useStreamVideoClient();

    useEffect(() => {
        async function fetchCall() {
            try {
                if (!client || !id) {
                    return;
                }

                let { calls } = await client.queryCalls({
                    filter_conditions: { id: id },
                });

                if (calls.length > 0) {
                    setCall(calls[0]);
                }
            } catch (error: any) {
                console.log(error);
                alert(error.message);
            } finally {
                setCallLoading(false);
            }
        }

        fetchCall();
    }, [id, client]);

    return { call, callLoading };
};
