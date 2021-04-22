/* eslint-disable prettier/prettier */
/* eslint-disable jsx-quotes */
/* eslint-disable prettier/prettier */

import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
    List,
    ListItem,
    Button,
} from '@ui-kitten/components';
import axios from 'axios';

function TaskList(props) {
    const {
        showTaskForm,
    } = props;

    const [tasks, setTasks] = useState([]);

    const styles = StyleSheet.create({
        mainView: {
            width: '100%',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        listView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        buttonView: {
            width: '100%',
            justifyContent: 'flex-end',
            alignItems: 'center',
            flexDirection: 'row',
            padding: 10,
        },
        buttonActionView: {
            justifyContent: 'flex-end',
            alignItems: 'center',
            flexDirection: 'row',
        },
        buttonUpdate: {
            marginRight: 10,
        },
        list: {
            minWidth: '100%',
            backgroundColor: '#FFF',
        },
    });

    const handleOnNewButtonPress = () => {
        showTaskForm();
    };

    const renderItemActions = item => {
        return (
            <View style={styles.buttonActionView}>
                <Button
                    size='tiny'
                    style={styles.buttonUpdate}
                    onPress={() => showTaskForm(item)}
                >
                    Alterar
                </Button>
                <Button
                    size='tiny'
                    onPress={() => showTaskForm(item)}
                >
                    Excluir
                </Button>
            </View>
        );
    };

    const renderItem = ({ item }) => (
        <ListItem
            title={item.Name}
            accessoryRight={() => renderItemActions(item)}
        />
    );

    useEffect(() => {
        const getTasks = async () => {
            const { data } = await axios.get('https://parseapi.back4app.com/classes/Task', {
                headers: {
                    'X-Parse-Application-Id': 'wpPi20JkWCYZ1wTsEnfZNWnqqVOOhJTo2kk3jagc',
                    'X-Parse-REST-API-Key': 'FRtAa3gHvLK57PfDvE6WWKRu1OknYwc5g1DFaC7N',
                },
            });

            setTasks(data.results);
        };

        getTasks();
    }, []);

    return (
        <View style={styles.mainView}>
            <View style={styles.listView}>
                <List
                    style={styles.list}
                    data={tasks}
                    renderItem={renderItem}
                />
            </View>
            <View style={styles.buttonView}>
                <Button onPress={handleOnNewButtonPress}>
                    Novo
            </Button>
            </View>
        </View>
    );
}

export default TaskList;
