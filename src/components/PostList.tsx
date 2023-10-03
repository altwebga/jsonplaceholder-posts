import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, setCurrentPage, setSearchQuery, Post } from '@/store/postsSlice';
import { RootState, AppDispatch } from '@/store/store';
import { View, Text, TextInput, Button, FlatList, ActivityIndicator } from 'react-native';


const PostsList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const status = useSelector((state: RootState) => state.posts.status);
  const currentPage = useSelector((state: RootState) => state.posts.currentPage);
  const postsPerPage = useSelector((state: RootState) => state.posts.postsPerPage);
  const searchQuery = useSelector((state: RootState) => state.posts.searchQuery);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  const paginatedPosts = posts
    .filter(post => post.title.includes(searchQuery) || post.body.includes(searchQuery))
    .slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handlePageChange = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const handleSearchChange = (text: string) => {
    dispatch(setSearchQuery(text));
  };

  return (
    <View style={{ flex: 1, padding: 16, marginTop: 30 }}>
      <TextInput
        style={{ borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 8 }}
        value={searchQuery}
        onChangeText={handleSearchChange}
        placeholder="Search..."
      />
      {status === 'loading' && <ActivityIndicator />}
      {status === 'failed' && <Text>Error loading posts</Text>}
      {status === 'succeeded' && (
        <FlatList
          data={paginatedPosts}
          keyExtractor={(post) => post.id.toString()}
          renderItem={({ item }: { item: Post }) => (
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
              <Text>{item.body}</Text>
            </View>
          )}
        />
      )}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {[...Array(totalPages).keys()].map((num) => (
          <Button key={num} title={String(num + 1)} onPress={() => handlePageChange(num + 1)} />
        ))}
      </View>
    </View>
  );
};

export default PostsList;