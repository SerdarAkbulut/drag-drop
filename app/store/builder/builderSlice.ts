import { createSlice } from "@reduxjs/toolkit";

export interface BuilderState {
  project: {
    name: string;
    version: string;
    created: string;
    lastModified: string;
  };
  canvas: {
    width: 1200;
    height: 800;
    grid: {
      enabled: boolean;
      size: number;
      snap: boolean;
    };
  };
  elements: Array<{
    id: string;
    type: string;
    content: { text: string } | { object: string };
    position: {
      x: number | string;
      y: number | string;
      width: number | string;
      height: number | string;
      minHeight?: number;
      zIndex: number;
      fixed?: boolean;
    };
    responsive?: [];
  }>;
  metadata: {
    totalElements: number;
    exportFormat: string;
    exportVersion: string;
  };
}

const initialState: BuilderState = {
  project: {
    name: "Test Builder Layout",
    version: "1.0",
    created: new Date().toISOString(),
    lastModified: new Date().toISOString(),
  },
  canvas: {
    width: 1200,
    height: 800,
    grid: {
      enabled: true,
      size: 10,
      snap: true,
    },
  },
  elements: [],
  metadata: {
    totalElements: 0,
    exportFormat: "json",
    exportVersion: "2.0",
  },
};

export const builderSlice = createSlice({
  name: "builder",
  initialState,
  reducers: {
    addElement: (state, action) => {
      const element = action.payload;

      state.elements.push({
        id: element.id,
        type: element.type,
        content: element.content ?? {},
        position: {
          x: element.x,
          y: element.y,
          width: element.width,
          height: element.height,
          minHeight: element.minHeight,
          zIndex: element.zIndex,
          fixed: element.fixed ?? false,
        },
        responsive: element.responsive ?? {},
      });

      state.metadata.totalElements = state.elements.length;
      state.project.lastModified = new Date().toISOString();
    },

    updateElementPosition: (state, action) => {
      const { id, x, y } = action.payload;
      const element = state.elements.find((e) => e.id === id);
      if (element) {
        element.position.x = x;
        element.position.y = y;
      }
    },

    updateElementSize: (state, action) => {
      const { id, width, height } = action.payload;
      const element = state.elements.find((e) => e.id === id);
      if (element) {
        element.position.width = width;
        element.position.height = height;
      }
    },

    deleteElement: (state, action) => {
      const id = action.payload;
      state.elements = state.elements.filter((e) => e.id !== id);
      state.metadata.totalElements = state.elements.length;
    },
    updateElementText: (state, action) => {
      const { id, content } = action.payload;
      const element = state.elements.find((el) => el.id === id);
      if (element) {
        element.content = { ...element.content, ...content };
      }
    },
  },
});

export const {
  addElement,
  updateElementPosition,
  updateElementSize,
  deleteElement,
  updateElementText,
} = builderSlice.actions;

export default builderSlice.reducer;
