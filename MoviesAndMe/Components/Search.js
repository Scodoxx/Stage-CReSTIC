import React from 'react'
import { StyleSheet, View, Button, TextInput, FlatList, ActivityIndicator } from 'react-native'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'
import { connect } from 'react-redux'


class Search extends React.Component {

    constructor(props) {
        super(props)
        this.page = 0
        this.totalPages = 0
        this.state = {
            films: [],
            isLoading: false
        }
        this.searchedText = ""
    }

    _loadFilms() {
        if (this.searchedText.length > 0) {
            this.setState({ isLoading: true })
            getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
                this.page = data.page
                this.totalPages = data.total_pages
                this.setState({
                    films: [ ...this.state.films, ...data.results ],
                    isLoading: false
                })
            })
        }
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return(
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large'/>
                </View>
            )
        }
    }

    _searchTextInputChanged(text) {
        this.searchedText = text
    }

    _searchFilms() {
        this.page = 0
        this.totalPages = 0
        this.setState({
            films: []
        }, () => {
            this._loadFilms()
        })
    }

    _displayDetailForFilm = (idFilm) => {
        this.props.navigation.navigate("FilmDetail", { idFilm: idFilm })
    }

    render() {
        return (
            <View style={styles.main_container}>
                <TextInput onSubmitEditing={() => this._searchFilms()} onChangeText={(text) => this._searchTextInputChanged(text)} style={styles.TextInput} placeholder="Titre du film..."/>
                <Button style={{ height : 50 }} title="Rechercher" onPress={() => this._searchFilms()}/>
                <FlatList
                    data={this.state.films}
                    extraData={this.props.favoritesFilm}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) =>
                        <FilmItem
                            film={item}
                            isFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
                            displayDetailForFilm={this._displayDetailForFilm}
                        />
                    }
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if (this.page < this.totalPages) {
                            this._loadFilms()
                        }
                    }}
                />
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    main_container: {
        marginTop: 10,
        flex : 1
    },
    TextInput: {
        marginLeft : 5,
        marginRight : 5,
        height : 50,
        borderColor : '#000000',
        borderWidth : 1,
        paddingLeft : 5,
        borderRadius : 10
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const mapStateToProps = state => {
    return {
        favoritesFilms: state.favoritesFilm
    }
}
export default connect(mapStateToProps)(Search)