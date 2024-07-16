import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [
    {
        source: {
          position: 'end',
          index: 5,
        },
        destionation: {
          position: 'start',
          index: 6,
        }
      },
      {
        source: {
          position: 'end',
          index: 8,
        },
        destionation: {
          position: 'start',
          index: 9,
        }
      },
      {
        source: {
          position: 'end',
          index: 9,
        },
        destionation: {
          position: 'start',
          index: 10,
        }
      },
      {
        source: {
          position: 'end',
          index: 10,
        },
        destionation: {
          position: 'start',
          index: 12,
        }
      },
      {
        source: {
          position: 'end',
          index: 12,
        },
        destionation: {
          position: 'start',
          index: 13,
        }
      },
      {
        source: {
          position: 'end',
          index: 13,
        },
        destionation: {
          position: 'start',
          index: 14,
        }
      },
      {
        source: {
          position: 'end',
          index: 14,
        },
        destionation: {
          position: 'start',
          index: 15,
        }
      },
      {
        source: {
          position: 'end',
          index: 15,
        },
        destionation: {
          position: 'start',
          index: 16,
        }
      },      {
        source: {
          position: 'end',
          index: 19,
        },
        destionation: {
          position: 'start',
          index: 20,
        }
      },
      {
        source: {
          position: 'end',
          index: 20,
        },
        destionation: {
          position: 'start',
          index: 21,
        }
      },
  ],
}

export const linksDataSlice = createSlice({
  name: 'linksData',
  initialState,
  reducers: {
    addlink:(state,actions)=>{
      state.value.push(actions.payload);
    },

  },
})

// Action creators are generated for each case reducer function
export const { addlink } = linksDataSlice.actions

export default linksDataSlice.reducer