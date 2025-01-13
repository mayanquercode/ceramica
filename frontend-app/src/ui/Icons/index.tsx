import { Ionicons } from "@expo/vector-icons";
import { OpaqueColorValue } from "react-native";

interface Props {
    size?: number | undefined
    color?: string | OpaqueColorValue | undefined
}

export function HomeIcon(props:Props){
    return(
        <Ionicons name="home" {...props} />
    )
}

export function SettingsIcon(props:Props){
    return(
        <Ionicons name="settings" {...props} />
    )
}