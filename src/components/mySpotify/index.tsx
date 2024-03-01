import MyTopSpotifyContainer from "./components/container";
import { SpotifyContextProvider } from "./context/spotifyStateProvider";

const MySpotify = () => {
    return (
        <SpotifyContextProvider>
            <MyTopSpotifyContainer />
        </SpotifyContextProvider>
    )
};

export default MySpotify;