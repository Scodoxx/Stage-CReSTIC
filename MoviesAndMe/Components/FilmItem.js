import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'

class FilmItem extends React.Component {
    render() {
        const { film, displayDetailForFilm } = this.props
        return (
            <TouchableOpacity
                onPress={() => displayDetailForFilm(film.id)}
                style={styles.main_container}>
                <Image
                    style={styles.image}
                    source={{uri: getImageFromApi(film.poster_path)}}
                />
                <View style={styles.container}>
                    <View style={styles.header_container}>
                        <Text style={styles.title_text}>{film.title}</Text>
                        <Text style={styles.rate_text}>{film.vote_average}</Text>
                    </View>
                    <View style={styles.desc_container}>
                        <Text style={styles.desc_text} numberOfLines={6}>{film.overview}</Text>
                    </View>
                    <View style={styles.date_container}>
                        <Text style={styles.date_text}>Sorti le {film.release_date}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        height: 190,
        flexDirection: 'row'
    },
    image: {
        width: 120,
        height: 180,
        margin: 5,
        backgroundColor: 'gray'
    },
    container: {
        flexDirection: 'column',
        flex: 2
    },
    header_container: {
        flexDirection: 'row',
        flex: 3
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5
    },
    rate_text: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#666666'
    },
    desc_container: {
        flex: 7
    },
    desc_text: {
        fontStyle: 'italic',
        color: '#666666'
    },
    date_container: {
        flex: 1
    },
    date_text: {
        textAlign: "right",
        fontSize: 14
    }
})

export default FilmItem