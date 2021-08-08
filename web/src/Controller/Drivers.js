
import { Fetch } from "../Model/request"
export const getDrivers = async (n) => {
    try {
        let result = await Fetch({ n: n })
        return result && result.status === 200 ? await result.json() : []
    }
    catch (e) {
        console.log(e)
        return []
    }


}
