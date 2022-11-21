import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { useNavigation } from '@react-navigation/native';
//import all the components we are going to use.
import axios from 'axios';
import { useState } from 'react';


const data = [
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'High', value: 'High' },

];

export default function CreateTodo() {
     const navigation = useNavigation()

    const [todo_description, setTodoDescription] = useState('');
    const [todo_responsible, setTodoResponsible] = useState('');
    const [todo_priority, setTodoPriority] = useState('');
    const [todo_completed, setTodoCompleted] = useState(false);


   const submit = () => {

        console.log("Form submitted:")
        console.log("Todo Description:" + todo_description)
        console.log("Todo Responsible:" + todo_responsible)
        console.log("Todo Priority: " + todo_priority)

        const newTodo = {
            todo_description: todo_description,
            todo_responsible: todo_responsible,
            todo_priority: todo_priority,
            todo_completed: todo_completed
        };

        axios.post('http://192.168.134.183:4000/todos/add', newTodo)
            .then(res => {
                console.log(res.data)
                //navigation.push("todolist")
                navigation.goBack()
            })
            .catch(function (error) {
                console.log(error);
            });


        setTodoDescription('');
        setTodoResponsible('');
        setTodoPriority('');
        setTodoCompleted(false);
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
            <TouchableOpacity
                style={styles.submitButton}

                onPress={
                    () => submit()
                }>
                <Text style={styles.submitButtonText}> Submit </Text>
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


});

