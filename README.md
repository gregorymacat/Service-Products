
# E-Commerce API

This application sets up an API that can be utilized by a fashion E-Commerce website. The endpoints that are available from this are related to the products that the company offers. During this project I learned a tremendous amount about SQL language's finer features including aggregation and joins. As well as test driven development and load testing an API.

## Table of Contents

- [E-Commerce API](#e-commerce-api)
  * [Table of Contents](#table-of-contents)
  * [Optimizations](#optimizations)
    + [Manual Testing of Query Implementations](#manual-testing-of-query-implementations)
    + [Smoke Testing Pooling with Checking out Clients](#smoke-testing-pooling-with-checking-out-clients)
  * [Usage of Endpoints](#usage-of-endpoints)
    + [GET /products](#get--products)
    + [GET /products/:product_id](#get--products--product-id)
    + [GET /products/:product_id/styles](#get--products--product-id-styles)
  * [Testing](#testing)

## Optimizations

Refactored PostgreSQL database to use Pooling with checking out a client explicitly for each query. Ran trials through manual testing and somke testing that produced the following results.

### Manual Testing of Query Implementations
All tests were run on the styles endpoint which is one of the more complex shapes among the endpoints. They were conducted in Postman and recorded as a series of trials.

Type of Connection | First Run | Second Run | Third Run | __Average__
------------------ | --------- | ---------- | ---------- | ------------
Pooling Automatic Query | 1936.445 ms | 1809.302 ms | 2022.531 ms | __1922.759 ms__
Pooling Checking Out | 1075.465 ms | 1559.210 ms | 1368.810 ms | __1334.495 ms__
Standard Client Query | 1605.726 ms | 1671.874 ms | 1099.869 ms | __1459.156 ms__

### Smoke Testing Pooling with Checking out Clients
The tests conducted were under the assumption that there is one user who is trying to use the endpoint as many times as possible in one minute.

/products
```
iteration_duration.............: avg=1s      min=1s     med=1s      max=1s      p(90)=1s       p(95)=1s
iterations.....................: 60      0.997409/s
```

/products/:id
```
iteration_duration.............: avg=1.05s   min=1.04s   med=1.05s   max=1.08s   p(90)=1.06s    p(95)=1.06s
iterations.....................: 57      0.948721/s
```

/styles
```
iteration_duration.............: avg=1.75s    min=1.68s   med=1.74s    max=1.85s    p(90)=1.79s    p(95)=1.8s
iterations.....................: 35      0.571031/s
```

/related
```
iteration_duration.............: avg=1.1s     min=1.08s   med=1.09s   max=1.12s    p(90)=1.11s    p(95)=1.12s
iterations.....................: 55      0.907547/s
```

There is a minimum of 1 second for each duration due to the sleep command that is run at the end of each scenario, and the results show that the more complex shaped endpoints took longer to return a response but not by a damaging margin.
## Usage of Endpoints

### GET /products
Receive information about a large number of products at a time.
Parameter | Description
--------- | -----------
page | Select page to start displaying products, defaults to 1
count | How many items to return, defaults to 10

Example Request: http://localhost:3000/products?page=1&count=3

__Response Shape__
```
[
  {
        "id": 1,
        "name": "Camo Onesie",
        "slogan": "Blend in to your crowd",
        "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
        "category": "Jackets",
        "default_price": "140"
    },
  {
        "id": 2,
        "name": "Bright Future Sunglasses",
        "slogan": "You've got to wear shades",
        "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
        "category": "Accessories",
        "default_price": "69"
    },
  {
        "id": 3,
        "name": "Morning Joggers",
        "slogan": "Make yourself a morning person",
        "description": "Whether you're a morning person or not. Whether you're gym bound or not. Everyone looks good in joggers.",
        "category": "Pants",
        "default_price": "40"
    }
]
```

### GET /products/:product_id

Takes a specific product ID to get general information about a particular product.

Example Request: http://localhost:3000/products/11

__Response Shape__
```
{
    "id": 11,
    "name": "Air Minis 250",
    "slogan": "Full court support",
    "description": "This optimized air cushion pocket reduces impact but keeps a perfect balance underfoot.",
    "category": "Basketball Shoes",
    "default_price": "0",
    "features": [
  	{
            "feature": "Sole",
            "value": "Rubber"
        },
  	{
            "feature": "Material",
            "value": "FullControlSkin"
        },
    ]
}
```

### GET /products/:product_id/styles

Retrieve the styles that a specific product has available using its product ID.

Example Request: http://localhost:3000/products/1/styles

__Response Shape__
```
{
    "product_id": "1",
    "results": [
  	{
        "style_id": 1,
        "name": "Forest Green & Black",
        "original_price": "140",
        "sale_price": "0",
        "default?": true,
        "photos": [
            {
                "thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",
                "url": "urlplaceholder/style_1_photo_number.jpg"
            },
            {
                "thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",
                "url": "urlplaceholder/style_1_photo_number.jpg"
            }
        ],
        "skus": {
            "37": {
                "quantity": 8,
                "size": "XS"
            },
            "38": {
                "quantity": 16,
                "size": "S"
            },
            "39": {
                "quantity": 17,
                "size": "M"
            }
        }
    },
    {
        "style_id": 2,
        "name": "Desert Brown & Tan",
        "original_price": "140",
        "sale_price": "0",
        "default?": false,
        "photos": [
            {
                "thumbnail_url": "urlplaceholder/style_2_photo_number_thumbnail.jpg",
                "url": "urlplaceholder/style_2_photo_number.jpg"
            }
        ],
        "skus": {
            "37": {
                    "quantity": 8,
                    "size": "XS"
            },
            "38": {
                    "quantity": 16,
                    "size": "S"
            },
            "39": {
                    "quantity": 17,
                    "size": "M"
            }
        }   
    }
}
```
## Testing

To unit test this project run
```
  npm test
```

To load test this project:
1. Ensure K6 is installed locally
2. cd to the tests folder
3. `k6 run <smoke.js or userflow.js>`
