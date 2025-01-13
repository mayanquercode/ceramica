import {  Category } from "@/src/types";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  ScrollView,
} from "react-native";
import CategoryBox from "./CategoryBox";

const { width } = Dimensions.get("screen");
const widthBox = width / 2; // Ancho de las cajas para dos columnas

interface Props {
  categories: Category[]
}




const ViewCategories = ({categories}:Props) => {

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {categories.map((category) => (
        <CategoryBox
          key={category.code}
          code={category.code}
          name={category.name}
          image={category.image}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
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

export default ViewCategories;
