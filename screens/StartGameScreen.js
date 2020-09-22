import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Card from '../components/Card';
import colors from '../styles/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer'

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmerd, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const inputNumberHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    const confirmInputHandler = () => {
        const choosenNumber = parseInt(enteredValue)
        if (isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber > 99) {
            Alert.alert('Invalid Number!', 'Numbers Should be between 1 and 99.',
                [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
            );
            return;
        }
        setConfirmed(true);
        setSelectedNumber(choosenNumber);
        setEnteredValue();
        Keyboard.dismiss();
    }

    let confirmedOutput;
    if (confirmerd) {
        confirmedOutput =
            <Card style={styles.summaryContent}>
                <Text style={styles.text}>You Selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <Button title='Start Game' onPress={()=> props.onStartGame(selectedNumber)} />
            </Card>
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start Game!</Text>
                <Card style={styles.input}>
                    <Text >Select a Number</Text>
                    <Input
                        style={styles.inputWidth}
                        blurOnSubmit
                        autoCaptalize='none'
                        autoCorrect={false}
                        keyboardType="number-pad"
                        maxLength={2}
                        onChangeText={inputNumberHandler}
                        value={enteredValue}
                    />
                    <View style={styles.buttons}>
                        <View style={styles.size}>
                            <Button title='Reset' color={colors.primary} onPress={resetInputHandler} />
                        </View>
                        <View style={styles.size}>
                            <Button title='Confirm' color={colors.acent} onPress={confirmInputHandler} />
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    );
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 25,
        marginVertical: 10
    },
    input: {
        width: 300,
        maxWidth: '80%',
        alignItems: "center",

    },
    buttons: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    size: {
        width: '40%',
    },
    inputWidth: {
        width: 50,
        textAlign: 'center',
    },
    summaryContent: {
        marginTop: 20,
        alignItems:'center'
    },
    text:{
        color:'black',
        fontWeight:"bold",
        fontSize:20
    }
});

export default StartGameScreen;