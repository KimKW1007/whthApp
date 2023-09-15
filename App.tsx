import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TextInput, ScrollView, Alert } from 'react-native';
import { theme } from './src/theme/theme';
import { Fragment, useEffect, useState } from 'react';
import Tabs from './src/Tabs';
import ToDoTextBox from './src/ToDoTextBox';
import UDBtnBox from './src/UDBtnBox';

const STORAGE_KEY = `@toDos`;
const CURRENT_TAB = '@currentTab';

const App = () => {
  const [working, setWorking] = useState(true);

  const rememberCurrentTab = async (isWork: boolean) => {
    await AsyncStorage.setItem(CURRENT_TAB, JSON.stringify({ isWork }));
  };

  const travel = () => {
    setWorking(false);
    rememberCurrentTab(false);
  };
  const work = () => {
    setWorking(true);
    rememberCurrentTab(true);
  };

  const [text, setText] = useState('');
  const [toDos, setToDos] = useState<any>({});

  const [updateText, setUpdateText] = useState('');

  const [currentId, setCurrentId] = useState(-1);

  const onChangeText = (payload: string) => (currentId === -1 ? setText(payload) : setUpdateText(payload));

  const addToDo = async () => {
    if (text === '') {
      return;
    }
    const newToDos = { [Date.now()]: { text, working, completed: false }, ...toDos };
    setText('');
    setToDos(newToDos);
    await saveToDos(newToDos);
  };

  const saveToDos = async (toSave: string) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  };

  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    const currentTab = await AsyncStorage.getItem(CURRENT_TAB);
    currentTab === null || JSON.parse(currentTab).isWork ? setWorking(true) : setWorking(false);
    s ? setToDos(JSON.parse(s)) : null;
  };

  const completedToDos = (id: string) => () => {
    const newToDos = { ...toDos };
    newToDos[id].completed = !newToDos[id].completed;
    setToDos(newToDos);
    saveToDos(newToDos);
  };

  const deleteToDo = (id: string) => () => {
    Alert.alert('Delete To Do?', 'Are you sure?', [
      {
        text: "I'm Sure",
        onPress: () => {
          const newToDos = { ...toDos };
          delete newToDos[id];
          setToDos(newToDos);
          saveToDos(newToDos);
        }
      },
      { text: 'Cancel' }
    ]);
    return;
  };

  const updateSetting = (id: string) => () => {
    const newToDos = { ...toDos };
    setCurrentId(Number(id));
    setUpdateText(newToDos[id].text);
  };
  const updateToDo = (id: string) => async () => {
    const newToDos = { ...toDos };
    newToDos[id].text = updateText;
    setToDos(newToDos);
    await saveToDos(newToDos);
    setUpdateText('');
    setCurrentId(-1);
  };

  useEffect(() => {
    loadToDos();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Tabs name="work" booleanType={true} typeFn={work} isWorking={working} />
        <Tabs name="travel" booleanType={false} typeFn={travel} isWorking={working} />
      </View>
      <TextInput
        onSubmitEditing={addToDo}
        value={text}
        onChangeText={onChangeText}
        returnKeyType={'done'}
        style={styles.input}
        placeholder={working ? 'Add a To Do' : 'Where do you want to go?'}
        placeholderTextColor={'#999'}
      />
      <ScrollView>
        {Object.keys(toDos).map((key) => {
          const toDo = toDos[key];
          return (
            <Fragment key={key}>
              {toDo.working === working ? (
                <>
                  {currentId === Number(key) ? (
                    <TextInput
                      onSubmitEditing={updateToDo(key)}
                      value={updateText}
                      onChangeText={onChangeText}
                      returnKeyType={'done'}
                      style={styles.updateInput}
                      autoFocus
                    />
                  ) : (
                    <View style={styles.toDo}>
                      <ToDoTextBox completed={toDo.completed} text={toDo.text} onPress={completedToDos(key)} />
                      <UDBtnBox onPressDelete={deleteToDo(key)} onPressUpdate={updateSetting(key)} />
                    </View>
                  )}
                </>
              ) : null}
            </Fragment>
          );
        })}
      </ScrollView>
    </View>
  );
};
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20
  },
  header: {
    flexDirection: 'row',
    marginTop: 100,
    justifyContent: 'space-between'
  },
  input: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 30,
    fontSize: 18,
    marginVertical: 20
  },
  toDo: {
    backgroundColor: theme.toDoBg,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  updateInput: {
    backgroundColor: '#fff',
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    fontSize: 16
  }
});
