//BirthdayPicker.js
//Composant pour sélectionner une date de naissance dans le formulaire d'inscription

import React from 'react'
import { View, Text, Picker, StyleSheet } from 'react-native'

class BirthdayPicker extends React.Component {

    //Savoir quelle date est sélectionnée
    static defaultProps = {
        selectedYear: (new Date()).getFullYear(),        //0 = aucune année
        selectedMonth: (new Date()).getMonth(),       //mois qui prends 0 comme valeur (janvier dans ce cas là)
        selectedDay: (new Date()).getDate(),
        minYear: 1900, //Année minimum proposée

        onValueChange: function(year, month, day) { } //fonction appelée dès que la date est modifiée par l'utilisateur
    }

    constructor(props) {
        super(props);

        this.state = {
            year: this.props.selectedYear,
            month: this.props.selectedMonth,
            day: this.props.selectedDay
        }
    }

    //Récupérer les jours en fonction de son mois et année
    //les paramètres month et year sont des entiers
    getNumDaysInMonth(month, year) {
        //Si le mois est égal à février et l'année inconnue, return le nombre de jours max de février
        if (year == 0 && month === 1) {
            return 29
        }

        return (new Date(year, month + 1, 0)).getDate()
    }

    //Permet de retourner tout les jours sans tous les écrire dans le render
    renderDayPickerItems() {
        //On récupère le nombre de jours grâce a notre fonction selon le mois et la date dans le state
        var numDays = this.getNumDaysInMonth(this.state.month, this.state.year)

        var days = []
        //On insère dans le tableau days le nombre de jours correspondant au mois et à l'année sous forme d'éléments Picker
        for (var i = 1; i <= numDays; i++) {
            days.push(<Picker.Item key={i} label={i.toString()} value={i}/>)
        }

        return days
    }

    //Récupérer tout les mois de l'année
    getMonthDate() {
        var locale = "fr-FR" //pour changer la langue des pays (ici en français)

        var nomDeMois = []
        for (var i = 0; i < 12; i++) {
            var date = new Date(2000, i, 15)
            nomDeMois.push(date.toLocaleString(locale, {month: "long"}))
        }
        return nomDeMois
    }

    //Permet de retourner tout les mois sans tous les écrire dans le render
    renderMonthPickerItems() {
        var nomDeMois = this.getMonthDate()

        return nomDeMois.map(function(month, index) {
            return <Picker.Item key={index} label={month} value={index}/>
        })
    }

    //Permet de retourner toutes les années sans toutes les écrire dans le render
    renderYearPickerItems() {
        //Année minimum
        var minYear = this.props.minYear

        //Année maximum (année courante)
        var maxYear = (new Date()).getFullYear()

        //On créé un tableau vide d'année qu'on viendra remplir pour le return
        var years = []
        for (var i = minYear; i <= maxYear; i++) {
            years.push(<Picker.Item key={i} label={i.toString()} value={i}/>)
        }
        //Pour laisser une année vide (pas besoin dans ce cas on veut récupérer la date)
        //years.push(<Picker.Item key={0} label={"----"} value={0}/>)

        return years
    }

    //Quand le jour est changé par l'utilisateur
    onDayValueChanged = (day) => {
        this.setState({ day: day }, () => {
            this.props.onValueChange(this.state.year, this.state.month, this.state.day)
        })
    }

    //Quand le mois est changé par l'utilisateur
    onMonthValueChanged = (month) => {
        //nombre de jours pour une année précise dans un mois donné (celui qui vient d'être sélectionné)
        var maxDays = this.getNumDaysInMonth(month, this.state.year)
        //si le jour sélectionné est maintenant trop haut par rapport à ceux du mois de l'année qui vient d'être sélectionnée, le jour revient à la valeur maxDays, sinon ne change pas
        if (this.state.day > maxDays) {
            var day = maxDays
        }
        else {
            var day = this.state.day
        }

        this.setState({ month: month, day: day }, () => {
            this.props.onValueChange(this.state.year, this.state.month, this.state.day)
        })
    }

    //Quand l'année est changée par l'utilisateur
    onYearValueChanged = (year) => {
        //nombre de jours dans un mois précis pour une année donnée (celle qui vient d'être sélectionnée)
        var maxDays = this.getNumDaysInMonth(year, this.state.month)
        //si le jour sélectionné est maintenant trop haut par rapport à ceux du mois de l'année qui vient d'être sélectionnée, le jour revient à la valeur maxDays, sinon ne change pas
        if (this.state.day > maxDays) {
            var day = maxDays
        }
        else {
            var day = this.state.day
        }

        this.setState({ year: year, day: day }, () => {
            this.props.onValueChange(this.state.year, this.state.month, this.state.day)
        })
    }

    render() {
        return(
            <View style={styles.main_container}>
                <Picker style={styles.dayPicker} selectedValue={this.state.day} onValueChange={this.onDayValueChanged}>
                    {this.renderDayPickerItems()}
                </Picker>

                <Picker style={styles.monthPicker} selectedValue={this.state.month} onValueChange={this.onMonthValueChanged}>
                    {this.renderMonthPickerItems()}
                </Picker>

                <Picker style={styles.yearPicker} selectedValue={this.state.year} onValueChange={this.onYearValueChanged}>
                    {this.renderYearPickerItems()}
                </Picker>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flexDirection: 'row'
    },
    yearPicker: {
        flex: 2
    },
    monthPicker: {
        flex: 3
    },
    dayPicker: {
        flex: 1
    }
})

export default BirthdayPicker