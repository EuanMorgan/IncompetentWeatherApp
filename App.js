import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,Pressable } from 'react-native';
import { Audio} from "expo-av";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";

let colours = [];

export default function App() {

  useEffect(() => {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true
    });
  }, []);

  const [bg,setBg] = useState("#000000")

  const [rnd, setRnd] = useState(0);

  const [isPlaying,setIsPlaying] = useState(false)

  const soundLibrary = {
    0: require("./assets/1.mp3"),
    1: require("./assets/2.mp3"),
    2: require("./assets/3.mp3"),
    3: require("./assets/4.mp3"),
    4: require("./assets/5.mp3"),
    5: require("./assets/6.mp3"),
    6: require("./assets/7.mp3"),
  };

  

  const resetColours = () => {
    colours = [
    "#1abc9c",
    "#2ecc71",
    "#3498db",
    "#9b59b6",
    "#16a085",
    "#27ae60",
    "#2980b9",
    "#8e44ad",
    "#f1c40f",
    "#e67e22",
    "#e74c3c",
    "#f39c12",
    "#d35400",
    "#c0392b",
  ];
}

  const generateColour = () => {
    if(colours.length === 0){
      resetColours()
    }

    let c = colours[Math.floor(Math.random() * colours.length)];
    colours.splice(colours.indexOf(c),1);
    setBg(c)
  }

  const loadSounds = async() => {

    let random = Math.floor(Math.random()*Object.keys(soundLibrary).length);

    await Audio.Sound.createAsync(soundLibrary[random], {
      shouldPlay: true,
    })
      .then((res) => {
        res.sound.setOnPlaybackStatusUpdate((status) => {
          if (!status.didJustFinish) return;
  
          res.sound.unloadAsync().catch(() => {});
          reset();
          setIsPlaying(false)
        });
      })
      .catch((error) => {});           
  }

  const reset = () => {
    setBg("#000000")
    setRnd(Math.random())
  }

  return (
    <Pressable
      style={[styles.container, { backgroundColor: bg }]}
      onPress={() => {
        if(!isPlaying){
          setIsPlaying(true)
          loadSounds();
          generateColour();
        }
      }}
    >
      <View>
        <Text style={{ fontSize: wp("8%"), color: "white" }}>
          {bg === "#000000" ? "What's the weather?" : "I don't know"}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});