import { router } from "expo-router";
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from "react-native";

const { width } = Dimensions.get("screen");
const widthBox = width / 2; // Ancho de las cajas para dos columnas

interface Props {
    code: string;
    name: string;
    image: string;
}

function CategoryBox({ code, image, name }: Props) {
    const handlePress = () => {
        // Pasar parámetros con state a la siguiente página
        router.push({
            pathname: '/kardex',
            params: { code, name, image } // Pasar parámetros como query
        });
    };

    return (
        <TouchableOpacity 
            style={styles.boxCategory}
            onPress={handlePress}
        >
            {image ? (
                <Image source={{ uri: image }} style={styles.imageBackground} />
            ) : (
                <View style={styles.placeholderBackground} />
            )}
            <View style={styles.textContainer}>
                <Text style={styles.codeText}>{code}</Text>
                <Text style={styles.nameText}>{name}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    boxCategory: {
        width: widthBox - 15,
        height: widthBox - 15,
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 10,
        position: "relative",
        backgroundColor: "#e0e0e0",
    },
    imageBackground: {
        ...StyleSheet.absoluteFillObject, // Llena todo el contenedor
        resizeMode: "cover",
    },
    placeholderBackground: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#ccc",
    },
    textContainer: {
        position: "absolute",
        bottom: 10,
        left: 10,
    },
    codeText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
        textShadowColor: "rgba(0, 0, 0, 0.5)",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    nameText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
        textShadowColor: "rgba(0, 0, 0, 0.5)",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
});

export default CategoryBox;
