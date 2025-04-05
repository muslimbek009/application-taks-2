import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  FlatList,
  ToastAndroid,
  Platform,
  Alert,
} from "react-native";
import { router } from "expo-router";
import BottomSheetDialog from "@/components/BottomSheet";

// Custom Toast component for web with black and red styling
const Toast = ({ visible, message, onDismiss }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [visible, onDismiss]);

  if (!visible) return null;

  return (
    <View style={styles.toastContainer}>
      <View style={styles.toastContent}>
        <Text style={styles.toastText}>{message}</Text>
      </View>
    </View>
  );
};

// Cross-platform toast function
const showToast = (
  message: string,
  setToastVisible: (visible: boolean) => void,
  setToastMessage: (message: string) => void,
) => {
  if (Platform.OS === "android") {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else if (Platform.OS === "ios") {
    Alert.alert("", message, [{ text: "OK" }], { cancelable: true });
  } else if (Platform.OS === "web") {
    // Web toast
    setToastMessage(message);
    setToastVisible(true);
  } else {
    console.log(message);
  }
};

export default function TasksScreen() {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const rotationAnim = useRef(new Animated.Value(0)).current;

  // State for web toast
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Sample data for RecyclerView (FlatList in React Native)
  const items = [
    { id: "1", name: "Dota 2" },
    { id: "2", name: "League of Legends" },
    { id: "3", name: "Counter-Strike: Global Offensive" },
    { id: "5", name: "Fortnite" },
    { id: "6", name: "Apex Legends" },
  ];

  // 1. BottomSheetDialog functionality
  const toggleBottomSheet = () => {
    setIsBottomSheetVisible(!isBottomSheetVisible);
  };

  // 2. Rotating Image with ObjectAnimator (Animated in React Native)
  const rotateImage = () => {
    Animated.timing(rotationAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      rotationAnim.setValue(0); // Reset for next animation
    });
  };

  const rotation = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  // 3. ClickListener for RecyclerView items
  const handleItemClick = (item: { id: string; name: string }) => {
    showToast(`Clicked: ${item.name}`, setToastVisible, setToastMessage);
  };

  return (
    <View style={styles.container}>
      {/* Web toast component */}
      {Platform.OS === "web" && (
        <Toast
          visible={toastVisible}
          message={toastMessage}
          onDismiss={() => setToastVisible(false)}
        />
      )}

      <Text style={styles.header}>Mobile Application Development Task 2</Text>

      {/* Reordered elements */}
      {/* Task 3: RecyclerView with ClickListener (moved to top) */}
      <Text style={styles.sectionTitle}>Items:</Text>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => handleItemClick(item)}
          >
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
      />

      {/* Task 2: Rotating Image (moved to middle) */}
      <View style={styles.imageContainer}>
        <Animated.Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMtlFoYajHq1AuRRChUQ4oQISSvqn1j5lGVw&s",
          }}
          alt={"Helloworld"}
          style={[styles.image, { transform: [{ rotate: rotation }] }]}
        />
        <TouchableOpacity
          style={styles.redButton}
          onPress={() => {
            rotateImage();
            showToast("Image rotating", setToastVisible, setToastMessage);
          }}
        >
          <Text style={styles.buttonText}>Rotate Image</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom section with two buttons side by side */}
      <View style={styles.bottomSection}>
        {/* Task 1: Bottom Sheet Dialog (moved to bottom left) */}
        <TouchableOpacity
          style={styles.blackButton}
          onPress={toggleBottomSheet}
        >
          <Text style={styles.buttonText}>Menu</Text>
        </TouchableOpacity>

        {/* Task 4: Navigate to ActivityA (moved to bottom right) */}
        <TouchableOpacity
          style={styles.redButton}
          onPress={() => {
            router.push("/activityA");
            showToast(
              "Navigating to Activity A",
              setToastVisible,
              setToastMessage,
            );
          }}
        >
          <Text style={styles.buttonText}>Activity A</Text>
        </TouchableOpacity>
      </View>

      <BottomSheetDialog
        isVisible={isBottomSheetVisible}
        onClose={toggleBottomSheet}
      >
        <View style={styles.bottomSheetContainer}>
          <TouchableOpacity
            style={styles.bottomSheetItem}
            onPress={() => {
              toggleBottomSheet();
              showToast("Profile selected", setToastVisible, setToastMessage);
            }}
          >
            <Text style={styles.bottomSheetText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomSheetItem}
            onPress={() => {
              toggleBottomSheet();
              showToast("Settings selected", setToastVisible, setToastMessage);
            }}
          >
            <Text style={styles.bottomSheetText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomSheetItem}
            onPress={() => {
              toggleBottomSheet();
              showToast("Logout selected", setToastVisible, setToastMessage);
            }}
          >
            <Text style={styles.bottomSheetText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetDialog>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0", // Light gray background
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#000000", // Black text
  },
  // New style for red buttons
  redButton: {
    backgroundColor: "#FF0000", // Red color
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  // New style for black buttons
  blackButton: {
    backgroundColor: "#000000", // Black color
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  bottomSheetContainer: {
    backgroundColor: "#222222", // Dark background
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomSheetItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#333333", // Darker divider
  },
  bottomSheetText: {
    fontSize: 16,
    color: "white",
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 50, // Make image circular
    borderWidth: 2,
    borderColor: "#FF0000", // Red border
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 10,
    color: "#000000", // Black text
  },
  listItem: {
    padding: 15,
    backgroundColor: "#222222", // Dark background
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
  },
  itemText: {
    color: "white", // White text on dark background
  },
  flatList: {},
  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  // Toast styles - positioned at right side
  toastContainer: {
    position: "absolute",
    right: 20,
    top: 50,
    zIndex: 1000,
  },
  toastContent: {
    backgroundColor: "#000000", // Black background
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    borderLeftWidth: 4,
    borderLeftColor: "#FF0000", // Red accent
    minWidth: 200,
    maxWidth: 300,
  },
  toastText: {
    color: "white",
    fontSize: 14,
  },
});
