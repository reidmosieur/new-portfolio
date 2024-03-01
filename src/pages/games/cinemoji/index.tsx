import { SampleCodeContextProvider } from "@/components/sample/context/samplesStateProvider";
import Cinemoji from "./components/cinemoji";
import { CinemjoiContextProvider } from "./context/cinemojiStateProvider";
import FullScreenCentered from "@/components/container/fullScreenCentered";

const Index = () => {
    return (
        <SampleCodeContextProvider>
            <CinemjoiContextProvider>
                <FullScreenCentered>
                    <Cinemoji />
                </FullScreenCentered>
            </CinemjoiContextProvider>
        </SampleCodeContextProvider>
    )
}

export default Index;