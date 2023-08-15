import {useEffect} from "react";
import DB from "../Helper/LocalStorage";
import {View} from "react-native";

export default function Test() {
    useEffect(() => {
        run().then();
    }, [])

    async function run() {
        // await t_removeData("2023-08-01");
        //
        // await t_addData('2023-08-01', t_createWork('test1', 300));
        // await t_addData('2023-07-28', t_createWork('test2', 1000));
        // await t_addData('2023-07-29', t_createWork('test1', 1200));
        // await t_addData('2023-07-29', t_createWork('test4', 120));
        // t_seeData('2023-08-01');
        // t_seeRecordDates();
        // t_clearAll();
    }

    return (
        <View></View>
    )
}