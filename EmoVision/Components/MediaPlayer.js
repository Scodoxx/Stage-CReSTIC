//MediaPlayer.js
//Permet de lancer des pistes de sons

import React from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
//Pour le lecteur de son
import { Audio } from 'expo-av'

//Icône pour la flèche de retour
import { Ionicons } from '@expo/vector-icons'

class MediaPlayer extends React.Component {
    _isMounted = false

    //Savoir quelle date est sélectionnée
    static defaultProps = {
        audio: [] //Piste audio vide pour l'instant
    }

    constructor(props) {
        super(props)
        this.state = {
            audio: this.props.audio, //piste audio utilisée
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
        this._isMounted = true
        if(this._isMounted) {
            try {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: false,
                    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
                    playsInSilentModeIOS: true,
                    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
                    shouldDuckAndroid: true,
                    staysActiveInBackground: false,
                    playThroughEarpieceAndroid: true
                })

                this.loadAudio()
            } catch (e) {
                console.log(e)
            }
        }
    }

    componentWillUnmount() {
        this.setState({_isMounted: false})
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
                uri: this.state.audio[currentIndex].uri
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
            currentIndex < this.state.audio.length - 1 ? (currentIndex -= 1) : (currentIndex = 0)
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
            currentIndex < this.state.audio.length - 1 ? (currentIndex += 1) : (currentIndex = 3)
            this.setState({
                currentIndex
            })
            this.loadAudio()
        }
    }

    renderFileInfo() {
        const { playbackInstance, currentIndex } = this.state
        return playbackInstance ? (
            <View style={styles.trackInfo}>
                <Text style={[styles.trackInfoText, styles.largeText]}>
                    {this.state.audio[currentIndex].title}
                </Text>
            </View>
        ) : null
    }

    render() {
        return (
            <View style={styles.container}>
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
        alignItems: 'center',
        justifyContent: 'center'
    },
    albumCover: {
        width: 250,
        height: 250,
        borderRadius: 20
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