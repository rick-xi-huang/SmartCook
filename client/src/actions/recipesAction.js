import { toast } from 'react-toastify';

export const loadRecipesData = (email) => {
    return async dispatch => {
        fetch(`/recipes/${email}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
            .then((res) => res.json())
            .then((res) => {
                dispatch(loadRecipes(res));
            })
    }
};

export const addNewRecipeData = (recipe, userInfo) => {

    let data = {...recipe, email: userInfo.email};

    return async dispatch => {
        fetch("/recipes/add", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((res) => {
                dispatch(addRecipe(res));
                toast.success("The recipe has been saved", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000
                });
            })
    }
};

export const deleteOneRecipeData = (id) => {

    return async dispatch => {
        fetch(`/recipes/delete/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        })
            .then((res) => {
                dispatch(deleteOneRecipe(id));
            })
    }
};

export const loadRecipes = (recipes) => {
    return {
        type: 'RECIPES_LOAD',
        payload: recipes
    };
};

export const addRecipe = (recipes) => {
    return {
        type: 'RECIPES_ADD',
        payload: recipes
    };
};

export const deleteOneRecipe = (id) => {
    return {
        type: 'RECIPES_DELETE_ONE',
        payload: id
    };
};

export const deleteAllRecipe = () => {
    return {
        type: 'RECIPES_DELETE_ALL',
    };
};
