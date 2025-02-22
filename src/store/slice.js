import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/user/profile');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  user: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem("authToken");
      localStorage.removeItem("userDetails");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    });
    builder.addCase(fetchUserProfile.rejected, (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem("authToken");
      localStorage.removeItem("userDetails");
    });
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
