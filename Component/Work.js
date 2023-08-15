import {Box, Flex} from "native-base";
import {Pressable, Text, StyleSheet, TouchableOpacity, View,} from "react-native";
import {useContext, useEffect, useRef, useState} from "react";
import {formatTime} from "../Helper/TimeHelper";
import DeleteWorkModal from "./DeleteWorkModal";
import GlobalContext from "../Component/Context";

export default function Work({work, editMode, handleRemove, height})
{
    const {todayData, runningWork} = useContext(GlobalContext);
    const [timer, setTimer] = useState(work.time);
    const [timerRunning, setTimerRunning] = useState(false);

    const [itemColor, setItemColor] = useState('#fff');
    const [deleteModalOn, setDeleteModalOn] = useState(false);
    const timerRef = useRef();

    height = height? height : 100

    // Start and stop the timer when timerRunning changes
    useEffect(() => {
        if (runningWork.id === work.id && editMode === false) {
            setItemColor('#e2f2ff');
            timerRef.current = setInterval(TimerTick, 1000);
        }
        else {
            clearInterval(timerRef.current);
            setItemColor('#fff');
        }
        return () => {
            clearInterval(timerRef.current);
        };
    }, [runningWork]);

    function TimerTick() {
        if (runningWork.id === work.id) {
            setTimer((prevTime) => prevTime + 1)
            todayData.workTimeTick(work.id);
        }
    }

    function handlePress() {
        if (editMode) return;

        if (runningWork.id !== work.id) {
            runningWork.setId(work.id);
        }
        else {
            runningWork.clear();
        }
    }

    function handleDeleteClick() {
        setDeleteModalOn(true);
    }
    function handleDeleteWork() {
        handleRemove(work.id);
    }

    return (
        <View>
            <DeleteWorkModal name={work.name} state={deleteModalOn} setState={setDeleteModalOn} onDeleteButtonClick={handleDeleteWork}/>
            <Pressable onPress={handlePress}>
                <Flex direction={'row'} style={[styles.workItemArea, {backgroundColor: itemColor, height: height}]}>
                    <Box style={{display: 'flex', flex: 1, justifyContent:'center'}}>
                        <Box style={{flex: 1, justifyContent:'center'}}>
                            <Text style={styles.itemName}>{work.name}</Text>
                        </Box>
                    </Box>
                    {
                        (editMode)?
                        <TouchableOpacity onPress={handleDeleteClick}>
                            <Box style={{display: 'flex', flex: 1, justifyContent:'center'}}>
                                <Box style={{flex: 1, justifyContent:'center'}}>
                                    <Text style={[styles.itemTime, styles.redText]}>삭제</Text>
                                </Box>
                            </Box>
                        </TouchableOpacity>
                            :
                        <Box style={{display: 'flex', flex: 1, justifyContent:'center'}}>
                            <Box style={{flex: 1, justifyContent:'center'}}>
                                <Text style={styles.itemTime}>{formatTime(timer)}</Text>
                            </Box>
                        </Box>
                    }
                </Flex>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    workItemArea: {
        width: '100%',
        marginBottom: 5,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10,
    },

    itemName: {textAlign: 'left', fontSize: 16},
    itemTime: {textAlign: 'right', fontWeight: '400', fontSize: 16},
    redText: {color: "#de0e0e"}
})