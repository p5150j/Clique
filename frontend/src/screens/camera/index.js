import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import { Audio } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useIsFocused } from "@react-navigation/core";
import { Feather } from "@expo/vector-icons";

import { SafeAreaView } from "react-native-safe-area-context";
import * as VideoThumbnails from "expo-video-thumbnails";
import * as Haptics from "expo-haptics";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";

export default function CameraScreen() {
  const [hasCameraPermissions, setHasCameraPermissions] = useState(false);
  const [hasAudioPermissions, setHasAudioPermissions] = useState(false);
  const [hasGalleryPermissions, setHasGalleryPermissions] = useState(false);

  const [galleryItems, setGalleryItems] = useState([]);

  const [cameraRef, setCameraRef] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [cameraFlash, setCameraFlash] = useState(
    Camera.Constants.FlashMode.off
  );

  const [isCameraReady, setIsCameraReady] = useState(false);
  const isFocused = useIsFocused();

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermissions(cameraStatus.status == "granted");

      const audioStatus = await Audio.requestPermissionsAsync();
      setHasAudioPermissions(audioStatus.status == "granted");

      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermissions(galleryStatus.status == "granted");

      if (galleryStatus.status == "granted") {
        const userGalleryMedia = await MediaLibrary.getAssetsAsync({
          sortBy: ["creationTime"],
          mediaType: ["video"],
        });
        setGalleryItems(userGalleryMedia.assets);
      }
    })();
  }, []);

  const recordVideo = async () => {
    if (cameraRef) {
      try {
        const options = {
          maxDuration: 60,
          quality: Camera.Constants.VideoQuality["480"],
        };
        const videoRecordPromise = cameraRef.recordAsync(options);
        if (videoRecordPromise) {
          const data = await videoRecordPromise;
          const source = data.uri;
          // console.log(
          //   "this one is comming from the camera recordiong" + source
          // );
          //TODO: pass video uri into save component
          let sourceThumb = await generateThumbnail(source);
          navigation.navigate("savePost", { source, sourceThumb });
        }
      } catch (error) {
        console.warn(error);
      }
    }
  };

  const stopVideo = async () => {
    if (cameraRef) {
      cameraRef.stopRecording();
    }
  };

  const pickFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    // console.log("this one is comming from the meida gallery" + result);

    if (!result.cancelled) {
      let sourceThumb = await generateThumbnail(result.uri);
      navigation.navigate("savePost", { source: result.uri, sourceThumb });
    }
  };

  const generateThumbnail = async (source) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(source, {
        time: 5000,
      });
      return uri;
    } catch (e) {
      console.warn(e);
    }
  };

  if (!hasCameraPermissions || !hasAudioPermissions || !hasGalleryPermissions) {
    return <View></View>;
  }

  return (
    //safe area junk might want to find a better way
    <SafeAreaView style={styles.containerWrapper} edges={["top"]}>
      <View style={styles.container}>
        {isFocused ? (
          <Camera
            ref={(ref) => setCameraRef(ref)}
            style={styles.camera}
            ratio={"16:9"}
            type={cameraType}
            flashMode={cameraFlash}
            onCameraReady={() => setIsCameraReady(true)}
          />
        ) : null}

        <View style={styles.sideBarContainer}>
          <TouchableOpacity
            style={styles.sideBarButton}
            onPress={() =>
              setCameraType(
                cameraType === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              )
            }
          >
            <Feather name="refresh-ccw" size={24} color={"white"} />
            <Text style={styles.iconText}>Flip</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sideBarButton}
            onPress={() =>
              setCameraFlash(
                cameraFlash === Camera.Constants.FlashMode.off
                  ? Camera.Constants.FlashMode.torch
                  : Camera.Constants.FlashMode.off
              )
            }
          >
            <Feather name="zap" size={24} color={"white"} />
            <Text style={styles.iconText}>Flash</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomBarContainer}>
          <View style={{ flex: 1 }}></View>
          <View style={styles.recordButtonContainer}>
            <TouchableOpacity
              disabled={!isCameraReady}
              onLongPress={() => recordVideo()}
              // onLongPress={() =>
              //   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
              // }
              onPressOut={() => stopVideo()}
              // onPressOut={() =>
              //   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
              // }
              style={styles.recordButton}
            />
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => pickFromGallery()}
              style={styles.galleryButton}
            >
              {galleryItems[0] == undefined ? (
                <View></View>
              ) : (
                <Image
                  style={styles.galleryButtonImage}
                  source={{ uri: galleryItems[0].uri }}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
