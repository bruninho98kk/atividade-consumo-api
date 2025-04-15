"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import styles from "../mealList/culinaria.module.css";

const mealList = () => {
  const url = "https://www.themealdb.com/api/json/v1/1/random.php"; // Link da API externa

  const [meal, setMeal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url);
        setMeal(response.data.meals); // Acesse a propriedade 'meals'
        setLoading(false);
      } catch (error) {
        console.log("Erro ao buscar a meal na API");
        setError(
          "Não foi possível carregar a meal. Tente novamente mais tarde!"
        );
        setLoading(false);
      }
    };

    fetchMeal();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Carregando meal...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Culinárias & Receitas</h1>
      <div className={styles.mealGrid}>
        {meal.map((meal) => (
          <div key={meal.idMeal} className={styles.mealCard}>
            <div className={styles.imageContainer}>
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className={styles.image}
              />
            </div>
            <div className={styles.content}>
              <h2 className={styles.mealTitle}>{meal.strMeal}</h2>
          
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default mealList;