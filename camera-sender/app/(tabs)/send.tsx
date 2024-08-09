import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, TouchableOpacity, Button } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {SafeAreaView, TextInput} from 'react-native';
import React from 'react';
import {useState} from 'react';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';


//import {ImagePickerComponent } from '@/components/ImagePickerComponent';
import ImagePicker2  from '@/components/ImagePicker2';

export default function ChooseServerScreen() {
    const [text, onChangeText] = React.useState('Useless Text');


    const pickDocument = async () => {
      let result = await DocumentPicker.getDocumentAsync({});
      console.log(result.uri);
      console.log(result);
    };


    const [selectedImage, setSelectedImage] = useState(null);

    const pickImageAsync = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
        base64: true, // makes the data available too
        exif: true,
      });
  
      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
        //console.log(selectedImage);
        //console.log(result.assets[0]);
        const headers = {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        };
        // POST AS JSON TO SERVER
        //fetch('http://nc.mmkm.net:3000/upj', {method: "POST", headers: headers, body: JSON.stringify(result.assets[0])}).then(resp => console.log(resp))
        const headersform = {
          'Access-Control-Allow-Origin': '*',
          //'Content-Type': 'application/json',
        };
        const data = result.assets[0];
        //FETCH LOCAL URI
        //fetch(result.assets[0].uri).then(resp => sendData(resp, data)).then(r => console.log(r))
        //async function sendData(fetch_uri_resp, data) {
          //const img = await fetch_uri_resp.blob();
          //console.log(fetch_uri_resp);
          //console.log();
          const formData = new FormData();
          for (const name in data) {
            //if (name === 'uri') {
             // continue
            //};;
            formData.append(name, data[name]);
          }
          //formData.append('filedata', img);
          console.log('running fetch post ');
          fetch('http://nc.mmkm.net:3000/up', {method: "POST", headers: headersform, body: formData}).then(resp => console.log(resp))
        //} 

      } else {
        alert('You did not select any image.');
      }
    };
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>
      <SafeAreaView>
        
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
   
 
      <ThemedView style={styles.button}>
        <TouchableOpacity>
          
          <Button
            title="upload your file"
            color="black"
            onPress={pickDocument}
          />
        </TouchableOpacity>
      </ThemedView>
<ThemedText>&nbsp;</ThemedText>
      <ThemedView style={styles.button}>
        <TouchableOpacity>
          
          <Button
            title="upload an image"
            color="black"
            onPress={pickImageAsync}
          />
        </TouchableOpacity>
      </ThemedView>



    </SafeAreaView>

      <ThemedText>This app includes example code to help you get started.</ThemedText>
      <Collapsible title="File-based routing">
        <ThemedText>
          This app has two screens:{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
        </ThemedText>
        <ThemedText>
          The layout file in <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
          sets up the tab navigator.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Android, iOS, and web support">
        <ThemedText>
          You can open this project on Android, iOS, and the web. To open the web version, press{' '}
          <ThemedText type="defaultSemiBold">w</ThemedText> in the terminal running this project.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Images">
        <ThemedText>
          For static images, you can use the <ThemedText type="defaultSemiBold">@2x</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to provide files for
          different screen densities
        </ThemedText>
        <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Custom fonts">
        <ThemedText>
          Open <ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText> to see how to load{' '}
          <ThemedText style={{ fontFamily: 'SpaceMono' }}>
            custom fonts such as this one.
          </ThemedText>
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Light and dark mode components">
        <ThemedText>
          This template has light and dark mode support. The{' '}
          <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook lets you inspect
          what the user's current color scheme is, and so you can adjust UI colors accordingly.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Animations">
        <ThemedText>
          This template includes an example of an animated component. The{' '}
          <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> component uses
          the powerful <ThemedText type="defaultSemiBold">react-native-reanimated</ThemedText> library
          to create a waving hand animation.
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText>
              The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}
              component provides a parallax effect for the header image.
            </ThemedText>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
