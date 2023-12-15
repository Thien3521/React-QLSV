const initialState = { keyword: "", list: [] };
export default function studentReducer(state = initialState, action) {
  switch (action.type) {
    case "search":
      return { keyword: action.payload.keyword, list: action.payload.list };
    default:
      return state;
  }
}