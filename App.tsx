import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { Provider } from "react-redux";
import store from "@/store/store";
import PostsList from "@/components/PostList";

export default function App() {
  return (
    <Provider store={store}>
      <PostsList />
      <StatusBar style="auto" />
    </Provider>
  );
}
