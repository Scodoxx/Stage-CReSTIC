import React, {useState} from 'react';
import {View, TouchableOpacity, Text, Platform} from 'react-native';

//Permet d'avoir le rouleau des dates ou des heures
import DateTimePicker from '@react-native-community/datetimepicker';

//Formater la date
import { format } from "date-fns";

const DatePicker = () => {
    //Système de "hooks"
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    //Se lance quand la date est changée
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        //a revoir
        var formatedCurrentDate = format(currentDate, "dd/MM/yyyy");
        console.log(formatedCurrentDate)
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };
    
    //Permet de définir le mode date ou heure
    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };
    
    //Affiche le rouleau de dates
    const showDatepicker = () => {
        showMode('date');
    };
    
    //Afficher une heure (pas besoin ici pour la date de naissance)
    const showTimepicker = () => {
        showMode('time');
    };
    
    return (
        <View>
            <TouchableOpacity onPress={showDatepicker}>
                <Text>En cours</Text>
            </TouchableOpacity>
            {show && (
                <DateTimePicker
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
                />
            )}
        </View>
    );
};

export default DatePicker;