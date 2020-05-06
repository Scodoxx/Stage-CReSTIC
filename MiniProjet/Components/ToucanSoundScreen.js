//AraSound.js
//Écran d'accueil

import React from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
//Pour le lecteur de son
import { Audio } from 'expo-av'

//Icône pour la flèche de retour
import { Ionicons } from '@expo/vector-icons'

const audioToucan = [
    {
        title: "Toucan",
        uri: "https://ia601009.us.archive.org/8/items/EdSheeranPerfectOfficialMusicVideoListenVid.com/Ed_Sheeran_-_Perfect_Official_Music_Video%5BListenVid.com%5D.mp3",
        imageSource: require("../Images/Toucan.jpg")
    }
]

class ToucanSoundScreen extends React.Component {

    state = {
        //Booléen si la musique est train d'être jouée
        isPlaying: false,
        playbackInstance: null,
        //Numéro de la piste
        currentIndex: 0,
        volume: 1.0,
        isBuffering: false
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
                uri: audioToucan[currentIndex].uri
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
            currentIndex < audioToucan.length - 1 ? (currentIndex -= 1) : (currentIndex = 0)
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
            currentIndex < audioToucan.length - 1 ? (currentIndex += 1) : (currentIndex = 0)
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
                    {audioToucan[currentIndex].title}
                </Text>
            </View>
        ) : null
    }

    render() {

        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                    <Ionicons name="ios-arrow-round-back" size={50} color="#FFF"></Ionicons>
                </TouchableOpacity>

                <Image
                    style={styles.albumCover}
                    source={audioToucan[0].imageSource}
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
    back: {
        position: "absolute",
        top: 48,
        left: 28,
        width: 50,
        height: 50,
        borderRadius: 24,
        backgroundColor: "rgba(21, 22, 48, 0.7)",
        alignItems: "center",
        justifyContent: "center"
    },
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

export default ToucanSoundScreen