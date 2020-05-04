//AraSound.js
//Écran d'accueil

import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, ViewPropTypes } from 'react-native'
//Pour le lecteur de son
import TrackPlayer, {
    useTrackPlayerProgress,
    usePlaybackState,
    useTrackPlayerEvents } from 'react-native-track-player'
//Icône pour la flèche de retour
import { Ionicons } from '@expo/vector-icons'

//On récupère l'audio du chant
const getAudio = require("../Audio/Toucan.mp3")

TrackPlayer.setupPlayer().then(() => {
    // The player is ready to be used
});

//Barre de progression
function ProgressBar() {
    const progress = useTrackPlayerProgress();

    return (
        <View style={styles.progress}>
            <View style={{ flex: progress.position, backgroundColor: "red" }} />
            <View
                style={{
                flex: progress.duration - progress.position,
                backgroundColor: "grey"
                }}
            />
        </View>
    );
}

//Bouton de contrôle du player
function ControlButton({ title, onPress }) {
    return (
        <TouchableOpacity style={styles.controlButtonContainer} onPress={onPress}>
            <Text style={styles.controlButtonText}>{title}</Text>
        </TouchableOpacity>
    );
}

ControlButton.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
};

class ToucanSoundScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            disabled: false
        };
    }

    render() {

        Player.propTypes = {
            style: ViewPropTypes.style,
            onNext: PropTypes.func.isRequired,
            onPrevious: PropTypes.func.isRequired,
            onTogglePlayback: PropTypes.func.isRequired
        };

        Player.defaultProps = {
            style: {}
        };

        const playbackState = usePlaybackState();
        const [trackTitle, setTrackTitle] = useState("");
        const [trackArtwork, setTrackArtwork] = useState();
        const [trackArtist, setTrackArtist] = useState("");
        useTrackPlayerEvents(["playback-track-changed"], async event => {
            if (event.type === TrackPlayer.TrackPlayerEvents.PLAYBACK_TRACK_CHANGED) {
                const track = await TrackPlayer.getTrack(event.nextTrack);
                const { title, artist, artwork } = track || {};
                setTrackTitle(title);
                setTrackArtist(artist);
                setTrackArtwork(artwork);
            }
        });

        const { style, onNext, onPrevious, onTogglePlayback } = props;

        var middleButtonText = "Play";

        if (
            playbackState === TrackPlayer.STATE_PLAYING ||
            playbackState === TrackPlayer.STATE_BUFFERING
        ) {
            middleButtonText = "Pause";
        }

        return (
            <View style={styles.card}>
                <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                    <Ionicons name="ios-arrow-round-back" size={50} color="#FFF"></Ionicons>
                </TouchableOpacity>

                <ProgressBar />
                <Text style={styles.title}>{trackTitle}</Text>
                <Text style={styles.artist}>{trackArtist}</Text>
                <View style={styles.controls}>
                    <ControlButton title={"<<"} onPress={onPrevious} />
                    <ControlButton title={middleButtonText} onPress={onTogglePlayback} />
                    <ControlButton title={">>"} onPress={onNext} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        width: "80%",
        elevation: 1,
        borderRadius: 4,
        shadowRadius: 2,
        shadowOpacity: 0.1,
        alignItems: "center",
        shadowColor: "black",
        backgroundColor: "white",
        shadowOffset: { width: 0, height: 1 }
    },
    cover: {
        width: 140,
        height: 140,
        marginTop: 20,
        backgroundColor: "grey"
    },
    progress: {
        height: 1,
        width: "90%",
        marginTop: 10,
        flexDirection: "row"
    },
    title: {
        marginTop: 10
    },
    artist: {
        fontWeight: "bold"
    },
    controls: {
        marginVertical: 20,
        flexDirection: "row"
    },
    controlButtonContainer: {
        flex: 1
    },
    controlButtonText: {
        fontSize: 18,
        textAlign: "center"
    },
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
    }
})

export default ToucanSoundScreen