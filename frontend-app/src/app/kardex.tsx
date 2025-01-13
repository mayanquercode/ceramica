import { router, useLocalSearchParams } from "expo-router";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    TextInput,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { KardexProduct, KardexResponse } from "../types";

const { width } = Dimensions.get("screen");

const LoadingIndicator = () => (
    <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007AFF" />
    </View>
);

const ErrorMessage = ({ message }: { message: string }) => (
    <View style={styles.loader}>
        <Text style={styles.errorText}>{message}</Text>
    </View>
);

export default function Kardex() {
    const params = useLocalSearchParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [kardex, setKardex] = useState<KardexResponse | null>(null);
    const [page, setPage] = useState<number>(1);
    const [searchText, setSearchText] = useState("");
    const [filteredProducts, setFilteredProducts] = useState<KardexProduct[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `http://localhost:3000/api/v1/products/category/${params.code}?page=${page}`
                );
                if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
                const data: KardexResponse = await response.json();
                setKardex(data);
                setFilteredProducts(data.data);
            } catch (err: any) {
                setError(err.message || "Ocurrió un error al obtener las categorías.");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [page, params.code]);

    useEffect(() => {
        const results = searchText
            ? kardex?.data.filter((product) =>
                  product.name.toLowerCase().includes(searchText.toLowerCase())
              )
            : kardex?.data || [];
        setFilteredProducts(results || []);
    }, [searchText, kardex?.data]);

    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <MaterialCommunityIcons name="arrow-left" color={"#FFFFFF"} size={25} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{params.name}</Text>
            </View>

            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#9e9e9e" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar categorías..."
                    placeholderTextColor="#9e9e9e"
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>

            {loading ? (
                <LoadingIndicator />
            ) : error ? (
                <ErrorMessage message={error} />
            ) : filteredProducts.length > 0 ? (
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    {filteredProducts.map((item) => (
                        <View style={styles.card} key={item.code}>
                            <Text style={styles.cardTitle}>{item.name}</Text>
                            <View style={styles.cardRow}>
                                <View style={styles.cardDetail}>
                                    <MaterialCommunityIcons name="stocking" size={20} color={"#007AFF"} />
                                    <Text style={styles.cardText}>Código: {item.code}</Text>
                                </View>
                                <View style={styles.cardDetail}>
                                    <MaterialCommunityIcons name="counter" size={20} color={"#007AFF"} />
                                    <Text style={styles.cardText}>Stock: {item.stock}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            ) : (
                <ErrorMessage message="Sin resultados para tu búsqueda." />
            )}

            {kardex && (
                <View style={styles.pagination}>
                    <TouchableOpacity
                        onPress={() => setPage(page - 1)}
                        disabled={page <= 1}
                        style={[styles.pageButton, page <= 1 && styles.disabledButton]}
                    >
                        <MaterialCommunityIcons name="chevron-left" size={35} color={"#FFFFFF"} />
                    </TouchableOpacity>
                    <Text style={styles.pageText}>
                        Página {kardex.currentPage} de {kardex.totalPages}
                    </Text>
                    <TouchableOpacity
                        onPress={() => setPage(page + 1)}
                        disabled={page >= kardex.totalPages}
                        style={[styles.pageButton, page >= kardex.totalPages && styles.disabledButton]}
                    >
                        <MaterialCommunityIcons name="chevron-right" size={35} color={"#FFFFFF"} />
                    </TouchableOpacity>
                </View>
            )}

            <StatusBar backgroundColor="#007AFF" />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#F8F9FA",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: "#007AFF",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 10,
        color: "#FFFFFF",
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        height: 50,
        paddingHorizontal: 10,
        margin: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: "#333333",
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        color: "red",
        fontSize: 16,
        textAlign: "center",
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    cardRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
    },
    cardDetail: {
        flexDirection: "row",
        alignItems: "center",
    },
    cardText: {
        marginLeft: 8,
        color: "#555555",
    },
    pagination: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        backgroundColor: "#007AFF",
    },
    pageButton: {
        padding: 8,
    },
    disabledButton: {
        opacity: 0.5,
    },
    pageText: {
        color: "#FFFFFF",
        fontWeight: "bold",
    },
});
