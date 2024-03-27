import axios from "axios";

export const generateToken = async (userid: string) => {
    try {
        let { data } = await axios.post(
            "http://localhost:5000/get-stream-token",
            {
                userid,
            }
        );

        return data.token;
    } catch (error) {
        console.log("Error while generating token : ", error);
    }
};
