import {getDayStringsBetween} from "../Helper/CalendarHelper";
import DB from "../Helper/LocalStorage";
import {useEffect} from "react";


/* ---------------
    SUMMARY
----------------*/
export default function SummaryController({summary, setSummary}) {

    useEffect(() => {
        summary.init();
    }, [])

    summary.init = () => {
        setSummary({
            cached: [],
        });
    }

    summary.getSummaryKey = (startDay, endDay) => {
        return startDay + "~" + endDay;
    }

    summary.search = async (startDay, endDay) => {
        const dayStrings = getDayStringsBetween(startDay, endDay);

        let dataList = await multiGetData(dayStrings);
        let works = preprocessDataList(dataList);

        const summaryResult = calculateSummary(works, dayStrings.length);
        return summaryResult;
    }

    async function multiGetData(keys) {
        let dataList = [];

        for (let key of keys) {
            dataList.push(await DB.getData(key));
        }
        return dataList;
    }

    function preprocessDataList(dataList) {
        let result = [];

        for (let data of dataList) {
            if (!data) continue;

            for (let work of data.workList) {
                let item = {}
                item.group = work.group;
                item.time = work.time;
                result.push(item);
            }
        }
        return result;
    }

    /*
    work = {
        group: string,
        time: int,
    }
     */
    function calculateSummary(works, days) {
        const average = {};
        let result = [];

        works.forEach((work) => {
            if (average.hasOwnProperty(work.group)) {
                average[work.group] += work.time;
            }
            else {
                average[work.group] = work.time;
            }
        });

        Object.entries(average).forEach(([key, value]) => {
            result.push({
                group: key,
                time: Math.round(value / days)
            })
        });

        return result;
    }

    return (<></>)
}