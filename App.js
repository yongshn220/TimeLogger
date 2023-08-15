import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import MainNavigator from './Navigator/MainNavigator';
import ContextWrapper from './Component/ContextWrapper';
import Test from './Screen/Test';

export default function App() {
  return (
    <ContextWrapper>
      <NativeBaseProvider>
        <Test />
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </NativeBaseProvider>
    </ContextWrapper>
  );
}
