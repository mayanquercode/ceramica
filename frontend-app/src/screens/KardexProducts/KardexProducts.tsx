import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import ProfileAvatarCard from "@/src/components/ProfileAvatarCard";
import ViewCategories from "@/src/components/ViewCategories";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { useGetAllCategories } from "@/src/hooks";
import { Category } from "@/src/types";

// Componente para mostrar el estado de carga
const LoadingIndicator = () => (
    <View style={s.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
    </View>
);

// Componente para manejar mensajes de error o estado vacío
const ErrorMessage = ({ message }: { message: string }) => (
    <View style={s.loader}>
        <Text style={s.errorText}>{message}</Text>
    </View>
);

function KardexProducts() {
    const [searchText, setSearchText] = useState("");
    const { categories, loading, error } = useGetAllCategories();
    const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);

    // Filtrar las categorías cuando cambie el texto de búsqueda o las categorías
    useEffect(() => {
        if (searchText === "") {
            setFilteredCategories(categories || []); // Mostrar todas las categorías
        } else {
            const results = categories.filter((category) =>
                category.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredCategories(results); // Actualizar las categorías filtradas
        }
    }, [searchText, categories]);

    const handleSearchChange = (text: string) => {
        setSearchText(text);
    };

    const noResults = searchText && filteredCategories.length === 0;

    return (
        <View style={s.screen}>
            <View style={s.header}>
                <ProfileAvatarCard />
            </View>

            <View style={s.container}>
                {/* <Text style={s.title}>Kardex</Text> */}
                {/* Componente de búsqueda */}
                {/* <View style={s.searchContainer}>
                    <Ionicons name="search" size={20} color="#9e9e9e" style={s.searchIcon} />
                    <TextInput
                        style={s.searchInput}
                        placeholder="Buscar categorías..."
                        placeholderTextColor="#9e9e9e"
                        value={searchText}
                        onChangeText={handleSearchChange}
                        clearButtonMode="while-editing"
                    />
                </View> */}
            </View>

            {/* Mostrar mensaje de carga o error si las categorías no están disponibles */}
            {loading ? (
                <LoadingIndicator />
            ) : error ? (
                <ErrorMessage message="Hubo un error al cargar las categorías" />
            ) : noResults ? (
                <View style={s.loader}>
                    <Text style={s.errorText}>No se encontraron resultados</Text>
                </View>
            ) : (
                // Mostrar las categorías filtradas o todas las categorías
                <ScrollView contentContainerStyle={s.scrollContent}>
                    <ViewCategories categories={filteredCategories} />
                </ScrollView>
            )}

            
<StatusBar backgroundColor="#007AFF" />
        </View>
    );
}

const s = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        color: "red",
        fontSize: 16,
        fontWeight: "bold",
    },
    screen: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
    },
    header: {
        marginBottom: 20,
        backgroundColor: '#007AFF',
        paddingVertical: 15
    },
    container: {
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 10,
    },
    scrollContent: {
        flexGrow: 1, // Asegura que el contenido se ajuste al ScrollView
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: 10,
        height: 50,
        paddingHorizontal: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: "#333",
    },
});


export default KardexProducts