import AsyncStorage from '@react-native-async-storage/async-storage';
export default class LocalStorage
{
    static USER_KEY = "userKey";
    static WORK_LIST_KEY = "workListKey";
    static TOTAL_TIME = "totalTime";
    static RECORD_EXIST_DATES = "recordExistDates";
    static PINNED_WORKS = "pinnedWorks";

    static async saveData (key, value) {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
            return true;
        } catch (e) {
            console.log("Fail to save data.");
            console.log("KEY:", key);
            console.log("VALUE:", value);
            return false;
        }
    };

    static async getData(key) {
        try {
            const value = await AsyncStorage.getItem(key);
            return JSON.parse(value);
        } catch (e) {
            return null;
        }
    };

    static async removeData(key) {
        await AsyncStorage.removeItem(key);
    }

    static async clearAll() {
        await AsyncStorage.clear();
    }


createNewUser = () => {
        let user = {
            works: []
        }
    }
}