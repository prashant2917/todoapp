import { StyleSheet, Text, View, TextInput, TouchableOpacity,Switch } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CheckBox from '@react-native-community/checkbox';

//import all the components we are going to use.
import axios from 'axios';
import { useState } from 'react';
import * as RootNavigation from './RootNavigation';
import { useNavigation, useRoute } from '@react-navigation/native';

const data = [
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'High', value: 'High' },

];

export default function EditTodo() {
    const navigation = useNavigation();
    const route = useRoute();
    const todo = route.params.todo
    console.log("todo id" +todo._id)
    const [todo_description, setTodoDescription] = useState(todo.todo_description);
    const [todo_responsible, setTodoResponsible] = useState(todo.todo_responsible);
    const [todo_priority, setTodoPriority] = useState(todo.todo_priority);
    const [todo_completed, setTodoCompleted] = useState(todo.todo_completed);
    
   const  submit = () => {

        console.log("Form submitted:")
        console.log("Todo Description:" + todo_description)
        console.log("Todo Responsible:" + todo_responsible)
        console.log("Todo Priority: " + todo_priority)

        const updatedTodo = {
            todo_description: todo_description,
            todo_responsible: todo_responsible,
            todo_priority: todo_priority,
            todo_completed: todo_completed
        };
        

        axios.post('http://192.168.134.183:4000/todos/update/'+todo._id, updatedTodo)
            .then(res => {
                console.log(res.data)
                navigation.goBack()
               
            })
            .catch(function (error) {
                console.log(error);
            });


       
    }


   return (

        <View style={styles.container}>

            <TextInput style={styles.input}
                placeholder="Todo Description" placeholderTextColor="#9a73ef" autoFocus={true} onChangeText={newText => setTodoDescription(newText)} defaultValue={todo_description} />

            <TextInput style={styles.input}
                placeholder="Todo Responsible" placeholderTextColor="#9a73ef" onChangeText={newText => setTodoResponsible(newText)} defaultValue={todo_responsible} />


            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Priority"
                searchPlaceholder="Search..."
                value={todo_priority}
                onChange={item => {
                    setTodoPriority(item.value);
                }}
                renderLeftIcon={() => (
                    <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                )}
            />

        <View style={styles.switchContainer}>
        <Switch
          value={todo_completed}
          onValueChange={(newValue) => setTodoCompleted(newValue)}
          style={styles.switchStyle}
        />
        <Text style={styles.label}>Completed</Text>
      </View>
            <TouchableOpacity
                style={styles.submitButton}

                onPress={
                    () => submit()
                }>
                <Text style={styles.submitButtonText}> Update </Text>
            </TouchableOpacity>
        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        alignContent: 'center',
        backgroundColor: '#ffffff'
    },
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        marginTop: 20
    },
    submitButton: {
        backgroundColor: '#7a42f4',
        padding: 10,
        marginTop: 20,
        height: 40,

    },
    submitButtonText: {
        color: 'white',
        textAlign: 'center'

    },
    PriorityText: {
        color: 'black',
        textAlign: 'left',
        marginTop: 30,
        fontSize: 20
    },
    dropdown: {
        marginTop: 20,
        height: 50,
        borderWidth: 1,
        padding: 10
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    switchContainer: {
        flexDirection: "row",
        marginTop: 20,
       
      },
      switchStyle: {
        alignSelf: "center",
      },

      label: {
        marginTop: 15,
        marginLeft: 10,
      
        
      },

});

