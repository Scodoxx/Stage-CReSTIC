//MadiaPlayer.js
//Écran d'accueil

import React from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
//Pour le lecteur de son
import { Audio } from 'expo-av'

//Icône pour la flèche de retour
import { Ionicons } from '@expo/vector-icons'

const audioBirds = [
    {
        title: "Toucan",
        //J'upload l'audio avec mon nom de domaine car je n'ai pas trouvé de site qui fait la même  chose pour l'instant
        uri: "http://www.antoinemarie.com/Toucan.mp3",
        imageSource: require("../Images/Toucan.jpg")
    },
    {
        title: "Ararauna",
        //J'upload l'audio avec mon nom de domaine car je n'ai pas trouvé de site qui fait la même  chose pour l'instant
        uri: "http://www.antoinemarie.com/Toucan.mp3",
        imageSource: require("../Images/Ararauna.jpg")
    },
    {
        title: "Ara",
        //J'upload l'audio avec mon nom de domaine car je n'ai pas trouvé de site qui fait la même  chose pour l'instant
        uri: "http://www.antoinemarie.com/Toucan.mp3",
        imageSource: require("../Images/Ara.jpg")
    }
]

class MediaPlayer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            //Booléen si la musique est train d'être jouée
            isPlaying: false,
            playbackInstance: null,
            //Numéro de la piste
            currentIndex: 0,
            volume: 1.0,
            isBuffering: false
        }
    }

    //On configure le composant Audio
    async componentDidMount() {
        try {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
                playsInSilentModeIOS: true,
                interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
                shouldDuckAndroid: true,
                staysActiveInBackground: true,
                playThroughEarpieceAndroid: true
            })

            this.loadAudio()
        } catch (e) {
            console.log(e)
        }
    }

    onPlaybackStatusUpdate = status => {
        this.setState({
            isBuffering: status.isBuffering
        })
    }

    //On charge le fichier audio sur l'application
    async loadAudio() {
        const {currentIndex, isPlaying, volume} = this.state
        
        try {
            const playbackInstance = new Audio.Sound()
            const source = {
                uri: audioBirds[currentIndex].uri
        }

        const status = {
            shouldPlay: isPlaying,
            volume
        }

        playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)     
        await playbackInstance.loadAsync(source, status, false)
        this.setState({playbackInstance})
        } catch (e) {
            console.log(e)
        }
        
    }

    //Permet de mettre l'audio en pause si on clique sur le bouton
    handlePlayPause = async () => {
        const { isPlaying, playbackInstance } = this.state
        isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync()

        this.setState({
            isPlaying: !isPlaying
        })
    }

    //Permet de passer à l'audio suivant si on clique sur le bouton (dans ce cas là il ne va pas être utile)
    handlePreviousTrack = async () => {
        let { playbackInstance, currentIndex } = this.state
        if (playbackInstance) {
            await playbackInstance.unloadAsync()
            currentIndex < audioBirds.length - 1 ? (currentIndex -= 1) : (currentIndex = 0)
            this.setState({
                currentIndex
            })
            this.loadAudio()
        }
    }

    //Permet de revenir à l'audio précédent si on clique sur le bouton (dans ce cas là il ne va pas être utile)
    handleNextTrack = async () => {
        let { playbackInstance, currentIndex } = this.state
        if (playbackInstance) {
            await playbackInstance.unloadAsync()
            currentIndex < audioBirds.length - 1 ? (currentIndex += 1) : (currentIndex = 0)
            this.setState({
                currentIndex
        })
            this.loadAudio()
        }
    }

    //Rendu du fichier audio (titre, source...) (Inutile dans ce cas là)
    renderFileInfo() {
        const { playbackInstance, currentIndex } = this.state
        return playbackInstance ? (
            <View style={styles.trackInfo}>
                <Text style={[styles.trackInfoText, styles.largeText]}>
                    {audioBirds[currentIndex].title}
                </Text>
            </View>
        ) : null
    }

    render() {
        const { currentIndex } = this.props
        return (
            <View style={styles.container}>

                <Image
                    style={styles.albumCover}
                    source={audioBirds[currentIndex].imageSource}
                />
                <View style={styles.controls}>
                    <TouchableOpacity style={styles.control} onPress={this.handlePreviousTrack}>
                        <Ionicons name='ios-skip-backward' size={48} color='#444' />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.control} onPress={this.handlePlayPause}>
                        {this.state.isPlaying ? (
                        <Ionicons name='ios-pause' size={48} color='#444' />
                        ) : (
                        <Ionicons name='ios-play-circle' size={48} color='#444' />
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.control} onPress={this.handleNextTrack}>
                        <Ionicons name='ios-skip-forward' size={48} color='#444' />
                    </TouchableOpacity>
                </View>
            {this.renderFileInfo()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    albumCover: {
        width: 250,
        height: 250
    },
    trackInfoText: {
        textAlign: 'center',
        flexWrap: 'wrap',
        color: '#550088'
    },
    largeText: {
        fontSize: 22
    },
    smallText: {
        fontSize: 16
    },
    control: {
        margin: 20
    },
    controls: {
        flexDirection: 'row'
    }
})

export default MediaPlayer