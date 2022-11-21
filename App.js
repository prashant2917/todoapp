
//import all the components we are going to use.
import { Component } from 'react';
import TodoList from './components/TodoList';
import CreateTodo from './components/createTodo';
import EditTodo from './components/EditTodo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from './components/RootNavigation';




const Stack = createNativeStackNavigator(); 

export default function App() {
 
    
    return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName='todolist'>
      <Stack.Screen name="todolist" component={TodoList} />
      <Stack.Screen name="createtodo" component={CreateTodo} />
        <Stack.Screen name="edittodo" component={EditTodo} />
      </Stack.Navigator>
      </NavigationContainer>
    );
   
  
}