
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FAB } from 'react-native-paper';
//import all the components we are going to use.
import axios from 'axios';
import {  useEffect, useState  } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';


const getDataUrl = "http://192.168.134.183:4000/todos/"

export default function TodoList() {

    const [todos, setTodos] = useState([]);
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const addItem = () => {
        navigation.navigate("createtodo")
    
    }
    useEffect(() => {
        fetchTodos();
    }, [isFocused]);

    const renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#000",
                }}
            />
        );
    };

    const renderItem = ({ item }) => (
        <Item todo={item}  />
    );
    const Item = ({ todo }) => {
        return (
            <TouchableOpacity style={styles.item}  onPress = {() => navigation.navigate("edittodo", {todo : todo}) }>
                <Text style = {[todo.todo_completed? styles.itemTextLineThrough : styles.itemTextNormal]}>{todo.todo_description}</Text>
                <Text style = {[todo.todo_completed? styles.itemTextLineThrough : styles.itemTextNormal]}>{todo.todo_responsible}</Text>
                <Text style = {[todo.todo_completed? styles.itemTextLineThrough : styles.itemTextNormal]}>{todo.todo_priority}</Text>
    
            </TouchableOpacity>
        );
    }
    const fetchTodos = () => {
        axios.get(getDataUrl)
            .then(response => {
                console.log(response.data);
                setTodos(response.data)
               })
            .catch(function (error) {
                console.log(error);
            }).finally(function () {
                // always executed
                console.log('Finally called');
            });
    }
    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={todos}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                ItemSeparatorComponent={renderSeparator}
                showsVerticalScrollIndicator={true}
            />

            <FAB style={styles.fab} icon="plus" small label="Add more"
                onPress= {addItem } />
        </View>
    );
    
    
   

   
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 8,
        padding: 2,
        alignContent: 'center'
    },

    item: {
        paddingLeft: 10,
        paddingBottom: 10,
        fontSize: 10,
        marginTop: 10,
        marginVertical: 8,
        marginHorizontal: 8

    },
    itemTextNormal: {
        textDecorationLine: 'none'
    },

    itemTextLineThrough : {
        textDecorationLine: 'line-through'
    },

    list: {
        margin: 8
    },
    fab: {
        position: 'relative',
        margin: 16,

        right: 0,
        left: 1,
        bottom: 1,
    },
});