import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PostsState {
  posts: Post[];
  status: "idle" | "loading" | "failed" | "succeeded";
  currentPage: number;
  postsPerPage: number;
  searchQuery: string;
  sortKey: "id" | "title" | "body";
}

const initialState: PostsState = {
  posts: [],
  status: "idle",
  currentPage: 1,
  postsPerPage: 10,
  searchQuery: "",
  sortKey: "id",
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return response.data;
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSortKey: (state, action: PayloadAction<"id" | "title" | "body">) => {
      state.sortKey = action.payload;
      // Сортировка постов в зависимости от sortKey
      state.posts.sort((a, b) => {
        if (state.sortKey === "id") return a.id - b.id;
        if (state.sortKey === "title") return a.title.localeCompare(b.title);
        if (state.sortKey === "body") return a.body.localeCompare(b.body);
        return 0;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.status = "succeeded";
        state.posts = action.payload;
        // Сортировка постов сразу после загрузки, в зависимости от текущего sortKey
        state.posts.sort((a, b) => {
          if (state.sortKey === "id") return a.id - b.id;
          if (state.sortKey === "title") return a.title.localeCompare(b.title);
          if (state.sortKey === "body") return a.body.localeCompare(b.body);
          return 0;
        });
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setCurrentPage, setSearchQuery, setSortKey } =
  postsSlice.actions;
export default postsSlice.reducer;
