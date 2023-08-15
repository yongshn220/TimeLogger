import {Box, Flex} from "native-base";
import {Text, StyleSheet, View,} from "react-native";
import {formatTime} from "../Helper/TimeHelper";

export default function WorkAverage({work, height})
{
    height = height? height : 100

    return (
        <View>
            <Flex direction={'row'} style={[styles.workItemArea, {height: height}]}>
                <Box style={{display: 'flex', flex: 1, justifyContent:'center'}}>
                    <Box style={{flex: 1, justifyContent:'center'}}>
                        <Text style={styles.itemName}>{work.group}</Text>
                    </Box>
                </Box>
                <Box style={{display: 'flex', flex: 1, justifyContent:'center'}}>
                    <Box style={{flex: 1, justifyContent:'center'}}>
                        <Text style={styles.itemTime}>{formatTime(work.time)}</Text>
                    </Box>
                </Box>

            </Flex>

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