import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [
    {
      id: 1,
      date: new Date().toLocaleString(),
      title: 'Новость 1',
      approved: true,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab accusamus accusantium aut dolor doloremque eveniet, explicabo iure minus natus optio quasi quisquam, sunt temporibus totam ullam veniam. Est, qui!Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab accusamus accusantium aut dolor doloremque eveniet, explicabo iure minus natus optio quasi quisquam, sunt temporibus totam ullam veniam. Est, qui'
    },
    {
      id: 2,
      date: new Date().toLocaleString(),
      title: 'Новость 2',
      approved: true,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab accusamus accusantium aut dolor doloremque eveniet, explicabo iure minus natus optio quasi quisquam, sunt temporibus totam ullam veniam. Est, qui!'
    },
  ]
};

export const newsReducer = createSlice({
  name: 'news',
  initialState,
  reducers: {
    addNew: (state, action) => {
      const date = new Date().toLocaleString();
      state.data = [
        {
          ...action.payload,
          id: state.data.length ? state.data.length + 1 : 1,
          date,
          approved: false,
        },
        ...state.data,
      ]
    },
    approveNew: (state, action) => {
      const index = state.data.findIndex(i => i.id === action.payload);
      if (index !== -1) {
        state.data[index].approved = true;
      }
    },
    removeNew: (state, action) => {
      const index = state.data.findIndex(i => i.id === action.payload);
      if (index !== -1) {
        console.log(index)
        state.data = state.data.filter((i, k) => k !== index);
      }
    }
  },
});

export const { addNew, approveNew, removeNew } = newsReducer.actions;
export const selectNewsData = (state) => state.news.data;


export default newsReducer.reducer;
