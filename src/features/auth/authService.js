import getAPI from "../../services/api";

//get each API for login n register

// login (https://take-home-test-api.nutech-integrasi.com/login)
export const loginAPI = async (go) => {
    const response = await getAPI.post("/login", go);

    if (response.data.status !== 0){
        throw new Error(response.data.message);
    }
    return response.data.data;
};

// register (https://take-home-test-api.nutech-integrasi.com/registration)
export const registerAPI = async (go) => {
    const response = await getAPI.post("/registration", go);
    return response.data;
};