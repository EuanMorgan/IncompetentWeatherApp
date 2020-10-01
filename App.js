import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View,Pressable } from 'react-native';
import {Audio} from "expo-av";

export default function App() {

  const [bg,setBg] = useState("#000000")

  let colours = []

  const [rnd,setRnd] = useState(0)

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
    let c = colours[Math.floor(Math.random() * colours.length)];
    colours.splice(colours.indexOf(c),1);
    setBg(c)
  }

  const loadSounds = async() => {

    let random = Math.floor(Math.random()*3);
    let playbackObject1
    random = 1;
    switch(random){
      case 0:
         playbackObject1 = await Audio.Sound.createAsync(
          require("./assets/1.mp3")
        );
        break;
      case 1:
        playbackObject1 = await Audio.Sound.createAsync(
          require("./assets/2.mp3")
        )
        break;
      case 2:
        playbackObject1 = await Audio.Sound.createAsync(
          require("./assets/3.mp3")
        );
        break;
    }

    playbackObject1.sound.replayAsync();
    if(random === 1){
      something()
    }else if(random ===0){
      festive()
      
    }else if(random === 2){
      setTimeout(()=>{
        setBg("#000000")
        setRnd(Math.random())
      },3500)
    }
    
  }

  const something = () => {
    setTimeout(() => {
      generateColour();
    }, 4400);
    setTimeout(() => {
      generateColour();
    }, 5000);
    setTimeout(() => {
      generateColour();
    }, 5600);
    setTimeout(() => {
      generateColour();
    }, 6200);
    setTimeout(() => {
      generateColour();
    }, 6900);
    setTimeout(() => {
      generateColour();
    }, 7400);
    setTimeout(() => {
      setBg("#000000");
      setRnd(Math.random())
    }, 7900);
  }

  const festive = () => {
    setTimeout(() => {
      generateColour();
    }, 700);
    setTimeout(() => {
      generateColour();
    }, 1400);
    setTimeout(() => {
      generateColour();
    }, 2100);
    setTimeout(() => {
      generateColour();
    }, 2900);
    setTimeout(() => {
      generateColour();
    }, 3600);
    setTimeout(() => {
      generateColour();
    }, 4300);
    setTimeout(() => {
      generateColour();
    }, 5000);
    setTimeout(()=>{
      generateColour()
    },5700)
    setTimeout(() => {
      generateColour();
    }, 6400);
    setTimeout(() => {
      generateColour();
    }, 7100);
    setTimeout(() => {
      generateColour();
    }, 7900);
    setTimeout(() => {
      setBg("#000000")
      setRnd(Math.random())
    }, 9000);
  }

  return (
    <Pressable
      style={[styles.container, { backgroundColor: bg }]}
      onPress={() => {
        resetColours();
        loadSounds();
        generateColour();
      }}
    >
      <View>
        <Text style={{ fontSize: 40, color: "white" }}>
          {bg === "#000000" ? "What's the weather?" : "Dunno mate"}
        </Text>
        <StatusBar style="auto" />
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
