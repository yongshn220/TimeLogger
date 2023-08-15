import DB from "../Helper/LocalStorage";
import {useEffect, useState} from "react";
import {getDateNowString} from "../Helper/CalendarHelper";

/* --------------------
   RECORD_EXIST_DATES
---------------------*/

export default function RecordExistDatesController({recordExistDates, setRecordExistDates}) {

    const [dateNowString, setDateNowString] = useState('');

    useEffect(() => {
        recordExistDates.init();
        recordExistDates.load().then();
        setDateNowString(getDateNowString());
    }, [])


    recordExistDates.init = () => {
        setRecordExistDates([]);
    }

    recordExistDates.load = async () => {
        let dates = await DB.getData(DB.RECORD_EXIST_DATES);
        if (!dates) {
            dates = recordExistDates.createNewDates();
        }
        setRecordExistDates(dates);
    }

    recordExistDates.createNewDates = () => {
        let dates = [];
        DB.saveData(DB.RECORD_EXIST_DATES, dates).then();
        return dates;
    }

    recordExistDates.tryAddToday = () => {
        if (recordExistDates.includes(dateNowString)) return;

        let newDates = [...recordExistDates, dateNowString];
        recordExistDates.update(newDates).then();
    }

    recordExistDates.tryRemoveToday = (workList) => {
        if (workList.length > 0) return;

        let newDates = recordExistDates.filter((date) => date !== dateNowString)
        recordExistDates.update(newDates).then();
    }

    recordExistDates.update = async (newDates) => {
        setRecordExistDates(newDates);
        await DB.saveData(DB.RECORD_EXIST_DATES, newDates);
    }


    return (<></>)
}