export const initialAudioState = {
  currentSong: null,
  isPlaying: false,
  songList: [],
  currentIndex: 0,
  isShuffle: false,
  songDuration: 0,
  songCurrentTime: 0,
  currentPage: null,
};

export const audioReducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_SONG_FROM_STORAGE":
      return {
        ...state,
        currentSong: action.payload.song,
        isPlaying: false,
      };
    case "SET_CURRENT_SONG":
      return {
        ...state,
        currentSong: action.payload.song,
        currentIndex: action.payload.index,
        isPlaying: true,
      };
    case "TOGGLE_PLAY":
      return {
        ...state,
        isPlaying: !state.isPlaying,
      };
    case "SET_SONG_LIST":
      return {
        ...state,
        songList: action.payload.songList,
        currentPage: action.payload.currentPage,
      };
    case "NEXT_SONG": {
      const nextIndex = state.isShuffle
        ? Math.floor(Math.random() * state.songList.length)
        : (state.currentIndex + 1) % state.songList.length;
      return {
        ...state,
        currentIndex: nextIndex,
        currentSong: state.songList[nextIndex],
        isPlaying: true,
      };
    }
    case "PREVIOUS_SONG": {
      const prevIndex =
        (state.currentIndex - 1 + state.songList.length) %
        state.songList.length;
      return {
        ...state,
        currentIndex: prevIndex,
        currentSong: state.songList[prevIndex],
        isPlaying: true,
      };
    }
    case "SET_SHUFFLE":
      return {
        ...state,
        isShuffle: action.payload,
      };
    case "UPDATE_TIME":
      return {
        ...state,
        songDuration: action.payload.duration,
        songCurrentTime: action.payload.currentTime,
      };
    default:
      return state;
  }
};
