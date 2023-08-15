import React, {useEffect, useState} from 'react';
import Context from './Context';
import {getDateNowString} from '../Helper/CalendarHelper';
import PinnedWorkController from '../Controller/PinnedWorkController';
import RecordExistDatesController from '../Controller/RecordExistDatesController';
import RunningWorkController from '../Controller/RunningWorkController';
import SummaryController from '../Controller/SummaryController';
import TodayDataController from '../Controller/TodayDataController';
/*
    yyyy-mm-dd: {
        workList: [WORK, WORK ...],
    }

    WORK: {
        id: int,
        group: string,
        name: string,
        time: int(seconds),
    }

    RECORD_EXIST_DATES: []

    WORKS: []
 */

export default function ContextWrapper(props) {
  const [mainController, setMainController] = useState({});
  const [dateNowString, setDateNowString] = useState('');

  // Sub Controllers
  const [pinnedWorks, setPinnedWorks] = useState({});
  const [todayData, setTodayData] = useState({ready: false});
  const [runningWork, setRunningWork] = useState({});
  const [summary, setSummary] = useState({});
  const [recordExistDates, setRecordExistDates] = useState({});

  useEffect(() => {
    setDateNowString(() => getDateNowString());
    mainController.setupMidnightTimeout();
  }, []);

  mainController.addWork = async name => {
    const newWork = pinnedWorks.addWork(name);
    todayData.addWork(newWork);
    recordExistDates.tryAddToday();
  };

  mainController.removeWork = async id => {
    todayData.removeWorkById(id);
    pinnedWorks.removeWorkById(id);
    recordExistDates.tryRemoveToday(todayData.workList);
  };

  mainController.isWorkNameExist = name => {
    return pinnedWorks.isNameExist(name);
  };

  mainController.performMidnightAction = async () => {
    let runningWorkId = runningWork.getId();
    runningWork.clear();

    await todayData.loadData();
    runningWork.setId(runningWorkId);
  };

  mainController.calculateTimeUntilMidnight = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0); // Set to midnight of the current day

    return midnight - now;
  };

  mainController.setupMidnightTimeout = () => {
    const timeUntilMidnight = mainController.calculateTimeUntilMidnight();

    setTimeout(() => {
      mainController.performMidnightAction();
      todayData.setupMidnightTimeout(); // Set up the next timeout for the next midnight
    }, timeUntilMidnight);
  };

  return (
    <Context.Provider
      value={{
        mainController,
        pinnedWorks,
        todayData,
        runningWork,
        summary,
        recordExistDates,
      }}>
      <TodayDataController todayData={todayData} setTodayData={setTodayData} />
      <PinnedWorkController
        pinnedWorks={pinnedWorks}
        setPinnedWorks={setPinnedWorks}
      />
      <RecordExistDatesController
        recordExistDates={recordExistDates}
        setRecordExistDates={setRecordExistDates}
      />
      <RunningWorkController
        runningWork={runningWork}
        setRunningWork={setRunningWork}
      />
      <SummaryController summary={summary} setSummary={setSummary} />
      {[props.children]}
    </Context.Provider>
  );
}
