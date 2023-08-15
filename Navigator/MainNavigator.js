import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TimerScreen from "../Screen/TimerScreen";
import CreateWorkButton from "../Component/CreateWorkButton";
import {Box} from "native-base";
import {useState} from "react";
import {Text} from 'react-native';
import SummaryScreen from "../Screen/SummaryScreen";


const Tab = createBottomTabNavigator();

function getIconNameByType(name) {
    if (name === "TimerScreen")
        return 'bars'
    if (name === "Summary")
        return 'calendar-o'
}

export default function MainNavigator({route})
{
    const [addModalOn, setAddModalOn] = useState(false);

    function handleAddModalOn() {
        setAddModalOn(true);
    }
    function Empty() {
        return (<></>)
    }
    return(
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    return <FontAwesome name={getIconNameByType(route.name)} size={size} color={color} />;
                },
                headerShown: false,
        })}>
            <Tab.Screen name="TimerScreen" options={{title: "Works",}}>
                {props => <TimerScreen {...props} addModalOn={addModalOn} setAddModalOn={setAddModalOn}/>}
            </Tab.Screen>
            <Tab.Screen name="Settings" component={Empty}
                        options={() => ({
                            tabBarButton: () => (
                                <Box style={{top: -20}}>
                                    <CreateWorkButton onPress={handleAddModalOn}/>
                                </Box>
                            )
            })}/>
            <Tab.Screen name="Summary" component={SummaryScreen} options={{
                title: "Summary",
            }}/>
        </Tab.Navigator>
    )
}
