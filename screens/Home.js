/* eslint-disable prettier/prettier */

import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import Modal from "react-native-modal";
import { set } from 'mongoose';

const Home = () => {
    const [todo, setTodo] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [confrim,setConfirm ]=useState(false);
    const [id,setId]=useState();
    const [count, setCount] = useState(0);
    const [changeIndex,setchangeindex]=useState();
 
    useEffect(() => {
        retrieveObject('todo')
          .then((obj) => {
            if (obj) {
              setTodo(obj);
            }
          })
          .catch((error) => {
            console.log('Error retrieving object:', error);
          });
      }, []);
    const storeObject = async ( value) => {
        try {
          const jsonValue = JSON.stringify(value);
          await AsyncStorage.setItem('todo', jsonValue);
          console.log('Object stored successfully!');
        } catch (error) {
          console.log('Error storing object:', error);
        }
      };
      const retrieveObject = async (key) => {
        try {
          const jsonValue = await AsyncStorage.getItem(key);
          if (jsonValue != null) {
            const value = JSON.parse(jsonValue);
            console.log('Retrieved object:', value);
            return value;
          }
        } catch (error) {
          console.log('Error retrieving object:', error);
        }
      };
      const deteleTodo = (id) => {
        const filteredTodo = todo.filter(obj => obj.index !== id);
        setTodo(filteredTodo);
        storeObject(todo);
    };
      const completetodo=()=>{
        const updatedTodos = [...todo];

        // Modify the desired object in the copied array
        updatedTodos[changeIndex] = { ...updatedTodos[changeIndex], status: "complete" };
        setConfirm(false);
        setTodo(updatedTodos);
        storeObject(updatedTodos);
        

      }
    const addTodo = () => {
        let newTodoItem = {
            todo: newTodo,
            date: new Date(),
            index: count,
            status:"pending"
        };

        setTodo(prevTodos => [...prevTodos, newTodoItem]);
        setNewTodo('');
        setCount(count + 1);
        storeObject(todo);
        console.log(todo);
    };
    
    return (
        <View style={{backgroundColor:"black",width:"100%",height:"100%"}}>
            <View style={{ alignItems: 'center' }}><TextInput
                placeholder="write your todo "
                onChangeText={(text) => setNewTodo(text)}
                placeholderTextColor={'#999999'}
                value={newTodo}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                    color: '#999999', borderWidth: 1, borderColor: 'gray', padding: 10,
                    marginLeft: 30, marginRight: 30, marginTop: 50, borderRadius: 15, backgroundColor: '#33363A', width: '90%',
                }} />

                <View style={{
                    backgroundColor: 'black', color: 'white', borderColor: 'green',
                    borderWidth: 1, borderRadius: 8, width: 50, height: 'auto', marginTop: 30, justifyContent: 'center', 
                    alignItems: 'center', paddingLeft: 5, paddingRight: 5,
                }}>

                    <TouchableOpacity style={{}} onPress={addTodo}>
                        <Text style={{ color: 'white', fontSize: 15 }}>Add</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '90%', marginTop: 30, }}>
                    {todo.length!==0 && todo.map((newto, index) => (<View  style={{flexDirection: 'row', justifyContent: 'space-between' }}key={index}>
                        <Text style={{ marginTop: 5,color:"white" }} >{index + 1}..{newto.todo}</Text>
                       <View style={{flexDirection:"row"}}>{newto.status==="pending"?<TouchableOpacity onPress={()=>{setchangeindex(index); setConfirm(true)}}><Text>{<Icon2 name="pending-actions" size={25} color="yellow" />}</Text></TouchableOpacity>:
                       <TouchableOpacity ><Text>{<Icon1 name="checkcircle" size={25} color="green" />}</Text></TouchableOpacity>}
                        <TouchableOpacity onPress={()=>deteleTodo(index)}><Text>{<Icon name="delete" size={30} color="#900" />}</Text></TouchableOpacity>
                        </View>
                       </View>))}</View>
            </View>

            <View>
            <Modal visible={confrim}>
  <View style={{ flex: 1,justifyContent:"center",alignItems:"center",width:"100%",height:500,backgroundColor:"white",borderRadius:10 }}>
    <Text>mark the task as the complete</Text>
    <View style={{ borderRadius: 5, borderWidth: 1, borderColor: 'green',width:70}}>
      <TouchableOpacity onPress={() => completetodo()}>
        <Text>Confirm</Text>
      </TouchableOpacity>
    </View>
    <View style={{ borderRadius: 5, borderWidth: 1, borderColor: 'red',width:70,marginTop:5 }}>
      <TouchableOpacity onPress={() => setConfirm(false)}>
        <Text>Cancel</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
    </View>


        </View>
    );
};

export default Home;
