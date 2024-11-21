import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const PLACEHOLDER = [
  {
    id: "p1",
    title: "Test One",
    price: 6,
    description: "This is the first product - amazing!",
  },
  {
    id: "p2",
    title: "Test Two",
    price: 6,
    description: "This is the second product - wonderful!",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {PLACEHOLDER.map((el) => (
          <ProductItem
            key={el.id} 
            id={el.id} 
            title={el.title}
            price={el.price}
            description={el.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
