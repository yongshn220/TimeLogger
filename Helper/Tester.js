
import DB from './LocalStorage'


export async function t_run() {

}

export async function t_getWorkListByDate(date) {

}

export async function t_clearWorkListByDate(dateString) {
    let data = await DB.getData(dateString);

    data.workList = [];
    await DB.saveData(dateString, data);
}

export async function t_clearAll() {
    await DB.clearAll();
}
export async function t_removeData(key) {
    await DB.removeData(key);
}

async function t_addWorkToDate(dateString, work) {
    let data = await DB.getData(dateString);

    if (!data) {
        await DB.saveData(dateString, {workList: []})
        data = await DB.getData(dateString);
    }

    data.workList.push(work);
    await DB.saveData(dateString, data);
    let recordDates = await DB.getData(DB.RECORD_EXIST_DATES);
    if (!recordDates) recordDates = [];
    await DB.saveData(DB.RECORD_EXIST_DATES, [...recordDates, dateString]);

    let result = await DB.getData(dateString);
    console.log('ADD | ', dateString, " : ", result);
}

function t_createWork(name, time) {
    return {
        id: new Date().getTime(),
        group: name,
        name: name,
        time: time,
    }
}
async function t_printData(key) {
    let data = await DB.getData(key);
    console.log('VIEW | ', key, " : ", data);
}

async function t_printRecordDates() {
    let data = await DB.getData(DB.RECORD_EXIST_DATES);
    console.log("RecordDates |  ",  data);
}
