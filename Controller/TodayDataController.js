import DB from "../Helper/LocalStorage";
import {useEffect, useState} from "react";
import {getDateNowString} from "../Helper/CalendarHelper";
import {logError} from "../Helper/LogHelper";

/* ---------------
   TODAY_DATA
----------------*/

export default function TodayDataController({todayData, setTodayData}) {

    const [dateNowString, setDateNowString] = useState(getDateNowString());

    useEffect(() => {
        todayData.init();
        todayData.loadData().then();
    }, [])


    todayData.init = () => {
        setTodayData({
            workList: [],
            ready: false,
        });
    }

    todayData.loadData = async () => {
        let newDateNowString = getDateNowString();
        setDateNowString(newDateNowString);

        let data = await DB.getData(newDateNowString);
        if (!data) data = await todayData.createNewData();

        todayData.update(data);
    }

    todayData.loadDataWithRunningWork = async (work) => {
        if (!work) return logError("todayData.loadDataWithRunningWork :: work is invalid.");

        let dateNowString = getDateNowString();

        let data = await DB.getData(dateNowString);
        if (!data) data = await todayData.createNewData();

        data.workList = overrideWork(data.workList, work);

        todayData.update(data);
    }

    todayData.update = (newData) => {
        todayData.saveDBData(newData);
        todayData.saveStateData(newData);
    }

    todayData.saveDBData = (newData) => {
        const data = {
            workList: newData.workList,
        }
        DB.saveData(dateNowString, data).then();
    }

    todayData.createNewData = async () => {
        let works = await DB.getData(DB.PINNED_WORKS);
        works.map(work => work.updateKey = work.id + new Date().getTime());
        return {
            workList: [...works],
        };
    }

    todayData.addWork = (work) => {
        if (!work) return logError("todayData.addWork :: work is invalid.");

        let newTodayData = todayData;
        newTodayData?.workList?.push(work);

        todayData.update(newTodayData);
    }

    todayData.getWorkById = (id) => {
        if (!id || id < 0) return logError("todayData.getWorkById :: work id is invalid");

        return todayData.workList.find((work) => work.id === id);
    }

    todayData.removeWorkById = (id) => {
        if (!id || id < 0) return logError("todayData.removeWorkById :: work id is invalid");

        let newTodayData = todayData;
        newTodayData.workList = newTodayData.workList.filter((work) => work.id !== id);

        todayData.update(newTodayData);
    }

    todayData.saveStateData = (newData) => {
        setTodayData({
            workList: newData.workList,
            ready: true,
        })
    }

    todayData.workTimeTick = (id) => {
        let newTodayData = todayData;

        let work = newTodayData.workList.find((work) => work.id === id);
        if (!work) return logError("todayData.workTimeTick :: no matching work id.");

        work.time += 1;
        todayData.update(newTodayData);
    }

    todayData.getTotalTime = () => {
        let totalTime = 0;
        for (let work of todayData.workList) {
            totalTime += work.time;
        }
        return totalTime;
    }

    function overrideWork(workList, work) {
        console.log("b:", workList)
        for (let _work of workList) {
            if (_work.name === work.name) {
                copyProperties(_work, work);
            }
        }
        console.log("a:", workList)
        return workList;
    }

    function copyProperties(target, source) {
        for (const key in source) {
            if (source.hasOwnProperty(key) && target.hasOwnProperty(key)) {
                target[key] = source[key];
            }
        }
    }

    return (<></>)
}