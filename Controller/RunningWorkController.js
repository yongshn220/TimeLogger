

/* -----------------
    RUNNING_WORK
------------------*/

import {useEffect} from "react";
export default function RunningWorkController({runningWork, setRunningWork}) {

    useEffect(() => {
        runningWork.init();
    }, [])

    runningWork.init = () => {
        setRunningWork({
            id: -1,
        });
    }

    runningWork.clear = () => {
        setRunningWork({
            id: -1,
        })
    }

    runningWork.setId = (id) => {
        setRunningWork({
            id: id,
        });
    }

    runningWork.removeId = () => {
        setRunningWork({
            id: -1,
        })
    }

    runningWork.getId = () => {
        return runningWork.id;
    }

    return (<></>)
}