import DB from "../Helper/LocalStorage";
import {useEffect} from "react";

/* ---------------
   PINNED_WORKS
----------------*/

export default function PinnedWorkController({pinnedWorks, setPinnedWorks}) {

    useEffect(() => {
        pinnedWorks.init();
        pinnedWorks.loadData().then();
    }, [])

    pinnedWorks.init = () => {
        setPinnedWorks([]);
    }

    pinnedWorks.loadData = async () => {
        let works = await DB.getData(DB.PINNED_WORKS);
        if (!works) works = pinnedWorks.createNewData();
        setPinnedWorks(works);
    }

    pinnedWorks.createNewData = () => {
        let works = []
        DB.saveData(DB.PINNED_WORKS, works).then();
        return works;
    }

    pinnedWorks.addWork = (name) => {
        if (pinnedWorks.isNameExist(name)) return null;

        let work = pinnedWorks.getNewWork(name);
        let newWorks = [...pinnedWorks, work];
        pinnedWorks.update(newWorks);

        return work;
    }

    pinnedWorks.removeWorkById = async (id) => {
        let newWorks = pinnedWorks;
        newWorks = newWorks.filter((work) => work.id !== id);

        pinnedWorks.update(newWorks);
    }

    pinnedWorks.getNewWork = (name) => {
        return {
            id: new Date().getTime(),
            updateKey: new Date().getTime() * 2,
            group: name,
            name: name,
            time: 0,
        }
    }

    pinnedWorks.isNameExist = (name) => {
        for (let work of pinnedWorks) {
            if (work.name === name) {
                return true;
            }
        }
        return false;
    }

    pinnedWorks.update = (newWorks) => {
        DB.saveData(DB.PINNED_WORKS, newWorks).then();
        setPinnedWorks(newWorks);
    }

    return (<></>)
}