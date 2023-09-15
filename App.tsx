import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TextInput, ScrollView, Dimensions } from 'react-native';
import { theme } from './src/theme/theme';
import { Fragment, useEffect, useState } from 'react';
import Tabs from './src/Tabs';
import ToDoTextBox from './src/ToDoTextBox';
import UDBtnBox from './src/UDBtnBox';
import CustomModal from './src/modal/CustomModal';

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
  const [detailId, setDetailId] = useState(-1);
  const [deleteId, setDeleteId] = useState(-1);

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
    if (detailId === Number(id)) {
      setDetailId(-1);
    }
    const newToDos = { ...toDos };
    newToDos[id].completed = !newToDos[id].completed;
    setToDos(newToDos);
    saveToDos(newToDos);
  };

  const deleteToDo = () => {
    const newToDos = { ...toDos };
    delete newToDos[String(deleteId)];
    setToDos(newToDos);
    saveToDos(newToDos);
    setDeleteId(-1);
  };

  const deleteCancle =()=>{
    setDeleteId(-1);
  }

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

  const handleDetailItem = (id: string) => () => {
    if (detailId === Number(id)) {
      setDetailId(-1);
    } else {
      setDetailId(Number(id));
    }
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
        placeholder={working ? '할 일을 적으세요' : '가고싶은 곳을 적으세요'}
        placeholderTextColor={'#999'}
      />
      <ScrollView>
        {Object.keys(toDos).map((key) => {
          const toDo = toDos[key];
          return (
            <Fragment key={key}>
              {toDo.working === working ? (
                <View style={styles.toDo}>
                  {currentId === Number(key) ? (
                    <TextInput value={updateText} onChangeText={onChangeText} returnKeyType={'done'} style={styles.updateInput} autoFocus multiline />
                  ) : (
                    <ToDoTextBox
                      isDetail={detailId === Number(key)}
                      setDetailId={handleDetailItem(key)}
                      completed={toDo.completed}
                      text={toDo.text}
                      onPress={completedToDos(key)}
                    />
                  )}
                  <UDBtnBox
                    isEdit={currentId === Number(key)}
                    onPressUpdate={updateToDo(key)}
                    onPressDelete={()=>setDeleteId(Number(key))}
                    onPressUpdateSetting={updateSetting(key)}
                  />
                </View>
              ) : null}
            </Fragment>
          );
        })}
      </ScrollView>
      {deleteId !== -1 ? <CustomModal deleteToDo={deleteToDo} deleteCancle={deleteCancle} /> : null}
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
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    width: '70%'
  }
});
