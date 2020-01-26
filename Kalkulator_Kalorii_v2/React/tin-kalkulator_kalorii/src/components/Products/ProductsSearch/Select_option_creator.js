import React from 'react';


const Select_option_creator = props => {

    //console.log(props)

    var products = "";

    if (props.meal_bool) {
        products = props.meals.map(meal => (
            <option value={meal.id} key={meal.id}>{meal.name}</option>
        ));
    }
    else
        if (props.product) {
            products = props.products.map(product => (
                <option value={product.id} key={product.id}>{product.name}</option>
            ));
        }

        else
            if (props.mealinfo) {
                if (!(props.meal.meal_products === undefined)) {
                    products = props.meal.meal_products.map(meal => (
                        <tr>
                            <td>{meal.product.name}</td>
                            <td>{meal.grams}</td>
                        </tr>
                    ));

                }
            }
            else
                if (props.mealadd) {
                    if (!(props.meal_products_actual === undefined)) {
                        products = props.meal_products_actual.map(meal_products =>
                            
                            (
                               
                                <tr>
                                    <td>{meal_products.product.name}</td>
                                    <td>{meal_products.grams}</td>
                                    <td><a className="MEALSADD_productdelete" onClick={() => props.deletingProduct(meal_products.product.id)}>usuń</a></td>
                                </tr>
                                
                            )

                        );

                    }
                }
             




    return (
        products
    );


}

export default Select_option_creator