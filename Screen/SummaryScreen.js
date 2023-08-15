import {Button, SafeAreaView, View, Text} from "react-native";
import { Calendar } from "react-native-calendars";
import { StyleSheet } from "react-native";
import {windowHeight, windowWidth} from "../Helper/utils";
import {Center, Flex, ScrollView} from "native-base";
import Work from "../Component/Work";
import {useContext, useEffect, useMemo, useState} from "react";
import {
    getCalendarPeriod,
    getDateNowString,
    getStartEndDay,
    isDateStringInRange,
    Mode,
    toSimpleDurationString
} from '../Helper/CalendarHelper'
import Color from "../Helper/Color";
import GlobalContext from "../Component/Context";
import WorkAverage from "../Component/WorkAverage";

export default function SummaryScreen() {
    const {summary, recordExistDates, todayData} = useContext(GlobalContext);
    const [status, setStatus] = useState({
        selectedDayString: '',
        startDayString: '',
        endDayString: '',
    })
    const [markedDates, setMarkedDates] = useState({});
    const [mode, setMode] = useState(Mode.DAY);
    const [workSummaryList, setWorkSummaryList] = useState([]);
    const [dateNowString, setDateNowString] = useState(getDateNowString());
/* ----------------
    INITIALIZE
 -----------------*/
    useEffect(() => {
        updateSummary(dateNowString);

        _setMarkedDates();
    }, [])

    useEffect(() => {
        if (isDateStringInRange(dateNowString, status.startDayString, status.endDayString)) {
            const startEndDay = getStartEndDay(mode, dateNowString);
            updateWorkSummary(startEndDay).then();
        }
    }, [todayData])

    function _setMarkedDates() {
        const nowString = getDateNowString();

        let result = {};
        result[nowString] = {textColor: Color.LightBlue};

        for (const date of recordExistDates) {
            if (date === nowString) {
                result[date] = {...result[nowString], marked: true, dotColor: Color.LightBlue}
            }
            else {
                result[date] = {marked: true, dotColor: Color.LightBlue};
            }
        }
        setMarkedDates(result);
    }

/* ----------------
      UPDATE
 -----------------*/
    const finalMarkedDates = useMemo(() => {
        const periodDate = getCalendarPeriod(status.startDayString, status.endDayString);
        return {
            ...markedDates,
            ...periodDate,
        }
    }, [status])

    function updateSummary(dayString) {
        const startEndDay = getStartEndDay(mode, dayString);

        updateStatus(dayString, startEndDay);
        updateWorkSummary(startEndDay).then();
    }

    function updateStatus(dayString, startEndDay) {
        setStatus({
            selectedDayString: dayString,
            startDayString: startEndDay.startDayString,
            endDayString: startEndDay.endDayString,
        })
    }

    async function updateWorkSummary(startEndDay) {
        const summaryResult = await summary.search(startEndDay.startDayString, startEndDay.endDayString);
        setWorkSummaryList(summaryResult);
    }

/* ----------------
      HANDLER
 -----------------*/
    function handleDayPress(day){
        const dayString = day.dateString;
        updateSummary(dayString);
    }

    function handleModeClick(mode) {
        let startEndDay = getStartEndDay(mode, status.selectedDayString);

        updateStatus(status.selectedDayString, startEndDay)
        updateWorkSummary(startEndDay).then();
        setMode(mode);
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Calendar
                    onDayPress={handleDayPress}
                    style={styles.calendar}
                    theme={{arrowColor: 'blue',}}
                    enableSwipeMonths={true}
                    markingType={'period'}
                    markedDates={finalMarkedDates}
                />
                <View style={{margin:10}}>
                    <Flex direction={'row'} justifyContent={'center'} width="100%" mb={5}>
                        <Button title="D" color={mode === Mode.DAY? '' : 'gray'} onPress={() => handleModeClick(Mode.DAY)}/>
                        <Button title="W" color={mode === Mode.WEEK? '' : 'gray'} onPress={() => handleModeClick(Mode.WEEK)}/>
                        <Button title="M" color={mode === Mode.MONTH? '' : 'gray'} onPress={() => handleModeClick(Mode.MONTH)}/>
                    </Flex>
                    <Center>
                        <Text style={{color:'gray', marginBottom: 5}}>Average</Text>
                        <Text style={styles.durationText}>{toSimpleDurationString(status.startDayString, status.endDayString)}</Text>
                    </Center>
                </View>
                <View style={styles.workListArea}>
                    {
                        workSummaryList?.map((summary) => (
                            <WorkAverage key={(summary.group + summary.time)} work={summary} height={50}/>
                        ))
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {width: windowWidth, height: windowHeight, backgroundColor:'white'},
    calendar: {
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    workListArea: {margin: 15},
    durationText: {fontWeight:'800', fontSize:16, color:'gray'},
});
