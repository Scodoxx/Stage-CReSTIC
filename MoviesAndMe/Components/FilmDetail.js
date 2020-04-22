import React from 'react'
import numeral from 'numeral'
import moment from 'moment'
import { StyleSheet, View, Button, ActivityIndicator, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi'
import { connect } from 'react-redux'

class FilmDetail extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            film: undefined,
            isLoading: true
        }
    }

    componentDidMount() {
        getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
            this.setState({
                film: data,
                isLoading: false
            })
        })
    }

    _displayFavoriteImage() {
        var sourceImage = require('C:/ReactNative/MoviesAndMe/Images/ic_favorite_border.png')
        if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1 ) {
            sourceImage = require('C:/ReactNative/MoviesAndMe/Images/ic_favorite.png')
        }
        return (
            <Image
                source={sourceImage}
                style={styles.favorite_image}
            />
        )
    }

    _toggleFavorite() {
        const action = { type: "TOGGLE_FAVORITE", value: this.state.film }
        this.props.dispatch(action)
    }

    componentDidUpdate() {
        console.log(this.props.favoritesFilm);
    }

    _displayFilm() {
        const film = this.state.film
        if (film != undefined) {
            return (
                <ScrollView style={styles.scrollview_container}>
                    <Image
                        style={styles.image}
                        source={{uri: getImageFromApi(film.backdrop_path)}}
                    />
                    <Text style={styles.title_text}>{film.title}</Text>
                    <TouchableOpacity
                        style={styles.favotite_container}
                        onPress={ () => this._toggleFavorite()}>
                        {this._displayFavoriteImage()}
                    </TouchableOpacity>
                    <Text style={styles.description_text}>{film.overview}</Text>
                    <Text style={styles.other_text}>Sorti le {moment(film.release_date).format('L')}</Text>
                    <Text style={styles.other_text}>Note : {film.vote_average}</Text>
                    <Text style={styles.other_text}>Nombre de votes : {film.vote_count}</Text>
                    <Text style={styles.other_text}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
                    <Text style={styles.other_text}>Genre(s) : {film.genres.map(function(genre){
                            return genre.name;
                        }).join(" / ")}
                    </Text>
                    <Text style={styles.other_text}>Compagnie(s) : {film.production_companies.map(function(company){
                            return company.name;
                        }).join(" / ")}
                    </Text>
                </ScrollView>
            )
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

    render() {
        const idFilm = this.props.navigation.state.params.idFilm
        return (
            <View style={styles.main_container}>
                {this._displayFilm()}
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        margin: 5
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollview_container: {
        flex: 1
    },
    image: {
        height: 169
    },
    title_text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        margin: 10,
        flexWrap: 'wrap',
        color: '#000000'
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666',
        marginBottom: 15
    },
    other_text: {
        fontSize: 14
    },
    favotite_container: {
        alignItems: 'center'
    },
    favorite_image: {
        width: 40,
        height: 40
    }
})

const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}
export default connect(mapStateToProps)(FilmDetail)