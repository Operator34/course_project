import httpService from "./http.service";

const qualityEndPoint = "quality/";
const QualityService = {
    get: async () => {
        const { data } = await httpService.get(qualityEndPoint);
        console.log("data qualities.service", data);
        return data;
    }
};

export default QualityService;
