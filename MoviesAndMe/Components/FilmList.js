from React import 'react'
import { StyleSheet, FlatList } from 'react-native'
import FilmItem from './FilmItem'
import { connect } from 'react-redux'

class FilmList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            films: []
        }
    }

    _displayDetailForFilm = (idFilm) => {
        console.log("Display film " + idFilm)
        this.props.navigation.navigate('FilmDetail', {idFilm: idFilm})
    }

    render() {
        return (
            <Flatlist
                style={styles.list}
                data={this.props.films}
                extraDatas={this.props.favoritesFilm}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <FilmItem
                            film={item}
                            isFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
                            displayDetailForFilm={this._displayDetailForFilm}
                        />
                )}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if (this.page < this.totalPages) {
                            this._loadFilms()
                        }
                    }}
                />
        )
    }

}

const styles = StyleSheet.create({
    list: {
        flex: 1
    }
})