import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PostsState {
  posts: Post[];
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  currentPage: number;
  postsPerPage: number;
  searchQuery: string;
}

const initialState: PostsState = {
  posts: [],
  status: 'idle',
  currentPage: 1,
  postsPerPage: 10,
  searchQuery: '',
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setCurrentPage, setSearchQuery } = postsSlice.actions;
export default postsSlice.reducer;
