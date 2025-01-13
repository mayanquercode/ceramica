import { useState, useEffect } from "react";
import { CategoriesResponse, Category } from "../types";


// Definimos el hook personalizado
export  function useGetAllCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/api/v1/categories");
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        const data: CategoriesResponse = await response.json();
        
        const result = Object.keys(data).map(key => ({
          code: key,
          name: data[key].name,
          image: data[key].image
        }));

        setCategories(result);
      } catch (err: any) {;
        
        setError(err.message || "Ocurrió un error al obtener las categorías.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
}
