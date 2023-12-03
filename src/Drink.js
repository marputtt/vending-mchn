function Drink({ name, price, purchase, image }) {
    const handleClick = () => {
        purchase(name, price);
    };

    return (
        <div className="drink rounded-lg shadow-lg p-4 text-center cursor-pointer" onClick={handleClick}>
            <img style={{maxWidth: "300px"}} src= {image} alt={name} className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">{name}</h3>
            <p className="text-gray-600">Rp.{price}</p>
        </div>
    );
}

export default Drink;