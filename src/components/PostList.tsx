import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPosts,
  setCurrentPage,
  setSearchQuery,
  setSortKey,
  Post,
} from "@/store/postsSlice";
import { RootState, AppDispatch } from "@/store/store";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

const PostsList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const status = useSelector((state: RootState) => state.posts.status);
  const currentPage = useSelector(
    (state: RootState) => state.posts.currentPage
  );
  const postsPerPage = useSelector(
    (state: RootState) => state.posts.postsPerPage
  );
  const searchQuery = useSelector(
    (state: RootState) => state.posts.searchQuery
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  const paginatedPosts = posts
    .filter(
      (post) =>
        post.title.includes(searchQuery) || post.body.includes(searchQuery)
    )
    .slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handlePageChange = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const handleSearchChange = (text: string) => {
    dispatch(setSearchQuery(text));
  };

  const handleSortChange = (sortKey: "id" | "title" | "body") => {
    dispatch(setSortKey(sortKey));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={handleSearchChange}
        placeholder="Search..."
      />
      <View style={styles.sortContainer}>
        <Button title="Sort by ID" onPress={() => handleSortChange("id")} />
        <Button
          title="Sort by Title"
          onPress={() => handleSortChange("title")}
        />
        <Button title="Sort by Body" onPress={() => handleSortChange("body")} />
      </View>
      {status === "loading" && <ActivityIndicator />}
      {status === "failed" && <Text>Error loading posts</Text>}
      {status === "succeeded" && (
        <FlatList
          data={paginatedPosts}
          keyExtractor={(post) => post.id.toString()}
          renderItem={({ item }: { item: Post }) => (
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
              <Text>{item.body}</Text>
            </View>
          )}
        />
      )}
      <View style={styles.paginationContainer}>
        {[...Array(totalPages).keys()].map((num) => (
          <Button
            key={num}
            title={String(num + 1)}
            onPress={() => handlePageChange(num + 1)}
          />
        ))}
      </View>
    </View>
  );
};

export default PostsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 30,
  },
  searchInput: {
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  sortContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
